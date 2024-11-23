import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import imgBG1 from '../assets/imgs/couples/couple-landscape.jpg';
import strawbberry from '../assets/imgs/food/hamburger-1238246_1280.jpg';
import wedding from '../assets/imgs/wedding/bride-1255520_1280.jpg';
import female from '../assets/imgs/streets/nike-5126389_1280.jpg';
import workout from '../assets/imgs/Mmodels/man-gym.jpg';
import studio from '../assets/imgs/Fmodels/fashion-6066661_1280.jpg';

const ServiceCard = ({ image, title, description, isLarge = false }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    const category = title.toLowerCase().replace(/['\s]/g, '-');
    navigate(`/photographers/category/${category}`);
  };

  return (
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
            <button 
              onClick={handleExplore}
              className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
            >
              <span className="text-sm font-semibold">Explore More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      image: imgBG1,
      title: "Wedding Photography",
      description: "From intimate ceremonies to grand celebrations, capture the magic of your special day with our professional wedding photography services.",
      isLarge: true
    },
    {
      image: studio,
      title: "Studio Photoshoots",
      description: "Professional studio sessions with state-of-the-art equipment and creative lighting for stunning portraits and fashion shoots."
    },
    {
      image: workout,
      title: "Fashion Photography",
      description: "Elevate your fashion brand with dynamic and stylish photography that brings your designs to life."
    },
    {
      image: female,
      title: "Portrait Photography",
      description: "Capture your unique personality with our professional portrait photography services, perfect for individuals and families."
    },
    {
      image: strawbberry,
      title: "Food Photography",
      description: "Showcase your culinary creations with appetizing food photography that makes every dish look irresistible."
    },
    {
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1470&auto=format&fit=crop",
      title: "Travel Photography",
      description: "Explore the world through our lens with professional travel photography that captures the essence of destinations."
    },
    {
      image: wedding,
      title: "Event Photography",
      description: "Professional coverage for corporate events, concerts, and special occasions, ensuring every moment is perfectly preserved.",
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