"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Loader2, ShieldCheck, CreditCard, Search, Mail } from 'lucide-react';
import { toast } from 'react-toastify';

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

function ContinueContent() {
  const searchParams = useSearchParams();
  const refParam = searchParams.get('ref') || '';
  const emailParam = searchParams.get('email') || '';

  const [searchQuery, setSearchQuery] = useState(refParam || emailParam);
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [payingFee, setPayingFee] = useState(false);
  const [feePaidSuccess, setFeePaidSuccess] = useState(false);

  const fetchApplication = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/applications/lookup?query=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.success && data.application) {
        setApplication(data.application);
        if (data.application.application_fee_status === 'paid') {
          setFeePaidSuccess(true);
        }
      } else {
        setError(data.error || 'Application not found. Please check your Application ID or Email.');
        setApplication(null);
      }
    } catch (err: any) {
      setError('Error fetching application details.');
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refParam || emailParam) {
      fetchApplication(refParam || emailParam);
    }
  }, [refParam, emailParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApplication(searchQuery);
  };

  const handlePayApplicationFee = () => {
    if (!application) return;

    const rawKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || process.env.FLUTTERWAVE_PUBLIC_KEY || '';
    const publicKey = rawKey.trim().replace(/^["']|["']$/g, '');
    const txRef = `APPFEE-${application.application_id}-${Date.now().toString(36)}`;

    setPayingFee(true);

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://academy.khrien.com';

    if (typeof window !== 'undefined' && window.FlutterwaveCheckout) {
      window.FlutterwaveCheckout({
        public_key: publicKey,
        tx_ref: txRef,
        amount: 2000,
        currency: 'NGN',
        payment_options: 'card,banktransfer,ussd',
        redirect_url: `${baseUrl}/payment-success`,
        customer_email: application.email,
        customer: {
          email: application.email,
          phone_number: application.phone || '',
          name: application.full_name,
        },
        customizations: {
          title: 'Khrien Academy Application Fee',
          description: `₦2,000 Fee for ${application.application_id}`,
          logo: 'https://academy.khrien.com/icon.png',
        },
        meta: {
          application_id: application.application_id,
          payment_type: 'app_fee',
        },
        callback: async function (data: any) {
          console.log('Fee Payment Flutterwave callback:', data);
          if (data.status === 'successful') {
            toast.success('Application Fee Paid Successfully!');
            setFeePaidSuccess(true);

            const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://academy.khrien.com';

            try {
              await fetch('/api/flutterwave/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  transaction_id: data.transaction_id,
                  tx_ref: txRef,
                  applicationId: application.application_id,
                  type: 'app_fee',
                }),
              });
            } catch (err) {
              console.error('Error verifying fee payment:', err);
            }

            window.location.href = `${baseUrl}/payment-success?status=successful&tx_ref=${txRef}&transaction_id=${data.transaction_id}`;
          }
          setPayingFee(false);
        },
        onclose: function () {
          setPayingFee(false);
        },
      });
    } else {
      toast.error('Payment gateway loading. Please try again in a few seconds.');
      setPayingFee(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-24 md:py-32 flex flex-col items-center">
      <Script src="https://checkout.flutterwave.com/v3.js" strategy="afterInteractive" />

      <div className="max-w-xl w-full mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brandPurple bg-brandPurple/10 border border-brandPurple/30 px-3.5 py-1 rounded-full inline-block mb-3">
            Khrien Academy Resume Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Continue Your Application
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-2">
            Enter your Application ID or Email address to resume fee payment or proceed to tuition.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-8 bg-neutral-900 border border-neutral-800 p-2 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder="e.g. KHA-XXXX-XXX or name@email.com"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-brandPurple text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brandPurple/90 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Find Application</span>
          </button>
        </form>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-sm mb-6 text-center">
            {error}
          </div>
        )}

        {/* Application Card */}
        {application && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-850">
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Applicant</p>
                <h2 className="text-xl font-bold text-white mt-0.5">{application.full_name}</h2>
                <p className="text-xs text-neutral-400 mt-1">{application.email} • {application.phone}</p>
              </div>
              <div className="bg-neutral-900 px-3.5 py-2 rounded-xl border border-neutral-800 text-right">
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Application ID</p>
                <p className="text-sm font-mono font-bold text-brandPurple">{application.application_id}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-neutral-900">
                <span className="text-neutral-400">Course Selection</span>
                <span className="font-semibold text-white text-right max-w-[240px]">{application.course_selection}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-900">
                <span className="text-neutral-400">Pricing Tier</span>
                <span className="font-semibold text-white capitalize">{application.pricing_tier === 'early_bird' ? 'Early-Bird Rate ⚡' : 'Standard Rate 💳'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-900">
                <span className="text-neutral-400">Application Fee Status</span>
                <span className={`font-bold px-2.5 py-0.5 rounded-full text-xs uppercase ${
                  feePaidSuccess || application.application_fee_status === 'paid'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {feePaidSuccess || application.application_fee_status === 'paid' ? 'Paid (₦2,000)' : 'Pending (₦2,000)'}
                </span>
              </div>
            </div>

            {/* Actions based on state */}
            {feePaidSuccess || application.application_fee_status === 'paid' ? (
              <div className="pt-2 text-center space-y-4">
                <div className="bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-2xl flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <p className="text-xs text-emerald-200 text-left">
                    Your Application Fee is paid! You can now proceed to select your tuition payment options.
                  </p>
                </div>
                <a
                  href={`/tuition?ref=${application.application_id}`}
                  className="w-full bg-brandPurple text-white py-4 rounded-full font-bold text-base hover:bg-brandPurple/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-950/50"
                >
                  <span>Proceed to Tuition Payment</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            ) : (
              <div className="pt-2 text-center space-y-4">
                <div className="bg-purple-950/30 border border-brandPurple/30 p-4 rounded-2xl flex items-center gap-3 text-left">
                  <ShieldCheck className="w-6 h-6 text-brandPurple shrink-0" />
                  <p className="text-xs text-neutral-300">
                    A non-refundable <strong>₦2,000 Application Fee</strong> is required to submit your application for review.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handlePayApplicationFee}
                  disabled={payingFee}
                  className="w-full bg-brandPurple text-white py-4 rounded-full font-bold text-base hover:bg-brandPurple/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-950/50 cursor-pointer disabled:opacity-50"
                >
                  {payingFee ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Opening Payment Gateway...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pay Application Fee (₦2,000)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default function ContinuePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brandPurple" />
      </div>
    }>
      <ContinueContent />
    </Suspense>
  );
}
