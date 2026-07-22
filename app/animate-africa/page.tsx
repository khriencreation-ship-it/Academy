import type { Metadata } from 'next';
import AnimateAfricaPage from "@/components/animate-africa/AnimateAfricaPage";

export const metadata: Metadata = {
  title: "Learn Animation For Free | Khrien Academy × Animate Africa",
  description: "Claim your free spot to learn 3D animation, studio workflows and storytelling. Brought to you by Khrien Academy in partnership with Animate Africa.",
};

export default function Page() {
  return <AnimateAfricaPage />;
}
