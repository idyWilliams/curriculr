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
          primary: 'var(--color-brand-primary)',
          'primary-hover': 'var(--color-brand-primary-hover)',
          light: 'var(--color-brand-light)',
          accent: 'var(--color-brand-accent)',
          yellow: 'var(--color-brand-yellow)',
          blue: 'var(--color-brand-blue)',
        },
        // ── Backgrounds ───────────────────────────────────
        bg: {
          base: 'var(--color-bg-base)',
          surface: 'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
          sidebar: 'var(--color-bg-sidebar)',
        },
        // ── Surfaces ──────────────────────────────────────
        surface: {
          DEFAULT: 'var(--color-bg-surface)',
          raised: 'var(--color-bg-elevated)',
        },
        // ── Borders ───────────────────────────────────────
        border: {
          DEFAULT: 'var(--color-border)',
        },
        // ── Text ──────────────────────────────────────────
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        // ── Semantic ──────────────────────────────────────
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'glow-primary': 'var(--shadow-glow-primary)',
      },
    },
  },
  plugins: [],
}

export default config
