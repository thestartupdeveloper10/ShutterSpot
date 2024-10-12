import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PhotographerDetailsPage = () => {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [hourlyRate, setHourlyRate] = useState('');
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');
  const [camera, setCamera] = useState('');
  const [lenses, setLenses] = useState('');
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const photographerDetails = {
      specialties,
      pricing: { hourlyRate: parseFloat(hourlyRate) },
      experience,
      about,
      equipment: { camera, lenses },
      languages,
      skills,
    };

    try {
      const response = await fetch('/api/photographer/details', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(photographerDetails)
      });

      if (response.ok) {
        navigate('/photographer-dashboard');
      } else {
        const error = await response.json();
        console.error('Failed to save photographer details', error);
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Network error', error);
      // Handle network error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Complete Your Photographer Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="specialties">Specialties</Label>
              <Select onValueChange={(value) => setSpecialties([...specialties, value])} multiple>
                <SelectTrigger>
                  <SelectValue placeholder="Select your specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  {/* Add more specialties as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input 
                type="number" 
                id="hourlyRate" 
                value={hourlyRate} 
                onChange={(e) => setHourlyRate(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Textarea 
                id="experience" 
                value={experience} 
                onChange={(e) => setExperience(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea 
                id="about" 
                value={about} 
                onChange={(e) => setAbout(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="camera">Camera</Label>
              <Input 
                type="text" 
                id="camera" 
                value={camera} 
                onChange={(e) => setCamera(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lenses">Lenses</Label>
              <Input 
                type="text" 
                id="lenses" 
                value={lenses} 
                onChange={(e) => setLenses(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              <Select onValueChange={(value) => setLanguages([...languages, value])} multiple>
                <SelectTrigger>
                  <SelectValue placeholder="Select languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  {/* Add more languages as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Select onValueChange={(value) => setSkills([...skills, value])} multiple>
                <SelectTrigger>
                  <SelectValue placeholder="Select skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photoshop">Photoshop</SelectItem>
                  <SelectItem value="lightroom">Lightroom</SelectItem>
                  <SelectItem value="videography">Videography</SelectItem>
                  {/* Add more skills as needed */}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotographerDetailsPage;