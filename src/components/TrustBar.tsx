import React from 'react';
import { Heart, Star, Bus, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface TrustBarProps {
  onPrev?: () => void;
  onNext?: () => void;
}

export const TrustBar: React.FC<TrustBarProps> = ({ onPrev, onNext }) => {
  return (
    <section className="pt-14 pb-8 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Indicators & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-8"
        >
          <div className="flex items-center space-x-6">
            {/* Trusted by Travelers */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-sm font-semibold text-gray-800 cursor-default"
            >
              <span className="p-1 rounded-full bg-blue-50 text-blue-700">
                <Heart className="w-4 h-4 fill-blue-700" />
              </span>
              <span>Trusted by Travelers</span>
            </motion.div>

            {/* Customer Rating */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-sm font-semibold text-gray-800 cursor-default"
            >
              <span className="p-1 rounded-full bg-blue-50 text-blue-700">
                <Star className="w-4 h-4 fill-blue-700" />
              </span>
              <span>4.8+ Customer Rating</span>
            </motion.div>
          </div>

          {/* Slider arrow controls matching reference */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onPrev}
              aria-label="Previous"
              className="w-9 h-9 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onNext}
              aria-label="Next"
              className="w-9 h-9 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Editorial Heading matching reference: "Himachaly Tours means Going Places" */}
        <div className="pt-14 text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-950 leading-tight"
          >
            Himachaly Tours means
            <br />
            Going <span className="text-[#104374]">Places</span>
          </motion.h2>

          {/* Centered decorative dashed bus divider line with smooth spring entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex items-center justify-center max-w-md mx-auto"
          >
            <div className="flex-1 border-t-2 border-dashed border-[#104374]/35" />
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="mx-4 w-10 h-10 rounded-full bg-[#104374] text-white flex items-center justify-center shadow-md cursor-pointer"
            >
              <Bus className="w-4 h-4" />
            </motion.div>
            <div className="flex-1 border-t-2 border-dashed border-[#104374]/35" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
