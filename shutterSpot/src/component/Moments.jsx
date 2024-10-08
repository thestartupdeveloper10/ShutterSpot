import React from 'react';
import { Camera, Zap, Check, Smile } from 'lucide-react';
import dog from '../assets/imgs/others/dog.jpg';
import kid from '../assets/imgs/kids/kid.jpg';
import couple from '../assets/imgs/couples/couple-wedding.jpg';
import family from '../assets/imgs/couples/family.jpg';
import man from '../assets/imgs/Mmodels/man-potraite.jpg';
import bike from '../assets/imgs/others/bike.jpg';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className='grid grid-cols-6 rounded-md shadow-lg bg-white mb-6 md:mb-0'>
    <div className='col-span-1 flex justify-center items-center'>
      <Icon size={50} className="text-yellow-400" />
    </div>
    <div className='flex flex-col py-4 px-2 justify-center items-start gap-3 col-span-5'>
      <h2 className='leading-10'>{title}</h2>
      <p>{description}</p>
    </div>
  </div>
);

const Capture = () => {
  const features = [
    {
      icon: Camera,
      title: "Hand pick your top notch photographer",
      description: "Find the best photographers in your area, who fit in your price, time and location."
    },
    {
      icon: Zap,
      title: "Instant booking & rapid delivery",
      description: "Book a photoshoot in a couple of clicks and get your photos in a few days."
    },
    {
      icon: Check,
      title: "Vetted photographers",
      description: "All photographers are carefully reviewed and approved by experts to ensure a great experience."
    },
    {
      icon: Smile,
      title: "Satisfaction guaranteed",
      description: "Or we will make it right and refund your money."
    }
  ];

  return ( 
    <div className=''>
      <div className='grid gap-8 grid-cols-1 lg:grid-cols-3 mt-28'>
        <div className='rounded-xl flex flex-col col-span-2 gap-3'>
          <div className='grid grid-cols-3 gap-3'>
            <div>
              <img src={family} className='object-cover h-full' alt="Family" />
            </div>
            <div className=''>
              <img src={man} className='object-cover' alt="Man portrait" /> 
            </div>
            <div>
              <img src={bike} className='object-cover' alt="Bike" /> 
            </div>
          </div>
          <div className='grid grid-cols-7 gap-3'>
            <div className='col-span-3'>
              <img src={dog} className='object-cover' alt="Dog" />
            </div>
            <div className='col-span-2'>
              <img src={kid} className='object-cover h-full' alt="Kid" />
            </div>
            <div className='col-span-2'>
              <img src={couple} className='object-cover h-full' alt="Couple" />
            </div>
          </div>
        </div>
        <div className='flex items-start flex-col bg-[#f9f6ee] px-6 py-6'>
          <div className="header">
            <p>Hello friend</p>
            <h1 className='font-bold'>One click for you</h1>
          </div>
          <div className="small-cards flex flex-col justify-evenly flex-grow">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Capture;