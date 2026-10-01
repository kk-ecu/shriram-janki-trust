import React, { useState } from 'react';
import { Calendar, ShieldCheck, Flame, ArrowRight, Play, AlertCircle, Sparkles, Heart } from 'lucide-react';
import { TEMPLE_INFO } from '../data/mockData';
import { RamParivarHeroVisual, RAM_PARIVAR_IMAGES, LordRamDarshanLightbox } from './RamParivarArt';
import { DonationModuleSettings } from '../data/donationSettings';

interface HeroProps {
  onDonateClick: (amount?: number) => void;
  onExploreEvents: () => void;
  onExploreAarti: () => void;
  onExploreAbout?: () => void;
  onViewCampaigns: () => void;
  onWatchLive: () => void;
  isEventsEnabled?: boolean;
  isCampaignsEnabled?: boolean;
  donationSettings?: DonationModuleSettings;
}

export const Hero: React.FC<HeroProps> = ({
  onDonateClick,
  onExploreEvents,
  onExploreAarti,
  onExploreAbout,
  onViewCampaigns,
  onWatchLive,
  isEventsEnabled = true,
  isCampaignsEnabled = true,
  donationSettings,
}) => {
  const isDonationActive = donationSettings ? donationSettings.isEnabled : false;
  const [bgIntensity, setBgIntensity] = useState<'vivid' | 'warm' | 'subtle'>('warm');
  const [isDarshanOpen, setIsDarshanOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-orange-50/40 to-[#FFFDF9] pt-6 pb-12 border-b border-amber-200/80">
      {/* Consecrated Bhagwan Shri Ram Divine Background Picture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Lord Ram Background Portrait */}
        <div
          className={`absolute inset-0 bg-contain sm:bg-cover bg-center md:bg-right bg-no-repeat transition-all duration-700 ${
            bgIntensity === 'vivid'
              ? 'opacity-40 scale-100'
              : bgIntensity === 'warm'
              ? 'opacity-25 scale-100'
              : 'opacity-14 scale-98'
          }`}
          style={{
            backgroundImage: `url('${RAM_PARIVAR_IMAGES.lordRam}')`,
            filter: 'contrast(1.1) saturate(1.15)',
          }}
        />

        {/* Ambient Golden & Amber Temple Sunbeam Overlays for devotional warmth & text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/85 via-orange-50/70 to-[#FFFDF9]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300/35 via-transparent to-stone-900/10" />

        {/* Sun Halo radiating from upper center */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Lightbox Modal for Bhagwan Shri Ram Darshan */}
      <LordRamDarshanLightbox
        isOpen={isDarshanOpen}
        onClose={() => setIsDarshanOpen(false)}
        onExploreAbout={onExploreAbout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Bar: Sanskrit Inscription & Background Darshan Intensity Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 text-amber-950 border border-amber-300 px-4 py-1.5 rounded-full shadow-2xs">
            <span className="text-xs sm:text-sm font-semibold tracking-wide font-serif">
              ॐ श्री गणेशाय नमः • सियावर रामचंद्र की जय • ॐ नमो भगवते वासुदेवाय
            </span>
          </div>

          {/* Background Lord Ram Darshan Visibility Switch */}
          <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xs border border-amber-300/80 px-2.5 py-1 rounded-full text-xs shadow-2xs">
            <span className="text-[11px] font-bold text-amber-950 flex items-center gap-1">
              <span>🏹 प्रभु श्री राम Background:</span>
            </span>
            <button
              onClick={() => setBgIntensity('vivid')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold transition ${
                bgIntensity === 'vivid'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-amber-200/60'
              }`}
              title="High visibility Lord Ram background"
            >
              Vivid (40%)
            </button>
            <button
              onClick={() => setBgIntensity('warm')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold transition ${
                bgIntensity === 'warm'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-amber-200/60'
              }`}
              title="Warm devotional backdrop"
            >
              Warm (25%)
            </button>
            <button
              onClick={() => setBgIntensity('subtle')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold transition ${
                bgIntensity === 'subtle'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-amber-200/60'
              }`}
              title="Subtle backdrop"
            >
              Subtle (14%)
            </button>

            <button
              onClick={() => setIsDarshanOpen(true)}
              className="ml-1 bg-amber-700 hover:bg-amber-800 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-2xs flex items-center gap-1 transition"
              title="Open full high-resolution portrait of Bhagwan Shri Ram"
            >
              <span>👁️ Full Darshan</span>
            </button>
          </div>
        </div>

        {/* Grand Consecrated Ram Parivar Darbar Hero Visual */}
        <div className="mb-8">
          <RamParivarHeroVisual
            onWatchLive={onWatchLive}
            onExploreAboutRam={onExploreAbout || onExploreAarti}
          />
        </div>

        {/* Prominent Trust Bank Account Status Notice Banner (When Donation Module is Disabled) */}
        {!isDonationActive && (
          <div className="mb-8 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-dashed border-amber-400/80 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-200/80 text-amber-900 shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950 font-serif">
                      Trust Bank Account Status: Under Creation &amp; Verification
                    </span>
                    <span className="text-[10px] font-bold bg-amber-800 text-white px-2 py-0.5 rounded-full">
                      Module Inactive
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                    Online payments will be activated immediately once the official designated bank account in the name of <strong>Shri Ram Janki Mandir &amp; Charitable Trust</strong> is active. Devotees can register their <strong>Seva Sankalpam (Pledge)</strong> now.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDonateClick()}
                className="shrink-0 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                <span>Register Seva Pledge / View Details</span>
              </button>
            </div>
          </div>
        )}

        {/* Action CTAs and Quick Links */}
        <div className="bg-white/80 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-amber-200/90 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-serif-title text-stone-900">
              Welcome to Shri Ram Janki Mandir &amp; Charitable Trust
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Consecrated sanctuary of devotion, daily Vedic aartis, and community seva in the service of Prabhu Shri Ram.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onDonateClick()}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition active:scale-95 ${
                isDonationActive
                  ? 'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 hover:from-amber-700 hover:to-orange-600 text-white'
                  : 'bg-amber-800 hover:bg-amber-900 text-white'
              }`}
            >
              <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
              <span>{isDonationActive ? 'Offer Seva / Donate' : 'Seva Status & Pledges'}</span>
              {!isDonationActive && (
                <span className="text-[10px] bg-amber-950/60 text-amber-200 px-1.5 py-0.5 rounded font-medium">
                  A/C Setup
                </span>
              )}
            </button>

            <button
              onClick={isEventsEnabled ? onExploreEvents : onExploreAarti}
              className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200/80 border border-stone-300 text-stone-800 font-semibold px-5 py-3 rounded-full text-xs sm:text-sm transition"
            >
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>{isEventsEnabled ? 'Upcoming Events' : 'Aarti & Darshan'}</span>
            </button>

            <button
              onClick={onExploreAarti}
              className="inline-flex items-center gap-1.5 text-amber-900 hover:text-amber-950 text-xs sm:text-sm font-semibold underline underline-offset-4 decoration-amber-400/60 py-2"
            >
              <span>Explore Aarti Timings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ASCII-aligned Tri-Panel Quick Bar:
            TODAY'S TIMINGS | AARTI HIGHLIGHTS | SEVA OFFERING / PLEDGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Panel 1: Today's Timings */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4.5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider font-serif">
                  Today's Darshan Timings
                </span>
                <span className="text-amber-800 bg-amber-200/70 text-[10px] px-2 py-0.5 rounded font-bold">
                  Open 365 Days
                </span>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-800">
                  <span className="text-stone-600">Morning Session:</span>
                  <span className="font-semibold text-stone-900">{TEMPLE_INFO.darshanTimings.morning}</span>
                </div>
                <div className="flex justify-between text-stone-800">
                  <span className="text-stone-600">Evening Session:</span>
                  <span className="font-semibold text-stone-900">{TEMPLE_INFO.darshanTimings.evening}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between text-xs">
              <span className="text-stone-600">Sandhya Aarti: <strong>7:00 PM</strong></span>
              <button
                onClick={onExploreAarti}
                className="text-amber-800 hover:text-amber-950 font-bold underline"
              >
                All Aarti Times →
              </button>
            </div>
          </div>

          {/* Panel 2: Bhagwan Shri Ram & Ram Parivar Darshan */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4.5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-950 uppercase tracking-wider font-serif flex items-center gap-1">
                  <span>🏹</span>
                  <span>प्रभु श्री राम • Maryada Purushottam</span>
                </span>
                <span className="bg-amber-800 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Divya Swaroop
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-900 font-serif-title mb-1">
                Bhagwan Shri Ram &amp; Mata Janki Darshan
              </h4>
              <p className="text-xs text-stone-600 line-clamp-2">
                Behold the dark-cloud complexioned Neel Megha Shyam swaroop of Lord Rama, holding the Kodanda bow, bestowing peace and moral courage to every devotee.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between text-xs">
              <span className="text-amber-900 font-serif font-bold">॥ सियावर रामचंद्र की जय ॥</span>
              <button
                onClick={onExploreAbout || onExploreAarti}
                className="text-amber-800 hover:text-amber-950 font-bold underline"
              >
                About Lord Ram &amp; Deities →
              </button>
            </div>
          </div>

          {/* Panel 3: Quick Seva Offering OR Seva Pledge when disabled */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif">
                  {isDonationActive ? 'Quick Seva Offering' : 'Seva Sankalpam (Pledge)'}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                  isDonationActive
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-amber-800 bg-amber-50 border-amber-300'
                }`}>
                  {isDonationActive ? 'Instant 80G' : 'A/C Creation Pending'}
                </span>
              </div>

              {isDonationActive ? (
                <>
                  <p className="text-xs text-stone-600 mb-2.5">
                    Support temple prasad &amp; nitya annadanam with a sacred offering:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[501, 1001, 5001].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => onDonateClick(amt)}
                        className="py-2 px-1 text-center bg-white hover:bg-amber-50 border border-amber-300/80 hover:border-amber-500 rounded-lg text-xs font-bold text-amber-900 transition shadow-2xs hover:shadow-xs"
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-2 mb-2">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Direct payment is paused pending official Trust Bank Account registration. Devotees may record their seva pledge below:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[501, 1100, 5100].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => onDonateClick(amt)}
                        className="py-1.5 px-1 text-center bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-[11px] font-bold text-amber-900 transition shadow-2xs"
                      >
                        Pledge ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                {isDonationActive ? 'UPI, Cards, NetBanking' : 'Notification upon account activation'}
              </span>
              <button
                onClick={() => onDonateClick()}
                className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-3 py-1 rounded-md transition"
              >
                {isDonationActive ? 'Custom Offer →' : 'Pledge Seva →'}
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Bhagwan Shri Ram Darshan & Glories Showcase
            Directly fulfills devotee expectation to behold Lord Ram's divine form,
            virtues, and spiritual shelter prominently on the homepage */}
        <div className="mt-8 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400/80 shadow-2xl relative overflow-hidden">
          {/* Ambient golden halo in corner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            {/* Left Column: Authentic Portrait of Lord Ram */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div
                onClick={() => setIsDarshanOpen(true)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-black w-full max-w-[280px] aspect-[3/4]"
              >
                <img
                  src={RAM_PARIVAR_IMAGES.lordRam}
                  alt="Bhagwan Maryada Purushottam Shri Ram"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 left-2 right-2 text-center bg-black/75 backdrop-blur-xs py-1.5 px-2 rounded-xl border border-amber-400/30">
                  <span className="text-[11px] text-amber-300 font-bold flex items-center justify-center gap-1">
                    <span>🔍 Click for Full Sacred Darshan</span>
                  </span>
                </div>
              </div>
              <span className="mt-2 text-xs text-amber-200/90 font-serif italic text-center">
                मर्यादा पुरुषोत्तम भगवान श्री राम
              </span>
            </div>

            {/* Right Column: Glories, 16 Virtues & Life */}
            <div className="lg:col-span-8 space-y-3.5">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>The Presiding Deity • इष्टदेव प्रभु श्री राम</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-white tracking-tight">
                Bhagwan Maryada Purushottam Shri Ram
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                The consecrated sanctuary of <strong>Shri Ram Janki Mandir</strong> is erected in supreme adoration of <strong>Bhagwan Shri Ram</strong>—the seventh avatar of Vishnu and the living ideal of Dharma, filial honor, and divine compassion. Holding the sacred Kodanda bow and arrow of truth, Prabhu Ram dispels all tribulations and bestows auspiciousness upon every devotee.
              </p>

              {/* Ram Dhun & Sacred Inscription */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-950/70 border border-amber-500/30 rounded-xl p-3">
                  <div className="text-amber-300 font-bold font-serif mb-1">
                    ॥ तारक मन्त्र (Taraka Mantra) ॥
                  </div>
                  <div className="text-stone-300 font-serif leading-relaxed">
                    श्री राम जय राम जय जय राम ।
                    <br />
                    सियावर रामचंद्र की जय ॥
                  </div>
                </div>

                <div className="bg-stone-950/70 border border-amber-500/30 rounded-xl p-3">
                  <div className="text-amber-300 font-bold font-serif mb-1">
                    ॥ रामो विग्रहवान् धर्मः ॥
                  </div>
                  <div className="text-stone-300 leading-relaxed">
                    Rama is Dharma personified. Sincere prayer to Lord Ram dissolves fear, fosters familial harmony, and leads to liberation.
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsDarshanOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <span>🌸</span>
                  <span>Offer Virtual Pushpanjali</span>
                </button>

                {onExploreAbout && (
                  <button
                    onClick={onExploreAbout}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-200 hover:text-white border border-amber-400/40 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>Read Ramayana Katha &amp; Mandir History</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => onDonateClick()}
                  className="px-4 py-2 bg-amber-900/60 hover:bg-amber-900 text-amber-200 border border-amber-500/30 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>Prabhu Ram Seva</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
