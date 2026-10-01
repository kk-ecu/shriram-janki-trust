import { NavItemConfig, MenuSettings } from '../types';

export const DEFAULT_NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'home',
    label: 'Home',
    hindi: 'मुख्य पृष्ठ',
    enabled: true,
    order: 1,
    description: 'Welcome darshan, sacred highlights, and temple overview',
  },
  {
    id: 'about',
    label: 'About Temple & Deities',
    hindi: 'मंदिर एवं देव परिचय',
    enabled: true,
    order: 2,
    description: 'Sacred history, architecture, Bhagwan Shri Ram, Mata Janki, Lakshman & Hanuman Ji',
  },
  {
    id: 'aarti',
    label: 'Aarti & Darshan',
    hindi: 'आरती एवं दर्शन',
    enabled: true,
    order: 3,
    description: 'Daily 5 Aarti schedules, Mangala to Shayan, stuti mantras & aarti seva sponsorship',
  },
  {
    id: 'donate',
    label: 'Offer Seva (Payment)',
    hindi: 'दान एवं सेवा',
    enabled: true,
    isAction: true,
    badge: '80G',
    order: 4,
    description: 'Instant online Seva offering with 50% 80G Tax Exemption receipt',
  },
  {
    id: 'campaigns',
    label: 'Renovation Fund',
    hindi: 'दान अभियान',
    enabled: false, // Disabled for Phase-1
    badge: '75%',
    order: 5,
    description: 'Mandir Shikhara and sanctum restoration milestone funding',
  },
  {
    id: 'events',
    label: 'Events & Live',
    hindi: 'उत्सव एवं दर्शन',
    enabled: false, // Disabled for Phase-1
    isLive: true,
    order: 6,
    description: 'Upcoming festivals, Navratri, Ram Navami, and sanctum live streams',
  },
  {
    id: 'pujas',
    label: 'Book Puja',
    hindi: 'पूजा सेवा',
    enabled: false, // Disabled for Phase-1
    order: 7,
    description: 'Gotra and Nakshatra sankalpam pujas with prasad delivery',
  },
  {
    id: 'news',
    label: 'News Bulletin',
    hindi: 'समाचार',
    enabled: false, // Disabled for Phase-1
    order: 8,
    description: 'Trust announcements, seva dispatches, and circulars',
  },
  {
    id: 'gallery',
    label: '360° Darshan',
    hindi: 'दर्शन',
    enabled: false, // Disabled for Phase-1
    order: 9,
    description: 'Virtual sanctum walkthrough and festival photographs',
  },
  {
    id: 'admin',
    label: 'Trust Admin',
    hindi: 'प्रबंधन',
    enabled: false, // Disabled for Phase-1, always accessible via footer/direct link
    order: 10,
    description: 'Trust ledger, 80G Form 10BE export, and menu settings',
  },
];

export const PHASE_PRESETS: Record<string, { name: string; description: string; enabledIds: string[] }> = {
  phase1: {
    name: 'Phase 1: Foundation (Home, About & Aarti)',
    description: 'Clean launch with Home, full About Temple & God, separate dedicated Aarti schedule & stutis, and direct Seva payment.',
    enabledIds: ['home', 'about', 'aarti', 'donate'],
  },
  phase2: {
    name: 'Phase 2: Pujas & Festival Events',
    description: 'Adds Vedic Puja booking, festival calendar, and live sanctum broadcast.',
    enabledIds: ['home', 'about', 'aarti', 'donate', 'pujas', 'events'],
  },
  phase3: {
    name: 'Phase 3: Grand Consecration (All Features)',
    description: 'Enables Renovation campaigns, 360° virtual tour, news ticker, and trust audit console.',
    enabledIds: ['home', 'about', 'aarti', 'donate', 'campaigns', 'events', 'pujas', 'news', 'gallery', 'admin'],
  },
};

const STORAGE_KEY = 'shri_ram_janki_mandir_menu_config_v3';

export function loadMenuSettings(): MenuSettings {
  if (typeof window === 'undefined') {
    return { phase: 'phase1', items: DEFAULT_NAV_ITEMS };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Default to phase 1
      const initialItems = DEFAULT_NAV_ITEMS.map((item) => ({
        ...item,
        enabled: PHASE_PRESETS.phase1.enabledIds.includes(item.id),
      }));
      return { phase: 'phase1', items: initialItems };
    }

    const parsed: MenuSettings = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) {
      // Merge with default items in case of missing or added ids (like new 'aarti' tab)
      const mergedItems = DEFAULT_NAV_ITEMS.map((defaultItem) => {
        const found = parsed.items.find((i) => i.id === defaultItem.id);
        return found ? { ...defaultItem, ...found } : defaultItem;
      });
      return {
        phase: parsed.phase || 'custom',
        items: mergedItems,
      };
    }
  } catch (err) {
    console.error('Failed to load menu config from localStorage', err);
  }

  return { phase: 'phase1', items: DEFAULT_NAV_ITEMS };
}

export function saveMenuSettings(settings: MenuSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save menu config to localStorage', err);
  }
}
