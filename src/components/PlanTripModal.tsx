import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import { submitEnquiry } from '../services/firestoreService';
import { DEFAULT_SITE_SETTINGS } from '../data/defaultData';
import { motion, AnimatePresence } from 'motion/react';

interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  defaultService?: string;
}

export const PlanTripModal: React.FC<PlanTripModalProps> = ({
  isOpen,
  onClose,
  defaultDestination = 'Shimla',
  defaultService = 'Tour Package',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState(defaultDestination);
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(2);
  const [serviceRequired, setServiceRequired] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
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

      setSubmittedRef(refId);
    } catch {
      setErrorMsg('Could not submit enquiry. Please try reaching us directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Himachaly Tours! I am interested in planning a trip to ${destination} on ${travelDate} for ${passengers} passenger(s). Service: ${serviceRequired}. Name: ${name || 'Traveller'}.`
    );
    window.open(`https://wa.me/${DEFAULT_SITE_SETTINGS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-gray-100 relative"
      >
        {/* Header */}
        <div className="bg-[#104374] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs uppercase tracking-widest font-semibold text-blue-200 block mb-1">
            Himachaly Travel Concierge
          </span>
          <h3 className="text-2xl font-bold tracking-tight">Plan Your Himachal Journey</h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Share your travel preferences. Our Shimla tour specialists will respond with custom pricing & options within 15 minutes.
          </p>
        </div>

        {submittedRef ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Enquiry Received!</h4>
            <p className="text-xs text-gray-500 mt-1 font-mono">Reference ID: #{submittedRef}</p>
            <p className="text-sm text-gray-600 mt-3 max-w-md mx-auto">
              Thank you, <strong className="text-gray-900">{name}</strong>. Our travel desk in Shimla has received your request for{' '}
              <strong>{destination}</strong>. We will call you at <strong>{phone}</strong> shortly.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleWhatsAppDirect}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-full text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Now on WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setSubmittedRef(null);
                  onClose();
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-5 py-2.5 rounded-full text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98160 XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Destination
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
                  <option value="Spiti Valley">Spiti Valley Expedition</option>
                  <option value="Dalhousie">Dalhousie & Khajjiar</option>
                  <option value="Kasol">Kasol & Parvati Valley</option>
                  <option value="Custom Himachal">Custom Himachal Circuit</option>
                </select>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Service Required
                </label>
                <select
                  value={serviceRequired}
                  onChange={(e) => setServiceRequired(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900 bg-white cursor-pointer"
                >
                  <option value="Tour Package">Curated Holiday Tour Package</option>
                  <option value="Bus Booking">Volvo / Luxury Bus Tickets</option>
                  <option value="Family Private Coach">Private Tempo / Coach Charter</option>
                  <option value="Honeymoon Special">Honeymoon Mountain Special</option>
                  <option value="Corporate / Group">Corporate / College Group</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Travel Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900 bg-white cursor-pointer"
                />
              </div>

              {/* Number of Passengers */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Travellers Count
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900"
                />
              </div>
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address <span className="text-gray-400 font-normal">(Optional for quote PDF)</span>
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900"
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Special Requests or Hotel Preferences
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need hotel with mountain view, pickup from Delhi Kashmiri gate, snow gear advice..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2 focus:outline-hidden focus:border-blue-900 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-full text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Travel Enquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 font-semibold py-3 px-5 rounded-full text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};
