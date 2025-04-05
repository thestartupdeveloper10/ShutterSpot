import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userRequest } from '@/service/requestMethods';
import { updateUserProfile } from '@/redux/features/user/userSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const CreateClientProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    location: '',
    profilePic: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await userRequest.post('/client', formData);
      
      // Dispatch the new profile update action
      dispatch(updateUserProfile(response.data.clientProfile));

      // Force a refresh of the user data
      const refreshUserData = async () => {
        try {
          const userResponse = await userRequest.get(`/users/find/${user.id}`);
          if (userResponse.data) {
            dispatch(updateUser({
              ...user,
              profile: response.data.clientProfile
            }));
          }
        } catch (error) {
          console.error('Error refreshing user data:', error);
        }
      };

      await refreshUserData();
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Prevent access if user already has a profile
  useEffect(() => {
    if (user?.profile) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'client') {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Please provide additional information to complete your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profilePic">Profile Picture URL (Optional)</Label>
              <Input
                id="profilePic"
                name="profilePic"
                type="url"
                value={formData.profilePic}
                onChange={handleChange}
                placeholder="Enter profile picture URL"
              />
            </div>

            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Profile..." : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateClientProfile; 