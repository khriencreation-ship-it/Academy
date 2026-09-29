"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, ShieldCheck, CreditCard, Sparkles, Flame, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { checkIsEarlyBird } from '@/lib/cohort-config';

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

function TuitionContent() {
  const searchParams = useSearchParams();
  const refParam = searchParams.get('ref') || '';
  const emailParam = searchParams.get('email') || '';

  const [searchQuery, setSearchQuery] = useState(refParam || emailParam);
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Payment Selection State
  const [selectedPlan, setSelectedPlan] = useState<'full' | 'split_50_50'>('full');
  const [payingTuition, setPayingTuition] = useState(false);
  const [tuitionPaidSuccess, setTuitionPaidSuccess] = useState(false);

  const fetchApplication = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/applications/lookup?query=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.success && data.application) {
        setApplication(data.application);
        if (data.application.tuition_status === 'paid' || data.application.tuition_status === 'partially_paid') {
          setTuitionPaidSuccess(true);
        }
      } else {
        setError(data.error || 'Application not found. Please check your Application ID.');
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

  // Pricing calculations
  const isEarlyBird = application
    ? application.pricing_tier === 'early_bird'
    : checkIsEarlyBird();

  const isBundle = application?.course_selection?.toLowerCase().includes('bundle');

  let fullTuitionFee = 0;
  if (isEarlyBird) {
    fullTuitionFee = isBundle ? 15000 : 8000;
  } else {
    fullTuitionFee = isBundle ? 18000 : 10000;
  }

  // Split payment amounts (only available for Standard pricing)
  const firstInstallment = isBundle ? 9000 : 5000;
  const secondInstallment = isBundle ? 9000 : 5000;

  const paymentAmountNow = isEarlyBird
    ? fullTuitionFee
    : selectedPlan === 'full'
    ? fullTuitionFee
    : firstInstallment;

  const handlePayTuition = () => {
    if (!application) return;

    if (application.application_fee_status !== 'paid') {
      toast.error('Please pay your ₦2,000 application fee first before paying tuition.');
      return;
    }

    const rawKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || process.env.FLUTTERWAVE_PUBLIC_KEY || '';
    const publicKey = rawKey.trim().replace(/^["']|["']$/g, '');
    const txRef = `TUITION-${application.application_id}-${Date.now().toString(36)}`;

    setPayingTuition(true);

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://academy.khrien.com';

    if (typeof window !== 'undefined' && window.FlutterwaveCheckout) {
      window.FlutterwaveCheckout({
        public_key: publicKey,
        tx_ref: txRef,
        amount: paymentAmountNow,
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
          title: 'Khrien Academy Tuition Fee',
          description: `₦${paymentAmountNow.toLocaleString()} Tuition for ${application.application_id}`,
          logo: 'https://academy.khrien.com/icon.png',
        },
        meta: {
          application_id: application.application_id,
          payment_type: 'tuition',
          payment_plan: isEarlyBird ? 'full' : selectedPlan,
          total_tuition_fee: fullTuitionFee,
        },
        callback: async function (data: any) {
          console.log('Tuition Flutterwave Callback:', data);
          if (data.status === 'successful') {
            toast.success('Tuition Payment Successful!');
            setTuitionPaidSuccess(true);

            // Trigger backend verification
            fetch('/api/flutterwave/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                transaction_id: data.transaction_id,
                tx_ref: txRef,
                applicationId: application.application_id,
                type: 'tuition',
                amount: paymentAmountNow,
              }),
            }).catch(console.error);
          }
          setPayingTuition(false);
        },
        onclose: function () {
          setPayingTuition(false);
        },
      });
    } else {
      toast.error('Payment gateway loading. Please try again in a few seconds.');
      setPayingTuition(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-24 md:py-32 flex flex-col items-center">
      <Script src="https://checkout.flutterwave.com/v3.js" strategy="afterInteractive" />

      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brandPurple bg-brandPurple/10 border border-brandPurple/30 px-3.5 py-1 rounded-full inline-block mb-3">
            Catalyst Cohort Tuition Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Complete Tuition Payment
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-2">
            Lock in your seat for the Catalyst Cohort & gain access to your placement check.
          </p>
        </div>

        {/* Lookup form if no ref provided */}
        {!application && (
          <form onSubmit={(e) => { e.preventDefault(); fetchApplication(searchQuery); }} className="flex gap-2 mb-8 bg-neutral-900 border border-neutral-800 p-2 rounded-2xl shadow-xl">
            <input
              type="text"
              placeholder="Enter Application ID (e.g. KHA-XXXX-XXX)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-brandPurple text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brandPurple/90 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Lookup"}
            </button>
          </form>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-sm mb-6 text-center">
            {error}
          </div>
        )}

        {application && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-8"
          >
            {/* Applicant Summary */}
            <div className="bg-neutral-900/80 border border-neutral-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-[10px] text-brandPurple uppercase font-extrabold tracking-wider">Application Reference</p>
                <h3 className="text-lg font-bold text-white mt-0.5">{application.full_name}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">{application.course_selection}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full border border-neutral-700">
                  {application.application_id}
                </span>
                <p className="text-[10px] text-neutral-400 mt-1">
                  {isEarlyBird ? '⚡ Early-Bird Rate' : '💳 Standard Rate'}
                </p>
              </div>
            </div>

            {/* Application Fee Warning check */}
            {application.application_fee_status !== 'paid' && (
              <div className="bg-amber-950/40 border border-amber-800/60 p-4 rounded-2xl flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
                <div className="text-xs text-amber-200">
                  <p className="font-bold">Application Fee Pending</p>
                  <p>You must complete your ₦2,000 application fee before paying tuition. <a href={`/continue?ref=${application.application_id}`} className="underline font-bold text-amber-300">Pay ₦2,000 Fee Here</a>.</p>
                </div>
              </div>
            )}

            {/* Success state */}
            {tuitionPaidSuccess || application.tuition_status === 'paid' ? (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Tuition Confirmed! 🎉</h2>
                  <p className="text-neutral-300 text-sm mt-2 max-w-md mx-auto">
                    Your seat for the Catalyst Cohort is officially reserved. Check your email for your receipt and placement check instructions.
                  </p>
                </div>
                <div className="pt-4">
                  <a
                    href={`/scholarship-test?ref=${application.application_id}`}
                    className="inline-flex items-center gap-2 bg-brandPurple text-white px-8 py-4 rounded-full font-bold text-base hover:bg-brandPurple/90 transition-all shadow-xl shadow-purple-950/50"
                  >
                    <span>Take Placement Check Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Pricing Plans Selection */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Select Tuition Payment Option <span className="text-brandPurple">*</span>
                  </label>

                  {isEarlyBird ? (
                    <div className="p-5 rounded-2xl bg-purple-950/30 border border-brandPurple/50 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Flame className="w-5 h-5 text-brandPurple" />
                          <span className="font-bold text-white text-base">Early-Bird Full Payment</span>
                        </div>
                        <span className="text-xl font-extrabold text-brandPurple">₦{fullTuitionFee.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-neutral-300">
                        Early-bird discount locked in. Full payment is required for early-bird rate.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Option 1: Full Payment */}
                      <div
                        onClick={() => setSelectedPlan('full')}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                          selectedPlan === 'full'
                            ? 'bg-brandPurple/20 border-brandPurple text-white'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-sm text-white">Full Payment</span>
                          <span className="text-lg font-extrabold text-brandPurple">₦{fullTuitionFee.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-neutral-300">Pay total tuition in one complete step.</p>
                      </div>

                      {/* Option 2: 50/50 Split Payment */}
                      <div
                        onClick={() => setSelectedPlan('split_50_50')}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                          selectedPlan === 'split_50_50'
                            ? 'bg-brandPurple/20 border-brandPurple text-white'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-sm text-white">50/50 Split Payment</span>
                          <span className="text-lg font-extrabold text-emerald-400">₦{firstInstallment.toLocaleString()} <span className="text-xs font-normal text-neutral-400">now</span></span>
                        </div>
                        <p className="text-xs text-neutral-300">Pay 50% now (₦{firstInstallment.toLocaleString()}), and 50% (₦{secondInstallment.toLocaleString()}) within 3 weeks.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Amount Summary */}
                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="text-xs text-neutral-400">Total Amount Due Now</p>
                    <p className="text-2xl font-extrabold text-white mt-0.5">₦{paymentAmountNow.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full inline-block">
                      {isEarlyBird ? 'Early-Bird Discount' : selectedPlan === 'full' ? 'Full Payment' : '50% First Installment'}
                    </span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={handlePayTuition}
                  disabled={payingTuition || application.application_fee_status !== 'paid'}
                  className="w-full bg-brandPurple text-white py-4 rounded-full font-bold text-lg hover:bg-brandPurple/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-950/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {payingTuition ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Opening Payment Gateway...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pay ₦{paymentAmountNow.toLocaleString()} Tuition Fee</span>
                    </>
                  )}
                </button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default function TuitionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brandPurple" />
      </div>
    }>
      <TuitionContent />
    </Suspense>
  );
}
