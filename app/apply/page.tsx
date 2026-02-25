"use client";

import React, { useState } from "react";
import Link from "next/link";
import Form from "@/components/apply/Form";
import DarkVeil from "@/components/DarkVeil";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ApplyPage() {
  return (
    <>
      <>
        <ToastContainer position="top-right" />
        <Form />
      </>
    </>
  );
}
