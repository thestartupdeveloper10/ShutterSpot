import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [photographers, setPhotographers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { results, searchParams } = location.state || {};

  useEffect(() => {
    if (results) {
      setPhotographers(results);
      setIsLoading(false);
    }
  }, [results]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-4 pb-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <div className="flex gap-2 flex-wrap">
          {searchParams?.date && (
            <Badge variant="secondary">
              Date: {format(new Date(searchParams.date), 'MMMM d, yyyy')}
            </Badge>
          )}
          {searchParams?.location && (
            <Badge variant="secondary">
              Location: {searchParams.location}
            </Badge>
          )}
        </div>
      </div>

      {photographers.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600">
            No photographers found matching your criteria
          </h2>
          <Button 
            onClick={() => navigate(-1)}
            className="mt-4"
          >
            Try Another Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photographers.map((photographer) => (
            <Card key={photographer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className=" bg-red-500 overflow-hidden rounded-lg mb-4">
                  <img
                    src={photographer.profilePic}
                    alt={photographer.name}
                    className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle>{photographer.name}</CardTitle>
                <CardDescription>{photographer.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Experience: {photographer.experienceYears} years
                  </p>
                  <p className="font-medium">
                    Price Range: {photographer.priceRange}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {photographer.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="outline">
                        {service}
                      </Badge>
                    ))}
                    {photographer.services.length > 3 && (
                      <Badge variant="outline">+{photographer.services.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/photographer/${photographer.id}`)}
                >
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 