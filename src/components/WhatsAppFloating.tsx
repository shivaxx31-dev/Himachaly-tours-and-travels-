import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { DEFAULT_SITE_SETTINGS } from '../data/defaultData';

interface WhatsAppFloatingProps {
  whatsappNumber?: string;
  defaultDestination?: string;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({
  whatsappNumber = DEFAULT_SITE_SETTINGS.whatsapp,
  defaultDestination = 'Shimla',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (msgText?: string) => {
    const textToSend =
      msgText ||
      customMsg.trim() ||
      `Hello Himachaly Tours! I would like to enquire about bus tickets & tour packages for ${defaultDestination}.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const quickPrompts = [
    `Delhi to Shimla Volvo seats for this weekend?`,
    `Custom family package quote for Shimla & Manali.`,
    `Chandigarh to Manali AC Sleeper timings today?`,
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-scaleUp text-gray-900">
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                HT
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Himachaly Tours Helpdesk</h4>
                <p className="text-[11px] text-white/90">Online • Typically replies in 5m</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-[#e5ddd5]/30">
            <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-2xs text-xs text-gray-800 leading-relaxed border border-gray-100">
              Namaste! How can we assist your Himachal journey today?
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">
                Quick Enquiries:
              </span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendWhatsApp(prompt)}
                  className="w-full text-left text-xs bg-white hover:bg-green-50 hover:text-green-800 p-2 rounded-xl border border-gray-200 transition-colors cursor-pointer text-gray-700 block truncate"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="pt-1 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendWhatsApp()}
                className="flex-1 text-xs bg-white border border-gray-200 rounded-full px-3 py-2 focus:outline-hidden focus:border-green-600"
              />
              <button
                type="button"
                onClick={() => sendWhatsApp()}
                className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-green-600 text-white flex items-center justify-center cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-green-600 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer relative group"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        <MessageSquare className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};
