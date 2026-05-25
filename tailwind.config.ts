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
        // Backgrounds (now dark — was light)
        paper: {
          50:  '#14110D',
          100: '#0A0908',
          200: '#1A1612',
          300: '#252019',
          400: '#3A3530',
          500: '#5A5045',
        },
        // Text + foreground (now light cream — was dark ink)
        ink: {
          50:  '#0A0908',   // pure dark (for cards/buttons)
          100: '#6F6A5C',
          200: '#8C8678',
          300: '#A29B89',
          400: '#B5AE9C',   // muted text
          500: '#D2CAB6',
          600: '#E8E1CE',
          700: '#F4EEDF',   // main text colour — warm cream
          800: '#FBF6E8',
          900: '#FFFFFF',
        },
        // The bone scale — secondary off-whites for legacy refs
        bone: {
          50:  '#FBF6E8',
          100: '#F4EEDF',
          200: '#E8E1CE',
          300: '#D2CAB6',
          400: '#A29B89',
          500: '#6F6A5C',
        },
        // Accent — acid lime, the single explosive colour
        lime: {
          50:  '#F0FFD0',
          100: '#DCFE9F',
          200: '#CDFE6B',
          300: '#C8FE3D',  // primary accent
          400: '#A8DA1F',
          500: '#7FA712',
          600: '#5C7A0D',
        },
        // Saved for accent variety — used sparingly
        ink_red: {
          50:  '#FBEBE7',
          100: '#F5C8BF',
          200: '#E89789',
          300: '#D86C5A',
          400: '#FF5C44',  // shifted hotter for dark theme
          500: '#C2402F',
          600: '#9A2E20',
        },
        gold: {
          50:  '#FCF3DE',
          100: '#F8E2B0',
          200: '#F2C975',
          300: '#FFC247',
          400: '#E8A53D',
          500: '#C8862B',
          600: '#9A6620',
        },
        saffron: {
          50:  '#FCF3DE',
          100: '#F8E2B0',
          200: '#F2C975',
          300: '#FFC247',
          400: '#E8A53D',
          500: '#C8862B',
          600: '#9A6620',
        },
        ash: {
          400: '#6F6A5C',
          500: '#8C8678',
          600: '#A29B89',
        },
        hairline: '#252019',
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
      fontSize: {
        'display-2xl': ['clamp(2.5rem, 11vw, 14rem)',  { lineHeight: '0.9',  letterSpacing: '-0.045em', fontWeight: '500' }],
        'display-xl':  ['clamp(2rem, 8vw, 9.5rem)',    { lineHeight: '0.92', letterSpacing: '-0.04em',  fontWeight: '500' }],
        'display-lg':  ['clamp(1.75rem, 5.5vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.035em', fontWeight: '500' }],
        'display-md':  ['clamp(1.5rem, 4vw, 4rem)',    { lineHeight: '1.05', letterSpacing: '-0.03em',  fontWeight: '500' }],
        'display-sm':  ['clamp(1.25rem, 2.8vw, 2.5rem)', { lineHeight: '1.18', letterSpacing: '-0.02em', fontWeight: '600' }],
        'eyebrow':     ['0.6875rem', { lineHeight: '1', letterSpacing: '0.24em', fontWeight: '500' }],
      },
      borderRadius: {
        'card': '16px',
        'pill': '999px',
      },
      transitionTimingFunction: {
        'silk': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'marquee': 'marquee 55s linear infinite',
        'marquee-reverse': 'marqueeReverse 70s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
        'spin-slower': 'spin 80s linear infinite',
        'rise': 'rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'draw': 'draw 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'ink-bleed': 'inkBleed 1.2s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        rise: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        draw: {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.08)' },
        },
        inkBleed: {
          '0%':   { transform: 'scale(0)', opacity: '0' },
          '60%':  { transform: 'scale(1.04)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        'paper-grain': "radial-gradient(at 20% 30%, rgba(200,254,61,0.08) 0%, transparent 40%), radial-gradient(at 80% 85%, rgba(255,92,68,0.06) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
