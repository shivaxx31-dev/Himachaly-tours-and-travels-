import React, { useState } from 'react';
import { Destination, PageType } from '../types';
import { MapPin, Compass, Thermometer, Calendar, ArrowRight, ChevronRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface DestinationsPageProps {
  destinations: Destination[];
  onSelectDestination: (destId: string) => void;
  onPlanTripForDest: (destName: string) => void;
  onNavigate: (page: PageType, param?: string) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  destinations,
  onSelectDestination,
  onPlanTripForDest,
  onNavigate,
}) => {
  const [filterVibe, setFilterVibe] = useState<'all' | 'popular' | 'snow' | 'peace'>('all');

  const filteredDestinations = destinations.filter((dest) => {
    if (filterVibe === 'popular') return ['shimla', 'manali', 'dharamshala'].includes(dest.id);
    if (filterVibe === 'snow') return ['kufri', 'solang-valley', 'spiti-valley'].includes(dest.id);
    if (filterVibe === 'peace') return ['kasol', 'dalhousie', 'dharamshala'].includes(dest.id);
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-gray-50 min-h-screen py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
            <button onClick={() => onNavigate('home')} className="hover:text-gray-900 cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">Destinations</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 block mb-1">
                Explore The Land of Gods
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight">
                Himachal Hill Destinations
              </h1>
              <p className="text-sm text-gray-600 mt-2 max-w-2xl leading-relaxed">
                From colonial ridges and apple orchards in Shimla to roaring river valleys in Manali
                and high-altitude monastic passes in Spiti. Discover the gems of the Western Himalayas.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {[
            { label: 'All Destinations (8)', value: 'all' },
            { label: 'Major Hill Capitals', value: 'popular' },
            { label: 'Snow & Adventure Hubs', value: 'snow' },
            { label: 'Tranquil & Pine Trails', value: 'peace' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilterVibe(tab.value as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                filterVibe === tab.value
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectDestination(dest.id)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-gray-900">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold block">
                      {dest.altitude}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs font-medium text-gray-800 line-clamp-1">
                    {dest.tagline}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {dest.overview}
                  </p>

                  <div className="pt-2 border-t border-gray-100 space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Best Time to Visit:
                    </span>
                    <span className="text-xs text-gray-700 font-medium block truncate">
                      {dest.bestTimeToVisit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDestination(dest.id);
                    }}
                    className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>View Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlanTripForDest(dest.name);
                    }}
                    className="bg-black hover:bg-gray-800 text-white text-[11px] font-semibold py-1.5 px-3.5 rounded-full shadow-xs cursor-pointer transition-transform"
                  >
                    Book Trip
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
