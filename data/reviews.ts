export type Review = {
  /** Display name of the reviewer */
  name: string;
  /** Company or project, shown under the name */
  company?: string;
  /** 1-5 */
  rating: number;
  /** The review text as approved */
  text: string;
  /** Month + year, e.g. "July 2026" */
  date: string;
  /** Where the review came from */
  source: 'site' | 'google';
};

/**
 * Approved public reviews.
 *
 * Submissions from the /reviews form land in the studio inbox via
 * /api/review. Nothing is published automatically - to publish one,
 * add it here (or ask Claude to) and deploy. Keep them verbatim.
 */
export const REVIEWS: Review[] = [];

/**
 * "Review us on Google" link. Set this once the Google Business Profile
 * is live (Google Business Profile -> Ask for reviews -> copy the
 * g.page/r/... short link). The button on /reviews stays hidden while
 * this is null.
 */
export const GOOGLE_REVIEW_URL: string | null = null;
