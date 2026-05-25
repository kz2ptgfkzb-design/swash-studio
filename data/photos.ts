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
  // ─── Pipeline & Co. (plumber) ──────────────────────────────────
  pipeline: {
    hero:        u('1581094288338-2314dddb7ece', 1600, 1100), // industrial pipes
    tools:       u('1530124566582-a618bc2615dc', 800, 800),   // tools
    plumberWork: u('1607400201515-c2c41c07d307', 800, 800),   // plumber at work
    pipes:       u('1473773508845-188df298d2d1', 800, 800),   // pipe close-up
    truck:       u('1486006920555-c77dcf18193c', 800, 800),   // service truck
  },

  // ─── Ember & Table (restaurant) ────────────────────────────────
  ember: {
    hero:        u('1509440159596-0249088772ff', 1200, 1500), // artisan bread
    interior:    u('1517248135467-4c7edcad34c4', 1600, 1100), // restaurant interior
    breadStudio: u('1568254183919-78a4f43a2877', 800, 1000),  // bread close-up
    pasta:       u('1551183053-bf91a1d81141', 800, 800),      // pasta
    plate:       u('1551218808-94e220e084d2', 800, 800),      // plated dish
    fire:        u('1503788311183-fa3bf9c4bc32', 800, 800),   // wood fire
    chef:        u('1577219491135-ce391730fb2c', 800, 1000),  // chef portrait
  },

  // ─── Overlay (SaaS) ────────────────────────────────────────────
  overlay: {
    team:     u('1551434678-e076c223a692', 800, 600),   // team in meeting
    office:   u('1497366216548-37526070297c', 800, 600),  // office workspace
    laptop:   u('1517694712202-14dd9538aa97', 800, 600),  // laptop on desk
    headshot: u('1494790108377-be9c29b29330', 400, 400),  // professional headshot
  },

  // ─── Holm (real estate) ────────────────────────────────────────
  holm: {
    hero:           u('1600585154340-be6161a56a0c', 1600, 1100), // modern home exterior
    interiorOpen:   u('1565538810643-b5bdb714032a', 1200, 900),  // open interior
    kitchen:        u('1556909114-f6e7ad7d3136', 1200, 900),     // modern kitchen
    bedroom:        u('1567016376408-0226e4d0c1ea', 1200, 900),  // bedroom
    living:         u('1556228720-195a672e8a03', 1200, 900),     // living room
    bathroom:       u('1552321554-5fefe8c9ef14', 1200, 900),     // bathroom
    listingPrimary: u('1564013799919-ab600027ffc6', 1200, 900),  // bright living
    listingTwo:     u('1568605114967-8130f3a36994', 1200, 900),  // house exterior
    listingThree:   u('1554995207-c18c203602cb', 1200, 900),     // condo balcony
    listingFour:    u('1600607687939-ce8a6c25118c', 1200, 900),  // hallway
    agent1:         u('1573497019940-1c28c88b4f3e', 400, 400),   // agent 1
    agent2:         u('1494790108377-be9c29b29330', 400, 400),   // agent 2
    agent3:         u('1507003211169-0a1dd7228f2d', 400, 400),   // agent 3
    agent4:         u('1438761681033-6461ffad8d80', 400, 400),   // agent 4
  },

  // ─── Case studies (Work page) ──────────────────────────────────
  // Matches WORK[].slug in data/work.ts
  workCovers: {
    'apex-mechanical': u('1581094288338-2314dddb7ece', 1100, 880),
    'saltwater-co':    u('1551232864-3f0890e580d9', 1100, 880), // coastal apparel
    'kilncraft':       u('1509440159596-0249088772ff', 1100, 880),
    'tidemark-realty': u('1600585154340-be6161a56a0c', 1100, 880),
    'overlay-labs':    u('1551434678-e076c223a692', 1100, 880),
    'mira-skin':       u('1556228852-80b6e5eeff06', 1100, 880), // skincare
  } as Record<string, string>,
};
