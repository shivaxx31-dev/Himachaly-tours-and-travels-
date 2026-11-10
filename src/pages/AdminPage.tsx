import React, { useState, useEffect } from 'react';
import {
  Booking,
  BusRoute,
  Destination,
  Enquiry,
  PageType,
  SiteSettings,
  TourPackage,
} from '../types';
import {
  Shield,
  LogOut,
  Users,
  Bus,
  Package,
  MapPin,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  Search,
  Lock,
} from 'lucide-react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../firebase';
import { shimlaHero } from '../assets/images';
import {
  fetchBookings,
  fetchEnquiries,
  updateBookingStatus,
  updateEnquiryStatus,
  saveBusRoute,
  saveTourPackage,
  removeTourPackage,
  saveSiteSettings,
} from '../services/firestoreService';

interface AdminPageProps {
  routes: BusRoute[];
  packages: TourPackage[];
  destinations: Destination[];
  settings: SiteSettings;
  onRefreshData: () => void;
  onNavigate: (page: PageType, param?: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  routes,
  packages,
  destinations,
  settings,
  onRefreshData,
  onNavigate,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDemoAdmin, setIsDemoAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'enquiries' | 'bookings' | 'packages' | 'routes' | 'settings'
  >('overview');

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Package Form Modal State
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [showPackageModal, setShowPackageModal] = useState(false);

  // Settings State
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(settings);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isAdminAuthenticated = Boolean(user || isDemoAdmin);

  const loadAdminData = async () => {
    setLoadingData(true);
    try {
      const [enqs, bks] = await Promise.all([fetchEnquiries(), fetchBookings()]);
      setEnquiries(enqs);
      setBookings(bks);
    } catch (e) {
      console.warn('Could not load live admin records', e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      loadAdminData();
    }
  }, [isAdminAuthenticated]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      alert(`Google sign-in note: ${error?.message || 'Popup closed'}. You can also use "Demo Mode" below.`);
    }
  };

  const handleLogout = async () => {
    if (user) {
      await signOut(auth);
    }
    setIsDemoAdmin(false);
  };

