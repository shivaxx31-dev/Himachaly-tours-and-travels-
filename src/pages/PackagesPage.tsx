import React, { useState, useMemo } from 'react';
import { TourPackage, PageType } from '../types';
import { Clock, MapPin, Check, ArrowRight, ShieldCheck, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface PackagesPageProps {
  packages: TourPackage[];
  initialPackageId?: string;
  onSelectPackage: (pkg: TourPackage) => void;
  onBookPackageDirect: (pkg: TourPackage) => void;
  onNavigate: (page: PageType, param?: string) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  packages,
  initialPackageId,
  onSelectPackage,
  onBookPackageDirect,
  onNavigate,
}) => {
  const [selectedDurationFilter, setSelectedDurationFilter] = useState<string>('all');
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState<string>('all');

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      if (selectedDurationFilter === 'short' && pkg.days > 3) return false;
      if (selectedDurationFilter === 'medium' && (pkg.days < 4 || pkg.days > 6)) return false;
      if (selectedDurationFilter === 'long' && pkg.days < 7) return false;

      if (selectedDestinationFilter !== 'all') {
        if (!pkg.destination.toLowerCase().includes(selectedDestinationFilter.toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }, [packages, selectedDurationFilter, selectedDestinationFilter]);

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
            <span className="text-gray-900 font-medium">Tour Packages</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 block mb-1">
                Handcrafted Hill Itineraries
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight">
                Himachal Holiday Packages
              </h1>
              <p className="text-sm text-gray-600 mt-2 max-w-2xl leading-relaxed">
                Enjoy hassle-free mountain holidays with confirmed round-trip Volvo transport, scenic
                valley resort stays, guided sightseeing, and 24/7 travel desk support in Shimla.
              </p>
            </div>

            <div className="bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-2xs flex items-center space-x-2 text-xs text-gray-700">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Certified Local Himachal Operators</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-xs mb-10 flex flex-wrap items-center justify-between gap-4">
          {/* Duration Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">
              Duration:
            </span>
            {[
              { label: 'All Trips', value: 'all' },
              { label: 'Weekend (3 Days)', value: 'short' },
              { label: '4 to 6 Days', value: 'medium' },
              { label: 'Expeditions (7+ Days)', value: 'long' },
            ].map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDurationFilter(d.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  selectedDurationFilter === d.value
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Destination Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Region:
            </span>
            <select
              value={selectedDestinationFilter}
              onChange={(e) => setSelectedDestinationFilter(e.target.value)}
              className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl p-2 cursor-pointer focus:outline-hidden"
            >
              <option value="all">All Himachal</option>
              <option value="shimla">Shimla & Kufri</option>
              <option value="manali">Manali & Solang</option>
              <option value="dharamshala">Dharamshala & McLeod Ganj</option>
              <option value="spiti">Spiti Valley</option>
            </select>
          </div>
        </div>

        {/* Package Grid (6 Packages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectPackage(pkg)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-900">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-gray-900 backdrop-blur-xs shadow-xs">
                      {pkg.duration}
                    </span>
                    {pkg.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-gray-950 flex items-center space-x-1 shadow-xs">
                        <Sparkles className="w-3 h-3" />
                        <span>Popular Choice</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-center space-x-1 text-xs text-blue-200 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{pkg.destination}</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-950 group-hover:text-blue-900 transition-colors leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {pkg.subtitle}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Tour Highlights
                    </span>
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Accommodation Note */}
                  <div className="mt-4 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-600">
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Stay Included:</span>
                    <strong className="text-gray-800">{pkg.accommodationType}</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 pt-0 bg-white">
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Starting From</span>
                    <span className="text-2xl font-black text-gray-950">₹{pkg.startingPrice}</span>
                    <span className="text-[10px] text-gray-400 ml-1">/person*</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPackage(pkg);
                      }}
                      className="px-3.5 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Itinerary
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookPackageDirect(pkg);
                      }}
                      className="bg-black hover:bg-gray-800 text-white text-xs font-semibold py-2 px-4 rounded-full shadow-md flex items-center space-x-1 cursor-pointer transition-transform"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
