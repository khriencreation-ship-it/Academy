# Khrien Academy — Catalyst Cohort Application System
### Build spec for AI coding agent

You are building the application and payment flow for Khrien Academy's Catalyst Cohort (Cohort 2). This document describes the full flow, data model, and business rules. Build the backend dashboard logic, application form, and automated emails described below.

---

## 1. Overview

Applicants fill out a short form, pay a non-refundable application fee via Flutterwave, get auto-confirmed once payment succeeds, then are directed to pay tuition. After tuition is paid, they're sent a placement check. The system must handle people who abandon the process before paying, so they can resume without re-filling the form.

---

## 2. Application form fields

Build a form with these fields only:

1. Full name (text, required)
2. Email address (email, required)
3. WhatsApp number (text, required)
4. Location — state and country (text, required)
5. Date of birth (date, required)
6. Current status (single select, required): Student / Employed / Freelancer / Business owner / Job seeker / Other
7. Course selection (required):
   - Toggle: "Single course" or "2-course bundle (save ₦2,000)"
   - If single: select one of: AI Foundations and Practical Intelligence / UI/UX Design / WordPress Development / Product Management / Frontend Engineering / Customer Success and Support Operations
   - If bundle: select exactly two of the same six options
8. Tech experience (single select, required): Complete beginner / Some exposure / Intermediate / Advanced
9. Motivation — why they want to take this course (short text, required)
10. How they heard about the Catalyst Cohort (single select, required): Khrien community / WhatsApp / Instagram / A friend / Other

**Terms checkboxes (all required to submit):**
- I understand the ₦2,000 application fee is non-refundable.
- I understand that early-bird pricing requires full payment and is not eligible for split payment. *(only show this checkbox if the current date is within the early-bird window — see pricing rules below)*
- I understand that after my tuition is paid, I'll be asked to complete a short placement check.

---

## 3. Data model

Each application record needs at minimum:

- `application_id` (unique, used in resume links)
- `full_name`, `email`, `whatsapp`, `location`, `date_of_birth`
- `current_status`, `tech_experience`, `motivation`, `referral_source`
- `course_selection` (single course name, or array of 2 for bundle)
- `pricing_tier` (`early_bird` or `standard`) — set automatically based on submission timestamp vs. the early-bird window
- `application_fee_status`: `pending` / `paid` / `failed`
- `tuition_status`: `not_started` / `pending` / `paid` / `failed`
- `payment_plan`: `full` or `split` (split only allowed if `pricing_tier = standard`)
- `placement_test_status`: `not_sent` / `sent` / `completed`
- `created_at`, `updated_at` timestamps for each status change

---

## 4. Application fee payment flow

1. On form submit, before any payment happens:
   - Create the application record with `application_fee_status = pending`
   - Immediately send an email to the applicant containing a unique resume link: `khrienacademy.com/continue?ref={application_id}`
   - This email is sent regardless of what happens next, it's the safety net for abandonment
2. Immediately after submit, open a Flutterwave payment modal in the same session for the ₦2,000 application fee. Do not make the applicant navigate away from the page to pay.
3. Do not rely on the redirect/callback URL alone to confirm payment. Listen for the Flutterwave webhook as the source of truth.
4. On webhook confirmation of successful payment:
   - Set `application_fee_status = paid`
   - Send an automatic confirmation email: application received and successful, with a pre-filled link to the tuition payment step (no need to re-enter course or personal details)
5. On webhook confirmation of failed payment:
   - Set `application_fee_status = failed`
   - Send an automatic email: payment didn't go through, with the same resume link from step 1, so they can retry

---

## 5. Resume flow (abandoned applications)

- The resume link sent in step 4.1 above is the only mechanism needed, no separate "detect abandonment" logic required.
- `khrienacademy.com/continue?ref={application_id}` should:
  - Look up the application by `application_id`
  - If `application_fee_status = pending` or `failed`: show their submitted details (do not make them re-fill the form) and reopen the Flutterwave modal for the ₦2,000 fee
  - If `application_fee_status = paid` and `tuition_status` is not `paid`: show their status and link to tuition payment
  - If `tuition_status = paid`: show confirmation, no further payment action needed

---

## 6. Tuition payment flow

1. Triggered from the confirmation email or the resume page, once `application_fee_status = paid`
2. Tuition amount and payment plan depend on `pricing_tier`:
   - **Early bird:** ₦8,000 per course, or **₦14,000 for the 2-course bundle** *(⚠ unconfirmed — Jake also mentioned ₦15,000 for the bundle; confirm the correct figure before building)*. Full payment only, no split option. The email link for early-bird applicants goes straight to a single Flutterwave charge, no payment-plan choice shown at all.
   - **Standard:** ₦10,000 per course, or ₦18,000 for the 2-course bundle. Applicant chooses between two fixed options, never a free-text amount:
     - **Full payment:** ₦10,000 (single) or ₦18,000 (bundle), one transaction
     - **Split payment (fixed 50/50, not editable by the applicant):**
       - Single course: ₦5,000 now + ₦5,000 due by a fixed date before the course ends
       - Bundle: ₦9,000 now + ₦9,000 due by a fixed date before the course ends
     - Do not let the applicant type in a custom amount for split payment. Fixed amounts only, so reconciliation and revenue reporting stay predictable.
3. Same webhook-based confirmation pattern as the application fee: set `tuition_status = paid` (or `partially_paid` after the first split installment) on webhook success, `failed` on failure (with a retry email using the same resume link pattern).
4. For split payments, send a reminder email ahead of the second installment's due date, with a direct payment link for the fixed remaining amount.
5. On `tuition_status = paid` (full amount received, whether in one or two installments), set `placement_test_status = sent` and trigger the placement check email/link.

---

## 7. Pricing tier logic

Automatic detection, no applicant input, no self-selection:

1. Configure two dates in the backend (a simple settings table is fine): early-bird start date and early-bird end date. These must be editable per cohort, not hardcoded, since the window will change each time.
2. When someone submits the application form, the system checks the current date against that window at the moment of submission, and stamps the application with `pricing_tier = early_bird` or `pricing_tier = standard` automatically.
3. That tier is what determines everything downstream:
   - Which price shows on the tuition payment link (early-bird vs. standard amounts from section 6)
   - Whether the "pay in full or pay in 2 installments" choice even appears at all — it should only be shown if `pricing_tier = standard`; early-bird applicants never see a payment-plan choice, since split payment isn't available to them
4. Once `pricing_tier` is set at application time, it does not change later, even if the early-bird window closes before the applicant completes tuition payment. This locks in the rate they applied under.

---

## 8. Notes for the agent

- All monetary values are in Nigerian Naira (₦).
- Every payment step must be idempotent, a webhook firing twice should not double-charge or duplicate confirmation emails.
- Application fee revenue and tuition revenue should be tracked separately in reporting, since they're treated differently in Khrien's internal revenue-sharing model with external tutors (not required for this build, just don't merge them into one "revenue" field).
- Build status changes to be visible in an admin dashboard view, so the team can see where applicants are stuck in the funnel (pending fee payment, pending tuition, pending placement test) without querying the database directly.
