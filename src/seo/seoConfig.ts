import { Course, BlogPost } from '../types';

/**
 * Centralized Master SEO Configuration for Nexis Academy
 * Configured with genuine institutional details, canonical domains, and structured metadata.
 */

// Production base URL (fallback to canonical custom domain if not specified in env)
export const SITE_URL = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_SITE_URL) || 
  'https://nexisacademy.com';

export const SEO_CONFIG = {
  siteName: 'Nexis Academy',
  legalName: 'Nexis Academy Education Private Limited',
  tagline: 'Unlock Your Academic Potential with Nexis Academy',
  defaultTitle: 'Nexis Academy | Premier Science & Math Tuition, Board & Competitive Coaching',
  defaultDescription: 'Empower your academic journey with Nexis Academy. Personalized tuition, 1:10 batch ratio, expert faculty, 3D visual learning models, and proven results for Classes 6-12 (CBSE, ICSE, JEE, NEET). Book a free demo class.',
  defaultKeywords: [
    'Nexis Academy',
    'Nexis Tuition',
    'Science and Math Coaching',
    'Class 9 Foundation Coaching',
    'Class 10 Board Exam Preparation',
    'Class 11 12 JEE NEET Coaching',
    'CBSE ICSE Tuition',
    'Small Batch Coaching 1:10',
    '3D Visual Learning Academy',
    'Free Demo Class Tuition',
    'Best Science Tuition',
    'Maths Tuition Class 6 to 12'
  ].join(', '),
  defaultOgImage: `${SITE_URL}/og-image.png`,
  themeColor: '#0B0C10',
  twitterHandle: '@nexis3dacademy',
  
  // Organization details for schema & local SEO
  organization: {
    name: 'Nexis Academy',
    alternateName: 'Nexis Tech-Driven Coaching & Tuition',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    email: 'admissions@nexisacademy.com',
    phone: '+91-98765-43210',
    displayPhone: '+91 (800) 555-NEXIS',
    whatsapp: '+919876543210',
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:00-20:00, Su 10:00-14:00',
    address: {
      streetAddress: 'Nexis Education Complex, Tech Learning Corridor',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      postalCode: '700001',
      addressCountry: 'IN'
    },
    geo: {
      latitude: '22.5726',
      longitude: '88.3639'
    },
    socialLinks: [
      'https://www.facebook.com/NexisAcademyOfficial',
      'https://www.instagram.com/nexis3dacademy',
      'https://www.youtube.com/@NexisAcademy3D',
      'https://www.linkedin.com/company/nexis-academy'
    ]
  }
};

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

/**
 * Route-by-route Metadata Registry
 */
