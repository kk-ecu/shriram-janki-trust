import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Flame,
  Calendar,
  Clock,
  CheckCircle,
  Truck,
  Heart,
  ShieldCheck,
  Check,
  User,
} from 'lucide-react';
import { PujaService, PujaBooking } from '../types';
import { api } from '../api/client';
import confetti from 'canvas-confetti';

export const PujaView: React.FC = () => {
  const [pujas, setPujas] = useState<PujaService[]>([]);
  const [selectedPuja, setSelectedPuja] = useState<PujaService | null>(null);
  const [activeBooking, setActiveBooking] = useState<PujaBooking | null>(null);
  const [recentBookings, setRecentBookings] = useState<PujaBooking[]>([]);

  // Booking Form State
  const [devoteeName, setDevoteeName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gotra, setGotra] = useState('');
  const [nakshatra, setNakshatra] = useState('');
  const [sankalpamNote, setSankalpamNote] = useState('');
  const [bookingDate, setBookingDate] = useState(
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );
  const [timeSlot, setTimeSlot] = useState('Morning (8:00 AM - 10:00 AM)');
  const [prasadDelivery, setPrasadDelivery] = useState(true);
  const [shippingAddress, setShippingAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await api.getPujas();
      setPujas(data);
      const bookings = await api.getPujaBookings();
      setRecentBookings(bookings);
    }
    load();
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPuja) return;
    setIsSubmitting(true);

    const result = await api.bookPuja({
      pujaId: selectedPuja.id,
      devoteeName,
      email,
      phone,
      gotra: gotra || 'Kashyapa',
      nakshatra: nakshatra || 'Rohini',
      sankalpamNote,
      bookingDate,
      timeSlot,
      prasadDelivery,
      shippingAddress: prasadDelivery ? shippingAddress : undefined,
      amount: selectedPuja.suggestedDakshina,
    });

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Safe fallback
    }

    setIsSubmitting(false);
    setSelectedPuja(null);
    setActiveBooking(result.data);
    const updated = await api.getPujaBookings();
    setRecentBookings(updated);
  };

  return (
    <div className="bg-[#FFFDF9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title */}
        <div className="pb-4 border-b border-amber-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-1">
            <Flame className="w-3.5 h-3.5 text-amber-700" />
            <span>Nitya &amp; Vishesha Vedic Sevas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900">
            Book Online Puja, Archana &amp; Sankalpam
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Qualified Vedic Acharyas perform sacred pujas in your name and Gotra with live darshan links and sanctified Mahaprasad delivered to your home.
          </p>
        </div>

        {/* Puja Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pujas.map((puja) => (
            <div
              key={puja.id}
              className="bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={puja.imageUrl}
                    alt={puja.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-amber-200 text-xs px-2.5 py-1 rounded-md font-bold">
                    {puja.duration}
                  </div>
                  {puja.includesPrasad && (
                    <div className="absolute top-3 right-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Truck className="w-2.5 h-2.5" />
                      <span>Prasad Delivery</span>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold font-serif-title text-stone-900">
                      {puja.name}
                    </h3>
                    <span className="text-base font-extrabold text-amber-900 font-serif-title">
                      ₹{puja.suggestedDakshina.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {puja.description}
                  </p>

                  {puja.samagriIncluded && puja.samagriIncluded.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                        Sacred Samagri Included:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {puja.samagriIncluded.slice(0, 4).map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedPuja(puja)}
                  className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Book Sankalpam Seva</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Confirmed Bookings Feed */}
        {recentBookings.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold font-serif-title text-stone-900">
              Devotee Puja Bookings Confirmed Today
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {recentBookings.map((b) => (
                <div key={b.id} className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-stone-900">
                    <span>{b.devoteeName}</span>
                    <span className="text-emerald-700 font-semibold">{b.status}</span>
                  </div>
                  <div className="text-stone-600">{b.pujaName}</div>
                  <div className="text-[10px] text-stone-500">
                    Gotra: {b.gotra} • Date: {b.bookingDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {selectedPuja && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl border border-amber-300 my-8 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-serif-title">
                  {selectedPuja.name}
                </h3>
                <span className="text-xs text-amber-100">
                  Dakshina: ₹{selectedPuja.suggestedDakshina.toLocaleString('en-IN')} • {selectedPuja.duration}
                </span>
              </div>
              <button
                onClick={() => setSelectedPuja(null)}
                className="text-white/80 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Devotee Name (for Sankalp) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smt. Sunita Devi"
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Family Gotra *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kashyapa, Bharadwaj"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Janma Nakshatra (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rohini, Ashwini"
                    value={nakshatra}
                    onChange={(e) => setNakshatra(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Puja Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="devotee@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Time Slot Preference
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
                >
                  <option value="Morning (8:00 AM - 10:00 AM)">Morning (8:00 AM - 10:00 AM)</option>
                  <option value="Noon Pradosh (11:30 AM - 1:00 PM)">Noon Pradosh (11:30 AM - 1:00 PM)</option>
                  <option value="Evening Sandhya (6:30 PM - 8:00 PM)">Evening Sandhya (6:30 PM - 8:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Special Prayer Intention / Sankalpam Note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. For good health of parents, successful examinations, wedding anniversary blessings..."
                  value={sankalpamNote}
                  onChange={(e) => setSankalpamNote(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                />
              </div>

              {/* Prasad Delivery Toggle */}
              <div className="pt-2 border-t border-stone-200">
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={prasadDelivery}
                    onChange={(e) => setPrasadDelivery(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-xs font-semibold text-stone-800">
                    Send Sanctified Mahaprasad (Dry Fruits, Vibhuti, Kumkum, Raksha Sutra) to my home
                  </span>
                </label>

                {prasadDelivery && (
                  <input
                    type="text"
                    required
                    placeholder="Enter postal shipping address with PIN code"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                )}
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-md transition flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
                  <span>
                    Confirm &amp; Offer Dakshina of ₹{selectedPuja.suggestedDakshina.toLocaleString('en-IN')}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Confirmation Dialog */}
      {activeBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-amber-200 text-center space-y-4">
            <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold font-serif-title text-stone-900">
              Puja Booking Confirmed!
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Hari Om! Your sankalpam for <strong>{activeBooking.pujaName}</strong> on <strong>{activeBooking.bookingDate}</strong> has been registered.
            </p>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-stone-800 text-left space-y-1">
              <div>Booking ID: <strong className="font-mono text-amber-900">{activeBooking.bookingNumber}</strong></div>
              <div>Devotee: <strong>{activeBooking.devoteeName}</strong> (Gotra: {activeBooking.gotra})</div>
              <div>Slot: <strong>{activeBooking.timeSlot}</strong></div>
              <div>Prasad Courier: <strong>{activeBooking.prasadDelivery ? 'Requested' : 'Temple Pickup'}</strong></div>
            </div>
            <button
              onClick={() => setActiveBooking(null)}
              className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl"
            >
              Jai Sri Ram • Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
