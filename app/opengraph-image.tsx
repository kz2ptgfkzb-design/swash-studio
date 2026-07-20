import { ImageResponse } from 'next/og';

export const alt = 'Swash - websites, brands, and motion';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#0A0908',
          backgroundImage:
            'linear-gradient(135deg, rgba(200,254,61,0.14), transparent 45%), linear-gradient(315deg, rgba(255,92,68,0.10), transparent 45%)',
          color: '#F4EEDF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Brand mark */}
          <svg width="76" height="76" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
            <rect width="240" height="240" rx="52" fill="#14110D" />
            <g transform="translate(4,22)" fill="none" stroke="#F4EEDF" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 8 84 C 20 78, 32 76, 44 72" strokeWidth="7" />
              <path d="M 44 72 C 70 36, 144 30, 176 60 C 200 84, 138 116, 84 124 C 44 130, 92 158, 162 160 C 184 161, 200 168, 196 180" strokeWidth="15" />
              <path d="M 196 180 C 208 184, 222 184, 230 174 C 234 168, 234 160, 228 154" strokeWidth="7" />
            </g>
            <circle cx="222" cy="170" r="11" fill="#C8FE3D" />
          </svg>
          <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#B5AE9C' }}>
            Swash Studio
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.03em' }}>
            Add a swash to it.
          </div>
          <div style={{ marginTop: 24, fontSize: 34, color: '#B5AE9C', maxWidth: 900, lineHeight: 1.3 }}>
            Websites, brands, and motion. A working video demo of your site within 48 hours.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#8C8678' }}>
          <span style={{ width: 40, height: 4, background: '#C8FE3D', borderRadius: 999 }} />
          swash.studio
        </div>
      </div>
    ),
    { ...size },
  );
}
