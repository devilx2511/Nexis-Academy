import { Course, FacultyMember, Testimonial, AcademicResult, FAQItem, BlogPost } from '../types';

export const ACADEMY_INFO = {
  name: "Nexis Academy",
  tagline: "Unlock Your Academic Potential with Nexis Academy",
  subtitle: "Personalized learning, expert guidance, and a focused academic environment designed to help students build confidence and achieve better results.",
  primaryDomain: "nexisacademy.com",
  altDomains: ["nexis.io", "nexis.ai"],
  socials: {
    instagram: "@nexis3d",
    instagramAlt: "@nexis3dacademy",
    facebook: "NexisAcademyOfficial",
    youtube: "NexisAcademy3D",
    linkedin: "nexis-academy"
  },
  contact: {
    address: "[ACADEMY ADDRESS], [CITY], India",
    phone: "[PHONE NUMBER]",
    displayPhone: "+91 (800) 555-NEXIS",
    whatsapp: "[WHATSAPP NUMBER]",
    whatsappDisplay: "+91 98765 43210",
    email: "[EMAIL ADDRESS]",
    displayEmail: "admissions@nexisacademy.com",
    openingHours: "Mon - Sat: 09:00 AM - 08:00 PM | Sun: 10:00 AM - 02:00 PM",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562013898!2d77.2090!3d28.6139!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjg_MzYnNTAuMCJOIDc3wrAxMiczMi40IkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
  }
};

