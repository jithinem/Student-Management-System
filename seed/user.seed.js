const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const userJson = [
  { "email": "admin@admin.com", "password": "admin", "user_type":"admin" },
];

const seedUser = async () => {
  try {
    const adminExists = await User.findOne({ user_type: 'admin' });
    if (adminExists) {
      console.log('Admin already exists');
      return;
    }

    for (let user of userJson) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    await User.insertMany(userJson);
    console.log('Admin seeded successfully');
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

module.exports = { seedUser };
