import React from 'react';
import { Destination, PageType } from '../types';
import { X, MapPin, Compass, Thermometer, Calendar, ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onNavigate: (page: PageType, param?: string) => void;
  onPlanTripForDest: (destName: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onNavigate,
  onPlanTripForDest,
}) => {
  if (!destination) return null;

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
        {/* Destination Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-900 shrink-0">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <span className="text-xs uppercase tracking-widest font-semibold text-blue-300 block mb-1">
              Himachal Destination Guide
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight">
              {destination.name}
            </h3>
            <p className="text-sm text-white/90 mt-0.5 font-medium">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Info Strip */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center space-x-2 text-gray-700">
            <Compass className="w-4 h-4 text-blue-900 shrink-0" />
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Altitude</span>
              <strong className="text-gray-900">{destination.altitude}</strong>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-700">
            <Thermometer className="w-4 h-4 text-blue-900 shrink-0" />
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Climate</span>
              <strong className="text-gray-900">{destination.temperature}</strong>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-700">
            <Calendar className="w-4 h-4 text-blue-900 shrink-0" />
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Best Season</span>
              <strong className="text-gray-900 truncate block">{destination.bestTimeToVisit}</strong>
            </div>
          </div>
        </div>

        {/* Scrollable Overview & Activities */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              About {destination.name}
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {destination.overview}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Must-Do Experiences
            </h4>
            <div className="space-y-2">
              {destination.thingsToDo.map((todo, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span>{todo}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Nearby Spots Worth Exploring
            </h4>
            <div className="flex flex-wrap gap-2">
              {destination.nearbyAttractions.map((spot, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {spot}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 border-t border-gray-100 p-5 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              onClose();
              onNavigate('buses');
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-gray-300 text-gray-800 font-semibold text-xs hover:bg-gray-100 cursor-pointer"
          >
            Check Buses to {destination.name}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              onClose();
              onPlanTripForDest(destination.name);
            }}
            className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-full text-xs shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-transform active:scale-95"
          >
            <span>Plan a Trip to {destination.name}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
