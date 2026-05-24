'use client';

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion';
import { useRef } from 'react';

const ITEMS = [
  'HVAC dispatchers',
  'Coastal apparel',
  'Neighborhood bakeries',
  'Boutique brokerages',
  'B2B SaaS launches',
  'Skincare drops',
  'Dental practices',
  'Dropshipping storefronts',
  'Restaurant reservations',
  'Plumbing & electrical',
  'Law firm refreshes',
  'Creator portfolios',
  'Membership platforms',
  'Yoga studios',
];

const BASE_SPEED = 60; // px / second

function wrap(value: number, min: number, max: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export function VelocityMarquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 380,
  });
  const velocityFactor = useTransform(smoothVelocity, [-1200, 0, 1200], [-3, 0, 3], {
    clamp: false,
  });
  const skew = useTransform(smoothVelocity, [-1200, 0, 1200], [-12, 0, 12], { clamp: true });

  // Move the marquee continuously, accelerated by scroll velocity
  const directionRef = useRef(1);
  useAnimationFrame((_, delta) => {
    let move = (delta / 1000) * BASE_SPEED * directionRef.current;
    const v = velocityFactor.get();
    if (v < 0) directionRef.current = -1;
    else if (v > 0) directionRef.current = 1;
    move += (delta / 1000) * BASE_SPEED * v * directionRef.current;
    baseX.set(wrap(baseX.get() + move, -2000, 0));
  });

  const x = useTransform(baseX, (v) => `${v}px`);

  // We render the items twice to allow seamless wrap
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative border-y border-hairline bg-paper-200/30 py-7 overflow-hidden mask-fade-edges">
      <motion.div
        style={{ x, skewX: skew }}
        className="flex w-max gap-12 will-change-transform"
      >
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            <span className="font-display italic text-2xl tracking-tight text-ink-700/85 md:text-3xl">
              {item}
            </span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              className="text-lime-300"
            >
              <circle cx="6" cy="6" r="5" fill="currentColor" />
            </svg>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
