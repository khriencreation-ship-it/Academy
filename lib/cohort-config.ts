/**
 * Central Config & Helper for Catalyst Cohort Pricing & Dates
 */

export interface CohortConfig {
  cohortName: string;
  earlyBirdStart: string; // ISO date string or YYYY-MM-DD
  earlyBirdEnd: string;   // ISO date string or YYYY-MM-DD
  appFee: number;
  prices: {
    earlyBird: {
      single: number;
      bundle: number;
    };
    standard: {
      single: number;
      bundle: number;
      splitSingleInstallment: number; // 5000
      splitBundleInstallment: number; // 9000
    };
  };
}

export const CATALYST_COHORT_CONFIG: CohortConfig = {
  cohortName: "Catalyst Cohort",
  earlyBirdStart: "2026-10-01T00:00:00.000Z",
  earlyBirdEnd: "2026-10-08T23:59:59.999Z",
  appFee: 2000,
  prices: {
    earlyBird: {
      single: 8000,
      bundle: 15000,
    },
    standard: {
      single: 10000,
      bundle: 18000,
      splitSingleInstallment: 5000,
      splitBundleInstallment: 9000,
    },
  },
};

/**
 * Helper to determine if a given date is within the Early-Bird window.
 * Default to true during pre-registration/test window if current date is before end of early bird window.
 */
export function checkIsEarlyBird(dateToCheck: Date = new Date(), config: CohortConfig = CATALYST_COHORT_CONFIG): boolean {
  const checkTime = dateToCheck.getTime();
  const startTime = new Date(config.earlyBirdStart).getTime();
  const endTime = new Date(config.earlyBirdEnd).getTime();

  // If current date is between start and end, OR if we are testing/setting up prior to Oct 8
  if (isNaN(startTime) || isNaN(endTime)) return true;
  
  return checkTime <= endTime;
}

export function getPricingTier(dateToCheck: Date = new Date()): 'early_bird' | 'standard' {
  return checkIsEarlyBird(dateToCheck) ? 'early_bird' : 'standard';
}
