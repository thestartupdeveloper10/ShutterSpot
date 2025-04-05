import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { userRequest } from '@/service/requestMethods';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { 
  addPhotographerToWishlist, 
  removePhotographerFromWishlist, 
  selectWishlistItems 
} from '@/redux/features/favorites/wishlistRedux';
import { Heart } from 'lucide-react';

export const BookingForm = ({ photographer }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const wishlist = useSelector((state) => selectWishlistItems(state, currentUser?._id));

  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numberOfPhotos, setNumberOfPhotos] = useState(1);
  const [showDepositInfo, setShowDepositInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    photographerId: photographer?.id,
    clientId: currentUser?._id || '',
    location: photographer?.location || '',
    duration: '',
    totalPrice: '',
    message: '',
    status: 'pending',
    depositAmount: '0',
    paymentStatus: 'pending'
  });

  // Generate time options from 8 AM to 8 PM
  const timeOptions = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    const time = `${hour.toString().padStart(2, '0')}:${minute}`;
    return time;
  }).filter(time => {
    const hour = parseInt(time.split(':')[0]);
    return hour < 20; // Only include times before 8 PM
  });

  // Helper function to parse price from priceRange
  const getPriceFromRange = (priceRange) => {
    if (!priceRange) return 0;
    const match = priceRange.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Determine pricing model from priceRange
  const getPricingModel = (priceRange) => {
    if (!priceRange) return 'hourly';
    return priceRange.toLowerCase().includes('/hr') ? 'hourly' : 'perPhoto';
  };

  // Calculate price based on photographer's pricing model
  useEffect(() => {
    if (!photographer) return;

    const pricingModel = getPricingModel(photographer.priceRange);
    const basePrice = getPriceFromRange(photographer.priceRange);
    let calculatedPrice = 0;
    
    if (pricingModel === 'hourly') {
      if (startTime && endTime) {
        const start = new Date(`2000/01/01 ${startTime}`);
        const end = new Date(`2000/01/01 ${endTime}`);
        const durationHours = (end - start) / (1000 * 60 * 60);
        
        if (durationHours > 0) {
          calculatedPrice = durationHours * basePrice;
          const depositAmount = calculatedPrice * 0.20; // 20% deposit
          
          setFormData(prev => ({
            ...prev,
            duration: durationHours.toString(),
            totalPrice: calculatedPrice.toString(),
            depositAmount: depositAmount.toString()
          }));
        }
      }
    } else {
      calculatedPrice = numberOfPhotos * basePrice;
      const depositAmount = calculatedPrice * 0.20;
      
      setFormData(prev => ({
        ...prev,
        duration: startTime && endTime ? 
          ((new Date(`2000/01/01 ${endTime}`) - new Date(`2000/01/01 ${startTime}`)) / (1000 * 60 * 60)).toString() : 
          '',
        totalPrice: calculatedPrice.toString(),
        depositAmount: depositAmount.toString()
      }));
    }
  }, [startTime, endTime, numberOfPhotos, photographer]);

  const validateBookingTime = () => {
    const bookingDate = new Date(`${date}T${startTime}:00`);
    const minimumNotice = new Date();
    minimumNotice.setHours(minimumNotice.getHours() + 24);

    if (bookingDate < minimumNotice) {
      toast({
        title: "Invalid Booking Time",
        description: "Bookings must be made at least 24 hours in advance",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!date || !startTime || !endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!validateBookingTime()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        photographerId: photographer.id,
        clientId: currentUser._id,
        location: formData.location,
        duration: formData.duration,
        totalPrice: formData.totalPrice,
        depositAmount: formData.depositAmount,
        date: format(date, 'yyyy-MM-dd'),
        startTime,
        endTime,
        paymentStatus: 'pending'
      };

      const response = await userRequest.post('/book', bookingData);
      
      if (response.data) {
        setShowDepositInfo(true);
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: error.response?.data?.error || "Failed to create booking",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    // TODO: Implement payment integration
    try {
      // Process payment here
      await userRequest.put(`/book/${formData.bookingId}/payment`, {
        status: 'deposit_paid'
      });

      toast({
        title: "Payment Successful",
        description: "Your booking has been confirmed",
      });
      
      navigate('/profile');
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    }
  };

  // Filter out past dates
  const filterPastDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isPhotographerInWishlist = (photographerId) => {
    return wishlist.products.some(
      (item) => item.product.id === photographerId
    );
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please login to add favorites",
        variant: "destructive"
      });
      return;
    }

    const photographerId = photographer.id;
    const isFavorited = isPhotographerInWishlist(photographerId);

    if (isFavorited) {
      dispatch(removePhotographerFromWishlist({
        userId: currentUser._id,
        photographerId: photographerId
      }));
      toast({
        title: "Removed from favorites",
        description: "Photographer removed from your favorites list",
      });
    } else {
      dispatch(addPhotographerToWishlist({
        userId: currentUser._id,
        product: photographer,
        quantity: 1
      }));
      toast({
        title: "Added to favorites",
        description: "Photographer added to your favorites list",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Booking Details</h2>
          <button
            type="button"
            onClick={handleFavorite}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Heart 
              className={`w-6 h-6 transition-colors duration-300 ${
                isPhotographerInWishlist(photographer.id)
                  ? 'text-pink-500 fill-pink-500'
                  : 'text-pink-500'
              }`} 
            />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Date</label>
            <div className="mt-1">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                filterDate={filterPastDates}
                placeholderText="Select a date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Start Time</label>
              <select
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              >
                <option value="">Select start time</option>
                {timeOptions.map((time) => (
                  <option 
                    key={time} 
                    value={time}
                    disabled={endTime && time >= endTime}
                  >
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">End Time</label>
              <select
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              >
                <option value="">Select end time</option>
                {timeOptions.map((time) => (
                  <option 
                    key={time} 
                    value={time}
                    disabled={startTime && time <= startTime}
                  >
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {getPricingModel(photographer?.priceRange) === 'perPhoto' && (
            <div>
              <label className="text-sm font-medium text-gray-700">Number of Photos</label>
              <Input
                type="number"
                min="1"
                value={numberOfPhotos}
                onChange={(e) => setNumberOfPhotos(parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700">Location</label>
            <Input
              name="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Event location"
              required
              className="mt-1"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            <div className="flex justify-between">
              <span>Session Price:</span>
              <span>Ksh {formData.totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Required Deposit (20%):</span>
              <span>Ksh {formData.depositAmount}</span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium text-blue-900">Booking Policy</h4>
            <ul className="mt-2 text-sm text-blue-700 space-y-1">
              <li>• 20% deposit required to confirm booking</li>
              <li>• Full refund if cancelled 48+ hours before</li>
              <li>• 50% refund if cancelled 24-48 hours before</li>
              <li>• No refund if cancelled less than 24 hours before</li>
            </ul>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Proceed to Deposit'
          )}
        </Button>
      </form>

      <AlertDialog open={showDepositInfo} onOpenChange={setShowDepositInfo}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Your Booking</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <p>Great! Your booking request has been created. To confirm your booking, please complete the deposit payment:</p>
                
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Deposit Amount:</span>
                    <span>Ksh {formData.depositAmount}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    This amount is 20% of your total booking price and is required to confirm your reservation.
                  </p>
                </div>

                <div className="text-sm text-gray-600">
                  <p>What happens next?</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Complete the deposit payment to secure your booking</li>
                    <li>The photographer will be notified and can accept your booking</li>
                    <li>You&apos;ll receive a confirmation email with all details</li>
                  </ul>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate('/profile')}>
              Pay Later
            </AlertDialogCancel>
            <AlertDialogAction onClick={handlePayment}>
              Pay Deposit Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

BookingForm.propTypes = {
  photographer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    priceRange: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(PropTypes.string),
    about: PropTypes.string,
    profilePic: PropTypes.string,
  }).isRequired,
};

export default BookingForm; 