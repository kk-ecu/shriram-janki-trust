import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CampaignsView } from './components/CampaignsView';
import { EventsView } from './components/EventsView';
import { PujaView } from './components/PujaView';
import { NewsView } from './components/NewsView';
import { GalleryView } from './components/GalleryView';
import { AboutView } from './components/AboutView';
import { AartiView } from './components/AartiView';
import { TrustAdminView } from './components/TrustAdminView';
import { DonationModal } from './components/DonationModal';
import { ReceiptView } from './components/ReceiptView';
import { Footer } from './components/Footer';
import { HostingerGuideModal } from './components/HostingerGuideModal';
import { MenuManagerModal } from './components/MenuManagerModal';
import { loadMenuSettings, saveMenuSettings } from './data/menuConfig';
import { getDonationSettings, DonationModuleSettings } from './data/donationSettings';
import { RamWatermarkBg } from './components/RamParivarArt';
import { Campaign, Donation, MenuSettings } from './types';
import { api } from './api/client';
import {
  Flame,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Heart,
  Clock,
  Play,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { TEMPLE_INFO } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Menu and Phase Configuration State
  const [menuSettings, setMenuSettings] = useState<MenuSettings>(() => loadMenuSettings());
  const [isMenuManagerOpen, setIsMenuManagerOpen] = useState<boolean>(false);

  // Modals state
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);
  const [donateInitialCampaignId, setDonateInitialCampaignId] = useState<string | undefined>(undefined);
  const [donateInitialAmount, setDonateInitialAmount] = useState<number | undefined>(undefined);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState<boolean>(false);

  // Active receipt view
  const [currentReceipt, setCurrentReceipt] = useState<Donation | null>(null);

  // Trust Bank Account & Donation Module state
  const [donationSettings, setDonationSettings] = useState<DonationModuleSettings>(() => getDonationSettings());

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<DonationModuleSettings>;
      if (custom.detail) setDonationSettings(custom.detail);
    };
    window.addEventListener('srjm_donation_settings_changed', handler);
    return () => window.removeEventListener('srjm_donation_settings_changed', handler);
  }, []);

  useEffect(() => {
    async function init() {
      const camps = await api.getCampaigns();
      setCampaigns(camps);
    }
    init();
  }, []);

  const handleUpdateMenuSettings = (newSettings: MenuSettings) => {
    setMenuSettings(newSettings);
    saveMenuSettings(newSettings);

    // If current tab was disabled, fallback smoothly to 'home'
    const isCurrentTabStillEnabled =
      currentTab === 'home' ||
      currentTab === 'admin' ||
      currentTab === 'receipt' ||
      newSettings.items.some((it) => it.id === currentTab && it.enabled);

    if (!isCurrentTabStillEnabled) {
      setCurrentTab('home');
    }
  };

  const openDonateModal = (campaignId?: string, amount?: number) => {
    setDonateInitialCampaignId(campaignId);
    setDonateInitialAmount(amount);
    setIsDonateModalOpen(true);
  };

  const handleDonationComplete = (receipt: Donation) => {
    setCurrentReceipt(receipt);
    setCurrentTab('receipt');
  };

  const isEventsEnabled = menuSettings.items.some((i) => i.id === 'events' && i.enabled);
  const isCampaignsEnabled = menuSettings.items.some((i) => i.id === 'campaigns' && i.enabled);
  const isPujasEnabled = menuSettings.items.some((i) => i.id === 'pujas' && i.enabled);
  const isGalleryEnabled = menuSettings.items.some((i) => i.id === 'gallery' && i.enabled);
  const isAboutEnabled = menuSettings.items.some((i) => i.id === 'about' && i.enabled);

  const featuredCampaign = campaigns.find((c) => c.featured) || campaigns[0];
  const progressPercent = featuredCampaign
    ? Math.min(100, Math.round((featuredCampaign.raisedAmount / featuredCampaign.targetAmount) * 100))
    : 75;

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-900 flex flex-col selection:bg-amber-200 selection:text-amber-950 font-sans relative">
      {/* Universal Sacred Ram Parivar & Dhanush Background Watermark */}
      <RamWatermarkBg />

      {/* Primary Dynamic Navigation with Auto-Balancing Menu and Direct Payment Interlinking */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentReceipt(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openDonateModal={() => openDonateModal()}
        openDeployGuide={() => setIsDeployGuideOpen(true)}
        menuSettings={menuSettings}
        openMenuManager={() => setIsMenuManagerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {currentReceipt && (
          <ReceiptView
            receipt={currentReceipt}
            onBack={() => {
              setCurrentReceipt(null);
              setCurrentTab('home');
            }}
          />
        )}

        {!currentReceipt && currentTab === 'home' && (
          <>
            <Hero
              onDonateClick={(amt) => openDonateModal(featuredCampaign?.id, amt)}
              onExploreEvents={() => setCurrentTab('events')}
              onExploreAarti={() => setCurrentTab('aarti')}
              onExploreAbout={() => setCurrentTab('about')}
              onViewCampaigns={() => setCurrentTab('campaigns')}
              onWatchLive={() => setCurrentTab(isEventsEnabled ? 'events' : 'aarti')}
              isEventsEnabled={isEventsEnabled}
              isCampaignsEnabled={isCampaignsEnabled}
              donationSettings={donationSettings}
            />

            {/* If Campaigns is enabled: Display Featured Renovation Campaign Banner */}
            {isCampaignsEnabled && featuredCampaign && (
              <section className="py-12 bg-white border-b border-amber-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-amber-50/70 rounded-3xl p-6 sm:p-10 border border-amber-300 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-7 space-y-4">
                        <div className="inline-flex items-center gap-2 bg-amber-200/60 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          <Flame className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
                          <span>Grand Consecration Drive • Phase 2</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
                          {featuredCampaign.title}
                        </h2>

                        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                          {featuredCampaign.subtitle} The historic carved pink sandstone Shikhara and golden Kalash installation require your dharmic devotion.
                        </p>

                        {/* Progress Bar */}
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between items-baseline text-xs sm:text-sm font-semibold">
                            <span className="text-stone-900 font-bold font-serif-title text-lg">
                              ₹{featuredCampaign.raisedAmount.toLocaleString('en-IN')}{' '}
                              <span className="text-stone-500 font-normal text-xs">
                                raised of ₹{featuredCampaign.targetAmount.toLocaleString('en-IN')} goal
                              </span>
                            </span>
                            <span className="text-amber-900 font-extrabold bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                              {progressPercent}% Complete
                            </span>
                          </div>

                          <div className="w-full bg-stone-200 rounded-full h-3.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>

                          <div className="flex justify-between text-xs text-stone-500 pt-1">
                            <span>{featuredCampaign.donorsCount} Noble Devotees Contributed</span>
                            <span className="font-semibold text-orange-800">
                              {featuredCampaign.daysRemaining} days remaining in Phase 2
                            </span>
                          </div>
                        </div>

                        {/* Direct Tiers (Brick, Pillar, etc.) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
                          {featuredCampaign.tiers.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => openDonateModal(featuredCampaign.id, t.amount)}
                              className="p-2.5 rounded-xl border border-amber-300/80 bg-white hover:bg-amber-100/60 transition text-left shadow-2xs hover:shadow-xs group"
                            >
                              <div className="text-lg">{t.icon}</div>
                              <div className="font-bold text-xs text-stone-900 mt-1">₹{t.amount.toLocaleString('en-IN')}</div>
                              <div className="text-[10px] text-stone-500 group-hover:text-amber-900 truncate">{t.name}</div>
                            </button>
                          ))}
                        </div>

                        <div className="pt-2 flex flex-wrap items-center gap-4">
                          <button
                            onClick={() => openDonateModal(featuredCampaign.id)}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition active:scale-95"
                          >
                            <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
                            <span>Contribute with 80G Tax Exemption</span>
                          </button>

                          <button
                            onClick={() => setCurrentTab('campaigns')}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-900 hover:underline"
                          >
                            <span>Explore Details &amp; Milestones</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="lg:col-span-5">
                        <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-amber-300/80 bg-stone-900">
                          <img
                            src={featuredCampaign.bannerImage}
                            alt="Mandir Renovation"
                            className="w-full h-72 sm:h-96 object-cover opacity-90"
                          />
                          <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md rounded-xl p-3 text-white text-xs flex items-center justify-between">
                            <span className="font-medium">Phase 2: Sanctum &amp; Pillar Carving</span>
                            <span className="text-emerald-400 font-bold">On Schedule</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* In Phase-1 (when campaigns disabled): Grand Lord Ram Showcase Section */}
            {!isCampaignsEnabled && (
              <section className="py-12 bg-white border-b border-amber-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-50 rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-3.5 py-1 rounded-full font-serif shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        <span>भगवान श्री राम • Maryada Purushottam</span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-title text-stone-900 tracking-tight leading-tight">
                        The Divine Presence of Bhagwan Shri Ram &amp; Mata Janki
                      </h2>

                      {/* Sacred Ram Stuti */}
                      <div className="p-4 bg-amber-100/70 rounded-2xl border border-amber-300 text-xs sm:text-sm font-serif text-amber-950 space-y-1">
                        <p className="font-bold text-amber-900">
                          ॥ श्री रामचन्द्र कृपालु भजु मन हरण भवभय दारुणम् ॥
                        </p>
                        <p className="text-stone-700 font-light italic">
                          "नवकञ्ज लोचन कञ्ज मुख कर कञ्ज पद कञ्जारुणम् । कन्दर्प अगणित अमित छवि नव नील नीरद सुन्दरम् ॥"
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        At <strong>Shri Ram Janki Mandir</strong>, Prabhu Shri Ram is venerated as the embodiment of universal righteousness, truth, and boundless grace. Clothed in radiant yellow silk peetambari, holding the celestial Kodanda bow and arrow of justice, Lord Ram blesses every pilgrim with fearlessness, moral clarity, and spiritual peace.
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setCurrentTab('about')}
                          className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition flex items-center gap-2"
                        >
                          <span>About Lord Ram &amp; Deities</span>
                          <ArrowRight className="w-4 h-4 text-amber-200" />
                        </button>
                        <button
                          onClick={() => setCurrentTab('aarti')}
                          className="px-5 py-3 bg-white hover:bg-amber-50 text-amber-900 border border-amber-400 font-bold text-xs sm:text-sm rounded-full shadow-xs transition flex items-center gap-2"
                        >
                          <Clock className="w-4 h-4 text-amber-700" />
                          <span>Daily Darshan &amp; Aarti Hours</span>
                        </button>
                      </div>
                    </div>

                    {/* Prominent Majestic Portrait of Bhagwan Shri Ram */}
                    <div className="lg:col-span-5">
                      <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 relative bg-stone-950 group">
                        <img
                          src="/assets/images/lord_ram.jpg"
                          alt="Bhagwan Maryada Purushottam Shri Ram"
                          className="w-full h-80 sm:h-96 object-cover object-top opacity-95 transition-transform duration-700 group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-3.5 rounded-2xl border border-amber-400/40 text-white text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-amber-300 text-sm">
                              मर्यादा पुरुषोत्तम भगवान श्री राम
                            </span>
                            <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-bold">
                              प्रतिष्ठित विग्रह
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-300 mt-1 font-light">
                            Consecrated sanctum deity holding the sacred Kodanda bow
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Dynamic Seva Offerings Grid on Home */}
            <section className="py-12 bg-[#FFFDF9]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center max-w-2xl mx-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-800 font-serif">
                    Sacred Sevas &amp; Nitya Dharma
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900 mt-1">
                    Ways to Participate in Temple Seva
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2">
                    Every contribution directly feeds devotees, supports Vedic scholars, and preserves sacred rituals.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Nitya Anna Daanam (Direct Seva Offering) */}
                  <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl mb-4">
                        🍲
                      </div>
                      <h3 className="font-bold text-base font-serif-title text-stone-900">
                        Nitya Anna Daanam
                      </h3>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                        Feed 100 pilgrims and sadhus with fresh, sanctified satvik meals prepared in the temple kitchen daily.
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-sm font-bold text-amber-950 font-serif-title">₹5,100 / Day</span>
                      <button
                        onClick={() => openDonateModal('camp-anna-daanam', 5100)}
                        className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition"
                      >
                        Sponsor Meal →
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Either Vedic Pujas OR Daily Aarti & Alankaram depending on Phase */}
                  {isPujasEnabled ? (
                    <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-900 flex items-center justify-center text-2xl mb-4">
                          🪔
                        </div>
                        <h3 className="font-bold text-base font-serif-title text-stone-900">
                          Vedic Puja &amp; Sankalpam
                        </h3>
                        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                          Book special Rudrabhishek, Ram Janmotsav Abhishek or Navagraha Havan with live video link and prasad delivery.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-amber-950 font-serif-title">From ₹501</span>
                        <button
                          onClick={() => setCurrentTab('pujas')}
                          className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition"
                        >
                          Book Puja →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl mb-4">
                          🏹
                        </div>
                        <h3 className="font-bold text-base font-serif-title text-stone-900">
                          Sri Ram Seva &amp; Pushpalankaram
                        </h3>
                        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                          Sponsor the daily fresh lotus pushpalankaram, sacred Tulsi malas, and Ram-Naam archana dedicated to Bhagwan Shri Ram and Mata Janki.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-amber-950 font-serif-title">₹1,100 / Seva</span>
                        <button
                          onClick={() => openDonateModal(undefined, 1100)}
                          className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition"
                        >
                          Offer Ram Seva →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Card 3: Either 360° Virtual Tour OR Mandir Trust 80G Tax Exemption */}
                  {isGalleryEnabled ? (
                    <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center text-2xl mb-4">
                          🔲
                        </div>
                        <h3 className="font-bold text-base font-serif-title text-stone-900">
                          360° Virtual Darshan
                        </h3>
                        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                          Immerse yourself in panoramic interactive views of the Garbhagriha, Gopuram, and daily festive celebrations.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-xs text-emerald-700 font-semibold">Free for Devotees</span>
                        <button
                          onClick={() => setCurrentTab('gallery')}
                          className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition"
                        >
                          Launch 360° →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-900 flex items-center justify-center text-2xl mb-4">
                          🛡️
                        </div>
                        <h3 className="font-bold text-base font-serif-title text-stone-900">
                          80G Tax Exemption &amp; Trust
                        </h3>
                        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                          Every donation is eligible for 50% tax deduction under Sec 80G. Instant computerized Form 10BE receipts with QR code.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-xs text-emerald-700 font-semibold">URN: {TEMPLE_INFO.taxExemption80GNumber}</span>
                        <button
                          onClick={() => openDonateModal()}
                          className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition"
                        >
                          Offer Seva →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Dedicated Page Views */}
        {!currentReceipt && currentTab === 'campaigns' && (
          <CampaignsView
            onDonateToCampaign={(campId, amt) => openDonateModal(campId, amt)}
          />
        )}

        {!currentReceipt && currentTab === 'events' && <EventsView />}

        {!currentReceipt && currentTab === 'pujas' && <PujaView />}

        {!currentReceipt && currentTab === 'news' && <NewsView />}

        {!currentReceipt && currentTab === 'gallery' && <GalleryView />}

        {!currentReceipt && currentTab === 'about' && (
          <AboutView
            onDonateClick={(amount, dedication) => openDonateModal(undefined, amount)}
          />
        )}

        {!currentReceipt && currentTab === 'aarti' && (
          <AartiView
            onDonateClick={(amount, sevaName) => openDonateModal(undefined, amount)}
          />
        )}

        {!currentReceipt && currentTab === 'admin' && (
          <TrustAdminView
            onSelectReceipt={(rec) => {
              setCurrentReceipt(rec);
              setCurrentTab('receipt');
            }}
            openDonateModal={() => openDonateModal()}
            menuSettings={menuSettings}
            openMenuManager={() => setIsMenuManagerOpen(true)}
          />
        )}
      </main>

      {/* Primary Footer with Sync to Menu Configuration */}
      <Footer
        onNavigate={(tab) => {
          setCurrentReceipt(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openDonateModal={(campId, amt) => openDonateModal(campId, amt)}
        openDeployGuide={() => setIsDeployGuideOpen(true)}
        menuSettings={menuSettings}
        openMenuManager={() => setIsMenuManagerOpen(true)}
      />

      {/* Global Donation Modal with Full Payment Gateways (UPI, Cards, NetBanking, QR) */}
      <DonationModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        campaigns={campaigns}
        initialCampaignId={donateInitialCampaignId}
        initialAmount={donateInitialAmount}
        onDonationComplete={handleDonationComplete}
      />

      {/* Menu & Phase Permutation Controller Modal */}
      <MenuManagerModal
        isOpen={isMenuManagerOpen}
        onClose={() => setIsMenuManagerOpen(false)}
        settings={menuSettings}
        onUpdateSettings={handleUpdateMenuSettings}
      />

      {/* Hostinger & DuckDB GitOps Architecture Modal */}
      <HostingerGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />
    </div>
  );
}
