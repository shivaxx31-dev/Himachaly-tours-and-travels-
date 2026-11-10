import React from 'react';
import { PageType } from '../types';
import { HERO_IMAGE } from '../data/defaultData';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (page: PageType, param?: string) => void;
  onExploreClick: () => void;
  onOpenPlanTrip: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onExploreClick,
  onOpenPlanTrip,
}) => {
  return (
    <section className="relative w-full min-h-[640px] md:min-h-[720px] lg:min-h-[800px] flex flex-col justify-between overflow-hidden bg-gray-950">
      {/* Background Image with gentle Apple-style slow ambient scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={HERO_IMAGE}
          alt="Shimla Christ Church on The Ridge with Himalayan mountains at twilight"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover object-[center_38%]"
        />
        {/* Subtle cinematic overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/55" />
      </div>

      {/* Spacer for top navbar */}
      <div className="h-24 w-full z-10" />

      {/* Main Hero Content with Apple-style staggered physics */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.95] text-white drop-shadow-md select-none"
          >
            Travel
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-xl drop-shadow-sm"
          >
            Daily bus services to Shimla and top Himachal destinations. Comfortable rides,
            reliable service and memorable hill journeys.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-4 items-center"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              onClick={() => onNavigate('buses')}
              className="bg-white text-gray-950 hover:bg-gray-100 px-7 py-3 rounded-full font-semibold text-sm shadow-xl flex items-center space-x-2 cursor-pointer"
            >
              <span>Book a Bus</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              onClick={() => onNavigate('packages')}
              className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer shadow-md"
            >
              Explore Packages
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Strip Bar matching reference design with smooth hover states */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full bg-[#3d271d]/90 backdrop-blur-md border-t border-white/10 text-white"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch">
          {/* 4 Interactive Feature Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 flex-1 divide-x divide-white/10 divide-y md:divide-y-0">
            {/* 1. Daily Bus Service */}
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('buses')}
              className="p-4 sm:p-5 text-left transition-colors cursor-pointer group"
            >
              <span className="block text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                Daily Bus Service
              </span>
              <span className="block text-xs text-white/70 mt-0.5">
                Delhi – Shimla (Everyday)
              </span>
            </motion.button>

            {/* 2. Tour Packages */}
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('packages')}
              className="p-4 sm:p-5 text-left transition-colors cursor-pointer group"
            >
              <span className="block text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                Tour Packages
              </span>
              <span className="block text-xs text-white/70 mt-0.5">
                Shimla, Manali, Dharamshala
              </span>
            </motion.button>

            {/* 3. Group Bookings */}
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenPlanTrip}
              className="p-4 sm:p-5 text-left transition-colors cursor-pointer group"
            >
              <span className="block text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                Group Bookings
              </span>
              <span className="block text-xs text-white/70 mt-0.5">
                Family, Friends & Corporate
              </span>
            </motion.button>

            {/* 4. Hill Station Tours */}
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('destinations')}
              className="p-4 sm:p-5 text-left transition-colors cursor-pointer group"
            >
              <span className="block text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                Hill Station Tours
              </span>
              <span className="block text-xs text-white/70 mt-0.5">
                Himachal & Nearby
              </span>
            </motion.button>
          </div>

          {/* Right White Explore Block */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            onClick={onExploreClick}
            className="bg-white text-gray-950 font-bold px-8 py-5 flex items-center justify-center text-sm md:text-base transition-colors cursor-pointer border-t lg:border-t-0 lg:border-l border-white/20 uppercase tracking-wider shrink-0 select-none shadow-sm"
          >
            Explore
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
