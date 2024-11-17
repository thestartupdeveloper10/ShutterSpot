import React, { useState } from 'react';
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
  Image as ImageIcon,
  MessageCircle,
  DollarSign,
  Calendar as CalendarIcon,
  Bell,
  CreditCard,
  History
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';
import EditProfileDialog from '@/component/EditProfileDialog';

// Mock Customer Data
const customerData = {
  id: "1",
  name: "Michael Johnson",
  email: "michael.johnson@example.com",
  phone: "+1 (555) 987-6543",
  location: "Los Angeles, CA",
  memberSince: "March 2023",
  avatar: "/api/placeholder/300/300",
  upcomingBookings: [
    {
      id: 1,
      photographer: "Sarah Anderson",
      type: "Wedding Photography",
      date: "2024-11-15",
      time: "14:00",
      status: "confirmed",
      price: 1200,
      location: "Sunset Beach Resort"
    },
    {
      id: 2,
      photographer: "James Wilson",
      type: "Family Portrait",
      date: "2024-12-01",
      time: "10:00",
      status: "pending",
      price: 350,
      location: "Central Park"
    }
  ],
  pastBookings: [
    {
      id: 3,
      photographer: "Emily Davis",
      type: "Engagement Photos",
      date: "2024-10-15",
      time: "16:00",
      status: "completed",
      price: 500,
      rating: 5,
      review: "Emily was amazing! The photos turned out beautifully.",
      photos: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400"
      ]
    },
    {
      id: 4,
      photographer: "Sarah Anderson",
      type: "Birthday Party",
      date: "2024-09-20",
      time: "13:00",
      status: "completed",
      price: 400,
      rating: 4,
      review: "Great service and beautiful photos!",
      photos: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400"
      ]
    }
  ],
  favoritePhotographers: [
    {
      id: 1,
      name: "Sarah Anderson",
      specialty: "Weddings & Portraits",
      rating: 4.8,
      avatar: "/api/placeholder/300/300"
    },
    {
      id: 2,
      name: "James Wilson",
      specialty: "Family & Events",
      rating: 4.6,
      avatar: "/api/placeholder/300/300"
    }
  ],
  paymentMethods: [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/25",
      default: true
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "09/24",
      default: false
    }
  ]
};

const BookingCard = ({ booking }) => {
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800"
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full p-3 bg-gray-100">
              <Camera className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold">{booking.photographer}</h3>
              <p className="text-sm text-gray-600">{booking.type}</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{booking.date}</span>
                <Clock className="h-4 w-4 text-gray-400 ml-2" />
                <span className="text-sm text-gray-600">{booking.time}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{booking.location}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
            <Badge variant="outline" className={statusColors[booking.status]}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
            <p className="font-semibold">${booking.price}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <MessageCircle className="mr-2 h-4 w-4" /> Message Photographer
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" /> Modify Booking
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" /> Cancel Booking
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {booking.status === 'completed' && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < booking.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">{booking.rating}/5</span>
            </div>
            <p className="text-sm text-gray-600">{booking.review}</p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {booking.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Booking photo ${index + 1}`}
                  className="rounded-lg w-full h-24 object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PaymentMethodCard = ({ method }) => (
  <Card className="mb-4">
    <CardContent className="flex justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <div className="rounded-full p-2 bg-gray-100">
          <CreditCard className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <p className="font-medium">{method.type} •••• {method.last4}</p>
          <p className="text-sm text-gray-600">Expires {method.expiry}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {method.default && (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Default
          </Badge>
        )}
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const FavoritePhotographerCard = ({ photographer }) => (
  <Card className="mb-4">
    <CardContent className="flex items-center gap-4 p-4">
      <img
        src={photographer.avatar}
        alt={photographer.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{photographer.name}</h3>
        <p className="text-sm text-gray-600">{photographer.specialty}</p>
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600">{photographer.rating}</span>
        </div>
      </div>
      <Button variant="outline" size="sm">
        Book Now
      </Button>
    </CardContent>
  </Card>
);

const CustomerProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        <NavBar/>
      <div className="py-28 md:mx-24 mx-5 px-4">

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={customerData.avatar}
                    alt={customerData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className="h-4 w-4" />

                </Button>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{customerData.name}</h1>
                    <p className="text-gray-600 mb-4">Member since {customerData.memberSince}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {customerData.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {customerData.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {customerData.location}
                      </div>
                    </div>
                  </div>
                  <EditProfileDialog 
                  customerData={customerData}
                  onUpdateProfile={(updatedProfile) => {
    // Update your local state/refresh data
    console.log('Profile updated:', updatedProfile);
  }}/>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>
                    Your scheduled photo sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {customerData.upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Past Bookings</CardTitle>
                  <CardDescription>
                    Your completed photo sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {customerData.pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Photographers</CardTitle>
                <CardDescription>
                  Photographers you've saved
                </CardDescription>
              </CardHeader>
              <CardContent>
                {customerData.favoritePhotographers.map((photographer) => (
                  <FavoritePhotographerCard key={photographer.id} photographer={photographer} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment options
                    </CardDescription>
                  </div>
                  <Button>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add New Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {customerData.paymentMethods.map((method) => (
                  <PaymentMethodCard key={method.id} method={method} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your preferences and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}

{/* Personal Information */}
<div className="space-y-6">
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Personal Information</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="name">Full Name</Label>
      <Input id="name" defaultValue={customerData.name} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" defaultValue={customerData.email} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="phone">Phone</Label>
      <Input id="phone" type="tel" defaultValue={customerData.phone} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <Input id="location" defaultValue={customerData.location} />
    </div>
  </div>
</div>

{/* Notification Preferences */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Notification Preferences</h3>
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Booking Confirmations</Label>
        <p className="text-sm text-gray-500">Receive notifications when your booking is confirmed</p>
      </div>
      <Switch defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Booking Reminders</Label>
        <p className="text-sm text-gray-500">Get reminded about upcoming photo sessions</p>
      </div>
      <Switch defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Photo Delivery Updates</Label>
        <p className="text-sm text-gray-500">Be notified when your photos are ready</p>
      </div>
      <Switch defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Special Offers</Label>
        <p className="text-sm text-gray-500">Receive updates about deals and promotions</p>
      </div>
      <Switch />
    </div>
  </div>
</div>

{/* Communication Preferences */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Communication Preferences</h3>
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Email Updates</Label>
        <p className="text-sm text-gray-500">Receive notifications via email</p>
      </div>
      <Switch defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>SMS Updates</Label>
        <p className="text-sm text-gray-500">Receive notifications via text message</p>
      </div>
      <Switch defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>WhatsApp Updates</Label>
        <p className="text-sm text-gray-500">Receive notifications via WhatsApp</p>
      </div>
      <Switch />
    </div>
  </div>
</div>

{/* Privacy Settings */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Privacy Settings</h3>
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Profile Visibility</Label>
        <p className="text-sm text-gray-500">Allow photographers to view your booking history</p>
      </div>
      <Switch />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Review Privacy</Label>
        <p className="text-sm text-gray-500">Show your name with your reviews</p>
      </div>
      <Switch defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Photo Usage Permission</Label>
        <p className="text-sm text-gray-500">Allow photographers to use your photos in their portfolio</p>
      </div>
      <Switch defaultChecked />
    </div>
  </div>
</div>

{/* Booking Preferences */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Booking Preferences</h3>
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Quick Book</Label>
        <p className="text-sm text-gray-500">Enable one-click booking with saved photographers</p>
      </div>
      <Switch />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Automatic Payment</Label>
        <p className="text-sm text-gray-500">Automatically process payments for confirmed bookings</p>
      </div>
      <Switch />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Calendar Sync</Label>
        <p className="text-sm text-gray-500">Sync bookings with your personal calendar</p>
      </div>
      <Switch defaultChecked />
    </div>
  </div>
</div>

{/* Save Button */}
<div className="flex justify-end space-x-4">
  <Button variant="outline">Cancel</Button>
  <Button>Save Changes</Button>
</div>
</div>
</CardContent>
</Card>
</TabsContent>
</Tabs>
</div>
<Footer/>
</div>
);
};

export default CustomerProfile;