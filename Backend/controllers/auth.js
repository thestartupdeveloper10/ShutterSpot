const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authRouter = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SEC,
    { expiresIn: '1h' }
  );
};

const formatUserResponse = (user, token) => {
  return {
    token,
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
    profilePicture: user.profilePicture,
    // Add any other fields you want to return
  };
};

authRouter.post('/register', async (req, res) => {
  try {
    const { username, email, role, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const user = new User({ username, email, role });
    await user.setPassword(password);
    const savedUser = await user.save();
    // Remove token generation from here
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        role: savedUser.role,
        profilePicture: savedUser.profilePicture,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.status(200).json(formatUserResponse(user, token));
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

authRouter.post('/google', async (req, res) => {
  try {
    const { email, name, googlePhotoUrl } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      const generatedPassword = Math.random().toString(36).slice(-16);
      user = new User({
        username: `${name.toLowerCase().replace(/\s+/g, '')}${Math.random().toString(36).slice(-4)}`,
        email,
        profilePicture: googlePhotoUrl,
        role: 'client', // Assuming Google auth users are clients by default
      });
      await user.setPassword(generatedPassword);
      await user.save();
    }
    const token = generateToken(user);
    res.status(200).json(formatUserResponse(user, token));
  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
});

module.exports = authRouter;