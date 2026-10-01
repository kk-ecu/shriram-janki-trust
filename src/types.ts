export interface Milestone {
  id: string;
  amount: number;
  title: string;
  targetDate: string;
  completed: boolean;
  completedDate?: string;
}

export interface CampaignUpdate {
  id: string;
  date: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
}

export interface DonorTier {
  id: string;
  name: string;
  amount: number;
  icon: string;
  description: string;
  benefits?: string[];
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Renovation' | 'Annadanam' | 'Goshala' | 'Education' | 'Temple Construction';
  targetAmount: number;
  raisedAmount: number;
  donorsCount: number;
  daysRemaining: number;
  featured: boolean;
  bannerImage: string;
  description: string;
  milestones: Milestone[];
  updates: CampaignUpdate[];
  tiers: DonorTier[];
}

export interface Donation {
  id: string;
  receiptNumber: string;
  campaignId: string;
  campaignTitle: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  panNumber: string;
  address: string;
  amount: number;
  currency: string;
  isMonthly: boolean;
  dedication?: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'QR';
  transactionId: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  createdAt: string;
  taxExemptEligible: boolean; // 80G eligibility
  certificate80GUrl?: string;
}

export interface TempleEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'Festival' | 'Puja' | 'Charity' | 'Discourse' | 'Cultural';
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  isHappeningNow?: boolean;
  liveStreamUrl?: string;
  maxAttendees: number;
  registeredCount: number;
  bannerImage: string;
  organizer: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  devoteesCount: number;
  registeredAt: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: 'Announcements' | 'Festivals' | 'Charity Reports' | 'Construction Updates' | 'Spiritual' | 'Community';
  publishedDate: string;
  readTime: string;
  featured?: boolean;
  imageUrl: string;
  author: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  albumSlug: string;
  category: 'Temple Views' | 'Festivals' | 'Charity' | 'Construction' | 'Daily Darshan' | 'Virtual Tour';
  imageUrl: string;
  type: 'image' | 'video' | '360';
  caption: string;
  date: string;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  itemCount: number;
  featured?: boolean;
}

export interface PujaService {
  id: string;
  name: string;
  sanskritName?: string;
  deity: string;
  description: string;
  benefits: string;
  duration: string;
  suggestedDakshina: number;
  frequency: 'Daily' | 'Special' | 'Monthly' | 'Custom';
  icon: string;
  imageUrl?: string;
  includesPrasad?: boolean;
  samagriIncluded?: string[];
}

export interface PujaBooking {
  id: string;
  bookingNumber: string;
  pujaId: string;
  pujaName: string;
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
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'General' | 'Volunteer' | 'Seva' | 'Priest Booking';
  createdAt: string;
}

export interface DailyAartiSchedule {
  name: string;
  hindiName: string;
  time: string;
  description: string;
}

export type NavTabId =
  | 'home'
  | 'about'
  | 'aarti'
  | 'donate'
  | 'campaigns'
  | 'events'
  | 'pujas'
  | 'news'
  | 'gallery'
  | 'admin';

export interface NavItemConfig {
  id: NavTabId;
  label: string;
  hindi: string;
  enabled: boolean;
  isAction?: boolean; // opens modal / trigger action directly
  badge?: string;
  isLive?: boolean;
  order: number;
  description?: string;
}

export interface MenuSettings {
  phase: 'phase1' | 'phase2' | 'phase3' | 'custom';
  items: NavItemConfig[];
}
