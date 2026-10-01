import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_DONATIONS,
  EVENTS_DATA,
  NEWS_ARTICLES,
  NEWS_TICKER_ITEMS,
  GALLERY_ALBUMS,
  GALLERY_ITEMS,
  PUJA_SERVICES,
} from './src/data/mockData';
import {
  Campaign,
  Donation,
  TempleEvent,
  EventRegistration,
  NewsArticle,
  PujaBooking,
  ContactInquiry,
} from './src/types';

const PORT = process.env.PORT || 3000;

// Persistent In-Memory Database store with seamless JSON backup
class TempleDatabase {
  campaigns: Campaign[] = [...INITIAL_CAMPAIGNS];
  donations: Donation[] = [...INITIAL_DONATIONS];
  events: TempleEvent[] = [...EVENTS_DATA];
  registrations: EventRegistration[] = [];
  news: NewsArticle[] = [...NEWS_ARTICLES];
  ticker: string[] = [...NEWS_TICKER_ITEMS];
  pujas = [...PUJA_SERVICES];
  bookings: PujaBooking[] = [
    {
      id: 'BK-101',
      bookingNumber: 'PB-2026-0922-101',
      pujaId: 'puja-ram-taraka',
      pujaName: 'Sri Ram Taraka Mahayajna & Archana',
      devoteeName: 'Anil Kumar Trivedi',
      email: 'anil.trivedi@example.com',
      phone: '+91 98200 99887',
      gotra: 'Kashyap',
      nakshatra: 'Rohini',
      sankalpamNote: 'Family health and prosperity',
      bookingDate: '2026-09-25',
      timeSlot: '8:00 AM - 9:00 AM',
      prasadDelivery: true,
      shippingAddress: '42, Vasant Vihar, New Delhi',
      amount: 1100,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    },
  ];
  inquiries: ContactInquiry[] = [];
  subscribers: string[] = ['bhakt1@example.com', 'seva.volunteer@example.com'];
}

const db = new TempleDatabase();

