import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';

import imgBG1 from '../assets/imgs/couples/couple-landscape.jpg';
import strawbberry from '../assets/imgs/food/hamburger-1238246_1280.jpg';
import wedding from '../assets/imgs/wedding/bride-1255520_1280.jpg';
import female from '../assets/imgs/streets/nike-5126389_1280.jpg';
import workout from '../assets/imgs/Mmodels/man-gym.jpg';
import studio from '../assets/imgs/Fmodels/fashion-6066661_1280.jpg';

const ServiceCard = ({ image, title, description, isLarge = false }) => (
  <motion.div 
    className={`relative group overflow-hidden rounded-2xl ${isLarge ? 'h-[600px]' : 'h-[400px]'}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
  >
    {/* Background Image */}
    <div className="absolute inset-0 w-full h-full">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
      />
    </div>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

    {/* Content */}
    <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300">
      <div className="relative">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
          <p className="text-gray-200 text-sm md:text-base max-w-[90%] transform transition-all duration-300 group-hover:translate-y-0">
            {description}
          </p>
        </motion.div>

        {/* Hover Button */}
        <div className="flex items-center mt-4 transform translate-y-0 md:translate-y-4 transition-transform duration-300 md:group-hover:translate-y-0">
          <button className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors">
            <span className="text-sm font-semibold">Explore More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      image: imgBG1,
      title: "Nature's Canvas",
      description: "From majestic mountains to serene lakes, explore the wonders of nature captured through the lens of talented photographers",
      isLarge: true
    },
    {
      image: studio,
      title: "Studio Shoot",
      description: "Indulge in the refined elegance and sophistication of our professional studio shoots, where every image is crafted with meticulous precision."
    },
    {
      image: workout,
      title: "Fit & Fabulous",
      description: "Ignite your passion for fitness and wellness with our inspiring collection of workout motivation, designed to empower and energize."
    },
    {
      image: female,
      title: "Urban Shoots",
      description: "Experience the vibrant tapestry of city life through the candid lens of street photography, capturing the essence of urban culture and diversity."
    },
    {
      image: strawbberry,
      title: "Food Gallery",
      description: "Savor the artistry and flavors of culinary delights showcased in our gourmet gallery of mouthwatering food photography."
    },
    {
      image: strawbberry,
      title: "Food Gallery",
      description: "Savor the artistry and flavors of culinary delights showcased in our gourmet gallery of mouthwatering food photography."
    },
    {
      image: wedding,
      title: "Love in Focus",
      description: "Immerse yourself in the timeless romance and heartfelt moments of weddings, beautifully preserved in each captivating photograph.",
      isLarge: true
    }
  ];

  return (
    <section className=" bg-gray-50">
      {/* Header Section */}
      <div className=" mb-12">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
           viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Capture Every Moment
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our diverse range of photography services, each crafted to perfectly capture your unique story
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={service.isLarge ? 'lg:col-span-2' : ''}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-900 transition-all duration-300">
            <Camera className="w-5 h-5" />
            <span className="font-semibold">Start Your Photography Journey</span>
            <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;