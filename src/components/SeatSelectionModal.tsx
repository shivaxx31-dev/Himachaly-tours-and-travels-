import React, { useState } from 'react';
import { BusSchedule, SeatInfo, Booking } from '../types';
import { X, Check, Disc, Armchair, Shield, Info, ArrowRight } from 'lucide-react';
import { submitBooking } from '../services/firestoreService';
import { motion, AnimatePresence } from 'motion/react';

interface SeatSelectionModalProps {
  bus: BusSchedule | null;
  journeyDate: string;
  sourceCity: string;
  destinationCity: string;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  bus,
  journeyDate,
  sourceCity,
  destinationCity,
  onClose,
  onBookingSuccess,
}) => {
  if (!bus) return null;

  // Generate 36-40 seats layout (10 rows, 2 on left, aisle, 2 on right)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengerName, setPassengerName] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [boardingPoint, setBoardingPoint] = useState(bus.departurePlace);
  const [droppingPoint, setDroppingPoint] = useState(bus.arrivalPlace);
  const [step, setStep] = useState<'seats' | 'passenger'>('seats');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fixed seeded unavailable seats for realistic display
  const bookedSeatNumbers = new Set(['1', '4', '8', '11', '12', '19', '20', '25', '26', '33']);

  const rows = 10;
  const seatLayout: { left: string[]; right: string[] }[] = [];

  for (let r = 1; r <= rows; r++) {
    const s1 = String((r - 1) * 4 + 1);
    const s2 = String((r - 1) * 4 + 2);
    const s3 = String((r - 1) * 4 + 3);
    const s4 = String((r - 1) * 4 + 4);
    seatLayout.push({
      left: [s1, s2],
      right: [s3, s4],
    });
  }

  const toggleSeat = (seatNo: string) => {
    if (bookedSeatNumbers.has(seatNo)) return;
    if (selectedSeats.includes(seatNo)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNo));
    } else {
      if (selectedSeats.length >= 6) {
        alert('Maximum 6 seats per booking request.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatNo]);
    }
  };

  const totalFare = selectedSeats.length * bus.fare;

  const handleProceedToPassenger = () => {
    if (selectedSeats.length === 0) {
      setErrorMsg('Please select at least one seat to continue.');
      return;
    }
    setErrorMsg('');
    setStep('passenger');
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName.trim() || !passengerPhone.trim()) {
      setErrorMsg('Please enter primary passenger name and phone number.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const bookingData = {
        bookingType: 'bus' as const,
        busId: bus.id,
        routeTitle: `${sourceCity} to ${destinationCity}`,
        travelDate: journeyDate,
        selectedSeats: selectedSeats.sort((a, b) => Number(a) - Number(b)).join(', '),
        seatCount: selectedSeats.length,
        passengerName: passengerName.trim(),
        passengerEmail: passengerEmail.trim() || 'operator@himachalytours.com',
        passengerPhone: passengerPhone.trim(),
        boardingPoint,
        droppingPoint,
        totalFare,
        paymentStatus: 'pending_operator' as const,
      };

      const refId = await submitBooking(bookingData);

      const completeBooking: Booking = {
        ...bookingData,
        id: refId,
        bookingStatus: 'requested',
        createdAt: new Date().toISOString(),
      };

      onBookingSuccess(completeBooking);
    } catch {
      setErrorMsg('Failed to create booking request. Please contact helpline.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gray-950 text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {bus.busType}
              </span>
              <span className="text-xs text-white/60">
                Departure: <strong>{bus.departureTime}</strong> ({journeyDate})
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white mt-1">
              {bus.busName}
            </h3>
            <p className="text-xs text-white/70">
              {sourceCity} → {destinationCity} • {bus.duration}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Bar */}
        <div className="bg-amber-50 border-b border-amber-100 px-5 py-2 flex items-center space-x-2 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Demo seat allocation & instant operator reservation voucher. Real-time boarding pass will be dispatched to your phone.
          </span>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {step === 'seats' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Bus Coach Layout (Col 7) */}
              <div className="md:col-span-7 bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Front / Driver Cabin
                  </span>
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    <Disc className="w-4 h-4" />
                  </div>
                </div>

                {/* Seats Grid */}
                <div className="space-y-2.5">
                  {seatLayout.map((row, rIdx) => (
                    <div key={rIdx} className="flex items-center justify-between">
                      {/* Left Side (2 seats) */}
                      <div className="flex space-x-2">
                        {row.left.map((seatNo) => {
                          const isBooked = bookedSeatNumbers.has(seatNo);
                          const isSelected = selectedSeats.includes(seatNo);
                          return (
                            <button
                              key={seatNo}
                              type="button"
                              disabled={isBooked}
                              onClick={() => toggleSeat(seatNo)}
                              title={isBooked ? `Seat ${seatNo} Booked` : `Seat ${seatNo} - ₹${bus.fare}`}
                              className={`w-9 h-9 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                                isBooked
                                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                                  : isSelected
                                  ? 'bg-[#104374] text-white shadow-md scale-105 border-2 border-blue-900'
                                  : 'bg-white hover:bg-blue-50 text-gray-800 border border-gray-300 shadow-2xs'
                              }`}
                            >
                              <Armchair className="w-3.5 h-3.5" />
                              <span className="text-[9px] leading-none mt-0.5">{seatNo}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Aisle */}
                      <span className="text-[10px] text-gray-300 font-mono tracking-widest">
                        •••
                      </span>

                      {/* Right Side (2 seats) */}
                      <div className="flex space-x-2">
                        {row.right.map((seatNo) => {
                          const isBooked = bookedSeatNumbers.has(seatNo);
                          const isSelected = selectedSeats.includes(seatNo);
                          return (
                            <button
                              key={seatNo}
                              type="button"
                              disabled={isBooked}
                              onClick={() => toggleSeat(seatNo)}
                              title={isBooked ? `Seat ${seatNo} Booked` : `Seat ${seatNo} - ₹${bus.fare}`}
                              className={`w-9 h-9 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                                isBooked
                                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                                  : isSelected
                                  ? 'bg-[#104374] text-white shadow-md scale-105 border-2 border-blue-900'
                                  : 'bg-white hover:bg-blue-50 text-gray-800 border border-gray-300 shadow-2xs'
                              }`}
                            >
                              <Armchair className="w-3.5 h-3.5" />
                              <span className="text-[9px] leading-none mt-0.5">{seatNo}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seat Legend */}
                <div className="mt-5 pt-3 border-t border-gray-200 flex flex-wrap items-center justify-around text-[11px] text-gray-600 gap-2">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3.5 h-3.5 rounded-sm bg-white border border-gray-300" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3.5 h-3.5 rounded-sm bg-[#104374]" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3.5 h-3.5 rounded-sm bg-gray-200 border border-gray-300" />
                    <span>Booked</span>
                  </div>
                </div>
              </div>

              {/* Selection Summary (Col 5) */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Boarding & Dropping Points
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-gray-600 font-medium mb-1">
                        Boarding Point:
                      </label>
                      <input
                        type="text"
                        value={boardingPoint}
                        onChange={(e) => setBoardingPoint(e.target.value)}
                        className="w-full text-xs font-semibold bg-white border border-gray-200 rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-600 font-medium mb-1">
                        Dropping Point:
                      </label>
                      <input
                        type="text"
                        value={droppingPoint}
                        onChange={(e) => setDroppingPoint(e.target.value)}
                        className="w-full text-xs font-semibold bg-white border border-gray-200 rounded-lg p-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Booking Fare Breakdown
                  </h4>
                  <div className="space-y-1.5 text-xs text-gray-700">
                    <div className="flex justify-between">
                      <span>Seats Selected:</span>
                      <strong className="text-gray-900">
                        {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Base Fare ({selectedSeats.length} × ₹{bus.fare}):</span>
                      <span>₹{totalFare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Himachal Green Tax & Tolls:</span>
                      <span className="text-green-700 font-medium">Included</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-bold text-gray-950">
                      <span>Total Amount:</span>
                      <span className="text-blue-900 text-base">₹{totalFare}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleProceedToPassenger}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-black hover:bg-gray-800 disabled:opacity-40 text-white font-semibold py-3.5 px-6 rounded-full text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Continue to Passenger Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} className="max-w-xl mx-auto space-y-4">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-4 text-xs text-blue-950 flex justify-between items-center">
                <div>
                  <span className="font-bold">Seats: {selectedSeats.join(', ')}</span>
                  <span className="mx-2">•</span>
                  <span>Total: ₹{totalFare}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('seats')}
                  className="text-blue-800 underline font-semibold cursor-pointer"
                >
                  Change Seats
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Primary Passenger Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mohit Verma"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98160 XXXXX"
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900"
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">
                    SMS & WhatsApp ticket will be dispatched here.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={passengerEmail}
                    onChange={(e) => setPassengerEmail(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 mb-4 flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600 shrink-0" />
                  <span>
                    Payment Mode: <strong>Operator Settlement (Pay on Boarding / UPI confirmation)</strong>.
                  </span>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setStep('seats')}
                    className="px-5 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-100 cursor-pointer"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-black hover:bg-gray-800 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-full text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {submitting ? <span>Confirming...</span> : <span>Confirm Bus Reservation</span>}
                  </motion.button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
