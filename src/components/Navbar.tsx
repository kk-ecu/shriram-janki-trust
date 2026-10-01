import React, { useState, useRef, useEffect } from 'react';
import {
  Flame,
  Clock,
  Phone,
  Sparkles,
  Menu,
  X,
  Volume2,
  VolumeX,
  ShieldCheck,
  Server,
  Sliders,
  ChevronDown,
  Heart,
  Landmark,
} from 'lucide-react';
import { TEMPLE_INFO } from '../data/mockData';
import { MenuSettings, NavItemConfig, NavTabId } from '../types';
import { getDonationSettings, DonationModuleSettings } from '../data/donationSettings';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openDonateModal: (campaignId?: string, tierAmount?: number) => void;
  openDeployGuide: () => void;
  menuSettings: MenuSettings;
  openMenuManager: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openDonateModal,
  openDeployGuide,
  menuSettings,
  openMenuManager,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingChant, setIsPlayingChant] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [donationSettings, setDonationSettings] = useState<DonationModuleSettings>(getDonationSettings());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<DonationModuleSettings>;
      if (custom.detail) setDonationSettings(custom.detail);
    };
    window.addEventListener('srjm_donation_settings_changed', handler);
    return () => window.removeEventListener('srjm_donation_settings_changed', handler);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Play peaceful temple gong / chime synthesizer sound safely with Web Audio API
  const toggleTempleChime = () => {
    try {
      const AudioContext =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      // Base tanpura / gong drone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(136.1, now); // Sacred Om frequency (136.1 Hz)

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(272.2, now); // Harmonics

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 4.6);
      osc2.stop(now + 4.6);

      setIsPlayingChant(true);
      setTimeout(() => setIsPlayingChant(false), 4500);
    } catch {
      // Audio not supported in restricted context
    }
  };

  // Filter enabled items
  const enabledItems = menuSettings.items.filter((item) => item.enabled);

  // Layout balance logic:
  // If <= 5 items enabled, show all directly in desktop bar.
  // If > 5 items enabled, display the first 4-5 and group the rest in "More"
  const maxDirectItems = 5;
  const directItems = enabledItems.length > maxDirectItems ? enabledItems.slice(0, maxDirectItems - 1) : enabledItems;
  const overflowItems = enabledItems.length > maxDirectItems ? enabledItems.slice(maxDirectItems - 1) : [];

  const handleNavClick = (item: NavItemConfig) => {
    if (item.isAction || item.id === 'donate') {
      openDonateModal();
    } else {
      setCurrentTab(item.id);
    }
    setMoreDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white border-b border-amber-200/80">
      {/* Top sacred announcement bar */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="text-amber-200 font-serif">ॐ श्री गणेशाय नमः</span>
            <span className="hidden md:inline text-amber-300/60">•</span>
            <span className="hidden md:inline">सियावर रामचंद्र की जय</span>
            <span className="hidden lg:inline text-amber-300/60">•</span>
            <span className="hidden lg:inline text-amber-100/90 font-light">
              Darshan: {TEMPLE_INFO.darshanTimings.morning} &amp; {TEMPLE_INFO.darshanTimings.evening}
            </span>
          </div>

          <div className="flex items-center gap-3 text-amber-100">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>
                Next Aarti: <strong className="text-white">Sandhya 7:00 PM</strong>
              </span>
            </div>

            <button
              onClick={toggleTempleChime}
              title="Sacred Mandir Chime / Om Frequency"
              className="flex items-center gap-1 bg-amber-900/50 hover:bg-amber-900/80 px-2 py-0.5 rounded text-[11px] text-amber-200 transition"
            >
              {isPlayingChant ? (
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span>{isPlayingChant ? 'Shanti Om...' : 'Temple Chime'}</span>
            </button>

            {/* Menu Manager Quick Launcher */}
            <button
              onClick={openMenuManager}
              title="Configure Menu & Launch Phases"
              className="flex items-center gap-1 bg-amber-950/60 hover:bg-amber-950 px-2.5 py-0.5 rounded-full text-[11px] text-amber-200 border border-amber-400/40 transition hover:border-amber-300"
            >
              <Sliders className="w-3 h-3 text-amber-300" />
              <span className="hidden sm:inline">
                {menuSettings.phase === 'phase1' ? 'Phase 1 Active' : 'Menu Config'}
              </span>
            </button>

            <button
              onClick={openDeployGuide}
              className="hidden xl:flex items-center gap-1 bg-amber-800/80 hover:bg-amber-900 px-2 py-0.5 rounded text-[11px] font-semibold text-amber-100 border border-amber-400/30"
            >
              <Server className="w-3 h-3 text-emerald-300" />
              <span>Hostinger GitOps</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation container with mathematically balanced auto-centering */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Temple Branding - Shri Ram Janki Mandir */}
          <div
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-0.5 shadow-md flex items-center justify-center text-white shrink-0 overflow-hidden ring-2 ring-amber-300">
              <img
                src="/assets/images/lord_ram.jpg"
                alt="Bhagwan Shri Ram"
                className="w-full h-full object-cover object-top rounded-full hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-title font-extrabold text-lg sm:text-xl md:text-2xl text-stone-900 tracking-tight group-hover:text-amber-700 transition whitespace-nowrap">
                  SHRI RAM JANKI MANDIR
                </span>
                <span className="hidden 2xl:inline text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  ESTD {TEMPLE_INFO.established}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-800 font-medium tracking-wide">
                &amp; Charitable Trust • <span className="font-serif text-amber-950">श्री राम जानकी मंदिर</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav Links - Centered Segmented Container
              Designed with pristine symmetry:
              - When 2 items are active (Phase 1): looks like a balanced, prestigious dual switcher.
              - When 3-5 items: smoothly expands with equal optical weight.
              - When 6-8 items: neatly displays primary + "More" dropdown without wrapping or distorting.
          */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-4">
            <div className="inline-flex items-center bg-stone-100/90 p-1.5 rounded-full border border-amber-200/70 shadow-2xs backdrop-blur-xs">
              {directItems.map((link) => {
                const isPaymentAction = link.isAction || link.id === 'donate';
                const active = !isPaymentAction && currentTab === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link)}
                    className={`relative px-3.5 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isPaymentAction
                        ? 'text-amber-950 hover:bg-amber-200/80 bg-amber-100/90 font-bold border border-amber-300/80 ml-1 shadow-2xs'
                        : active
                        ? 'text-amber-950 bg-white shadow-xs font-bold border border-amber-200/80'
                        : 'text-stone-700 hover:text-amber-900 hover:bg-white/60'
                    }`}
                  >
                    {isPaymentAction && <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />}
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-amber-700 text-white font-extrabold px-1.5 py-0.2 rounded-full">
                        {link.badge}
                      </span>
                    )}
                    {link.isLive && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                      </span>
                    )}
                  </button>
                );
              })}

              {/* More Dropdown for additional enabled items */}
              {overflowItems.length > 0 && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all flex items-center gap-1 ${
                      overflowItems.some((it) => it.id === currentTab)
                        ? 'text-amber-950 bg-white shadow-xs font-bold border border-amber-200/80'
                        : 'text-stone-700 hover:text-amber-900 hover:bg-white/60'
                    }`}
                  >
                    <span>More</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {moreDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-amber-200 p-2 z-50 space-y-1 animate-in fade-in zoom-in-95">
                      {overflowItems.map((item) => {
                        const isPay = item.isAction || item.id === 'donate';
                        const active = !isPay && currentTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                              active
                                ? 'bg-amber-100 text-amber-950 font-bold'
                                : 'text-stone-700 hover:bg-amber-50 hover:text-amber-900'
                            }`}
                          >
                            <div className="flex flex-col">
                              <span>{item.label}</span>
                              <span className="text-[10px] font-serif text-amber-800/80">{item.hindi}</span>
                            </div>
                            {item.badge && (
                              <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Prominent Direct Payment Interlinking & Mobile Burger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Primary Payment Interlink Button */}
            <button
              onClick={() => openDonateModal()}
              className={`relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm text-white shadow-md hover:shadow-lg transition-all active:scale-95 ${
                donationSettings.isEnabled
                  ? 'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 hover:from-amber-700 hover:to-orange-600'
                  : 'bg-amber-800 hover:bg-amber-900'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-200 fill-amber-200 animate-pulse" />
              <span>{donationSettings.isEnabled ? 'Offer Seva' : 'Offer Seva'}</span>
              <span className={`hidden sm:inline text-[10px] px-1.5 py-0.5 rounded font-medium ${
                donationSettings.isEnabled ? 'bg-white/20 text-amber-50' : 'bg-amber-950/70 text-amber-200'
              }`}>
                {donationSettings.isEnabled ? '80G Tax Free' : 'A/C Setup'}
              </span>
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 border border-stone-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu - Adapts strictly to enabled items */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-amber-50/98 border-b border-amber-200 px-4 pt-3 pb-6 space-y-3 backdrop-blur-md">
          {/* Phase status indicator in drawer */}
          <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 text-xs">
            <span className="text-amber-900 font-bold font-serif">
              {menuSettings.phase === 'phase1' ? 'Phase-1: Home & About' : 'Navigation Menu'}
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openMenuManager();
              }}
              className="text-[11px] text-amber-800 font-semibold underline flex items-center gap-1"
            >
              <Sliders className="w-3 h-3" />
              <span>Menu Options</span>
            </button>
          </div>

          <div
            className={`grid gap-2 ${
              enabledItems.length <= 2 ? 'grid-cols-1' : 'grid-cols-2'
            }`}
          >
            {enabledItems.map((link) => {
              const isPay = link.isAction || link.id === 'donate';
              const active = !isPay && currentTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => {
                    handleNavClick(link);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 text-left rounded-xl text-xs sm:text-sm font-semibold border transition ${
                    isPay
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-700 shadow-sm'
                      : active
                      ? 'bg-amber-700 text-white border-amber-800 font-bold shadow-xs'
                      : 'bg-white text-stone-800 hover:bg-amber-100 border-amber-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-white/25 text-inherit px-1.5 py-0.5 rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isPay || active ? 'text-amber-100' : 'text-stone-500 font-serif'}`}>
                    {link.hindi}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-amber-200/60">
            <button
              onClick={() => {
                openDonateModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl shadow-xs"
            >
              <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
              <span>Direct Seva Payment (UPI / 80G Receipt)</span>
            </button>

            <button
              onClick={() => {
                openDeployGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold bg-white hover:bg-stone-100 text-stone-700 rounded-xl border border-stone-200"
            >
              <Server className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hostinger &amp; DuckDB/Postgres GitOps</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
