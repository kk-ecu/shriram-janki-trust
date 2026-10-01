import React, { useState } from 'react';
import { Sun, Sparkles, Volume2, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

// Verified, pristine local images of Bhagwan Shri Ram & Ram Parivar
export const RAM_PARIVAR_IMAGES = {
  // Bhagwan Maryada Purushottam Shri Ram (Direct high resolution portrait)
  lordRam: '/assets/images/lord_ram.jpg',
  shriRam: '/assets/images/lord_ram.jpg',
  // Sacred Ram Parivar (Rama, Sita, Lakshman, Hanuman)
  parivarDarbar: '/assets/images/ram_parivar.jpg',
  ramDarbarPanchayat: '/assets/images/ram_parivar.jpg',
  // Ayodhya Shri Ram Mandir Sanctum Sanctorum & Grand Shikhara
  ayodhyaRamMandir: '/assets/images/ayodhya_mandir.jpg',
  // Mata Janki
  mataJanki: '/assets/images/ram_parivar.jpg',
  // Bhaktaraj Hanuman
  hanumanJi: '/assets/images/ram_parivar.jpg',
};

/**
 * Rich consecrated SVG Darbar of Ram Parivar:
 * Bhagwan Shri Ram, Mata Sita, Shri Lakshman Ji, and Bhaktaraj Hanuman Ji.
 * Guaranteed to render pristinely in any environment with zero external dependencies.
 */
export const RamParivarSVG: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 1000 620"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bhagwan Shri Ram Parivar: Shri Ram, Mata Sita, Lakshman Ji, and Hanuman Ji"
    >
      <defs>
        <linearGradient id="sanctumSky" x1="500" y1="0" x2="500" y2="620" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1c0f04" />
          <stop offset="40%" stopColor="#3d1e08" />
          <stop offset="75%" stopColor="#5a270a" />
          <stop offset="100%" stopColor="#1a0b02" />
        </linearGradient>

        <radialGradient id="divineAura" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffe899" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#d97706" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="goldArch" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="75%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        <linearGradient id="shriRamSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        <linearGradient id="sitaSaree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>

        <linearGradient id="goldHalo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="50%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="peetambar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        <filter id="divineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <rect width="1000" height="620" fill="url(#sanctumSky)" />
      <circle cx="500" cy="260" r="320" fill="url(#divineAura)" />

      <g stroke="url(#goldArch)" strokeWidth="3" opacity="0.6">
        <path d="M 120 620 L 120 220 Q 120 80 500 70 Q 880 80 880 220 L 880 620" fill="none" />
        <path d="M 160 620 L 160 230 Q 160 110 500 100 Q 840 110 840 230 L 840 620" fill="none" strokeWidth="1.5" />
      </g>

      <g transform="translate(500, 70)">
        <circle cx="0" cy="0" r="35" fill="#f59e0b" filter="url(#divineGlow)" opacity="0.8" />
        <circle cx="0" cy="0" r="28" fill="#78350f" stroke="#fde047" strokeWidth="2" />
        <text x="0" y="9" textAnchor="middle" fill="#fef08a" fontSize="24" fontFamily="serif" fontWeight="bold">ॐ</text>
        <path d="M -12 -35 L 12 -35 L 8 -52 L -8 -52 Z" fill="#f59e0b" stroke="#fde047" strokeWidth="1.5" />
        <polygon points="0,-64 6,-52 -6,-52" fill="#eab308" />
      </g>

      {/* Lotus Pedestal */}
      <g transform="translate(500, 560)">
        <path d="M -340 40 L 340 40 L 320 15 L -320 15 Z" fill="#b45309" stroke="#fcd34d" strokeWidth="2" />
        {[-280, -210, -140, -70, 0, 70, 140, 210, 280].map((x, i) => (
          <path
            key={i}
            d={`M ${x - 30} 15 Q ${x} -15 ${x + 30} 15 Z`}
            fill="#f43f5e"
            stroke="#fef08a"
            strokeWidth="1.5"
            opacity="0.9"
          />
        ))}
      </g>

      {/* BHAKTARAJ HANUMAN JI */}
      <g transform="translate(360, 420)">
        <circle cx="0" cy="20" r="40" fill="url(#goldHalo)" opacity="0.6" filter="url(#divineGlow)" />
        <path d="M -25 50 C -35 80, -40 120, -20 135 C 10 145, 40 145, 45 130 C 50 100, 35 60, 20 50 Z" fill="#ea580c" stroke="#fcd34d" strokeWidth="1.5" />
        <path d="M -5 38 L 15 38 L 10 20 L -2 20 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
        <line x1="-35" y1="30" x2="-55" y2="130" stroke="#f59e0b" strokeWidth="4" />
        <circle cx="-35" cy="30" r="14" fill="#fcd34d" stroke="#b45309" strokeWidth="2" />
        <circle cx="0" cy="8" r="18" fill="#fed7aa" />
        <polygon points="-12,-4 0,-24 12,-4" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />
        <text x="0" y="145" textAnchor="middle" fill="#fed7aa" fontSize="11" fontFamily="serif" fontWeight="bold">श्री हनुमान</text>
      </g>

      {/* SHRI LAKSHMAN JI */}
      <g transform="translate(300, 180)">
        <circle cx="0" cy="65" r="50" fill="url(#goldHalo)" opacity="0.8" />
        <circle cx="0" cy="65" r="24" fill="#fde68a" stroke="#ca8a04" strokeWidth="1" />
        <line x1="0" y1="52" x2="0" y2="62" stroke="#dc2626" strokeWidth="2" />
        <polygon points="-18,48 0,18 18,48" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
        <path d="M -30 100 L 30 100 L 40 340 L -40 340 Z" fill="#d97706" stroke="#fcd34d" strokeWidth="1.5" />
        <path d="M -45 50 Q -70 200 -45 350" stroke="#fcd34d" strokeWidth="5" fill="none" strokeLinecap="round" />
        <line x1="-45" y1="50" x2="-45" y2="350" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="0" y="375" textAnchor="middle" fill="#fde68a" fontSize="13" fontFamily="serif" fontWeight="bold">श्री लक्ष्मण जी</text>
      </g>

      {/* BHAGWAN MARYADA PURUSHOTTAM SHRI RAM */}
      <g transform="translate(500, 140)">
        <circle cx="0" cy="80" r="78" fill="url(#goldHalo)" opacity="0.95" filter="url(#divineGlow)" />
        <circle cx="0" cy="80" r="66" fill="#fef08a" opacity="0.4" />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={Math.cos(angle) * 78}
              y1={80 + Math.sin(angle) * 78}
              x2={Math.cos(angle) * 94}
              y2={80 + Math.sin(angle) * 94}
              stroke="#fde047"
              strokeWidth="2"
              opacity="0.85"
            />
          );
        })}

        <circle cx="0" cy="80" r="30" fill="url(#shriRamSkin)" stroke="#93c5fd" strokeWidth="1" />
        <path d="M -5 62 L -3 74 L 0 78 L 3 74 L 5 62" fill="none" stroke="#f8fafc" strokeWidth="2" />
        <circle cx="0" cy="72" r="2" fill="#ef4444" />
        <polygon points="-24,60 0,10 24,60" fill="#f59e0b" stroke="#fffbeb" strokeWidth="2.5" />

        <path d="M -45 125 L 45 125 L 55 390 L -55 390 Z" fill="url(#peetambar)" stroke="#fef08a" strokeWidth="2" />
        <path d="M -30 125 C -25 180, 25 180, 30 125" stroke="#f8fafc" strokeWidth="3" fill="none" strokeDasharray="4 3" />
        <circle cx="0" cy="180" r="6" fill="#ef4444" stroke="#fde047" strokeWidth="2" />

        {/* Kodanda Bow */}
        <path d="M -60 40 Q -95 210 -60 410" stroke="#fcd34d" strokeWidth="6" fill="none" strokeLinecap="round" />
        <line x1="-60" y1="40" x2="-60" y2="410" stroke="#fffbeb" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Arrow */}
        <line x1="35" y1="130" x2="65" y2="105" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round" />
        <line x1="60" y1="70" x2="60" y2="160" stroke="#fde047" strokeWidth="3" />

        <text x="0" y="420" textAnchor="middle" fill="#fef08a" fontSize="16" fontFamily="serif" fontWeight="extrabold" letterSpacing="1">
          मर्यादा पुरुषोत्तम श्री राम
        </text>
      </g>

      {/* JAGAT JANANI MATA JANKI */}
      <g transform="translate(680, 180)">
        <circle cx="0" cy="65" r="52" fill="url(#goldHalo)" opacity="0.85" />
        <circle cx="0" cy="65" r="24" fill="#fde68a" stroke="#ca8a04" strokeWidth="1" />
        <circle cx="0" cy="58" r="2.5" fill="#dc2626" />
        <polygon points="-18,48 0,20 18,48" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
        <path d="M -35 100 L 35 100 L 45 350 L -45 350 Z" fill="url(#sitaSaree)" stroke="#fcd34d" strokeWidth="2" />

        <g transform="translate(30, 140)">
          <line x1="0" y1="10" x2="0" y2="40" stroke="#22c55e" strokeWidth="3" />
          <circle cx="0" cy="5" r="10" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1.5" />
        </g>
        <text x="0" y="380" textAnchor="middle" fill="#ffe4e6" fontSize="13" fontFamily="serif" fontWeight="bold">
          माता जानकी (सीता जी)
        </text>
      </g>

      {/* Shloka */}
      <text
        x="500"
        y="605"
        textAnchor="middle"
        fill="#fde047"
        fontSize="13"
        fontFamily="serif"
        letterSpacing="2"
        opacity="0.9"
      >
        ॥ रामाय रामभद्राय रामचन्द्राय वेधसे । रघुनाथाय नाथाय सीतायाः पतये नमः ॥
      </text>
    </svg>
  );
};

