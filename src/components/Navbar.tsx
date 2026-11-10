import React, { useState } from 'react';
import { PageType } from '../types';
import { Mountain, Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType, param?: string) => void;
  onOpenPlanTrip: () => void;
  isTransparent?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenPlanTrip,
  isTransparent = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Tours', page: 'packages' },
    { label: 'Bus Tickets', page: 'buses' },
    { label: 'Packages', page: 'packages' },
    { label: 'Destinations', page: 'destinations' },
    { label: 'Contact Us', page: 'contact' },
    { label: 'About Us', page: 'about' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`w-full z-50 transition-colors duration-500 ${
        isTransparent
          ? 'absolute top-0 left-0 bg-gradient-to-b from-black/75 via-black/30 to-transparent text-white'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-100 text-gray-900 shadow-2xs sticky top-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo matching reference image with spring hover */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left focus:outline-hidden group cursor-pointer"
          >
            <div
              className={`p-2 rounded-xl transition-all duration-300 ${
                isTransparent
                  ? 'bg-white/10 group-hover:bg-white/20'
                  : 'bg-gray-900 text-white shadow-xs'
              }`}
            >
              <Mountain className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span
                className={`block text-xl font-bold tracking-tight leading-none ${
                  isTransparent ? 'text-white' : 'text-gray-950'
                }`}
              >
                Himachaly
              </span>
              <span
                className={`text-[10px] uppercase tracking-widest font-medium ${
                  isTransparent ? 'text-white/80' : 'text-gray-500'
                }`}
              >
                Tours and Travels
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation with Apple layoutId smooth active pill/bar */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-sm font-medium transition-colors relative py-2 px-1 cursor-pointer ${
                    isTransparent
                      ? isActive
                        ? 'text-white font-semibold'
                        : 'text-white/85 hover:text-white'
                      : isActive
                      ? 'text-gray-950 font-semibold'
                      : 'text-gray-600 hover:text-gray-950'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                        isTransparent ? 'bg-white' : 'bg-gray-950'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('admin')}
              title="Admin Portal"
              className={`p-2 rounded-full transition-colors cursor-pointer flex items-center space-x-1 text-xs ${
                isTransparent
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span className="text-[11px] font-medium">Admin</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              onClick={onOpenPlanTrip}
              className={`text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md ${
                isTransparent
                  ? 'bg-white text-gray-950 hover:bg-gray-100'
                  : 'bg-gray-950 text-white hover:bg-gray-800'
              }`}
            >
              Plan Your Trip
            </motion.button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl cursor-pointer ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white text-gray-900 border-b border-gray-200 px-6 pt-4 pb-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left text-base py-2 font-medium cursor-pointer border-b border-gray-50 ${
                    currentPage === item.page ? 'text-blue-900 font-bold' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 flex flex-col space-y-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPlanTrip();
                  }}
                  className="w-full bg-gray-950 text-white text-sm font-semibold py-3 rounded-full cursor-pointer hover:bg-gray-800 shadow-md"
                >
                  Plan Your Trip
                </motion.button>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full text-center text-xs text-gray-500 py-2 hover:text-gray-900 cursor-pointer flex items-center justify-center space-x-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Management</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