export const COURSES_DATA: Course[] = [
  {
    id: "course-foundation-9-10",
    title: "Foundation Masterclass (Class 9 & 10)",
    category: "Foundation",
    gradeLevel: "Class 9 & 10",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
    description: "Build an unbeatable conceptual foundation in Science and Mathematics to excel in school board exams and prepare early for competitive entrances.",
    keyBenefits: [
      "1:10 Small Batch Ratio for personalized attention",
      "Weekly diagnostic tests & speed practice sessions",
      "Comprehensive chapter-wise physical & digital notes",
      "Dedicated daily 1-on-1 doubt resolution desk"
    ],
    duration: "1 Year Academic Program",
    batchSize: "Max 12 Students",
    mode: "Offline + Hybrid",
    featured: true,
    syllabusHighlights: [
      "Algebraic Identities & Real Numbers Mastery",
      "Laws of Motion, Work, Energy & Gravitation",
      "Chemical Reactions, Acids, Bases & Carbon Compounds",
      "Application of Coordinate Geometry & Trigonometry"
    ],
    schedule: "3 Days/Week (2 Hours/Day)",
    price: {
      monthly: "₹3,499 / mo",
      annual: "₹34,999 / yr",
      scholarshipDiscount: "Up to 20% Scholarship on Admission Test",
      emiOption: "0% Interest No-Cost EMI Available"
    },
    timetable: [
      { days: "Mon, Wed, Fri", time: "04:30 PM – 06:30 PM", batchType: "Evening Batch A", roomOrLink: "Lab 101 / Hybrid Stream" },
      { days: "Tue, Thu, Sat", time: "05:00 PM – 07:00 PM", batchType: "Evening Batch B", roomOrLink: "Lab 102 / Hybrid Stream" },
      { days: "Sat & Sun", time: "09:00 AM – 12:00 PM", batchType: "Weekend Intensive", roomOrLink: "Main Hall / Live Stream" }
    ]
  },
  {
    id: "course-board-prep-10",
    title: "Class 10 Board Exam Sprint & Score Booster",
    category: "Board Prep",
    gradeLevel: "Class 10",
    subjects: ["Mathematics", "Science", "English"],
    description: "Targeted revision, mock board exam series, answer-writing mechanics, and time management strategies for top percentile performance.",
    keyBenefits: [
      "5 Full-length simulated board mock examinations",
      "Sample paper analysis & answer structure feedback",
      "Formula memory maps & revision flashcards",
      "Parent-Teacher progress reports after every assessment"
    ],
    duration: "6 Months Intensive",
    batchSize: "Max 15 Students",
    mode: "Offline + Hybrid",
    featured: true,
    syllabusHighlights: [
      "Board Pattern Answer-Writing Techniques",
      "High-Weightage NCERT Problem Solving",
      "Common Mistake Elimination in Physics Numerical Problems",
      "Trigonometric Proofs & Geometry Step-by-Step Scoring"
    ],
    schedule: "4 Days/Week (1.5 Hours/Day)",
    price: {
      monthly: "₹2,999 / mo",
      annual: "₹16,499 / term",
      scholarshipDiscount: "Early Bird 15% Waiver for Top 5 Board Mock Rankers",
      emiOption: "Flexible Monthly Installments"
    },
    timetable: [
      { days: "Mon, Tue, Thu, Fri", time: "06:00 PM – 07:30 PM", batchType: "Board Ranker Express", roomOrLink: "Room 204" },
      { days: "Sat & Sun", time: "10:30 AM – 01:00 PM", batchType: "Weekend Practice Series", roomOrLink: "Mock CBT Lab" }
    ]
  },
  {
    id: "course-jee-neet-foundation",
    title: "Class 11 & 12 Competitive Excellence (JEE/NEET)",
    category: "Competitive",
    gradeLevel: "Class 11 & 12",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    description: "Rigorous problem-solving program tailored for engineering and medical entrance examinations alongside senior secondary school boards.",
    keyBenefits: [
      "Concept clarity through 3D visual learning models",
      "Over 3,000+ curated practice questions with detailed solutions",
      "Speed & accuracy training under timed conditions",
      "Personal academic mentorship & anxiety reduction coaching"
    ],
    duration: "2 Year Integrated Program",
    batchSize: "Max 10 Students",
    mode: "Offline + Hybrid",
    featured: true,
    syllabusHighlights: [
      "Calculus, Vector Mechanics & Electrodynamics",
      "Organic Mechanisms, Thermodynamics & Coordination Compounds",
      "Plant Physiology, Human Anatomy & Genetics Deep-Dive",
      "Mock Tests with Detailed Percentile & Error Analytics"
    ],
    schedule: "4 Days/Week (2.5 Hours/Day)",
    price: {
      monthly: "₹4,999 / mo",
      annual: "₹49,999 / yr",
      scholarshipDiscount: "Up to 35% Nexis Talent Reward Scholarship",
      emiOption: "6 or 12 Months Zero-Fee EMI"
    },
    timetable: [
      { days: "Mon, Wed, Fri, Sat", time: "04:00 PM – 06:30 PM", batchType: "JEE Pinnacle Evening", roomOrLink: "Lecture Hall A" },
      { days: "Tue, Thu, Sat, Sun", time: "07:30 AM – 10:00 AM", batchType: "NEET Medical Morning", roomOrLink: "Bio-Physics Wing" }
    ]
  },
  {
    id: "course-jee-advanced-rankers",
    title: "JEE Advanced AIR Rankers Batch (Class 12 & Droppers)",
    category: "Competitive",
    gradeLevel: "Class 12 & XII Passed",
    subjects: ["Advanced Physics", "Advanced Physical Chemistry", "Advanced Organic & Math"],
    description: "Elite problem-solving program for top AIR ranks in JEE Advanced and IISc admissions with previous year IIT paper dissections and 3D concept maps.",
    keyBenefits: [
      "Mentorship directly by IITian gold medalists",
      "Daily 100-minute problem solving drills with multi-concept questions",
      "All-India Computer Based Test (CBT) Series matching NTA software",
      "Personal error desktop analysis & weak-area elimination"
    ],
    duration: "1 Year Target Program",
    batchSize: "Max 8 Students",
    mode: "Offline + Hybrid",
    featured: true,
    syllabusHighlights: [
      "Multi-Variable Calculus & Matrix Transformations",
      "Advanced Rotational Dynamics & Quantum Optics",
      "Inorganic Reaction Pathways & Thermodynamics Equilibrium",
      "Complete PYQ Dissection (2010 - 2025)"
    ],
    schedule: "5 Days/Week (3 Hours/Day)",
    price: {
      monthly: "₹5,999 / mo",
      annual: "₹59,999 / yr",
      scholarshipDiscount: "50% Merit Scholarship for 98+ Percentile JEE Main Rankers",
      emiOption: "No Cost EMI Available"
    },
    timetable: [
      { days: "Mon to Fri", time: "03:00 PM – 06:00 PM", batchType: "AIR Super 30 Rankers", roomOrLink: "Advanced Lab 1" },
      { days: "Sat & Sun", time: "02:00 PM – 06:00 PM", batchType: "Full-Length CBT Test", roomOrLink: "Digital Exam Center" }
    ]
  },
  {
    id: "course-olympiad-ntse-junior",
    title: "Olympiad & NTSE Junior Champions (Class 7 & 8)",
    category: "Foundation",
    gradeLevel: "Class 7 & 8",
    subjects: ["Mental Aptitude", "Advanced Math", "Olympiad Physics & Biology"],
    description: "Engineered for young prodigies aiming for IMO, NSO, NSTSE, and regional science Olympiad gold medals.",
    keyBenefits: [
      "Logical reasoning and spatial visualization drills",
      "Olympiad pattern problem banks and past paper solutions",
      "Small batch size of max 10 students for hands-on guidance",
      "Confidence building & public presentation of scientific projects"
    ],
    duration: "1 Academic Year",
    batchSize: "Max 10 Students",
    mode: "Interactive Live",
    featured: false,
    syllabusHighlights: [
      "Number Theory, Permutations & Geometry Puzzles",
      "Experimental Physics & Microscopic Chemistry",
      "Speed Math Tricks & Vedic Mathematics Basics",
      "Mock Olympiad League (MOL) Leaderboards"
    ],
    schedule: "3 Days/Week (1.5 Hours/Day)",
    price: {
      monthly: "₹2,499 / mo",
      annual: "₹24,999 / yr",
      scholarshipDiscount: "10% Sibling & Merit Discount",
      emiOption: "Pay Quarterly Option"
    },
    timetable: [
      { days: "Tue, Thu, Sat", time: "04:00 PM – 05:30 PM", batchType: "Olympiad Stars Live", roomOrLink: "Live Interactive Studio" },
      { days: "Sunday", time: "10:00 AM – 12:00 PM", batchType: "Olympiad Mock League", roomOrLink: "Online Portal" }
    ]
  },
  {
    id: "course-school-math-science",
    title: "Class 6 to 8 Young Scholar Tuition",
    category: "School Tuition",
    gradeLevel: "Class 6 - 8",
    subjects: ["Mathematics", "Science", "English"],
    description: "Nurturing fundamental curiosity, logical thinking, and strong study habits for middle school students.",
    keyBenefits: [
      "Interactive hands-on science experiments and math puzzles",
      "Regular homework guidance & school syllabus synchronization",
      "Friendly, encouraging mentors who spark interest in learning",
      "Confidence building through oral quizzes and presentation skills"
    ],
    duration: "Academic Year",
    batchSize: "Max 10 Students",
    mode: "Offline + Hybrid",
    featured: false,
    syllabusHighlights: [
      "Fractions, Decimals & Basic Geometry Concepts",
      "Fundamentals of Matter, Energy & Living Organisms",
      "Grammar Accuracy & Reading Comprehension Skills",
      "Interactive Science Lab Demonstrations"
    ],
    schedule: "3 Days/Week (1.5 Hours/Day)",
    price: {
      monthly: "₹1,999 / mo",
      annual: "₹19,999 / yr",
      scholarshipDiscount: "10% Referral Waiver",
      emiOption: "Easy Monthly Billing"
    },
    timetable: [
      { days: "Mon, Wed, Fri", time: "03:30 PM – 05:00 PM", batchType: "Junior Foundation", roomOrLink: "Room 105" },
      { days: "Tue, Thu, Sat", time: "03:30 PM – 05:00 PM", batchType: "Junior Foundation B", roomOrLink: "Room 106" }
    ]
  }
];

