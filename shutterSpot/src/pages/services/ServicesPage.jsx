import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, ArrowRight, Camera, Clock, DollarSign, MapPin } from 'lucide-react';
import NavBar from '../../component/NavBar';

const ServiceCard = ({ title, description, price, duration, location, image, category, isActive, onClick }) => (
  <motion.div 
    className={`cursor-pointer overflow-hidden relative rounded-2xl transition-all duration-500 ${
      isActive ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
    }`}
    onClick={onClick}
    layout
  >
    <div className="absolute inset-0">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
    </div>
    
    <div className="relative h-full p-6 flex flex-col justify-end">
      <motion.div layout="position" className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs">
            {category}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
        
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <p className="text-gray-300 text-sm md:text-base">{description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>From ${price}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>4.9 (120+ reviews)</span>
              </div>
            </div>

            <button className="mt-4 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  </motion.div>
);

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      id: 1,
      title: "Wedding Photography",
      category: "Wedding",
      description: "Capture the magic of your special day with our professional wedding photography services. We specialize in both traditional and contemporary styles.",
      price: "999",
      duration: "8 hours",
      location: "Any location",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Fashion Portfolio",
      category: "Fashion",
      description: "Professional fashion photography for models, designers, and brands. Create stunning portfolios that showcase your style.",
      price: "599",
      duration: "4 hours",
      location: "Studio",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2570&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Portrait Session",
      category: "Portrait",
      description: "Professional portrait photography for individuals, families, and corporate headshots. Natural and studio lighting available.",
      price: "299",
      duration: "2 hours",
      location: "Studio/Outdoor",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2564&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Event Coverage",
      category: "Events",
      description: "Comprehensive event photography coverage for corporate events, parties, and special occasions.",
      price: "799",
      duration: "6 hours",
      location: "Any location",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2570&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Food Photography",
      category: "Commercial",
      description: "Professional food photography for restaurants, cafes, and food brands. Make your dishes look irresistible.",
      price: "399",
      duration: "3 hours",
      location: "Studio/On-site",
      image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2570&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Travel Photography",
      category: "Travel",
      description: "Document your adventures with professional travel photography. Perfect for tourism boards and travel brands.",
      price: "899",
      duration: "Full day",
      location: "Worldwide",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2573&auto=format&fit=crop"
    }
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <NavBar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Discover Photography Services
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-12">
            Find the perfect photographer for your special moments
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for photography services..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-800 bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors">
                <Filter className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          <AnimatePresence>
            {filteredServices.map((service) => (
              <ServiceCard 
                key={service.id}
                {...service}
                isActive={activeService === service.id}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-t from-purple-900/20 to-transparent py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our community of professional photographers or book your next photoshoot today.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
              <Camera className="w-5 h-5" />
              <span className="font-semibold">Start Your Journey</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
