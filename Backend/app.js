const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const authRouter = require('./controllers/auth');
const usersRouter = require('./controllers/users');
const contactRouter = require('./controllers/contact');
const mpesaRouter = require('./controllers/mpesa');
const photographerRouter = require('./controllers/photographer');
const clientRouter = require('./controllers/clientProfile')
const bookingsRouter = require('./controllers/booking');
const reviewRouter =require('./controllers/review');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Message = require('./models/message');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

mongoose.set('strictQuery', false);

const url = config.MONGODB_URI;
logger.info('connecting to db');

mongoose.connect(url)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Update this with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static('dist'));

app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/photographers', photographerRouter);
app.use('/api/client', clientRouter);
app.use('/api/book', bookingsRouter);
app.use('/api/review', reviewRouter);
app.use('/api/checkout', mpesaRouter);
app.use('/api/chat', require('./controllers/chat'));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Update this with your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Store online users
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins with their userId
  socket.on('join', (userId) => {
    if (!userId) {
      console.log('Join attempt without userId');
      return;
    }

    console.log('User joined:', { userId, socketId: socket.id });
    
    // Remove any existing socket for this user
    const existingSocket = Array.from(onlineUsers.entries())
      .find(([id, _]) => id === userId);
    if (existingSocket) {
      const [_, oldSocketId] = existingSocket;
      if (oldSocketId !== socket.id) {
        console.log('Removing old socket for user:', userId);
        onlineUsers.delete(userId);
      }
    }

    // Set new socket
    onlineUsers.set(userId, socket.id);
    console.log('Current online users:', Array.from(onlineUsers.entries()));
    io.emit('userStatus', { userId, status: 'online' });
  });

  // Handle private messages
  socket.on('private_message', async ({ content, to }) => {
    try {
      // Find sender by socket ID
      const from = Array.from(onlineUsers.entries())
        .find(([_, socketId]) => socketId === socket.id)?.[0];

      console.log('Message attempt:', { from, to, content, socketId: socket.id });
      console.log('Current online users:', Array.from(onlineUsers.entries()));

      if (!from) {
        console.log('Sender not found in online users. Socket ID:', socket.id);
        // Notify client of the error
        socket.emit('message_error', { error: 'Not connected. Please refresh the page.' });
        return;
      }

      // Verify that these users have a booking relationship
      const booking = await prisma.booking.findFirst({
        where: {
          OR: [
            { 
              clientId: from,
              photographer: {
                userId: to
              }
            },
            {
              clientId: to,
              photographer: {
                userId: from
              }
            }
          ]
        },
        include: {
          client: {
            include: {
              user: {
                select: {
                  username: true,
                  clientProfile: {
                    select: {
                      profilePic: true
                    }
                  }
                }
              }
            }
          },
          photographer: {
            include: {
              user: {
                select: {
                  username: true
                }
              }
            }
          }
        }
      });

      console.log('Found booking:', booking);

      if (!booking) {
        console.log('No booking relationship found between users');
        return;
      }

      // Determine if sender is client or photographer
      const isClientSender = booking.clientId === from;
      
      // Create message with correct names and avatars
      const message = new Message({
        sender: from,
        receiver: to,
        content,
        senderName: isClientSender ? booking.client.user.username : booking.photographer.name,
        receiverName: isClientSender ? booking.photographer.name : booking.client.user.username,
        senderAvatar: isClientSender ? booking.client.user.clientProfile?.profilePic : booking.photographer.profilePic,
        receiverAvatar: isClientSender ? booking.photographer.profilePic : booking.client.user.clientProfile?.profilePic
      });

      const savedMessage = await message.save();
      console.log('Saved message:', savedMessage);

      // Send to recipient if online
      const recipientSocket = onlineUsers.get(to);
      console.log('Recipient socket:', { to, recipientSocket });
      
      if (recipientSocket) {
        console.log('Sending message to socket:', recipientSocket);
        io.to(recipientSocket).emit('private_message', {
          content,
          from,
          createdAt: message.createdAt
        });
      } else {
        console.log('Recipient not online:', to);
      }
    } catch (error) {
      console.error('Error handling private message:', error);
      socket.emit('message_error', { error: 'Failed to send message' });
    }
  });

  // Handle disconnect
  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', { socketId: socket.id, reason });
    const userId = Array.from(onlineUsers.entries())
      .find(([_, socketId]) => socketId === socket.id)?.[0];
    
    if (userId) {
      console.log('User disconnected:', { userId, socketId: socket.id });
      onlineUsers.delete(userId);
      console.log('Remaining online users:', Array.from(onlineUsers.entries()));
      io.emit('userStatus', { userId, status: 'offline' });
    }
  });
});

module.exports = httpServer;