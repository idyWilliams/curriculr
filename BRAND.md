# BRAND PERSONALITY

Curriculr is warm, smart, energetic, and proudly African.
Not cold and corporate. Not playful like a kids' app.

The feeling: "Walking into a beautifully designed library 
that has the energy of a hackathon."

Inspired by: Linear's precision + Duolingo's warmth + Vercel's elegance
Built in: Africa, for the world.

Tagline:     "Knowledge as a Service."
Sub-tagline: "Learn. Build. Integrate. Grow."

---

## COLOR SYSTEM — CSS VARIABLES

Paste this into /app/globals.css

:root {

  /* ── PRIMARY BRAND ─────────────────────────────── */
  --brand-primary:   #1B6B45;   /* Forest  — main CTAs, active nav, links     */
  --brand-light:     #24C97E;   /* Emerald — progress bars, hover, XP fills   */
  --brand-sage:      #6BAE8F;   /* Sage    — secondary accents, icons          */
  --brand-dim:       #D1FAE5;   /* Mint    — badge bg, selected card tint      */

  /* ── BACKGROUNDS (warm, NEVER cold white) ────── */
  --bg-base:         #F7F6F2;   /* Parchment — every page background           */
  --bg-surface:      #FFFFFF;   /* White     — cards, modals, panels           */
  --bg-elevated:     #EFEDE8;   /* Linen     — sidebar, secondary panels       */
  --bg-inverse:      #141410;   /* Ink       — dark sections, footer           */

  /* ── ACCENTS ────────────────────────────────── */
  --accent-amber:    #F59E0B;   /* Amber  — stars, streaks, achievements       */
  --accent-orange:   #F97316;   /* Blaze  — XP toasts, energy, "New" badges   */
  --accent-violet:   #7C6AF7;   /* Violet — API product, developer tools       */
  --accent-blue:     #2563EB;   /* Cobalt — Schools product, info states       */
  --accent-red:      #EF4444;   /* Crimson — errors, destructive only          */

  /* ── TEXT SYSTEM ────────────────────────────── */
  --text-primary:    #18181A;   /* Jet   — headlines, strong labels            */
  --text-secondary:  #52524E;   /* Slate — body copy, descriptions             */
  --text-muted:      #A8A89A;   /* Ash   — placeholders, timestamps, meta      */
  --text-ghost:      #D4D2CA;   /* Ghost — disabled states, dividers           */
  --text-inverse:    #F7F6F2;   /* Parchment — text on dark/inverse bg         */

  /* ── BORDERS ────────────────────────────────── */
  --border-default:  #E4E2DA;   /* Cards, inputs, dividers                     */
  --border-strong:   #C8C5BC;   /* Prominent dividers, hover state             */
  --border-brand:    #1B6B45;   /* Focused inputs, active/selected cards       */

  /* ── SHADOWS (warm, brown-tinted — never cold grey) */
  --shadow-sm:   0 1px 3px rgba(24,24,26,0.06), 0 1px 2px rgba(24,24,26,0.04);
  --shadow-md:   0 4px 16px rgba(24,24,26,0.08), 0 2px 6px rgba(24,24,26,0.05);
  --shadow-lg:   0 12px 40px rgba(24,24,26,0.12), 0 4px 12px rgba(24,24,26,0.06);
  --shadow-brand: 0 4px 20px rgba(27,107,69,0.25);  /* Green CTA glow         */

  /* ── TYPOGRAPHY ──────────────────────────────── */
  --font-display: 'Cal Sans', 'Inter', sans-serif;  /* All H1/H2/H3           */
  --font-body:    'Inter', system-ui, sans-serif;   /* All body + UI text     */
  --font-mono:    'Geist Mono', monospace;          /* Code blocks, API keys  */

  /* ── BORDER RADIUS ───────────────────────────── */
  --radius-sm:   6px;    /* Small elements — tags, small badges               */
  --radius-md:   10px;   /* Buttons, inputs                                   */
  --radius-lg:   16px;   /* Cards, panels                                     */
  --radius-xl:   20px;   /* Modals, large feature cards                       */
  --radius-pill: 999px;  /* Pills, avatars, full-round badges                 */

  /* ── TRANSITIONS ─────────────────────────────── */
  --transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow:   300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

---

## TAILWIND CONFIG MAPPING

Paste into tailwind.config.ts → theme.extend:

colors: {
  brand: {
    primary: 'var(--brand-primary)',
    light:   'var(--brand-light)',
    sage:    'var(--brand-sage)',
    dim:     'var(--brand-dim)',
  },
  bg: {
    base:     'var(--bg-base)',
    surface:  'var(--bg-surface)',
    elevated: 'var(--bg-elevated)',
    inverse:  'var(--bg-inverse)',
  },
  accent: {
    amber:  'var(--accent-amber)',
    orange: 'var(--accent-orange)',
    violet: 'var(--accent-violet)',
    blue:   'var(--accent-blue)',
    red:    'var(--accent-red)',
  },
  text: {
    primary:   'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    muted:     'var(--text-muted)',
    ghost:     'var(--text-ghost)',
    inverse:   'var(--text-inverse)',
  },
  border: {
    default: 'var(--border-default)',
    strong:  'var(--border-strong)',
    brand:   'var(--border-brand)',
  },
},
borderRadius: {
  sm:   'var(--radius-sm)',
  md:   'var(--radius-md)',
  lg:   'var(--radius-lg)',
  xl:   'var(--radius-xl)',
  pill: 'var(--radius-pill)',
},
fontFamily: {
  display: 'var(--font-display)',
  body:    'var(--font-body)',
  mono:    'var(--font-mono)',
},
boxShadow: {
  sm:    'var(--shadow-sm)',
  md:    'var(--shadow-md)',
  lg:    'var(--shadow-lg)',
  brand: 'var(--shadow-brand)',
},

---

## TYPOGRAPHY RULES

| Element       | Font       | Weight | Size (desktop) | Size (mobile) |
|---------------|------------|--------|----------------|---------------|
| H1 Hero       | Cal Sans   | 700    | clamp(48px, 8vw, 80px) | 40px  |
| H2 Section    | Cal Sans   | 700    | 48px           | 32px          |
| H3 Card Title | Cal Sans   | 600    | 24px           | 20px          |
| Body Large    | Inter      | 400    | 20px           | 18px          |
| Body Default  | Inter      | 400    | 16px           | 15px          |
| Body Small    | Inter      | 400    | 14px           | 14px          |
| Label/Badge   | Inter      | 600    | 12px           | 12px          |
| Code          | Geist Mono | 400    | 14px           | 13px          |

Letter spacing:
  Headlines: -0.03em (tight)
  Body: 0 (default)
  Labels/uppercase: +0.08em (loose)

Line height:
  Headlines: 1.05
  Body: 1.7
  Code: 1.6

---

## COMPONENT SPECS

BUTTONS:

Primary:
  bg: var(--brand-primary)     text: white     shadow: var(--shadow-brand)
  padding: 12px 24px           radius: var(--radius-md)    font: Inter 600 15px
  hover: bg #22885A, translateY(-1px), shadow grows
  active: translateY(0), scale(0.98)

Secondary/Outline:
  bg: transparent              border: 1.5px var(--border-default)
  text: var(--text-primary)
  hover: border var(--border-brand), bg var(--brand-dim)

Ghost:
  bg: transparent, no border   text: var(--text-secondary)
  hover: bg var(--bg-elevated), text var(--text-primary)

Destructive:
  bg: var(--accent-red)        text: white

ALL buttons:
  cursor-pointer · user-select-none · font-semibold
  focus-visible: ring 2px var(--brand-primary), ring-offset 2px
  transition: var(--transition-fast)
  NEVER default shadcn blue

CARDS:
  bg: var(--bg-surface)
  border: 1px solid var(--border-default)
  border-radius: var(--radius-lg)
  box-shadow: var(--shadow-sm)
  padding: 24px
  hover (interactive):
    box-shadow: var(--shadow-md)
    border-color: var(--border-strong)
    translateY(-2px)
    transition: var(--transition-normal)

INPUTS:
  bg: var(--bg-surface)
  border: 1.5px solid var(--border-default)
  radius: var(--radius-md)
  padding: 12px 16px
  font: Inter 15px, var(--text-primary)
  placeholder: var(--text-muted)
  focus:
    border-color: var(--border-brand)
    box-shadow: 0 0 0 3px rgba(27,107,69,0.12)
    outline: none
  transition: var(--transition-fast)

BADGES / PILLS:
  radius: var(--radius-pill)
  padding: 4px 12px
  font: Inter 600 12px

  Default:  bg var(--bg-elevated),  text var(--text-secondary), border var(--border-default)
  Green:    bg var(--brand-dim),    text var(--brand-primary)
  Orange:   bg #FFF3E0,             text var(--accent-orange)
  Violet:   bg #EDE9FE,             text var(--accent-violet)
  Blue:     bg #DBEAFE,             text var(--accent-blue)
  Amber:    bg #FEF3C7,             text var(--accent-amber)
  Red:      bg #FEE2E2,             text var(--accent-red)

---

## PRODUCT COLOR IDENTITIES

Each of the 4 Curriculr products has its own accent:

  Curriculr Learn      →  Forest Green  #1B6B45  (primary brand)
  Curriculr API        →  Violet        #7C6AF7
  For Schools          →  Cobalt        #2563EB
  For Teams            →  Blaze         #F97316

Each learning track also has its own color:
  Frontend Engineering  →  Cobalt   #2563EB
  Backend Engineering   →  Forest   #1B6B45
  Data Analysis         →  Blaze    #F97316
  UI/UX Design          →  Violet   #7C6AF7
  Generative AI         →  Pink     #EC4899
  Mobile (Flutter)      →  Cobalt   #2563EB
  DevOps & Cloud        →  Amber    #F59E0B
  Cybersecurity         →  Crimson  #EF4444
  Product Management    →  Sage     #6BAE8F
  Blockchain/Web3       →  Violet   #7C6AF7
  Systems Design        →  Blaze    #F97316
  Kids Coding           →  Amber    #F59E0B

---

## GAMIFICATION COLOR SIGNALS

  🌱 Beginner    →  Sage    #6BAE8F
  🧭 Explorer    →  Cobalt  #2563EB
  🔨 Builder     →  Blaze   #F97316
  🏗️ Architect   →  Violet  #7C6AF7
  🏆 Master      →  Amber   #F59E0B

  Streak flame 🔥   →  Amber    #F59E0B
  XP toast          →  Emerald  #24C97E
  Badge unlock      →  Amber    #F59E0B
  Error             →  Crimson  #EF4444
  Success           →  Forest   #1B6B45

---

## THE GOLDEN RULES (memorize these)

1. EVERY page background = Parchment #F7F6F2 — NEVER plain #FFFFFF
2. EVERY primary CTA = Forest #1B6B45 — NEVER default blue
3. EVERY progress/win moment = Emerald #24C97E
4. EVERY shadow = warm brown-tinted — NEVER cold grey
5. EVERY border = #E4E2DA — NEVER #E5E7EB (Tailwind gray-200)
6. NEVER use Tailwind's default color classes (blue-*, gray-*, etc)
   — ALWAYS use brand tokens (bg-brand-primary, text-text-muted, etc)
7. Dark sections use Ink #141410 — NEVER pure black #000000
8. Focus rings are ALWAYS brand green — NEVER default blue
9. Font for ALL headlines = Cal Sans — NEVER font-bold on plain Inter
10. Space is in multiples of 4px — base unit is 4

---

## HOW TO USE IN PROMPTS

When prompting Cursor or Claude, start every prompt with:

"@BRAND.md — Use the Curriculr brand system.
No hardcoded colors. No default Tailwind palette.
Every color, shadow, radius and font from the token system only."