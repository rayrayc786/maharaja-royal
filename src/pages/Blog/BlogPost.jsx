import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogData } from './blogData';
import { SplitTextReveal } from '../../components/SplitTextReveal/SplitTextReveal';
import gsap from 'gsap';

export const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogData.find((item) => item.id === id);

  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);

    // GSAP animations for article loading
    gsap.fromTo('.article-header-element',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
    );
    
    gsap.fromTo('.article-body-paragraph',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.4 }
    );
  }, [id]);

  if (!post) {
    return (
      <div className="min-height-screen bg-cream text-royal-blue flex flex-col justify-center items-center p-8">
        <h2 className="font-serif text-3xl mb-4">Article Not Found</h2>
        <Link to="/blog" className="px-6 py-3 bg-gold text-royal-blue font-medium rounded-full hover:bg-[#0A1930] hover:text-cream transition-colors duration-300">
          Back to Journal
        </Link>
      </div>
    );
  }

  // Get related/recent posts (excluding current post)
  const relatedPosts = blogData.filter((item) => item.id !== post.id).slice(0, 3);

  return (
    <div className="min-height-screen bg-cream text-royal-blue pt-32 pb-24">
      {/* Article Header Container */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <button 
          onClick={() => navigate('/blog')}
          className="inline-flex items-center text-xs tracking-widest uppercase font-semibold text-gold hover:text-royal-blue transition-colors duration-300 mb-8"
        >
          <span className="mr-2 font-mono">←</span> Back to Journal
        </button>

        {/* Categories / Meta */}
        <div className="article-header-element flex flex-wrap gap-4 items-center text-xs text-gold tracking-widest uppercase mb-4">
          <span className="px-3 py-1 bg-gold/10 border border-gold/30 rounded-full font-medium">{post.category}</span>
          <span className="text-royal-blue/60">•</span>
          <span className="text-royal-blue/60">{post.date}</span>
          <span className="text-royal-blue/60">•</span>
          <span className="text-royal-blue/60">{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="article-header-element font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] text-royal-blue mb-6">
          {post.title}
        </h1>

        {/* Author info */}
        <div className="article-header-element flex items-center gap-3 mb-10 pb-8 border-b border-royal-blue/10">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40 text-gold font-serif font-bold text-lg">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-royal-blue">{post.author}</p>
            <p className="text-[0.7rem] uppercase tracking-wider text-royal-blue/50">Culinary Team</p>
          </div>
        </div>
      </div>

      {/* Feature Image Banner */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
        <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl border border-royal-blue/10 relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-[800px] mx-auto px-6 md:px-12 mb-20">
        <div className="flex flex-col gap-6 text-royal-blue/90 font-sans font-light text-base md:text-lg leading-relaxed">
          {post.content.map((paragraph, index) => {
            // Apply dropcap to first letter of first paragraph
            if (index === 0) {
              const firstLetter = paragraph.charAt(0);
              const remainingText = paragraph.slice(1);
              return (
                <p key={index} className="article-body-paragraph">
                  <span className="float-left text-5xl md:text-6xl font-serif text-gold mr-3 mt-1 font-semibold leading-none">
                    {firstLetter}
                  </span>
                  {remainingText}
                </p>
              );
            }
            return (
              <p key={index} className="article-body-paragraph">
                {paragraph}
              </p>
            );
          })}
        </div>
      </article>

      {/* Related Posts Section */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 border-t border-royal-blue/10">
        <h3 className="font-serif text-2xl text-gold mb-8">Continue Reading</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((item) => (
            <Link 
              key={item.id} 
              to={`/blog/${item.id}`} 
              className="group block relative overflow-hidden rounded-xl border border-royal-blue/10 bg-white h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 text-[0.65rem] text-royal-blue/50 mb-1.5">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h4 className="font-serif text-base text-royal-blue group-hover:text-gold transition-colors duration-300 line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>
                <span className="inline-flex items-center text-xs font-semibold text-gold mt-4">
                  Read Article <span className="ml-1 font-mono">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
