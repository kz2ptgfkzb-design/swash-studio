/**
 * Curated Unsplash photo URLs organized by demo / topic.
 *
 * Unsplash License: free for commercial use, no attribution required.
 * https://unsplash.com/license
 *
 * Swap any photo ID for one of your own. URL format is:
 *   https://images.unsplash.com/photo-{ID}?w=X&h=Y&fit=crop&q=80
 */

function u(id: string, w = 1200, h = 800, q = 80): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=${q}&auto=format`;
}

export const PHOTOS = {
  // ─── Mit-Mak Motors (real rebuild - dealership) ────────────────
  mitmak: {
    hero: u('1503376780353-7e6692767b70', 1600, 1100), // dark sports car at dusk
  },

  // ─── Doctors 365 (real rebuild - GP practice) ──────────────────
  doctors365: {
    hero: u('1631217868264-e5b90bb7e133', 1600, 1100), // modern clinic
  },

  // ─── Overlay (SaaS) ────────────────────────────────────────────
  overlay: {
    team:     u('1551434678-e076c223a692', 800, 600),   // team in meeting
    office:   u('1497366216548-37526070297c', 800, 600),  // office workspace
    laptop:   u('1517694712202-14dd9538aa97', 800, 600),  // laptop on desk
    headshot: u('1494790108377-be9c29b29330', 400, 400),  // professional headshot
  },

  // ─── R.E. Michel (real rebuild - HVAC/R distributor) ───────────
  remichel: {
    hero: u('1615309662243-70f6df917b59', 1600, 1100), // industrial HVAC ductwork
  },

};