  const handleUpdateEnquiry = async (id: string, status: Enquiry['status']) => {
    await updateEnquiryStatus(id, status);
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    setActionNotice(`Enquiry #${id} updated to ${status}`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleUpdateBooking = async (id: string, status: Booking['bookingStatus']) => {
    await updateBookingStatus(id, status);
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, bookingStatus: status } : item))
    );
    setActionNotice(`Booking #${id} updated to ${status}`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleDeletePackage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this tour package?')) return;
    await removeTourPackage(id);
    onRefreshData();
    setActionNotice('Package removed successfully.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleSavePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    await saveTourPackage(editingPackage);
    setShowPackageModal(false);
    setEditingPackage(null);
    onRefreshData();
    setActionNotice('Package saved to catalog.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSiteSettings(siteSettings);
    onRefreshData();
    setActionNotice('Business contact settings updated.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-200 shadow-xl text-center">
          <div className="w-14 h-14 bg-blue-50 text-[#104374] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-700 block mb-1">
            Himachaly Administrative Desk
          </span>
          <h2 className="text-2xl font-black text-gray-950 tracking-tight">
            Manager Login
          </h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Authorized access only to manage bus schedules, customer reservations, tour package catalog, and enquiries.
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-full text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
            >
              <span>Sign in with Google</span>
            </button>

            <button
              onClick={() => setIsDemoAdmin(true)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-full text-xs transition-colors cursor-pointer"
            >
              One-Click Demo Access
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer"
            >
              ← Back to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalEnquiriesCount = enquiries.length;
  const pendingEnquiriesCount = enquiries.filter((e) => e.status === 'pending').length;
  const totalBookingsCount = bookings.length;
  const confirmedBookingsCount = bookings.filter((b) => b.bookingStatus === 'confirmed').length;
  const estimatedRevenue = bookings
    .filter((b) => b.bookingStatus === 'confirmed')
    .reduce((acc, curr) => acc + (curr.totalFare || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-50 text-[#104374]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-gray-950 block leading-tight">
                Himachaly Admin Console
              </span>
              <span className="text-[10px] text-gray-500 font-mono">
                {user?.email || 'Logged in as Operator / Demo Admin'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadAdminData}
              title="Refresh Data"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
            >
              View Live Website
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Clock },
            { id: 'enquiries', label: `Enquiries (${pendingEnquiriesCount} pending)`, icon: Mail },
            { id: 'bookings', label: `Bookings (${totalBookingsCount})`, icon: Bus },
            { id: 'packages', label: `Tour Packages (${packages.length})`, icon: Package },
            { id: 'routes', label: `Bus Routes (${routes.length})`, icon: MapPin },
            { id: 'settings', label: 'Site Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  active
                    ? 'border-blue-900 text-blue-900 font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {actionNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-900 text-xs font-semibold flex items-center justify-between">
            <span>{actionNotice}</span>
            <button onClick={() => setActionNotice(null)} className="text-green-700 cursor-pointer">
              ✕
            </button>
          </div>
        )}

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-gray-400">Total Enquiries</span>
                <span className="text-3xl font-black text-gray-950 block mt-1">
                  {totalEnquiriesCount}
                </span>
                <span className="text-[11px] text-amber-700 mt-1 block font-medium">
                  {pendingEnquiriesCount} Pending Review
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-gray-400">Booking Requests</span>
                <span className="text-3xl font-black text-gray-950 block mt-1">
                  {totalBookingsCount}
                </span>
                <span className="text-[11px] text-green-700 mt-1 block font-medium">
                  {confirmedBookingsCount} Confirmed & Reserved
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-gray-400">Booked Value</span>
                <span className="text-3xl font-black text-blue-900 block mt-1">
                  ₹{estimatedRevenue.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-gray-500 mt-1 block">Confirmed Reservations</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-gray-400">Active Fleet Corridors</span>
                <span className="text-3xl font-black text-gray-950 block mt-1">
                  {routes.length}
                </span>
                <span className="text-[11px] text-gray-500 mt-1 block">Delhi, Chd, Shimla, Manali</span>
              </div>
            </div>

            {/* Quick Recent Activity Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Enquiries */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-950">Recent Customer Enquiries</h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-blue-900 font-semibold hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <p className="text-xs text-gray-400 py-6 text-center">No customer enquiries yet.</p>
                ) : (
                  <div className="space-y-3">
                    {enquiries.slice(0, 4).map((enq) => (
                      <div
                        key={enq.id}
                        className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-gray-900">{enq.name}</div>
                          <div className="text-[11px] text-gray-500">
                            {enq.destination} • {enq.serviceRequired} • {enq.phone}
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            enq.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : enq.status === 'contacted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Bookings */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-950">Recent Seat Reservations</h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-blue-900 font-semibold hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <p className="text-xs text-gray-400 py-6 text-center">No bookings submitted yet.</p>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 4).map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-gray-900">
                            {b.passengerName} <span className="text-gray-400 font-mono text-[10px]">#{b.id}</span>
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {b.routeTitle || b.packageTitle} • Seats: {b.selectedSeats} • ₹{b.totalFare}
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            b.bookingStatus === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {b.bookingStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-950">Customer Enquiries</h3>
                <p className="text-xs text-gray-500">
                  Track travel leads submitted from the website and contact desk.
                </p>
              </div>
              <button
                onClick={loadAdminData}
                className="px-3.5 py-1.5 rounded-full bg-gray-100 text-xs font-semibold hover:bg-gray-200 cursor-pointer"
              >
                Refresh Enquiries
              </button>
            </div>

            {enquiries.length === 0 ? (
              <p className="text-xs text-gray-400 py-12 text-center">No customer enquiries submitted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Ref / Name</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Destination</th>
                      <th className="p-3">Travel Date</th>
                      <th className="p-3">Service</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {enquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-gray-50/50">
                        <td className="p-3">
                          <strong className="text-gray-900 block">{enq.name}</strong>
                          <span className="text-[10px] text-gray-400 font-mono">#{enq.id}</span>
                        </td>
                        <td className="p-3">
                          <a href={`tel:${enq.phone}`} className="text-blue-900 hover:underline font-semibold block">
                            {enq.phone}
                          </a>
                          {enq.email && <span className="text-[10px] text-gray-400">{enq.email}</span>}
                        </td>
                        <td className="p-3 font-semibold text-gray-800">{enq.destination}</td>
                        <td className="p-3 text-gray-600">{enq.travelDate} ({enq.passengers} pax)</td>
                        <td className="p-3 text-gray-600">{enq.serviceRequired}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              enq.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : enq.status === 'contacted'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {enq.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={enq.status}
                            onChange={(e) =>
                              enq.id && handleUpdateEnquiry(enq.id, e.target.value as any)
                            }
                            className="text-[11px] font-semibold bg-white border border-gray-200 rounded-lg p-1.5 cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 3. BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-950">Bus & Package Bookings</h3>
                <p className="text-xs text-gray-500">
                  Manage passenger reservations, allocated seats, and boarding passes.
                </p>
              </div>
              <button
                onClick={loadAdminData}
                className="px-3.5 py-1.5 rounded-full bg-gray-100 text-xs font-semibold hover:bg-gray-200 cursor-pointer"
              >
                Refresh Bookings
              </button>
            </div>

            {bookings.length === 0 ? (
              <p className="text-xs text-gray-400 py-12 text-center">No bookings submitted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Passenger</th>
                      <th className="p-3">Journey / Route</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Seats</th>
                      <th className="p-3">Total Fare</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50/50">
                        <td className="p-3 font-mono font-bold text-blue-900">#{b.id}</td>
                        <td className="p-3">
                          <strong className="text-gray-900 block">{b.passengerName}</strong>
                          <a href={`tel:${b.passengerPhone}`} className="text-gray-500 text-[11px] hover:underline">
                            {b.passengerPhone}
                          </a>
                        </td>
                        <td className="p-3 font-semibold text-gray-800">
                          {b.routeTitle || b.packageTitle}
                        </td>
                        <td className="p-3 text-gray-600">{b.travelDate}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 font-bold">
                            {b.selectedSeats}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-gray-900">₹{b.totalFare}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              b.bookingStatus === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {b.bookingStatus}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={b.bookingStatus}
                            onChange={(e) =>
                              handleUpdateBooking(b.id, e.target.value as any)
                            }
                            className="text-[11px] font-semibold bg-white border border-gray-200 rounded-lg p-1.5 cursor-pointer"
                          >
                            <option value="requested">Requested</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 4. PACKAGES TAB */}
        {activeTab === 'packages' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-950">Tour Packages Manager</h3>
                <p className="text-xs text-gray-500">Edit pricing, itineraries and featured packages.</p>
              </div>
              <button
                onClick={() => {
                  setEditingPackage({
                    id: 'custom-package-' + Date.now().toString().slice(-4),
                    title: 'New Himachal Package',
                    subtitle: 'Scenic tour across mountain valleys',
                    destination: 'Shimla & Beyond',
                    duration: '4 Days / 3 Nights',
                    days: 4,
                    nights: 3,
                    startingPrice: 7999,
                    featured: false,
                    imageUrl: shimlaHero,
                    highlights: ['Round-trip Volvo bus seats', '3 nights resort stay', 'Guided sightseeing'],
                    itinerary: [
                      { day: 1, title: 'Arrival & Welcome', description: 'Pickup and hotel check-in.' },
                      { day: 2, title: 'Valley Excursion', description: 'Scenic drive to local viewpoints.' },
                    ],
                    inclusions: ['Bus tickets', 'Stay with breakfast and dinner'],
                    exclusions: ['Personal expenses and adventure activities'],
                    accommodationType: '4-Star Mountain View Resort',
                  });
                  setShowPackageModal(true);
                }}
                className="bg-black hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-5 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-blue-900">{pkg.destination}</span>
                      <span className="text-xs font-bold text-gray-950">₹{pkg.startingPrice}</span>
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mt-1">{pkg.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{pkg.subtitle}</p>
                    <span className="text-[11px] text-gray-400 block mt-2">{pkg.duration}</span>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between items-center">
                    <button
                      onClick={() => {
                        setEditingPackage(pkg);
                        setShowPackageModal(true);
                      }}
                      className="text-xs font-semibold text-blue-900 hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Details</span>
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="text-xs text-red-600 hover:text-red-800 flex items-center space-x-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. BUS ROUTES TAB */}
        {activeTab === 'routes' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-950">Bus Routes & Sample Fares</h3>
              <p className="text-xs text-gray-500">
                Manage intercity routes, durations, bus classifications and published starting fares.
              </p>
            </div>

            <div className="space-y-4">
              {routes.map((rt) => (
                <div
                  key={rt.id}
                  className="p-5 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-base font-bold text-gray-900">
                      {rt.sourceCity} to {rt.destinationCity}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {rt.category} • {rt.duration} • {rt.dailyFrequency}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 uppercase block">Starting Fare</span>
                      <strong className="text-base text-gray-900">₹{rt.startingFare}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs max-w-2xl">
            <h3 className="text-lg font-bold text-gray-950 mb-1">Website Operations & Contact</h3>
            <p className="text-xs text-gray-500 mb-6">
              Configure business telephone, WhatsApp number, and address displayed on the public website.
            </p>

            <form onSubmit={handleSaveSettingsSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Official Helpline Phone
                </label>
                <input
                  type="text"
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                  className="w-full text-xs font-semibold border border-gray-200 rounded-xl p-2.5 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  WhatsApp Contact (without + or spaces, e.g. 919816023456)
                </label>
                <input
                  type="text"
                  value={siteSettings.whatsapp}
                  onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                  className="w-full text-xs font-semibold border border-gray-200 rounded-xl p-2.5 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full text-xs font-semibold border border-gray-200 rounded-xl p-2.5 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Office Address
                </label>
                <input
                  type="text"
                  value={siteSettings.address}
                  onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                  className="w-full text-xs font-semibold border border-gray-200 rounded-xl p-2.5 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-full text-xs shadow-md cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Package Edit/Add Modal */}
      {showPackageModal && editingPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-950 mb-4">Edit Tour Package</h3>

            <form onSubmit={handleSavePackageSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingPackage.title}
                  onChange={(e) =>
                    setEditingPackage({ ...editingPackage, title: e.target.value })
                  }
                  className="w-full text-xs border border-gray-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Destination</label>
                <input
                  type="text"
                  value={editingPackage.destination}
                  onChange={(e) =>
                    setEditingPackage({ ...editingPackage, destination: e.target.value })
                  }
                  className="w-full text-xs border border-gray-200 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingPackage.duration}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, duration: e.target.value })
                    }
                    className="w-full text-xs border border-gray-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editingPackage.startingPrice}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        startingPrice: Number(e.target.value),
                      })
                    }
                    className="w-full text-xs border border-gray-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Subtitle</label>
                <textarea
                  rows={2}
                  value={editingPackage.subtitle}
                  onChange={(e) =>
                    setEditingPackage({ ...editingPackage, subtitle: e.target.value })
                  }
                  className="w-full text-xs border border-gray-200 rounded-xl p-2"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPackageModal(false)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded-full cursor-pointer shadow-md"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
