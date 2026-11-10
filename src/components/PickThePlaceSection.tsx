import React, { useState } from 'react';
import { PageType, BusRoute } from '../types';
import {
  Calendar,
  ChevronDown,
  Clock,
  Armchair,
  Wifi,
  Zap,
  Luggage,
  ShieldCheck,
  Headphones,
  Bus as BusIcon,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PickThePlaceSectionProps {
  routes: BusRoute[];
  onNavigate: (page: PageType, param?: string) => void;
  onSearchBuses: (searchParams: { from: string; to: string; date: string; passengers: number }) => void;
}

export const PickThePlaceSection: React.FC<PickThePlaceSectionProps> = ({
  routes,
  onNavigate,
  onSearchBuses,
}) => {
  const [fromCity, setFromCity] = useState('Delhi');
  const [toCity, setToCity] = useState('Shimla');
  const [journeyDate, setJourneyDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);

  const availableCities = ['Delhi', 'Chandigarh', 'Ambala', 'Kalka'];
  const availableDestinations = ['Shimla', 'Manali', 'Dharamshala', 'Kasol', 'Kufri'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchBuses({
      from: fromCity,
      to: toCity,
      date: journeyDate,
      passengers,
    });
  };

  const handlePrevRoutes = () => {
    setPageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextRoutes = () => {
    setPageIndex((prev) => (prev + 3 < routes.length ? prev + 1 : 0));
  };

  const visibleRoutes = routes.slice(pageIndex, pageIndex + 3);

  // Fallback to initial 3 if slice is short
  const displayedRoutes = visibleRoutes.length >= 3 ? visibleRoutes : routes.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              <span>Populer Bus Routes</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-950">
              Pick the Place
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We have great bus options for everyday and holiday trips to your favorite
              Himachal destinations.
            </p>
          </div>
        </motion.div>

        {/* Horizontal Floating Search Bar matching reference with Apple smooth styling */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-3xl lg:rounded-full p-3 sm:p-4 shadow-xl border border-gray-100 mb-16 hover:shadow-2xl transition-shadow"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-2 items-center">
            {/* From City */}
            <div className="px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-100 text-left">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                From
              </label>
              <div className="relative">
                <select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full text-sm font-semibold text-gray-900 bg-transparent focus:outline-hidden appearance-none pr-6 cursor-pointer"
                >
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* To Destination */}
            <div className="px-4 py-2 border-b sm:border-b-0 lg:border-r border-gray-100 text-left">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                To
              </label>
              <div className="relative">
                <select
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full text-sm font-semibold text-gray-900 bg-transparent focus:outline-hidden appearance-none pr-6 cursor-pointer"
                >
                  {availableDestinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Journey Date */}
            <div className="px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-100 text-left">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                Journey Date
              </label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  value={journeyDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full text-sm font-semibold text-gray-900 bg-transparent focus:outline-hidden pr-6 cursor-pointer"
                />
                <Calendar className="w-4 h-4 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Passengers */}
            <div className="px-4 py-2 text-left">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                Passengers
              </label>
              <div className="relative">
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full text-sm font-semibold text-gray-900 bg-transparent focus:outline-hidden appearance-none pr-6 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Search Button matching reference */}
            <div className="p-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3.5 px-6 rounded-full text-sm shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Search</span>
              </motion.button>
            </div>
          </div>
        </motion.form>

        {/* 3 Popular Bus Route Cards matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {displayedRoutes.map((route, idx) => {
            // Determine custom subtitle and bottom specs matching reference image
            let customSub = route.category;
            let durationText = route.duration;
            let typeText = 'AC/Non-AC';
            let featureText = 'Free Wi-Fi';

            if (idx === 0 || route.id === 'delhi-shimla') {
              customSub = 'Daily Bus Service';
              durationText = '8–9 hrs';
              typeText = 'AC/Non-AC';
              featureText = 'Free Wi-Fi';
            } else if (idx === 1 || route.id === 'chandigarh-manali') {
              customSub = 'Volvo & Deluxe Buses';
              durationText = '6–7 hrs';
              typeText = 'AC Sleeper';
              featureText = 'Charging';
            } else if (idx === 2 || route.id === 'delhi-dharamshala') {
              customSub = 'Comfortable Bus Service';
              durationText = '10–11 hrs';
              typeText = 'AC/Seater';
              featureText = 'Blanket';
            }

            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                onClick={() => onNavigate('buses', route.id)}
                className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between"
              >
                {/* Card Top Header */}
                <div className="p-5 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-950 group-hover:text-blue-900 transition-colors">
                      {route.sourceCity} to {route.destinationCity}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{customSub}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-50 text-gray-700 border border-gray-200 flex items-center space-x-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>Daily</span>
                  </span>
                </div>

                {/* Route Scenic Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                  <motion.img
                    src={route.imageUrl}
                    alt={`${route.sourceCity} to ${route.destinationCity} bus service`}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle dark bottom strip over image with badges */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/75 backdrop-blur-xs py-2.5 px-4 text-white flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-white/80" />
                      <span>{durationText}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Armchair className="w-3.5 h-3.5 text-white/80" />
                      <span>{typeText}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      {featureText.includes('Wi-Fi') && <Wifi className="w-3.5 h-3.5 text-white/80" />}
                      {featureText.includes('Charging') && <Zap className="w-3.5 h-3.5 text-white/80" />}
                      {featureText.includes('Blanket') && <Luggage className="w-3.5 h-3.5 text-white/80" />}
                      <span>{featureText}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action footer with sample fare */}
                <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-500 block">Starting from</span>
                    <span className="text-base font-bold text-gray-950">
                      ₹{route.startingFare}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-1">/seat*</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-900 group-hover:text-blue-900 flex items-center space-x-1">
                    <span>View Buses</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section: Carousel Arrows + 3 Trust Feature Columns matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-8 border-t border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Left Arrow Controls */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handlePrevRoutes}
              aria-label="Previous Routes"
              className="w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleNextRoutes}
              aria-label="Next Routes"
              className="w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* 3 Core Trust Pillars matching reference footer of this section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 flex-1 lg:max-w-3xl divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {/* 1. Modern Buses */}
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center space-x-3.5 pl-0 sm:pl-4 pt-3 sm:pt-0 transition-transform cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#104374] flex items-center justify-center shrink-0">
                <BusIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-950">Modern Buses</h4>
                <p className="text-xs text-gray-500">Clean, Safe & Comfortable</p>
              </div>
            </motion.div>

            {/* 2. On-Time Service */}
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center space-x-3.5 pl-0 sm:pl-6 pt-3 sm:pt-0 transition-transform cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#104374] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-950">On-Time Service</h4>
                <p className="text-xs text-gray-500">Reliable & Punctual</p>
              </div>
            </motion.div>

            {/* 3. 24/7 Support */}
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center space-x-3.5 pl-0 sm:pl-6 pt-3 sm:pt-0 transition-transform cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#104374] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-950">24/7 Support</h4>
                <p className="text-xs text-gray-500">Always Here to Help</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
