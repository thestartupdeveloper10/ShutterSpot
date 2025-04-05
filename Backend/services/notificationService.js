const { sendEmail } = require('./emailService');
const { format } = require('date-fns'); // You'll need to install this

const sendBookingNotifications = async (booking, type) => {
  try {
    switch(type) {
      case 'created':
        // Log instead of sending actual emails for now
        console.log('Notification: New booking created', booking);
        await sendEmail(booking.photographerId, 'New Booking Request', {
          type: 'new_booking',
          bookingDetails: booking
        });
        
        await sendEmail(booking.clientId, 'Booking Received', {
          type: 'booking_received',
          bookingDetails: booking
        });
        break;
        
      case 'confirmed':
        // Send confirmation emails to both parties
        await sendEmail(booking.clientId, 'Booking Confirmed', {
          type: 'booking_confirmed',
          bookingDetails: booking
        });
        
        // Send reminder SMS
        await sendSMS(booking.clientPhone, `Your booking with ${booking.photographer.name} has been confirmed for ${format(booking.startDate, 'PPP')}`);
        break;
        
      // Add other notification types...
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
    // Don't throw the error, just log it
  }
};

const sendStatusUpdateNotifications = async (booking, status) => {
  const notifications = {
    confirmed: {
      client: {
        subject: 'Booking Confirmed',
        template: 'booking_confirmed'
      },
      photographer: {
        subject: 'You have confirmed a booking',
        template: 'photographer_confirmed'
      }
    },
    cancelled: {
      client: {
        subject: 'Booking Cancelled',
        template: 'booking_cancelled'
      },
      photographer: {
        subject: 'Booking Cancellation',
        template: 'photographer_cancellation'
      }
    }
    // Add other status notifications...
  };

  const notification = notifications[status];
  if (notification) {
    await Promise.all([
      sendEmail(booking.clientId, notification.client.subject, {
        type: notification.client.template,
        bookingDetails: booking
      }),
      sendEmail(booking.photographerId, notification.photographer.subject, {
        type: notification.photographer.template,
        bookingDetails: booking
      })
    ]);
  }
}; 

module.exports = {
  sendBookingNotifications,
  sendStatusUpdateNotifications
};