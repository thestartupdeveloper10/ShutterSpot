import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/features/user/userSlice';
import { 
  LayoutDashboard, 
  Camera, 
  Calendar, 
  Settings, 
  User,
  Menu,
  X,LogOut,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PhotographerLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!currentUser || currentUser.role !== 'photographer') {
    return <Navigate to="/auth" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };
  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/photographer/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: 'Bookings',
      path: '/photographer/bookings',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      name: 'Chat',
      path: '/photographer/chat',
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      name: 'Profile',
      path: '/photographer/profile',
      icon: <User className="w-5 h-5" />
    },
    {
      name: 'Settings',
      path: '/photographer/settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-30 w-[280px] sm:w-72 lg:w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out lg:transform-none",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-3 sm:p-4 flex justify-between items-center">
          <Link to="/photographer" className="text-xl sm:text-2xl font-bold text-purple-600">
            ShutterSpot Pro
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
        
        <nav className="mt-4 sm:mt-8">
          <div className="px-2 sm:px-4 space-y-1 sm:space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base ${
                  location.pathname === item.path
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <div className='flex px-1'>
              <Button className='w-full mt-2 sm:mt-4 text-sm sm:text-base' onClick={handleLogout}>
                <LogOut className='mr-2 h-4 w-4 sm:h-5 sm:w-5'/> Log Out
              </Button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm p-3 sm:p-4 flex items-center justify-between">
          <Link to="/photographer" className="text-lg sm:text-xl font-bold text-purple-600">
            ShutterSpot Pro
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PhotographerLayout;
