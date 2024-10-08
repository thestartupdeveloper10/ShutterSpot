import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';

// Mock data for photographers
const mockPhotographers = [
  { id: 1, name: "Alice Johnson", region: "New York", price: 150, availability: ["Weekends"], types: ["Wedding", "Portrait"], imageUrl: "/api/placeholder/300/200" },
  { id: 2, name: "Bob Smith", region: "Los Angeles", price: 200, availability: ["Weekdays", "Weekends"], types: ["Fashion", "Event"], imageUrl: "/api/placeholder/300/200" },
  { id: 3, name: "Charlie Brown", region: "Chicago", price: 175, availability: ["Weekdays"], types: ["Landscape", "Architecture"], imageUrl: "/api/placeholder/300/200" },
  { id: 4, name: "Diana Ross", region: "Miami", price: 225, availability: ["Weekends"], types: ["Wedding", "Fashion"], imageUrl: "/api/placeholder/300/200" },
  { id: 5, name: "Ethan Hunt", region: "Seattle", price: 160, availability: ["Weekdays", "Weekends"], types: ["Portrait", "Event"], imageUrl: "/api/placeholder/300/200" },
];

const regions = ["New York", "Los Angeles", "Chicago", "Miami", "Seattle"];
const shootTypes = ["Wedding", "Portrait", "Fashion", "Event", "Landscape", "Architecture"];

const PhotographersListingPage = () => {
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

  return (
    <div className="mt-28 md:mt-12">
        <NavBar/>
    <div className=" mx-auto px-4 ">
      <h1 className="text-3xl font-bold mb-6">Find a Photographer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="md:col-span-1 space-y-6">
          <Card>
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
        </div>

        {/* Photographers Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotographers.map(photographer => (
            <Card key={photographer.id}>
              <img src={photographer.imageUrl} alt={photographer.name} className="w-full h-48 object-cover" />
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
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PhotographersListingPage;