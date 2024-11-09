import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';

// Mock data for photographers
const mockPhotographers = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    region: "New York", 
    price: 150, 
    availability: ["Weekends"], 
    types: ["Wedding", "Portrait"], 
    imageUrl: "https://cdn.pixabay.com/photo/2020/01/07/23/01/sketch-4748895_1280.jpg" 
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    region: "Los Angeles", 
    price: 200, 
    availability: ["Weekdays", "Weekends"], 
    types: ["Fashion", "Event"], 
    imageUrl: "https://cdn.pixabay.com/photo/2019/12/04/09/30/man-4672229_1280.jpg" 
  },
  { 
    id: 3, 
    name: "Charlie Brown", 
    region: "Chicago", 
    price: 175, 
    availability: ["Weekdays"], 
    types: ["Landscape", "Architecture"], 
    imageUrl: "https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_1280.jpg" 
  },
  { 
    id: 4, 
    name: "Diana Ross", 
    region: "Miami", 
    price: 225, 
    availability: ["Weekends"], 
    types: ["Wedding", "Fashion"], 
    imageUrl: "https://cdn.pixabay.com/photo/2019/09/01/10/13/portrait-4444764_1280.jpg" 
  },
  { 
    id: 5, 
    name: "Ethan Hunt", 
    region: "Seattle", 
    price: 160, 
    availability: ["Weekdays", "Weekends"], 
    types: ["Portrait", "Event"], 
    imageUrl: "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_1280.jpg" 
  },
];

const regions = ["New York", "Los Angeles", "Chicago", "Miami", "Seattle"];
const shootTypes = ["Wedding", "Portrait", "Fashion", "Event", "Landscape", "Architecture"];

// Extracted Filter Component
const FilterPanel = ({ 
  priceRange, 
  setPriceRange, 
  selectedRegion, 
  setSelectedRegion,
  selectedAvailability,
  setSelectedAvailability,
  selectedTypes,
  setSelectedTypes,
  className = ""
}) => (
  <Card className={className}>
    <CardContent className="p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      {/* Price Range Filter */}
      <div>
        <Label>Price Range</Label>
        <div className="flex justify-between mb-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <Slider
          min={0}
          max={300}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
        />
      </div>

      {/* Region Filter */}
      <div>
        <Label>Region</Label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Select a region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Availability Filter */}
      <div>
        <Label>Availability</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="weekdays" 
              checked={selectedAvailability.Weekdays}
              onCheckedChange={(checked) => 
                setSelectedAvailability(prev => ({ ...prev, Weekdays: checked }))
              }
            />
            <label htmlFor="weekdays">Weekdays</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="weekends" 
              checked={selectedAvailability.Weekends}
              onCheckedChange={(checked) => 
                setSelectedAvailability(prev => ({ ...prev, Weekends: checked }))
              }
            />
            <label htmlFor="weekends">Weekends</label>
          </div>
        </div>
      </div>

      {/* Shoot Types Filter */}
      <div>
        <Label>Types of Shoot</Label>
        <div className="space-y-2">
          {shootTypes.map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={type} 
                checked={selectedTypes[type]}
                onCheckedChange={(checked) => 
                  setSelectedTypes(prev => ({ ...prev, [type]: checked }))
                }
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Photographer Card Component
const PhotographerCard = ({ photographer }) => (
  <Card key={photographer.id}>
    <img src={photographer.imageUrl} alt={photographer.name} className="w-full h-60 object-cover" />
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold">{photographer.name}</h3>
      <p className="text-sm text-gray-600">{photographer.region}</p>
      <p className="text-sm font-medium">${photographer.price}/hour</p>
      <p className="text-sm">{photographer.types.join(", ")}</p>
    </CardContent>
    <CardFooter>
      <Button className="w-full">View Profile</Button>
    </CardFooter>
  </Card>
);

const PhotographersListingPage = () => {
  // State management
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState({
    Weekdays: false,
    Weekends: false,
  });
  const [selectedTypes, setSelectedTypes] = useState({});

  // Initialize selectedTypes state
  useMemo(() => {
    const typesObj = {};
    shootTypes.forEach(type => {
      typesObj[type] = false;
    });
    setSelectedTypes(typesObj);
  }, []);

  // Filter photographers based on selected filters
  const filteredPhotographers = useMemo(() => {
    return mockPhotographers.filter(photographer => {
      const priceInRange = photographer.price >= priceRange[0] && photographer.price <= priceRange[1];
      const regionMatch = selectedRegion === "all" || photographer.region === selectedRegion;
      const availabilityMatch = 
        (!selectedAvailability.Weekdays && !selectedAvailability.Weekends) ||
        (selectedAvailability.Weekdays && photographer.availability.includes("Weekdays")) ||
        (selectedAvailability.Weekends && photographer.availability.includes("Weekends"));
      const typeMatch = 
        Object.values(selectedTypes).every(v => v === false) ||
        photographer.types.some(type => selectedTypes[type]);

      return priceInRange && regionMatch && availabilityMatch && typeMatch;
    });
  }, [priceRange, selectedRegion, selectedAvailability, selectedTypes]);

  // Props for FilterPanel
  const filterProps = {
    priceRange,
    setPriceRange,
    selectedRegion,
    setSelectedRegion,
    selectedAvailability,
    setSelectedAvailability,
    selectedTypes,
    setSelectedTypes,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto py-28 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Find a Photographer</h1>
          
          {/* Mobile Filter Button */}
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
          {/* Desktop Filter - Sticky */}
          <div className="hidden md:block">
            <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-6rem)]">
              <FilterPanel {...filterProps} />
            </div>
          </div>

          {/* Photographers Grid */}
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
      <Footer />
    </div>
  );
};

export default PhotographersListingPage;