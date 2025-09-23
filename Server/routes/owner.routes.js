const express = require('express');
const ownerController = require('../controllers/owner.controller');
const { protectOwner } = require('../middlewares/auth.middleware');

const router = express.Router();

// -------------------- Public Routes --------------------
// Register Owner
router.post('/register', ownerController.registerOwner);

// Login Owner
router.post('/login', ownerController.loginOwner);

// -------------------- Protected Routes --------------------
// Get Owner details
router.get('/:id', protectOwner, ownerController.getOwner);

// Update Owner details
router.put('/:id', protectOwner, ownerController.updateOwner);

// Delete Owner
router.delete('/:id', protectOwner, ownerController.deleteOwner);

// Logout Owner
router.post('/logout', protectOwner, ownerController.logoutOwner);

module.exports = router;
