import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { publicRequest } from '@/service/requestMethods';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addPhotographerToWishlist, 
  removePhotographerFromWishlist, 
  selectWishlistItems 
} from '@/redux/features/favorites/wishlistRedux';
import { Heart } from "lucide-react";

// Helper function to extract price range values
const extractPriceRange = (priceString) => {
  // For Kenyan Shilling format
  const numbers = priceString.match(/\d+/g);
  return numbers ? [parseInt(numbers[0]), parseInt(numbers[1]) || parseInt(numbers[0]) + 10000] : [0, 50000];
};

// Helper function to get unique values from array of objects
const getUniqueValues = (data, key) => {
  const values = new Set();
  data.forEach(item => {
    if (Array.isArray(item[key])) {
      item[key].forEach(value => values.add(value));
    } else {
      values.add(item[key]);
    }
  });
  return Array.from(values);
};

const FilterPanel = ({ 
  priceRange, 
  setPriceRange, 
  selectedLocation, 
  setSelectedLocation,
  selectedAvailability,
  setSelectedAvailability,
  selectedServices,
  setSelectedServices,
  locations,
  services,
  maxPrice,
  minPrice
}) => (
  <Card className="p-4 space-y-4">
    <CardContent>
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      {/* Price Range Filter */}
      <div>
        <Label>Price Range (KSH)</Label>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">
            KSH {priceRange[0].toLocaleString()}
          </span>
          <span className="text-sm text-gray-600">
            KSH {priceRange[1].toLocaleString()}
          </span>
        </div>
        <Slider
          min={minPrice}
          max={maxPrice}
          step={1000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-4"
        />
      </div>

      {/* Location Filter */}
      <div className="mt-6">
        <Label className="text-sm font-medium">Location</Label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="mt-2 w-full bg-white">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Availability Filter */}
      <div className="mt-6">
        <Label className="text-sm font-medium mb-2 block">Availability</Label>
        <div className="space-y-3 mt-2">
          {['Weekends', 'Weekdays', 'Flexible for travel'].map(availability => (
            <div key={availability} className="flex items-center space-x-2">
              <Checkbox 
                id={availability} 
                checked={selectedAvailability[availability]}
                onCheckedChange={(checked) => 
                  setSelectedAvailability(prev => ({ ...prev, [availability]: checked }))
                }
                className="rounded-sm"
              />
              <label 
                htmlFor={availability} 
                className="text-sm text-gray-600 cursor-pointer"
              >
                {availability}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Services Filter */}
      <div className="mt-6">
        <Label className="text-sm font-medium mb-2 block">Services</Label>
        <div className="space-y-3 mt-2">
          {services.map(service => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox 
                id={service} 
                checked={selectedServices[service]}
                onCheckedChange={(checked) => 
                  setSelectedServices(prev => ({ ...prev, [service]: checked }))
                }
                className="rounded-sm"
              />
              <label 
                htmlFor={service} 
                className="text-sm text-gray-600 cursor-pointer"
              >
                {service}
              </label>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const PhotographerCard = ({ photographer }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const wishlist = useSelector((state) => selectWishlistItems(state, currentUser?._id));

  const isPhotographerInWishlist = (photographerId) => {
    return wishlist.products.some(
      (item) => item.product.id === photographerId
    );
  };

  const handleFavorite = (e) => {
    e.preventDefault(); // Prevent card click event
    if (!currentUser) {
      alert("Please login to add favorites");
      return;
    }

    const photographerId = photographer.id;
    const isFavorited = isPhotographerInWishlist(photographerId);

    if (isFavorited) {
      dispatch(removePhotographerFromWishlist({
        userId: currentUser._id,
        photographerId: photographerId
      }));
    } else {
      dispatch(addPhotographerToWishlist({
        userId: currentUser._id,
        product: photographer,
        quantity: 1
      }));
    }
  };

  const [minPrice, maxPrice] = extractPriceRange(photographer.priceRange);
  return (
    <Card className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img 
          src={photographer.profilePic || photographer.photos[0]} 
          alt={photographer.name} 
          className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={handleFavorite}
          className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-all duration-300 hover:bg-white
            ${isPhotographerInWishlist(photographer.id)
              ? 'bg-white opacity-100'
              : 'bg-white/80 opacity-0 group-hover:opacity-100'
            }`}
        >
          <Heart 
            className={`w-5 h-5 transition-colors duration-300 ${
              isPhotographerInWishlist(photographer.id)
                ? 'text-pink-500 fill-pink-500'
                : 'text-pink-500'
            }`} 
          />
        </button>
      </div>

      {/* Content Section */}
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold text-gray-900">{photographer.name}</h3>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {photographer.experienceYears}+ years
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              {photographer.location}
            </div>
          </div>
        </div>

        {/* Services Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {photographer.services.slice(0, 3).map((service, index) => (
              <span 
                key={index}
                className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-600"
              >
                {service}
              </span>
            ))}
            {photographer.services.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-600">
                +{photographer.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and Availability */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-lg font-semibold text-gray-900">{photographer.priceRange}</p>
          </div>
          <Link to={`/photographer/${photographer.id}`}>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          >
            View Profile
          </Button>
          </Link>
        </div>
      </CardContent>

      {/* Quick Info Overlay */}
      <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {photographer.cameras && photographer.cameras.length > 0 && (
          <div className="bg-black/70 text-white rounded-full p-2" 
          title={`Cameras: ${photographer.cameras.join(', ')}`}
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        )}
        {photographer.languages && photographer.languages.length > 0 && (
          <div 
            className="bg-black/70 text-white rounded-full p-2" 
            title={`Languages: ${photographer.languages.join(', ')}`}
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </div>
        )}
      </div>
    </Card>
  );
};

const PhotographersListingPage = () => {
  const [photographers, setPhotographers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch photographers data
  useEffect(() => {
    const fetchPhotographers = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("photographers");
        setPhotographers(res.data.photographers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotographers();
  }, []);

 

  // Calculate price ranges and other filter options from data
  const [minPrice, maxPrice, locations, services] = useMemo(() => {
    if (photographers.length === 0) return [0, 3000, [], []];
    
    const priceRanges = photographers.map(p => extractPriceRange(p.priceRange));
    const minP = Math.min(...priceRanges.map(range => range[0]));
    const maxP = Math.max(...priceRanges.map(range => range[1]));
    
    return [
      minP,
      maxP,
      getUniqueValues(photographers, 'location'),
      getUniqueValues(photographers, 'services')
    ];
  }, [photographers]);

  // State management - initialize with full range to show all photographers
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState({});
  const [selectedServices, setSelectedServices] = useState({});

  // Update price range when min/max prices are calculated
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Filter photographers based on selected filters
  const filteredPhotographers = useMemo(() => {
    return photographers.filter(photographer => {
      const [photographerMinPrice, photographerMaxPrice] = extractPriceRange(photographer.priceRange);
      
      // Price range filter
      const priceInRange = 
        photographerMinPrice <= priceRange[1] && photographerMaxPrice >= priceRange[0];
      
      // Location filter
      const locationMatch = 
        selectedLocation === "all" || photographer.location === selectedLocation;
      
      // Availability filter
      const availabilityMatch = 
        Object.values(selectedAvailability).every(v => !v) ||
        photographer.availability.some(avail => selectedAvailability[avail]);
      
      // Services filter
      const servicesMatch = 
        Object.values(selectedServices).every(v => !v) ||
        photographer.services.some(service => selectedServices[service]);

      return priceInRange && locationMatch && availabilityMatch && servicesMatch;
    });
  }, [photographers, priceRange, selectedLocation, selectedAvailability, selectedServices]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  }

  const filterProps = {
    priceRange,
    setPriceRange,
    selectedLocation,
    setSelectedLocation,
    selectedAvailability,
    setSelectedAvailability,
    selectedServices,
    setSelectedServices,
    locations,
    services,
    maxPrice,
    minPrice
  };

  return (
   
  
      <div className="py-8 md:mx-24 mx-5 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Find a Photographer</h1>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[300px] pt-6">
                <FilterPanel {...filterProps} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="hidden md:block">
            <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-6rem)]">
              <FilterPanel {...filterProps} />
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {filteredPhotographers.map(photographer => (
              <PhotographerCard key={photographer.id} photographer={photographer} />
            ))}
            {filteredPhotographers.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No photographers found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

  );
};

export default PhotographersListingPage;