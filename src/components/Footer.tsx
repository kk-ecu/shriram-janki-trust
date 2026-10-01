import React from 'react';
import {
  Flame,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Building,
  Heart,
  Server,
  ArrowUp,
  Sliders,
} from 'lucide-react';
import { TEMPLE_INFO } from '../data/mockData';
import { MenuSettings } from '../types';
import { getDonationSettings, DonationModuleSettings } from '../data/donationSettings';

interface FooterProps {
  onNavigate: (tab: string) => void;
  openDonateModal: (campaignId?: string, tierAmount?: number) => void;
  openDeployGuide: () => void;
  menuSettings?: MenuSettings;
  openMenuManager?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  openDonateModal,
  openDeployGuide,
  menuSettings,
  openMenuManager,
}) => {
  const [donationSettings, setDonationSettings] = React.useState<DonationModuleSettings>(getDonationSettings());

  React.useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<DonationModuleSettings>;
      if (custom.detail) setDonationSettings(custom.detail);
    };
    window.addEventListener('srjm_donation_settings_changed', handler);
    return () => window.removeEventListener('srjm_donation_settings_changed', handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enabledItems = menuSettings ? menuSettings.items.filter((it) => it.enabled) : [];
  const isDonationActive = donationSettings.isEnabled;

  return (
    <footer className="bg-stone-950 text-stone-300 border-t-4 border-amber-600">
      {/* Upper Bank Transfer & Tax Exemption Box */}
      <div className="bg-stone-900 border-b border-stone-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bank Transfer Details */}
          <div className="bg-stone-950/60 p-5 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Building className="w-4 h-4" />
              <span>
                {isDonationActive
                  ? 'Direct Bank Seva Transfer (NEFT / RTGS)'
                  : 'Trust Bank Account: Under Creation'}
              </span>
            </div>
            {isDonationActive ? (
              <div className="text-xs space-y-1 text-stone-300 font-mono">
                <div>Bank: <strong className="text-white">{TEMPLE_INFO.bankDetails.bankName}</strong></div>
                <div>Account Name: <span className="text-stone-300">{TEMPLE_INFO.bankDetails.accountName}</span></div>
                <div>A/C Number: <strong className="text-amber-300">{TEMPLE_INFO.bankDetails.accountNumber}</strong></div>
                <div>IFSC Code: <strong className="text-amber-300">{TEMPLE_INFO.bankDetails.ifsc}</strong></div>
                <div>UPI ID: <strong className="text-emerald-400">{TEMPLE_INFO.bankDetails.upiId}</strong></div>
              </div>
            ) : (
              <div className="text-xs space-y-1 text-stone-300">
                <p className="text-amber-200/90 font-medium">
                  Official trust account registration underway at State Bank of India.
                </p>
                <div className="text-[11px] text-stone-400 mt-1">
                  Account Name: <strong>Shri Ram Janki Mandir &amp; Charitable Trust</strong>
                </div>
                <div className="text-[10px] text-amber-400/90 pt-1">
                  Online payments will activate upon bank signatory verification.
                </div>
              </div>
            )}
          </div>

          {/* Tax Exemption (80G) */}
          <div className="bg-stone-950/60 p-5 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Section 80G Tax Exemption (Form 10BE)</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Donations to Shri Ram Janki Mandir &amp; Charitable Trust are 50% exempt from income tax under Section 80G(5)(vi) of the Income Tax Act, 1961.
            </p>
            <div className="text-[11px] text-amber-200">
              URN: <span className="font-mono font-bold">{TEMPLE_INFO.taxExemption80GNumber}</span>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="bg-stone-950/60 p-5 rounded-xl border border-stone-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                {isDonationActive ? 'Support Nitya Annadanam' : 'Nitya Seva Sankalpam'}
              </span>
              <p className="text-xs text-stone-400 mt-1">
                {isDonationActive
                  ? 'Feed 100 devotees with sanctified prasad today.'
                  : 'Register your sacred seva pledge to support temple prasad.'}
              </p>
            </div>
            <button
              onClick={() => openDonateModal(undefined, 1100)}
              className="w-full mt-3 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
              <span>{isDonationActive ? 'Offer Seva Payment (₹1,100)' : 'Register Seva Pledge / View Status'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Temple info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🛕</span>
              <div>
                <h3 className="font-serif-title font-bold text-base sm:text-lg text-white">
                  SHRI RAM JANKI MANDIR
                </h3>
                <p className="text-xs text-amber-400">&amp; Charitable Trust</p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Dedicated to Sanatana Dharma, daily Annadanam, Vedic ritual heritage, and communal harmony since {TEMPLE_INFO.established}.
            </p>
            <div className="text-xs text-stone-500 space-y-0.5 font-mono">
              <div>Trust Reg: {TEMPLE_INFO.trustRegistrationNumber}</div>
              <div>PAN: {TEMPLE_INFO.panNumber}</div>
            </div>
          </div>

          {/* Col 2: Navigation - Strictly synced with Menu Configuration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold font-serif-title text-amber-300 uppercase tracking-wider">
                Sacred Navigation
              </h4>
              {openMenuManager && (
                <button
                  onClick={openMenuManager}
                  className="text-[10px] text-stone-400 hover:text-amber-300 flex items-center gap-1 border border-stone-700 px-1.5 py-0.5 rounded"
                >
                  <Sliders className="w-3 h-3" />
                  <span>Config</span>
                </button>
              )}
            </div>

            <ul className="space-y-2 text-xs">
              {/* Always show active menu links */}
              {enabledItems.length > 0 ? (
                enabledItems.map((item) => {
                  const isPay = item.isAction || item.id === 'donate';
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => (isPay ? openDonateModal() : onNavigate(item.id))}
                        className="hover:text-amber-400 transition text-left flex items-center gap-1.5"
                      >
                        {isPay && <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />}
                        <span>{item.label}</span>
                        <span className="text-[10px] text-stone-500 font-serif">({item.hindi})</span>
                      </button>
                    </li>
                  );
                })
              ) : (
                <>
                  <li>
                    <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition">
                      Home (मुख्य पृष्ठ)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition">
                      About &amp; Aarti (परिचय एवं आरती)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => openDonateModal()} className="hover:text-amber-400 transition text-amber-300">
                      Offer Seva / Pay (दान एवं सेवा)
                    </button>
                  </li>
                </>
              )}

              {/* Direct payment interlink link */}
              <li className="pt-1 border-t border-stone-800">
                <button
                  onClick={() => openDonateModal()}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition flex items-center gap-1"
                >
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Instant 80G Seva Payment</span>
                </button>
              </li>

              {/* Trust Admin Link */}
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-stone-500 hover:text-stone-300 transition text-[11px]"
                >
                  Trust Admin Console &amp; Audit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Darshan & Aarti */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif-title text-amber-300 uppercase tracking-wider">
              Darshan &amp; Aarti
            </h4>
            <div className="text-xs space-y-2 text-stone-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Morning Darshan:</div>
                  <div className="text-stone-400">{TEMPLE_INFO.darshanTimings.morning}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Evening Darshan:</div>
                  <div className="text-stone-400">{TEMPLE_INFO.darshanTimings.evening}</div>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-amber-200/80 border-t border-stone-800">
                Mangala 6:00 AM • Sandhya 7:00 PM • Shayan 9:15 PM
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif-title text-amber-300 uppercase tracking-wider">
              Contact &amp; Location
            </h4>
            <div className="text-xs space-y-2 text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{TEMPLE_INFO.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{TEMPLE_INFO.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{TEMPLE_INFO.contact.email}</span>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={openDeployGuide}
                  className="w-full text-left py-2 px-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg text-[11px] text-emerald-400 flex items-center gap-2 transition"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Hostinger &amp; DuckDB/Postgres GitOps</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} {TEMPLE_INFO.name}. All rights reserved under Sanatana Dharma.</p>
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-serif">ॐ श्री सीतारामचन्द्राभ्यां नमः</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
