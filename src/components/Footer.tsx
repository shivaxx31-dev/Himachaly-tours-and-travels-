import React from 'react';
import { PageType } from '../types';
import { Mountain, Phone, Mail, MapPin, MessageSquare, Shield, ArrowUp } from 'lucide-react';
import { DEFAULT_SITE_SETTINGS } from '../data/defaultData';

interface FooterProps {
  onNavigate: (page: PageType, param?: string) => void;
  onOpenPlanTrip: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPlanTrip }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white/10 text-white">
                <Mountain className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <span className="block text-xl font-bold tracking-tight leading-none text-white">
                  Himachaly
                </span>
                <span className="text-[10px] uppercase tracking-widest font-medium text-white/60">
                  Tours and Travels
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Your trusted travel partner for comfortable daily Volvo bus services and curated holiday
              experiences across Shimla, Manali, Dharamshala, and scenic Himachal Pradesh.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-gray-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{DEFAULT_SITE_SETTINGS.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${DEFAULT_SITE_SETTINGS.phone}`} className="hover:text-white transition-colors">
                  {DEFAULT_SITE_SETTINGS.phone} (24/7 Helpline)
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${DEFAULT_SITE_SETTINGS.email}`} className="hover:text-white transition-colors">
                  {DEFAULT_SITE_SETTINGS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Popular Bus Routes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Daily Bus Routes
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('buses', 'delhi-shimla')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Delhi to Shimla Volvo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('buses', 'chandigarh-manali')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Chandigarh to Manali
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('buses', 'delhi-dharamshala')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Delhi to Dharamshala
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('buses', 'delhi-manali')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Delhi to Manali Sleeper
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('buses', 'chandigarh-shimla')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Chandigarh to Shimla
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('buses', 'delhi-kasol')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Delhi to Kasol Coach
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tour Packages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Tour Packages
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('packages', 'shimla-weekend-escape')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shimla Weekend Escape
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages', 'manali-adventure-tour')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Manali Adventure Tour
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages', 'shimla-manali-combined')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shimla–Manali Combined
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages', 'dharamshala-exploration')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Dharamshala Exploration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages', 'spiti-valley-expedition')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Spiti Valley Expedition
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages', 'complete-himachal-tour')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Complete Himachal Tour
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Quick Links & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Help
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Himachaly
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Himachal Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPlanTrip}
                  className="hover:text-white transition-colors cursor-pointer text-blue-400 font-semibold"
                >
                  Plan Custom Trip
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-gray-800">
              <span className="block text-[11px] text-gray-500 mb-1">Direct WhatsApp Help:</span>
              <a
                href={`https://wa.me/${DEFAULT_SITE_SETTINGS.whatsapp}?text=Hello%20Himachaly%20Tours`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-green-900/40 text-green-300 border border-green-800 text-xs font-medium hover:bg-green-800/60 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with Tour Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            © {new Date().getFullYear()} Himachaly Tours and Travels. All rights reserved. Registered Indian Tourist Vehicle & Package Operator.
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-gray-400">
              Sample operator fares displayed until live inventory dispatch.
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors cursor-pointer"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
