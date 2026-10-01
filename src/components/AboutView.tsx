import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Building,
  Heart,
  QrCode,
  Copy,
  Users,
  Send,
  CheckCircle,
  Flame,
  Landmark,
  Compass,
  BookOpen,
  Award,
  Sun,
  Crown,
} from 'lucide-react';
import { TEMPLE_INFO } from '../data/mockData';
import { api } from '../api/client';
import { RAM_PARIVAR_IMAGES, RamParivarSVG } from './RamParivarArt';

interface AboutViewProps {
  onDonateClick?: (amount?: number, dedication?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onDonateClick }) => {
  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volArea, setVolArea] = useState('Anna Daanam (Kitchen & Food Service)');
  const [volSubmitted, setVolSubmitted] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [activeDeity, setActiveDeity] = useState<'ram' | 'sita' | 'lakshman' | 'hanuman'>('ram');

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.submitContact({
      name: volName,
      email: volEmail,
      phone: volPhone,
      subject: `Volunteer Application: ${volArea}`,
      message: `Devotee wishes to volunteer in ${volArea}.`,
      type: 'VOLUNTEER',
    });
    setVolSubmitted(true);
    setVolName('');
    setVolEmail('');
    setVolPhone('');
    setTimeout(() => setVolSubmitted(false), 4000);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(TEMPLE_INFO.bankDetails.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <div className="bg-[#FFFDF9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Title Header */}
        <div className="pb-6 border-b border-amber-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-2">
            <Landmark className="w-3.5 h-3.5 text-amber-700" />
            <span>Divya Kshetra &amp; Deities • मंदिर एवं देव परिचय</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-title text-stone-900 tracking-tight">
            About Shri Ram Janki Mandir &amp; The Divine Deities
          </h1>
          <p className="text-xs sm:text-base text-stone-600 mt-2 max-w-3xl leading-relaxed">
            A sacred sanctuary consecrated in {TEMPLE_INFO.established}, preserving Sanatana Dharma, authentic Ramanandi Vedic traditions, selfless Annadanam, and the divine presence of Bhagwan Shri Ram, Mata Janki, Lakshman Ji, and Bhaktaraj Hanuman.
          </p>
        </div>

        {/* ── SECTION 1: THE DIVINE DEITIES (GODS) ── */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 font-serif">
              Param Purusha &amp; Divine Incarnations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
              The Consecrated Deities (प्रतिष्ठित देव स्वरूप)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Carved from pristine Makrana marble in accordance with ancient Shilpa Shastra, the consecrated deities radiate supreme peace, boundless mercy, and divine grace.
            </p>
          </div>

          {/* Ram Parivar Darbar Showcase Banner */}
          <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>श्री राम दरबार • Complete Ram Parivar</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-white">
                  The Divine Ram Parivar (प्रभु श्री राम परिवार)
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  The consecrated sanctum of <strong>Shri Ram Janki Mandir</strong> venerates the divine court together in sacred harmony: Bhagwan Maryada Purushottam Shri Ram, Jagat Janani Mata Janki, Sheshavatar Shri Lakshman Ji, and Bhaktaraj Shri Hanuman Ji at Prabhu's lotus feet.
                </p>
                <div className="p-3 bg-stone-950/70 border border-amber-500/30 rounded-xl text-xs text-amber-200 font-serif">
                  "राम लक्ष्मण जानकी, जय बोलो हनुमान की" — Worshipping the Ram Parivar brings peace, removes domestic tribulations, and bestows moral fortitude.
                </div>
              </div>
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-lg bg-stone-900 h-64 sm:h-72">
                <img
                  src="/assets/images/ram_parivar.jpg"
                  alt="Bhagwan Shri Ram Parivar Consecrated Darbar"
                  className="w-full h-full object-cover object-top opacity-95 hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Deity Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-stone-100 rounded-2xl max-w-xl mx-auto border border-stone-200">
            {[
              { id: 'ram', label: 'Bhagwan Shri Ram', hindi: 'भगवान श्री राम' },
              { id: 'sita', label: 'Mata Janki (Sita)', hindi: 'माता जानकी' },
              { id: 'lakshman', label: 'Shri Lakshman Ji', hindi: 'श्री लक्ष्मण जी' },
              { id: 'hanuman', label: 'Bhaktaraj Hanuman', hindi: 'भक्तराज हनुमान' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDeity(d.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeDeity === d.id
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
                }`}
              >
                <span>{d.label}</span>
                <span className="text-[10px] opacity-80 font-serif">({d.hindi})</span>
              </button>
            ))}
          </div>

          {/* Active Deity Detailed Card */}
          <div className="bg-white rounded-3xl border border-amber-200 shadow-md p-6 sm:p-10 overflow-hidden">
            {activeDeity === 'ram' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                    <span>Maryada Purushottam • मर्यादा पुरुषोत्तम</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
                    Bhagwan Shri Ramachandra
                  </h3>
                  <p className="text-stone-700 text-sm leading-relaxed">
                    Bhagwan Shri Ram is the seventh avatar of Bhagwan Vishnu, descended to earth to establish righteousness (Dharma), destroy tyrannical injustice, and guide humanity on the path of truth, filial duty, and supreme compassion.
                  </p>
                  <div className="space-y-2 text-xs text-stone-600 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                    <p>
                      <strong>Divine Form (दिव्य रूप):</strong> He stands holding the sacred Kodanda bow in His left hand and the arrow of justice in His right hand. His lotus-like countenance (Kanja-mukha) and dark cloud-colored complexion (Neel Megha Shyam) inspire eternal calm in every beholder.
                    </p>
                    <p>
                      <strong>Spiritual Significance:</strong> Chanting the holy Ram Naam (तारक मन्त्र) is recognized across all Vedic scriptures as the highest dispeller of worldly suffering, granting liberation (Moksha) and inner peace.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    {onDonateClick && (
                      <button
                        onClick={() => onDonateClick(1100, 'Bhagwan Shri Ram Pushpalankaram')}
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-700 to-orange-700 text-white font-bold text-xs rounded-full shadow-xs transition hover:from-amber-800 hover:to-orange-800 flex items-center gap-2"
                      >
                        <Flame className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                        <span>Offer Ram Seva (₹1,100)</span>
                      </button>
                    )}
                    <span className="text-xs text-stone-500 font-serif italic">
                      "रामो विग्रहवान् धर्मः" — Rama is Dharma incarnate.
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-amber-300 relative bg-stone-900">
                    <img
                      src={RAM_PARIVAR_IMAGES.shriRam}
                      alt="Bhagwan Shri Ram Sanctum"
                      referrerPolicy="no-referrer"
                      className="w-full h-80 object-cover opacity-90"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-xs p-3 rounded-xl text-white text-xs border border-white/20">
                      <div className="font-bold font-serif text-amber-300">Shri Ram Sanctum Sanctorum</div>
                      <div className="text-[11px] text-stone-300">Presided over by Acharyas with unbroken Vedic rituals</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDeity === 'sita' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-900 bg-rose-100 px-3 py-1 rounded-full">
                    <Crown className="w-3.5 h-3.5 text-rose-600" />
                    <span>Jagat Janani Mata Janki • जगत्जननी सीता माता</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
                    Mata Janki (Sita Devi)
                  </h3>
                  <p className="text-stone-700 text-sm leading-relaxed">
                    Mata Janki, the daughter of the sacred soil of Mithila and beloved daughter of Rajarshi Janak, is the incarnation of Mahalakshmi. She represents the zenith of fortitude, unwavering devotion, sacred purity, and universal motherhood.
                  </p>
                  <div className="space-y-2 text-xs text-stone-600 bg-rose-50/50 p-4 rounded-xl border border-rose-200">
                    <p>
                      <strong>Divine Attributes:</strong> Seated gracefully to the left of Bhagwan Shri Ram, Mother Sita showers maternal protection, marital bliss, and spiritual prosperity on all families who seek Her refuge.
                    </p>
                    <p>
                      <strong>Sita Kalyan &amp; Seva:</strong> In our Mandir, special Sita Shringar and Pushpanjali are conducted every Shukla Navami and during Navratri with fragrant jasmine and lotuses.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    {onDonateClick && (
                      <button
                        onClick={() => onDonateClick(1100, 'Mata Janki Shringar Seva')}
                        className="px-5 py-2.5 bg-gradient-to-r from-rose-700 to-amber-700 text-white font-bold text-xs rounded-full shadow-xs transition hover:from-rose-800 hover:to-amber-800 flex items-center gap-2"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-200 text-rose-200" />
                        <span>Sponsor Mata Janki Shringar (₹1,100)</span>
                      </button>
                    )}
                    <span className="text-xs text-stone-500 font-serif italic">
                      "जनकसुता जग जननि जानकी, अतिसय प्रिय करुनानिधान की"
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-rose-300 relative bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&w=800&q=80"
                      alt="Mata Janki Sacred Altar"
                      className="w-full h-80 object-cover opacity-90"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-xs p-3 rounded-xl text-white text-xs border border-white/20">
                      <div className="font-bold font-serif text-rose-300">Shri Janki Devi Alankaram</div>
                      <div className="text-[11px] text-stone-300">Endowed with traditional silver mukuta and golden silk sarees</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDeity === 'lakshman' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sheshavatar &amp; Seva Murti • शेषावतार लक्ष्मण</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
                    Shri Lakshman Ji
                  </h3>
                  <p className="text-stone-700 text-sm leading-relaxed">
                    Shri Lakshman Ji is the incarnation of Adi Shesha (the celestial thousand-hooded serpent on whom Bhagwan Vishnu reposes). He personifies selfless brotherly devotion, fearless protection, and unbroken spiritual wakefulness.
                  </p>
                  <div className="space-y-2 text-xs text-stone-600 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                    <p>
                      <strong>Vow of Wakefulness:</strong> For 14 years during the forest exile, Lakshman Ji renounced sleep to guard Shri Ram and Mata Sita night and day. He teaches mankind the highest standard of Nishkama Seva.
                    </p>
                    <p>
                      <strong>Sanctum Vigraha:</strong> Positioned loyally by Bhagwan Ram's side, adorned with bow, quiver, and princely armor.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    {onDonateClick && (
                      <button
                        onClick={() => onDonateClick(501, 'Lakshman Ji Seva')}
                        className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-full shadow-xs transition flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Sponsor Lakshman Seva (₹501)</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-amber-300 relative bg-stone-900">
                    <img
                      src={RAM_PARIVAR_IMAGES.ramDarbarPanchayat}
                      alt="Shri Lakshman Ji Sanctum"
                      referrerPolicy="no-referrer"
                      className="w-full h-80 object-cover opacity-90"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-xs p-3 rounded-xl text-white text-xs border border-white/20">
                      <div className="font-bold font-serif text-amber-300">Shri Lakshman Sanctorum</div>
                      <div className="text-[11px] text-stone-300">Vigraha in eternal guard of the Lord</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDeity === 'hanuman' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-900 bg-orange-100 px-3 py-1 rounded-full">
                    <Flame className="w-3.5 h-3.5 text-orange-600" />
                    <span>Sankat Mochan Rudravatara • संकट मोचन श्री हनुमान</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
                    Bhaktaraj Shri Hanuman Ji
                  </h3>
                  <p className="text-stone-700 text-sm leading-relaxed">
                    Bhaktaraj Hanuman Ji is the supreme devotee of Shri Ram, Rudravatara, and the eternal protector of all who seek shelter. He sits humbly at the lotus feet of the divine couple, holding His mace (Gada) and offering adoration.
                  </p>
                  <div className="space-y-2 text-xs text-stone-600 bg-orange-50/60 p-4 rounded-xl border border-orange-200">
                    <p>
                      <strong>Every Tuesday &amp; Saturday:</strong> Special Sindoor Alankaram, Sundarkand recitations, and 108 Hanuman Chalisa path are conducted by devotees to overcome all tribulations, fear, and negativity.
                    </p>
                    <p>
                      <strong>Chiranjeevi:</strong> Blessed with eternal life, Lord Hanuman is ever present wherever the holy name of Shri Ram is chanted with sincere faith.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    {onDonateClick && (
                      <button
                        onClick={() => onDonateClick(501, 'Hanuman Ji Sindoor & Prasad Seva')}
                        className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs rounded-full shadow-xs transition hover:from-orange-700 hover:to-amber-700 flex items-center gap-2"
                      >
                        <Flame className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                        <span>Sponsor Hanuman Sindoor Seva (₹501)</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-orange-300 relative bg-stone-900">
                    <img
                      src={RAM_PARIVAR_IMAGES.hanumanJi}
                      alt="Bhaktaraj Hanuman Ji"
                      referrerPolicy="no-referrer"
                      className="w-full h-80 object-cover opacity-90"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-xs p-3 rounded-xl text-white text-xs border border-white/20">
                      <div className="font-bold font-serif text-orange-300">Shri Sankat Mochan Hanuman Vigraha</div>
                      <div className="text-[11px] text-stone-300">Consecrated with pure Vedic Pran Pratishtha</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── SECTION 2: ABOUT THE TEMPLE (HERITAGE & ARCHITECTURE) ── */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 font-serif">
              Sacred History, Sthapana &amp; Vastu Shastra
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
              The Temple &amp; Sanctum Architecture (मंदिर स्थापत्य एवं इतिहास)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Designed according to classical North Indian Nagara architectural principles, the temple features intricate hand-carved pillars, majestic Shikhara, and consecrated cosmic alignments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-bold">
                🛕
              </div>
              <h3 className="font-bold text-base font-serif-title text-stone-900">
                Garbhagriha (Sanctum)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The sanctum sanctorum faces east to receive the first golden rays of the morning sun. It houses the elevated marble Singhasan where the divine deities reside.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-900 flex items-center justify-center text-2xl font-bold">
                ⛰️
              </div>
              <h3 className="font-bold text-base font-serif-title text-stone-900">
                Nagara-style Shikhara
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Rising 72 feet into the celestial sky, the Shikhara represents Mount Meru. It is crowned by the carved Amalaka, sacred golden Kalash, and saffron Dhwaja.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-bold">
                🏛️
              </div>
              <h3 className="font-bold text-base font-serif-title text-stone-900">
                24 Gayatri Pillars
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The spacious Maha Mandapa is supported by 24 hand-carved stone pillars, each etched with one sacred syllable of the Gayatri Mantra and depictions of the Ramayana.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-2xl font-bold">
                🌿
              </div>
              <h3 className="font-bold text-base font-serif-title text-stone-900">
                Tulsi Vatika &amp; Parikrama
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                A serene circumbulation pathway flanked by sacred Rama and Krishna Tulsi plants, creating a deeply tranquil and fragrant atmosphere for meditation and silent prayer.
              </p>
            </div>
          </div>

          {/* Quick Statistics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-950 font-serif-title block">1,500+</span>
              <span className="text-xs text-stone-600 mt-0.5 block">Daily Meals in Annadanam</span>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-950 font-serif-title block">40+ Yrs</span>
              <span className="text-xs text-stone-600 mt-0.5 block">Consecrated Sthapana</span>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-950 font-serif-title block">100%</span>
              <span className="text-xs text-stone-600 mt-0.5 block">80G Tax Exemption</span>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-950 font-serif-title block">35+</span>
              <span className="text-xs text-stone-600 mt-0.5 block">Vedic Acharyas &amp; Priests</span>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: THE CHARITABLE MISSIONS (SEVA & DHARMA) ── */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 font-serif">
              Nishkama Seva • परोपकाराय पुण्याय
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
              Charitable Trust Missions &amp; Community Seva
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Sanatana Dharma teaches that the highest form of worship is selfless service to all living beings. The trust operates multiple humanitarian initiatives year-round.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-2xs space-y-3">
              <div className="text-3xl">🍲</div>
              <h3 className="font-bold text-base font-serif-title text-stone-900">
                Nitya Anna Daanam
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Operating a clean, hygienic kitchen preparing fresh, hot satvik meals daily for devotees, visiting sadhus, and underprivileged families without charge.
              </p>
              {onDonateClick && (
                <button
                  onClick={() => onDonateClick(5100, 'Nitya Anna Daanam')}
                  className="text-xs font-bold text-amber-900 hover:underline pt-1 block"
                >
                  Sponsor 1 Day Meals (₹5,100) →
                </button>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-2xs space-y-3">
              <div className="text-3xl">📖</div>
              <h3 className="font-bold text-base font-serif-title text-stone-900">
                Vedic Pathshala &amp; Sanskrit
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Educating young students in Shukla Yajurveda, Valmiki Ramayana, Vedic mathematics, and moral character building under traditional Gurukula guidance.
              </p>
              {onDonateClick && (
                <button
                  onClick={() => onDonateClick(2100, 'Vedic Pathshala Student Seva')}
                  className="text-xs font-bold text-amber-900 hover:underline pt-1 block"
                >
                  Support Vedic Scholar (₹2,100) →
                </button>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-2xs space-y-3">
              <div className="text-3xl">🩺</div>
              <h3 className="font-bold text-base font-serif-title text-stone-900">
                Free Medical &amp; Eye Camps
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Organizing monthly free health diagnosis, eye cataract surgeries, blood donation camps, and free Ayurvedic medicine distribution for the local community.
              </p>
              {onDonateClick && (
                <button
                  onClick={() => onDonateClick(1100, 'Free Medical Seva')}
                  className="text-xs font-bold text-amber-900 hover:underline pt-1 block"
                >
                  Support Medical Seva (₹1,100) →
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: TRUSTEES & HEAD PRIESTS ── */}
        <section className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-stone-900">
              Trust Leadership &amp; Head Acharyas
            </h3>
            <p className="text-xs text-stone-500">
              Administered with complete financial transparency, audited books, and uncompromised ritual integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {TEMPLE_INFO.priests.map((priest, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs text-center space-y-2 hover:border-amber-300 transition"
              >
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center mx-auto text-xl font-serif">
                  {priest.name.slice(0, 1)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{priest.name}</h4>
                  <p className="text-xs text-amber-800 font-semibold">{priest.title}</p>
                </div>
                <div className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                  Exp: {priest.experience} • {priest.specialization}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: VOLUNTEER SEVA APPLICATION ── */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-3xl p-6 sm:p-10 border border-amber-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-200/70 px-3 py-1 rounded-full">
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>Nishkama Karma Yoga</span>
            </div>
            <h3 className="text-2xl font-bold font-serif-title text-stone-900">
              Join as a Temple Seva Volunteer
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Devote your time, energy, and love. Volunteers assist in daily Annadanam food distribution, flower garland preparation, festive crowd care, and medical camp assistance.
            </p>
          </div>

          <div className="lg:col-span-6">
            {volSubmitted ? (
              <div className="bg-white p-6 rounded-2xl border border-emerald-300 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-stone-900 text-sm">Thank You for Offering Seva!</h4>
                <p className="text-xs text-stone-600">
                  Our Seva Coordinator will contact you on WhatsApp with upcoming volunteering schedules.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-200 shadow-xs space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">Full Devotee Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smt. Radha Sharma"
                    value={volName}
                    onChange={(e) => setVolName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="devotee@example.com"
                      value={volEmail}
                      onChange={(e) => setVolEmail(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">WhatsApp Mobile *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">Area of Seva Interest</label>
                  <select
                    value={volArea}
                    onChange={(e) => setVolArea(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="Anna Daanam (Kitchen & Food Service)">Anna Daanam (Kitchen &amp; Food Service)</option>
                    <option value="Festival Crowd & Queue Seva">Festival Crowd &amp; Queue Seva</option>
                    <option value="Medical Camp Assistance">Medical Camp Assistance</option>
                    <option value="Flower Decoration & Garland Making">Flower Decoration &amp; Garland Making</option>
                    <option value="Temple Website & Social Media">Temple Website &amp; Social Media</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Seva Volunteer Registration</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── SECTION 6: INTERLINKED PAYMENT & BANK DETAILS ── */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-700/60 shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-amber-700/40">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-900/60 px-3 py-1 rounded-full mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interlinked Seva Payment &amp; Section 80G Tax Exemption</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-white">
                Support Shri Ram Janki Mandir Charitable Seva
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                All donations to Shri Ram Janki Mandir are eligible for 50% deduction under Section 80G of the Indian Income Tax Act. Instant 80G Form 10BE receipts generated automatically.
              </p>
            </div>

            {onDonateClick && (
              <button
                onClick={() => onDonateClick()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-orange-500/30 transition active:scale-95 shrink-0"
              >
                <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
                <span>Offer Seva Online Now</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Bank Transfer Box */}
            <div className="bg-stone-950/60 rounded-xl p-4 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wide">
                <Building className="w-4 h-4" />
                <span>Official Trust Bank Account</span>
              </div>
              <div className="space-y-1 text-stone-300">
                <p><strong>Account Name:</strong> {TEMPLE_INFO.bankDetails.accountName}</p>
                <p><strong>Bank:</strong> {TEMPLE_INFO.bankDetails.bankName}</p>
                <p><strong>Account No:</strong> <span className="font-mono text-amber-200 font-bold">{TEMPLE_INFO.bankDetails.accountNumber}</span></p>
                <p><strong>IFSC Code:</strong> <span className="font-mono text-amber-200 font-bold">{TEMPLE_INFO.bankDetails.ifsc}</span></p>
              </div>
            </div>

            {/* UPI QR Payment Box */}
            <div className="bg-stone-950/60 rounded-xl p-4 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wide">
                <QrCode className="w-4 h-4" />
                <span>Instant UPI Offering</span>
              </div>
              <p className="text-stone-300">Scan via any UPI App (GPay, PhonePe, Paytm, BHIM):</p>
              <div className="flex items-center justify-between bg-stone-900 p-2 rounded-lg border border-stone-700">
                <span className="font-mono text-amber-300 font-bold text-xs">{TEMPLE_INFO.bankDetails.upiId}</span>
                <button
                  onClick={copyUpiId}
                  className="p-1 rounded text-stone-400 hover:text-white flex items-center gap-1 font-sans text-[11px]"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] text-stone-400">
                80G registration: <strong className="text-emerald-300">{TEMPLE_INFO.taxExemption80GNumber}</strong>
              </p>
            </div>

            {/* Quick Seva Offerings */}
            <div className="bg-stone-950/60 rounded-xl p-4 border border-amber-500/30 space-y-2.5">
              <span className="text-amber-300 font-bold uppercase tracking-wide block">
                Recommended Seva Tiers
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { amt: 501, title: 'Prasad Seva' },
                  { amt: 1100, title: 'Pushpalankaram' },
                  { amt: 2100, title: 'Gau Seva' },
                  { amt: 5100, title: 'Daily Annadanam' },
                ].map((tier) => (
                  <button
                    key={tier.amt}
                    onClick={() => onDonateClick && onDonateClick(tier.amt, tier.title)}
                    className="p-2 text-left bg-stone-900 hover:bg-amber-900/60 border border-amber-500/20 hover:border-amber-400 rounded-lg transition"
                  >
                    <div className="font-bold text-white text-xs">₹{tier.amt.toLocaleString('en-IN')}</div>
                    <div className="text-[10px] text-stone-400 truncate">{tier.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
