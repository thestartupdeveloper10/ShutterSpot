import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, completed, cancelled
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchBookings();
  }, [currentUser.id]);

  const fetchBookings = async () => {
    try {
      const response = await userRequest.get(`/bookings/photographer/${currentUser.id}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await userRequest.put(`/bookings/${bookingId}/status`, { status: newStatus });
      fetchBookings(); // Refresh bookings after status update
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <Badge className={statusStyles[status.toLowerCase()]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status.toLowerCase() === filter
  );

  return (
    <div className="space-y-6">
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
                  <TableHead>Date</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.clientName}</TableCell>
                    <TableCell>
                      {new Date(booking.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <Select
                        value={booking.status.toLowerCase()}
                        onValueChange={(value) => handleStatusChange(booking.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirm</SelectItem>
                          <SelectItem value="completed">Complete</SelectItem>
                          <SelectItem value="cancelled">Cancel</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
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
                      className="p-2 bg-gray-50 rounded-md flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{booking.clientName}</p>
                        <p className="text-sm text-gray-500">{booking.service}</p>
                      </div>
                      {getStatusBadge(booking.status)}
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
