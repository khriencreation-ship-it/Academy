"use client";

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer&Cta";
import WhatsApp from "@/components/Whatsapp";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExcluded = pathname === '/scholarship-test';

  if (isExcluded) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <WhatsApp />
      {children}
      <Footer />
    </>
  );
}
