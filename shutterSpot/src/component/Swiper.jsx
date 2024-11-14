import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';
import { Star } from "lucide-react";

const mockPhotographers = [
  {
    id: 1,
    name: "Cliffe Ibande",
    location: "New York",
    price: 124,
    rating: 5,
    mainImage: "https://cdn.pixabay.com/photo/2024/02/05/18/14/passenger-ship-8555025_960_720.jpg",
    portfolioImages: [
      "https://cdn.pixabay.com/photo/2023/10/24/12/01/pumpkins-8338100_960_720.jpg",
      "https://cdn.pixabay.com/photo/2019/10/30/14/51/fall-4589724_960_720.jpg"
    ]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "Los Angeles",
    price: 150,
    rating: 4.8,
    mainImage: "https://cdn.pixabay.com/photo/2024/05/06/15/49/grey-heron-8743610_960_720.jpg",
    portfolioImages: [
      "https://cdn.pixabay.com/photo/2024/05/06/15/49/grey-heron-8743610_960_720.jpg",
      "https://cdn.pixabay.com/photo/2024/09/07/02/34/penguins-9028827_960_720.jpg"
    ]
  },
  {
    id: 3,
    name: "Alex Chen",
    location: "San Francisco",
    price: 180,
    rating: 4.9,
    mainImage: "https://cdn.pixabay.com/photo/2023/04/10/19/42/sea-7914544_960_720.jpg",
    portfolioImages: [
      "https://cdn.pixabay.com/photo/2023/11/01/11/07/path-8357152_960_720.jpg",
      "https://cdn.pixabay.com/photo/2022/01/13/00/05/austria-6934162_960_720.jpg"
    ]
  },
  // Add more mock photographers as needed
];

const PhotographerCard = ({ photographer }) => (
  <Card className="w-full">
    <CardContent className="p-0">
      <div className="flex flex-col h-full bg-white rounded-md overflow-hidden">
        <div className="grid grid-cols-3 gap-1">
          <div className='col-span-2'>
            <img src={photographer.mainImage} className='h-[250px] w-full object-cover' alt={photographer.name} />
          </div>
          <div className="flex flex-col gap-1">
            {photographer.portfolioImages.map((img, index) => (
              <div key={index} className='w-full h-[125px]'>
                <img src={img} className='h-full w-full object-cover' alt={`Portfolio ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 bg-white flex flex-col gap-5 py-4">
          <div className='h-24 w-24 rounded-full overflow-hidden -mt-16 border-4 border-spacing-2 border-white'>
            <img src={photographer.mainImage} className='object-cover' alt={photographer.name} />
          </div>
          <div className="flex flex-col">
            <div className='flex justify-between'>
              <div className="flex flex-col gap-2">
                <h2 className='text-xl font-semibold'>{photographer.name}</h2>
                <p className='text-sm text-gray-600'>{photographer.location}</p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <p className='text-xl font-semibold'>${photographer.price}</p>
                <p className='text-sm text-gray-600 flex justify-center items-center'>
                  <Star className="h-4 w-4 mr-1 text-yellow-500"></Star>
                  {photographer.rating}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to='/photographer'>
                <button className="w-full bg-blue-600 py-4 text-white">View Details</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export function PhotographerCarousel() {
  return (
    <div className="w-full h-screen flex flex-col justify-center  items-center py-8">
      <h1 className=" text-4xl md:text-5xl font-bold text-center mb-8">Top Photographers</h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {mockPhotographers.map((photographer, index) => (
            <CarouselItem key={index} className="md:basis-1 lg:basis-1/2 xl:basis-1/3">
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