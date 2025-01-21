const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); // Import User model

const loginUser = async (email, password, user_type) => {
  const user = await User.findOne({ email, user_type });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  const { password: userPassword, ...userData } = user.toObject();
  return userData; 
};



const createStudent = async (email, password, name, department) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new User({
      email,
      password: hashedPassword,
      user_type: 'student',
      name,
      department
    });
    await student.save();
    return student;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating student");
  }
};

const fetchStudents = async (page, limit) => {
  const skip = (page - 1) * limit;
  const students = await User.find({ user_type: 'student' })
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 })
    .lean();

  return students.map(student => ({
    id: student._id,
    name: student.name || 'N/A',
    email: student.email,
    department: student.department || 'N/A',
    createdAt: student.createdAt,
  }));
};


module.exports = { 
  loginUser,
  createStudent,
  fetchStudents
 };
