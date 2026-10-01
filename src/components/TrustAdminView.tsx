import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Download,
  FileSpreadsheet,
  Plus,
  Users,
  Heart,
  Calendar,
  Sparkles,
  CheckCircle,
  Eye,
  RefreshCw,
  Sliders,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Phone,
  Mail,
  Send,
  Building,
} from 'lucide-react';
import { Campaign, Donation, TempleEvent, MenuSettings } from '../types';
import { api } from '../api/client';
import {
  getDonationSettings,
  saveDonationSettings,
  getDevoteePledges,
  DonationModuleSettings,
  DevoteePledge,
} from '../data/donationSettings';

interface TrustAdminViewProps {
  onSelectReceipt: (receipt: Donation) => void;
  openDonateModal: () => void;
  menuSettings?: MenuSettings;
  openMenuManager?: () => void;
}

export const TrustAdminView: React.FC<TrustAdminViewProps> = ({
  onSelectReceipt,
  openDonateModal,
  menuSettings,
  openMenuManager,
}) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [events, setEvents] = useState<TempleEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Donation Module Settings State
  const [donationSettings, setDonationSettings] = useState<DonationModuleSettings>(getDonationSettings());
  const [pledges, setPledges] = useState<DevoteePledge[]>(getDevoteePledges());
  const [settingsSavedAlert, setSettingsSavedAlert] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    const dons = await api.getDonations();
    const camps = await api.getCampaigns();
    const evts = await api.getEvents();
    setDonations(dons);
    setCampaigns(camps);
    setEvents(evts);
    setPledges(getDevoteePledges());
    setDonationSettings(getDonationSettings());
    setLoading(false);
  };

  useEffect(() => {
    loadAll();

    const pledgeHandler = (e: Event) => {
      const custom = e as CustomEvent<DevoteePledge[]>;
      if (custom.detail) setPledges(custom.detail);
    };
    const settingsHandler = (e: Event) => {
      const custom = e as CustomEvent<DonationModuleSettings>;
      if (custom.detail) setDonationSettings(custom.detail);
    };

    window.addEventListener('srjm_devotee_pledges_changed', pledgeHandler);
    window.addEventListener('srjm_donation_settings_changed', settingsHandler);

    return () => {
      window.removeEventListener('srjm_devotee_pledges_changed', pledgeHandler);
      window.removeEventListener('srjm_donation_settings_changed', settingsHandler);
    };
  }, []);

  const totalDonationsAmount = donations.reduce((acc, d) => acc + d.amount, 0);
  const totalPledgedAmount = pledges.reduce((acc, p) => acc + p.pledgedAmount, 0);

  // Toggle Donation Module Status
  const handleToggleDonationModule = (enable: boolean) => {
    const updated: DonationModuleSettings = {
      ...donationSettings,
      isEnabled: enable,
      trustAccountStatus: enable ? 'ACTIVE_LIVE' : 'PENDING_CREATION',
      statusBadge: enable ? 'Online Payment Gateway Active' : 'Trust Bank Account Creation In Progress',
    };
    setDonationSettings(updated);
    saveDonationSettings(updated);
    setSettingsSavedAlert(true);
    setTimeout(() => setSettingsSavedAlert(false), 3000);
  };

  // Export 80G Form 10BE CSV
  const handleExportCSV = () => {
    const headers = [
      'Receipt Number',
      'Date',
      'Donor Name',
      'PAN Number',
      'Amount (INR)',
      'Cause',
      'Payment Mode',
      'Txn Reference',
      'Address',
    ];

    const rows = donations.map((d) => [
      `"${d.receiptNumber}"`,
      `"${new Date(d.createdAt).toISOString().slice(0, 10)}"`,
      `"${d.donorName}"`,
      `"${d.panNumber}"`,
      d.amount,
      `"${d.campaignTitle}"`,
      `"${d.paymentMethod}"`,
      `"${d.transactionId}"`,
      `"${d.address.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Shri_Ram_Janki_Mandir_Donations_Report_80G_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Devotee Pledges CSV
  const handleExportPledgesCSV = () => {
    const headers = ['Pledge ID', 'Date', 'Devotee Name', 'Mobile / WhatsApp', 'Email', 'Seva Type', 'Pledged Amount (INR)', 'Gotra', 'Sankalpam'];
    const rows = pledges.map((p) => [
      `"${p.id}"`,
      `"${new Date(p.createdAt).toISOString().slice(0, 10)}"`,
      `"${p.donorName}"`,
      `"${p.donorPhone}"`,
      `"${p.donorEmail}"`,
      `"${p.sevaType}"`,
      p.pledgedAmount,
      `"${p.gotra || ''}"`,
      `"${(p.sankalpamNote || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Shri_Ram_Janki_Mandir_Devotee_Pledges_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const enabledCount = menuSettings ? menuSettings.items.filter((it) => it.enabled).length : 3;

  return (
    <div className="bg-[#FFFDF9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Trust Board Administrative Console • Shri Ram Janki Mandir</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
              Charity Audit, Bank Account &amp; Seva Controls
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {openMenuManager && (
              <button
                onClick={openMenuManager}
                className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-200" />
                <span>Configure Menu &amp; Phases</span>
              </button>
            )}
            <button
              onClick={loadAll}
              className="p-2 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export 80G (CSV)</span>
            </button>
          </div>
        </div>

        {/* ── SPECIAL SECTION: TRUST BANK ACCOUNT & ONLINE DONATION CONTROLS ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full font-serif">
                  Master Switch • Online Donation Module
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    donationSettings.isEnabled
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {donationSettings.isEnabled ? '● Active & Live' : '○ Disabled (Trust A/C Pending)'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-stone-900">
                Trust Bank Account &amp; Payment Gateway Activation
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                As the trust bank account is currently being registered under the name <strong>"Shri Ram Janki Mandir &amp; Charitable Trust"</strong>, keep this module disabled to gracefully invite devotee pledges. Once the bank account is opened, toggle to <strong>Enabled</strong> to activate live payments.
              </p>
            </div>

            {/* Live Toggle Button */}
            <div className="bg-stone-50 border border-amber-300 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-2">
                Current Module State
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleDonationModule(false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    !donationSettings.isEnabled
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                  }`}
                >
                  Disabled
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleDonationModule(!donationSettings.isEnabled)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${
                    donationSettings.isEnabled ? 'bg-emerald-600' : 'bg-amber-700'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                      donationSettings.isEnabled ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </button>

                <button
                  onClick={() => handleToggleDonationModule(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    donationSettings.isEnabled
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                  }`}
                >
                  Active
                </button>
              </div>
              {settingsSavedAlert && (
                <span className="text-[10px] text-emerald-700 font-bold mt-2 animate-bounce">
                  ✓ Settings Saved Successfully!
                </span>
              )}
            </div>
          </div>

          {/* Current Bank & Regulatory Status Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold uppercase tracking-wide">
                <Building className="w-3.5 h-3.5" />
                <span>Designated Trust Account Name</span>
              </div>
              <div className="font-semibold text-stone-900 text-sm">
                Shri Ram Janki Mandir &amp; Charitable Trust
              </div>
              <div className="text-stone-500 text-[11px]">
                Registered under Public Trust Act 1984
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold uppercase tracking-wide">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Bank Verification Status</span>
              </div>
              <div className="font-semibold text-stone-900 text-sm">
                {donationSettings.isEnabled ? 'Verified & Operational' : 'Documentation & Signatory Setup'}
              </div>
              <div className="text-stone-500 text-[11px]">
                State Bank of India • Designated Devotee Branch
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold uppercase tracking-wide">
                <Users className="w-3.5 h-3.5" />
                <span>Devotee Pre-Pledges Collected</span>
              </div>
              <div className="font-semibold text-stone-900 text-sm">
                {pledges.length} Devotees (₹{totalPledgedAmount.toLocaleString('en-IN')})
              </div>
              <div className="text-stone-500 text-[11px]">
                Ready for notification once active
              </div>
            </div>
          </div>
        </div>

        {/* Devotee Pre-Registration & Seva Pledges Log (Collected while module is disabled) */}
        <div className="bg-white rounded-3xl border border-amber-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                <h3 className="font-bold text-base font-serif-title text-stone-900">
                  Devotee Seva Pledges &amp; Intent Chronicle
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Devotees who registered their seva intentions while the bank account was under setup. Contact them once live.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={openDonateModal}
                className="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition"
              >
                + Record Devotee Pledge
              </button>
              <button
                onClick={handleExportPledgesCSV}
                className="text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Pledges (CSV)</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 font-serif">
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Devotee Name</th>
                  <th className="p-3">Contact Number</th>
                  <th className="p-3">Pledged Amount</th>
                  <th className="p-3">Seva Cause</th>
                  <th className="p-3">Gotra</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Sankalpam Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {pledges.map((p) => (
                  <tr key={p.id} className="hover:bg-amber-50/40 transition">
                    <td className="p-3 font-mono font-bold text-amber-900">{p.id}</td>
                    <td className="p-3 font-semibold text-stone-900">{p.donorName}</td>
                    <td className="p-3 font-mono text-stone-700">{p.donorPhone}</td>
                    <td className="p-3 font-bold text-stone-900">₹{p.pledgedAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-stone-700">{p.sevaType}</td>
                    <td className="p-3 text-stone-500 font-serif">{p.gotra || '—'}</td>
                    <td className="p-3 text-stone-500 whitespace-nowrap">
                      {new Date(p.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="p-3 text-stone-600 italic max-w-[200px] truncate">{p.sankalpamNote || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phase-1 Launch & Menu Configuration Controller Banner */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl p-5 border border-amber-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                {menuSettings?.phase === 'phase1' ? 'Phase-1 Mode Active' : 'Custom Menu Config'}
              </span>
              <span className="text-xs text-stone-600">
                ({enabledCount} Tabs Active in Navigation)
              </span>
            </div>
            <h3 className="font-bold text-base text-stone-900 font-serif-title">
              Dynamic Navigation &amp; Launch Permutations Controller
            </h3>
            <p className="text-xs text-stone-600 max-w-2xl">
              Configured for <strong>Phase-1</strong>: Only <strong>Home</strong> and <strong>About &amp; Aarti</strong> are shown to devotees, with seamless <strong>Seva Payment Interlinking</strong>. The design auto-balances so no layout ever distorts.
            </p>
          </div>

          {openMenuManager && (
            <button
              onClick={openMenuManager}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0 flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-amber-200" />
              <span>Manage Menu Visibility</span>
            </button>
          )}
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Total Seva Collections
            </span>
            <div className="text-2xl font-black font-serif-title text-stone-900 mt-1">
              ₹{totalDonationsAmount.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              ✓ 100% Tax Deductible (80G)
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Total Devotee Offerings
            </span>
            <div className="text-2xl font-black font-serif-title text-stone-900 mt-1">
              {donations.length} Receipts
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">
              With Unique Form 10BE Numbers
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Pledged by Devotees
            </span>
            <div className="text-2xl font-black font-serif-title text-stone-900 mt-1">
              ₹{totalPledgedAmount.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-amber-800 font-semibold mt-1 block">
              {pledges.length} Pledges Under Setup
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Consecrated Deities
            </span>
            <div className="text-2xl font-black font-serif-title text-stone-900 mt-1">
              Ram Parivar
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">
              Shri Ram • Sita • Lakshman • Hanuman
            </span>
          </div>
        </div>

        {/* Master Donations Log Table */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-base font-serif-title text-stone-900">
                Official Donations Ledger &amp; 80G Certificates
              </h3>
              <p className="text-xs text-stone-500">
                Click "View 80G Receipt" to inspect or reprint any devotee certificate.
              </p>
            </div>
            <button
              onClick={openDonateModal}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg"
            >
              + Record Offline / Cash Donation
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-serif">
                  <th className="p-3">Receipt No</th>
                  <th className="p-3">Devotee Name</th>
                  <th className="p-3">PAN No</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Cause</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-amber-50/50 transition">
                    <td className="p-3 font-mono font-bold text-amber-950">{d.receiptNumber}</td>
                    <td className="p-3 font-semibold text-stone-900">{d.donorName}</td>
                    <td className="p-3 font-mono text-stone-600">{d.panNumber}</td>
                    <td className="p-3 font-bold text-stone-900">
                      ₹{d.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-stone-600 truncate max-w-[150px]">{d.campaignTitle}</td>
                    <td className="p-3 text-stone-500">
                      <span className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-[10px]">
                        {d.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3 text-stone-500 whitespace-nowrap">
                      {new Date(d.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onSelectReceipt(d)}
                        className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-bold bg-amber-100/70 hover:bg-amber-100 px-2.5 py-1 rounded-md transition"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View 80G</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Database Architecture Notice (DuckDB & Postgres) */}
        <div className="bg-stone-900 text-stone-300 rounded-2xl p-6 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400">
              ● Hostinger GitOps Deployment &amp; DuckDB/PostgreSQL Engine
            </span>
            <span className="text-[11px] text-stone-400">Port 3000 • Production Ready</span>
          </div>
          <p className="text-xs leading-relaxed text-stone-300">
            This system runs with an active REST API Gateway on <code className="text-amber-300">/api/v1</code>. All database schemas are pre-written in <code className="text-amber-300">src/data/db-schema.sql</code> for seamless DuckDB or PostgreSQL initialization on Hostinger VPS.
          </p>
        </div>
      </div>
    </div>
  );
};
