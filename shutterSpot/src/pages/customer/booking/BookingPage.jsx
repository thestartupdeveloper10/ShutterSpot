import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { userRequest } from '@/service/requestMethods';
import { useSelector } from 'react-redux';
import { BookingForm } from '@/component/booking/BookingForm';

const BookingPage = () => {
  const { photographerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useSelector(state => state.user);
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const response = await userRequest.get(`photographers/find/${photographerId}`);
        setPhotographer(response.data);
        setLoading(false);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load photographer details",
          variant: "destructive",
        });
        navigate('/');
      }
    };

    if (!user?.currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book a session",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    fetchPhotographer();
  }, [photographerId, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Book a Session with {photographer.name}</CardTitle>
          <p className="text-gray-600">Rate: {photographer.priceRange}</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Photographer Info */}
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img 
                  src={photographer.profilePic} 
                  alt={photographer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">About the Photographer</h3>
                  <p className="text-gray-600">{photographer.about}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Services</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {photographer.services.map((service, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <BookingForm photographer={photographer} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage; 