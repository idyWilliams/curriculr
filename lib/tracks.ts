export interface Track {
  slug: string
  title: string
  category: TrackCategory
  color: string
  lessons: number
  projects: number
  hours: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  enrolled: number
  description: string
  whatYouWillLearn: string[]
  requirements: string[]
  instructor: {
    name: string
    avatar: string
    bio: string
  }
  modules: Module[]
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: 'lesson' | 'quiz' | 'project'
  isFree: boolean
  requiresAccount: boolean
  requiresPro: boolean
}

export type TrackCategory = 'Frontend' | 'Backend' | 'Data' | 'Design' | 'AI' | 'Kids'

export const CATEGORY_COLORS: Record<TrackCategory, string> = {
  Frontend: '#3B6FE8',
  Backend: '#1A6B4A',
  Data: '#F97316',
  Design: '#7C6AF7',
  AI: '#EC4899',
  Kids: '#FBBF24',
}

export const tracks: Track[] = [
  {
    slug: 'frontend-engineering',
    title: 'Frontend Engineering',
    category: 'Frontend',
    color: '#3B6FE8',
    lessons: 24,
    projects: 6,
    hours: 40,
    level: 'Beginner',
    enrolled: 3842,
    description: 'Master HTML, CSS, JavaScript, React and TypeScript through hands-on projects.',
    whatYouWillLearn: [
      'Build responsive websites with HTML5 and CSS3',
      'Master JavaScript fundamentals and ES6+ features',
      'Create dynamic UIs with React and hooks',
      'Type-safe development with TypeScript',
      'Modern build tools and deployment',
      'Performance optimization techniques',
    ],
    requirements: [
      'Basic computer skills',
      'No programming experience required',
      'A computer with internet access',
    ],
    instructor: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      bio: 'Senior Frontend Engineer at Vercel. 10+ years building web experiences.',
    },
    modules: [
      {
        id: 'module-1',
        title: 'HTML & CSS Fundamentals',
        lessons: [
          { id: 'lesson-1', title: 'Introduction to HTML', duration: '12 min', type: 'lesson', isFree: true, requiresAccount: false, requiresPro: false },
          { id: 'lesson-2', title: 'Semantic HTML', duration: '15 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
          { id: 'lesson-3', title: 'CSS Basics', duration: '18 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
          { id: 'lesson-4', title: 'Box Model Deep Dive', duration: '20 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'lesson-5', title: 'Flexbox Layout', duration: '25 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'quiz-1', title: 'HTML & CSS Quiz', duration: '10 min', type: 'quiz', isFree: false, requiresAccount: true, requiresPro: false },
        ],
      },
      {
        id: 'module-2',
        title: 'JavaScript Essentials',
        lessons: [
          { id: 'lesson-6', title: 'JavaScript Fundamentals', duration: '20 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'lesson-7', title: 'DOM Manipulation', duration: '22 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'lesson-8', title: 'Events & Handlers', duration: '18 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'project-1', title: 'Build a Calculator', duration: '2 hrs', type: 'project', isFree: false, requiresAccount: false, requiresPro: true },
        ],
      },
      {
        id: 'module-3',
        title: 'React & TypeScript',
        lessons: [
          { id: 'lesson-9', title: 'React Basics', duration: '25 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'lesson-10', title: 'Components & Props', duration: '20 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'lesson-11', title: 'State & Hooks', duration: '30 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'lesson-12', title: 'TypeScript for React', duration: '28 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'project-2', title: 'Build a Todo App', duration: '3 hrs', type: 'project', isFree: false, requiresAccount: false, requiresPro: true },
        ],
      },
    ],
  },
  {
    slug: 'backend-engineering',
    title: 'Backend Engineering',
    category: 'Backend',
    color: '#1A6B4A',
    lessons: 18,
    projects: 5,
    hours: 32,
    level: 'Intermediate',
    enrolled: 2103,
    description: 'Build scalable APIs with Node.js, PostgreSQL, and cloud deployment.',
    whatYouWillLearn: [
      'Server-side programming with Node.js',
      'RESTful API design principles',
      'Database modeling with PostgreSQL',
      'Authentication and authorization',
      'Cloud deployment on AWS/GCP',
      'Performance and security best practices',
    ],
    requirements: [
      'Basic JavaScript knowledge',
      'Understanding of HTTP protocols',
      'Command line familiarity',
    ],
    instructor: {
      name: 'Marcus Johnson',
      avatar: '/avatars/marcus.jpg',
      bio: 'Backend Architect at Stripe. Built systems serving millions of requests daily.',
    },
    modules: [
      {
        id: 'module-1',
        title: 'Node.js Fundamentals',
        lessons: [
          { id: 'lesson-1', title: 'Introduction to Node.js', duration: '15 min', type: 'lesson', isFree: true, requiresAccount: false, requiresPro: false },
          { id: 'lesson-2', title: 'NPM and Package Management', duration: '12 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
          { id: 'lesson-3', title: 'Express.js Basics', duration: '20 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
          { id: 'lesson-4', title: 'Middleware Deep Dive', duration: '25 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
        ],
      },
      {
        id: 'module-2',
        title: 'Database Integration',
        lessons: [
          { id: 'lesson-5', title: 'PostgreSQL Setup', duration: '18 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'lesson-6', title: 'SQL Fundamentals', duration: '22 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'lesson-7', title: 'ORM with Prisma', duration: '28 min', type: 'lesson', isFree: false, requiresAccount: false, requiresPro: true },
          { id: 'project-1', title: 'Build a REST API', duration: '4 hrs', type: 'project', isFree: false, requiresAccount: false, requiresPro: true },
        ],
      },
    ],
  },
  {
    slug: 'data-analysis',
    title: 'Data Analysis',
    category: 'Data',
    color: '#F97316',
    lessons: 20,
    projects: 4,
    hours: 28,
    level: 'Beginner',
    enrolled: 1847,
    description: 'Learn data analysis with Python, Pandas, and real-world datasets.',
    whatYouWillLearn: [
      'Python programming for data',
      'Data manipulation with Pandas',
      'Data visualization with Matplotlib',
      'Statistical analysis fundamentals',
      'Working with real-world datasets',
      'Building data pipelines',
    ],
    requirements: [
      'Basic math skills',
      'No programming experience required',
      'Analytical mindset',
    ],
    instructor: {
      name: 'Dr. Amara Okafor',
      avatar: '/avatars/amara.jpg',
      bio: 'Data Scientist at Google. PhD in Statistics from Stanford.',
    },
    modules: [
      {
        id: 'module-1',
        title: 'Python for Data',
        lessons: [
          { id: 'lesson-1', title: 'Python Basics', duration: '20 min', type: 'lesson', isFree: true, requiresAccount: false, requiresPro: false },
          { id: 'lesson-2', title: 'Data Types and Structures', duration: '18 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
          { id: 'lesson-3', title: 'Functions and Modules', duration: '22 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
        ],
      },
    ],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Design',
    color: '#7C6AF7',
    lessons: 16,
    projects: 5,
    hours: 24,
    level: 'Beginner',
    enrolled: 2291,
    description: 'Design beautiful, user-centred products using Figma and design systems.',
    whatYouWillLearn: [
      'Design thinking methodology',
      'User research and personas',
      'Wireframing and prototyping',
      'Figma mastery',
      'Design systems creation',
      'Usability testing',
    ],
    requirements: [
      'No design experience needed',
      'Figma account (free)',
      'Creative mindset',
    ],
    instructor: {
      name: 'Elena Rodriguez',
      avatar: '/avatars/elena.jpg',
      bio: 'Lead Product Designer at Airbnb. 8 years crafting delightful experiences.',
    },
    modules: [
      {
        id: 'module-1',
        title: 'Design Fundamentals',
        lessons: [
          { id: 'lesson-1', title: 'What is UI/UX?', duration: '15 min', type: 'lesson', isFree: true, requiresAccount: false, requiresPro: false },
          { id: 'lesson-2', title: 'Design Principles', duration: '20 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
          { id: 'lesson-3', title: 'Color Theory', duration: '18 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
        ],
      },
    ],
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI',
    category: 'AI',
    color: '#EC4899',
    lessons: 14,
    projects: 3,
    hours: 20,
    level: 'Intermediate',
    enrolled: 987,
    description: 'Build AI-powered apps using LLMs, prompt engineering, and APIs.',
    whatYouWillLearn: [
      'Understanding LLMs and transformers',
      'Prompt engineering techniques',
      'OpenAI API integration',
      'Building AI chatbots',
      'RAG and vector databases',
      'AI ethics and safety',
    ],
    requirements: [
      'Basic programming knowledge',
      'Familiarity with APIs',
      'Curiosity about AI',
    ],
    instructor: {
      name: 'Dr. Kai Zhang',
      avatar: '/avatars/kai.jpg',
      bio: 'AI Researcher at Anthropic. Previously ML Engineer at OpenAI.',
    },
    modules: [
      {
        id: 'module-1',
        title: 'AI Fundamentals',
        lessons: [
          { id: 'lesson-1', title: 'Introduction to LLMs', duration: '18 min', type: 'lesson', isFree: true, requiresAccount: false, requiresPro: false },
          { id: 'lesson-2', title: 'How Transformers Work', duration: '25 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
          { id: 'lesson-3', title: 'Prompt Engineering Basics', duration: '20 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
        ],
      },
    ],
  },
  {
    slug: 'kids-coding',
    title: 'Kids Coding',
    category: 'Kids',
    color: '#FBBF24',
    lessons: 12,
    projects: 4,
    hours: 16,
    level: 'Beginner',
    enrolled: 634,
    description: 'Fun, interactive coding for kids aged 8–14. Scratch, Python basics, and mini projects.',
    whatYouWillLearn: [
      'Coding basics with Scratch',
      'Problem-solving skills',
      'Python fundamentals',
      'Game development basics',
      'Animation and storytelling',
      'Building confidence with code',
    ],
    requirements: [
      'Age 8-14',
      'Reading comprehension',
      'Parental support recommended',
    ],
    instructor: {
      name: 'Ms. Funmi Adeyemi',
      avatar: '/avatars/funmi.jpg',
      bio: 'Computer Science teacher and STEM advocate. 15 years teaching kids to code.',
    },
    modules: [
      {
        id: 'module-1',
        title: 'Scratch Basics',
        lessons: [
          { id: 'lesson-1', title: 'Meet Scratch!', duration: '10 min', type: 'lesson', isFree: true, requiresAccount: false, requiresPro: false },
          { id: 'lesson-2', title: 'Your First Animation', duration: '15 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
          { id: 'lesson-3', title: 'Making Games', duration: '20 min', type: 'lesson', isFree: true, requiresAccount: true, requiresPro: false },
        ],
      },
    ],
  },
]

export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug)
}

export function getAllTrackSlugs(): string[] {
  return tracks.map((t) => t.slug)
}

export function getAllCategories(): TrackCategory[] {
  return ['Frontend', 'Backend', 'Data', 'Design', 'AI', 'Kids']
}
