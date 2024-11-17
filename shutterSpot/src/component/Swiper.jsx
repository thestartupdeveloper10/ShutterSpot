import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';
import { Star, MapPin, DollarSign } from "lucide-react";
import { publicRequest } from '@/service/requestMethods';

const PhotographerCard = ({ photographer }) => {
  // Extract first photo as main image and next 2 as portfolio images
  const mainImage = photographer.profilePic || photographer.photos[0];
  const portfolioImages = photographer.photos.slice(0, 2);

  // Extract starting price from price range (e.g., "$500 - $3000" -> 500)
  const startingPrice = photographer.priceRange.match(/\$(\d+)/)?.[1] || '0';

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="flex flex-col h-full bg-white rounded-md overflow-hidden">
          <div className="grid grid-cols-3 gap-1">
            <div className='col-span-2'>
              <img src={mainImage} className='h-[250px] w-full object-cover' alt={photographer.name} />
            </div>
            <div className="flex flex-col gap-1">
              {portfolioImages.map((img, index) => (
                <div key={index} className='w-full h-[125px]'>
                  <img src={img} className='h-full w-full object-cover' alt={`Portfolio ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 bg-white flex flex-col gap-5 py-4">
            <div className='h-24 w-24 rounded-full overflow-hidden -mt-16 border-4 border-spacing-2 border-white'>
              <img src={photographer.profilePic} className='h-full w-full object-cover' alt={photographer.name} />
            </div>
            <div className="flex flex-col">
              <div className='flex justify-between'>
                <div className="flex flex-col gap-2">
                  <h2 className='text-xl font-semibold'>{photographer.name}</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {photographer.location}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {photographer.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4" />
                    <p className='text-xl font-semibold'>{startingPrice}</p>
                  </div>
                  <p className='text-sm text-gray-600 flex items-center'>
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {photographer.experienceYears} years
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link to={`/photographer/${photographer.id}`}>
                  <button className="w-full bg-blue-600 py-4 text-white rounded-md hover:bg-blue-700 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function PhotographerCarousel() {
  const [photographers, setPhotographers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotographers = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("photographers");
        setPhotographers(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotographers();
  }, []);

  if (isLoading) {
    return <div className="w-full h-screen flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-full h-screen flex justify-center items-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Top Photographers</h1>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {photographers.map((photographer) => (
            <CarouselItem key={photographer.id} className="md:basis-1 lg:basis-1/2 xl:basis-1/3">
              <div className="p-1">
                <PhotographerCard photographer={photographer} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default PhotographerCarousel;