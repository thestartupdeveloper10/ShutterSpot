import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Camera, DollarSign } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userRequest } from '@/service/requestMethods';

const Mybooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.currentUser);

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
    };
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const filterBookings = (status) => {
    return bookings.filter(booking => 
      status === 'all' ? true : booking.status.toLowerCase() === status.toLowerCase()
    );
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
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
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

                    {booking.status === 'pending' && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-500">
                          Waiting for photographer confirmation...
                        </p>
                      </div>
                    )}
                  </CardContent>
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
