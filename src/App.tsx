import React, { useState, useEffect } from 'react';
import {
  Booking,
  BusRoute,
  BusSchedule,
  Destination,
  PageType,
  SiteSettings,
  TourPackage,
} from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BusTicketsPage } from './pages/BusTicketsPage';
import { PackagesPage } from './pages/PackagesPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { PlanTripModal } from './components/PlanTripModal';
import { SeatSelectionModal } from './components/SeatSelectionModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { PackageDetailModal } from './components/PackageDetailModal';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { AnimatePresence } from 'motion/react';
import {
  fetchBusRoutes,
  fetchBusSchedules,
  fetchDestinations,
  fetchPackages,
  fetchSiteSettings,
} from './services/firestoreService';
import {
  DEFAULT_BUS_ROUTES,
  DEFAULT_BUS_SCHEDULES,
  DEFAULT_DESTINATIONS,
  DEFAULT_PACKAGES,
  DEFAULT_SITE_SETTINGS,
} from './data/defaultData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [currentParam, setCurrentParam] = useState<string | undefined>(undefined);

  // Core Data
  const [routes, setRoutes] = useState<BusRoute[]>(DEFAULT_BUS_ROUTES);
  const [schedules, setSchedules] = useState<BusSchedule[]>(DEFAULT_BUS_SCHEDULES);
  const [packages, setPackages] = useState<TourPackage[]>(DEFAULT_PACKAGES);
  const [destinations, setDestinations] = useState<Destination[]>(DEFAULT_DESTINATIONS);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  // Search parameters forwarded to BusTicketsPage
  const [searchParams, setSearchParams] = useState<{
    from: string;
    to: string;
    date: string;
    passengers: number;
  }>({
    from: 'Delhi',
    to: 'Shimla',
    date: new Date().toISOString().split('T')[0],
    passengers: 1,
  });

  // Modals
  const [isPlanTripOpen, setIsPlanTripOpen] = useState(false);
  const [planTripDest, setPlanTripDest] = useState<string>('Shimla');
  const [selectedBusForBooking, setSelectedBusForBooking] = useState<{
    bus: BusSchedule;
    source: string;
    dest: string;
    date: string;
  } | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [selectedPackageDetail, setSelectedPackageDetail] = useState<TourPackage | null>(null);
  const [selectedDestinationDetail, setSelectedDestinationDetail] = useState<Destination | null>(null);

  // Scroll detection for navbar transparency on homepage
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hash-based URL routing & deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash) {
        setCurrentPage('home');
        setCurrentParam(undefined);
        return;
      }
      const parts = hash.split('/');
      const page = parts[0] as PageType;
      const param = parts[1];

      const validPages: PageType[] = [
        'home',
        'buses',
        'packages',
        'destinations',
        'about',
        'contact',
        'admin',
      ];
      if (validPages.includes(page)) {
        setCurrentPage(page);
        setCurrentParam(param);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageType, param?: string) => {
    setCurrentPage(page);
    setCurrentParam(param);
    const hash = param ? `#/${page}/${param}` : `#/${page}`;
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load live data from Firestore
  const reloadData = async () => {
    try {
      const [rts, schs, pkgs, dsts, sttngs] = await Promise.all([
        fetchBusRoutes(),
        fetchBusSchedules(),
        fetchPackages(),
        fetchDestinations(),
        fetchSiteSettings(),
      ]);
      setRoutes(rts);
      setSchedules(schs);
      setPackages(pkgs);
      setDestinations(dsts);
      setSettings(sttngs);
    } catch (e) {
      console.warn('Initial data load notice:', e);
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  // Handler for homepage search
  const handleHomeSearch = (params: {
    from: string;
    to: string;
    date: string;
    passengers: number;
  }) => {
    setSearchParams(params);
    navigateTo('buses');
  };

  // Handler when user clicks destination card
  const handleSelectDestination = (destId: string) => {
    const found = destinations.find((d) => d.id === destId);
    if (found) {
      setSelectedDestinationDetail(found);
    }
  };

  const isTransparentNav = currentPage === 'home' && !isScrolled;

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-blue-900 selection:text-white font-sans antialiased">
      {/* Global Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenPlanTrip={() => {
          setPlanTripDest('Shimla');
          setIsPlanTripOpen(true);
        }}
        isTransparent={isTransparentNav}
      />

      {/* Main Page Content */}
      <div className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            routes={routes}
            packages={packages}
            destinations={destinations}
            onNavigate={navigateTo}
            onOpenPlanTrip={() => {
              setPlanTripDest('Shimla');
              setIsPlanTripOpen(true);
            }}
            onSelectPackage={(pkg) => setSelectedPackageDetail(pkg)}
            onSelectDestination={handleSelectDestination}
            onSearchBuses={handleHomeSearch}
          />
        )}

        {currentPage === 'buses' && (
          <BusTicketsPage
            routes={routes}
            schedules={schedules}
            initialRouteId={currentParam}
            initialFrom={searchParams.from}
            initialTo={searchParams.to}
            initialDate={searchParams.date}
            initialPassengers={searchParams.passengers}
            onSelectBusToBook={(bus, source, dest, date) => {
              setSelectedBusForBooking({ bus, source, dest, date });
            }}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'packages' && (
          <PackagesPage
            packages={packages}
            initialPackageId={currentParam}
            onSelectPackage={(pkg) => setSelectedPackageDetail(pkg)}
            onBookPackageDirect={(pkg) => {
              setPlanTripDest(pkg.destination);
              setIsPlanTripOpen(true);
            }}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'destinations' && (
          <DestinationsPage
            destinations={destinations}
            onSelectDestination={handleSelectDestination}
            onPlanTripForDest={(destName) => {
              setPlanTripDest(destName);
              setIsPlanTripOpen(true);
            }}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenPlanTrip={() => {
              setPlanTripDest('Shimla');
              setIsPlanTripOpen(true);
            }}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            routes={routes}
            packages={packages}
            destinations={destinations}
            settings={settings}
            onRefreshData={reloadData}
            onNavigate={navigateTo}
          />
        )}
      </div>

      {/* Global Footer (shown on all pages except admin) */}
      {currentPage !== 'admin' && (
        <Footer
          onNavigate={navigateTo}
          onOpenPlanTrip={() => {
            setPlanTripDest('Shimla');
            setIsPlanTripOpen(true);
          }}
        />
      )}

      {/* Floating WhatsApp Action Button */}
      {currentPage !== 'admin' && (
        <WhatsAppFloating
          whatsappNumber={settings.whatsapp}
          defaultDestination={planTripDest}
        />
      )}

      {/* Modals & Dialogs with AnimatePresence */}
      <AnimatePresence>
        {/* 1. Plan Trip / Enquiry Modal */}
        {isPlanTripOpen && (
          <PlanTripModal
            isOpen={isPlanTripOpen}
            onClose={() => setIsPlanTripOpen(false)}
            defaultDestination={planTripDest}
          />
        )}

        {/* 2. Interactive Seat Selection & Bus Booking Modal */}
        {selectedBusForBooking && (
          <SeatSelectionModal
            bus={selectedBusForBooking.bus}
            sourceCity={selectedBusForBooking.source}
            destinationCity={selectedBusForBooking.dest}
            journeyDate={selectedBusForBooking.date}
            onClose={() => setSelectedBusForBooking(null)}
            onBookingSuccess={(booking) => {
              setSelectedBusForBooking(null);
              setConfirmedBooking(booking);
            }}
          />
        )}

        {/* 3. Booking Confirmation / Voucher Modal */}
        {confirmedBooking && (
          <BookingConfirmationModal
            booking={confirmedBooking}
            onClose={() => setConfirmedBooking(null)}
          />
        )}

        {/* 4. Package Detail Modal */}
        {selectedPackageDetail && (
          <PackageDetailModal
            pkg={selectedPackageDetail}
            onClose={() => setSelectedPackageDetail(null)}
            onBookPackage={(pkg) => {
              setSelectedPackageDetail(null);
              setPlanTripDest(pkg.destination);
              setIsPlanTripOpen(true);
            }}
          />
        )}

        {/* 5. Destination Guide Modal */}
        {selectedDestinationDetail && (
          <DestinationDetailModal
            destination={selectedDestinationDetail}
            onClose={() => setSelectedDestinationDetail(null)}
            onNavigate={navigateTo}
            onPlanTripForDest={(destName) => {
              setSelectedDestinationDetail(null);
              setPlanTripDest(destName);
              setIsPlanTripOpen(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
