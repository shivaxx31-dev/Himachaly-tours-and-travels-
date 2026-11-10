import React, { useRef } from 'react';
import { BusRoute, Destination, PageType, TourPackage, Testimonial } from '../types';
import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { BusServiceSection } from '../components/BusServiceSection';
import { PickThePlaceSection } from '../components/PickThePlaceSection';
import { ArrowRight, Star, ShieldCheck, Award, HeartHandshake, Compass, Clock, MapPin } from 'lucide-react';
import { DEFAULT_TESTIMONIALS } from '../data/defaultData';
import { motion } from 'motion/react';

interface HomePageProps {
  routes: BusRoute[];
  packages: TourPackage[];
  destinations: Destination[];
  onNavigate: (page: PageType, param?: string) => void;
  onOpenPlanTrip: () => void;
  onSelectPackage: (pkg: TourPackage) => void;
  onSelectDestination: (destId: string) => void;
  onSearchBuses: (searchParams: { from: string; to: string; date: string; passengers: number }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  routes,
  packages,
  destinations,
  onNavigate,
  onOpenPlanTrip,
  onSelectPackage,
  onSelectDestination,
  onSearchBuses,
}) => {
  const exploreRef = useRef<HTMLDivElement>(null);

  const scrollToExplore = () => {
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredPackages = packages.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="w-full bg-white text-gray-900 overflow-hidden">
      {/* 1. Hero Section matching reference image */}
      <Hero
        onNavigate={onNavigate}
        onExploreClick={scrollToExplore}
        onOpenPlanTrip={onOpenPlanTrip}
      />

      {/* 2. Trust Bar & "Himachaly Tours means Going Places" Headline */}
      <div ref={exploreRef}>
        <TrustBar />
      </div>

      {/* 3. "Our Bus Service" with asymmetric cards (Shimla, Manali, Dharamshala) */}
      <BusServiceSection
        onNavigate={onNavigate}
        onSelectDestination={onSelectDestination}
      />

      {/* 4. "Populer Bus Routes" / "Pick the Place" with Search Bar and 3 Route Cards */}
      <PickThePlaceSection
        routes={routes}
        onNavigate={onNavigate}
        onSearchBuses={onSearchBuses}
      />

      {/* 5. Featured Tour Packages Editorial Showcase */}
      <section className="py-24 bg-gray-50/70 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4"
          >
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700 uppercase tracking-widest mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                <span>Curated Hill Holidays</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950">
                Featured Holiday Packages
              </h2>
            </div>
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => onNavigate('packages')}
              className="inline-flex items-center space-x-1.5 text-sm font-bold text-blue-900 hover:text-blue-700 cursor-pointer"
            >
              <span>Explore All 6 Packages</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                onClick={() => onSelectPackage(pkg)}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-gray-900">
                    <motion.img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-gray-900 backdrop-blur-xs shadow-xs">
                      {pkg.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-1.5 text-xs font-semibold text-blue-900 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{pkg.destination}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-950 group-hover:text-blue-900 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {pkg.subtitle}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5">
                      {pkg.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-gray-700">
                          <span className="text-blue-700 font-bold">•</span>
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 bg-white">
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 block uppercase">Starting From</span>
                      <span className="text-xl font-black text-gray-950">₹{pkg.startingPrice}</span>
                      <span className="text-[10px] text-gray-400 ml-1">/person</span>
                    </div>
                    <div className="text-xs font-bold text-black group-hover:text-blue-900 flex items-center space-x-1">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Himachaly Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2 block">
              The Mountain Travel Standard
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight">
              Why Travelers Trust Himachaly
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
              Navigating Himalayan bends requires precision, experience and premium machinery.
              We take pride in our mountain safety records and customer-first hospitality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'Expert Mountain Drivers',
                desc: 'Every driver undergoes specialized hill-terrain certifications for night driving, winter snow, and winding ghats.',
              },
              {
                icon: Award,
                title: 'Luxury Air Suspension',
                desc: 'Modern Volvo B11R 9600 & Scania multi-axle coaches designed to absorb hill bumps and provide quiet, restful journeys.',
              },
              {
                icon: Clock,
                title: 'Punctual Schedules',
                desc: 'Fixed daily departures from Kashmiri Gate Delhi & Sector 43 Chandigarh with live GPS tracking shared via SMS.',
              },
              {
                icon: HeartHandshake,
                title: 'On-Ground Shimla Desk',
                desc: 'Direct office near Mall Road Shimla with 24/7 staff ready to assist with hotel check-ins, local cabs and return passes.',
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, backgroundColor: '#ffffff', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
                  className="p-6 rounded-3xl bg-gray-50 border border-gray-100 transition-all cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#104374] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-950">{pillar.title}</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Real Customer Testimonials */}
      <section className="py-24 bg-gray-50/60 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2 block">
              Traveler Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              Words From Our Passengers
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEFAULT_TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(0,0,0,0.07)' }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center space-x-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900">{t.author}</h4>
                  <div className="flex justify-between items-center text-[11px] text-gray-500 mt-0.5">
                    <span>{t.city}</span>
                    <span className="text-[10px] text-gray-400">{t.route}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Conversion Call-to-Action Strip with Apple spring buttons */}
      <section className="py-20 bg-[#104374] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Explore the Mountains?
            </h2>
            <p className="text-sm text-blue-100 mt-2 leading-relaxed">
              Book your Volvo bus seat today or let our Shimla travel desk design a custom holiday package for your family or friends.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              onClick={() => onNavigate('buses')}
              className="bg-white hover:bg-gray-100 text-gray-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer"
            >
              Book Bus Tickets
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              onClick={onOpenPlanTrip}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Plan Custom Trip
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};
