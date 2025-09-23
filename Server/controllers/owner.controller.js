const Owner = require('../models/owner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ownerLogger } = require('../utils/logger');

// Generate JWT Token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const ownerController = () => {
  // @desc Register a new Owner
  const registerOwner = async (req, res) => {
    try {
      const { resortName, ownerName, email, password, photos } = req.body;

      if (!resortName || !ownerName || !email || !password) {
        ownerLogger.warn(
          `Registration failed - missing fields for email: ${email}`
        );
        return res.status(400).json({ message: 'All required fields missing' });
      }

      const existingOwner = await Owner.findOne({ email });
      if (existingOwner) {
        ownerLogger.warn(`Registration failed - duplicate email: ${email}`);
        return res.status(400).json({ message: 'Email already exists' });
      }

      // ✅ hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const owner = await Owner.create({
        resortName,
        ownerName,
        email,
        password: hashedPassword,
        photos: photos || [],
      });

      ownerLogger.info(
        `New owner registered - ID: ${owner._id}, Email: ${owner.email}`
      );

      res.status(201).json({
        _id: owner._id,
        resortName: owner.resortName,
        ownerName: owner.ownerName,
        email: owner.email,
        photos: owner.photos,
        token: generateToken(owner._id),
      });
    } catch (error) {
      ownerLogger.error(`Registration error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  // @desc Login Owner (via email + password)
  const loginOwner = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }

      const owner = await Owner.findOne({ email });
      if (!owner) {
        ownerLogger.warn(`Login failed - invalid email: ${email}`);
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, owner.password);
      if (!isMatch) {
        ownerLogger.warn(`Login failed - wrong password for email: ${email}`);
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      ownerLogger.info(`Owner logged in - ID: ${owner._id}`);

      res.json({
        _id: owner._id,
        resortName: owner.resortName,
        ownerName: owner.ownerName,
        email: owner.email,
        photos: owner.photos,
        token: generateToken(owner._id),
      });
    } catch (error) {
      ownerLogger.error(`Login error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  // @desc Get Owner Profile
  const getOwner = async (req, res) => {
    try {
      const { id } = req.params;
      const owner = await Owner.findById(id).select('-password');
      if (!owner) {
        ownerLogger.warn(`Get profile failed - invalid Owner ID: ${id}`);
        return res.status(404).json({ message: 'Owner not found' });
      }

      ownerLogger.info(`Profile fetched - Owner ID: ${id}`);
      res.json(owner);
    } catch (error) {
      ownerLogger.error(`Get profile error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  // @desc Update Owner Profile
  const updateOwner = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const owner = await Owner.findById(id);
      if (!owner) {
        ownerLogger.warn(`Update failed - invalid Owner ID: ${id}`);
        return res.status(404).json({ message: 'Owner not found' });
      }

      if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
      }

      Object.assign(owner, updates);
      await owner.save();

      ownerLogger.info(`Profile updated - Owner ID: ${id}`);

      res.json({
        message: 'Profile updated successfully',
        owner: {
          _id: owner._id,
          resortName: owner.resortName,
          ownerName: owner.ownerName,
          email: owner.email,
          photos: owner.photos,
        },
      });
    } catch (error) {
      ownerLogger.error(`Update profile error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  // @desc Delete Owner
  const deleteOwner = async (req, res) => {
    try {
      const { id } = req.params;
      const owner = await Owner.findByIdAndDelete(id);
      if (!owner) {
        ownerLogger.warn(`Delete failed - invalid Owner ID: ${id}`);
        return res.status(404).json({ message: 'Owner not found' });
      }

      ownerLogger.info(`Owner deleted - ID: ${id}`);
      res.json({ message: 'Owner deleted successfully' });
    } catch (error) {
      ownerLogger.error(`Delete profile error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  // @desc Logout Owner
  const logoutOwner = async (req, res) => {
    try {
      ownerLogger.info(`Owner logged out - ID: ${req.body.id || 'unknown'}`);
      res.json({ message: 'Logout successful. Please clear token on client.' });
    } catch (error) {
      ownerLogger.error(`Logout error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };

  return {
    registerOwner,
    loginOwner,
    getOwner,
    updateOwner,
    deleteOwner,
    logoutOwner,
  };
};

module.exports = ownerController();
