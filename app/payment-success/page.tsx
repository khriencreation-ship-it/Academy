"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, ArrowRight, Loader2, ShieldCheck, Home, FileText } from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const statusParam = searchParams.get('status') || searchParams.get('resp') || '';
  const txRefParam = searchParams.get('tx_ref') || searchParams.get('txref') || '';
  const transactionId = searchParams.get('transaction_id') || searchParams.get('id') || '';

  const [verifying, setVerifying] = useState(true);
  const [verifiedData, setVerifiedData] = useState<any>(null);

  // Extract application ID from txRef (e.g. APPFEE-KHA-12345-ABC -> KHA-12345-ABC)
  const isAppFee = txRefParam.startsWith('APPFEE-');
  const isTuition = txRefParam.startsWith('TUITION-');

  let rawAppId = '';
  if (txRefParam) {
    const parts = txRefParam.split('-');
    if (parts.length >= 2) {
      rawAppId = parts.slice(1, parts.length - 1).join('-');
      if (!rawAppId && parts.length >= 2) {
        rawAppId = parts.slice(1).join('-');
      }
    }
  }

  useEffect(() => {
    async function runVerification() {
      if (txRefParam || transactionId) {
        try {
          const res = await fetch('/api/flutterwave/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              transaction_id: transactionId,
              tx_ref: txRefParam,
              applicationId: rawAppId,
              type: isAppFee ? 'app_fee' : isTuition ? 'tuition' : 'general',
            }),
          });
          const data = await res.json();
          setVerifiedData(data);
        } catch (err) {
          console.warn('Verification endpoint call in payment-success:', err);
        } finally {
          setVerifying(false);
        }
      } else {
        setVerifying(false);
      }
    }

    runVerification();
  }, [txRefParam, transactionId, rawAppId, isAppFee, isTuition]);

  const isSuccessful = statusParam.toLowerCase().includes('success') || statusParam.toLowerCase().includes('completed') || !statusParam;

  return (
    <main className="min-h-screen bg-black text-white px-4 py-24 md:py-32 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-950 border border-neutral-850 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-brandPurple/20 rounded-full blur-3xl pointer-events-none" />

          {/* Icon */}
          <div className="w-20 h-20 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3.5 py-1 rounded-full inline-block mb-4">
            Payment Confirmed
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Thank You for Your Payment!
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
            {isAppFee
              ? "Your ₦2,000 application fee for Khrien Academy Catalyst Cohort has been successfully received and confirmed."
              : isTuition
              ? "Your tuition payment for Khrien Academy Catalyst Cohort is confirmed! Your seat is locked in."
              : "Your payment has been successfully processed. Check your email for full receipt and details."}
          </p>

          {/* Transaction Summary Card */}
          {txRefParam && (
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Payment Type</span>
                <span className="font-bold text-white uppercase">{isAppFee ? 'Application Fee' : isTuition ? 'Tuition Fee' : 'Payment'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Transaction Reference</span>
                <span className="font-mono font-bold text-brandPurple">{txRefParam}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Status</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Successful
                </span>
              </div>
            </div>
          )}

          {/* Next Steps Box */}
          <div className="bg-purple-950/30 border border-brandPurple/40 p-5 rounded-2xl mb-8 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-brandPurple shrink-0" />
              <h3 className="font-bold text-white text-sm">Next Steps — Check Your Email</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              We've dispatched a confirmation email to your address containing your receipt and next instructions. Please check your inbox (and spam folder if needed).
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            {isAppFee && (
              <a
                href={verifiedData?.tuitionUrl || (rawAppId ? `/tuition?ref=${rawAppId}` : '/tuition')}
                className="w-full sm:w-auto bg-brandPurple text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brandPurple/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-950/50"
              >
                <span>Proceed to Tuition</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}

            {isTuition && (
              <a
                href="https://chat.whatsapp.com/KavR69S3M3rBox593jkKEw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50"
              >
                <span>Join Student WhatsApp Community</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}

            <a
              href="/"
              className="w-full sm:w-auto bg-neutral-900 border border-neutral-800 text-neutral-300 px-6 py-3.5 rounded-full font-semibold text-sm hover:border-neutral-700 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brandPurple" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
