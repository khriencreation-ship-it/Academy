import type { Metadata } from "next";
import CorporateTrainingClient from "@/components/corporate-training/CorporateTrainingClient";

export const metadata = {
  title: "AI Training for Companies in Nigeria | Khrien Academy",
  description:
    "Practical AI training for your staff, from prompt engineering to everyday AI workflows. Delivered virtually or at your office. Built on the AI Foundations curriculum.",
  openGraph: {
    title: "AI Training for Companies in Nigeria | Khrien Academy",
    description:
      "Practical AI training for your staff, from prompt engineering to everyday AI workflows. Delivered virtually or at your office.",
  },
};

export default function CorporateTrainingPage() {
  return <CorporateTrainingClient />;
}
