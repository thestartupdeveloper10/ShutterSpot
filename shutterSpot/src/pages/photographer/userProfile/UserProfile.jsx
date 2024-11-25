import { useState, } from 'react';
import {  Mail, Phone, MapPin, Camera,Calendar, Clock, Star, Grid, List, LinkIcon, } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { useSelector } from 'react-redux';



// StatCard Component
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



// PortfolioGrid Component
const PortfolioGrid = ({ items, viewMode }) => (
  <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
    {items.map((item, index) => (
      <Card key={index} className={`overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
        <div className={`relative ${viewMode === 'list' ? 'w-48' : 'w-full'}`}>
          <img
            src={item}
            alt={`Portfolio item ${index + 1}`}
            className="w-full h-48 object-cover"
          />
        </div>
      </Card>
    ))}
  </div>
);

// Main UserProfile Component
const UserProfile = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log('user', user)
  const [userData, setUserData] = useState(user);
  const [viewMode, setViewMode] = useState('grid');
  const profile = userData.profile;
  console.log(profile)
 

  const stats = {
    totalBookings: userData.bookings.length,
    totalEarnings: userData.bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
    experienceYears: profile.experienceYears,
    responseRate: 98
  };


  return (
    
      <div className="">
        {/* Profile Header */}
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={profile.profilePic}
                    alt={profile.name}
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
                    <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
                    <p className="text-gray-600 mb-4">{profile.services.join(', ')}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {userData.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {profile.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {profile.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-gray-600">{profile.about}</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Equipment</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.cameras.map((camera, index) => (
                      <Badge key={index} variant="secondary">{camera}</Badge>
                    ))}
                    {profile.lenses.map((lens, index) => (
                      <Badge key={index} variant="secondary">{lens}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={Calendar}
          />
          <StatCard
            title="Total Earnings"
            value={`$${stats.totalEarnings}`}
            icon={LinkIcon}
          />
          <StatCard
            title="Experience"
            value={`${stats.experienceYears} years`}
            icon={Star}
          />
          <StatCard
            title="Response Rate"
            value={`${stats.responseRate}%`}
            icon={Clock}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
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
                </div>
              </CardHeader>
              <CardContent>
                <PortfolioGrid items={profile.photos} viewMode={viewMode} />
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
      

  );
};

export default UserProfile;

