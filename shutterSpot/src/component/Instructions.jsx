import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardTitle 
} from '@/components/ui/card';
import iphoneImg from '../assets/imgs/others/iphone.jpg';
import shootImg from '../assets/imgs/streets/shoot.jpg';
import photoeditImg from '../assets/imgs/others/photo-editing.jpg';
import frameImg from '../assets/imgs/others/frame.jpg';

const InstructionCard = ({ image, step, title, description }) => (
  <Card className="flex flex-col justify-start shadow-lg">
    <CardContent>
      <img src={image} className='rounded-md my-4' alt={title} />
      <div className='flex items-center gap-5 mt-6'>
        <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center">
          <h1>{step}</h1>
        </CardTitle>
        <CardDescription className="text-2xl">{title}</CardDescription>
      </div>
      <p className='mt-4 text-wrap'>{description}</p>
    </CardContent>
  </Card>
);

const Instructions = () => {
  const instructionSteps = [
    {
      image: iphoneImg,
      step: 1,
      title: "Book online",
      description: "Tell us your needs, and we'll put you in touch with the highest rated photographer near you. They'll be available and experienced in your shoot type. You can also book multiple shoot types."
    },
    {
      image: shootImg,
      step: 2,
      title: "Do the shoot",
      description: "Your Perfocal photographer will be there at the arranged time with everything they need. Enjoy your shoot knowing you're in the hands of a professional."
    },
    {
      image: photoeditImg,
      step: 3,
      title: "Get photos",
      description: "Our editors will enhance your photos before delivering them to your online gallery, all within 48 hours. View, download or share any way you like!"
    },
    {
      image: frameImg,
      step: 4,
      title: "Make it real",
      description: "If you want, take the best of your gallery and turn it into a photobook, frame or print. It is a great gift idea. Read a media review about our service here."
    }
  ];

  return ( 
    <div className='mt-28 bg-[#f9f6ee] px-5 py-10 md:px-10 mb-10'>
      <div className='flex flex-col items-center justify-center mb-16'>
        <h1 className='text-center text-4xl md:text-5xl font-bold mb-6 '>How ShutterSpot works</h1>
        <p className='text-center text-gray-600 max-w-2xl mx-auto text-lg'>We have simplified the process of getting great photography. Booking a photographer through ShutterSpot is simple as 1, 2, 3.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
        {instructionSteps.map((step, index) => (
          <InstructionCard key={index} {...step} />
        ))}
      </div>
    </div>
  );
};

export default Instructions;