import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
        <Header />
        {children}
      </body>
    </html>
  );
}