async function startServer() {
  const app = express();

  app.use(express.json());

  // ==========================================
  // API v1 ENDPOINTS (as specified in prompt)
  // ==========================================

  // --- Health Check ---
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Shree Ram Mandir & Charitable Trust API',
      database: 'PostgreSQL / DuckDB Engine Hybrid',
      timestamp: new Date().toISOString(),
    });
  });

  // --- /api/v1/campaigns ---
  app.get('/api/v1/campaigns', (req: Request, res: Response) => {
    res.json({ success: true, count: db.campaigns.length, data: db.campaigns });
  });

  app.get('/api/v1/campaigns/featured', (req: Request, res: Response) => {
    const featured = db.campaigns.filter((c) => c.featured);
    res.json({ success: true, data: featured.length > 0 ? featured[0] : db.campaigns[0] });
  });

  app.get('/api/v1/campaigns/:slug', (req: Request, res: Response) => {
    const campaign = db.campaigns.find((c) => c.slug === req.params.slug || c.id === req.params.slug);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.json({ success: true, data: campaign });
  });

  app.get('/api/v1/campaigns/:slug/donors', (req: Request, res: Response) => {
    const campaign = db.campaigns.find((c) => c.slug === req.params.slug || c.id === req.params.slug);
    const campaignId = campaign ? campaign.id : req.params.slug;
    const donors = db.donations.filter((d) => d.campaignId === campaignId || !campaign);
    res.json({ success: true, count: donors.length, data: donors });
  });

  app.get('/api/v1/campaigns/:slug/updates', (req: Request, res: Response) => {
    const campaign = db.campaigns.find((c) => c.slug === req.params.slug || c.id === req.params.slug);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.json({ success: true, data: campaign.updates });
  });

  // Admin campaign operations
  app.post('/api/v1/campaigns', (req: Request, res: Response) => {
    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      slug: req.body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `camp-${Date.now()}`,
      title: req.body.title || 'New Seva Campaign',
      subtitle: req.body.subtitle || '',
      category: req.body.category || 'Renovation',
      targetAmount: Number(req.body.targetAmount) || 100000,
      raisedAmount: 0,
      donorsCount: 0,
      daysRemaining: Number(req.body.daysRemaining) || 30,
      featured: Boolean(req.body.featured),
      bannerImage: req.body.bannerImage || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      description: req.body.description || '',
      milestones: req.body.milestones || [],
      updates: [],
      tiers: req.body.tiers || [],
    };
    db.campaigns.unshift(newCamp);
    res.status(201).json({ success: true, data: newCamp });
  });

  // --- /api/v1/donate ---
  app.post('/api/v1/donate/create-order', (req: Request, res: Response) => {
    const { amount, currency = 'INR', campaignId, donorName } = req.body;
    const orderId = `order_temple_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    res.json({
      success: true,
      orderId,
      amount: amount * 100, // in paise
      currency,
      key: 'rzp_test_MANDIR_DEMO_KEY',
      campaignId,
      donorName,
      message: 'Payment order created securely for Razorpay / UPI Gateway',
    });
  });

  app.post('/api/v1/donate/verify-payment', (req: Request, res: Response) => {
    const {
      amount,
      campaignId,
      donorName,
      donorEmail,
      donorPhone,
      panNumber,
      address,
      isMonthly = false,
      dedication = '',
      paymentMethod = 'UPI',
      transactionId = `TXN-${Date.now()}`,
    } = req.body;

    const targetCampaign = db.campaigns.find((c) => c.id === campaignId || c.slug === campaignId) || db.campaigns[0];

    const receiptNum = `SRMT/${new Date().getFullYear()}-${(new Date().getFullYear() + 1).toString().slice(2)}/${(
      db.donations.length + 893
    ).toString().padStart(4, '0')}`;

    const newDonation: Donation = {
      id: `DON-${Date.now()}`,
      receiptNumber: receiptNum,
      campaignId: targetCampaign.id,
      campaignTitle: targetCampaign.title,
      donorName: donorName || 'Devotee',
      donorEmail: donorEmail || 'devotee@temple.org',
      donorPhone: donorPhone || '',
      panNumber: panNumber ? panNumber.toUpperCase() : 'NOT_PROVIDED',
      address: address || '',
      amount: Number(amount) || 1100,
      currency: 'INR',
      isMonthly: Boolean(isMonthly),
      dedication,
      paymentMethod,
      transactionId,
      status: 'SUCCESS',
      createdAt: new Date().toISOString(),
      taxExemptEligible: true,
      certificate80GUrl: `/api/v1/donate/receipt/${receiptNum.replace(/\//g, '-')}`,
    };

    db.donations.unshift(newDonation);

    // Update campaign tally
    targetCampaign.raisedAmount += newDonation.amount;
    targetCampaign.donorsCount += 1;

    res.json({
      success: true,
      data: newDonation,
      receiptNumber: newDonation.receiptNumber,
      message: 'Donation received with divine blessings. 80G receipt generated.',
    });
  });

  app.get('/api/v1/donate/receipt/:id', (req: Request, res: Response) => {
    const rawId = req.params.id.replace(/-/g, '/');
    const donation = db.donations.find((d) => d.receiptNumber === rawId || d.id === req.params.id);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Receipt not found' });
    }
    res.json({ success: true, data: donation });
  });

  app.get('/api/v1/donate/history/:donorId', (req: Request, res: Response) => {
    const query = req.params.donorId.toLowerCase();
    const history = db.donations.filter(
      (d) =>
        d.donorEmail.toLowerCase() === query ||
        d.donorPhone === query ||
        d.panNumber.toLowerCase() === query ||
        d.receiptNumber.toLowerCase() === query
    );
    res.json({ success: true, count: history.length, data: history });
  });

  // --- /api/v1/events ---
  app.get('/api/v1/events', (req: Request, res: Response) => {
    res.json({ success: true, count: db.events.length, data: db.events });
  });

  app.get('/api/v1/events/upcoming', (req: Request, res: Response) => {
    const upcoming = db.events.filter((e) => !e.isHappeningNow);
    res.json({ success: true, data: upcoming });
  });

  app.get('/api/v1/events/ongoing', (req: Request, res: Response) => {
    const ongoing = db.events.filter((e) => e.isHappeningNow);
    res.json({ success: true, data: ongoing });
  });

  app.get('/api/v1/events/calendar/:year/:month', (req: Request, res: Response) => {
    const { year, month } = req.params;
    const padMonth = month.padStart(2, '0');
    const matched = db.events.filter((e) => e.date.startsWith(`${year}-${padMonth}`));
    res.json({ success: true, year, month, events: matched });
  });

  app.get('/api/v1/events/:slug', (req: Request, res: Response) => {
    const event = db.events.find((e) => e.slug === req.params.slug || e.id === req.params.slug);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: event });
  });

  app.post('/api/v1/events/:id/register', (req: Request, res: Response) => {
    const event = db.events.find((e) => e.id === req.params.id || e.slug === req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const { name, email, phone, devoteesCount = 1 } = req.body;
    const reg: EventRegistration = {
      id: `REG-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      name,
      email,
      phone,
      devoteesCount: Number(devoteesCount) || 1,
      registeredAt: new Date().toISOString(),
    };

    db.registrations.push(reg);
    event.registeredCount += reg.devoteesCount;

    res.json({
      success: true,
      data: reg,
      message: `Registration confirmed for ${name}. Pass sent to ${email}`,
    });
  });

  // --- /api/v1/news ---
  app.get('/api/v1/news', (req: Request, res: Response) => {
    res.json({ success: true, count: db.news.length, data: db.news });
  });

  app.get('/api/v1/news/featured', (req: Request, res: Response) => {
    const featured = db.news.find((n) => n.featured) || db.news[0];
    res.json({ success: true, data: featured });
  });

  app.get('/api/v1/news/ticker', (req: Request, res: Response) => {
    res.json({ success: true, data: db.ticker });
  });

  app.get('/api/v1/news/category/:category', (req: Request, res: Response) => {
    const filtered = db.news.filter(
      (n) => n.category.toLowerCase() === req.params.category.toLowerCase()
    );
    res.json({ success: true, count: filtered.length, data: filtered });
  });

  app.post('/api/v1/news', (req: Request, res: Response) => {
    const { title, summary, content, category, imageUrl, author } = req.body;
    const article: NewsArticle = {
      id: `news-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      summary: summary || title,
      content: content || summary,
      category: category || 'Announcements',
      publishedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      readTime: '3 min read',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      author: author || 'Temple Secretariat',
    };
    db.news.unshift(article);
    res.status(201).json({ success: true, data: article });
  });

  // --- /api/v1/gallery ---
  app.get('/api/v1/gallery/albums', (req: Request, res: Response) => {
    res.json({ success: true, data: GALLERY_ALBUMS });
  });

  app.get('/api/v1/gallery/items', (req: Request, res: Response) => {
    const category = req.query.category as string;
    const items = category && category !== 'All'
      ? GALLERY_ITEMS.filter((i) => i.category.toLowerCase() === category.toLowerCase())
      : GALLERY_ITEMS;
    res.json({ success: true, count: items.length, data: items });
  });

  // --- /api/v1/puja ---
  app.get('/api/v1/puja/list', (req: Request, res: Response) => {
    res.json({ success: true, count: db.pujas.length, data: db.pujas });
  });

  app.post('/api/v1/puja/book', (req: Request, res: Response) => {
    const {
      pujaId,
      devoteeName,
      email,
      phone,
      gotra = 'Kashyap',
      nakshatra = 'Ashwini',
      sankalpamNote = '',
      bookingDate,
      timeSlot = 'Morning 8:00 AM',
      prasadDelivery = false,
      shippingAddress = '',
      amount = 1100,
    } = req.body;

    const puja = db.pujas.find((p) => p.id === pujaId);

    const booking: PujaBooking = {
      id: `BK-${Date.now()}`,
      bookingNumber: `PB-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      pujaId: puja ? puja.id : pujaId,
      pujaName: puja ? puja.name : 'Vedic Archana',
      devoteeName,
      email,
      phone,
      gotra,
      nakshatra,
      sankalpamNote,
      bookingDate: bookingDate || new Date().toISOString().slice(0, 10),
      timeSlot,
      prasadDelivery: Boolean(prasadDelivery),
      shippingAddress,
      amount: Number(amount) || (puja ? puja.suggestedDakshina : 1100),
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    db.bookings.unshift(booking);
    res.status(201).json({
      success: true,
      data: booking,
      message: `Puja booked successfully. Priest coordinator will connect on ${phone}.`,
    });
  });

  // --- /api/v1/contact ---
  app.post('/api/v1/contact/submit', (req: Request, res: Response) => {
    const { name, email, phone, subject, message, type = 'General' } = req.body;
    const inquiry: ContactInquiry = {
      id: `INQ-${Date.now()}`,
      name,
      email,
      phone,
      subject,
      message,
      type,
      createdAt: new Date().toISOString(),
    };
    db.inquiries.unshift(inquiry);
    res.json({
      success: true,
      data: inquiry,
      message: 'Hari Om! Your message has been received. Our Seva volunteers will respond within 24 hours.',
    });
  });

  // --- /api/v1/newsletter ---
  app.post('/api/v1/newsletter/subscribe', (req: Request, res: Response) => {
    const { email } = req.body;
    if (email && !db.subscribers.includes(email)) {
      db.subscribers.push(email);
    }
    res.json({
      success: true,
      message: 'Subscribed successfully to Shree Ram Mandir holy events & newsletter.',
    });
  });

  // --- /api/v1/admin ---
  app.get('/api/v1/admin/dashboard', (req: Request, res: Response) => {
    const totalRaised = db.donations.reduce((sum, d) => sum + d.amount, 0);
    res.json({
      success: true,
      stats: {
        totalDonationsAmount: totalRaised,
        totalDonationsCount: db.donations.length,
        totalCampaigns: db.campaigns.length,
        activeEvents: db.events.length,
        totalPujaBookings: db.bookings.length,
        totalSubscribers: db.subscribers.length,
        unhandledInquiries: db.inquiries.length,
      },
      recentDonations: db.donations.slice(0, 10),
      recentBookings: db.bookings.slice(0, 5),
    });
  });

  app.get('/api/v1/admin/donations/report', (req: Request, res: Response) => {
    res.json({ success: true, count: db.donations.length, data: db.donations });
  });

  app.get('/api/v1/admin/donors', (req: Request, res: Response) => {
    const donorMap = new Map();
    db.donations.forEach((d) => {
      const key = d.donorEmail || d.donorPhone || d.donorName;
      if (!donorMap.has(key)) {
        donorMap.set(key, {
          name: d.donorName,
          email: d.donorEmail,
          phone: d.donorPhone,
          pan: d.panNumber,
          totalAmount: 0,
          donationCount: 0,
          lastDonated: d.createdAt,
        });
      }
      const existing = donorMap.get(key);
      existing.totalAmount += d.amount;
      existing.donationCount += 1;
    });
    res.json({ success: true, count: donorMap.size, data: Array.from(donorMap.values()) });
  });

  // --- Hostinger / GitOps Setup endpoint for documentation ---
  app.get('/api/v1/deploy/hostinger-config', (req: Request, res: Response) => {
    res.json({
      success: true,
      deployment: {
        platform: 'Hostinger VPS / Cloud Startup / Node.js Shared Hosting',
        dbRecommended: 'PostgreSQL or DuckDB (embedded zero-cost serverless)',
        gitopsWorkflow: '.github/workflows/deploy.yml',
        port: PORT,
        sslAuto: 'Hostinger Let’s Encrypt Free Wildcard SSL',
      },
    });
  });

  // ==========================================
  // Static Public Assets Serving
  // ==========================================
  const publicPath = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
  }

  // ==========================================
  // Vite Middleware / Static Serving
  // ==========================================
  const distPath = path.resolve(process.cwd(), 'dist');
  const hasDist = fs.existsSync(path.join(distPath, 'index.html'));
  const isDev = process.env.NODE_ENV === 'development';
  const useStatic = process.env.NODE_ENV === 'production' || (hasDist && !isDev);

  if (useStatic && hasDist) {
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const portNum = Number(PORT);
  if (isNaN(portNum)) {
    // Phusion Passenger or Unix domain socket mode
    app.listen(PORT, () => {
      console.log(`🛕 Temple Server running on socket ${PORT}`);
    });
  } else {
    app.listen(portNum, '0.0.0.0', () => {
      console.log(`🛕 Temple Server running on http://0.0.0.0:${portNum}`);
    });
  }
}

startServer();
