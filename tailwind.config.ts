import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07070B',
          900: '#0B0B12',
          800: '#12121C',
          700: '#1A1A26',
          600: '#252533',
          500: '#3A3A47',
        },
        bone: {
          50: '#FBFBF7',
          100: '#F4F4ED',
          200: '#E8E8DD',
          300: '#C8C8BB',
          400: '#9C9C8E',
          500: '#6E6E64',
        },
        glow: {
          lime: '#CDFA50',
          violet: '#7B61FF',
          peach: '#FF8A65',
          aqua: '#52E5C0',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
      fontSize: {
        'display-2xl': ['clamp(4rem, 12vw, 12rem)', { lineHeight: '0.88', letterSpacing: '-0.04em', fontWeight: '600' }],
        'display-xl':  ['clamp(3rem, 8vw, 8rem)',   { lineHeight: '0.92', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-lg':  ['clamp(2.5rem, 5.5vw, 5rem)', { lineHeight: '0.96', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-md':  ['clamp(2rem, 4vw, 3.5rem)',  { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-sm':  ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'eyebrow':     ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
      },
      borderRadius: {
        'card': '20px',
        'pill': '999px',
      },
      transitionTimingFunction: {
        'silk': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'rise': 'rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.04)' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        'aurora': 'radial-gradient(at 20% 30%, rgba(205,250,80,0.16) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(123,97,255,0.18) 0%, transparent 50%), radial-gradient(at 60% 80%, rgba(82,229,192,0.13) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};

export default config;