/**
 * Hero Centerpiece Visual:
 * Features prominent portraits of BHAGWAN SHRI RAM and RAM PARIVAR
 * with tab toggle to allow devotees to behold either Lord Ram directly or the Ram Parivar Darbar!
 */
export const RamParivarHeroVisual: React.FC<{
  onWatchLive?: () => void;
  onExploreAboutRam?: () => void;
}> = ({ onWatchLive, onExploreAboutRam }) => {
  const [viewMode, setViewMode] = useState<'ram' | 'parivar'>('ram');

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300/90 bg-stone-950 group">
      {/* Top Selector: LORD RAM vs RAM PARIVAR */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1 bg-stone-950/85 backdrop-blur-md rounded-full border border-amber-400/50 shadow-lg">
          <button
            onClick={() => setViewMode('ram')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'ram'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>🏹 भगवान श्री राम (Lord Ram)</span>
          </button>
          <button
            onClick={() => setViewMode('parivar')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'parivar'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>👑 श्री राम दरबार (Ram Parivar)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Live broadcast badge */}
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-amber-400/40 px-3 py-1.5 rounded-full text-white text-xs font-medium shadow-lg">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="text-amber-200 font-semibold text-[11px] sm:text-xs">Live Sanctum Darshan</span>
            {onWatchLive && (
              <button
                onClick={onWatchLive}
                className="ml-1 bg-red-600 hover:bg-red-700 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider transition"
              >
                Watch
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative h-[380px] sm:h-[460px] md:h-[530px] w-full flex items-center justify-center bg-stone-950 overflow-hidden">
        {viewMode === 'ram' ? (
          <img
            src={RAM_PARIVAR_IMAGES.lordRam}
            alt="Bhagwan Maryada Purushottam Shri Ram"
            className="w-full h-full object-cover object-top opacity-95 transition-all duration-700 hover:scale-102"
          />
        ) : (
          <img
            src={RAM_PARIVAR_IMAGES.parivarDarbar}
            alt="Shri Ram Parivar: Ram, Sita, Lakshman, Hanuman"
            className="w-full h-full object-cover object-top opacity-95 transition-all duration-700 hover:scale-102"
          />
        )}

        {/* Ambient Warm Golden Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-amber-950/20 to-stone-950/60 pointer-events-none" />

        {/* Bottom Banner Highlighting Lord Ram & Temple Name */}
        <div className="absolute bottom-5 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white z-10">
          <div className="bg-stone-950/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-amber-400/50 shadow-2xl max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-amber-300 font-serif text-xs uppercase tracking-widest mb-1.5 font-bold">
              <span>ॐ श्री रामचन्द्राय नमः</span>
              <span>•</span>
              <span>मर्यादा पुरुषोत्तम प्रभु श्री राम</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-serif-title text-white tracking-tight leading-tight">
              {viewMode === 'ram'
                ? 'Bhagwan Maryada Purushottam Shri Ram'
                : 'Shri Ram Janki Darbar (Ram Parivar)'}
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1.5 leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
              {viewMode === 'ram'
                ? 'The embodiment of Righteousness (Dharma), supreme compassion, and filial truth. Holding the sacred Kodanda bow and arrow of justice, Prabhu Shri Ram protects all devotees who seek His shelter.'
                : 'Behold the consecrated presence of Bhagwan Shri Ram, Jagat Janani Mata Janki, Sheshavatar Shri Lakshman Ji, and Bhaktaraj Shri Hanuman Ji in holy union.'}
            </p>

            <div className="mt-3 pt-2.5 border-t border-amber-400/30 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-amber-200 font-serif italic">
                "रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः"
              </span>
              {onExploreAboutRam && (
                <button
                  onClick={onExploreAboutRam}
                  className="text-amber-300 hover:text-white font-bold underline flex items-center gap-1"
                >
                  <span>Know More About Lord Ram &amp; Mandir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Universal background watermark motif featuring Bhagwan Shri Ram's sacred picture
 * Elegantly visible across all pages, ensuring Lord Ram's divine presence is always seen.
 */
export const RamWatermarkBg: React.FC<{
  intensity?: 'subtle' | 'normal' | 'vivid';
}> = ({ intensity = 'normal' }) => {
  const opacityClass =
    intensity === 'subtle'
      ? 'opacity-[0.08]'
      : intensity === 'vivid'
      ? 'opacity-[0.25]'
      : 'opacity-[0.16]';

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 ${opacityClass}`}
      aria-hidden="true"
    >
      {/* Background Divine Portrait of Bhagwan Shri Ram */}
      <div className="absolute top-12 right-0 sm:right-6 md:right-12 w-[340px] sm:w-[480px] md:w-[620px] h-[520px] sm:h-[680px] md:h-[840px] rounded-3xl overflow-hidden mix-blend-multiply filter contrast-125">
        <img
          src={RAM_PARIVAR_IMAGES.lordRam}
          alt=""
          className="w-full h-full object-cover object-top mask-radial"
          style={{
            maskImage: 'radial-gradient(circle at 50% 40%, black 50%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 50%, transparent 85%)',
          }}
        />
      </div>

      {/* Symmetrical Left Motif: Sacred Kodanda Bow & Sun Halo */}
      <div className="hidden lg:block absolute top-1/3 left-6 w-[360px] h-[360px]">
        <svg viewBox="0 0 400 400" className="w-full h-full text-amber-900 fill-current opacity-70">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10 10" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 200 40 Q 120 200 200 360" fill="none" stroke="currentColor" strokeWidth="5" />
          <line x1="200" y1="40" x2="200" y2="360" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="160" y1="200" x2="340" y2="200" stroke="currentColor" strokeWidth="4" />
          <polygon points="340,200 325,190 325,210" />
          <text x="200" y="212" textAnchor="middle" fontSize="32" fontFamily="serif" fontWeight="bold">श्री राम</text>
        </svg>
      </div>

      {/* Sacred Mantra Watermark Ribbon in Sanskrit */}
      <div className="absolute bottom-6 left-0 right-0 text-center font-serif text-amber-950 font-bold tracking-[0.3em] text-xs sm:text-sm select-none">
        ॥ मर्यादा पुरुषोत्तम भगवान श्री रामचन्द्राय नमः • सियावर रामचंद्र की जय ॥
      </div>
    </div>
  );
};

/**
 * High-definition Lightbox Darshan Modal for Bhagwan Shri Ram
 */
export const LordRamDarshanLightbox: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onExploreAbout?: () => void;
}> = ({ isOpen, onClose, onExploreAbout }) => {
  const [flowerCount, setFlowerCount] = useState(0);
  const [showFlowerAnimation, setShowFlowerAnimation] = useState(false);

  if (!isOpen) return null;

  const handleOfferFlower = () => {
    setFlowerCount((prev) => prev + 1);
    setShowFlowerAnimation(true);
    setTimeout(() => setShowFlowerAnimation(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-stone-950 text-white rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-amber-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏹</span>
            <div>
              <h3 className="font-serif-title font-bold text-base sm:text-lg text-amber-300">
                साक्षात प्रभु श्री राम दर्शन • Sacred Darshan
              </h3>
              <p className="text-[11px] text-stone-300">
                Bhagwan Maryada Purushottam Shri Ramchandra
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* High-res Image of Lord Ram */}
            <div className="md:col-span-6 relative rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-black max-h-[460px] flex items-center justify-center">
              <img
                src={RAM_PARIVAR_IMAGES.lordRam}
                alt="Bhagwan Shri Ram with Kodanda Bow and Peetambar"
                className="w-full h-full object-contain max-h-[450px]"
              />
              {/* Divine Aura overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Flower Offering Animation */}
              {showFlowerAnimation && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-bounce">
                  <span className="text-6xl filter drop-shadow-lg">🌺 🌸 🌼</span>
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3 text-center bg-stone-950/80 backdrop-blur-xs p-2.5 rounded-xl border border-amber-400/40">
                <span className="text-amber-300 font-serif font-bold text-xs sm:text-sm">
                  ॥ श्री राम जय राम जय जय राम ॥
                </span>
              </div>
            </div>

            {/* Devotional Text & Glories of Lord Ram */}
            <div className="md:col-span-6 space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Maryada Purushottam • मर्यादा पुरुषोत्तम</span>
              </div>

              <h4 className="text-2xl font-serif-title font-extrabold text-white">
                Bhagwan Shri Ram
              </h4>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Prabhu Shri Ram is the supreme manifestation of righteousness, filial duty, and unblemished character. Armed with His unconquerable <strong>Kodanda bow</strong>, He protects Dharma and bestows auspiciousness upon all devotees.
              </p>

              {/* Ram Raksha Shloka */}
              <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 font-serif text-xs leading-relaxed space-y-1">
                <div className="font-bold text-amber-300">॥ राम रक्षा मन्त्र ॥</div>
                <div>आपदामपहर्तारं दातारं सर्वसम्पदाम् ।</div>
                <div>लोकाभिरामं श्रीरामं भूयो भूयो नमाम्यहम् ॥</div>
              </div>

              {/* Interactive Virtual Pushpanjali Flower Offering */}
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-200">
                    Offer Virtual Flowers (पुष्पांजलि)
                  </div>
                  <div className="text-[11px] text-amber-400 font-medium">
                    {flowerCount > 0
                      ? `${flowerCount} Sacred Flowers Offered to Prabhu Ram`
                      : 'Click to offer Pushpanjali'}
                  </div>
                </div>
                <button
                  onClick={handleOfferFlower}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <span>🌸</span>
                  <span>Offer Flower</span>
                </button>
              </div>

              {/* Navigation button to explore more about Lord Ram */}
              {onExploreAbout && (
                <button
                  onClick={() => {
                    onClose();
                    onExploreAbout();
                  }}
                  className="w-full py-2.5 bg-amber-900/60 hover:bg-amber-800 text-amber-200 hover:text-white border border-amber-400/50 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>Read Complete Life &amp; Leela of Bhagwan Shri Ram</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
