import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Settings,
  Calendar,
  Clock,
  Heart,
  Star,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Footer";

const CustomerProfile = ({ userData }) => {
  console.log('client user:', userData);
  const { username, email, profile, bookings, reviews } = userData;

  const renderBookingStatus = (status) => {
    const statusColors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return (
      <Badge className={`py-1 px-2 ${statusColors[status.toLowerCase()]}`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="py-20 px-6 md:mx-24">
        {/* Profile Section */}
        <Card>
          <CardContent className="flex flex-col md:flex-row items-start gap-6 p-6">
            <img
              src={profile.profilePic}
              alt={`${username}'s profile`}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{username}</h1>
              <p className="text-gray-600">{profile.location}</p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{profile.phone}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="bookings" className="mt-8">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div key={booking.id} className="flex items-start gap-6 py-4">
                      <div className="flex-1">
                        <p className="font-medium">
                          Photographer: {booking.photographerId}
                        </p>
                        <p className="text-sm text-gray-600">
                          Date: {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                      {renderBookingStatus("confirmed")}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No bookings found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="py-4">
                      <p className="font-medium">
                        Photographer: {review.photographerId}
                      </p>
                      <p className="text-sm text-gray-600">
                        {review.content || "No review text provided."}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No reviews found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerProfile;
