import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  User,
  Radio,
  Mail,
  CheckCircle,
  Tag,
  Newspaper,
} from 'lucide-react';
import { NewsArticle } from '../types';
import { api } from '../api/client';

export const NewsView: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [ticker, setTicker] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  // Newsletter subscription
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function load() {
      const articles = await api.getNews();
      setNews(articles);
      const tickerItems = await api.getTicker();
      setTicker(tickerItems);
      if (articles.length > 0) {
        const featured = articles.find((a) => a.featured) || articles[0];
        setActiveArticle(featured);
      }
    }
    load();
  }, []);

  const categories = [
    'All',
    'Announcements',
    'Festivals',
    'Charity Reports',
    'Construction Updates',
    'Spiritual',
    'Community',
  ];

  const filteredNews =
    selectedCategory === 'All'
      ? news
      : news.filter((n) => n.category.toLowerCase() === selectedCategory.toLowerCase());

  const featuredArticle = news.find((n) => n.featured) || news[0];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    await api.subscribeNewsletter(newsletterEmail);
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div className="bg-[#FFFDF9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title */}
        <div className="pb-4 border-b border-amber-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-1">
            <Newspaper className="w-3.5 h-3.5 text-amber-700" />
            <span>Official Dispatches &amp; Transparency Reports</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
            Temple News, Press &amp; Announcements
          </h1>
        </div>

        {/* ── NEWS TICKER (scrolling marquee as requested in ASCII diagram) ── */}
        <div className="bg-amber-950 text-amber-100 rounded-xl px-4 py-2.5 shadow-md flex items-center gap-3 overflow-hidden border border-amber-800">
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400 uppercase tracking-wider shrink-0 bg-amber-900/80 px-2 py-0.5 rounded">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>News Ticker:</span>
          </div>

          <div className="flex-1 overflow-x-auto whitespace-nowrap text-xs text-stone-200 space-x-6 scrollbar-none py-0.5">
            {ticker.map((item, idx) => (
              <span key={idx} className="inline-block">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── FEATURED NEWS BANNER (specified in ASCII wireframe) ── */}
        {featuredArticle && (
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-300/80 bg-stone-900 text-white group">
            <div className="relative h-[260px] sm:h-[340px] w-full">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover opacity-75 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md uppercase">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Featured Dispatch</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1">
                  <span>📅 {featuredArticle.publishedDate}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                  <span>•</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-white">{featuredArticle.category}</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-title text-white leading-tight mb-2">
                  {featuredArticle.title}
                </h2>
                <p className="text-stone-300 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                  {featuredArticle.summary}
                </p>
                <button
                  onClick={() => setActiveArticle(featuredArticle)}
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-xs transition"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── CATEGORY PILLS (as in wireframe: [All] [Announcements] [Festivals] ...) ── */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-amber-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── ARTICLE GRID (Cards) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-amber-200/70 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-amber-200 text-[11px] px-2 py-0.5 rounded font-bold">
                    {article.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <span>{article.publishedDate}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base font-serif-title text-stone-900 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {article.author}
                </span>
                <button
                  onClick={() => setActiveArticle(article)}
                  className="text-amber-800 hover:text-amber-950 font-bold text-xs flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── SUBSCRIBE TO NEWSLETTER (specified in ASCII wireframe: [Subscribe to Newsletter 📧]) ── */}
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 rounded-2xl p-6 sm:p-8 border border-amber-300 text-stone-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-lg font-bold font-serif-title text-stone-900 mb-1 flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-800" />
              <span>Subscribe to Temple Seva &amp; Spiritual Newsletter</span>
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Receive auspicious Panchang updates, monthly Annadanam transparency reports, upcoming puja schedules, and Vedic wisdom directly in your inbox.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Thank you! You are subscribed to divine updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-80">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white shadow-2xs focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shrink-0 shadow-xs transition"
                >
                  Join 📧
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-200 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 font-bold"
            >
              ✕
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-2.5 py-0.5 rounded">
                {activeArticle.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-stone-900 mt-2 mb-2 leading-tight">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>By {activeArticle.author}</span>
                <span>•</span>
                <span>{activeArticle.publishedDate}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            <img
              src={activeArticle.imageUrl}
              alt={activeArticle.title}
              className="w-full h-56 object-cover rounded-xl mb-4 border border-stone-200"
            />

            <div className="prose text-stone-700 text-sm leading-relaxed space-y-3">
              <p className="font-semibold text-stone-900">{activeArticle.summary}</p>
              <p>{activeArticle.content}</p>
              <p>
                The trust extends heartfelt gratitude to all patron families and volunteers whose steadfast support enables these dharmic endeavors to continue uninterrupted.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-5 py-2 rounded-xl"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
