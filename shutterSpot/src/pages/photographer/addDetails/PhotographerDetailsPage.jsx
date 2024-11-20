import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';
import { userRequest } from '@/service/requestMethods';
import { useSelector } from 'react-redux';
import kenyaCounties from '@/utils/kenyaCounties';

const PhotographerDetailsPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  
  const [formData, setFormData] = useState({
    userId: user.id,
    name: '',
    about: '',
    portfolio: '',
    phone: '',
    skills: [],
    status: 'available',
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
    profilePic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  });

  const [portfolioImages, setPortfolioImages] = useState([]);
  
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME = 'dk1sag6nc';
  const UPLOAD_PRESET = 'shutterspot';

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['cameras', 'lenses', 'services'].includes(name)
        ? value.split(',').map((item) => item.trim()) // Split into array
        : value,
    }));
  };
  
  

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues
        : [...currentValues, value];
      
      return {
        ...prev,
        [field]: updatedValues
      };
    });
  };

  // const handleRemoveMultiSelectItem = (field, value) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [field]: prev[field].filter(item => item !== value)
  //   }));
  // };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          profilePic: data.secure_url
        }));
      } catch (error) {
        console.error('Error uploading profile image:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handlePortfolioImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setPortfolioImages(selectedFiles);
  };

  const handlePortfolioUpload = async () => {
    setUploading(true);
    try {
      const uploadPromises = portfolioImages.map(image => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', UPLOAD_PRESET);

        return fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        ).then(response => response.json());
      });

      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.secure_url);
      
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...urls]
      }));
      setPortfolioImages([]);
    } catch (error) {
      console.error('Error uploading portfolio images:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = {
      ...formData,
      experienceYears: parseInt(formData.experienceYears, 10)
    }

    try {
      const response = await userRequest.post('photographers', formDataToSubmit);

      if (response.status === 201) {
        console.log(`/photographerProfile/${user.id}`)
        console.log('return data',response.data)
        navigate(`/photographerProfile/${user.id}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
              {/* Profile Image Upload Section */}
              <div className="space-y-4">
                <Label>Profile Picture</Label>
                <div className="flex items-center space-x-4">
                  <img
                    src={formData.profilePic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Select 
                    value={formData.location}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your county" />
                    </SelectTrigger>
                    <SelectContent>
                      {kenyaCounties.map((county) => (
                        <SelectItem key={county._id} value={county.name}>
                          {county.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceYears">Years of Experience</Label>
                  <Input 
                    type="number"
                    id="experienceYears" 
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    min="0"
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

              {/* Skills Section */}
              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {['Photography', 'Videography','Event Coverage','Concert Photography','Streets','Wildlife','Travel', 'Post-Processing', 'Studio Lighting', 'Drone Photography'].map(skill => (
                    <div 
                      key={skill} 
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                        formData.skills.includes(skill) 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => handleMultiSelect('skills', skill)}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="space-y-2">
                <Label>Availability</Label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  placeholder="Weekdays,Weekends,Evening,Monday,..."
                  value={formData.availability}
                  onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
                  className="form-input w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>


              {/* Languages Section */}
              <div className="space-y-2">
                <Label>Languages</Label>
                <div className="flex flex-wrap gap-2">
                  {['English','Swahili', 'Spanish', 'French', 'Mandarin', 'German'].map(language => (
                    <div 
                      key={language} 
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                        formData.languages.includes(language) 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => handleMultiSelect('languages', language)}
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cameras Section */}
              <div className="space-y-2">
                  <Label>Cameras</Label>
                  <input
                    type="text"
                    id="cameras"
                    name="cameras"
                    placeholder="Sony,Nikon,Samsung,..."
                    value={formData.cameras}
                    onChange={(e) => handleInputChange(e)}
                    className="form-input w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>


              {/* Lenses Section */}
              <div className="space-y-2">
                  <Label>Lenses</Label>
                  <input
                    type="text"
                    id="lenses"
                    name="lenses"
                    placeholder="35mm f/1.8,16-35mm f/2.8,85mm f/1.4,..."
                    value={formData.lenses}
                    onChange={(e) => handleInputChange(e)}
                    className="form-input w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>


              {/* Services Section */}
              <div className="space-y-2">
                  <Label>Services</Label>
                  <input
                    type="text"
                    id="services"
                    name="services"
                    placeholder="Portrait, Landscape,Weeding,.."
                    value={formData.services}
                    onChange={(e) => handleInputChange(e)}
                    className="form-input w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>


              {/* Price Range */}
              <div className="space-y-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <Select 
                  value={formData.priceRange}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, priceRange: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Ksh 100-200</SelectItem>
                    <SelectItem value="standard">Ksh 200-300</SelectItem>
                    <SelectItem value="premium">Ksh 300-500</SelectItem>
                    <SelectItem value="luxury">Ksh 500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Portfolio Images Upload Section */}
              <div className="space-y-4">
                <Label>Portfolio Images</Label>
                <div className="space-y-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePortfolioImagesChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
                {portfolioImages.length > 0 && (
                  <Button
                    type="button"
                    onClick={handlePortfolioUpload}
                    disabled={uploading}
                    variant="secondary"
                    className="w-full"
                  >
                    {uploading ? 'Uploading...' : `Upload ${portfolioImages.length} Images`}
                  </Button>
                )}
                
                {/* Portfolio Preview Grid */}
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