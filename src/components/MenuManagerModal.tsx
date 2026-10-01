import React, { useState } from 'react';
import {
  X,
  Sliders,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Layout,
  CheckCircle2,
  Flame,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { MenuSettings, NavItemConfig, NavTabId } from '../types';
import { PHASE_PRESETS, saveMenuSettings, DEFAULT_NAV_ITEMS } from '../data/menuConfig';
import { getDonationSettings, saveDonationSettings, DonationModuleSettings } from '../data/donationSettings';

interface MenuManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: MenuSettings;
  onUpdateSettings: (newSettings: MenuSettings) => void;
}

export const MenuManagerModal: React.FC<MenuManagerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  const [localSettings, setLocalSettings] = useState<MenuSettings>(settings);
  const [donationSettings, setDonationSettings] = useState<DonationModuleSettings>(getDonationSettings());
  const [savedMessage, setSavedMessage] = useState(false);

  // Sync state when opened
  React.useEffect(() => {
    setLocalSettings(settings);
    setDonationSettings(getDonationSettings());
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleApplyPreset = (presetKey: 'phase1' | 'phase2' | 'phase3') => {
    const preset = PHASE_PRESETS[presetKey];
    if (!preset) return;

    const newItems = localSettings.items.map((item) => ({
      ...item,
      enabled: preset.enabledIds.includes(item.id),
    }));

    const updated: MenuSettings = {
      phase: presetKey,
      items: newItems,
    };
    setLocalSettings(updated);
    onUpdateSettings(updated);
    saveMenuSettings(updated);

    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  const handleToggleItem = (id: NavTabId) => {
    // Keep 'home' always enabled so user is never stuck
    if (id === 'home') return;

    const newItems = localSettings.items.map((item) => {
      if (item.id === id) {
        return { ...item, enabled: !item.enabled };
      }
      return item;
    });

    const updated: MenuSettings = {
      phase: 'custom',
      items: newItems,
    };
    setLocalSettings(updated);
    onUpdateSettings(updated);
    saveMenuSettings(updated);

    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handleResetDefaults = () => {
    handleApplyPreset('phase1');
  };

  const enabledCount = localSettings.items.filter((it) => it.enabled).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden my-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/25">
              <Sliders className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif-title">
                Navigation Menu &amp; Launch Phase Control
              </h3>
              <p className="text-xs text-amber-100/90 font-light">
                Configure enabled tabs for Shri Ram Janki Mandir
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Phase 1 Highlight banner */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Phase-1 Standard Active</span>
              </div>
              <p className="text-xs text-stone-700">
                Phase-1 displays <strong>Home</strong>, <strong>About Temple &amp; God</strong>, and a separate dedicated <strong>Aarti &amp; Darshan</strong> section, with continuous <strong>Seva Payment Interlinking</strong>.
              </p>
            </div>
            <button
              onClick={() => handleApplyPreset('phase1')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                localSettings.phase === 'phase1'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-white text-amber-900 border border-amber-300 hover:bg-amber-100'
              }`}
            >
              {localSettings.phase === 'phase1' && <Check className="w-3.5 h-3.5" />}
              <span>Apply Phase-1 Setup</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              1-Click Phase Presets
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Preset 1 */}
              <button
                onClick={() => handleApplyPreset('phase1')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  localSettings.phase === 'phase1'
                    ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-stone-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">Phase 1 (Active)</span>
                    {localSettings.phase === 'phase1' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Home, About Temple &amp; God, Aarti + Seva Pay
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-amber-800 mt-2 block">
                  3 Content Tabs + Seva
                </span>
              </button>

              {/* Preset 2 */}
              <button
                onClick={() => handleApplyPreset('phase2')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  localSettings.phase === 'phase2'
                    ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-stone-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">Phase 2</span>
                    {localSettings.phase === 'phase2' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    + Pujas &amp; Festivals Calendar
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-amber-800 mt-2 block">
                  4 Content Tabs
                </span>
              </button>

              {/* Preset 3 */}
              <button
                onClick={() => handleApplyPreset('phase3')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  localSettings.phase === 'phase3'
                    ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-stone-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">Phase 3 (Full)</span>
                    {localSettings.phase === 'phase3' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    All Campaigns, 360°, CMS &amp; Ledger
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-amber-800 mt-2 block">
                  All 8 Tabs
                </span>
              </button>
            </div>
          </div>

          {/* Donation Module & Trust Bank Account Master Switch */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-700 fill-amber-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-950 font-serif">
                  Online Donation Module (Trust Account Status)
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    donationSettings.isEnabled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-800 text-white'
                  }`}
                >
                  {donationSettings.isEnabled ? 'Live Active' : 'Disabled (A/C Pending)'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-tight">
                {donationSettings.isEnabled
                  ? 'Payment gateway active: Devotees can pay via UPI, QR, NetBanking and get Form 10BE receipts.'
                  : 'Currently paused: Bank account under creation in name of Shri Ram Janki Mandir & Charitable Trust.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const updated: DonationModuleSettings = {
                  ...donationSettings,
                  isEnabled: !donationSettings.isEnabled,
                  trustAccountStatus: !donationSettings.isEnabled ? 'ACTIVE_LIVE' : 'PENDING_CREATION',
                  statusBadge: !donationSettings.isEnabled
                    ? 'Online Payment Gateway Active'
                    : 'Trust Bank Account Creation In Progress',
                };
                setDonationSettings(updated);
                saveDonationSettings(updated);
                setSavedMessage(true);
                setTimeout(() => setSavedMessage(false), 2000);
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                donationSettings.isEnabled ? 'bg-emerald-600' : 'bg-stone-400'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  donationSettings.isEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Individual Item Toggles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Individual Menu Toggles ({enabledCount} active)
              </label>
              <button
                onClick={handleResetDefaults}
                className="text-[11px] text-stone-500 hover:text-amber-800 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Phase-1</span>
              </button>
            </div>

            <div className="space-y-2">
              {localSettings.items.map((item) => {
                const isHome = item.id === 'home';
                return (
                  <div
                    key={item.id}
                    onClick={() => !isHome && handleToggleItem(item.id)}
                    className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      item.enabled
                        ? 'border-amber-300 bg-amber-50/30'
                        : 'border-stone-200 bg-stone-50 opacity-65 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                          item.enabled
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {item.order}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-stone-900">
                            {item.label}
                          </span>
                          <span className="text-[11px] font-serif text-amber-800">
                            ({item.hindi})
                          </span>
                          {item.badge && (
                            <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          {item.isAction && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">
                              Payment Interlink
                            </span>
                          )}
                          {isHome && (
                            <span className="text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.2 rounded font-semibold">
                              Mandatory
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        disabled={isHome}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                          item.enabled ? 'bg-amber-700' : 'bg-stone-300'
                        } ${isHome ? 'opacity-80 cursor-not-allowed' : ''}`}
                        aria-label={`Toggle ${item.label}`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            item.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Design Harmony Guarantee Notice */}
          <div className="bg-stone-900 text-stone-300 p-4 rounded-2xl border border-stone-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Layout className="w-4 h-4" />
              <span>Fluid Design Guarantee</span>
            </div>
            <p className="leading-relaxed text-stone-400">
              The navbar uses a self-centering, segmented layout engine. Whether <strong>2 items</strong> are active (Phase-1) or all <strong>8 items</strong> are active, margins, paddings, and alignment remain geometrically balanced without stretching, breaking, or awkward gaps.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-600">
            {savedMessage && (
              <span className="text-emerald-700 font-bold flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-4 h-4" /> Changes applied instantly!
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
