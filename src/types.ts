export type PageRoute = 
  | 'infant'
  | 'home' 
  | 'about' 
  | 'courses' 
  | 'course-detail' 
  | 'faculty' 
  | 'results' 
  | 'testimonials' 
  | 'faq' 
  | 'contact' 
  | 'blog' 
  | 'blog-detail' 
  | 'portal' 
  | 'admin'
  | 'devmode'
  | 'coming-soon' 
  | 'privacy' 
  | 'terms';

export type UserRole = 'student' | 'parent' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  isAnonymous?: boolean;
  provider?: string;
  avatarUrl?: string;
  studentClass?: string;
  enrolledCourseIds?: string[];
}

export interface TimetableSlot {
  days: string;
  time: string;
  batchType: string;
  roomOrLink?: string;
}

export interface CoursePrice {
  monthly: string;
  annual: string;
  scholarshipDiscount?: string;
  emiOption?: string;
}

export interface Course {
  id: string;
  title: string;
  category: 'Foundation' | 'Board Prep' | 'Competitive' | 'School Tuition';
  gradeLevel: string; // e.g. "Class 8-10", "Class 11-12"
  subjects: string[];
  description: string;
  keyBenefits: string[];
  duration: string;
  batchSize: string;
  mode: 'Offline + Hybrid' | 'Interactive Live';
  featured?: boolean;
  syllabusHighlights: string[];
  schedule: string;
  price?: CoursePrice;
  timetable?: TimetableSlot[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  isUnlocked: boolean;
  dateUnlocked?: string;
  progressPercent: number;
  xpReward: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface FacultyMember {
  id: string;
  name: string;
  qualification: string;
  subject: string;
  experience: string;
  shortBio: string;
  photoUrl: string;
  specialization: string;
  studentRating: number;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: 'Student' | 'Parent';
  studentClass: string;
  content: string;
  rating: number;
  verified: boolean;
  highlightScore?: string;
}

export interface AcademicResult {
  id: string;
  title: string;
  metric: string;
  category: string;
  description: string;
  studentName?: string;
  examName?: string;
  scoreImprovement?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Enrollment' | 'Courses' | 'Assessments' | 'Fees';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Study Tips' | 'Exam Prep' | 'Parent Guide' | 'Math & Science';
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface DemoBookingData {
  name: string;
  phone: string;
  email: string;
  studentClass: string;
  subject: string;
  preferredTime: string;
  notes?: string;
}
