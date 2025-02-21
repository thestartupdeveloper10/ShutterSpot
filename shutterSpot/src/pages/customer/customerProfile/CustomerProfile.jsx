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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";


const CustomerProfile = () => {

  const userData = useSelector((state) => state.user)
  console.log('user', userData)
  const { username, email, profile, bookings, reviews } = userData;

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
  
      <div className="py-28 px-6 md:mx-24">
        {/* Profile Section */}
        <Card>
          <CardContent className="flex flex-col md:flex-row items-start gap-6 p-6">
            <div className="relative">
              <img
                src={profile.profilePic || "https://via.placeholder.com/128"}
                alt={`${username}'s profile`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <Badge className="absolute bottom-0 right-0 bg-green-500">
                Active
              </Badge>
            </div>
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{username}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
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
              </div>
              <div className="flex gap-2">
                <Badge className="bg-blue-100 text-blue-800">
                  {reviews.length} Reviews
                </Badge>
                <Badge className="bg-purple-100 text-purple-800">
                  {bookings.length} Bookings
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="bookings" className="mt-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="bookings" className="flex gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  My Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <Card key={booking.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Camera className="h-5 w-5 text-blue-500" />
                              <h3 className="font-medium">
                                {booking.photographer?.name || "Photographer"}
                              </h3>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDateTime(booking.startDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {calculateBookingDuration(booking.startDate, booking.endDate)}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              {booking.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-4 w-4 text-gray-500" />
                              KSH {booking.totalPrice}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            {renderBookingStatus(booking.status)}
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-600">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>No bookings found.</p>
                      <Button variant="outline" className="mt-4">
                        Book a Photographer
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  My Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <Card key={review.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Camera className="h-5 w-5 text-blue-500" />
                              <h3 className="font-medium">
                                {review.photographer?.name || "Photographer"}
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                          <div className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-600">
                      <Star className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>No reviews yet.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>


  );
};

export default CustomerProfile;