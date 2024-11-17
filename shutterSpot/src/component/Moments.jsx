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

import couple from '../assets/imgs/couples/couple-wedding.jpg';
import man from '../assets/imgs/Mmodels/man-potraite.jpg';
import family from '../assets/imgs/couples/family.jpg';





const Capture = () => {

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
      <div className="">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Capture Your Perfect Moment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with professional photographers who understand your vision and bring it to life.
          </p>
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