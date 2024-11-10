import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

// Reusable feature card component
const FeatureCard = ({ number, title, description }) => (
  <Card className="flex flex-col justify-between shadow-lg">
    <CardContent>
      <div className="flex items-center gap-5 mt-6">
        <div className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center">
          <span>{number}</span>
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <p className="mt-4 text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const ChooseBook = () => {
  const features = [
    {
      number: 1,
      title: "Premium Service",
      description: "Access to top-tier photographers renowned for their quality and professionalism."
    },
    {
      number: 2,
      title: "Stress-Free Experience",
      description: "Comprehensive assistance streamlines the process from start to finish, minimizing hassle and uncertainty."
    },
    {
      number: 3,
      title: "Reliability and Support",
      description: "Backup support provides reassurance and assistance in unforeseen circumstances"
    },
    {
      number: 4,
      title: "Assurance of Quality",
      description: "Handpicked photographers guarantee exceptional service and results, backed by rigorous selection criteria."
    },
    {
      number: 5,
      title: "Personalized Touch",
      description: "Direct communication with photographers fosters collaboration and ensures your vision is realized."
    },
    {
      number: 6,
      title: "Convenient Selection",
      description: "Preview options allow you to choose images that best capture your desired aesthetic and vision."
    },
    {
      number: 7,
      title: "Unique Results",
      description: "Each photographer's signature editing style adds a distinct and artistic flair to your images."
    },
    {
      number: 8,
      title: "Professional Output",
      description: "Delivery of high-quality, edited images ensures satisfaction and meets your expectations for final products"
    }
  ];

  return (
    <div className="bg-[#f9f6ee] px-10 py-16 mt-8">
      <div className="flex flex-col items-center justify-center mb-16">
        <h1 className="text-4xl font-bold mb-4">WHY CHOOSE US?</h1>
        <p className="text-center text-gray-600 max-w-2xl">
          We have simplified the process of getting great photography. Booking a photographer through ShutterSpot is simple as 1, 2, 3.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.number}
            number={feature.number}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseBook;