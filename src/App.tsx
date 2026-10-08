import React, { useState, useEffect } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { PageRoute, Course, BlogPost } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoBookingModal } from './components/DemoBookingModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AITutorWidget } from './components/AITutorWidget';
import { MobileBottomDock } from './components/MobileBottomDock';
import { LoadingScreen } from './components/LoadingScreen';
import { SEOHelmet } from './components/SEOHelmet';
import { ROUTE_METADATA, getCourseMetadata, getBlogArticleMetadata, PageMetadata } from './seo/seoConfig';
import { 
  getOrganizationSchema, 
  getWebSiteSchema, 
  getCourseCatalogSchema, 
  getCourseSchema, 
  getFAQPageSchema, 
  getFacultySchema, 
  getArticleSchema, 
  getBreadcrumbSchema 
} from './seo/structuredData';
import { COURSES_DATA, FACULTY_DATA, FAQ_DATA } from './data/academyData';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BrandingProvider } from './context/BrandingContext';
import { testFirestoreConnection } from './lib/firebase';

// Pages
import { InfantPage } from './pages/InfantPage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { FacultyPage } from './pages/FacultyPage';
import { ResultsPage } from './pages/ResultsPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { PortalPage } from './pages/PortalPage';
import { AdminDevConsole } from './pages/AdminDevConsole';
import { ComingSoonPage } from './pages/ComingSoonPage';
import { LegalPage } from './pages/LegalPage';

