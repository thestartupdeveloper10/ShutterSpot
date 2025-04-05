import { useSelector, useDispatch } from 'react-redux';
import { 
  selectWishlistItems, 
  removePhotographerFromWishlist 
} from '@/redux/features/favorites/wishlistRedux';
import { Heart, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function Favourites() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const wishlist = useSelector((state) => selectWishlistItems(state, currentUser?._id));

  const handleRemoveFavorite = (photographer) => {
    const photographerId = photographer._id || photographer.id;
    
    dispatch(removePhotographerFromWishlist({
      userId: currentUser._id,
      photographerId: photographerId
    }));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Please login to view favorites</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">My Favorite Photographers</h1>
      {wishlist.products.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-4">Start adding photographers to your favorites</p>
          <Link 
            to="/photographers"
            className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Explore Photographers
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.products.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={item.product.profilePic || item.product.photos[0]} 
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemoveFavorite(item.product)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {item.product.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {item.product.experienceYears} years experience
                </div>
                <Link
                  to={`/photographer/${item.product._id || item.product.id}`}
                  className="block w-full text-center bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
