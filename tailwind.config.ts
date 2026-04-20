import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand ─────────────────────────────────────────
        brand: {
          primary: '#7C6AF7',
          accent:  '#00D4B1',
          warm:    '#F0A500',
        },
        // ── Background scale ──────────────────────────────
        bg: {
          base:    '#07090F',
          subtle:  '#0D1117',
          muted:   '#161B27',
          overlay: '#1E2537',
        },
        // ── Surface / border ──────────────────────────────
        surface: {
          DEFAULT: '#1E2537',
          raised:  '#252D42',
          overlay: '#2C3652',
        },
        border: {
          DEFAULT: '#2C3652',
          strong:  '#3D4E6B',
        },
        // ── Text ──────────────────────────────────────────
        text: {
          primary:   '#E8ECF4',
          secondary: '#9AA5BE',
          muted:     '#5C6880',
          inverse:   '#07090F',
        },
        // ── Semantic ──────────────────────────────────────
        success: '#22C55E',
        warning: '#F0A500',
        error:   '#F43F5E',
        info:    '#38BDF8',
      },
      fontFamily: {
        display: ['var(--font-cal-sans)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-primary': '0 0 24px 0 rgba(124, 106, 247, 0.35)',
        'glow-accent':  '0 0 24px 0 rgba(0, 212, 177, 0.30)',
      },
    },
  },
  plugins: [],
}

export default config
