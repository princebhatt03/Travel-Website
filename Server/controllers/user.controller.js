const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userLogger } = require('../utils/logger');
const path = require('path');

// Generate JWT Token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const userController = () => {
  // @desc Register a new User
  const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const profilePhoto = req.file ? `/uploads/${req.file.filename}` : '';

      if (!name || !email || !password) {
        userLogger.warn(
          `Registration failed - missing fields for email: ${email}`
        );
        return res.status(400).json({ message: 'All required fields missing' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        userLogger.warn(`Registration failed - duplicate email: ${email}`);
        return res.status(400).json({ message: 'Email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profilePhoto,
      });

      userLogger.info(
        `New user registered - ID: ${user._id}, Email: ${user.email}`
      );

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        token: generateToken(user._id),
      });
    } catch (error) {
      userLogger.error(`Registration error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  // @desc Login User
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        userLogger.warn(`Login failed - invalid email: ${email}`);
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        userLogger.warn(`Login failed - wrong password for email: ${email}`);
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      userLogger.info(`User logged in - ID: ${user._id}`);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        token: generateToken(user._id),
      });
    } catch (error) {
      userLogger.error(`Login error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  // @desc Get User Profile
  const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select('-password');
      if (!user) {
        userLogger.warn(`Get profile failed - invalid User ID: ${id}`);
        return res.status(404).json({ message: 'User not found' });
      }

      userLogger.info(`Profile fetched for User ID: ${id}`);
      res.json(user);
    } catch (error) {
      userLogger.error(`Get profile error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  // @desc Update User Profile
  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const user = await User.findById(id);
      if (!user) {
        userLogger.warn(`Update failed - invalid User ID: ${id}`);
        return res.status(404).json({ message: 'User not found' });
      }

      if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
      }

      Object.assign(user, updates);
      await user.save();

      userLogger.info(`Profile updated - User ID: ${id}`);

      res.json({
        message: 'Profile updated successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePhoto: user.profilePhoto,
        },
      });
    } catch (error) {
      userLogger.error(`Update profile error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  // @desc Delete User
  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        userLogger.warn(`Delete failed - invalid User ID: ${id}`);
        return res.status(404).json({ message: 'User not found' });
      }

      userLogger.info(`User deleted - ID: ${id}`);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      userLogger.error(`Delete profile error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  // @desc Logout User
  const logoutUser = async (req, res) => {
    try {
      userLogger.info(`User logged out - ID: ${req.body.id || 'unknown'}`);
      res.json({ message: 'Logout successful. Please clear token on client.' });
    } catch (error) {
      userLogger.error(`Logout error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  return {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
    logoutUser,
  };
};

module.exports = userController();
