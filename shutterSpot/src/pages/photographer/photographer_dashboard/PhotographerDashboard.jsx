import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Camera, DollarSign, Star, Users } from 'lucide-react';

const mockPhotographer = {
  username: "JaneDoe",
  email: "jane.doe@example.com",
  profilePicture: "https://via.placeholder.com/150",
  ratingAverage: 4.5,
  specialties: ["Weddings", "Portraits", "Events"],
  about: "Experienced photographer with a passion for capturing special moments.",
  equipment: {
    camera: "Canon EOS R5",
    lenses: "24-70mm, 50mm, 85mm",
  },
  portfolio: [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
  ],
};

const mockBookings = [
  { id: 1, clientName: "John Smith", date: "2024-11-12T10:00:00" },
  { id: 2, clientName: "Alice Johnson", date: "2024-11-13T14:00:00" },
  { id: 3, clientName: "Bob Williams", date: "2024-11-14T09:00:00" },
  { id: 4, clientName: "Samantha Brown", date: "2024-11-15T11:30:00" },
];

const mockEarnings = [
  { date: "2024-11-01", amount: 150 },
  { date: "2024-11-05", amount: 200 },
  { date: "2024-11-10", amount: 350 },
  { date: "2024-11-15", amount: 400 },
];

const PhotographerDashboard = () => {
  const navigate = useNavigate();
  const [photographer, setPhotographer] = useState(mockPhotographer);
  const [bookings, setBookings] = useState(mockBookings);
  const [earnings, setEarnings] = useState(mockEarnings);
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!photographer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Photographer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${earnings.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{photographer.ratingAverage.toFixed(1)}/5</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4">
              {bookings.filter(booking => 
                new Date(booking.date).toDateString() === selectedDate.toDateString()
              ).map(booking => (
                <div key={booking.id} className="mb-2 p-2 bg-gray-100 rounded">
                  <p className="font-semibold">{booking.clientName}</p>
                  <p>{new Date(booking.date).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={photographer.profilePicture} alt={photographer.username} />
              <AvatarFallback>{photographer.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{photographer.username}</h2>
              <p className="text-gray-500">{photographer.email}</p>
              <div className="flex mt-2 space-x-2">
                {photographer.specialties.map(specialty => (
                  <Badge key={specialty} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">About</h3>
            <p>{photographer.about}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Equipment</h3>
            <p>Camera: {photographer.equipment.camera}</p>
            <p>Lenses: {photographer.equipment.lenses}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photographer.portfolio.map((image, index) => (
              <img key={index} src={image} alt={`Portfolio ${index + 1}`} className="rounded-lg object-cover w-full h-48" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Button className="mt-6" onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
    </div>
  );
};

export default PhotographerDashboard;
