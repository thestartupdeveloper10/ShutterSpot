import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { publicRequest } from '@/service/requestMethods';

const BookingForm = ({ photographerName, photographerPhone }) => {
  const [formData, setFormData] = useState({
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
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={images[0]} alt="Photo 1" />
      </div>
      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={images[1]} alt="Photo 2" />
      </div>
    </div>
    <div className="md:col-span-3">
      <div className="relative h-[calc(100%-1rem)] overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={images[2]} alt="Photo 3" />
      </div>
    </div>
    <div className="md:col-span-2 flex flex-col gap-4">
      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={images[3]} alt="Photo 4" />
      </div>
      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={images[4]} alt="Photo 5" />
      </div>
    </div>
  </div>
);

const ProfileHeader = ({ name, location, experience, image, status }) => (
  <Card className="mt-8">
    <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
      <div className="relative">
        <div className="rounded-full h-32 w-32 overflow-hidden">
          <img className="w-full h-full object-cover" src={image} alt={name} />
        </div>
        {status === 'available' && (
          <div className="absolute -top-2 -right-2 flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
            <span className="text-sm text-green-700">Available</span>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </div>
        )}
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

const QuickContact = ({ phone }) => (
  <div className="fixed bottom-6 right-6 flex flex-col gap-3">
    <a href={`tel:${phone}`}>
      <Button size="icon" variant="outline" className="rounded-full h-12 w-12 bg-white shadow-lg">
        <Phone className="h-5 w-5" />
      </Button>
    </a>
    <Button size="icon" variant="outline" className="rounded-full h-12 w-12 bg-white shadow-lg">
      <Mail className="h-5 w-5" />
    </Button>
    <Button size="icon" variant="outline" className="rounded-full h-12 w-12 bg-white shadow-lg">
      <MessageSquare className="h-5 w-5" />
    </Button>
  </div>
);

const Photographer_Details = () => {
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const response = await publicRequest.get(`photographers/find/${id}`);
        setPhotographer(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching photographer:', err);
        setError('Failed to load photographer details. Please try again later.');
        setLoading(false);
      }
    };

    fetchPhotographer();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!photographer) return <div className="min-h-screen flex items-center justify-center">Photographer not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="py-28 md:mx-24 mx-5">
        <PhotoGrid images={photographer.photos} />
        
        <ProfileHeader 
          name={photographer.name}
          location={photographer.location}
          experience={`${photographer.experienceYears} years of experience`}
          image={photographer.profilePic}
          status={photographer.status}
        />

        <Tabs defaultValue="about" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="portfolio">Services & Price</TabsTrigger>
            <TabsTrigger value="equipment">Equipment & Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{photographer.about}</p>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p className="text-gray-600">{photographer.education}</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <div className="flex gap-2">
                    {photographer.languages.map((language, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Availability</h3>
                  <div className="flex gap-2">
                    {photographer.availability.map((time, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Services & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Services Offered</h3>
                    <div className="flex flex-wrap gap-2">
                      {photographer.services.map((service, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Price Range</h3>
                    <p className="text-gray-600">{photographer.priceRange}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Portfolio</h3>
                    <a href={photographer.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Full Portfolio
                    </a>
                  </div>
                </div>
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
                          <p className="font-medium">Cameras</p>
                          <ul className="text-gray-600 list-disc list-inside">
                            {photographer.cameras.map((camera, index) => (
                              <li key={index}>{camera}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Aperture className="text-gray-600" />
                        <div>
                          <p className="font-medium">Lenses</p>
                          <ul className="text-gray-600 list-disc list-inside">
                            {photographer.lenses.map((lens, index) => (
                              <li key={index}>{lens}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {photographer.skills.map((skill, index) => (
                        <span key={index} className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {index === 0 ? <Users size={16} /> :
                           index === 1 ? <Smile size={16} /> :
                           index === 2 ? <CameraIcon size={16} /> :
                           <Shield size={16} />}
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
      <QuickContact phone={photographer.phone} />
      <Footer />
    </div>
  );
};

export default Photographer_Details;