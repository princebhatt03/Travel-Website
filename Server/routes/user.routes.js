const express = require('express');
const userController = require('../controllers/user.controller');
const { protectUser } = require('../middlewares/auth.middleware');
const router = express.Router();
const upload = require('../middlewares/upload');

// Public routes
router.post(
  '/register',
  upload.single('profilePhoto'),
  userController.registerUser
);
router.post('/login', userController.loginUser);

// Protected routes (require JWT)
router.get('/:id', protectUser, userController.getUser);
router.put('/:id', protectUser, userController.updateUser);
router.delete('/:id', protectUser, userController.deleteUser);
router.post('/logout', protectUser, userController.logoutUser);

module.exports = router;
