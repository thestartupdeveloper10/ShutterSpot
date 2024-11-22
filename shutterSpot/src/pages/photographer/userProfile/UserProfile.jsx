import React, { useState, useCallback } from 'react';
import { User, Mail, Phone, MapPin, Camera, Settings, ImageIcon, Calendar, Clock, Heart, Star, Edit, Trash2, Grid, List, Share2, Instagram, Facebook, Twitter, LinkIcon, Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '@/service/requestMethods';

// AddItemDialog Component
const AddItemDialog = ({ isOpen, onClose, onAdd, title, description, inputLabel }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="item">{inputLabel}</Label>
              <Input
                id="item"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Enter ${inputLabel.toLowerCase()}`}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

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

// BookingCard Component
const BookingCard = ({ booking }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="mb-4">
      <CardContent className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full p-3 bg-gray-100">
            <Calendar className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold">{booking.client?.user?.username || 'Client'}</h3>
            <p className="text-sm text-gray-600">{booking.location}</p>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{formatDate(booking.startDate)}</span>
              <Clock className="h-4 w-4 text-gray-400 ml-2" />
              <span className="text-sm text-gray-600">{formatTime(booking.startDate)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={statusColors[booking.status]}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
          <p className="font-semibold">${booking.totalPrice}</p>
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
const UserProfile = ({ userData: initialUserData }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [viewMode, setViewMode] = useState('grid');
  const [activeDialog, setActiveDialog] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const profile = userData.profile;
  console.log(profile)
  const router = useNavigate()

  const stats = {
    totalBookings: userData.bookings.length,
    totalEarnings: userData.bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
    experienceYears: profile.experienceYears,
    responseRate: 98
  };

  const handleAdd = (category) => (newItem) => {
    setUserData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [category]: [...prev.profile[category], newItem]
      }
    }));
  };

  const handleRemove = (category, index) => {
    setUserData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [category]: prev.profile[category].filter((_, i) => i !== index)
      }
    }));
  };

  const dialogConfigs = {
    cameras: {
      title: "Add Camera",
      description: "Add a new camera to your equipment list",
      inputLabel: "Camera Model"
    },
    lenses: {
      title: "Add Lens",
      description: "Add a new lens to your equipment list",
      inputLabel: "Lens Model"
    },
    services: {
      title: "Add Service",
      description: "Add a new service to your offerings",
      inputLabel: "Service Name"
    },
    skills: {
      title: "Add Skill",
      description: "Add a new skill to your profile",
      inputLabel: "Skill Name"
    },
    languages: {
      title: "Add Language",
      description: "Add a new language you speak",
      inputLabel: "Language"
    },
    availability: {
      title: "Add Availability",
      description: "Add new availability time slot",
      inputLabel: "Time Slot"
    }
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await userRequest.put(`photographers/${profile.id}`,userData)

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      alert('Profile updated successfully!');
      router.push('/profile'); // Redirect to profile page after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [userData, router]);

  // Equipment Section
  const renderEquipmentSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Equipment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Cameras</Label>
          <div className="flex flex-wrap gap-2">
            {userData.profile.cameras.map((camera, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-2">
                {camera}
                <button 
                  className="ml-1 hover:text-red-500"
                  onClick={() => handleRemove('cameras', index)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveDialog('cameras')}
            >
              <Camera className="h-4 w-4 mr-2" /> Add Camera
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Lenses</Label>
          <div className="flex flex-wrap gap-2">
            {userData.profile.lenses.map((lens, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-2">
                {lens}
                <button 
                  className="ml-1 hover:text-red-500"
                  onClick={() => handleRemove('lenses', index)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveDialog('lenses')}
            >
              <Camera className="h-4 w-4 mr-2" /> Add Lens
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Services & Skills Section
  const renderServicesSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Services & Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Services Offered</Label>
          <div className="flex flex-wrap gap-2">
            {userData.profile.services.map((service, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-2">
                {service}
                <button 
                  className="ml-1 hover:text-red-500"
                  onClick={() => handleRemove('services', index)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveDialog('services')}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Service
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="flex flex-wrap gap-2">
            {userData.profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-2">
                {skill}
                <button 
                  className="ml-1 hover:text-red-500"
                  onClick={() => handleRemove('skills', index)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveDialog('skills')}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Skill
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Languages</Label>
          <div className="flex flex-wrap gap-2">
            {userData.profile.languages.map((language, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-2">
                {language}
                <button 
                  className="ml-1 hover:text-red-500"
                  onClick={() => handleRemove('languages', index)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveDialog('languages')}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Language
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Availability Section
  const renderAvailabilitySection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Availability</h3>
      <div className="flex flex-wrap gap-2">
        {userData.profile.availability.map((time, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-2">
            {time}
            <button 
              className="ml-1 hover:text-red-500"
              onClick={() => handleRemove('availability', index)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setActiveDialog('availability')}
        >
          <Clock className="h-4 w-4 mr-2" /> Add Availability
        </Button>
      </div>
    </div>
  );

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
                <PortfolioGrid items={profile.photos} viewMode={viewMode} />
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
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={profile.name} 
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            profile: { ...prev.profile, name: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={userData.email}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            email: e.target.value
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={profile.phone}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            profile: { ...prev.profile, phone: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          value={profile.location}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            profile: { ...prev.profile, location: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="about">About</Label>
                      <textarea
                        id="about"
                        className="w-full min-h-[100px] px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={profile.about}
                        onChange={(e) => setUserData(prev => ({
                          ...prev,
                          profile: { ...prev.profile, about: e.target.value }
                        }))}
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Professional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input 
                          id="experience" 
                          type="number" 
                          value={profile.experienceYears}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            profile: { ...prev.profile, experienceYears: parseInt(e.target.value) }
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education">Education</Label>
                        <Input 
                          id="education" 
                          value={profile.education}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            profile: { ...prev.profile, education: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio URL</Label>
                        <Input 
                          id="portfolio" 
                          type="url" 
                          value={profile.portfolio}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            profile: { ...prev.profile, portfolio: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priceRange">Price Range</Label>
                        <Input 
                          id="priceRange" 
                          value={profile.priceRange}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            profile: { ...prev.profile, priceRange: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>

                  {renderEquipmentSection()}
                  {renderServicesSection()}
                  {renderAvailabilitySection()}

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => router.push('/profile')}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Add Item Dialog */}
      {activeDialog && (
        <AddItemDialog
          isOpen={!!activeDialog}
          onClose={() => setActiveDialog(null)}
          onAdd={handleAdd(activeDialog)}
          {...dialogConfigs[activeDialog]}
        />
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;

