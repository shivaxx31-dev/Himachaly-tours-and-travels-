import React, { useState } from 'react';
import { PageType } from '../types';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  shimlaHero,
  manaliValley,
  dharamshalaTea,
  kufriSnow,
  spitiMonastery,
} from '../assets/images';

interface BusServiceSectionProps {
  onNavigate: (page: PageType, param?: string) => void;
  onSelectDestination: (destId: string) => void;
}

export const BusServiceSection: React.FC<BusServiceSectionProps> = ({
  onNavigate,
  onSelectDestination,
}) => {
  const cards = [
    {
      id: 'shimla',
      title: 'Shimla',
      subtitle: 'Queen of Hills',
      description: 'Colonial charm, scenic views and pleasant weather',
      image: shimlaHero,
      tall: true,
    },
    {
      id: 'manali',
      title: 'Manali',
      subtitle: 'Valley of the Gods',
      description: 'Snow peaks, Solang adventures and pine forest trails',
      image: manaliValley,
      tall: false,
    },
    {
      id: 'dharamshala',
      title: 'Dharamshala',
      subtitle: 'Spiritual Haven',
      description: 'Dalai Lama temple, Kangra tea gardens and Triund ridge',
      image: dharamshalaTea,
      tall: false,
    },
    {
      id: 'kufri',
      title: 'Kufri',
      subtitle: 'Winter Snow Wonder',
      description: 'Snow viewpoints, Yak rides and Himalayan nature park',
      image: kufriSnow,
      tall: true,
    },
    {
      id: 'spiti-valley',
      title: 'Spiti Valley',
      subtitle: 'High Altitude Desert',
      description: 'Ancient Key monastery, Chandratal lake and high passes',
      image: spitiMonastery,
      tall: false,
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 3));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3 < cards.length ? prev + 1 : 0));
  };

  const visibleCards = cards.slice(startIndex, startIndex + 3);

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column with Apple staggered entrance */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 pr-0 lg:pr-6"
          >
            {/* Category Tag matching reference: "• Our Bus Service" */}
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700 uppercase tracking-widest mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              <span>Our Bus Service</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-gray-950 leading-[1.15]">
              Not Just a Ride,
              <br />A Complete
              <br />Travel Experience
            </h3>

            <p className="mt-5 text-gray-600 text-sm sm:text-base leading-relaxed">
              Safe, comfortable and on-time bus services to Shimla and other Himachal
              destinations.
            </p>

            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                onClick={() => onNavigate('buses')}
                className="bg-black hover:bg-gray-800 text-white px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center space-x-2 shadow-md cursor-pointer"
              >
                <span>Book a Bus</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Photographic Cards Column */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end min-h-[420px]">
              <AnimatePresence mode="popLayout">
                {visibleCards.map((card, idx) => {
                  const isTall = idx === 0 || card.tall;
                  return (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      onClick={() => onSelectDestination(card.id)}
                      className={`relative rounded-3xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-shadow ${
                        isTall
                          ? 'h-[360px] sm:h-[420px]'
                          : 'h-[300px] sm:h-[340px]'
                      }`}
                    >
                      <motion.img
                        src={card.image}
                        alt={card.title}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full object-cover"
                      />

                      {/* Gradient Overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      {/* Card Content */}
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
                          {card.title}
                        </h4>
                        {card.subtitle && (
                          <p className="text-xs text-white/80 font-medium mt-0.5">
                            {card.subtitle}
                          </p>
                        )}
                        {card.description && isTall && (
                          <p className="text-xs text-white/75 mt-2 line-clamp-2 leading-relaxed font-light">
                            {card.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Pagination Controls matching reference: "← Prev" "Next →" */}
            <div className="mt-7 flex justify-end items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={handlePrev}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleNext}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
