import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Camera, Heart, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { publicRequest } from '@/service/requestMethods';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addPhotographerToWishlist, 
  removePhotographerFromWishlist, 
  selectWishlistItems 
} from '@/redux/features/favorites/wishlistRedux';


const CategoryPhotographers = () => {
  const { category } = useParams();
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'rating', 'experience'
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const wishlist = useSelector((state) => selectWishlistItems(state, currentUser?._id));

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        setLoading(true);
        const response = await publicRequest.get(`photographers/category/${category}`);
        if (Array.isArray(response.data)) {
          setPhotographers(response.data);
        } else {
          setPhotographers([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch photographers. Please try again later.');
        console.error('Error fetching photographers:', err);
        setPhotographers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, [category]);

  const formatCategory = (cat) => {
    return cat.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const isPhotographerInWishlist = (photographerId) => {
    return wishlist.products.some(
      (item) => item.product.id === photographerId
    );
  };

  const handleFavorite = (photographer) => {
    if (!currentUser) {
      alert("Please login to add favorites");
      return;
    }

    const photographerId = photographer.id;
    const isFavorited = isPhotographerInWishlist(photographerId);

    if (isFavorited) {
      dispatch(removePhotographerFromWishlist({
        userId: currentUser._id,
        photographerId: photographerId
      }));
    } else {
      dispatch(addPhotographerToWishlist({
        userId: currentUser._id,
        product: photographer,
        quantity: 1
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="p-8 rounded-lg bg-white shadow-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">Finding talented photographers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center p-8 rounded-lg bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const filteredPhotographers = [...photographers].sort((a, b) => {
    if (filter === 'rating') return (b.rating || 4.5) - (a.rating || 4.5);
    if (filter === 'experience') return b.experienceYears - a.experienceYears;
    return 0;
  });

  return (
    
    <div className="my-10 py-10 rounded-md md:py-12 px-5 mx-5 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            {formatCategory(category)} Photographers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover talented photographers specializing in {formatCategory(category)}
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4 mb-8"
        >
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'} hover:shadow-md transition-all duration-300`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('rating')}
            className={`px-4 py-2 rounded-full ${filter === 'rating' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'} hover:shadow-md transition-all duration-300`}
          >
            Top Rated
          </button>
          <button 
            onClick={() => setFilter('experience')}
            className={`px-4 py-2 rounded-full ${filter === 'experience' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'} hover:shadow-md transition-all duration-300`}
          >
            Most Experienced
          </button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPhotographers && filteredPhotographers.length > 0 ? (
            filteredPhotographers.map((photographer, index) => (
              <motion.div
                key={photographer.id}
                variants={cardVariants}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <img
                    src={photographer.profilePic || 'https://via.placeholder.com/400x300'}
                    alt={photographer.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button 
                    onClick={() => handleFavorite(photographer)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:bg-white
                      ${isPhotographerInWishlist(photographer.id)
                        ? 'bg-white opacity-100'
                        : 'bg-white/80 opacity-0 group-hover:opacity-100'
                      }`}
                  >
                    <Heart 
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isPhotographerInWishlist(photographer.id)
                          ? 'text-pink-500 fill-pink-500'
                          : 'text-pink-500'
                      }`} 
                    />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">{photographer.name}</h2>
                    <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium text-yellow-700">4.5</span>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{photographer.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{photographer.experienceYears} years experience</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Award className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{photographer.skills?.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/photographer/${photographer.id}`}
                      className="flex-1 text-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                    >
                      View Profile
                    </Link>
                    <Link to={`/book/${photographer.id}`}>
                    <button
                      className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-300"
                    >
                      Quick Book
                    </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12 bg-white rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                No photographers found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any photographers specializing in {formatCategory(category)} at the moment.
              </p>
              <Link
                to="/photographers"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Browse All Photographers
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
   
  );
};

export default CategoryPhotographers;
