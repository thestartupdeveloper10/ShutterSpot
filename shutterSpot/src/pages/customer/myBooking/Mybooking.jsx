import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Camera, DollarSign, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { userRequest } from '@/service/requestMethods';
import { useToast } from "@/components/ui/use-toast";

const Mybooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await userRequest.get(`/book/client/${user.id}`);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      rejected: "bg-red-100 text-red-800",
      rescheduled: "bg-purple-100 text-purple-800",
      no_show: "bg-gray-100 text-gray-800",
      expired: "bg-gray-100 text-gray-800",
      refunded: "bg-blue-100 text-blue-800"
    };
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const filterBookings = (status) => {
    return bookings.filter(booking => 
      status === 'all' ? true : booking.status.toLowerCase() === status.toLowerCase()
    );
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await userRequest.put(`/book/${bookingId}/status`, {
        status: 'cancelled',
        reason: 'Cancelled by client'
      });
      
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      });
      
      // Refresh bookings
      fetchBookings();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to cancel booking",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="rescheduled">Rescheduled</TabsTrigger>
        </TabsList>

        {['all', 'pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filterBookings(status).map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-semibold">
                        {booking.photographer?.name || 'Photographer'}
                      </CardTitle>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(booking.startDate), 'MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {format(new Date(booking.startDate), 'HH:mm')} - 
                          {format(new Date(booking.endDate), 'HH:mm')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.location}</span>
                      </div>
                      {booking.numberOfPhotos && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Camera className="h-4 w-4" />
                          <span>{booking.numberOfPhotos} photos</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span>Ksh {booking.totalPrice}</span>
                      </div>
                    </div>

                    {/* Add payment status */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Payment Status:</span>
                        <Badge variant="outline" className={
                          booking.paymentStatus === 'fully_paid' ? 'text-green-600' :
                          booking.paymentStatus === 'deposit_paid' ? 'text-blue-600' :
                          'text-yellow-600'
                        }>
                          {booking.paymentStatus.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      {booking.depositAmount && booking.paymentStatus === 'pending' && (
                        <div className="mt-2">
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => {/* Handle payment */}}
                          >
                            Pay Deposit (Ksh {booking.depositAmount})
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="bg-gray-50 px-6 py-4">
                    <div className="flex justify-end gap-4 w-full">
                      {booking.status === 'pending' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel Booking
                        </Button>
                      )}
                      
                      {booking.status === 'confirmed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {/* Handle reschedule */}}
                        >
                          Request Reschedule
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}

              {filterBookings(status).length === 0 && (
                <div className="col-span-full">
                  <Card className="bg-gray-50">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-gray-500 text-lg">
                        No {status === 'all' ? '' : status} bookings found
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Mybooking;
