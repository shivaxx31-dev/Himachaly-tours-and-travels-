import React, { useEffect } from 'react';
import { Booking } from '../types';
import { CheckCircle, Printer, MessageSquare, X, Bus, MapPin, Calendar, Users, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEFAULT_SITE_SETTINGS } from '../data/defaultData';
import { motion } from 'motion/react';

interface BookingConfirmationModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
}) => {
  useEffect(() => {
    if (booking) {
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback gracefully if canvas-confetti is not loaded
      }
    }
  }, [booking]);

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Booking Confirmed! Reference: #${booking.id} | Himachaly Tours | ${booking.routeTitle || booking.packageTitle} | Date: ${booking.travelDate} | Seats: ${booking.selectedSeats} | Passenger: ${booking.passengerName}`
    );
    window.open(`https://wa.me/${DEFAULT_SITE_SETTINGS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Voucher Top Banner */}
        <div className="bg-[#104374] text-white p-6 sm:p-7 text-center relative overflow-hidden">
          <div className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-8 h-8 text-green-300" />
          </div>
          <span className="text-[11px] uppercase tracking-widest font-semibold text-blue-200">
            Booking Confirmed & Reserved
          </span>
          <h3 className="text-2xl font-black tracking-tight mt-0.5">
            Himachaly Travel Pass
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            Reference #{booking.id}
          </p>
        </div>

        {/* Ticket Body / Printable Section */}
        <div className="p-6 sm:p-7 space-y-5 print:p-0">
          {/* Route or Package Details */}
          <div className="border border-dashed border-gray-300 rounded-2xl p-4 bg-gray-50/70">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Bus className="w-4 h-4 text-blue-900" />
                <span className="text-sm font-bold text-gray-900">
                  {booking.routeTitle || booking.packageTitle}
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider">
                Confirmed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Journey Date</span>
                <span className="font-semibold text-gray-800 flex items-center space-x-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>{booking.travelDate}</span>
                </span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Seats Allocated</span>
                <span className="font-bold text-blue-900 flex items-center space-x-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-blue-900" />
                  <span>Seat {booking.selectedSeats}</span>
                </span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Boarding Point</span>
                <span className="font-semibold text-gray-800 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="truncate">{booking.boardingPoint || 'Kashmiri Gate ISBT'}</span>
                </span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Dropping Point</span>
                <span className="font-semibold text-gray-800 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="truncate">{booking.droppingPoint || 'Shimla ISBT'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Passenger & Fare Info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Lead Passenger</span>
              <span className="font-bold text-gray-900 text-sm mt-0.5 block">{booking.passengerName}</span>
              <span className="text-gray-500 text-[11px]">{booking.passengerPhone}</span>
            </div>

            <div className="text-right">
              <span className="text-gray-400 block text-[10px] uppercase">Total Payable</span>
              <span className="font-extrabold text-gray-900 text-xl mt-0.5 block">
                ₹{booking.totalFare}
              </span>
              <span className="text-[10px] text-green-700 font-medium">Pay on Boarding / Cash / UPI</span>
            </div>
          </div>

          {/* Mock Boarding QR / Barcode aesthetic */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-500">
              <QrCode className="w-8 h-8 text-gray-700" />
              <div className="text-[10px] leading-tight text-gray-500">
                <span>Scan for Himachal Barrier Clearance</span>
                <br />
                <span className="font-mono text-gray-400">#PASS-{booking.id.toUpperCase()}</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-400 text-right">
              Himachaly Tours & Travels
              <br />24/7 Helpline: {DEFAULT_SITE_SETTINGS.phone}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handlePrint}
              className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-full text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save E-Ticket</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handleWhatsAppShare}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-full text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Copy</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
