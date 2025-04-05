import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRequest } from '@/service/requestMethods';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState('all');
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  console.log('photographer id',currentUser.profile.id);

  useEffect(() => {
    fetchBookings();
  }, [currentUser.id]);

  const fetchBookings = async () => {
    try {
      const response = await userRequest.get(`/book/photographer/${currentUser.profile.id}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  console.log('bookings are',bookings);

  const handleStatusChange = async (bookingId, newStatus, reason = '') => {
    try {
      setIsLoading(true);
      await userRequest.put(`book/${bookingId}/status`, { 
        status: newStatus,
        photographerId: currentUser.profile.id,
        reason
      });
      
      toast({
        title: "Status Updated",
        description: `Booking has been ${newStatus}`,
      });
      
      fetchBookings();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      rescheduled: 'bg-purple-100 text-purple-800'
    };

    

    return (
      <Badge className={statusStyles[status.toLowerCase()]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Function to get events for calendar
  const getBookingEvents = () => {
    return bookings.map(booking => ({
      date: new Date(booking.date),
      status: booking.status
    }));
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status.toLowerCase() === filter
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="rescheduled">Rescheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Date & Time</TableHead>
                  {/* <TableHead>Service</TableHead> */}
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.clientName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{new Date(booking.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                    </TableCell>
                    {/* <TableCell>
                      Photography Session
                    </TableCell> */}
                    <TableCell>
                      <p className="text-sm">{booking.location}</p>
                    </TableCell>
                    <TableCell>Ksh {booking.totalPrice}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        booking.paymentStatus === 'fully_paid' ? 'text-green-600' :
                        booking.paymentStatus === 'deposit_paid' ? 'text-blue-600' :
                        'text-yellow-600'
                      }>
                        {booking.paymentStatus.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <Button
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              className="bg-green-500 hover:bg-green-600"
                              disabled={isLoading}
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={() => handleStatusChange(booking.id, 'rejected')}
                              variant="destructive"
                              disabled={isLoading}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        
                        {booking.status === 'confirmed' && (
                          <>
                            <Button
                              onClick={() => handleStatusChange(booking.id, 'completed')}
                              className="bg-blue-500 hover:bg-blue-600"
                              disabled={isLoading}
                            >
                              Complete
                            </Button>
                            <Button
                              onClick={() => handleStatusChange(booking.id, 'no_show')}
                              variant="destructive"
                              disabled={isLoading}
                            >
                              No Show
                            </Button>
                          </>
                        )}
                        
                        <Select
                          value={booking.status.toLowerCase()}
                          onValueChange={(value) => handleStatusChange(booking.id, value)}
                          disabled={isLoading || ['completed', 'cancelled', 'refunded'].includes(booking.status)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirm</SelectItem>
                            <SelectItem value="completed">Complete</SelectItem>
                            <SelectItem value="cancelled">Cancel</SelectItem>
                            <SelectItem value="rescheduled">Reschedule</SelectItem>
                            <SelectItem value="no_show">No Show</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                booked: getBookingEvents().map(event => event.date)
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: '#00FF00',
                  borderRadius: '50%'
                }
              }}
            />
            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Bookings for {selectedDate.toLocaleDateString()}
              </h3>
              <div className="space-y-2">
                {filteredBookings
                  .filter(
                    (booking) =>
                      new Date(booking.date).toDateString() === selectedDate.toDateString()
                  )
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="p-3 bg-gray-50 rounded-md"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{booking.clientName}</p>
                          <p className="text-sm text-gray-500">{booking.service}</p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Time: {booking.startTime} - {booking.endTime}</p>
                        <p>Location: {booking.location}</p>
                        <p>Price: Ksh {booking.totalPrice}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingManagement;
