import React, { useState } from 'react';
import {
  Flame,
  Clock,
  Sparkles,
  Heart,
  ShieldCheck,
  Building,
  QrCode,
  Copy,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Volume2,
} from 'lucide-react';
import { TEMPLE_INFO } from '../data/mockData';
import { RAM_PARIVAR_IMAGES, RamParivarSVG } from './RamParivarArt';

interface AartiViewProps {
  onDonateClick: (amount?: number, sevaName?: string) => void;
}

export const AartiView: React.FC<AartiViewProps> = ({ onDonateClick }) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [diyaLit, setDiyaLit] = useState(false);
  const [bellRung, setBellRung] = useState(false);
  const [activeStutiTab, setActiveStutiTab] = useState<'ram' | 'hanuman' | 'janki'>('ram');

  const copyUpiId = () => {
    navigator.clipboard.writeText(TEMPLE_INFO.bankDetails.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleRingBell = () => {
    setBellRung(true);
    setTimeout(() => setBellRung(false), 800);
  };

  return (
    <div className="bg-[#FFFDF9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="pb-4 border-b border-amber-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-1">
            <Flame className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
            <span>Nitya Upasana &amp; Darshan Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif-title text-stone-900 tracking-tight">
            Daily Aarti, Darshan &amp; Sacred Stutis
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Five consecrated daily aartis conducted by Vedic priests with sacred pure cow ghee deepas, dhoop, naivedya, and Vedic chants at Shri Ram Janki Mandir.
          </p>
        </div>

        {/* Interactive Virtual Aarti Diya & Bell Ritual Offering */}
        <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-700/60 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-800/80 px-3 py-1 rounded-full text-xs font-bold text-amber-200 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Devotee Virtual Upasana</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-white">
                Light the Sacred Ghee Deepa &amp; Ring Temple Ghanta
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                Connect your heart with the sanctum sanctorum of Bhagwan Shri Ram and Mata Janki. Offer an auspicious virtual prayer or ring the consecrated sanctum bell.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setDiyaLit(!diyaLit)}
                  className={`px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition flex items-center gap-2 ${
                    diyaLit
                      ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-300/40'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${diyaLit ? 'fill-orange-600 text-orange-600 animate-pulse' : 'fill-amber-200 text-amber-200'}`} />
                  <span>{diyaLit ? '✓ Deepa Offered to Shri Ram Janki' : 'Light Virtual Ghee Deepa'}</span>
                </button>

                <button
                  onClick={handleRingBell}
                  className={`px-5 py-2.5 rounded-full font-bold text-xs bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-600/50 transition flex items-center gap-2 ${
                    bellRung ? 'scale-105 bg-amber-800 text-white' : ''
                  }`}
                >
                  <Bell className={`w-4 h-4 ${bellRung ? 'animate-bounce text-amber-300' : 'text-amber-400'}`} />
                  <span>{bellRung ? '🔔 ॐ जय श्री राम 🔔' : 'Ring Sanctum Bell'}</span>
                </button>

                <button
                  onClick={() => onDonateClick(1100, 'Aarti Seva Offering')}
                  className="px-5 py-2.5 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md transition flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>Sponsor Today's Aarti (₹1,100)</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center gap-3">
              <div className="w-full rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-lg bg-stone-950">
                <img
                  src="/assets/images/lord_ram.jpg"
                  alt="Bhagwan Shri Ram Sanctum"
                  className="w-full h-40 object-cover object-top opacity-95"
                />
              </div>
              <div className="w-full p-3 bg-stone-950/80 rounded-xl border border-amber-600/40 text-center flex items-center justify-center gap-3">
                <div className={`text-4xl transition duration-500 ${diyaLit ? 'scale-110 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]' : 'opacity-80'}`}>
                  🪔
                </div>
                <div className="text-left">
                  <div className="font-serif-title font-bold text-amber-300 text-xs">
                    {diyaLit ? 'अखण्ड ज्योति प्रज्ज्वलित' : 'अखण्ड दीप दर्शन'}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Shri Ram Janki Sanctum Flame
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Daily Aarti Schedules with Direct Seva Sponsorship Interlinking */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-stone-900">
                Pancha Kala Aarti Schedule (पंच आरती विधान)
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Conducted every day without fail according to ancient Ramanandi Vaishnava ritual traditions.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Open 365 Days a Year
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {TEMPLE_INFO.aartiSchedule.map((aarti, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">
                      {idx === 0 ? '🌅' : idx === 1 ? '🌸' : idx === 2 ? '🍲' : idx === 3 ? '🪔' : '🌙'}
                    </span>
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest bg-stone-100 px-2 py-0.5 rounded-full font-mono">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900 font-serif-title group-hover:text-amber-900 transition">
                    {aarti.name}
                  </h3>
                  <div className="text-xs font-serif text-amber-800 font-medium">
                    {aarti.hindiName}
                  </div>

                  <div className="text-lg font-black text-amber-950 mt-2 font-mono">
                    {aarti.time}
                  </div>

                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                    {aarti.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 space-y-2">
                  <button
                    onClick={() => onDonateClick(idx % 2 === 0 ? 1100 : 2100, `Sponsorship of ${aarti.name}`)}
                    className="w-full py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Flame className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                    <span>Sponsor Seva ₹{idx % 2 === 0 ? '1,100' : '2,100'}</span>
                  </button>
                  <div className="text-[10px] text-center text-stone-400 font-medium">
                    Includes 80G Tax Exemption
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Darshan Timings & Guidelines Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>Morning Darshan Timings</span>
            </div>
            <div className="text-xl font-extrabold text-stone-900 font-serif-title">
              {TEMPLE_INFO.darshanTimings.morning}
            </div>
            <p className="text-xs text-stone-500">
              Temple gates open at 6:00 AM. Alankaram and Abhishek Darshan during morning hours.
            </p>
          </div>

          <div className="space-y-2 border-y md:border-y-0 md:border-x border-stone-200 md:px-6 py-4 md:py-0">
            <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs uppercase tracking-wider">
              <Moon className="w-4 h-4 text-indigo-600" />
              <span>Evening Darshan Timings</span>
            </div>
            <div className="text-xl font-extrabold text-stone-900 font-serif-title">
              {TEMPLE_INFO.darshanTimings.evening}
            </div>
            <p className="text-xs text-stone-500">
              Temple re-opens at 4:30 PM. Sandhya Aarti at 7:00 PM followed by Shayan Aarti at 9:15 PM.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Darshan Etiquette</span>
            </div>
            <div className="text-xs text-stone-600 space-y-1">
              <div>• Traditional modest attire encouraged</div>
              <div>• Free Satvik Prasadam served after Sandhya Aarti</div>
              <div>• Special wheelchair queue for elderly devotees</div>
            </div>
          </div>
        </div>

        {/* Sacred Aarti Mantras, Lyrics & Stutis */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest font-serif block">
                Stotra, Aarti &amp; Sanskrit Chants
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-stone-900 mt-0.5">
                Sacred Aarti Lyrics &amp; Stutis
              </h2>
            </div>

            {/* Stuti Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                onClick={() => setActiveStutiTab('ram')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeStutiTab === 'ram'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                श्री राम स्तुति
              </button>
              <button
                onClick={() => setActiveStutiTab('hanuman')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeStutiTab === 'hanuman'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                हनुमान जी की आरती
              </button>
              <button
                onClick={() => setActiveStutiTab('janki')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeStutiTab === 'janki'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                श्री जानकी स्तुति
              </button>
            </div>
          </div>

          {/* Stuti Content */}
          <div className="bg-amber-50/50 p-6 sm:p-8 rounded-2xl border border-amber-200 text-stone-800">
            {activeStutiTab === 'ram' && (
              <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto">
                <div className="font-bold text-lg text-amber-950 font-serif-title">
                  श्री रामचन्द्र कृपालु भजु मन हरण भवभय दारुणम्
                </div>
                <p className="text-amber-900 font-semibold">
                  (रचयिता: गोस्वामी तुलसीदास जी महाराज)
                </p>
                <div className="space-y-3 text-stone-800 pt-2 font-serif text-xs sm:text-sm">
                  <p>
                    श्रीरामचन्द्र कृपालु भजु मन हरण भवभय दारुणम्।<br />
                    नवकञ्जलोचन, कञ्जमुख, करकञ्ज, पद कञ्जारुणम्॥
                  </p>
                  <p>
                    कन्दर्प अगणित अमित छबि, नवनीलनीरद सुन्दरम्।<br />
                    पट पीत मानहु तड़ित रुचि शुचि नौमि जनक सुतावरम्॥
                  </p>
                  <p>
                    भजु दीनबन्धु दिनेश दानवदैत्यवंशनिकन्दनम्।<br />
                    रघुनन्द आनन्दकन्द कोशलचन्द दशरथनन्दनम्॥
                  </p>
                  <p>
                    सिर मुकुट कुण्डल तिलक चारु उदारु अङ्ग विभूषणम्।<br />
                    आजानुभुज शर चाप धर, सङ्ग्राम-जित-खरदूषणम्॥
                  </p>
                  <p>
                    इति वदति तुलसीदास शंकर-शेष-मुनि-मन-रञ्जनम्।<br />
                    मम हृदयकञ्ज निवास कुरु, कामादि खल-दल-गञ्जनम्॥
                  </p>
                </div>
                <div className="pt-3 text-[11px] text-stone-500 font-sans border-t border-amber-200">
                  <em>Meaning: O mind! Sing the praise of merciful Sri Ramachandra, who removes the terrifying fear of worldly rebirth. His eyes, countenance, hands, and feet resemble tender reddish lotus blossoms. He is supreme protector and dispeller of all obstacles.</em>
                </div>
              </div>
            )}

            {activeStutiTab === 'hanuman' && (
              <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto">
                <div className="font-bold text-lg text-amber-950 font-serif-title">
                  आरती कीजै हनुमान लला की
                </div>
                <p className="text-amber-900 font-semibold">
                  दुष्ट दलन रघुनाथ कला की
                </p>
                <div className="space-y-3 text-stone-800 pt-2 font-serif text-xs sm:text-sm">
                  <p>
                    आरती कीजै हनुमान लला की। दुष्ट दलन रघुनाथ कला की॥<br />
                    जाके बल से गिरिवर कांपै। रोग दोष जाके निकट न झांपै॥
                  </p>
                  <p>
                    अंजनि पुत्र महा बलदाई। संतन के प्रभु सदा सहाई॥<br />
                    दे बीरा रघुनाथ पठाए। लंका जारि सीय सुधि लाए॥
                  </p>
                  <p>
                    लंका सो कोट समुद्र सी खाई। जात पवनसुत बार न लाई॥<br />
                    लक्ष्मण मूर्छित पड़े सकारे। आनि संजीवन प्रान उबारे॥
                  </p>
                  <p>
                    सुर नर मुनि सब आरती उतारें। जय जय जय हनुमान उचारें॥<br />
                    कंचन थार कपूर लौ छाई। आरति करत संजना माई॥
                  </p>
                  <p>
                    जो हनुमान जी की आरति गावै। बसि बैकुंठ परम पद पावै॥
                  </p>
                </div>
              </div>
            )}

            {activeStutiTab === 'janki' && (
              <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto">
                <div className="font-bold text-lg text-amber-950 font-serif-title">
                  श्री जानकी स्तुति (Mata Sita Vandana)
                </div>
                <p className="text-amber-900 font-semibold">
                  जनकसुता जग जननि जानकी, अतिसय प्रिय करुनानिधान की
                </p>
                <div className="space-y-3 text-stone-800 pt-2 font-serif text-xs sm:text-sm">
                  <p>
                    जनकसुता जग जननि जानकी। अतिसय प्रिय करुनानिधान की॥<br />
                    ताके जुग पद कमल मनावउँ। जासु कृपाँ निरमल मति पावउँ॥
                  </p>
                  <p>
                    उदभव स्थिति संहारकारिणीं क्लेशहारिणीम्।<br />
                    सर्वश्रेयस्करीं सीतां नतोऽहं रामवल्लभाम्॥
                  </p>
                  <p>
                    हे कृपामयी माता जानकी, सदा अपने भक्तों पर कृपा दृष्टि रखें।<br />
                    आपके पावन चरणों में कोटि-कोटि वंदन एवं प्रणाम।
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Direct Payment & Bank Seva Interlink Card */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-700/60 shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-amber-700/40">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-900/60 px-3 py-1 rounded-full mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interlinked Aarti Seva Payment • 80G Tax Exemption</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-white">
                Sponsor Daily Aarti, Dhoop, Ghee &amp; Pushpalankaram
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                Every rupee sponsored goes directly towards the purest cow ghee, sacred fragrant flowers, camphor, and satvik prasad prepared for Bhagwan Shri Ram and Mata Janki.
              </p>
            </div>

            <button
              onClick={() => onDonateClick(1100, 'Daily Aarti & Deepa Seva')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-orange-500/30 transition active:scale-95 shrink-0"
            >
              <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
              <span>Offer Aarti Seva Now</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Bank Transfer Box */}
            <div className="bg-stone-950/60 rounded-xl p-4 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wide">
                <Building className="w-4 h-4" />
                <span>Mandir Trust Bank Account</span>
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
              <p className="text-stone-300">Scan using any UPI App (GPay, PhonePe, Paytm):</p>
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

            {/* Quick Aarti Offerings */}
            <div className="bg-stone-950/60 rounded-xl p-4 border border-amber-500/30 space-y-2.5">
              <span className="text-amber-300 font-bold uppercase tracking-wide block">
                Recommended Aarti Sevas
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { amt: 501, title: 'Deepa Seva (Ghee)' },
                  { amt: 1100, title: 'Mangala Aarti Seva' },
                  { amt: 2100, title: 'Pushpalankaram' },
                  { amt: 5100, title: 'Full Day Pancha Aarti' },
                ].map((tier) => (
                  <button
                    key={tier.amt}
                    onClick={() => onDonateClick(tier.amt, tier.title)}
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
