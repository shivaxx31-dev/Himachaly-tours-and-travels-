import React, { useState } from 'react';
import { PageType } from '../types';
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { submitEnquiry } from '../services/firestoreService';
import { DEFAULT_SITE_SETTINGS } from '../data/defaultData';
import { shimlaHero } from '../assets/images';
import { motion } from 'motion/react';

interface ContactPageProps {
  onNavigate: (page: PageType, param?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('Shimla');
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(2);
  const [serviceRequired, setServiceRequired] = useState('Daily Bus Tickets');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name and contact phone number.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const refId = await submitEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        destination,
        travelDate,
        passengers,
        serviceRequired,
        message: message.trim() || undefined,
      });

      setSubmittedId(refId);
    } catch {
      setErrorMsg('Failed to submit enquiry. Please reach our desk on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello Himachaly Tours! I am ${name || 'a traveller'} reaching out regarding ${serviceRequired} to ${destination} on ${travelDate} for ${passengers} passenger(s). Contact: ${phone || 'N/A'}.`
    );
    window.open(`https://wa.me/${DEFAULT_SITE_SETTINGS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-gray-50 min-h-screen py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6">
          <button onClick={() => onNavigate('home')} className="hover:text-gray-900 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Contact & Support</span>
        </div>

        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 block mb-1">
            24/7 Mountain Helpdesk
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight">
            Contact Himachaly Tours
          </h1>
          <p className="text-sm text-gray-600 mt-2 max-w-2xl leading-relaxed">
            Have questions about coach boarding points in Delhi, road conditions in Manali, or want a custom holiday quote? Reach our Shimla operations center directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Cards & Map Placeholder (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/90 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-950">
                Operating Offices & Helpline
              </h3>

              <div className="space-y-4 text-xs">
                {/* Office Address */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block text-xs">Headquarters & Booking Desk</strong>
                    <p className="text-gray-600 mt-0.5 leading-relaxed">
                      {DEFAULT_SITE_SETTINGS.address}
                    </p>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      Landmark: Next to Victory Tunnel lift, 2 mins from Shimla Mall Road
                    </span>
                  </div>
                </div>

                {/* Phone Call */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block text-xs">Phone Reservations</strong>
                    <a
                      href={`tel:${DEFAULT_SITE_SETTINGS.phone}`}
                      className="text-blue-900 font-bold hover:underline block mt-0.5 text-sm"
                    >
                      {DEFAULT_SITE_SETTINGS.phone}
                    </a>
                    <span className="text-[10px] text-gray-400">24/7 Mountain Road Assistance</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block text-xs">WhatsApp Direct Chat</strong>
                    <a
                      href={`https://wa.me/${DEFAULT_SITE_SETTINGS.whatsapp}?text=Hello%20Himachaly%20Tours`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-700 font-bold hover:underline block mt-0.5"
                    >
                      +{DEFAULT_SITE_SETTINGS.whatsapp}
                    </a>
                    <span className="text-[10px] text-gray-400">Typical response under 5 minutes</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block text-xs">Official Email</strong>
                    <a
                      href={`mailto:${DEFAULT_SITE_SETTINGS.email}`}
                      className="text-blue-900 font-medium hover:underline block mt-0.5"
                    >
                      {DEFAULT_SITE_SETTINGS.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 text-gray-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block text-xs">Desk Timings</strong>
                    <p className="text-gray-600 mt-0.5">8:00 AM – 10:00 PM IST (Mon – Sun)</p>
                    <span className="text-[10px] text-gray-400">Emergency driver hotline remains active 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Location Card Placeholder */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-gray-900">Shimla Operating Hub</span>
                <span className="text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  Open Today
                </span>
              </div>
              <div className="h-44 w-full rounded-2xl bg-slate-100 border border-slate-200 relative flex items-center justify-center overflow-hidden">
                <img
                  src={shimlaHero}
                  alt="Shimla Victory Tunnel View"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-2xs flex flex-col items-center justify-center text-white text-center p-4">
                  <MapPin className="w-7 h-7 text-red-500 fill-red-500 mb-1 drop-shadow-md" />
                  <span className="text-xs font-bold">The Mall Road & Victory Tunnel</span>
                  <span className="text-[10px] text-white/80">Shimla, Himachal Pradesh 171001</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry & Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-sm">
            {submittedId ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Enquiry Received!</h3>
                <p className="text-xs font-mono text-gray-400 mt-1">Ref ID: #{submittedId}</p>
                <p className="text-sm text-gray-600 mt-4 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-gray-900">{name}</strong>. Our travel desk in Shimla has saved your enquiry for{' '}
                  <strong>{destination}</strong>. A travel consultant will contact you via phone or WhatsApp at{' '}
                  <strong>{phone}</strong> shortly.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={handleWhatsAppSend}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-6 py-3 rounded-full flex items-center space-x-2 cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSubmittedId(null)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-6 py-3 rounded-full cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-gray-100 pb-4 mb-2">
                  <h3 className="text-xl font-bold text-gray-950">
                    Send Us an Enquiry
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Fill out this form to check bus availability, reserve family tour slots or request custom quotes.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98160 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Service Required
                    </label>
                    <select
                      value={serviceRequired}
                      onChange={(e) => setServiceRequired(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900 bg-white cursor-pointer"
                    >
                      <option value="Daily Bus Tickets">Daily Bus Tickets (Volvo/Sleeper)</option>
                      <option value="Holiday Tour Package">Holiday Tour Package</option>
                      <option value="Family Private Coach">Private Coach / Tempo Charter</option>
                      <option value="Hotel & Sightseeing Assistance">Hotel & Sightseeing Assistance</option>
                      <option value="Corporate / Group Tour">Corporate / Group Tour</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Travel Destination
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900 bg-white cursor-pointer"
                    >
                      <option value="Shimla">Shimla & Kufri</option>
                      <option value="Manali">Manali & Solang</option>
                      <option value="Shimla & Manali">Shimla–Manali Combined</option>
                      <option value="Dharamshala">Dharamshala & McLeod Ganj</option>
                      <option value="Spiti Valley">Spiti Valley</option>
                      <option value="Dalhousie">Dalhousie & Khajjiar</option>
                      <option value="Kasol">Kasol & Parvati Valley</option>
                      <option value="Other Himachal">Other Himachal Destination</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full text-xs font-semibold border border-gray-200 rounded-xl px-2.5 py-2.5 focus:outline-hidden focus:border-blue-900 bg-white cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Passengers
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={60}
                        value={passengers}
                        onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full text-xs font-semibold border border-gray-200 rounded-xl px-2.5 py-2.5 focus:outline-hidden focus:border-blue-900"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Message or Special Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your trip (e.g. need luxury Volvo seats, hotel pickup, special assistance for elders)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900 resize-none"
                  />
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-black hover:bg-gray-800 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-full text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {submitting ? (
                      <span>Saving Enquiry...</span>
                    ) : (
                      <>
                        <span>Submit Booking Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-6 rounded-full text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Desk</span>
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
