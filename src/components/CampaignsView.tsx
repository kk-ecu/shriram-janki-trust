import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  Clock,
  CheckCircle2,
  Circle,
  Heart,
  Share2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Flame,
  Check,
} from 'lucide-react';
import { Campaign, Donation } from '../types';
import { api } from '../api/client';

interface CampaignsViewProps {
  onDonateToCampaign: (campaignId: string, amount?: number, tierName?: string, isMonthly?: boolean) => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({ onDonateToCampaign }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeCampaignId, setActiveCampaignId] = useState<string>('camp-ram-mandir');
  const [recentDonors, setRecentDonors] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  // In-widget donation selection state
  const [selectedAmount, setSelectedAmount] = useState<number>(5100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [dedicationText, setDedicationText] = useState<string>('');
  const [showDedication, setShowDedication] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>('INR');

  useEffect(() => {
    async function loadData() {
      const data = await api.getCampaigns();
      setCampaigns(data);
      if (data.length > 0) {
        const initial = data.find((c) => c.featured) || data[0];
        setActiveCampaignId(initial.id);
        const donors = await api.getDonations(initial.id);
        setRecentDonors(donors);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const activeCampaign = campaigns.find((c) => c.id === activeCampaignId) || campaigns[0];

  const handleCampaignChange = async (campId: string) => {
    setActiveCampaignId(campId);
    const donors = await api.getDonations(campId);
    setRecentDonors(donors);
  };

  if (loading || !activeCampaign) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-stone-600">Loading sacred campaigns...</p>
      </div>
    );
  }

  const progressPercent = Math.min(
    100,
    Math.round((activeCampaign.raisedAmount / activeCampaign.targetAmount) * 100)
  );

  const finalDonationAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleDirectDonate = () => {
    onDonateToCampaign(activeCampaign.id, finalDonationAmount || 1100, undefined, isMonthly);
  };

  return (
    <div className="bg-[#FFFDF9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Campaign Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-amber-200/80">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Sacred Charitable Causes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-stone-900">
              Temple Building &amp; Seva Campaigns
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {campaigns.map((camp) => (
              <button
                key={camp.id}
                onClick={() => handleCampaignChange(camp.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeCampaign.id === camp.id
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-amber-50'
                }`}
              >
                {camp.title.length > 28 ? camp.title.slice(0, 26) + '...' : camp.title}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Responsive Layout mirroring uploaded ISKCON / donorbox screenshots & ASCII spec */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Visual Media, Milestones, Recent Donors, Updates (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                  {activeCampaign.category}
                </span>
                <span className="text-xs text-stone-500">
                  Target Consecration: Oct 2026
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif-title text-stone-900 leading-tight mb-2">
                {activeCampaign.title}
              </h1>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {activeCampaign.subtitle}
              </p>
            </div>

            {/* Campaign Visual Gallery & Photos (matching wireframe and ISKCON screenshot) */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-amber-200 bg-stone-900">
                <img
                  src={activeCampaign.bannerImage}
                  alt={activeCampaign.title}
                  className="w-full h-[280px] sm:h-[360px] object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span>📸 Architectural Blueprint &amp; Sanctum Plan</span>
                </div>
              </div>

              {/* Secondary photo angles matching the uploaded ISKCON Austin reference */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border border-stone-200 shadow-2xs h-36 relative">
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80"
                    alt="Sanctum work"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[11px] text-white font-medium">Stone Column Carving</span>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-stone-200 shadow-2xs h-36 relative">
                  <img
                    src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80"
                    alt="Temple complex assembly"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[11px] text-white font-medium">Assembly Mandap</span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-depth Narrative */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4">
              <h3 className="text-lg font-bold font-serif-title text-stone-900">
                About This Sacred Initiative
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {activeCampaign.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-amber-100 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Tax Deductible under 80G</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Audited by Chartered Accountants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Personal Gotra Sankalpam Included</span>
                </div>
              </div>
            </div>

            {/* MILESTONES (explicitly specified in ASCII wireframe) */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold font-serif-title text-stone-900 tracking-wide flex items-center gap-2">
                  <span>── CONSECRATION MILESTONES ──</span>
                </h3>
                <span className="text-xs text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded">
                  Phase 2 of 3
                </span>
              </div>

              <div className="space-y-4">
                {activeCampaign.milestones.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition ${
                      m.completed
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="mt-0.5">
                      {m.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${m.completed ? 'text-emerald-950' : 'text-stone-800'}`}>
                          ₹{(m.amount / 100000).toFixed(0)}L — {m.title}
                        </span>
                        <span className="text-[11px] font-medium text-stone-500">
                          {m.completed ? `Done: ${m.completedDate}` : `Target: ${m.targetDate}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT DONORS FEED (specified in ASCII wireframe) */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold font-serif-title text-stone-900 flex items-center gap-2">
                  <span>── RECENT NOBLE DONORS ──</span>
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  {activeCampaign.donorsCount} noble patrons so far
                </span>
              </div>

              <div className="divide-y divide-stone-100">
                {recentDonors.slice(0, 5).map((d) => (
                  <div key={d.id} className="py-3 flex items-start justify-between gap-3 text-sm">
                    <div className="flex items-start gap-2.5">
                      <span className="text-lg">🙏</span>
                      <div>
                        <div className="font-semibold text-stone-900">
                          {d.donorName}
                          <span className="font-normal text-stone-500 text-xs ml-2">
                            donated ₹{d.amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {d.dedication && (
                          <p className="text-xs italic text-amber-800/90 mt-0.5">
                            "{d.dedication}"
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] text-stone-400 whitespace-nowrap">
                      {new Date(d.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CAMPAIGN UPDATES BLOG (specified in ASCII wireframe) */}
            {activeCampaign.updates.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4">
                <h3 className="text-base font-bold font-serif-title text-stone-900">
                  ── CAMPAIGN PROGRESS DISPATCHES ──
                </h3>
                {activeCampaign.updates.map((up) => (
                  <div key={up.id} className="border-l-2 border-amber-500 pl-4 py-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span>📅 {up.date}</span>
                      <span>•</span>
                      <span>By {up.author}</span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">{up.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{up.content}</p>
                    {up.imageUrl && (
                      <img
                        src={up.imageUrl}
                        alt={up.title}
                        className="mt-2 rounded-lg max-h-48 object-cover border border-stone-200"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Interactive Donation Box (lg:col-span-5) */}
          {/* Matches ISKCON Austin / donorbox style card from uploaded user image */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-300/80 overflow-hidden">
              {/* Blue / Gold Header Bar from uploaded screenshots */}
              <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 p-5 text-white">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold font-serif-title">
                    Sacred Seva Offering
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-amber-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>80G Tax Receipt</span>
                  </div>
                </div>
                <p className="text-xs text-amber-100 font-light leading-snug">
                  Take this opportunity to receive the eternal blessings of Prabhu Sri Ram &amp; Devi Sita.
                </p>
              </div>

              {/* Progress Summary bar (75% as in wireframe) */}
              <div className="p-5 bg-amber-50/50 border-b border-amber-200/70">
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-2xl font-black text-stone-900 tracking-tight font-serif-title">
                    ₹{activeCampaign.raisedAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-stone-600">
                    of ₹{activeCampaign.targetAmount.toLocaleString('en-IN')} goal
                  </span>
                </div>

                {/* Progress track */}
                <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden mb-2">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-stone-600 font-medium">
                  <span className="flex items-center gap-1 font-bold text-amber-900">
                    <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
                    {progressPercent}% Complete
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-stone-500" />
                    {activeCampaign.donorsCount} Supporters
                  </span>
                  <span className="flex items-center gap-1 text-orange-800 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    {activeCampaign.daysRemaining} days left
                  </span>
                </div>
              </div>

              {/* One-Time vs Monthly Toggle (as shown in ISKCON reference) */}
              <div className="p-5 space-y-5">
                <div className="flex rounded-lg bg-stone-100 p-1 border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsMonthly(false)}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition ${
                      !isMonthly
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    One-time Offering
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMonthly(true)}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition flex items-center justify-center gap-1 ${
                      isMonthly
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <span>❤️ Monthly Seva</span>
                  </button>
                </div>

                {/* Tiers Grid (🧱 One Brick ₹1,100 | 🏛️ One Pillar ₹5,100 | 🪔 Nanda Deep ₹11,000 | 👑 Patron ₹51,000) */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 font-serif">
                    Choose Consecrated Tier:
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {activeCampaign.tiers.map((tier) => {
                      const isSelected = !customAmount && selectedAmount === tier.amount;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(tier.amount);
                            setCustomAmount('');
                          }}
                          className={`p-3 rounded-xl border text-left transition relative flex flex-col justify-between ${
                            isSelected
                              ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/20 shadow-xs'
                              : 'border-stone-200 hover:border-amber-400 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xl">{tier.icon}</span>
                            <span className="font-extrabold text-stone-900 text-sm">
                              ₹{tier.amount.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-stone-900 leading-tight">
                              {tier.name}
                            </div>
                            <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                              {tier.description}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount input */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 font-serif">
                    Or Enter Custom Amount:
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500 font-bold">
                      ₹
                    </div>
                    <input
                      type="number"
                      min="100"
                      step="100"
                      placeholder="e.g. 2100 or 50000"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                      }}
                      className="block w-full pl-8 pr-12 py-2.5 text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-stone-400 font-semibold">
                      INR
                    </div>
                  </div>
                </div>

                {/* Dedication Option ("In memory of...") as requested in ASCII diagram */}
                <div className="pt-2 border-t border-stone-200">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      id="dedicate-checkbox"
                      checked={showDedication}
                      onChange={(e) => setShowDedication(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300"
                    />
                    <label htmlFor="dedicate-checkbox" className="text-xs font-semibold text-stone-700 cursor-pointer">
                      Dedicate this offering (e.g. "In memory of...", "For child's birthday")
                    </label>
                  </div>

                  {showDedication && (
                    <input
                      type="text"
                      placeholder="Enter prayer or dedication text for altar chant..."
                      value={dedicationText}
                      onChange={(e) => setDedicationText(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-amber-500"
                    />
                  )}
                </div>

                {/* Primary CTA Submit */}
                <button
                  type="button"
                  onClick={handleDirectDonate}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-base bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 hover:from-amber-700 hover:to-orange-600 shadow-lg hover:shadow-orange-500/25 transition active:scale-98 flex items-center justify-center gap-2"
                >
                  <Flame className="w-5 h-5 fill-amber-200 text-amber-200" />
                  <span>
                    Proceed to Donate ₹{finalDonationAmount ? finalDonationAmount.toLocaleString('en-IN') : '1,100'}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Instant 80G Receipt
                  </span>
                  <span>•</span>
                  <span>UPI / QR / NetBanking / Cards</span>
                </div>
              </div>
            </div>

            {/* Social Share Box */}
            <div className="bg-white rounded-xl p-4 border border-stone-200 text-center space-y-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                Share With Family &amp; Devotee Circles
              </span>
              <div className="flex items-center justify-center gap-2 pt-1">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Pranam! Please join me in contributing to ${activeCampaign.title} at Shree Ram Mandir. 100% Tax Deductible (80G).`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 border border-emerald-200 transition"
                >
                  💬 WhatsApp
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-bold hover:bg-blue-100 border border-blue-200 transition"
                >
                  Facebook
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200 border border-stone-200 transition"
                >
                  Twitter / X
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
