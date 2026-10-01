export interface DonationModuleSettings {
  isEnabled: boolean; // default: false (as bank account in the name of trust is not yet created)
  reason: string;
  statusBadge: string;
  trustAccountStatus: 'PENDING_CREATION' | 'UNDER_VERIFICATION' | 'ACTIVE_LIVE';
  bankName: string;
  accountName: string;
  accountNumber?: string;
  ifsc?: string;
  upiId?: string;
  expectedDate?: string;
  allowPledges: boolean;
  contactPerson: string;
  contactPhone: string;
}

export interface DevoteePledge {
  id: string;
  donorName: string;
  donorPhone: string;
  donorEmail: string;
  sevaType: string;
  pledgedAmount: number;
  gotra?: string;
  sankalpamNote?: string;
  createdAt: string;
}

const SETTINGS_KEY = 'srjm_donation_settings_v2';
const PLEDGES_KEY = 'srjm_devotee_pledges_v2';

export const DEFAULT_DONATION_SETTINGS: DonationModuleSettings = {
  isEnabled: false, // Default DISABLED as requested by user
  statusBadge: 'Trust Bank Account Creation In Progress',
  reason:
    'The online donation & payment gateway is temporarily paused as the official bank account in the name of "Shri Ram Janki Mandir & Charitable Trust" is currently undergoing statutory creation and verification. Devotees may submit their Seva Sankalp (Pledge) to receive direct notification as soon as the account is activated.',
  trustAccountStatus: 'PENDING_CREATION',
  bankName: 'State Bank of India',
  accountName: 'Shri Ram Janki Mandir & Charitable Trust',
  accountNumber: 'Opening in progress',
  ifsc: 'Pending activation',
  upiId: 'shriramjankimandir@sbi (Under registration)',
  expectedDate: 'Coming Soon upon Trust Registration finalization',
  allowPledges: true,
  contactPerson: 'Trust Secretary & Seva Coordinator',
  contactPhone: '+91 (022) 2854-3901 / +91 98201 54321',
};

export const INITIAL_DEVOTEE_PLEDGES: DevoteePledge[] = [
  {
    id: 'PLG-101',
    donorName: 'Dr. Raghunath Tiwari',
    donorPhone: '+91 98201 11223',
    donorEmail: 'dr.tiwari@example.com',
    sevaType: 'Nitya Anna Daanam',
    pledgedAmount: 5100,
    gotra: 'Bharadwaja',
    sankalpamNote: 'For health and wellbeing of entire family',
    createdAt: '2026-09-28T10:30:00.000Z',
  },
  {
    id: 'PLG-102',
    donorName: 'Smt. Shanti Devi & Family',
    donorPhone: '+91 94150 99887',
    donorEmail: 'shantidevi@example.com',
    sevaType: 'Sanctum Shikhara Kalash Seva',
    pledgedAmount: 11000,
    gotra: 'Kashyapa',
    sankalpamNote: 'Dedicated to Bhagwan Shri Ram on Ram Navami',
    createdAt: '2026-09-30T15:45:00.000Z',
  },
];

export function getDonationSettings(): DonationModuleSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_DONATION_SETTINGS;
    return { ...DEFAULT_DONATION_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_DONATION_SETTINGS;
  }
}

export function saveDonationSettings(settings: DonationModuleSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    // Trigger custom event so any active views re-render
    window.dispatchEvent(new CustomEvent('srjm_donation_settings_changed', { detail: settings }));
  } catch (err) {
    console.error('Failed to save donation settings', err);
  }
}

export function getDevoteePledges(): DevoteePledge[] {
  try {
    const raw = localStorage.getItem(PLEDGES_KEY);
    if (!raw) return INITIAL_DEVOTEE_PLEDGES;
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEVOTEE_PLEDGES;
  }
}

export function saveDevoteePledge(pledge: Omit<DevoteePledge, 'id' | 'createdAt'>): DevoteePledge {
  const newPledge: DevoteePledge = {
    ...pledge,
    id: `PLG-${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = getDevoteePledges();
    const updated = [newPledge, ...existing];
    localStorage.setItem(PLEDGES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('srjm_devotee_pledges_changed', { detail: updated }));
  } catch (err) {
    console.error('Failed to save devotee pledge', err);
  }

  return newPledge;
}
