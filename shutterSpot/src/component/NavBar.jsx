import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, Bell, Heart, MessageSquare, User, LogOut } from 'lucide-react';
import { logout } from '../redux/features/user/userSlice';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isClient = user?.currentUser?.role === 'client';
  const isLoggedIn = Boolean(user?.currentUser);

  const clientNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/photographers' },
    { name: 'Services', path: '/services' },
    { name: 'My Bookings', path: '/bookings', show: isLoggedIn },
  ];

  const clientFeatures = [
    { 
      name: 'Messages', 
      path: '/messages',
      icon: <MessageSquare className="w-5 h-5" />
    },
    { 
      name: 'Favorites', 
      path: '/favorites',
      icon: <Heart className="w-5 h-5" /> 
    },
    { 
      name: 'Notifications', 
      path: '/notifications',
      icon: <Bell className="w-5 h-5" /> 
    }
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-purple-600">
              ShutterSpot
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isClient && (
              <>
                {/* Main Navigation Items */}
                <ul className="flex space-x-4">
                  {clientNavItems.map((item) => item.show !== false && (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          location.pathname === item.path
                            ? 'text-purple-600 bg-purple-50'
                            : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                        } transition-colors duration-200`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  {!isLoggedIn && (
                    <li>
                      <Link
                        to="/auth"
                        className={`px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200`}
                      >
                        Login/Register
                      </Link>
                    </li>
                  )}
                </ul>

                {/* Feature Icons */}
                <div className="flex items-center space-x-2 ml-4">
                  {clientFeatures.map((feature) => (
                    <Link
                      key={feature.name}
                      to={feature.path}
                      className={`p-2 rounded-full ${
                        location.pathname === feature.path
                          ? 'text-purple-600 bg-purple-50'
                          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                      } transition-colors duration-200`}
                      title={feature.name}
                    >
                      {feature.icon}
                    </Link>
                  ))}
                </div>
              </>
            )}
            {!isClient && (
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/'
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    } transition-colors duration-200`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/photographers"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/photographers'
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    } transition-colors duration-200`}
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/services'
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    } transition-colors duration-200`}
                  >
                    Services
                  </Link>
                </li>
              </ul>
            )}

            {/* User Profile Section */}
            {user?.currentUser ? (
              <div className="flex items-center ml-4 space-x-2">
                <div className="flex items-center space-x-3 px-3 py-2 rounded-md bg-gray-50">
                  <img 
                    src={user.currentUser.profilePicture || 'https://via.placeholder.com/32'} 
                    alt={user.currentUser.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.currentUser.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-1 rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center ml-4 space-x-2">
                <Link
                  to="/auth"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                  <span>Login/Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <ul className="flex flex-col space-y-2">
                {clientNavItems.map((item) => item.show !== false && (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        location.pathname === item.path
                          ? 'text-purple-600 bg-purple-50'
                          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                      } transition-colors duration-200`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {!isLoggedIn && (
                  <li>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                    >
                      Login
                    </Link>
                  </li>
                )}
                {!isLoggedIn && (
                  <li>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                    >
                      Register
                    </Link>
                  </li>
                )}
              </ul>
              {/* Mobile Feature Icons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {clientFeatures.map((feature) => (
                  <Link
                    key={feature.name}
                    to={feature.path}
                    className={`p-2 rounded-full ${
                      location.pathname === feature.path
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    } transition-colors duration-200`}
                    title={feature.name}
                  >
                    {feature.icon}
                  </Link>
                ))}
              </div>

              {/* Mobile User Profile */}
              {user?.currentUser ? (
                <div className="flex items-center justify-between px-3 py-2 mt-2 rounded-md bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={user.currentUser.profilePicture || 'https://via.placeholder.com/32'} 
                      alt={user.currentUser.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user.currentUser.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1 rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;