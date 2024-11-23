import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Camera, Aperture, Globe, Users, Smile, Camera as CameraIcon, Shield, ArrowUp, Mail, Phone, MessageSquare } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select,SelectGroup, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { useSelector } from 'react-redux';

const BookingForm = ({ photographerName, photographerId }) => {
  const user = useSelector(state => state.user);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  const [formData, setFormData] = useState({
    photographerId: photographerId,
    clientId: user?.currentUser?.id || '',
    location: '',
    duration: '',
    totalPrice: '',
    message: '',
    status: 'pending'
  });

  // Generate time options from 8 AM to 5 PM
  const timeOptions = [];
  for (let i = 8; i <= 17; i++) {
    const hour = i.toString().padStart(2, '0');
    timeOptions.push(`${hour}:00`);
    timeOptions.push(`${hour}:30`);
  }

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`2000/01/01 ${startTime}`);
      const end = new Date(`2000/01/01 ${endTime}`);
      const durationHours = (end - start) / (1000 * 60 * 60);
      
      if (durationHours > 0) {
        setFormData(prev => ({
          ...prev,
          duration: durationHours.toString()
        }));
      }
    }
  }, [startTime, endTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      date,
      startTime,
      endTime,
    };
    
    try {
      const response = await publicRequest.post('/bookings', bookingData);
      console.log('Booking created:', response.data);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 bg-white rounded-lg shadow-sm">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <Input
                value={user?.currentUser?.username || ''}
                disabled
                className="mt-1"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  value={user?.currentUser?.email || ''}
                  disabled
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <Input
                  type="tel"
                  value={user?.currentUser?.profile?.phone || ''}
                  disabled
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full mt-1 justify-start text-left">
                  {date ? format(date, 'PPP') : (
                    <span className="text-gray-500">Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Start Time</label>
              <Select 
                value={startTime} 
                onValueChange={(value) => setStartTime(value)}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {timeOptions.map((time) => (
                      <SelectItem 
                        key={time} 
                        value={time}
                        disabled={endTime && time >= endTime}
                      >
                        {time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">End Time</label>
              <Select 
                value={endTime} 
                onValueChange={(value) => setEndTime(value)}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {timeOptions.map((time) => (
                      <SelectItem 
                        key={time} 
                        value={time}
                        disabled={startTime && time <= startTime}
                      >
                        {time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Duration (hours)</label>
              <Input
                name="duration"
                value={formData.duration}
                disabled
                className="mt-1 bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Total Price</label>
              <Input
                name="totalPrice"
                type="number"
                value={formData.totalPrice}
                onChange={handleInputChange}
                placeholder="Total price"
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Location</label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Event location"
              required
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full mt-8">
        Confirm Booking
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