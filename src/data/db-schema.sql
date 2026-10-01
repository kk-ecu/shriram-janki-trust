-- ========================================================
-- Shree Ram Mandir & Charitable Trust Database Schema
-- Compatible with PostgreSQL 14+ and DuckDB
-- Open Source, Zero License Cost
-- ========================================================

-- 1. Campaigns & Building Funds
CREATE TABLE IF NOT EXISTS campaigns (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    category VARCHAR(64) NOT NULL, -- 'Renovation', 'Annadanam', 'Goshala', 'Education'
    target_amount NUMERIC(12, 2) NOT NULL,
    raised_amount NUMERIC(12, 2) DEFAULT 0.00,
    donors_count INTEGER DEFAULT 0,
    days_remaining INTEGER DEFAULT 30,
    featured BOOLEAN DEFAULT FALSE,
    banner_image TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Donations & 80G Tax Exemption Certificates
CREATE TABLE IF NOT EXISTS donations (
    id VARCHAR(64) PRIMARY KEY,
    receipt_number VARCHAR(64) UNIQUE NOT NULL, -- e.g. 'SRMT/2026-27/0892'
    campaign_id VARCHAR(64) REFERENCES campaigns(id),
    donor_name VARCHAR(128) NOT NULL,
    donor_email VARCHAR(128) NOT NULL,
    donor_phone VARCHAR(32),
    pan_number VARCHAR(16), -- Required for Indian 80G Form 10BE
    address TEXT,
    amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(8) DEFAULT 'INR',
    is_monthly BOOLEAN DEFAULT FALSE,
    dedication TEXT,
    payment_method VARCHAR(32) DEFAULT 'UPI', -- 'UPI', 'Card', 'NetBanking', 'QR'
    transaction_id VARCHAR(128),
    status VARCHAR(32) DEFAULT 'SUCCESS',
    tax_exempt_eligible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Temple Events & Live Darshan
CREATE TABLE IF NOT EXISTS events (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(64), -- 'Festival', 'Puja', 'Charity', 'Discourse'
    event_date DATE NOT NULL,
    event_time VARCHAR(64),
    venue VARCHAR(128),
    is_happening_now BOOLEAN DEFAULT FALSE,
    live_stream_url TEXT,
    max_attendees INTEGER DEFAULT 500,
    registered_count INTEGER DEFAULT 0,
    banner_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Event Registrations
CREATE TABLE IF NOT EXISTS event_registrations (
    id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) REFERENCES events(id),
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    phone VARCHAR(32),
    devotees_count INTEGER DEFAULT 1,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Puja & Seva Bookings
CREATE TABLE IF NOT EXISTS puja_bookings (
    id VARCHAR(64) PRIMARY KEY,
    booking_number VARCHAR(64) UNIQUE NOT NULL,
    puja_id VARCHAR(64) NOT NULL,
    puja_name VARCHAR(128) NOT NULL,
    devotee_name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    phone VARCHAR(32),
    gotra VARCHAR(64),
    nakshatra VARCHAR(64),
    sankalpam_note TEXT,
    booking_date DATE NOT NULL,
    time_slot VARCHAR(64),
    prasad_delivery BOOLEAN DEFAULT FALSE,
    shipping_address TEXT,
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'CONFIRMED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. News & Announcements CMS
CREATE TABLE IF NOT EXISTS news_articles (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT,
    category VARCHAR(64),
    published_date VARCHAR(32),
    read_time VARCHAR(32),
    featured BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    author VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
    email VARCHAR(128) PRIMARY KEY,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Contact & Volunteer Inquiries
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    phone VARCHAR(32),
    subject VARCHAR(255),
    message TEXT,
    inquiry_type VARCHAR(64) DEFAULT 'General',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
