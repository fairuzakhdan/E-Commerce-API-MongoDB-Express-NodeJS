// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const User = require('../models/User');

const getAllUser = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select('-password');
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const users = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    city: req.body.city,
    regency: req.body.regency,
    country: req.body.country,
    address: req.body.address,
  };
  const newUser = new User(users);
  await newUser.save();
  res.status(201).json({
    status: 'success',
    message: 'User added successfully',
  });
  return res;
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const users = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    city: req.body.city,
    regency: req.body.regency,
    country: req.body.country,
    address: req.body.address,
  };
  await User.findByIdAndUpdate(userId, users, { new: true });
  res.status(201).json({
    status: 'success',
    message: 'User successfully updated',
  });
  return res;
};

module.exports = {
  getAllUser, getUserById, createUser, updateUserById,
};
