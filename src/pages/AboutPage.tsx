import React from 'react';
import { PageType } from '../types';
import { ChevronRight, ShieldCheck, Heart, Award, Bus, Users, MapPin, ArrowRight } from 'lucide-react';
import { DEFAULT_SITE_SETTINGS } from '../data/defaultData';
import { shimlaHero, volvoBus } from '../assets/images';
import { motion } from 'motion/react';

interface AboutPageProps {
  onNavigate: (page: PageType, param?: string) => void;
  onOpenPlanTrip: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenPlanTrip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white text-gray-900 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6">
          <button onClick={() => onNavigate('home')} className="hover:text-gray-900 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">About Us</span>
        </div>

        {/* Editorial Hero Statement matching prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 block mb-2">
            Our Story & Heritage
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-950 leading-tight">
            Every Journey Has A Story.
            <br />
            <span className="text-[#104374]">Let Us Be Part Of Yours.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
            Himachaly Tours and Travels is a dedicated passenger transportation and hill-station touring company headquartered in Shimla. We specialize in reliable daily bus connections from Delhi, Chandigarh and northern plains to Himachal Pradesh, paired with curated holiday experiences that honor the natural beauty of the Himalayas.
          </p>
        </motion.div>

        {/* Visual Story Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-gray-100">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={shimlaHero}
                alt="Shimla Christ Church and Mountain Panorama"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-white p-5 rounded-3xl shadow-xl border border-gray-100 max-w-xs">
              <span className="text-xs uppercase font-bold text-blue-900 tracking-wider block mb-1">
                Rooted in Shimla
              </span>
              <p className="text-xs text-gray-600 leading-snug">
                Operational offices right near Victory Tunnel on The Mall Road, ensuring genuine local support.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              A Travel Philosophy Built on Mountain Respect & Comfort
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Driving into Himachal Pradesh is not merely an intercity trip—it is an ascent into steep gorges, pine-scented breezes, and unpredictable hill weather. We believe that road travel to the hills should be comfortable, unhurried, and punctual.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Whether you are travelling for an anniversary in Shimla, an adventure expedition across the high passes of Spiti, or taking a weekend break with family, we treat every reservation with personalized attention and mountain hospitality.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <ShieldCheck className="w-6 h-6 text-blue-900 mb-2" />
                <h4 className="text-sm font-bold text-gray-950">Safety Above All</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Speed-governed coaches, twin mountain drivers on night routes, and regular brake checks before every hill ascent.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <Heart className="w-6 h-6 text-blue-900 mb-2" />
                <h4 className="text-sm font-bold text-gray-950">Customer First</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Direct phone access to our dispatch coordinators with clear boarding instructions and hotel assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet & Mountain Driving Standards */}
        <div className="py-20 border-b border-gray-100">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2 block">
              Modern Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              Our Touring Fleet Standards
            </h2>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              We deploy specialized multi-axle coaches specifically engineered for steep elevations and sharp hairpin turns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <Bus className="w-8 h-8 text-[#104374] mb-4" />
                <h3 className="text-lg font-bold text-gray-950">Volvo 9600 & B11R Multi-Axle</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Electronically controlled air suspension, low center of gravity, panoramic tinted UV glass, and ergonomic semi-sleeper seats with calf support.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <Bus className="w-8 h-8 text-[#104374] mb-4" />
                <h3 className="text-lg font-bold text-gray-950">Luxury 2+1 AC Sleepers</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Spacious private sleeper berths with personal reading lamps, charging sockets, clean blankets, and curtains for restful night journeys to Manali.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <Bus className="w-8 h-8 text-[#104374] mb-4" />
                <h3 className="text-lg font-bold text-gray-950">BharatBenz Hill Express</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Robust mountain chassis with high ground clearance, responsive retarder brakes, and spacious reclining seats ideal for Shivalik bypass roads.
                </p>
              </motion.div>
          </div>
        </div>

        {/* Operational Values */}
        <div className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gray-950 text-white rounded-3xl p-8 sm:p-14"
          >
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-2">
                Our Commitment
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Authentic Mountain Hospitality
              </h2>
              <p className="text-sm text-gray-300 mt-4 leading-relaxed">
                We believe that honesty in scheduling, fair sample fares, clean coaches, and courteous staff build lifelong relationships. When you step aboard a Himachaly coach, you are our valued guest in Himachal Pradesh.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('packages')}
                  className="bg-white text-gray-950 font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  View Tour Packages
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenPlanTrip}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Contact Our Desk
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
