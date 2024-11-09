import React from 'react';
import { 
  Camera, 
  Clock, 
  ShieldCheck,
  Users,
  Star,
  Image as ImageIcon,
  MessageSquare,
  Award
} from 'lucide-react';

import dog from '../assets/imgs/others/dog.jpg';
import kid from '../assets/imgs/kids/kid.jpg';
import couple from '../assets/imgs/couples/couple-wedding.jpg';
import man from '../assets/imgs/Mmodels/man-potraite.jpg';
import bike from '../assets/imgs/others/bike.jpg';
import family from '../assets/imgs/couples/family.jpg';

const StatsCard = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
    <Icon size={32} className="text-purple-600 mb-3" />
    <span className="text-3xl font-bold text-gray-800 mb-1">{value}</span>
    <span className="text-sm text-gray-600 text-center">{label}</span>
  </div>
);

const ProcessStep = ({ number, title, description }) => (
  <div className="relative flex items-center group">
    <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
      <span className="text-2xl font-bold text-purple-600">{number}</span>
    </div>
    <div className="ml-4 flex-1">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Capture = () => {
  const stats = [
    { icon: Users, value: "10K+", label: "Happy Clients" },
    { icon: Camera, value: "500+", label: "Pro Photographers" },
    { icon: ImageIcon, value: "1M+", label: "Photos Delivered" },
    { icon: Star, value: "4.9", label: "Average Rating" }
  ];

  const testimonials = [
    {
      avatar: couple,
      name: "Sarah & Mike",
      role: "Wedding Clients",
      text: "The entire experience was seamless. Our photographer captured every special moment perfectly."
    },
    {
      avatar: man,
      name: "David Chen",
      role: "Professional Model",
      text: "The platform connected me with exactly the kind of photographer I was looking for. Outstanding service!"
    },
    {
      avatar: family,
      name: "Thompson Family",
      role: "Family Session",
      text: "We've used this service multiple times and each experience has been amazing. Highly recommended!"
    }
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Capture Your Perfect Moment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with professional photographers who understand your vision and bring it to life.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProcessStep 
              number="1"
              title="Browse & Choose"
              description="Explore portfolios of talented photographers in your area and find your perfect match."
            />
            <ProcessStep 
              number="2"
              title="Book & Plan"
              description="Schedule your session and communicate directly with your photographer to plan the details."
            />
            <ProcessStep 
              number="3"
              title="Capture & Share"
              description="Get your professional photos delivered through our secure platform, ready to share."
            />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Photography Journey?</h2>
          <p className="text-lg mb-8 text-white/90">Join thousands of satisfied clients who have found their perfect photographer</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Find a Photographer
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capture;