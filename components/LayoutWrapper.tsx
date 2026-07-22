"use client";

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer&Cta";
import WhatsApp from "@/components/Whatsapp";
import Script from "next/script";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExcluded = pathname.startsWith('/khrienadmin') || pathname === '/scholarship-test' || pathname.startsWith('/animate-africa');

  if (isExcluded) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <WhatsApp />
      {children}
      <Footer />
      {/* Cloudflare Web Analytics - Only on public pages and in production */}
      {process.env.NODE_ENV === 'production' && (
        <Script
          defer
          src='https://static.cloudflareinsights.com/beacon.min.js'
          data-cf-beacon='{"token": "5c1e94d3189443468a7a18ffe621de6b"}'
        />
      )}
    </>
  );
}
