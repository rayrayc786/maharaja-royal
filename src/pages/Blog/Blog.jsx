import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogData } from './blogData';
import { SplitTextReveal } from '../../components/SplitTextReveal/SplitTextReveal';
import gsap from 'gsap';

export const Blog = () => {
  useEffect(() => {
    // Fade in articles on load
    gsap.fromTo('.blog-card', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
    );
  }, []);

  const featuredPost = blogData[0];
  const sidePosts = blogData.slice(1, 3);
  const remainingPosts = blogData.slice(3);

  return (
    <div className="min-height-screen bg-cream text-royal-blue pt-32 pb-24 px-6 md:px-12 lg:px-24">
      {/* Header Section */}
      <div className="max-w-[1600px] mx-auto mb-16 text-center lg:text-left">
        <span className="text-[0.8rem] uppercase tracking-[0.3em] text-gold mb-3 block">Chronicles of Taste</span>
        <SplitTextReveal 
          className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] text-royal-blue" 
          text="The Royal Journal" 
        />
        <p className="font-sans font-light text-royal-blue/70 text-lg max-w-[600px] mt-4 leading-relaxed">
          Step into our culinary sanctuary. Read about the centuries-old secrets, pure ingredients, and royal heritage behind Maharaja Royal Bites.
        </p>
      </div>

      <div className="max-w-[1600px] mx-auto">
        {/* Top Layout: 1 Large Featured + 2 Stacked Side Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Post (Spans 2 columns on large screens) */}
          {featuredPost && (
            <div className="lg:col-span-2 blog-card">
              <Link to={`/blog/${featuredPost.id}`} className="group block relative overflow-hidden rounded-xl border border-royal-blue/10 bg-white h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                  
                  {/* Category Tag */}
                  <span className="absolute top-6 left-6 px-4 py-1.5 text-xs tracking-wider uppercase font-medium bg-gold text-royal-blue rounded-full">
                    {featuredPost.category}
                  </span>
                </div>
                
                {/* Content Overlay */}
                <div className="p-8 relative z-10 flex-1 flex flex-col justify-end">
                  <div className="flex gap-4 text-xs text-royal-blue/60 mb-3">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-royal-blue group-hover:text-gold transition-colors duration-300 mb-4 leading-snug">
                    {featuredPost.title}
                  </h3>
                  <p className="font-sans font-light text-royal-blue/80 text-sm md:text-base leading-relaxed max-w-[800px] mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <span className="inline-flex items-center text-xs tracking-widest uppercase font-semibold text-gold group-hover:translate-x-2 transition-transform duration-300">
                    Read Article <span className="ml-2 font-mono">→</span>
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Side Stacked Posts */}
          <div className="flex flex-col gap-8 justify-between">
            {sidePosts.map((post) => (
              <div key={post.id} className="blog-card flex-1">
                <Link to={`/blog/${post.id}`} className="group block relative overflow-hidden rounded-xl border border-royal-blue/10 bg-white h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-[16/7] overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <span className="absolute top-4 left-4 px-3 py-1 text-[0.65rem] tracking-wider uppercase font-medium bg-gold text-royal-blue rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-3 text-[0.7rem] text-royal-blue/60 mb-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="font-serif text-xl text-royal-blue group-hover:text-gold transition-colors duration-300 line-clamp-2 leading-snug mb-3">
                        {post.title}
                      </h4>
                    </div>
                    <span className="inline-flex items-center text-xs tracking-widest uppercase font-semibold text-gold group-hover:translate-x-1 transition-transform duration-300 mt-2">
                      Read Article <span className="ml-2 font-mono">→</span>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid Layout: Remaining Posts */}
        {remainingPosts.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl text-gold mb-8 pb-4 border-b border-royal-blue/10">More Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post) => (
                <div key={post.id} className="blog-card">
                  <Link to={`/blog/${post.id}`} className="group block relative overflow-hidden rounded-xl border border-royal-blue/10 bg-white h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <span className="absolute top-4 left-4 px-3 py-1 text-[0.65rem] tracking-wider uppercase font-medium bg-gold text-royal-blue rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex gap-3 text-[0.7rem] text-royal-blue/60 mb-2">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h4 className="font-serif text-xl text-royal-blue group-hover:text-gold transition-colors duration-300 leading-snug mb-3">
                          {post.title}
                        </h4>
                        <p className="font-sans font-light text-royal-blue/70 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      </div>
                      <span className="inline-flex items-center text-xs tracking-widest uppercase font-semibold text-gold group-hover:translate-x-1 transition-transform duration-300 mt-2">
                        Read Article <span className="ml-2 font-mono">→</span>
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
