import { useState, useCallback } from 'react';
import { useSelector, } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { userRequest } from '@/service/requestMethods';
import { Bell, User, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Camera, Clock, Plus, X } from 'lucide-react';
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";


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


const Settings = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log('user', user)
  const [userData, setUserData] = useState(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const router = useNavigate()
  const profile = userData.profile;
  console.log(profile)


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

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    bookingAlerts: true,
    messageAlerts: true,
    marketingEmails: false,
  });

  const [profileSettings, setProfileSettings] = useState({
    displayName: user?.name || '',
    bio: user?.about || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [businessSettings, setBusinessSettings] = useState({
    hourlyRate: user?.priceRange || '',
    availability: user?.availability || [],
    autoAcceptBookings: false,
    minimumNotice: '24',
  });

  const handleNotificationChange = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await userRequest.put(`/photographers/${user.id}`, profileSettings);
      toast.success('Profile settings updated successfully');
    } catch (error) {
      toast.error('Failed to update profile settings');
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      await userRequest.put(`/photographers/${currentUser.id}/password`, {
        currentPassword: securitySettings.currentPassword,
        newPassword: securitySettings.newPassword,
      });
      toast.success('Password updated successfully');
      setSecuritySettings({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error('Failed to update password');
      console.error('Error updating password:', error);
    }
  };

  const handleBusinessUpdate = async (e) => {
    e.preventDefault();
    try {
      await userRequest.put(`/photographers/${currentUser.id}/business`, businessSettings);
      toast.success('Business settings updated successfully');
    } catch (error) {
      toast.error('Failed to update business settings');
      console.error('Error updating business settings:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Business
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
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

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive email updates about your account</p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() => handleNotificationChange('emailNotifications')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Booking Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified when you receive new bookings</p>
                </div>
                <Switch
                  checked={notificationSettings.bookingAlerts}
                  onCheckedChange={() => handleNotificationChange('bookingAlerts')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Message Alerts</Label>
                  <p className="text-sm text-gray-500">Receive notifications for new messages</p>
                </div>
                <Switch
                  checked={notificationSettings.messageAlerts}
                  onCheckedChange={() => handleNotificationChange('messageAlerts')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
              <CardDescription>Manage your business preferences and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBusinessUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={businessSettings.hourlyRate}
                    onChange={(e) => setBusinessSettings(prev => ({
                      ...prev,
                      hourlyRate: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumNotice">Minimum Booking Notice (hours)</Label>
                  <Input
                    id="minimumNotice"
                    type="number"
                    value={businessSettings.minimumNotice}
                    onChange={(e) => setBusinessSettings(prev => ({
                      ...prev,
                      minimumNotice: e.target.value
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-accept Bookings</Label>
                    <p className="text-sm text-gray-500">Automatically accept new booking requests</p>
                  </div>
                  <Switch
                    checked={businessSettings.autoAcceptBookings}
                    onCheckedChange={(checked) => setBusinessSettings(prev => ({
                      ...prev,
                      autoAcceptBookings: checked
                    }))}
                  />
                </div>
                <Button type="submit">Save Business Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Add Item Dialog */}
      {activeDialog && (
        <AddItemDialog
          isOpen={!!activeDialog}
          onClose={() => setActiveDialog(null)}
          onAdd={handleAdd(activeDialog)}
          {...dialogConfigs[activeDialog]}
        />
      )}
    </div>
  );
};

export default Settings;
