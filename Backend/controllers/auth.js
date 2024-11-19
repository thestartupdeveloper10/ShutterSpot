const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authRouter = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SEC,
    { expiresIn: '1h' }
  );
};

const formatUserResponse = (user, token, profile = null, bookings = []) => {
  const { password, ...userWithoutPassword } = user;
  return {
    ...userWithoutPassword,
    profile,
    bookings,
    token
  };
};

const getBookings = async (userId, role) => {
  try {
    if (role === 'client') {
      // First get the client profile to get the correct clientId
      const clientProfile = await prisma.clientProfile.findUnique({
        where: { userId: userId }
      });

      if (!clientProfile) {
        console.error('Client profile not found');
        return [];
      }

      return await prisma.booking.findMany({
        where: {
          clientId: clientProfile.userId
        },
        include: {
          photographer: {
            include: {
              user: {
                select: {
                  email: true,
                  username: true
                }
              }
            }
          }
        },
        orderBy: {
          startDate: 'desc'
        }
      });
    } else if (role === 'photographer') {
      // First get the photographer profile to get the correct photographerId
      const photographerProfile = await prisma.photographer.findUnique({
        where: { userId: userId }
      });

      if (!photographerProfile) {
        console.error('Photographer profile not found');
        return [];
      }

      return await prisma.booking.findMany({
        where: {
          photographerId: photographerProfile.id
        },
        include: {
          client: {
            include: {
              user: {
                select: {
                  email: true,
                  username: true
                }
              }
            }
          }
        },
        orderBy: {
          startDate: 'desc'
        }
      });
    }
    return [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};


authRouter.post('/register', async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    // Validate required fields
    if (!username || !email || !role || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        role,
        password: hashedPassword,
      },
    });

    // Prepare response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});



authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
      include: {
        clientProfile: {
          include: {
            bookings: true
          }
        },
        photographer: {
          include: {
            receivedBookings: true
          }
        },
        reviews: {
          include: {
            photographer: true
          }
        }
      }
    });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    const token = generateToken(user);
    const profile = user.role === 'client' ? user.clientProfile : user.photographer;
    
    // Get relevant bookings based on user role
    const bookings = await getBookings(user.id, user.role);

    // Format response and remove sensitive data
    const response = formatUserResponse(user, token, profile, bookings);
    delete response.clientProfile;
    delete response.photographer;

    res.status(200).json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

authRouter.post('/google', async (req, res) => {
  try {
    const { email, name, googlePhotoUrl } = req.body;
    
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
      include: {
        clientProfile: true
      }
    });

    if (!user) {
      // Generate a random username and password
      const username = `${name.toLowerCase().replace(/\s+/g, '')}${Math.random().toString(36).slice(-4)}`;
      const generatedPassword = Math.random().toString(36).slice(-16);
      const passwordHash = await bcrypt.hash(generatedPassword, 10);

      // Create new user
      user = await prisma.user.create({
        data: {
          username,
          email,
          password: passwordHash,
          role: 'client',
          clientProfile: {
            create: {
              profilePic: googlePhotoUrl,
              phone: '',
              location: ''
            }
          }
        },
        include: {
          clientProfile: true
        }
      });
    }

    const token = generateToken(user);
    
    // Get bookings for Google-authenticated user
    const bookings = await getBookings(user.id, 'client');
    
    const response = formatUserResponse(user, token, user.clientProfile, bookings);
    delete response.clientProfile;

    res.status(200).json(response);
  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
});

// Keep other routes (register) as they are...

module.exports = authRouter;