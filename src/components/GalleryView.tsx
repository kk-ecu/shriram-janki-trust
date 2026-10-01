import React, { useState, useEffect } from 'react';
import {
  Camera,
  Compass,
  Sparkles,
  Maximize2,
  X,
  Play,
  RotateCw,
  Eye,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { GalleryItem, GalleryAlbum } from '../types';
import { api } from '../api/client';
import { GALLERY_ALBUMS } from '../data/mockData';

export const GalleryView: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [panAngle, setPanAngle] = useState(0);

  useEffect(() => {
    async function load() {
      const data = await api.getGalleryItems(selectedCategory);
      setItems(data);
    }
    load();
  }, [selectedCategory]);

  const categories = [
    { id: 'All', label: 'All Photos' },
    { id: 'Temple Views', label: 'Temple Views 🕉️' },
    { id: 'Festivals', label: 'Festivals 🎉' },
    { id: 'Charity', label: 'Charity 🤝' },
    { id: 'Construction', label: 'Construction 🏗️' },
    { id: 'Daily Darshan', label: 'Daily Darshan 🪔' },
    { id: 'Virtual Tour', label: 'Virtual Tour 🔲' },
  ];

  const featuredAlbum: GalleryAlbum = GALLERY_ALBUMS[0];

  return (
    <div className="bg-[#FFFDF9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title */}
        <div className="pb-4 border-b border-amber-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-1">
            <Camera className="w-3.5 h-3.5 text-amber-700" />
            <span>Divine Visuals &amp; Heritage Chronicle</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
            Temple Gallery &amp; 360° Virtual Darshan
          </h1>
        </div>

        {/* Category Filter Pills (as in wireframe) */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (cat.id === 'Virtual Tour') setIsVirtualTourOpen(true);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-amber-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── FEATURED ALBUM BANNER (as in ASCII wireframe) ── */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-200 bg-stone-900 text-white group">
          <div className="relative h-[280px] sm:h-[360px] w-full">
            <img
              src={featuredAlbum.coverImage}
              alt={featuredAlbum.title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            <div className="absolute top-4 left-4 bg-amber-800/80 backdrop-blur-xs text-amber-200 text-xs px-3 py-1 rounded-full font-bold uppercase">
              Featured Album
            </div>

            <div className="absolute bottom-6 left-6 right-6 max-w-2xl">
              <span className="text-xs text-amber-300 font-semibold tracking-wider uppercase">
                {featuredAlbum.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-white mt-1 mb-2">
                "Shree Ram Mandir — Dawn &amp; Golden Shikhara Views"
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm mb-4 line-clamp-2">
                {featuredAlbum.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedCategory('Temple Views')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Album → 48 Photos</span>
                </button>
                <button
                  onClick={() => setIsVirtualTourOpen(true)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition border border-white/30 flex items-center gap-1.5"
                >
                  <Compass className="w-4 h-4 text-amber-300" />
                  <span>360° Virtual Darshan</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── ALBUMS GRID (specified in ASCII wireframe) ── */}
        <div>
          <h3 className="text-base font-bold font-serif-title text-stone-900 mb-4 flex items-center gap-2">
            <span>── TEMPLE ALBUMS ──</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {GALLERY_ALBUMS.map((alb) => (
              <div
                key={alb.slug}
                onClick={() => setSelectedCategory(alb.category)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-amber-200/80 shadow-xs hover:shadow-md transition"
              >
                <div className="relative h-32 overflow-hidden bg-stone-100">
                  <img
                    src={alb.coverImage}
                    alt={alb.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Camera className="w-2.5 h-2.5" />
                    <span>{alb.itemCount}📷</span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-xs text-stone-900 truncate group-hover:text-amber-800 transition">
                    {alb.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">{alb.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PHOTO ITEMS (Masonry/Grid) ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold font-serif-title text-stone-900">
              Photos &amp; Darshan Highlights ({items.length})
            </h3>
            <span className="text-xs text-stone-500">Click photo to enlarge &amp; view darshan info</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="group relative rounded-xl overflow-hidden shadow-xs hover:shadow-md border border-stone-200 bg-stone-900 cursor-pointer aspect-4/3"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] text-amber-300 font-semibold uppercase">{item.category}</span>
                  <h4 className="text-xs font-bold leading-snug">{item.title}</h4>
                  <p className="text-[10px] text-stone-300 line-clamp-1">{item.caption}</p>
                </div>
                {item.type === '360' && (
                  <div className="absolute top-2 right-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Compass className="w-2.5 h-2.5" />
                    <span>360°</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── VIRTUAL TOUR 360° PROMO SECTION (specified in ASCII wireframe) ── */}
        <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-700/60">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-amber-800/80 px-3 py-1 rounded-full text-xs font-bold text-amber-200">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Interactive Digital Darshan</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-amber-100">
              🔲 Virtual Tour: Explore the Temple in 360°
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Experience the sanctum sanctorum, gopuram, parikrama pathway, and the Yajnashala through an interactive, multi-angle panoramic tour for devotees worldwide.
            </p>
          </div>

          <button
            onClick={() => setIsVirtualTourOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition shadow-lg shrink-0 flex items-center gap-2 active:scale-95"
          >
            <Compass className="w-4 h-4 text-stone-900" />
            <span>Launch 360° Virtual Sanctum</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
          <div className="relative max-w-4xl w-full bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 text-white hover:text-amber-400 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-5 bg-stone-900 text-white">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {activeLightboxItem.category}
              </span>
              <h3 className="text-lg font-bold font-serif-title mt-1 mb-1">
                {activeLightboxItem.title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {activeLightboxItem.caption}
              </p>
              <span className="text-[11px] text-stone-500 mt-2 block">
                Recorded on {activeLightboxItem.date} • Shree Ram Mandir Archives
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive 360° Virtual Tour Simulator */}
      {isVirtualTourOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-5xl w-full bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/40 text-white">
            <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
                <span className="font-bold text-sm font-serif-title text-amber-200">
                  Inner Sanctum 360° Panoramic Darshan
                </span>
                <span className="text-xs text-stone-400 hidden sm:inline">• Rotate view left/right</span>
              </div>
              <button
                onClick={() => setIsVirtualTourOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 360 Viewport with pan controls */}
            <div className="relative h-[420px] sm:h-[500px] overflow-hidden bg-black flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=2000&q=90"
                alt="360 Sanctum"
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform: `scale(1.2) translateX(${panAngle}px)`,
                }}
              />

              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />

              {/* Sanctum Overlay Info Hotspot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/65 backdrop-blur-sm border border-amber-400/40 p-3 rounded-xl text-center pointer-events-none max-w-xs shadow-lg">
                <span className="text-xl">🛕</span>
                <h4 className="text-sm font-bold text-amber-300 font-serif">Moolasthana (Garbhagriha)</h4>
                <p className="text-[11px] text-stone-200">Prabhu Sri Ram, Mata Sita &amp; Lakshman Ji Alankaram</p>
              </div>

              {/* Navigation Arrows for 360 Rotation */}
              <button
                onClick={() => setPanAngle((prev) => prev + 50)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-amber-300 p-3 rounded-full border border-white/20 transition"
                title="Pan Left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => setPanAngle((prev) => prev - 50)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-amber-300 p-3 rounded-full border border-white/20 transition"
                title="Pan Right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Use arrows to pan 360° • Touch drag supported</span>
              <button
                onClick={() => setPanAngle(0)}
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Reset Center</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
