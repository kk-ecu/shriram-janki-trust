import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Play,
  Download,
  Bell,
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { TempleEvent } from '../types';
import { api } from '../api/client';

export const EventsView: React.FC = () => {
  const [events, setEvents] = useState<TempleEvent[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'past'>('list');
  const [selectedEventForReg, setSelectedEventForReg] = useState<TempleEvent | null>(null);

  // Registration form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCount, setRegCount] = useState(1);
  const [regSubmitted, setRegSubmitted] = useState(false);

  // Reminder subscription
  const [reminderContact, setReminderContact] = useState('');
  const [reminderType, setReminderType] = useState<'whatsapp' | 'email'>('whatsapp');
  const [reminderSuccess, setReminderSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await api.getEvents();
      setEvents(data);
    }
    load();
  }, []);

  const happeningNowEvent = events.find((e) => e.isHappeningNow);
  const upcomingEvents = events.filter((e) => !e.isHappeningNow);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventForReg) return;
    await api.registerEvent(selectedEventForReg.id, {
      name: regName,
      email: regEmail,
      phone: regPhone,
      devoteesCount: regCount,
    });
    setRegSubmitted(true);
    setTimeout(() => {
      setRegSubmitted(false);
      setSelectedEventForReg(null);
      setRegName('');
      setRegEmail('');
      setRegPhone('');
    }, 2500);
  };

  const handleDownloadCalendar = () => {
    // Generate clean text-based calendar file for download
    const calendarContent = `SHREE RAM MANDIR & CHARITABLE TRUST - ANNUAL PANCHANG & FESTIVAL CALENDAR 2026-2027
Trust Reg: TRUST/REG/MAH/1984/4592 | 80G Exemption: AACTR1234PF20234
================================================================================

1. Sharad Navratri Mahotsav: Sep 18 - Sep 27, 2026
2. Vijayadashami / Dussehra Ravan Dahan: Sep 28, 2026
3. Deepawali Maha Lakshmi Yajna & 11,000 Diyas: Nov 08, 2026
4. Sri Gita Jayanti & Akhand Chanting: Dec 20, 2026
5. Makar Sankranti & Surya Puja: Jan 14, 2027
6. Maha Shivratri 4-Prahar Rudrabhishek: Feb 15, 2027
7. Holika Dahan & Phoolon Ki Holi: Mar 22, 2027
8. Sri Ram Navami Janmotsav: Apr 15, 2027
9. Hanuman Jayanti & 108 Sundarkand: Apr 21, 2027

Daily Darshan Timings: 6:00 AM - 1:00 PM & 4:30 PM - 9:30 PM
Official Portal: https://rammandirtrust.org
`;
    const blob = new Blob([calendarContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Shree_Ram_Mandir_Annual_Festival_Calendar_2026_27.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#FFFDF9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Controls matching ASCII spec */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Temple Panchang &amp; Utsav</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
              Events, Festivals &amp; Live Darshan
            </h1>
          </div>

          {/* View Toggles: [List View 📋] [Calendar View 📅] [Past Events 📁] */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              List View 📋
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                viewMode === 'calendar'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Calendar View 📅
            </button>
            <button
              onClick={() => setViewMode('past')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                viewMode === 'past'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Past Archives 📁
            </button>
          </div>
        </div>

        {/* ── HAPPENING NOW BANNER (explicit ASCII layout) ── */}
        {happeningNowEvent && (
          <div className="bg-stone-900 text-white rounded-2xl overflow-hidden shadow-xl border-2 border-red-500/80">
            <div className="bg-red-600 px-4 py-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                <span>── HAPPENING NOW: LIVE CEREMONY ──</span>
              </div>
              <span className="bg-white/20 px-2 py-0.5 rounded text-white">
                Live Broadcast
              </span>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-amber-300">
                  {happeningNowEvent.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {happeningNowEvent.description}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-stone-300 pt-2">
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{happeningNowEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>{happeningNowEvent.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>{happeningNowEvent.registeredCount} Devotees in Attendance</span>
                  </div>
                </div>
              </div>

              {/* YouTube Live / Sanctum simulation container */}
              <div className="lg:col-span-5">
                <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-inner bg-black aspect-video flex items-center justify-center group">
                  <img
                    src={happeningNowEvent.bannerImage}
                    alt="Sanctum Live"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium flex items-center gap-1">
                        🔴 Temple YouTube Live Stream
                      </span>
                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Watch in HD</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── UPCOMING EVENTS CARDS (as in wireframe) ── */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-serif-title text-stone-900">
              ── UPCOMING TEMPLE UTSAVS &amp; INITIATIVES ──
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((evt) => {
                const spotsLeft = evt.maxAttendees - evt.registeredCount;
                const isFull = spotsLeft <= 0;

                return (
                  <div
                    key={evt.id}
                    className="bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={evt.bannerImage}
                          alt={evt.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-amber-900/80 backdrop-blur-md text-amber-100 text-xs px-2.5 py-1 rounded-md font-bold">
                          📅 {new Date(evt.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase">
                          {evt.category}
                        </div>
                      </div>

                      <div className="p-5 space-y-2.5">
                        <h4 className="text-base font-bold font-serif-title text-stone-900 line-clamp-1">
                          {evt.title}
                        </h4>
                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {evt.description}
                        </p>

                        <div className="space-y-1 text-xs text-stone-500 pt-2 border-t border-stone-100">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-stone-400" />
                            <span>{evt.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-stone-400" />
                            <span>{evt.venue}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-semibold text-stone-700">
                          Devotee Capacity:
                        </span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded ${
                            spotsLeft < 50
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {evt.registeredCount}/{evt.maxAttendees} registered
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedEventForReg(evt)}
                        disabled={isFull}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                          isFull
                            ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                            : 'bg-amber-700 hover:bg-amber-800 text-white shadow-xs'
                        }`}
                      >
                        {isFull ? 'Capacity Reached' : 'Register Free Pass 🎟️'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── MONTHLY CALENDAR VIEW (explicit ASCII layout) ── */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-serif-title text-stone-900">
                  September &amp; October 2026 Festival Calendar
                </h3>
                <p className="text-xs text-stone-500">
                  Ashwin Shukla Paksha • Sharad Ritu • Vikram Samvat 2083
                </p>
              </div>
            </div>

            {/* Calendar Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-stone-200 text-sm">
                <thead>
                  <tr className="bg-amber-50/80 text-stone-700 font-serif">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                      <th key={d} className="p-3 border border-stone-200 text-center font-bold text-xs">
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-stone-200 h-24 align-top text-stone-400 bg-stone-50/40 text-xs">31</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">1</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">2</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">3</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">4</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-amber-50/60">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">5</span>
                        <span className="text-[10px] text-amber-800 font-bold">Ekadashi</span>
                      </div>
                      <div className="text-[10px] text-amber-900 bg-amber-100 p-1 rounded mt-1">
                        Indira Ekadashi Vrat
                      </div>
                    </td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">6</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">7</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">8</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">9</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">10</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">11</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">12</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">13</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">14</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">15</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">16</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold">17</td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-orange-50">
                      <span className="font-bold">18</span>
                      <div className="text-[10px] bg-orange-600 text-white font-bold p-1 rounded mt-1">
                        Navratri Begins 🚩
                      </div>
                    </td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-orange-50">
                      <span className="font-bold">19</span>
                      <div className="text-[10px] text-orange-900 bg-orange-100 p-1 rounded mt-1">
                        Day 2: Brahmacharini
                      </div>
                    </td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-orange-50">
                      <span className="font-bold">20</span>
                      <div className="text-[10px] text-orange-900 bg-orange-100 p-1 rounded mt-1">
                        Day 3: Chandraghanta
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-orange-50">
                      <span className="font-bold">21</span>
                      <div className="text-[10px] text-orange-900 bg-orange-100 p-1 rounded mt-1">
                        Day 4: Kushmanda
                      </div>
                    </td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-red-50 ring-2 ring-red-500/40">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-red-700">22 TODAY</span>
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                      </div>
                      <div className="text-[10px] bg-red-600 text-white font-bold p-1 rounded mt-1">
                        🔴 Skandamata Puja &amp; Homa
                      </div>
                    </td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-orange-50">
                      <span className="font-bold">23</span>
                      <div className="text-[10px] text-orange-900 bg-orange-100 p-1 rounded mt-1">
                        Day 6: Katyayani
                      </div>
                    </td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-orange-50">
                      <span className="font-bold">24</span>
                      <div className="text-[10px] text-orange-900 bg-orange-100 p-1 rounded mt-1">
                        Day 7: Kalaratri
                      </div>
                    </td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-orange-100 font-bold">
                      <span className="font-bold">25</span>
                      <div className="text-[10px] bg-orange-700 text-white font-bold p-1 rounded mt-1">
                        Maha Ashtami Kanya Puja
                      </div>
                    </td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-orange-100 font-bold">
                      <span className="font-bold">26</span>
                      <div className="text-[10px] bg-orange-700 text-white font-bold p-1 rounded mt-1">
                        Maha Navami Havan
                      </div>
                    </td>
                    <td className="p-3 border border-stone-200 h-24 align-top text-xs font-semibold bg-amber-100 font-bold">
                      <span className="font-bold">27</span>
                      <div className="text-[10px] bg-amber-800 text-white font-bold p-1 rounded mt-1">
                        Vijayadashami / Dussehra
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PAST EVENTS ARCHIVES ── */}
        {viewMode === 'past' && (
          <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-4">
            <h3 className="text-base font-bold font-serif-title text-stone-900">
              Past Concluded Festivals &amp; Seva Drives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <span className="text-xs text-stone-500 font-medium">Aug 15, 2026</span>
                <h4 className="font-bold text-stone-900 text-sm mt-1">Sri Krishna Janmashtami Mahotsav</h4>
                <p className="text-xs text-stone-600 mt-1">Midnight Abhishek with 108 herbs, Makhan Handi, and distribution of 8,500 peda prasad boxes.</p>
              </div>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <span className="text-xs text-stone-500 font-medium">Jul 18, 2026</span>
                <h4 className="font-bold text-stone-900 text-sm mt-1">Shravan Somwar Mahadev Jalabhishek</h4>
                <p className="text-xs text-stone-600 mt-1">Over 14,000 pilgrims performed holy Ganga-jal offering at the Shiva sanctum.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── ASCII FOOTER ACTIONS: Download PDF & Reminder Subscription ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-amber-200">
          {/* Download Annual Calendar */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-amber-950 font-serif-title">
                📥 Download Annual Festival Calendar
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Complete list of Ekadashis, Purnimas, Amavasyas, and temple festivals (PDF &amp; Text).
              </p>
            </div>
            <button
              onClick={handleDownloadCalendar}
              className="bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>

          {/* Subscribe to Event Reminders (WhatsApp/Email) */}
          <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-orange-950 font-serif-title flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-orange-600" />
              <span>Subscribe to Event Reminders</span>
            </h4>
            <p className="text-xs text-stone-600 mt-0.5 mb-2.5">
              Receive timely WhatsApp or Email alerts 2 days before major pujas.
            </p>

            {reminderSuccess ? (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Hari Om! You will now receive sacred festival alerts.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (reminderContact) setReminderSuccess(true);
                }}
                className="flex gap-2"
              >
                <select
                  value={reminderType}
                  onChange={(e) => setReminderType(e.target.value as any)}
                  className="text-xs rounded-lg border-stone-300 bg-white px-2 py-1.5 font-semibold text-stone-700"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                </select>
                <input
                  type={reminderType === 'email' ? 'email' : 'tel'}
                  placeholder={reminderType === 'email' ? 'your.email@example.com' : '+91 Mobile Number'}
                  value={reminderContact}
                  onChange={(e) => setReminderContact(e.target.value)}
                  required
                  className="flex-1 text-xs rounded-lg border-stone-300 bg-white px-3 py-1.5"
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-1.5 rounded-lg transition shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Devotee Registration Modal */}
      {selectedEventForReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-amber-200 relative animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold font-serif-title text-stone-900 mb-1">
              Devotee Pass Registration
            </h3>
            <p className="text-xs text-amber-800 font-semibold mb-4">
              {selectedEventForReg.title}
            </p>

            {regSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-stone-900">Registration Confirmed!</h4>
                <p className="text-xs text-stone-600">
                  Your pass has been generated. Confirmation sent to {regEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Primary Devotee Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smt. Gayatri Devi"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="devotee@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      WhatsApp / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Number of Attendees (Family / Group)
                  </label>
                  <select
                    value={regCount}
                    onChange={(e) => setRegCount(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 8, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} Devotee{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEventForReg(null)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Confirm Registration
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