function MainAppContent() {
  const { user } = useAuth();

  // Set initial route to 'infant' so it serves as the Opening Page
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('infant');
  const [isLoadingTransition, setIsLoadingTransition] = useState<boolean>(false);
  const [targetRoute, setTargetRoute] = useState<PageRoute>('home');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('nexis_theme_dark');
      if (savedTheme !== null) {
        return savedTheme === 'true';
      }
    } catch {
      // Ignore localStorage errors if sandboxed
    }
    return true; // Default to dark mode
  });

  // Keep html class in sync with isDarkMode
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.body.classList.remove('dark');
        document.body.classList.add('light');
      }
      localStorage.setItem('nexis_theme_dark', String(isDarkMode));
    } catch (e) {
      console.warn('Theme storage sync error:', e);
    }
  }, [isDarkMode]);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [demoSubject, setDemoSubject] = useState<string>('Mathematics & Science');
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);
  
  // Selected items for modal/detail views
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Initial Firestore health check on boot
  useEffect(() => {
    testFirestoreConnection().catch((err) => console.log('[Firestore Init Check]:', err));
  }, []);

  // Dynamic Metadata & Structured Data calculation for active view
  let activeMetadata: PageMetadata = ROUTE_METADATA[currentRoute] || ROUTE_METADATA.home;
  let activeSchema: object[] = [getOrganizationSchema()];

  if (selectedCourseDetail) {
    activeMetadata = getCourseMetadata(selectedCourseDetail);
    activeSchema = [
      getOrganizationSchema(),
      getCourseSchema(selectedCourseDetail),
      ...(activeMetadata.breadcrumbs ? [getBreadcrumbSchema(activeMetadata.breadcrumbs)] : [])
    ];
  } else if (selectedBlogPost && currentRoute === 'blog') {
    activeMetadata = getBlogArticleMetadata(selectedBlogPost);
    activeSchema = [
      getOrganizationSchema(),
      getArticleSchema(selectedBlogPost),
      ...(activeMetadata.breadcrumbs ? [getBreadcrumbSchema(activeMetadata.breadcrumbs)] : [])
    ];
  } else if (currentRoute === 'courses') {
    activeSchema = [
      getOrganizationSchema(),
      getCourseCatalogSchema(COURSES_DATA),
      ...(activeMetadata.breadcrumbs ? [getBreadcrumbSchema(activeMetadata.breadcrumbs)] : [])
    ];
  } else if (currentRoute === 'faculty') {
    activeSchema = [
      getOrganizationSchema(),
      getFacultySchema(FACULTY_DATA),
      ...(activeMetadata.breadcrumbs ? [getBreadcrumbSchema(activeMetadata.breadcrumbs)] : [])
    ];
  } else if (currentRoute === 'faq') {
    activeSchema = [
      getOrganizationSchema(),
      getFAQPageSchema(FAQ_DATA),
      ...(activeMetadata.breadcrumbs ? [getBreadcrumbSchema(activeMetadata.breadcrumbs)] : [])
    ];
  } else if (currentRoute === 'home' || currentRoute === 'infant') {
    activeSchema = [
      getOrganizationSchema(),
      getWebSiteSchema(),
      getFAQPageSchema(FAQ_DATA.slice(0, 4))
    ];
  }

  const handleOpenDemoModal = (subject?: string) => {
    if (subject) setDemoSubject(subject);
    setIsDemoModalOpen(true);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent("Hello Nexis Academy! I would like to book a Free Demo Class and inquire about course schedules.");
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  const handleTransitionToRoute = (destRoute: PageRoute) => {
    setTargetRoute(destRoute);
    setIsLoadingTransition(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadingComplete = () => {
    setCurrentRoute(targetRoute);
    setIsLoadingTransition(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // If in 'coming-soon' standalone preview
  if (currentRoute === 'coming-soon') {
    return (
      <>
        <SEOHelmet metadata={ROUTE_METADATA['coming-soon']} />
        <ComingSoonPage />
      </>
    );
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-[#070A12] text-white' : 'light bg-[#FAFAFC] text-slate-900'}`}>
      
      {/* Slim Neon-Cyan Scroll Progress Bar (Responsive Viewport Tracking) */}
      <ScrollProgressBar />

      {/* Real-time Dynamic Reactive SEO Head Manager */}
      <SEOHelmet metadata={activeMetadata} schemaData={activeSchema} />

      {/* Loading Transition Screen between Opening Infant & Home */}
      {isLoadingTransition && (
        <LoadingScreen
          onLoadingComplete={handleLoadingComplete}
          targetName={targetRoute === 'home' ? 'Nexis Academy Home' : 'Nexis Academy'}
        />
      )}

      {/* Sticky Header Navbar (Active once entered Academy) */}
      {currentRoute !== 'infant' && (
        <Navbar
          currentRoute={currentRoute}
          onNavigate={(route) => {
            if (currentRoute === 'infant' && route === 'home') {
              handleTransitionToRoute('home');
            } else {
              setCurrentRoute(route);
            }
            setSelectedBlogPost(null);
          }}
          onOpenDemoModal={() => handleOpenDemoModal()}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          isLoggedIn={!!user}
        />
      )}

      {/* Main Page Content View Routing */}
      <main id="main-content">
        {currentRoute === 'infant' && (
          <InfantPage
            onEnterHomeWithLoading={() => handleTransitionToRoute('home')}
            onOpenDemoModal={() => handleOpenDemoModal()}
            onNavigate={(route) => {
              if (route === 'home') {
                handleTransitionToRoute('home');
              } else {
                setCurrentRoute(route);
              }
            }}
          />
        )}

        {currentRoute === 'home' && (
          <HomePage
            onOpenDemoModal={() => handleOpenDemoModal()}
            onNavigate={setCurrentRoute}
            onSelectCourse={(course) => setSelectedCourseDetail(course)}
            onSelectBlog={(blog) => setSelectedBlogPost(blog)}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage
            onOpenDemoModal={() => handleOpenDemoModal()}
            onNavigate={setCurrentRoute}
          />
        )}

        {currentRoute === 'courses' && (
          <CoursesPage
            onOpenDemoModal={(subject) => handleOpenDemoModal(subject)}
            onSelectCourse={(course) => setSelectedCourseDetail(course)}
          />
        )}

        {currentRoute === 'faculty' && (
          <FacultyPage
            onOpenDemoModal={() => handleOpenDemoModal()}
            onNavigate={setCurrentRoute}
          />
        )}

        {currentRoute === 'results' && (
          <ResultsPage
            onOpenDemoModal={() => handleOpenDemoModal()}
            onNavigate={setCurrentRoute}
          />
        )}

        {currentRoute === 'testimonials' && (
          <TestimonialsPage
            onOpenDemoModal={() => handleOpenDemoModal()}
            onNavigate={setCurrentRoute}
          />
        )}

        {currentRoute === 'faq' && <FAQPage onNavigate={setCurrentRoute} />}

        {currentRoute === 'contact' && <ContactPage onNavigate={setCurrentRoute} />}

        {currentRoute === 'blog' && !selectedBlogPost && (
          <BlogPage
            onSelectArticle={(post) => setSelectedBlogPost(post)}
            onNavigate={setCurrentRoute}
          />
        )}

        {currentRoute === 'blog' && selectedBlogPost && (
          <BlogDetailPage
            post={selectedBlogPost}
            onBack={() => setSelectedBlogPost(null)}
            onOpenDemoModal={() => handleOpenDemoModal()}
            onNavigate={setCurrentRoute}
          />
        )}

        {currentRoute === 'portal' && (
          <PortalPage
            onOpenDemoModal={() => handleOpenDemoModal()}
          />
        )}

        {currentRoute === 'admin' && (
          <AdminDevConsole
            initialMode="admin"
            onNavigate={(route) => setCurrentRoute(route)}
          />
        )}

        {currentRoute === 'devmode' && (
          <AdminDevConsole
            initialMode="devmode"
            onNavigate={(route) => setCurrentRoute(route)}
          />
        )}

        {currentRoute === 'privacy' && <LegalPage type="privacy" onNavigate={(route) => setCurrentRoute(route)} />}
        {currentRoute === 'terms' && <LegalPage type="terms" onNavigate={(route) => setCurrentRoute(route)} />}
      </main>

      {/* Global Course Detail Modal */}
      {selectedCourseDetail && (
        <CourseDetailPage
          course={selectedCourseDetail}
          onClose={() => setSelectedCourseDetail(null)}
          onOpenDemo={(sub) => handleOpenDemoModal(sub)}
        />
      )}

      {/* Primary Conversion Modal: Book Free Demo Class */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultSubject={demoSubject}
      />

      {/* Interactive AI Doubt Solver Widget */}
      <AITutorWidget
        isOpen={isAITutorOpen}
        onToggle={() => setIsAITutorOpen(!isAITutorOpen)}
      />

      {/* Floating WhatsApp Instant Callback Button */}
      <WhatsAppButton onClick={handleOpenWhatsApp} />

      {/* Mobile & Tablet Bottom Quick Navigation Dock (Only on main academy) */}
      {currentRoute !== 'infant' && (
        <MobileBottomDock
          currentRoute={currentRoute}
          onNavigate={(route) => {
            if (currentRoute === 'infant' && route === 'home') {
              handleTransitionToRoute('home');
            } else {
              setCurrentRoute(route);
            }
            setSelectedBlogPost(null);
          }}
          onOpenDemoModal={() => handleOpenDemoModal()}
          onOpenAITutor={() => setIsAITutorOpen(true)}
        />
      )}

      {/* Standard Footer (Only on main academy) */}
      {currentRoute !== 'infant' && (
        <Footer
          onNavigate={(route) => {
            if (currentRoute === 'infant' && route === 'home') {
              handleTransitionToRoute('home');
            } else {
              setCurrentRoute(route);
            }
            setSelectedBlogPost(null);
          }}
          onOpenDemoModal={() => handleOpenDemoModal()}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrandingProvider>
        <MainAppContent />
      </BrandingProvider>
    </AuthProvider>
  );
}
