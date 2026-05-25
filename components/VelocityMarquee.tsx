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

const BASE_SPEED = 60;

function wrap(value: number, min: number, max: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export function VelocityMarquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 380 });
  const velocityFactor = useTransform(smoothVelocity, [-1200, 0, 1200], [-3, 0, 3], { clamp: false });
  const skew = useTransform(smoothVelocity, [-1200, 0, 1200], [-12, 0, 12], { clamp: true });

  const directionRef = useRef(1);
  useAnimationFrame((_, delta) => {
    let move = (delta / 1000) * BASE_SPEED * directionRef.current;
    const v = velocityFactor.get();
    if (v < 0) directionRef.current = -1;
    else if (v > 0) directionRef.current = 1;
    move += (delta / 1000) * BASE_SPEED * v * directionRef.current;
    baseX.set(wrap(baseX.get() + move, -3200, 0));
  });

  const x = useTransform(baseX, (v) => `${v}px`);
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative border-y border-hairline bg-paper-200/30 overflow-hidden mask-fade-edges">
      <motion.div
        style={{ x, skewX: skew }}
        className="flex w-max items-center gap-6 py-5 will-change-transform sm:gap-12 sm:py-7"
      >
        {doubled.map((text, i) => (
          <div
            key={`${text}-${i}`}
            className="flex items-center gap-6 whitespace-nowrap sm:gap-12"
          >
            <span className="text-lg font-bold tracking-tight text-ink-700 sm:text-2xl md:text-3xl">
              {text}
            </span>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lime-300/80" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
