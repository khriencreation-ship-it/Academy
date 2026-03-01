"use client";

import Form from "@/components/apply/Form";
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
