import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Calendar,
  Clock,
  Star,
  DollarSign,
  MapPinIcon,
  Edit,
  Image,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CustomerProfile = () => {
  const userData = useSelector((state) => state.user);
  const { username, email, profile, bookings, reviews } = userData.currentUser;

  // Calculate statistics
  const stats = {
    totalBookings: bookings.length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    totalSpent: bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0),
    avgRating: reviews.length ? 
      (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 
      'N/A'
  };

  const StatCard = ({ title, value, icon: Icon }) => (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="rounded-full p-3 bg-purple-100 mr-4">
          <Icon className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );

  const renderBookingStatus = (status) => {
    const statusColors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={`py-1 px-2 ${statusColors[status.toLowerCase()]}`}>
        {status}
      </Badge>
    );
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const calculateBookingDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const hours = (endTime - startTime) / (1000 * 60 * 60);
    return `${hours} hours`;
  };

  return (
    <div className="py-12 px-6 md:mx-24">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Main Profile Card */}
      <Card className="mb-8">
        <CardContent className="flex flex-col md:flex-row items-start gap-6 p-6">
          <div className="relative group">
            <img
              src={profile.profilePic || "https://via.placeholder.com/150"}
              alt={username}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Image className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="flex-grow space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{username}</h2>
              <p className="text-gray-500">Customer since {new Date(profile.createdAt).getFullYear()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Bookings" 
          value={stats.totalBookings}
          icon={Calendar}
        />
        <StatCard 
          title="Completed Sessions" 
          value={stats.completedBookings}
          icon={Camera}
        />
        <StatCard 
          title="Total Spent" 
          value={`KSH ${stats.totalSpent.toLocaleString()}`}
          icon={Camera}
        />
        <StatCard 
          title="Average Rating" 
          value={stats.avgRating}
          icon={Star}
        />
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/photographers">
            <Button variant="outline" className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Book Photographer
            </Button>
          </Link>
          <Link to="/my-bookings">
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              View Bookings
            </Button>
          </Link>
          <Link to="/messages">
            <Button variant="outline" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Messages
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...bookings]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
              .map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full p-2 bg-purple-100">
                      <Camera className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{booking.photographer?.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge className={`
                    ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}
                  `}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerProfile;