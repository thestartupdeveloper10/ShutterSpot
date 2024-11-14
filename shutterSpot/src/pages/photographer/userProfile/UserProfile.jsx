import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Settings,
  Image as ImageIcon,
  Calendar,
  Clock,
  Heart,
  Star,
  Edit,
  Trash2,
  Grid,
  List,
  Share2,
  Instagram,
  Facebook,
  Twitter,
  Link as LinkIcon
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

// Mock Data
const userData = {
  id: "1",
  name: "Sarah Anderson",
  role: "Professional Photographer",
  email: "sarah.anderson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Award-winning photographer specializing in portraits and landscapes. Passionate about capturing moments that tell stories.",
  memberSince: "January 2020",
  website: "www.sarahanderson.com",
  social: {
    instagram: "@sarah.shoots",
    facebook: "sarahandersonphoto",
    twitter: "@sarah_shoots"
  },
  stats: {
    completedProjects: 156,
    totalEarnings: 52480,
    averageRating: 4.8,
    totalReviews: 98,
    responseRate: 98,
    responseTime: "2 hours"
  },
  bookings: [
    {
      id: 1,
      client: "John Doe",
      date: "2024-11-15",
      time: "14:00",
      type: "Wedding Photography",
      status: "upcoming",
      price: 1200
    },
    {
      id: 2,
      client: "Emma Wilson",
      date: "2024-11-12",
      time: "10:00",
      type: "Portrait Session",
      status: "upcoming",
      price: 300
    },
    {
      id: 3,
      client: "Michael Brown",
      date: "2024-11-01",
      time: "15:30",
      type: "Family Photos",
      status: "completed",
      price: 450
    }
  ],
  portfolio: [
    { id: 1, image: "/api/placeholder/600/400", title: "Beach Wedding", likes: 245 },
    { id: 2, image: "/api/placeholder/600/400", title: "Mountain Landscape", likes: 189 },
    { id: 3, image: "/api/placeholder/600/400", title: "Corporate Event", likes: 156 },
    { id: 4, image: "/api/placeholder/600/400", title: "Family Portrait", likes: 298 },
    { id: 5, image: "/api/placeholder/600/400", title: "Fashion Shoot", likes: 342 },
    { id: 6, image: "/api/placeholder/600/400", title: "Product Photography", likes: 167 }
  ]
};

const StatCard = ({ title, value, icon: Icon, description }) => (
  <Card>
    <CardContent className="flex items-center p-6">
      <div className="rounded-full p-3 bg-blue-100">
        <Icon className="h-6 w-6 text-blue-700" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

const BookingCard = ({ booking }) => {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };

  return (
    <Card className="mb-4">
      <CardContent className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full p-3 bg-gray-100">
            <Calendar className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold">{booking.client}</h3>
            <p className="text-sm text-gray-600">{booking.type}</p>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{booking.date}</span>
              <Clock className="h-4 w-4 text-gray-400 ml-2" />
              <span className="text-sm text-gray-600">{booking.time}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
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
                <Edit className="mr-2 h-4 w-4" /> Edit Booking
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" /> Share Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Cancel Booking
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

const PortfolioGrid = ({ items, viewMode }) => (
  <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
    {items.map((item) => (
      <Card key={item.id} className={`overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
        <div className={`relative ${viewMode === 'list' ? 'w-48' : 'w-full'}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <h3 className="font-semibold mb-2">{item.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm text-gray-600">{item.likes} likes</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const UserProfile = () => {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="min-h-screen bg-gray-50">
        <NavBar />
      <div className="py-28 md:mx-24 mx-5 px-4">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src="/api/placeholder/300/300"
                    alt={userData.name}
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
                    <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
                    <p className="text-gray-600 mb-4">{userData.role}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {userData.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {userData.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {userData.location}
                      </div>
                    </div>
                  </div>
                  <Button>Edit Profile</Button>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" size="sm">
                    <Instagram className="h-4 w-4 mr-2" />
                    Connect Instagram
                  </Button>
                  <Button variant="outline" size="sm">
                    <Facebook className="h-4 w-4 mr-2" />
                    Connect Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-2" />
                    Connect Twitter
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Completed Projects"
            value={userData.stats.completedProjects}
            icon={ImageIcon}
          />
          <StatCard
            title="Total Earnings"
            value={`$${userData.stats.totalEarnings}`}
            icon={LinkIcon}
          />
          <StatCard
            title="Average Rating"
            value={userData.stats.averageRating}
            icon={Star}
            description={`${userData.stats.totalReviews} reviews`}
          />
          <StatCard
            title="Response Rate"
            value={`${userData.stats.responseRate}%`}
            icon={Clock}
            description={`Avg. ${userData.stats.responseTime}`}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>
                    Showcase of your best work
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button>
                    <ImageIcon className="mr-2 h-4 w-4" /> Add New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <PortfolioGrid items={userData.portfolio} viewMode={viewMode} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>
                  Manage your upcoming and past bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userData.bookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
        <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userData.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={userData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue={userData.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={userData.location} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={userData.bio}
                      />
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Social Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram Handle</Label>
                        <Input 
                          id="instagram" 
                          defaultValue={userData.social.instagram}
                          icon={<Instagram className="h-4 w-4" />}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook Username</Label>
                        <Input 
                          id="facebook" 
                          defaultValue={userData.social.facebook}
                          icon={<Facebook className="h-4 w-4" />}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter Handle</Label>
                        <Input 
                          id="twitter" 
                          defaultValue={userData.social.twitter}
                          icon={<Twitter className="h-4 w-4" />}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website" 
                          defaultValue={userData.website}
                          icon={<LinkIcon className="h-4 w-4" />}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notifications Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive email updates about your bookings</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive text messages for booking reminders</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Marketing Updates</Label>
                          <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Privacy</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Public Profile</Label>
                          <p className="text-sm text-gray-500">Make your profile visible to everyone</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Show Email</Label>
                          <p className="text-sm text-gray-500">Display your email on your public profile</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Show Phone Number</Label>
                          <p className="text-sm text-gray-500">Display your phone number on your public profile</p>
                        </div>
                        <Switch />
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

export default UserProfile;