export const FACULTY_DATA: FacultyMember[] = [
  {
    id: "faculty-1",
    name: "[FACULTY NAME]",
    qualification: "M.Sc. Physics (Gold Medalist), B.Ed.",
    subject: "Physics & Science",
    experience: "12+ Years Teaching Experience",
    shortBio: "Specializes in demystifying complex physics principles through 3D spatial models and practical real-world applications.",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    specialization: "Mechanics, Electromagnetism & Conceptual Physics",
    studentRating: 4.9
  },
  {
    id: "faculty-2",
    name: "[FACULTY NAME]",
    qualification: "M.Tech Mathematics & Computing",
    subject: "Mathematics & Statistics",
    experience: "10+ Years Teaching Experience",
    shortBio: "Passionate educator dedicated to eliminating math anxiety using pattern recognition and logical step-by-step problem breakdowns.",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    specialization: "Algebra, Calculus & Geometry Proofs",
    studentRating: 4.95
  },
  {
    id: "faculty-3",
    name: "[FACULTY NAME]",
    qualification: "Ph.D. Organic Chemistry",
    subject: "Chemistry & Life Sciences",
    experience: "8+ Years Research & Coaching",
    shortBio: "Helps students master chemical reactions and periodic table trends effortlessly with memorable visual mnemonics.",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    specialization: "Reaction Mechanisms, Physical Chemistry Calculations",
    studentRating: 4.88
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    authorName: "[VERIFIED PARENT TESTIMONIAL]",
    role: "Parent",
    studentClass: "Parent of Class 10 Board Student",
    content: "Nexis Academy transformed my child's approach to Mathematics. The small batch size meant the teacher noticed every weak spot and addressed it patiently. Score improved from 68% to 94% in board prelims!",
    rating: 5,
    verified: true,
    highlightScore: "68% → 94% Math"
  },
  {
    id: "test-2",
    authorName: "[VERIFIED STUDENT TESTIMONIAL]",
    role: "Student",
    studentClass: "Class 12 JEE Aspirant",
    content: "The 3D visual models used in Physics classes made topics like Wave Optics and Electromagnetism crystal clear. The doubt-solving support at Nexis is unmatched.",
    rating: 5,
    verified: true,
    highlightScore: "99.1 Percentile Physics"
  },
  {
    id: "test-3",
    authorName: "[VERIFIED PARENT TESTIMONIAL]",
    role: "Parent",
    studentClass: "Parent of Class 9 Student",
    content: "What sets Nexis Academy apart is their regular feedback and transparent progress reports. We always know exactly how our son is progressing.",
    rating: 5,
    verified: true,
    highlightScore: "Top Rank in School"
  }
];

