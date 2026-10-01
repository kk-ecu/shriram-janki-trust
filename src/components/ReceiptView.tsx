import React from 'react';
import {
  Printer,
  Download,
  Share2,
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { Donation } from '../types';
import { TEMPLE_INFO } from '../data/mockData';

interface ReceiptViewProps {
  receipt: Donation;
  onBack: () => void;
}

// Convert numbers to Indian Rupees words
function numberToWordsINR(amount: number): string {
  const ones = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (amount === 0) return 'Zero';

  function convertBelowThousand(n: number): string {
    let str = '';
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }
    if (n > 0) {
      str += ones[n] + ' ';
    }
    return str;
  }

  let words = '';
  const crore = Math.floor(amount / 10000000);
  amount %= 10000000;
  const lakh = Math.floor(amount / 100000);
  amount %= 100000;
  const thousand = Math.floor(amount / 1000);
  amount %= 1000;
  const remainder = amount;

  if (crore > 0) words += convertBelowThousand(crore) + 'Crore ';
  if (lakh > 0) words += convertBelowThousand(lakh) + 'Lakh ';
  if (thousand > 0) words += convertBelowThousand(thousand) + 'Thousand ';
  if (remainder > 0) words += convertBelowThousand(remainder);

  return 'Rupees ' + words.trim() + ' Only';
}

