"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaCheckCircle, FaSpinner, FaEnvelope, FaPhoneAlt, FaBuilding, FaUser, FaUsers, FaCalendarAlt } from "react-icons/fa";

export default function EnquiryFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    companyName: "",
    staffCount: "1 to 5 staff",
    deliveryMode: "Virtual",
    departments: "",
    goals: "",
    startDate: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/corporate-training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again or contact us directly.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="enquiry-form" className="py-20 lg:py-28 bg-neutral-950 text-white relative border-t border-neutral-900">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brandPurple/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-brandPurple mb-3 block"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Ready to make your team AI-confident?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300"
          >
            Tell us about your team and we will design a programme that fits your exact needs.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 px-4"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-4xl">
                <FaCheckCircle />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Enquiry Received!</h3>
              <p className="text-gray-300 text-base max-w-lg mx-auto mb-8">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. We have received your team training request for <strong className="text-white">{formData.companyName}</strong>. Our corporate team will reach out within 24 hours to finalize your program details.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm transition-colors"
              >
                Submit another enquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Full Name <span className="text-brandPurple">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Work Email <span className="text-brandPurple">*</span>
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    required
                    value={formData.workEmail}
                    onChange={handleChange}
                    placeholder="e.g. sarah@company.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple text-sm transition-all"
                  />
                </div>
              </div>

              {/* Phone & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Phone / WhatsApp Number <span className="text-brandPurple">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +234 812 345 6789"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Company Name <span className="text-brandPurple">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corporation"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple text-sm transition-all"
                  />
                </div>
              </div>

              {/* Staff Count & Delivery Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Number of Staff to be Trained <span className="text-brandPurple">*</span>
                  </label>
                  <select
                    name="staffCount"
                    value={formData.staffCount}
                    onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple text-sm transition-all"
                  >
                    <option value="Individual (1 staff)">Individual (1 staff)</option>
                    <option value="1 to 5 staff">1 to 5 staff</option>
                    <option value="6 to 10 staff">6 to 10 staff</option>
                    <option value="11 to 25 staff">11 to 25 staff</option>
                    <option value="25+ staff (Custom Quote)">25+ staff (Custom Quote)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Preferred Delivery <span className="text-brandPurple">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 pt-0.5">
                    <label
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                        formData.deliveryMode === "Virtual"
                          ? "bg-brandPurple/20 border-brandPurple text-white"
                          : "bg-neutral-950 border-neutral-800 text-gray-400 hover:border-neutral-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMode"
                        value="Virtual"
                        checked={formData.deliveryMode === "Virtual"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      Virtual Online
                    </label>

                    <label
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                        formData.deliveryMode === "At our office"
                          ? "bg-brandPurple/20 border-brandPurple text-white"
                          : "bg-neutral-950 border-neutral-800 text-gray-400 hover:border-neutral-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMode"
                        value="At our office"
                        checked={formData.deliveryMode === "At our office"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      At Our Office
                    </label>
                  </div>
                </div>
              </div>

              {/* Departments / Roles */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Departments or Roles Involved <span className="text-brandPurple">*</span>
                </label>
                <input
                  type="text"
                  name="departments"
                  required
                  value={formData.departments}
                  onChange={handleChange}
                  placeholder="e.g. Operations, Marketing, Executive Leadership, HR"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple text-sm transition-all"
                />
              </div>

              {/* Goals */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  What do you want your team to achieve with AI? <span className="text-brandPurple">*</span>
                </label>
                <textarea
                  name="goals"
                  required
                  rows={4}
                  value={formData.goals}
                  onChange={handleChange}
                  placeholder="Tell us about your current AI use, key bottlenecks, or target outcomes..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple text-sm transition-all resize-none"
                />
              </div>

              {/* Preferred Start Date */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Preferred Start Date <span className="text-gray-500 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple text-sm transition-all"
                />
              </div>

              {/* Error Message */}
              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 px-6 rounded-xl bg-brandPurple hover:bg-brandPurple/90 text-white font-bold text-base shadow-lg shadow-purple-950/50 hover:shadow-brandPurple/30 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    Submitting Enquiry...
                  </>
                ) : (
                  <>
                    Book Your Team Training
                    <FaPaperPlane className="text-sm" />
                  </>
                )}
              </button>

            </form>
          )}

          {/* Contact note */}
          <div className="mt-8 pt-6 border-t border-neutral-800 text-center text-xs text-gray-400 italic">
            Questions first? Reach us at <a href="mailto:hello@khrien.com" className="text-brandPurple underline">hello@khrien.com</a> or WhatsApp.
          </div>
        </div>

      </div>
    </section>
  );
}
