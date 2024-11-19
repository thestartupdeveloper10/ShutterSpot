import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Menu, Camera, Calendar, Home, BriefcaseBusiness, CircleUserRound, LogOut } from "lucide-react";
import { selectCurrentUser } from '../redux/features/user/userSlice';
import { logout } from '../redux/features/user/userSlice';

const clientTabs = [
  { text: "Home", link: "/", icon: Home },
  { text: "Find Photographer", link: "/photographers", icon: Camera },
  { text: "Profile", link: "/clientProfile", icon: BriefcaseBusiness },
];

const photographerTabs = [
  { text: "Dashboard", link: "/photographer-dashboard", icon: Home },
  { text: "Portfolio", link: "/my-portfolio", icon: BriefcaseBusiness },
  { text: "Bookings", link: "/bookings", icon: Calendar },
];

const NavBar = () => {
  const [selected, setSelected] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const tabs = user?.role === 'photographer' ? photographerTabs : clientTabs;

  return (
    <nav className="bg-[#46332e] text-white fixed w-full z-50 top-0">
      <div className="mx-auto px-8 py-3 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to='/' className="flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-bold">ShutterSpot</h1>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {tabs.map((tab) => (
                <Chip
                  key={tab.text}
                  text={tab.text}
                  link={tab.link}
                  selected={selected === tab.text}
                  setSelected={setSelected}
                />
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 ">
                      <AvatarImage src={user.profile?.profilePic || user.profilePicture} className='object-cover' />
                      <AvatarFallback>{user.profile?.name?.[0] || user.username?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-left hidden lg:block">
                      <p className="font-medium">{user.profile?.name || user.username}</p>
                      <p className="text-xs text-gray-300">{user.role}</p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.profile?.name || user.username}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === 'photographer' && (
                    <>
                      <DropdownMenuItem onSelect={() => navigate('/my-portfolio')}>
                        <BriefcaseBusiness className="mr-2 h-4 w-4" />
                        <span>My Portfolio</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => navigate('/bookings')}>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Bookings</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onSelect={() => navigate(`/clientProfile/${user.id}`)}>
                    <CircleUserRound className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onSelect={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button>Login / Register</Button>
              </Link>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {tabs.map((tab) => (
              <Link
                key={tab.text}
                to={tab.link}
                className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => {
                  setSelected(tab.text);
                  setIsMenuOpen(false);
                }}
              >
                {tab.text}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {user ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={user.profile?.profilePic || user.profilePicture}  className='object-cover' />
                    <AvatarFallback>{user.profile?.name?.[0] || user.username?.[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user.profile?.name || user.username}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                </div>
              </div>
            ) : (
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Register
                </Link>
              </div>
            )}
            {user && (
              <div className="mt-3 px-2 space-y-1">
                {user.role === 'photographer' && (
                  <>
                    <Link
                      to="/my-portfolio"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <BriefcaseBusiness className="mr-2 h-4 w-4" />
                      <span>My Portfolio</span>
                    </Link>
                    <Link
                      to="/bookings"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Bookings</span>
                    </Link>
                  </>
                )}
                <Link
                  to={`/clientProfile/${user.id}`}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CircleUserRound className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-500 hover:text-red-400 hover:bg-gray-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Chip = ({
  text,
  link,
  selected,
  setSelected,
}) => {
  return (
    <Link to={link}>
      <button
        onClick={() => setSelected(text)}
        className={`${
          selected
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        } px-3 py-2 rounded-md text-sm font-medium relative`}
      >
        <span className="relative z-10">{text}</span>
        {selected && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
          ></motion.span>
        )}
      </button>
    </Link>
  );
};

Chip.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default NavBar;