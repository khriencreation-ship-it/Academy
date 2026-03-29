import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import WhatsApp from "@/components/Whatsapp";
import LayoutWrapper from "@/components/LayoutWrapper";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Khrien Academy",
  description: "A platform for learning and sharing knowledge.",
};

const bricolage_grotesque = Bricolage_Grotesque({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage_grotesque.className} bg-white text-black`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        {/* Cloudflare Web Analytics */}
        <Script
          defer
          src='https://static.cloudflareinsights.com/beacon.min.js'
          data-cf-beacon='{"token": "5c1e94d3189443468a7a18ffe621de6b"}'
        />
      </body>
    </html>
  );
}
