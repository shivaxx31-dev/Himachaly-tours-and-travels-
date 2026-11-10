import React, { useState, useMemo } from 'react';
import { BusRoute, BusSchedule, PageType } from '../types';
import {
  Clock,
  Armchair,
  Wifi,
  Zap,
  Luggage,
  Shield,
  Star,
  Search,
  Filter,
  ArrowRight,
  Info,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

interface BusTicketsPageProps {
  routes: BusRoute[];
  schedules: BusSchedule[];
  initialRouteId?: string;
  initialFrom?: string;
  initialTo?: string;
  initialDate?: string;
  initialPassengers?: number;
  onSelectBusToBook: (bus: BusSchedule, source: string, dest: string, date: string) => void;
  onNavigate: (page: PageType, param?: string) => void;
}

export const BusTicketsPage: React.FC<BusTicketsPageProps> = ({
  routes,
  schedules,
  initialRouteId,
  initialFrom = 'Delhi',
  initialTo = 'Shimla',
  initialDate,
  initialPassengers = 1,
  onSelectBusToBook,
  onNavigate,
}) => {
  const [sourceCity, setSourceCity] = useState(() => {
    if (initialRouteId) {
      const r = routes.find((rt) => rt.id === initialRouteId);
      if (r) return r.sourceCity;
    }
    return initialFrom;
  });

  const [destinationCity, setDestinationCity] = useState(() => {
    if (initialRouteId) {
      const r = routes.find((rt) => rt.id === initialRouteId);
      if (r) return r.destinationCity;
    }
    return initialTo;
  });

  const [travelDate, setTravelDate] = useState(() => {
    if (initialDate) return initialDate;
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  const [passengers, setPassengers] = useState(initialPassengers);

  // Filters
  const [selectedBusType, setSelectedBusType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'fare-asc' | 'fare-desc' | 'departure' | 'rating'>('fare-asc');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'evening' | 'night'>('all');

  const availableCities = ['Delhi', 'Chandigarh', 'Ambala', 'Kalka'];
  const availableDestinations = ['Shimla', 'Manali', 'Dharamshala', 'Kasol', 'Kufri'];

  // Current matched route
  const currentRoute = useMemo(() => {
    return routes.find(
      (r) =>
        r.sourceCity.toLowerCase() === sourceCity.toLowerCase() &&
        r.destinationCity.toLowerCase() === destinationCity.toLowerCase()
    );
  }, [routes, sourceCity, destinationCity]);

  // Filter schedules
  const filteredSchedules = useMemo(() => {
    let list = schedules.filter((s) => {
      if (currentRoute) {
        return s.routeId === currentRoute.id;
      }
      return true;
    });

    if (selectedBusType !== 'all') {
      list = list.filter((s) => s.busType.toLowerCase().includes(selectedBusType.toLowerCase()));
    }

    if (timeFilter !== 'all') {
      list = list.filter((s) => {
        const hour = parseInt(s.departureTime.split(':')[0], 10);
        if (timeFilter === 'morning') return hour >= 5 && hour < 12;
        if (timeFilter === 'evening') return hour >= 16 && hour < 21;
        if (timeFilter === 'night') return hour >= 21 || hour < 5;
        return true;
      });
    }

    // Sort
    return [...list].sort((a, b) => {
      if (sortBy === 'fare-asc') return a.fare - b.fare;
      if (sortBy === 'fare-desc') return b.fare - a.fare;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
      return 0;
    });
  }, [schedules, currentRoute, selectedBusType, timeFilter, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-gray-50 min-h-screen py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
            <button onClick={() => onNavigate('home')} className="hover:text-gray-900 cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">Bus Tickets</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                Bus Booking & Timetables
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Luxury Volvo, BharatBenz & AC Sleeper coaches connecting major cities to Himachal hill stations.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs text-gray-500 bg-white px-3.5 py-2 rounded-full border border-gray-200">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Instant Seat Hold • 100% Refund Guarantee on Cancellations</span>
            </div>
          </div>
        </div>

        {/* Top Search Controls Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Boarding City (From)
              </label>
              <select
                value={sourceCity}
                onChange={(e) => setSourceCity(e.target.value)}
                className="w-full text-sm font-semibold bg-gray-50 border border-gray-200 rounded-xl p-2.5 cursor-pointer focus:outline-hidden focus:border-blue-900"
              >
                {availableCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Destination (To)
              </label>
              <select
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                className="w-full text-sm font-semibold bg-gray-50 border border-gray-200 rounded-xl p-2.5 cursor-pointer focus:outline-hidden focus:border-blue-900"
              >
                {availableDestinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Date of Journey
              </label>
              <input
                type="date"
                value={travelDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full text-sm font-semibold bg-gray-50 border border-gray-200 rounded-xl p-2.5 cursor-pointer focus:outline-hidden focus:border-blue-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Travellers
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full text-sm font-semibold bg-gray-50 border border-gray-200 rounded-xl p-2.5 cursor-pointer focus:outline-hidden focus:border-blue-900"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Passenger' : 'Passengers'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="bg-gray-900 text-white text-xs font-semibold py-3 px-4 rounded-xl text-center">
                <span>{sourceCity} → {destinationCity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Bus Class Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">
              Class:
            </span>
            {[
              { label: 'All Coaches', value: 'all' },
              { label: 'Volvo AC 2+2', value: 'volvo' },
              { label: 'Luxury Sleeper 2+1', value: 'sleeper' },
              { label: 'BharatBenz Seater', value: 'bharatbenz' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedBusType(tab.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  selectedBusType === tab.value
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Time & Sort Selectors */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 text-xs text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as any)}
                className="bg-transparent font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="all">Any Departure Time</option>
                <option value="morning">Morning (5 AM – 12 PM)</option>
                <option value="evening">Evening (4 PM – 9 PM)</option>
                <option value="night">Night (9 PM+)</option>
              </select>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="fare-asc">Fare: Low to High</option>
                <option value="fare-desc">Fare: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="departure">Earliest Departure</option>
              </select>
            </div>
          </div>
        </div>

        {/* Route Snapshot Header */}
        {currentRoute && (
          <div className="mb-6 p-4 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#104374] flex items-center justify-center font-bold">
                HT
              </div>
              <div>
                <strong className="text-gray-950 text-sm">
                  {currentRoute.sourceCity} to {currentRoute.destinationCity} Highway Corridor
                </strong>
                <p className="text-gray-500 text-xs">
                  Approx {currentRoute.distance} • Average Transit: {currentRoute.duration} • {currentRoute.dailyFrequency}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-gray-400 block">Operator Starting Fare</span>
              <strong className="text-base text-gray-900">₹{currentRoute.startingFare}</strong>
              <span className="text-[10px] text-gray-400 ml-1">/seat*</span>
            </div>
          </div>
        )}

        {/* Bus Listings List */}
        {filteredSchedules.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 my-8">
            <Armchair className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900">No scheduled departures found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              We do not have direct online slots for this exact filter combination today. Try switching from {sourceCity} to another date or choose 'All Coaches'.
            </p>
            <button
              onClick={() => {
                setSelectedBusType('all');
                setTimeFilter('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-gray-900 text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSchedules.map((bus, idx) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Bus Details & Timings */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <h3 className="text-base sm:text-lg font-bold text-gray-950">
                        {bus.busName}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                        {bus.busType}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{bus.rating}</span>
                      <span className="text-[10px] text-gray-400 font-normal">
                        ({bus.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Route & Timing Corridor */}
                  <div className="grid grid-cols-3 items-center max-w-lg text-left">
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-gray-950">
                        {bus.departureTime}
                      </span>
                      <span className="block text-xs font-semibold text-gray-700 truncate mt-0.5">
                        {bus.departurePlace}
                      </span>
                      <span className="block text-[10px] text-gray-400">{sourceCity}</span>
                    </div>

                    <div className="text-center px-2">
                      <span className="text-[11px] text-gray-500 font-medium block">
                        {bus.duration}
                      </span>
                      <div className="relative flex items-center justify-center my-1">
                        <div className="w-full border-t border-gray-300 border-dashed" />
                        <span className="w-2 h-2 rounded-full bg-blue-900 absolute" />
                      </div>
                      <span className="text-[10px] text-green-700 font-semibold block">
                        Direct Non-Stop
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-black text-gray-950">
                        {bus.arrivalTime}
                      </span>
                      <span className="block text-xs font-semibold text-gray-700 truncate mt-0.5">
                        {bus.arrivalPlace}
                      </span>
                      <span className="block text-[10px] text-gray-400">{destinationCity}</span>
                    </div>
                  </div>

                  {/* Amenities Badges */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-600">
                    {bus.amenities.map((a, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-700 border border-gray-100 flex items-center space-x-1"
                      >
                        {a.includes('Wi-Fi') && <Wifi className="w-3 h-3 text-gray-500" />}
                        {a.includes('Charging') && <Zap className="w-3 h-3 text-gray-500" />}
                        {a.includes('Blanket') && <Luggage className="w-3 h-3 text-gray-500" />}
                        <span>{a}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Seat Selection Action */}
                <div className="lg:border-l lg:border-gray-100 lg:pl-8 flex lg:flex-col justify-between items-end lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                  <div className="text-left lg:text-right">
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider block">
                      Fare Per Seat
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-gray-950">
                      ₹{bus.fare}
                    </span>
                    <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
                      {bus.availableSeats} Seats Available
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() =>
                      onSelectBusToBook(bus, sourceCity, destinationCity, travelDate)
                    }
                    className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-full text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center space-x-2"
                  >
                    <span>View Seats</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Demo Inventory Notice */}
        <div className="mt-10 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 flex items-start space-x-2.5">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <strong>Operator Live Schedule Disclaimer:</strong> Schedules, timings and fares are representative sample timetables. Live GPS tracking links and boarding gate numbers are sent via SMS 2 hours prior to scheduled departure.
          </div>
        </div>
      </div>
    </motion.div>
  );
};
