import React from 'react';
import { TourPackage } from '../types';
import { X, Check, Calendar, MapPin, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  onClose,
  onBookPackage,
}) => {
  if (!pkg) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]"
      >
        {/* Hero Image & Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-900 shrink-0">
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-300 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{pkg.destination}</span>
              <span>•</span>
              <Clock className="w-3.5 h-3.5" />
              <span>{pkg.duration}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {pkg.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
              {pkg.subtitle}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Highlights */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-950 mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              <span>Tour Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pkg.highlights.map((h, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day-by-Day Itinerary */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-950 mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              <span>Day-by-Day Itinerary</span>
            </h4>
            <div className="space-y-3">
              {pkg.itinerary.map((item) => (
                <div key={item.day} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs">
                  <div className="flex items-center space-x-2 text-xs font-bold text-blue-900 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800">
                      Day {item.day}
                    </span>
                    <span className="text-gray-900">{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed pl-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="bg-green-50/50 border border-green-100 p-4 rounded-2xl">
              <h5 className="text-xs font-bold text-green-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-green-700" />
                <span>What is Included</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-green-950">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-green-700 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50/50 border border-red-100 p-4 rounded-2xl">
              <h5 className="text-xs font-bold text-red-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <X className="w-4 h-4 text-red-700" />
                <span>What is Excluded</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-red-950">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-red-700 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Accommodation Info */}
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-400 uppercase tracking-wider text-[10px] block">
                Accommodation Standard
              </span>
              <strong className="text-gray-900 text-sm mt-0.5 block">{pkg.accommodationType}</strong>
            </div>
            <span className="text-[11px] text-gray-500 text-right">
              Clean, sanitized, heated rooms with valley views
            </span>
          </div>
        </div>

        {/* Footer Pricing & CTA */}
        <div className="bg-gray-50 border-t border-gray-100 p-5 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-[11px] text-gray-500 uppercase tracking-wider block">
              Package Price Starts From
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-gray-950">₹{pkg.startingPrice}</span>
              <span className="text-xs text-gray-500">/person (Twin Sharing)*</span>
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="px-5 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-100 cursor-pointer"
            >
              Close
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onClose();
                onBookPackage(pkg);
              }}
              className="flex-1 sm:flex-none bg-black hover:bg-gray-800 text-white font-semibold py-3 px-7 rounded-full text-xs shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-transform active:scale-95"
            >
              <span>Book This Package</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