export const RESULTS_DATA: AcademicResult[] = [
  {
    id: "res-1",
    title: "Board Exam Excellence",
    metric: "95%+",
    category: "Class 10 & 12 Boards",
    description: "Over 82% of Nexis Academy students achieved distinction marks in Science and Mathematics.",
    studentName: "[VERIFIED RESULT]",
    examName: "School Board Examinations",
    scoreImprovement: "Average +24% Score Increase"
  },
  {
    id: "res-2",
    title: "Competitive Entrance Ranks",
    metric: "99.2%",
    category: "JEE & NEET Foundation",
    description: "Top state ranks achieved by Nexis students with consistent 1-on-1 mentorship.",
    studentName: "[VERIFIED RESULT]",
    examName: "Engineering / Medical Entrance",
    scoreImprovement: "Qualified Top Tier Institutes"
  },
  {
    id: "res-3",
    title: "Confidence & Concept Retention",
    metric: "100%",
    category: "Student Satisfaction",
    description: "Every student receives tailored academic guidance based on their diagnostic assessment results.",
    studentName: "[VERIFIED RESULT]",
    examName: "Diagnostic Performance Metric",
    scoreImprovement: "Zero Backlog Guarantee"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What classes and grade levels does Nexis Academy offer?",
    answer: "Nexis Academy offers structured tuition and coaching programs for Class 6 through Class 12, covering middle school foundations, high school board preparation, and senior secondary competitive entrance foundations (JEE/NEET).",
    category: "General"
  },
  {
    id: "faq-2",
    question: "Which subjects are available at Nexis Academy?",
    answer: "Our core programs specialize in Mathematics, Physics, Chemistry, Biology, and Science for middle & high school, as well as English reading and comprehension skills.",
    category: "Courses"
  },
  {
    id: "faq-3",
    question: "Do you offer a free demo class before enrollment?",
    answer: "Yes! We strongly encourage every parent and student to attend a Free 1-on-1 Demo Class. This allows you to experience our 3D glassmorphic tech-enabled classrooms, meet our faculty, and receive an initial student diagnostic assessment.",
    category: "Enrollment"
  },
  {
    id: "faq-4",
    question: "How can I enroll my child at Nexis Academy?",
    answer: "You can book a free demo class online via our 'Book a Free Demo Class' button or call/WhatsApp us at [PHONE NUMBER]. Our academic counselor will schedule your visit and diagnostic assessment.",
    category: "Enrollment"
  },
  {
    id: "faq-5",
    question: "Do you provide individual personalized attention?",
    answer: "Absolutely. We strictly cap our batch sizes to 10-12 students per class. This guarantees that every student receives individual attention, active participation opportunities, and personalized feedback.",
    category: "General"
  },
  {
    id: "faq-6",
    question: "How often are students assessed and how are parents updated?",
    answer: "Students undergo bi-weekly chapter diagnostics and monthly comprehensive tests. Parents receive digital progress analytics and 1-on-1 monthly updates tracking attendance, test scores, and conceptual mastery.",
    category: "Assessments"
  },
  {
    id: "faq-7",
    question: "Do you provide dedicated doubt-solving support?",
    answer: "Yes, Nexis Academy maintains a daily 1-on-1 Doubt Desk both in-person at our academy and digitally via our student portal & AI study assistant.",
    category: "General"
  },
  {
    id: "faq-8",
    question: "Where is Nexis Academy located?",
    answer: "Nexis Academy is located at [ACADEMY ADDRESS], [CITY]. You can view our exact location on Google Maps in the Contact section of our website.",
    category: "General"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "5 Proven Habits to Master Class 10 Mathematics Without Stress",
    slug: "5-habits-master-class-10-maths",
    excerpt: "Learn how breaking down geometry proofs and maintaining a formula ledger can elevate your math score by over 20%.",
    content: `
# 5 Proven Habits to Master Class 10 Mathematics

Mathematics is often viewed as a daunting hurdle for Class 10 board students, but with the right structured approach, it becomes one of the highest-scoring subjects on your mark sheet.

## 1. Maintain a Dedicated Formula Ledger
Never rely on loose sheets. Keep a clean, indexed formula ledger categorized by chapters:
- Quadratic Equations
- Arithmetic Progressions
- Trigonometric Identities
- Surface Areas & Volumes

## 2. Master NCERT Before Advanced Reference Books
Board examination papers prioritize conceptual clarity directly mapped to standard textbooks. Solve every exemplar problem twice.

## 3. Practice Step-by-Step Answer Presentation
In board exams, step marking can earn you 80% of the question value even if you make a minor calculation mistake at the end. Always state given values, formulas used, and box your final answer with proper units.

## 4. Conduct Weekly Timed Revision Mock Papers
Simulating the 3-hour exam environment builds speed, eliminates panic, and sharpens time allocation per question section.

## 5. Address Doubts Instantly — Zero Backlog Policy
At Nexis Academy, we emphasize that no doubt is too small. Accumulating doubts creates pre-exam anxiety. Resolve every tricky question on the day it arises.
    `,
    category: "Study Tips",
    author: "Nexis Academic Team",
    date: "August 2026",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "blog-2",
    title: "Why Visual 3D Models Accelerate Physics Concept Retention by 3x",
    slug: "why-visual-3d-models-accelerate-physics",
    excerpt: "Discover how spatial 3D visualization helps students grasp vector mechanics and electromagnetic fields effortlessly.",
    content: `
# Why Visual 3D Models Accelerate Physics Concept Retention

When students try to memorize abstract physics formulas without visualizing the underlying physical phenomenon, retention degrades rapidly.

## The Cognitive Advantage of 3D Visualization

1. **Spatial Understanding:** Visualizing magnetic flux lines, electric fields, or force vectors in 3D space bridges the gap between theory and reality.
2. **Long-Term Memory Encoding:** Visual memory retains spatial orientation significantly longer than text-based definitions.
3. **Reduced Exam Stress:** When students understand *why* a phenomenon occurs, they can derive equations on the spot even under test pressure.

At Nexis Academy, our tech-enabled glassmorphic learning environment integrates interactive 3D visual models into every core science module.
    `,
    category: "Math & Science",
    author: "Physics Department Lead",
    date: "July 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "blog-3",
    title: "Parent's Guide: How to Support Your Child During Board Exam Preparation",
    slug: "parents-guide-board-exam-support",
    excerpt: "Practical advice for parents on creating a productive home study environment and managing exam anxiety.",
    content: `
# Parent's Guide to Supporting Board Exam Preparation

Parental support plays a crucial role in shaping a student's confidence and focus during critical academic years.

## Key Strategies for Parents:

- **Create a Distraction-Free Study Space:** Ensure proper lighting, ergonomic seating, and minimal noise.
- **Focus on Effort Over Instant Scores:** Celebrate study discipline and improvement rather than comparing scores with peers.
- **Maintain Healthy Routines:** Prioritize 7-8 hours of sleep and nutritious meals.
- **Partner with Educators:** Stay in active communication with your child's teachers to track growth and offer timely encouragement.
    `,
    category: "Parent Guide",
    author: "Academic Counselor",
    date: "June 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800"
  }
];