export const ROUTE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: 'Nexis Academy | Premier Science & Math Tuition, Board & Competitive Coaching',
    description: 'Transform your learning with Nexis Academy. Small 1:10 batches, expert faculty, 3D interactive physics and math models, and weekly diagnostic tracking for Class 6-12.',
    keywords: 'Nexis Academy, Science Tuition, Maths Tuition, Class 10 Board Prep, JEE Foundation, NEET Coaching, CBSE Tuition',
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` }
    ]
  },
  infant: {
    title: 'Welcome to Nexis Academy | Modern Tech-Driven Education Experience',
    description: 'Enter the future of interactive learning with Nexis Academy. Discover 3D visual learning methods, personalized academic paths, and free demo classes.',
    canonical: `${SITE_URL}/`,
    noIndex: false,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` }
    ]
  },
  about: {
    title: 'About Nexis Academy | Our Mission, Pedagogy & 3D Learning Philosophy',
    description: 'Learn about Nexis Academy’s mission to make conceptual science and mathematics intuitive, engaging, and score-boosting for middle and high school students.',
    keywords: 'About Nexis Academy, Teaching Methodology, 3D Visual Learning, Small Batch Tuition, Education Philosophy',
    canonical: `${SITE_URL}/about`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'About Us', url: `${SITE_URL}/about` }
    ]
  },
  courses: {
    title: 'Courses & Programs Catalog | Class 6 to 12 Tuition & Coaching - Nexis Academy',
    description: 'Explore comprehensive academic programs: Class 9-10 Foundations, Class 10 Board Sprints, Class 11-12 JEE/NEET, Olympiads, and Middle School Tuitions.',
    keywords: 'Nexis Academy Courses, Class 10 Tuition, Class 11 12 JEE NEET Coaching, Olympiad Coaching, Foundation Batches, Course Fees',
    canonical: `${SITE_URL}/courses`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Courses', url: `${SITE_URL}/courses` }
    ]
  },
  faculty: {
    title: 'Expert Faculty & Mentors | Subject Specialists - Nexis Academy',
    description: 'Meet the dedicated educators at Nexis Academy. Gold medalists, M.Techs, and Ph.D. subject mentors bringing passion and 3D visual clarity to Science and Math.',
    keywords: 'Nexis Academy Faculty, Physics Teachers, Maths Tutors, Chemistry Educators, IITian Mentors, Expert Tuition Teachers',
    canonical: `${SITE_URL}/faculty`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Faculty', url: `${SITE_URL}/faculty` }
    ]
  },
  results: {
    title: 'Student Results & Proven Academic Milestones | Nexis Academy',
    description: 'Discover real student growth at Nexis Academy. Average +24% score improvements, 95%+ board examination scores, and top competitive entrance selections.',
    keywords: 'Nexis Academy Results, Student Marks Improvement, Board Exam Ranks, JEE NEET Success, Academic Milestones',
    canonical: `${SITE_URL}/results`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Results & Achievements', url: `${SITE_URL}/results` }
    ]
  },
  testimonials: {
    title: 'Student & Parent Testimonials | Verified Reviews - Nexis Academy',
    description: 'Read authentic feedback from parents and students about Nexis Academy’s personalized mentoring, small batch sizes, and transparent academic reporting.',
    keywords: 'Nexis Academy Reviews, Student Testimonials, Parent Feedback, Best Tuition Reviews',
    canonical: `${SITE_URL}/testimonials`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Testimonials', url: `${SITE_URL}/testimonials` }
    ]
  },
  faq: {
    title: 'Frequently Asked Questions (FAQ) | Admissions, Batches & Fees - Nexis Academy',
    description: 'Find answers to common questions about Nexis Academy course admissions, free demo classes, batch timings, tuition fees, and doubt resolution desks.',
    keywords: 'Nexis Academy FAQ, Tuition Admission Questions, Demo Class Booking, Course Fees, Class Batches',
    canonical: `${SITE_URL}/faq`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'FAQ', url: `${SITE_URL}/faq` }
    ]
  },
  contact: {
    title: 'Contact Nexis Academy | Admissions Desk, Phone, WhatsApp & Campus Map',
    description: 'Get in touch with Nexis Academy. Reach our admissions advisors via phone, WhatsApp, email, or visit our modern tech-enabled campus for a counseling session.',
    keywords: 'Contact Nexis Academy, Tuition Admissions Phone, WhatsApp Support, Academy Location, Campus Map, Book Demo',
    canonical: `${SITE_URL}/contact`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Contact & Location', url: `${SITE_URL}/contact` }
    ]
  },
  blog: {
    title: 'Educational Insights & Study Guides | Nexis Academy Blog',
    description: 'Actionable study habits, exam strategies, 3D learning science, and parental guides to support high school and competitive entrance preparation.',
    keywords: 'Study Tips, Board Exam Strategies, How to Master Maths, Physics 3D Visual Learning, Parent Guides, Educational Articles',
    canonical: `${SITE_URL}/blog`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Blog & Articles', url: `${SITE_URL}/blog` }
    ]
  },
  privacy: {
    title: 'Privacy Policy & Student Data Protection Charter | Nexis Academy',
    description: 'Learn how Nexis Academy safeguards student and guardian data with encryption, strict RBAC controls, and transparent educational data management.',
    canonical: `${SITE_URL}/privacy`,
    noIndex: false,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Privacy Policy', url: `${SITE_URL}/privacy` }
    ]
  },
  terms: {
    title: 'Terms of Service & Enrollment Guidelines | Nexis Academy',
    description: 'Read the terms and conditions governing course enrollment, demo class policies, tuition fees, and classroom conduct at Nexis Academy.',
    canonical: `${SITE_URL}/terms`,
    noIndex: false,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Terms of Service', url: `${SITE_URL}/terms` }
    ]
  },
  // Private / Admin routes protected from indexation
  portal: {
    title: 'Student & Parent Portal | Nexis Academy',
    description: 'Secure student portal for attendance tracking, weekly test scores, formula ledgers, and assignments.',
    canonical: `${SITE_URL}/portal`,
    noIndex: true
  },
  admin: {
    title: 'Master Administration Console | Nexis Academy',
    description: 'Administrative CRM, batch scheduling, and student roster controls.',
    canonical: `${SITE_URL}/admin`,
    noIndex: true
  },
  devmode: {
    title: 'DevMode Developer Environment | Nexis Academy',
    description: 'Developer sandbox and system telemetry.',
    canonical: `${SITE_URL}/devmode`,
    noIndex: true
  },
  'coming-soon': {
    title: 'Coming Soon | Nexis Academy',
    description: 'Exciting new learning modules are launching soon at Nexis Academy.',
    canonical: `${SITE_URL}/coming-soon`,
    noIndex: true
  }
};

/**
 * Generate specific metadata for Course Detail views
 */
export function getCourseMetadata(course: Course): PageMetadata {
  return {
    title: `${course.title} | Nexis Academy Tuition & Coaching`,
    description: `${course.description} Grade level: ${course.gradeLevel}. Mode: ${course.mode}. Batch size: ${course.batchSize}. Weekly schedule: ${course.schedule}.`,
    keywords: `${course.title}, ${course.gradeLevel} Tuition, ${course.subjects.join(', ')}, Nexis Academy Course, ${course.category} Coaching`,
    canonical: `${SITE_URL}/courses#${course.id}`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Courses', url: `${SITE_URL}/courses` },
      { name: course.title, url: `${SITE_URL}/courses#${course.id}` }
    ]
  };
}

/**
 * Generate specific metadata for Blog Detail views
 */
export function getBlogArticleMetadata(post: BlogPost): PageMetadata {
  return {
    title: `${post.title} | Nexis Academy Study Guide`,
    description: post.excerpt,
    keywords: `${post.title}, ${post.category}, Study Tips, Nexis Academy Blog, ${post.author}`,
    canonical: `${SITE_URL}/blog/${post.slug}`,
    ogImage: post.imageUrl || SEO_CONFIG.defaultOgImage,
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Blog', url: `${SITE_URL}/blog` },
      { name: post.title, url: `${SITE_URL}/blog/${post.slug}` }
    ]
  };
}