export const ReceiptView: React.FC<ReceiptViewProps> = ({ receipt, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(receipt.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const words = numberToWordsINR(receipt.amount);

  return (
    <div className="bg-[#FFFDF9] py-8 sm:py-12 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Navigation & Action Controls */}
        <div className="no-print flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-3 py-2 rounded-lg shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Temple Portal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-xs transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs px-3 py-2 rounded-lg shadow-2xs transition"
            >
              <Download className="w-4 h-4 text-stone-600" />
              <span>Download PDF</span>
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Pranam! I have offered a sacred seva of ₹${receipt.amount.toLocaleString('en-IN')} to Shree Ram Mandir. Receipt No: ${receipt.receiptNumber}. Jai Sri Ram!`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-2 rounded-lg shadow-xs transition"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* ── THE OFFICIAL 80G RECEIPT CARD (matching ASCII specification) ── */}
        <div className="printable-receipt bg-white rounded-2xl border-2 border-amber-300/80 shadow-xl p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[260px] font-serif font-black">ॐ</span>
          </div>

          {/* Temple Letterhead */}
          <div className="text-center pb-6 border-b-2 border-amber-500/80">
            <div className="inline-flex items-center gap-2 text-amber-800 mb-1">
              <span className="text-2xl">🛕</span>
              <span className="font-serif font-bold text-xs tracking-widest uppercase">
                {TEMPLE_INFO.hindiName}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-stone-900 tracking-wide">
              {TEMPLE_INFO.name}
            </h1>
            <p className="text-xs text-stone-600 mt-1 max-w-lg mx-auto">
              {TEMPLE_INFO.contact.address}
            </p>
            <div className="text-[11px] font-semibold text-stone-700 mt-1.5 space-x-2">
              <span>Trust Reg: <strong>{TEMPLE_INFO.trustRegistrationNumber}</strong></span>
              <span>•</span>
              <span>80G URN: <strong className="text-amber-900">{TEMPLE_INFO.taxExemption80GNumber}</strong></span>
              <span>•</span>
              <span>PAN: <strong>{TEMPLE_INFO.panNumber}</strong></span>
            </div>
          </div>

          {/* Receipt Title */}
          <div className="my-6 text-center">
            <span className="inline-block bg-amber-100 text-amber-950 font-serif-title font-extrabold text-sm sm:text-base px-6 py-1.5 rounded-full border border-amber-300 tracking-wider">
              DONATION RECEIPT (FORM 10BE COMPLIANT)
            </span>
            <div className="flex justify-between items-center text-xs font-semibold text-stone-700 mt-4 px-2">
              <span>
                Receipt No: <strong className="text-amber-900 font-mono text-sm">{receipt.receiptNumber}</strong>
              </span>
              <span>
                Date: <strong>{formattedDate}</strong>
              </span>
            </div>
          </div>

          {/* Devotee & Donation Particulars Table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden mb-6 text-xs sm:text-sm">
            <div className="p-3 bg-stone-50 border-b border-stone-200 font-bold text-stone-800">
              Received with thanks from:
            </div>
            <div className="divide-y divide-stone-100 p-4 space-y-2.5">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-stone-500 font-medium">Donor Full Name:</span>
                <span className="col-span-2 font-bold text-stone-900">{receipt.donorName}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <span className="text-stone-500 font-medium">PAN Number:</span>
                <span className="col-span-2 font-mono font-bold text-stone-900">{receipt.panNumber}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <span className="text-stone-500 font-medium">Address:</span>
                <span className="col-span-2 text-stone-700">{receipt.address}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <span className="text-stone-500 font-medium">Contact:</span>
                <span className="col-span-2 text-stone-700">
                  {receipt.donorPhone} | {receipt.donorEmail}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 bg-amber-50/60 -mx-4 px-4 py-2 rounded-md">
                <span className="text-stone-700 font-bold">Amount Contributed:</span>
                <span className="col-span-2">
                  <strong className="text-base text-amber-950 font-serif-title">
                    ₹{receipt.amount.toLocaleString('en-IN')}
                  </strong>
                  <span className="text-xs text-stone-600 block mt-0.5 italic">
                    ({words})
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <span className="text-stone-500 font-medium">In Aid Of / Cause:</span>
                <span className="col-span-2 font-semibold text-stone-900">{receipt.campaignTitle}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <span className="text-stone-500 font-medium">Payment Mode:</span>
                <span className="col-span-2 text-stone-700 font-mono text-xs">
                  {receipt.paymentMethod} (Txn Ref: {receipt.transactionId})
                </span>
              </div>

              {receipt.dedication && (
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <span className="text-stone-500 font-medium">Sankalpam Note:</span>
                  <span className="col-span-2 text-amber-900 italic font-medium">
                    {receipt.dedication}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── TAX EXEMPTION CERTIFICATE SECTION ── */}
          <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 mb-8 text-xs text-stone-700 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-950 font-serif-title text-sm mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>── TAX EXEMPTION CERTIFICATE ──</span>
            </div>
            <p className="leading-relaxed">
              Certified that <strong>{TEMPLE_INFO.name}</strong> is registered under Section 80G(5)(vi) of the Income Tax Act, 1961.
              Donations to this trust qualify for deduction in the hands of the assessee.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-semibold text-[11px] text-stone-800">
              <div>Unique Registration Number (URN): <span className="font-mono text-amber-900">{TEMPLE_INFO.taxExemption80GNumber}</span></div>
              <div>Validity: <span>FY 2023-24 to FY 2027-28</span></div>
            </div>
            <p className="text-[10px] text-stone-500 pt-1 italic">
              * Note: As per CBDT notifications, Form 10BE will be filed with the Income Tax Department to reflect in your AIS / Form 26AS.
            </p>
          </div>

          {/* Signatures & QR Verification */}
          <div className="flex items-end justify-between pt-4 border-t border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-stone-100 border border-stone-300 rounded-lg p-1 flex items-center justify-center">
                <QrCode className="w-14 h-14 text-stone-800" />
              </div>
              <div className="text-[10px] text-stone-500 space-y-0.5">
                <span className="font-bold text-stone-800 block">Scan to Verify</span>
                <span>Authentic Digitally Verified</span>
                <span className="block font-mono text-[9px] text-stone-400">ID: {receipt.id}</span>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="h-10 flex items-center justify-end">
                <span className="font-serif italic text-amber-900 font-bold text-lg select-none">
                  K. S. Narayanan
                </span>
              </div>
              <div className="text-xs font-bold text-stone-800">Authorized Signatory</div>
              <div className="text-[10px] text-stone-500">Shree Ram Mandir &amp; Charitable Trust</div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="no-print text-center mt-6">
          <button
            onClick={onBack}
            className="text-xs text-amber-800 hover:text-amber-950 font-bold underline"
          >
            ← Return to Mandir Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
