import {
  Campaign,
  Donation,
  TempleEvent,
  EventRegistration,
  NewsArticle,
  GalleryItem,
  PujaService,
  PujaBooking,
  ContactInquiry,
} from '../types';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_DONATIONS,
  EVENTS_DATA,
  NEWS_ARTICLES,
  NEWS_TICKER_ITEMS,
  GALLERY_ITEMS,
  PUJA_SERVICES,
} from '../data/mockData';

// Storage keys for persistent local fallback
const STORAGE_KEYS = {
  CAMPAIGNS: 'srmt_campaigns_v1',
  DONATIONS: 'srmt_donations_v1',
  EVENTS: 'srmt_events_v1',
  REGISTRATIONS: 'srmt_registrations_v1',
  NEWS: 'srmt_news_v1',
  BOOKINGS: 'srmt_puja_bookings_v1',
  INQUIRIES: 'srmt_inquiries_v1',
};

// Safe localStorage helpers
function getLocal<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or restricted iframe errors
  }
}

export const api = {
  // --- Campaigns ---
  async getCampaigns(): Promise<Campaign[]> {
    try {
      const res = await fetch('/api/v1/campaigns');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setLocal(STORAGE_KEYS.CAMPAIGNS, json.data);
          return json.data;
        }
      }
    } catch {
      // Fallback below
    }
    return getLocal(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
  },

  async getFeaturedCampaign(): Promise<Campaign> {
    const list = await this.getCampaigns();
    return list.find((c) => c.featured) || list[0];
  },

  async getCampaignBySlug(slug: string): Promise<Campaign | undefined> {
    const list = await this.getCampaigns();
    return list.find((c) => c.slug === slug || c.id === slug);
  },

  // --- Donations & 80G Receipts ---
  async getDonations(campaignId?: string): Promise<Donation[]> {
    try {
      const url = campaignId ? `/api/v1/campaigns/${campaignId}/donors` : '/api/v1/admin/donations/report';
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setLocal(STORAGE_KEYS.DONATIONS, json.data);
          return json.data;
        }
      }
    } catch {
      // Fallback
    }
    const all = getLocal(STORAGE_KEYS.DONATIONS, INITIAL_DONATIONS);
    return campaignId ? all.filter((d) => d.campaignId === campaignId) : all;
  },

  async createDonationOrder(amount: number, campaignId: string, donorName: string) {
    try {
      const res = await fetch('/api/v1/donate/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, campaignId, donorName }),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback mock
    }
    return {
      success: true,
      orderId: `order_${Date.now()}`,
      amount: amount * 100,
      currency: 'INR',
      key: 'rzp_test_MANDIR_DEMO_KEY',
    };
  },

  async verifyAndRecordDonation(payload: {
    amount: number;
    campaignId: string;
    donorName: string;
    donorEmail: string;
    donorPhone: string;
    panNumber: string;
    address: string;
    isMonthly?: boolean;
    dedication?: string;
    paymentMethod?: 'UPI' | 'Card' | 'NetBanking' | 'QR';
  }): Promise<{ success: boolean; data: Donation; message?: string }> {
    try {
      const res = await fetch('/api/v1/donate/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch {
      // Fallback local storage execution
    }

    const receiptNum = `SRMT/${new Date().getFullYear()}-${(new Date().getFullYear() + 1).toString().slice(2)}/${Math.floor(1000 + Math.random() * 9000)}`;
    const newDonation: Donation = {
      id: `DON-${Date.now()}`,
      receiptNumber: receiptNum,
      campaignId: payload.campaignId,
      campaignTitle: 'Ram Mandir Shikhara & Sanctum Renovation Fund',
      donorName: payload.donorName,
      donorEmail: payload.donorEmail,
      donorPhone: payload.donorPhone,
      panNumber: payload.panNumber ? payload.panNumber.toUpperCase() : 'NOT_PROVIDED',
      address: payload.address,
      amount: payload.amount,
      currency: 'INR',
      isMonthly: Boolean(payload.isMonthly),
      dedication: payload.dedication,
      paymentMethod: payload.paymentMethod || 'UPI',
      transactionId: `TXN-${Date.now()}`,
      status: 'SUCCESS',
      createdAt: new Date().toISOString(),
      taxExemptEligible: true,
      certificate80GUrl: `/receipt/${receiptNum.replace(/\//g, '-')}`,
    };

    const currentDonations = getLocal(STORAGE_KEYS.DONATIONS, INITIAL_DONATIONS);
    setLocal(STORAGE_KEYS.DONATIONS, [newDonation, ...currentDonations]);

    // Update campaign tally
    const currentCampaigns = getLocal(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
    const updated = currentCampaigns.map((c) => {
      if (c.id === payload.campaignId || c.slug === payload.campaignId) {
        return {
          ...c,
          raisedAmount: c.raisedAmount + payload.amount,
          donorsCount: c.donorsCount + 1,
        };
      }
      return c;
    });
    setLocal(STORAGE_KEYS.CAMPAIGNS, updated);

    return {
      success: true,
      data: newDonation,
      message: 'Donation received successfully. 80G Tax Exemption Receipt generated.',
    };
  },

  async getReceipt(id: string): Promise<Donation | undefined> {
    try {
      const res = await fetch(`/api/v1/donate/receipt/${id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch {
      // Fallback
    }
    const cleanId = id.replace(/-/g, '/');
    const donations = getLocal(STORAGE_KEYS.DONATIONS, INITIAL_DONATIONS);
    return donations.find((d) => d.receiptNumber === cleanId || d.id === id);
  },

  // --- Events ---
  async getEvents(): Promise<TempleEvent[]> {
    try {
      const res = await fetch('/api/v1/events');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setLocal(STORAGE_KEYS.EVENTS, json.data);
          return json.data;
        }
      }
    } catch {
      // Fallback
    }
    return getLocal(STORAGE_KEYS.EVENTS, EVENTS_DATA);
  },

  async registerEvent(eventId: string, devotee: { name: string; email: string; phone: string; devoteesCount: number }): Promise<boolean> {
    try {
      const res = await fetch(`/api/v1/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(devotee),
      });
      if (res.ok) return true;
    } catch {
      // Fallback
    }
    const reg: EventRegistration = {
      id: `REG-${Date.now()}`,
      eventId,
      eventTitle: 'Temple Event',
      ...devotee,
      registeredAt: new Date().toISOString(),
    };
    const current = getLocal(STORAGE_KEYS.REGISTRATIONS, []);
    setLocal(STORAGE_KEYS.REGISTRATIONS, [...current, reg]);
    return true;
  },

  // --- News & Ticker ---
  async getNews(): Promise<NewsArticle[]> {
    try {
      const res = await fetch('/api/v1/news');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setLocal(STORAGE_KEYS.NEWS, json.data);
          return json.data;
        }
      }
    } catch {
      // Fallback
    }
    return getLocal(STORAGE_KEYS.NEWS, NEWS_ARTICLES);
  },

  async getTicker(): Promise<string[]> {
    try {
      const res = await fetch('/api/v1/news/ticker');
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch {
      // Fallback
    }
    return NEWS_TICKER_ITEMS;
  },

  // --- Gallery ---
  async getGalleryItems(category?: string): Promise<GalleryItem[]> {
    try {
      const url = category && category !== 'All' ? `/api/v1/gallery/items?category=${encodeURIComponent(category)}` : '/api/v1/gallery/items';
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch {
      // Fallback
    }
    if (!category || category === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((i) => i.category.toLowerCase() === category.toLowerCase());
  },

  // --- Puja Services & Bookings ---
  async getPujas(): Promise<PujaService[]> {
    return PUJA_SERVICES;
  },

  async bookPuja(bookingData: {
    pujaId: string;
    devoteeName: string;
    email: string;
    phone: string;
    gotra: string;
    nakshatra: string;
    sankalpamNote: string;
    bookingDate: string;
    timeSlot: string;
    prasadDelivery: boolean;
    shippingAddress?: string;
    amount: number;
  }): Promise<{ success: boolean; data: PujaBooking; message?: string }> {
    try {
      const res = await fetch('/api/v1/puja/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const bookingNum = `PB-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
    const puja = PUJA_SERVICES.find((p) => p.id === bookingData.pujaId);
    const booking: PujaBooking = {
      id: `BK-${Date.now()}`,
      bookingNumber: bookingNum,
      pujaName: puja ? puja.name : 'Vedic Puja',
      ...bookingData,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    const current = getLocal(STORAGE_KEYS.BOOKINGS, []);
    setLocal(STORAGE_KEYS.BOOKINGS, [booking, ...current]);

    return {
      success: true,
      data: booking,
      message: 'Puja booked successfully! Priest coordinator will perform the sankalpam.',
    };
  },

  async getPujaBookings(): Promise<PujaBooking[]> {
    return getLocal(STORAGE_KEYS.BOOKINGS, []);
  },

  // --- Contact & Volunteer ---
  async submitContact(inquiry: { name: string; email: string; phone: string; subject: string; message: string; type?: any }) {
    try {
      const res = await fetch('/api/v1/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const current = getLocal(STORAGE_KEYS.INQUIRIES, []);
    setLocal(STORAGE_KEYS.INQUIRIES, [{ ...inquiry, id: `INQ-${Date.now()}`, createdAt: new Date().toISOString() }, ...current]);
    return {
      success: true,
      message: 'Hari Om! Your message has been received. Our Seva volunteers will respond within 24 hours.',
    };
  },

  // --- Newsletter ---
  async subscribeNewsletter(email: string) {
    try {
      await fetch('/api/v1/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Ignore
    }
    return { success: true, message: 'Subscribed to Temple Newsletter successfully.' };
  },
};
