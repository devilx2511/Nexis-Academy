import React from 'react';
import { BlogPost, PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShareContentButton } from '../components/ShareContentButton';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles } from 'lucide-react';

interface BlogDetailPageProps {
  post: BlogPost;
  onBack: () => void;
  onOpenDemoModal: () => void;
  onNavigate?: (route: PageRoute) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ post, onBack, onOpenDemoModal, onNavigate }) => {
  return (
    <div className="pt-24 pb-20 bg-[#0B0C10] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs 
          items={[
            { name: 'Blog & Articles', route: 'blog' },
            { name: post.title }
          ]}
          onNavigate={onNavigate}
        />

        {/* Back Button & Share */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:border-[#66FCF1]/40 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </button>

          <ShareContentButton 
            title={post.title}
            text={`Read "${post.title}" on the Nexis Academy learning blog.`}
            variant="pill"
          />
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#66FCF1]/10 text-[#66FCF1] border border-[#66FCF1]/30 uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400 border-y border-white/10 py-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <User className="w-4 h-4 text-[#66FCF1]" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#45A29E]" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#66FCF1]" />
                {post.readTime}
              </span>
            </div>

            <ShareContentButton 
              title={post.title}
              text={`Insightful read: ${post.title}`}
              variant="pill"
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden h-72 sm:h-96 border border-white/10">
          <img 
            src={post.imageUrl} 
            alt={`Nexis Academy Study Guide - ${post.title}`} 
            loading="lazy"
            decoding="async"
            width={896}
            height={384}
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Content Body */}
        <div className="seo-3d-card p-6 sm:p-10 text-gray-200 text-sm sm:text-base leading-relaxed space-y-6 font-sans">
          <div className="whitespace-pre-line">
            {post.content}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-400">
              Found this guide helpful? Share it with classmates or parents:
            </div>
            <ShareContentButton 
              title={post.title}
              text={`Educational guide: ${post.title}`}
              variant="button"
            />
          </div>
        </div>

        {/* CTA Banner inside Article */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#1F2833] to-black border border-[#66FCF1]/40 text-center space-y-4">
          <h3 className="text-2xl font-heading font-bold text-white">
            Want 1-on-1 Personalized Mentorship for Your Child?
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
            Book a free 3D glassmorphic classroom demo with Nexis Academy subject leads today.
          </p>
          <button
            onClick={onOpenDemoModal}
            className="px-6 py-3 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs inline-flex items-center gap-2 glow-cyan-sm cursor-pointer"
          >
            <span>Book Free Demo Class</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
