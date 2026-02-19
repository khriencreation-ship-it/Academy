"use client";

import React, { useState } from "react";
import Link from "next/link";
import Form from "@/components/apply/Form";
import DarkVeil from "@/components/DarkVeil";

export default function ApplyPage() {
  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-10">
        <DarkVeil
          hueShift={180}
          noiseIntensity={0.02}
          scanlineIntensity={0.1}
          speed={0.3}
          scanlineFrequency={0.5}
          warpAmount={0.2}
        />
      </div>
      <Form />
    </>
  );
}
