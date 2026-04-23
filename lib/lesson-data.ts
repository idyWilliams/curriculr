// Shared types and data for the lesson view
export interface LessonData {
  id: string
  title: string
  type: 'video' | 'article' | 'project' | 'quiz'
  duration_minutes: number
  xp_reward: number
  order_index: number
  content: Record<string, unknown> | null
  module_id: string
}

export interface ModuleData {
  id: string
  title: string
  order_index: number
}

export interface TrackData {
  id: string
  name: string
  slug: string
  color: string
  lesson_count: number
}

export const TYPE_COLORS: Record<string, string> = {
  video: '#2563EB',
  article: '#7C6AF7',
  project: '#F97316',
  quiz: '#EC4899',
}

// Static seed for Frontend Engineering
export const STATIC_TRACK: TrackData = {
  id: '11111111-1111-1111-1111-111111111111',
  name: 'Frontend Engineering',
  slug: 'frontend-engineering',
  color: '#2563EB',
  lesson_count: 36,
}

export const STATIC_MODULES: ModuleData[] = [
  { id: 'm1', title: 'Foundations', order_index: 1 },
  { id: 'm2', title: 'JavaScript Core', order_index: 2 },
  { id: 'm3', title: 'React Fundamentals', order_index: 3 },
  { id: 'm4', title: 'Next.js Patterns', order_index: 4 },
]

export const STATIC_LESSONS: LessonData[] = [
  { id: 'l1', title: 'HTML & CSS Fundamentals', type: 'video', duration_minutes: 15, xp_reward: 50, order_index: 1, module_id: 'm1', content: { url: '#', notes: '# HTML Fundamentals\n\nLearn semantic HTML5.\n\n```html\n<main>\n  <h1>Hello World</h1>\n</main>\n```\n\n## Key Concepts\n- Semantic elements\n- Accessibility\n- SEO best practices' } },
  { id: 'l2', title: 'The Box Model & Layouts', type: 'video', duration_minutes: 12, xp_reward: 50, order_index: 2, module_id: 'm1', content: null },
  { id: 'l3', title: 'CSS Flexbox Mastery', type: 'article', duration_minutes: 10, xp_reward: 50, order_index: 3, module_id: 'm1', content: { markdown: '# Flexbox Mastery\n\nFlexbox is a one-dimensional layout method.\n\n```css\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n```\n\n## Properties\n- `flex-direction` controls flow\n- `justify-content` aligns on main axis\n- `align-items` aligns on cross axis\n\n## Common Patterns\n\n### Centering\n```css\n.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n```' } },
  { id: 'l4', title: 'CSS Grid Complete Guide', type: 'video', duration_minutes: 18, xp_reward: 50, order_index: 4, module_id: 'm1', content: null },
  { id: 'l5', title: 'Responsive Design', type: 'video', duration_minutes: 14, xp_reward: 50, order_index: 5, module_id: 'm1', content: null },
  { id: 'l6', title: 'Build a Portfolio Layout', type: 'project', duration_minutes: 45, xp_reward: 100, order_index: 6, module_id: 'm1', content: { brief: 'Build a fully responsive portfolio page.', requirements: ['Use CSS Grid for layout', 'Use Flexbox for nav', 'Add media queries', 'Deploy to Vercel'] } },
  { id: 'l7', title: 'JavaScript Deep Dive', type: 'video', duration_minutes: 20, xp_reward: 50, order_index: 1, module_id: 'm2', content: null },
  { id: 'l8', title: 'DOM Manipulation', type: 'video', duration_minutes: 16, xp_reward: 50, order_index: 2, module_id: 'm2', content: null },
  { id: 'l9', title: 'Async JavaScript', type: 'quiz', duration_minutes: 10, xp_reward: 50, order_index: 3, module_id: 'm2', content: { questions: [{ q: 'What does async/await do?', options: ['Makes code synchronous', 'Simplifies promise handling', 'Creates threads', 'Blocks execution'], correct: 1 }, { q: 'What does Promise.all() return?', options: ['First resolved promise', 'Array of results', 'Last resolved promise', 'undefined'], correct: 1 }] } },
  { id: 'l10', title: 'ES6+ Modern Syntax', type: 'article', duration_minutes: 15, xp_reward: 50, order_index: 4, module_id: 'm2', content: { markdown: '# ES6+ Features\n\n## Arrow Functions\n```js\nconst add = (a, b) => a + b;\n```\n\n## Destructuring\n```js\nconst { name, age } = person;\nconst [first, ...rest] = arr;\n```\n\n## Template Literals\n```js\nconst msg = `Hello ${name}`;\n```' } },
  { id: 'l11', title: 'Error Handling', type: 'video', duration_minutes: 12, xp_reward: 50, order_index: 5, module_id: 'm2', content: null },
  { id: 'l12', title: 'Interactive Todo App', type: 'project', duration_minutes: 60, xp_reward: 100, order_index: 6, module_id: 'm2', content: { brief: 'Build an interactive todo app with vanilla JS.', requirements: ['Add/remove todos', 'Mark complete', 'Filter by status', 'Persist to localStorage'] } },
  { id: 'l13', title: 'Why React?', type: 'video', duration_minutes: 18, xp_reward: 50, order_index: 1, module_id: 'm3', content: null },
  { id: 'l14', title: 'JSX, Props & State', type: 'video', duration_minutes: 20, xp_reward: 50, order_index: 2, module_id: 'm3', content: null },
  { id: 'l15', title: 'Hooks Deep Dive', type: 'video', duration_minutes: 25, xp_reward: 50, order_index: 3, module_id: 'm3', content: null },
  { id: 'l16', title: 'Component Patterns', type: 'article', duration_minutes: 15, xp_reward: 50, order_index: 4, module_id: 'm3', content: { markdown: '# Component Patterns\n\n## Composition\n```tsx\nfunction Card({ children }) {\n  return <div className="card">{children}</div>;\n}\n```\n\n## Render Props\n```tsx\n<DataFetcher render={(data) => <List items={data} />} />\n```' } },
  { id: 'l17', title: 'Build a Dashboard', type: 'project', duration_minutes: 90, xp_reward: 100, order_index: 5, module_id: 'm3', content: { brief: 'Build a dashboard UI with React.', requirements: ['Create reusable components', 'Use useState and useEffect', 'Fetch data from API', 'Handle loading and error states'] } },
  { id: 'l18', title: 'Next.js App Router', type: 'video', duration_minutes: 22, xp_reward: 50, order_index: 1, module_id: 'm4', content: null },
  { id: 'l19', title: 'Server vs Client', type: 'video', duration_minutes: 20, xp_reward: 50, order_index: 2, module_id: 'm4', content: null },
  { id: 'l20', title: 'Server Actions', type: 'video', duration_minutes: 24, xp_reward: 50, order_index: 3, module_id: 'm4', content: null },
]
