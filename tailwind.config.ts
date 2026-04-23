import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          light: "var(--brand-light)",
          sage: "var(--brand-sage)",
          dim: "var(--brand-dim)",
        },
        bg: {
          base: "var(--bg-base)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          inverse: "var(--bg-inverse)",
        },
        accent: {
          amber: "var(--accent-amber)",
          orange: "var(--accent-orange)",
          violet: "var(--accent-violet)",
          blue: "var(--accent-blue)",
          red: "var(--accent-red)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          ghost: "var(--text-ghost)",
          inverse: "var(--text-inverse)",
        },
        border: {
          default: "var(--border-default)",
          strong: "var(--border-strong)",
          brand: "var(--border-brand)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
        logo: "var(--font-pacifico)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        brand: "var(--shadow-brand)",
      },
    },
  },
  plugins: [],
};

export default config
