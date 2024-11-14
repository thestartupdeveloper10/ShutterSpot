const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const authRouter = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SEC,
    { expiresIn: '1h' }
  );
};

const formatUserResponse = (user, token) => {
  return {
    token,
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
};

authRouter.post('/register', async (req, res) => {
  try {
    const { username, email, role, password } = req.body;
    const existingUser = await prisma.user.findFirst({
      where:{email: email} 
    })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const savedUser = await prisma.user.create({ 
      data:{username:username, email:email, role:role, password:passwordHash}
       });


    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
        role: savedUser.role,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email: email}});
    console.log(user);

    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid email or password'
    })
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

    // Check if a user with the given email already exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Generate a random username and password for the new user
      const username = `${name.toLowerCase().replace(/\s+/g, '')}${Math.random().toString(36).slice(-4)}`;
      const generatedPassword = Math.random().toString(36).slice(-16);
      const passwordHash = await bcrypt.hash(generatedPassword, 10);

      // Create the new user with Prisma
      user = await prisma.user.create({
        data: {
          username,
          email,
          password: passwordHash,
          role: 'client', // Default role for Google authenticated users
          profilePic: googlePhotoUrl,
        },
      });
    }

    // Generate a JWT token for the user
    const token = generateToken(user);
    res.status(200).json(formatUserResponse(user, token));
  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
});


module.exports = authRouter;