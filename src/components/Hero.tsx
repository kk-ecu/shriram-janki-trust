import React from 'react';
import { Calendar, ShieldCheck, Flame, ArrowRight, Play, AlertCircle, Sparkles, Heart } from 'lucide-react';
import { TEMPLE_INFO } from '../data/mockData';
import { RamParivarHeroVisual } from './RamParivarArt';
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-orange-50/40 to-[#FFFDF9] pt-6 pb-12 border-b border-amber-200/80">
      {/* Subtle traditional sacred Ram watermark in background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <div className="w-[640px] h-[640px] rounded-full border-[36px] border-amber-800 border-dashed animate-spin-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sanskrit Inscription Banner */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 text-amber-950 border border-amber-300 px-4 py-1.5 rounded-full shadow-2xs">
            <span className="text-sm font-semibold tracking-wide font-serif">
              ॐ श्री गणेशाय नमः • सियावर रामचंद्र की जय • ॐ नमो भगवते वासुदेवाय
            </span>
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
      </div>
    </section>
  );
};
