const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { 
    type: String, 
    required: true
  },
  receiver: { 
    type: String, 
    required: true
  },
  content: { 
    type: String, 
    required: true 
  },
  read: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  senderName: { 
    type: String,
    required: true
  },
  receiverName: { 
    type: String,
    required: true
  },
  senderAvatar: { 
    type: String,
    default: '/default-avatar.png'
  },
  receiverAvatar: { 
    type: String,
    default: '/default-avatar.png'
  }
});

module.exports = mongoose.model('Message', messageSchema); 