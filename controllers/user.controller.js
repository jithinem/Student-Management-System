const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const User = require('../models/user.model');

const loginController = async (req, res) => {
  const { email, password, user_type } = req.body;

  // Validate the input fields
  if (!email || !password || !user_type) {
    return res.status(400).json({ message: "Email, password, and user type are required." });
  }

  try {
    const user = await userService.loginUser(email, password, user_type);

    if (user) {
      const payload = {
        userId: user._id,
        email: user.email,
        user_type: user.user_type
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });

      res.status(200).json({
        message: "Login successful",
        token: token, 
        user: {
          email: user.email,
          user_type: user.user_type,
          userId: user._id
        }
      });
    } else {
      res.status(401).json({ message: "Invalid email, password, or user type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};


const createStudent = async (req, res) => {
  const { email, password, name, department } = req.body;

  // Validate the input fields
  if (!email || !password || !name || !department) {
    return res.status(400).json({ message: "Email,password,name and department are required." });
  }
  const emailExists = await User.findOne({email:email});
  if(emailExists) return res.status(400).json({message: "Email already exists"})

  try {
    const student = await userService.createStudent(email, password, name, department);

    if (student) {
      return res.status(201).json({
        message: "Student created successfully",
        student: {
          email: student.email,
          user_type: student.user_type,
          userId: student._id
        }
      });
    } else {
      return res.status(400).json({ message: "Error creating student." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
};

const fetchStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const students = await userService.fetchStudents(page, limit);

    res.status(200).json({
      message: 'Students retrieved successfully',
      data: students,
    });
  } catch (error) {
    console.error('Error listing students:', error);
    res.status(500).json({
      message: 'Failed to list students',
      error: error.message,
    });
  }
};

module.exports = { 
  loginController,
  createStudent,
  fetchStudents
 };
