const router = require('express').Router();
const Message = require('../models/message');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get chat list and history for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching chat history for user:', userId);

    // First check if the user is a photographer
    const photographer = await prisma.photographer.findFirst({
      where: {
        userId: userId
      }
    });

    let bookings;
    if (photographer) {
      // If user is a photographer, get all their bookings
      bookings = await prisma.booking.findMany({
        where: {
          photographerId: photographer.id
        },
        include: {
          client: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  clientProfile: {
                    select: {
                      profilePic: true
                    }
                  }
                }
              }
            }
          }
        },
        distinct: ['clientId']
      });

      // Get all client IDs from bookings
      const clientIds = bookings.map(booking => booking.client.user.id);

      // Find all messages between the photographer and their booked clients
      const messages = await Message.find({
        $or: [
          { 
            sender: userId, 
            receiver: { $in: clientIds } 
          },
          { 
            receiver: userId, 
            sender: { $in: clientIds } 
          }
        ]
      }).sort({ createdAt: -1 });

      console.log('Found messages:', messages.length);

      // Create initial chats from bookings
      const chatMap = new Map();
      
      // Initialize chats with booked clients
      bookings.forEach(booking => {
        const client = booking.client.user;
        const profilePic = client.clientProfile?.profilePic;
        chatMap.set(client.id, {
          id: client.id,
          name: client.username,
          avatar: profilePic || '/default-avatar.png',
          online: false,
          messages: [],
          lastMessage: '',
          lastMessageTime: booking.createdAt,
          unread: 0
        });
      });

      // Add messages to chats
      messages.forEach(message => {
        const otherUserId = message.sender === userId ? message.receiver : message.sender;
        const chat = chatMap.get(otherUserId);
        
        if (chat) {
          chat.messages.push({
            text: message.content,
            sender: message.sender === userId ? 'photographer' : 'client',
            timestamp: message.createdAt,
            read: message.read
          });

          // Update last message and time
          if (!chat.lastMessageTime || message.createdAt > chat.lastMessageTime) {
            chat.lastMessage = message.content;
            chat.lastMessageTime = message.createdAt;
          }

          // Update unread count
          if (message.receiver === userId && !message.read) {
            chat.unread += 1;
          }
        }
      });

      // Convert Map to array and sort by last message time
      const chats = Array.from(chatMap.values())
        .sort((a, b) => b.lastMessageTime - a.lastMessageTime);

      console.log('Sending chats:', chats.length);
      res.json(chats);
    } else {
      // Handle client view (existing code)
      bookings = await prisma.booking.findMany({
        where: {
          clientId: userId,
        },
        include: {
          photographer: {
            include: {
              user: true
            }
          }
        },
        distinct: ['photographerId']
      });

      // Get all photographer IDs from bookings
      const photographerIds = bookings.map(booking => booking.photographer.userId);

      // Find all messages between the client and their booked photographers
      const messages = await Message.find({
        $or: [
          { 
            sender: userId, 
            receiver: { $in: photographerIds } 
          },
          { 
            receiver: userId, 
            sender: { $in: photographerIds } 
          }
        ]
      }).sort({ createdAt: -1 });

      console.log('Found messages:', messages.length);

      // Create initial chats from bookings
      const chatMap = new Map();
      
      // Initialize chats with booked photographers
      bookings.forEach(booking => {
        const photographer = booking.photographer;
        chatMap.set(photographer.userId, {
          id: photographer.userId,
          name: photographer.name,
          avatar: photographer.profilePic || '/default-avatar.png',
          online: false,
          messages: [],
          lastMessage: '',
          lastMessageTime: booking.createdAt,
          unread: 0
        });
      });

      // Add messages to chats
      messages.forEach(message => {
        const otherUserId = message.sender === userId ? message.receiver : message.sender;
        const chat = chatMap.get(otherUserId);
        
        if (chat) {
          chat.messages.push({
            text: message.content,
            sender: message.sender === userId ? 'client' : 'photographer',
            timestamp: message.createdAt,
            read: message.read
          });

          // Update last message and time
          if (!chat.lastMessageTime || message.createdAt > chat.lastMessageTime) {
            chat.lastMessage = message.content;
            chat.lastMessageTime = message.createdAt;
          }

          // Update unread count
          if (message.receiver === userId && !message.read) {
            chat.unread += 1;
          }
        }
      });

      // Convert Map to array and sort by last message time
      const chats = Array.from(chatMap.values())
        .sort((a, b) => b.lastMessageTime - a.lastMessageTime);

      console.log('Sending chats:', chats.length);
      res.json(chats);
    }
  } catch (error) {
    console.error('Chat fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Mark messages as read
router.put('/:senderId/read', async (req, res) => {
  try {
    const { senderId } = req.params;
    const { receiverId } = req.body;

    await Message.updateMany(
      { 
        sender: senderId,
        receiver: receiverId,
        read: false
      },
      { read: true }
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Failed to mark messages as read' });
  }
});

module.exports = router; 