import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { userRequest } from '@/service/requestMethods';
import { Bell, Lock, User, Mail, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    bookingAlerts: true,
    messageAlerts: true,
    marketingEmails: false,
  });

  const [profileSettings, setProfileSettings] = useState({
    displayName: currentUser?.name || '',
    bio: currentUser?.about || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [businessSettings, setBusinessSettings] = useState({
    hourlyRate: currentUser?.priceRange || '',
    availability: currentUser?.availability || [],
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
      const response = await userRequest.put(`/photographers/${currentUser.id}`, profileSettings);
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
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Security
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
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={profileSettings.displayName}
                    onChange={(e) => setProfileSettings(prev => ({
                      ...prev,
                      displayName: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings(prev => ({
                      ...prev,
                      bio: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                  />
                </div>
                <Button type="submit">Save Profile</Button>
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

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Update your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={securitySettings.currentPassword}
                    onChange={(e) => setSecuritySettings(prev => ({
                      ...prev,
                      currentPassword: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={securitySettings.newPassword}
                    onChange={(e) => setSecuritySettings(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={securitySettings.confirmPassword}
                    onChange={(e) => setSecuritySettings(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
                  />
                </div>
                <Button type="submit">Update Password</Button>
              </form>
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
    </div>
  );
};

export default Settings;
