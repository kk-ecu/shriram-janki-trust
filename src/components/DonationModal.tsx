import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Flame,
  CheckCircle,
  QrCode,
  CreditCard,
  Building,
  Heart,
  Lock,
  Sparkles,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Send,
  Sliders,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Campaign, Donation } from '../types';
import { api } from '../api/client';
import { TEMPLE_INFO } from '../data/mockData';
import {
  getDonationSettings,
  saveDonationSettings,
  saveDevoteePledge,
  DonationModuleSettings,
} from '../data/donationSettings';
import { RamParivarSVG } from './RamParivarArt';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: Campaign[];
  initialCampaignId?: string;
  initialAmount?: number;
  onDonationComplete: (receipt: Donation) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  initialCampaignId,
  initialAmount,
  onDonationComplete,
}) => {
  const [donationSettings, setDonationSettings] = useState<DonationModuleSettings>(getDonationSettings());
  const isDonationEnabled = donationSettings.isEnabled;

  // Selected Campaign / Seva
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    initialCampaignId || (campaigns[0] ? campaigns[0].id : 'camp-ram-mandir')
  );
  const [amount, setAmount] = useState<number>(initialAmount || 1100);
  const [customAmount, setCustomAmount] = useState<string>(
    initialAmount && ![501, 1100, 2100, 5100, 11000].includes(initialAmount)
      ? String(initialAmount)
      : ''
  );
  const [frequency, setFrequency] = useState<'One-time' | 'Monthly' | 'Annual'>('One-time');

  // Devotee details
  const [donorName, setDonorName] = useState<string>('');
  const [panNumber, setPanNumber] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  // Sankalpam / Dedication
  const [gotra, setGotra] = useState<string>('');
  const [nakshatra, setNakshatra] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('General Devotion');
  const [dedicationText, setDedicationText] = useState<string>('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'QR'>('UPI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Pre-pledge submitted state when disabled
  const [pledgeSubmitted, setPledgeSubmitted] = useState<boolean>(false);
  const [pledgeId, setPledgeId] = useState<string>('');

  // Listen to external donation settings changes
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<DonationModuleSettings>;
      if (custom.detail) {
        setDonationSettings(custom.detail);
      }
    };
    window.addEventListener('srjm_donation_settings_changed', handler);
    return () => window.removeEventListener('srjm_donation_settings_changed', handler);
  }, []);

  // Update initial parameters when opened
  useEffect(() => {
    if (initialCampaignId) setSelectedCampaignId(initialCampaignId);
    if (initialAmount) {
      setAmount(initialAmount);
      if (![501, 1100, 2100, 5100, 11000].includes(initialAmount)) {
        setCustomAmount(String(initialAmount));
      }
    }
  }, [initialCampaignId, initialAmount, isOpen]);

  if (!isOpen) return null;

  const quickAmounts = [501, 1100, 2100, 5100, 11000];
  const finalAmount = customAmount ? Number(customAmount) : amount;

  // Toggle donation module status
  const handleToggleModule = (enable: boolean) => {
    const updated: DonationModuleSettings = {
      ...donationSettings,
      isEnabled: enable,
      trustAccountStatus: enable ? 'ACTIVE_LIVE' : 'PENDING_CREATION',
      statusBadge: enable ? 'Online Payment Gateway Active' : 'Trust Bank Account Creation In Progress',
    };
    setDonationSettings(updated);
    saveDonationSettings(updated);
  };

  // Submit Seva Pledge (When Module is Disabled)
  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorPhone.trim()) {
      alert('Please provide your Name and Mobile/WhatsApp number.');
      return;
    }

    const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId);
    const recorded = saveDevoteePledge({
      donorName,
      donorPhone,
      donorEmail: donorEmail || 'devotee@mandir.org',
      sevaType: selectedCampaign ? selectedCampaign.title : 'General Seva',
      pledgedAmount: finalAmount,
      gotra,
      sankalpamNote: [occasion, dedicationText].filter(Boolean).join(' - '),
    });

    setPledgeId(recorded.id);
    setPledgeSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#ea580c'],
      });
    } catch {}
  };

  // Submit Live Donation (When Module is Enabled)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 100) {
      alert('Please enter a valid donation amount (minimum ₹100)');
      return;
    }

    setIsProcessing(true);

    try {
      await api.createDonationOrder(finalAmount, selectedCampaignId, donorName);

      const fullDedication = [
        occasion !== 'General Devotion' ? `Occasion: ${occasion}` : '',
        gotra ? `Gotra: ${gotra}` : '',
        nakshatra ? `Nakshatra: ${nakshatra}` : '',
        dedicationText,
      ]
        .filter(Boolean)
        .join(' | ');

      const result = await api.verifyAndRecordDonation({
        amount: finalAmount,
        campaignId: selectedCampaignId,
        donorName: donorName || 'Noble Devotee',
        donorEmail: donorEmail || 'devotee@example.com',
        donorPhone: donorPhone || '+91 9876543210',
        panNumber: panNumber || 'NOT_PROVIDED',
        address: address || 'India',
        isMonthly: frequency === 'Monthly',
        dedication: fullDedication,
        paymentMethod,
      });

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#d97706', '#ea580c', '#10b981'],
        });
      } catch {}

      setIsProcessing(false);
      onClose();
      onDonationComplete(result.data);
    } catch {
      setIsProcessing(false);
      alert('Payment could not complete. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-amber-300 my-8 overflow-hidden animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        {/* Top Header with Ram Parivar Miniature Art & Branding */}
        <div className="bg-gradient-to-r from-amber-800 via-orange-700 to-amber-900 text-white p-5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-300 shrink-0 shadow-sm">
              <img
                src="/assets/images/lord_ram.jpg"
                alt="Bhagwan Shri Ram"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif-title text-white tracking-tight">
                  {isDonationEnabled ? 'Online Seva & Donation Gateway' : 'Seva Sankalpam & Status'}
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDonationEnabled
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-950 text-amber-200 border border-amber-400/40'
                }`}>
                  {isDonationEnabled ? 'Active Gateway' : 'Trust A/C Setup'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-100 font-light mt-0.5">
                Shri Ram Janki Mandir &amp; Charitable Trust • <span className="font-serif">जय श्री राम</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dedicated Admin / Trustee Fast Toggle Switcher */}
        <div className="bg-amber-100/90 border-b border-amber-200 px-5 py-2.5 flex items-center justify-between text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-800" />
            <span className="font-bold">Trustee Controls:</span>
            <span className="text-stone-700">Donation Module State</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`font-semibold text-[11px] ${!isDonationEnabled ? 'text-amber-900 font-bold' : 'text-stone-500'}`}>
              Disabled (A/C Pending)
            </span>
            <button
              type="button"
              onClick={() => handleToggleModule(!isDonationEnabled)}
              title={isDonationEnabled ? 'Click to Disable (Trust Account Pending)' : 'Click to Enable (Live Gateway)'}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isDonationEnabled ? 'bg-emerald-600' : 'bg-stone-400'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDonationEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-semibold text-[11px] ${isDonationEnabled ? 'text-emerald-800 font-bold' : 'text-stone-500'}`}>
              Live Gateway Active
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* ────────────────────────────────────────────────────────────
              CASE 1: DONATION MODULE IS DISABLED (TRUST ACCOUNT PENDING)
             ──────────────────────────────────────────────────────────── */}
          {!isDonationEnabled && !pledgeSubmitted && (
            <div className="space-y-6">
              {/* Trust Account Status Explanation Banner */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-200 text-amber-900 rounded-xl shrink-0 mt-0.5">
                    <AlertCircle className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base font-serif-title text-stone-900">
                      Trust Bank Account Under Creation &amp; Verification
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                      In strict compliance with statutory trust governance, direct financial contributions are paused until the official designated bank account in the registered name of <strong>"Shri Ram Janki Mandir &amp; Charitable Trust"</strong> is finalized with our banking partners.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-xs text-stone-700 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Trust Name:</span>
                    <strong className="text-amber-950">Shri Ram Janki Mandir &amp; Charitable Trust</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Bank Partner:</span>
                    <strong className="text-stone-900">State Bank of India (Designated Branch)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Status:</span>
                    <span className="text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded">KYC &amp; Signatory Verification In Progress</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Expected Activation:</span>
                    <span className="text-stone-800 font-semibold">{donationSettings.expectedDate}</span>
                  </div>
                </div>
              </div>

              {/* Devotee Pre-Registration / Seva Pledge Form */}
              <form onSubmit={handlePledgeSubmit} className="space-y-4">
                <div className="border-b border-amber-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-serif">
                    Record Your Seva Sankalpam (सेवा संकल्प दर्ज करें)
                  </span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Register your intention to offer seva. The Mandir Trust will notify you directly via WhatsApp/SMS with official bank details once the account is activated.
                  </p>
                </div>

                {/* Choose Seva Cause */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">
                    Selected Sacred Cause / Seva:
                  </label>
                  <select
                    value={selectedCampaignId}
                    onChange={(e) => setSelectedCampaignId(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-amber-300 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {campaigns.map((camp) => (
                      <option key={camp.id} value={camp.id}>
                        {camp.title}
                      </option>
                    ))}
                    <option value="daily-aarti">Daily Aarti &amp; Pushpalankaram (₹1,100)</option>
                    <option value="nitya-annadanam">Nitya Anna Daanam (₹5,100)</option>
                  </select>
                </div>

                {/* Amount Pledge */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">
                    Intended Seva Amount (INR):
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[501, 1100, 2100, 5100].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2 text-xs font-bold rounded-xl border transition ${
                          !customAmount && amount === amt
                            ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                            : 'bg-white text-stone-800 border-amber-200 hover:bg-amber-50'
                        }`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Or enter custom pledge amount (₹)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {/* Devotee Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Devotee Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra Sharma"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98201 54321"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="devotee@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Gotra / Family Lineage (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kashyapa, Bharadwaja"
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 hover:from-amber-800 hover:to-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-200" />
                  <span>Submit Sacred Seva Sankalpam (संकल्प दर्ज करें)</span>
                </button>
              </form>
            </div>
          )}

          {/* Devotee Pledge Submitted Confirmation */}
          {!isDonationEnabled && pledgeSubmitted && (
            <div className="text-center py-8 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-900 mx-auto flex items-center justify-center text-3xl shadow-sm">
                🙏
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-stone-900">
                Seva Sankalpam Registered Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Noble Devotee <strong>{donorName}</strong>, your pledge of <strong>₹{finalAmount.toLocaleString('en-IN')}</strong> for <strong>Shri Ram Janki Mandir</strong> has been recorded in the sacred chronicle (Ref: <span className="font-mono text-amber-900 font-bold">{pledgeId}</span>).
              </p>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-stone-700 max-w-md mx-auto">
                <p>
                  As soon as the official bank account of <strong>Shri Ram Janki Mandir &amp; Charitable Trust</strong> is active, you will receive priority notification with direct UPI/NEFT details and Section 80G tax receipt access.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setPledgeSubmitted(false)}
                  className="px-4 py-2 border border-stone-300 hover:bg-stone-100 rounded-xl text-xs font-semibold"
                >
                  Submit Another Pledge
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────────
              CASE 2: DONATION MODULE IS ENABLED (LIVE PAYMENT GATEWAY)
             ──────────────────────────────────────────────────────────── */}
          {isDonationEnabled && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. CHOOSE CAUSE */}
              <div>
                <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 font-serif">
                  1. Choose Sacred Cause / Seva Fund:
                </label>
                <div className="space-y-2">
                  {campaigns.map((camp) => (
                    <label
                      key={camp.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                        selectedCampaignId === camp.id
                          ? 'border-amber-600 bg-amber-50/80 ring-1 ring-amber-500 font-semibold'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="cause"
                          checked={selectedCampaignId === camp.id}
                          onChange={() => setSelectedCampaignId(camp.id)}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-xs sm:text-sm text-stone-900">{camp.title}</span>
                      </div>
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {Math.round((camp.raisedAmount / camp.targetAmount) * 100)}% raised
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. AMOUNT */}
              <div>
                <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 font-serif">
                  2. Donation Amount (INR):
                </label>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {quickAmounts.map((amt) => {
                    const isSelected = !customAmount && amount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2 px-1 text-center rounded-xl font-bold text-xs border transition ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-white text-stone-800 border-amber-200 hover:bg-amber-50'
                        }`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    );
                  })}
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-500 text-sm font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="100"
                    placeholder="Enter custom amount (min ₹100)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm font-semibold"
                  />
                </div>
              </div>

              {/* 3. DEVOTEE DETAILS (FOR 80G TAX EXEMPTION) */}
              <div className="space-y-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950 uppercase tracking-wider font-serif">
                    3. Devotee Details (For Official 80G Receipt):
                  </span>
                  <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    Form 10BE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      PAN Number (Required for 80G Tax Benefit)
                    </label>
                    <input
                      type="text"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      className="w-full p-2 text-xs rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-500 focus:outline-none uppercase font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="devotee@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Mobile Number (For WhatsApp Receipt) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Postal Address
                  </label>
                  <input
                    type="text"
                    placeholder="City, State, PIN"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* 4. SANKALP & DEDICATION */}
              <div className="space-y-3">
                <span className="block text-xs font-bold text-amber-950 uppercase tracking-wider font-serif">
                  4. Sacred Sankalpam / Dedication (Optional):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Family Gotra
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kashyapa / Vashistha"
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-stone-300"
                    >
                      <option>General Devotion</option>
                      <option>Birthday Blessing</option>
                      <option>Wedding Anniversary</option>
                      <option>In Memory of Ancestors (Pitru Seva)</option>
                      <option>Health &amp; Peace Prayer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Personal Prayer or Names for Archana
                  </label>
                  <input
                    type="text"
                    placeholder="Include names of family members to be chanted in morning sankalpam"
                    value={dedicationText}
                    onChange={(e) => setDedicationText(e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              {/* 5. PAYMENT METHOD */}
              <div className="space-y-3">
                <span className="block text-xs font-bold text-amber-950 uppercase tracking-wider font-serif">
                  5. Select Payment Gateway:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'UPI', label: 'UPI / GPay / PhonePe', icon: <QrCode className="w-4 h-4" /> },
                    { id: 'Card', label: 'Credit / Debit Card', icon: <CreditCard className="w-4 h-4" /> },
                    { id: 'NetBanking', label: 'NetBanking', icon: <Building className="w-4 h-4" /> },
                    { id: 'QR', label: 'Scan Static Mandir QR', icon: <QrCode className="w-4 h-4 text-emerald-600" /> },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setPaymentMethod(mode.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition ${
                        paymentMethod === mode.id
                          ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-500'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {mode.icon}
                      <span className="text-center">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm sm:text-base rounded-full shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-200" />
                  <span>
                    {isProcessing ? 'Processing Sacred Offering...' : `Contribute ₹${finalAmount.toLocaleString('en-IN')} Now`}
                  </span>
                </button>
                <div className="text-center mt-2.5 text-[11px] text-stone-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-bit Bank Grade Security • Computerized Form 10BE Receipt Generated Instantly</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
