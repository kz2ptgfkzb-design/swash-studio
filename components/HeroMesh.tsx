'use client';

import { motion } from 'framer-motion';

/**
 * Animated gradient mesh — looks like a WebGL aurora, no canvas required.
 *
 * Four colored blobs drift on long loops, blur heavily, and blend
 * additively against the dark hero background. Respects reduced-motion
 * via media query inside the component.
 */
export function HeroMesh() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen motion-reduce:hidden"
    >
      {/* Lime blob — top-left, the brand accent */}
      <motion.div
        className="absolute h-[60vmin] w-[60vmin] rounded-full blur-[80px] opacity-[0.55]"
        style={{ background: 'radial-gradient(circle at center, #C8FE3D, transparent 60%)' }}
        initial={{ x: '-20%', y: '-10%' }}
        animate={{
          x: ['-20%', '15%', '-10%', '-20%'],
          y: ['-10%', '20%', '40%', '-10%'],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Hot red blob — far right, the second accent */}
      <motion.div
        className="absolute right-0 top-[20%] h-[55vmin] w-[55vmin] rounded-full blur-[90px] opacity-[0.42]"
        style={{ background: 'radial-gradient(circle at center, #FF5C44, transparent 65%)' }}
        initial={{ x: '20%', y: '0%' }}
        animate={{
          x: ['20%', '-5%', '25%', '20%'],
          y: ['0%', '40%', '15%', '0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Warm gold blob — bottom-center */}
      <motion.div
        className="absolute bottom-0 left-[30%] h-[45vmin] w-[45vmin] rounded-full blur-[100px] opacity-[0.4]"
        style={{ background: 'radial-gradient(circle at center, #FFC247, transparent 60%)' }}
        initial={{ x: '-10%', y: '20%' }}
        animate={{
          x: ['-10%', '20%', '-30%', '-10%'],
          y: ['20%', '-15%', '10%', '20%'],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Cool violet blob — drifts diagonally */}
      <motion.div
        className="absolute right-[10%] bottom-[10%] h-[50vmin] w-[50vmin] rounded-full blur-[110px] opacity-[0.32]"
        style={{ background: 'radial-gradient(circle at center, #6B5BFF, transparent 65%)' }}
        initial={{ x: '0%', y: '0%' }}
        animate={{
          x: ['0%', '-30%', '10%', '0%'],
          y: ['0%', '-25%', '-50%', '0%'],
        }}
        transition={{
          duration: 42,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* A static dark vignette to anchor the eye to the center copy */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 60%, transparent 30%, rgba(10,9,8,0.65) 90%)',
        }}
      />
    </div>
  );
}
