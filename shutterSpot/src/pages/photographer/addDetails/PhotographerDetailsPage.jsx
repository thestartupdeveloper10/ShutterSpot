import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';

const PhotographerDetailsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    portfolio: '',
    phone: '',
    skills: [],
    cameras: [],
    lenses: [],
    experience: '',
    education: '',
    languages: [],
    availability: [],
    experienceYears: 0,
    location: '',
    services: [],
    priceRange: '',
    photos: [],
    profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  });

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Cloudinary configuration
  const CLOUD_NAME = 'dk1sag6nc';
  const UPLOAD_PRESET = 'shutterspot';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value]
    }));
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const uploadImages = async () => {
    setUploading(true);
    const urls = [];
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', UPLOAD_PRESET);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        urls.push(data.secure_url);
      }
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...urls]
      }));
      setUploading(false);
      setImages([]);
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/photographer/details', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/photographer-dashboard');
      } else {
        const error = await response.json();
        console.error('Failed to save photographer details', error);
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };

  return (
    <div>
      <NavBar />
    <div className="flex items-center justify-center min-h-screen py-24">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Complete Your Photographer Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceYears">Years of Experience</Label>
                <Input 
                  type="number"
                  id="experienceYears" 
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            {/* About and Experience */}
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea 
                id="about" 
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Details</Label>
              <Textarea 
                id="experience" 
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Textarea 
                id="education" 
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required 
              />
            </div>

            {/* Equipment */}
            <div className="space-y-2">
              <Label>Cameras</Label>
              <Select onValueChange={(value) => handleMultiSelect('cameras', value)} multiple>
                <SelectTrigger>
                  <SelectValue placeholder="Select your cameras" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="canon">Canon</SelectItem>
                  <SelectItem value="nikon">Nikon</SelectItem>
                  <SelectItem value="sony">Sony</SelectItem>
                  <SelectItem value="fujifilm">Fujifilm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Lenses</Label>
              <Select onValueChange={(value) => handleMultiSelect('lenses', value)} multiple>
                <SelectTrigger>
                  <SelectValue placeholder="Select your lenses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wide">Wide Angle</SelectItem>
                  <SelectItem value="telephoto">Telephoto</SelectItem>
                  <SelectItem value="prime">Prime</SelectItem>
                  <SelectItem value="macro">Macro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Services and Pricing */}
            <div className="space-y-2">
              <Label>Services</Label>
              <Select onValueChange={(value) => handleMultiSelect('services', value)} multiple>
                <SelectTrigger>
                  <SelectValue placeholder="Select your services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange">Price Range</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priceRange: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">$50-100/hr</SelectItem>
                  <SelectItem value="standard">$100-200/hr</SelectItem>
                  <SelectItem value="premium">$200-500/hr</SelectItem>
                  <SelectItem value="luxury">$500+/hr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label>Portfolio Images</Label>
              <div className="space-y-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              {images.length > 0 && (
                <Button
                  type="button"
                  onClick={uploadImages}
                  disabled={uploading}
                  variant="secondary"
                  className="w-full"
                >
                  {uploading ? 'Uploading...' : `Upload ${images.length} Images`}
                </Button>
              )}
              
              {/* Image Preview Grid */}
              <div className="grid grid-cols-3 gap-2">
                {formData.photos.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    <Footer/>
    </div>
  );
};

export default PhotographerDetailsPage;