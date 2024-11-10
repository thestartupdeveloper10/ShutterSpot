import React, { useState } from 'react';
import { Camera, Aperture, Globe, Users, Smile, Camera as CameraIcon, Shield, ArrowUp, Calendar, Mail, Phone, MessageSquare } from 'lucide-react';
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data remains the same as your original code
const photographerData = {
  name: "Cliffe",
  location: "Pleasanton",
  experience: "15 years of experience",
  about: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti illum perspiciatis modi quidem nulla, nihil, magnam molestiae at reiciendis pariatur omnis mollitia voluptate sit dolore, nesciunt sunt fuga impedit expedita.",
  portfolio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti illum perspiciatis modi quidem nulla, nihil, magnam molestiae at reiciendis pariatur omnis mollitia voluptate sit dolore, nesciunt sunt fuga impedit expedita.",
  booking: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti illum perspiciatis modi quidem nulla, nihil, magnam molestiae at reiciendis pariatur omnis mollitia voluptate sit dolore, nesciunt sunt fuga impedit expedita.",
  equipment: {
    camera: "Canon 5d MKIV",
    lenses: "35mm, 85mm, 70-200mm, 14-24mm"
  },
  languages: ["English"],
  skills: ["Large Groups", "Capturing Emotions", "Candid Moments", "Story Telling", "Going the Extra Mile"]
};

const BookingForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Full Name
        </label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Phone Number
        </label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Preferred Date
        </label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Message
        </label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your event or project..."
        />
      </div>

      <Button type="submit" className="w-full">
        Book Now
      </Button>
    </form>
  );
};

const PhotoGrid = ({ images }) => (
  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
    <div className="md:col-span-2 flex flex-col gap-4">
      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={images[0]} alt="Wedding" />
      </div>
      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={images[1]} alt="Food" />
      </div>
    </div>
    <div className="md:col-span-3">
      <div className="relative h-[calc(100%-1rem)] overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={images[2]} alt="Studio" />
      </div>
    </div>
    <div className="md:col-span-2 flex flex-col gap-4">
      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={images[3]} alt="Landscape" />
      </div>
      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={images[4]} alt="Portrait" />
      </div>
    </div>
  </div>
);

const ProfileHeader = ({ name, location, experience, image }) => (
  <Card className="mt-8">
    <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
      <div className="relative">
        <div className="rounded-full h-32 w-32 overflow-hidden">
          <img className="w-full h-full object-cover" src={image} alt={name} />
        </div>
        <div className="absolute -top-2 -right-2 flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
          <span className="text-sm text-green-700">Available</span>
          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <div className="flex flex-col md:flex-row gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Globe size={18} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Camera size={18} />
            <span>{experience}</span>
          </div>
        </div>
      </div>
      <div className="ml-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Book Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Book {name}</DialogTitle>
              <DialogDescription>
                Fill out the form below to book a session with {name}.
              </DialogDescription>
            </DialogHeader>
            <BookingForm />
          </DialogContent>
        </Dialog>
      </div>
    </CardContent>
  </Card>
);

const QuickContact = () => (
  <div className="fixed bottom-6 right-6 flex flex-col gap-3">
    <Button size="icon" variant="outline" className="rounded-full h-12 w-12 bg-white shadow-lg">
      <Phone className="h-5 w-5" />
    </Button>
    <Button size="icon" variant="outline" className="rounded-full h-12 w-12 bg-white shadow-lg">
      <Mail className="h-5 w-5" />
    </Button>
    <Button size="icon" variant="outline" className="rounded-full h-12 w-12 bg-white shadow-lg">
      <MessageSquare className="h-5 w-5" />
    </Button>
  </div>
);

const Photographer_Details = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="py-28 md:mx-24 mx-5">
        <PhotoGrid images={[
          'https://cdn.pixabay.com/photo/2022/01/13/00/05/austria-6934162_960_720.jpg',
          'https://cdn.pixabay.com/photo/2023/09/17/19/43/lizard-8259209_960_720.jpg',
          'https://cdn.pixabay.com/photo/2024/02/07/14/02/tree-8559118_960_720.jpg',
          'https://cdn.pixabay.com/photo/2023/11/16/18/46/mushroom-8392883_960_720.jpg',
          'https://cdn.pixabay.com/photo/2024/07/25/08/47/flower-8920535_960_720.jpg'
        ]} />
        
        <ProfileHeader 
          name={photographerData.name}
          location={photographerData.location}
          experience={photographerData.experience}
          image="https://cdn.pixabay.com/photo/2023/12/11/12/51/lynx-8443540_960_720.jpg"
        />

        <Tabs defaultValue="about" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="equipment">Equipment & Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{photographerData.about}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{photographerData.portfolio}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment">
            <Card>
              <CardHeader>
                <CardTitle>Equipment & Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Equipment</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Camera className="text-gray-600" />
                        <div>
                          <p className="font-medium">Camera</p>
                          <p className="text-gray-600">{photographerData.equipment.camera}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Aperture className="text-gray-600" />
                        <div>
                          <p className="font-medium">Lenses</p>
                          <p className="text-gray-600">{photographerData.equipment.lenses}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {photographerData.skills.map((skill, index) => (
                        <span key={index} className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {index === 0 ? <Users size={16} /> :
                           index === 1 ? <Smile size={16} /> :
                           index === 2 ? <CameraIcon size={16} /> :
                           index === 3 ? <Shield size={16} /> :
                           <ArrowUp size={16} />}
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <QuickContact />
      <Footer />
    </div>
  );
};

export default Photographer_Details;