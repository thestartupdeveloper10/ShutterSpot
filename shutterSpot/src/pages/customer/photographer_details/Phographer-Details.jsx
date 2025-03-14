import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Camera, Aperture, Globe, Users, Smile, Camera as CameraIcon, Shield, ArrowUp, Mail, Phone, MessageSquare } from 'lucide-react';
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
import { userRequest } from '@/service/requestMethods';
import { useSelector, useDispatch } from 'react-redux';
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from '@/redux/apiCalls';

const BookingForm = ({ photographer }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numberOfPhotos, setNumberOfPhotos] = useState(1);
  
  const [formData, setFormData] = useState({
    photographerId: photographer?._id,
    clientId: user?.currentUser?.id || '',
    location: photographer?.location || '',
    duration: '',
    totalPrice: '',
    message: '',
    status: 'pending'
  });

  // Generate time options from 8 AM to 8 PM
  const timeOptions = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    const time = `${hour.toString().padStart(2, '0')}:${minute}`;
    return time;
  }).filter(time => {
    const hour = parseInt(time.split(':')[0]);
    return hour < 20; // Only include times before 8 PM
  });

  // Helper function to parse price from priceRange
  const getPriceFromRange = (priceRange) => {
    if (!priceRange) return 0;
    const match = priceRange.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Determine pricing model from priceRange
  const getPricingModel = (priceRange) => {
    if (!priceRange) return 'hourly';
    return priceRange.toLowerCase().includes('/hr') ? 'hourly' : 'perPhoto';
  };

  // Calculate price based on photographer's pricing model
  useEffect(() => {
    if (!photographer) return;

    const pricingModel = getPricingModel(photographer.priceRange);
    const basePrice = getPriceFromRange(photographer.priceRange);
    let calculatedPrice = 0;
    
    if (pricingModel === 'hourly') {
      if (startTime && endTime) {
        const start = new Date(`2000/01/01 ${startTime}`);
        const end = new Date(`2000/01/01 ${endTime}`);
        const durationHours = (end - start) / (1000 * 60 * 60);
        
        if (durationHours > 0) {
          calculatedPrice = durationHours * basePrice;
          setFormData(prev => ({
            ...prev,
            duration: durationHours.toString(),
            totalPrice: calculatedPrice.toString()
          }));
        }
      }
    } else {
      calculatedPrice = numberOfPhotos * basePrice;
      setFormData(prev => ({
        ...prev,
        duration: startTime && endTime ? 
          ((new Date(`2000/01/01 ${endTime}`) - new Date(`2000/01/01 ${startTime}`)) / (1000 * 60 * 60)).toString() : 
          '',
        totalPrice: calculatedPrice.toString()
      }));
    }
  }, [startTime, endTime, numberOfPhotos, photographer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user?.currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book a session",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a date for your booking",
        variant: "destructive"
      });
      return;
    }

    const bookingData = {
      photographerId: photographer.id,
      clientId: user.currentUser.id,
      location: formData.location,
      duration: formData.duration,
      totalPrice: formData.totalPrice,
      date: format(date, 'yyyy-MM-dd'),
      startTime,
      endTime
    };
    
    try {
      await createBooking(dispatch, bookingData);
      toast({
        title: "Success",
        description: "Booking created successfully",
      });
      navigate('/profile');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking",
        variant: "destructive",
      });
    }
  };

  // Add this function to filter out past dates
  const filterPastDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="mt-1">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                filterDate={filterPastDates}
                placeholderText="Select a date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Start Time</label>
              <select
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                <option value="">Select start time</option>
                {timeOptions.map((time) => (
                  <option 
                    key={time} 
                    value={time}
                    disabled={endTime && time >= endTime}
                  >
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">End Time</label>
              <select
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                <option value="">Select end time</option>
                {timeOptions.map((time) => (
                  <option 
                    key={time} 
                    value={time}
                    disabled={startTime && time <= startTime}
                  >
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {getPricingModel(photographer?.priceRange) === 'perPhoto' && (
            <div>
              <label className="text-sm font-medium text-gray-700">Number of Photos</label>
              <Input
                type="number"
                min="1"
                value={numberOfPhotos}
                onChange={(e) => setNumberOfPhotos(parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>
          )}

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
            {photographer?.location && (
              <p className="text-sm text-gray-500 mt-1">
                Default location: {photographer.location}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        {user?.currentUser ? 'Confirm Booking' : 'Login to Book'}
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

const ProfileHeader = ({ name, location, experience, image, status, photographer }) => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const { toast } = useToast();

  const handleBookNowClick = () => {
    if (!user?.currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book a session",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
  };

  return (
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
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleBookNowClick}
              >
                Book Now
              </Button>
            </DialogTrigger>
            {user?.currentUser && (
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Book {name}</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to book a session with {name}.
                    <span className="block mt-1">Rate: {photographer.priceRange}</span>
                  </DialogDescription>
                </DialogHeader>
                <BookingForm photographer={photographer} />
              </DialogContent>
            )}
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

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
        const response = await userRequest.get(`photographers/find/${id}`);
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

  console.log('photograher',photographer)

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!photographer) return <div className="min-h-screen flex items-center justify-center">Photographer not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
     
      <main className="py-12 md:mx-24 mx-5">
        <PhotoGrid images={photographer.photos} />
        
        <ProfileHeader 
          name={photographer.name}
          location={photographer.location}
          experience={`${photographer.experienceYears} years of experience`}
          image={photographer.profilePic}
          status={photographer.status}
          photographer={photographer}
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
    
    </div>
  );
};

export default Photographer_Details;