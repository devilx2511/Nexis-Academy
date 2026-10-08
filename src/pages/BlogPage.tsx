import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/academyData';
import { BlogPost, PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BookOpen, Clock, Calendar, ArrowRight, User, Search } from 'lucide-react';

interface BlogPageProps {
  onSelectArticle: (post: BlogPost) => void;
  onNavigate: (route: PageRoute) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onSelectArticle, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Study Tips', 'Exam Prep', 'Parent Guide', 'Math & Science'];

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-[#0B0C10] text-white min-h-screen space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs 
          items={[{ name: 'Blog & Articles', route: 'blog' }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
          Academic Knowledge Hub
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
          Study Tips, Exam Guides & Parent Advice
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          Insights from Nexis Academy subject specialists on time management, formula retention, and board preparation.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#1F2833]/60 border border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#66FCF1] text-[#0B0C10]'
                    : 'bg-black/40 text-gray-300 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#66FCF1] text-xs"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="seo-3d-card flex flex-col justify-between overflow-hidden group hover:border-[#66FCF1]/50 cursor-pointer"
              onClick={() => onSelectArticle(post)}
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-black/40">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#66FCF1] border border-[#66FCF1]/40 text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#66FCF1]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#45A29E]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-heading font-bold text-white group-hover:text-[#66FCF1] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#66FCF1]">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
};
