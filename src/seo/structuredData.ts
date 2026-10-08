import { SEO_CONFIG, SITE_URL } from './seoConfig';
import { Course, FacultyMember, FAQItem, BlogPost } from '../types';

/**
 * Validated Schema.org JSON-LD Generators for Nexis Academy
 * Compatible with Google Search Rich Results (EducationalOrganization, Course, FAQ, Article, Breadcrumbs)
 */

/**
 * Organization & EducationalOrganization Schema
 */
export function getOrganizationSchema() {
  const { organization, siteName, tagline } = SEO_CONFIG;
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: organization.name,
    alternateName: organization.alternateName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: organization.logo,
      width: 512,
      height: 512
    },
    image: organization.logo,
    description: SEO_CONFIG.defaultDescription,
    slogan: tagline,
    email: organization.email,
    telephone: organization.phone,
    sameAs: organization.socialLinks,
    address: {
      '@type': 'PostalAddress',
      streetAddress: organization.address.streetAddress,
      addressLocality: organization.address.addressLocality,
      addressRegion: organization.address.addressRegion,
      postalCode: organization.address.postalCode,
      addressCountry: organization.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: organization.geo.latitude,
      longitude: organization.geo.longitude
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '14:00'
      }
    ],
    priceRange: '₹₹',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Nexis Academy Academic Course Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Class 6-10 Foundation & Board Sprints'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Class 11-12 JEE & NEET Competitive Coaching'
          }
        }
      ]
    }
  };
}

/**
 * WebSite Schema with SearchAction
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      '@id': `${SITE_URL}/#organization`
    },
    inLanguage: 'en-US'
  };
}

/**
 * Course Schema for Individual Courses
 */
export function getCourseSchema(course: Course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_URL}/courses#${course.id}`,
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: SEO_CONFIG.siteName,
      sameAs: SITE_URL
    },
    educationalLevel: course.gradeLevel,
    courseMode: course.mode,
    teaches: course.subjects.join(', '),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.mode,
      courseWorkload: course.schedule,
      duration: course.duration,
      location: {
        '@type': 'Place',
        name: 'Nexis Academy Campus & Hybrid Studio',
        address: {
          '@type': 'PostalAddress',
          addressLocality: SEO_CONFIG.organization.address.addressLocality,
          addressCountry: SEO_CONFIG.organization.address.addressCountry
        }
      }
    },
    offers: course.price ? {
      '@type': 'Offer',
      price: course.price.monthly.replace(/[^0-9]/g, '') || '2999',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      category: 'Tuition Fee'
    } : undefined
  };
}

/**
 * Full Course Catalog Schema
 */
export function getCourseCatalogSchema(courses: Course[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Nexis Academy Courses & Academic Programs',
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: getCourseSchema(course)
    }))
  };
}

/**
 * FAQPage Schema
 */
export function getFAQPageSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

/**
 * Faculty (Person) Schema
 */
export function getFacultySchema(facultyList: FacultyMember[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Nexis Academy Faculty & Mentors',
    itemListElement: facultyList.map((member, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: member.name === '[FACULTY NAME]' ? `Academic Mentor (${member.subject})` : member.name,
        jobTitle: `${member.subject} Lead Mentor`,
        worksFor: {
          '@type': 'EducationalOrganization',
          name: SEO_CONFIG.siteName
        },
        description: member.shortBio,
        image: member.photoUrl,
        knowsAbout: [member.subject, member.specialization],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: member.qualification
        }
      }
    }))
  };
}

/**
 * Blog Article (BlogPosting) Schema
 */
export function getArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    articleBody: post.content.replace(/[#*`_]/g, ''),
    image: post.imageUrl || SEO_CONFIG.defaultOgImage,
    datePublished: '2026-08-01T00:00:00+05:30',
    dateModified: '2026-08-20T00:00:00+05:30',
    author: {
      '@type': 'Organization',
      name: post.author || SEO_CONFIG.siteName,
      url: SITE_URL
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: SEO_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: SEO_CONFIG.organization.logo
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`
    }
  };
}

/**
 * BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
