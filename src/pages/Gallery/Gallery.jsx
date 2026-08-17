import React, { useState, useEffect } from 'react';
import { galleryData } from './galleryData';
import { SplitTextReveal } from '../../components/SplitTextReveal/SplitTextReveal';
import gsap from 'gsap';

export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('dishes');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = galleryData.filter(item => item.category === activeFilter);

  useEffect(() => {
    // Animate grid entries when filter changes
    gsap.fromTo('.gallery-item', 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeFilter]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-height-screen bg-cream text-royal-blue pt-32 pb-24 px-6 md:px-12 lg:px-24">
      {/* Page Header */}
      <div className="max-w-[1600px] mx-auto mb-12 text-center">
        <span className="text-[0.8rem] uppercase tracking-[0.3em] text-gold mb-3 block">Visual Feast</span>
        <SplitTextReveal 
          className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] text-royal-blue mb-4" 
          text="The Royal Gallery" 
        />
        <p className="font-sans font-light text-royal-blue/70 text-lg max-w-[600px] mx-auto mt-4 leading-relaxed">
          Embark on a visual journey through our kitchen's finest culinary creations, signature drinks, and luxurious royal dining atmosphere.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-[800px] mx-auto">
        {[
          { id: 'dishes', label: 'Signature Dishes' },
          { id: 'desserts-drinks', label: 'Desserts & Drinks' },
          { id: 'ambience', label: 'Ambience & Interior' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-300 ${
              activeFilter === tab.id
                ? 'bg-royal-blue text-cream border-royal-blue shadow-md'
                : 'bg-white text-royal-blue border-royal-blue/15 hover:border-royal-blue/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid Layout: CSS columns for Masonry style */}
      <div className="max-w-[1600px] mx-auto columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredImages.map((item, index) => (
          <div 
            key={item.id} 
            className="gallery-item break-inside-avoid overflow-hidden rounded-xl border border-royal-blue/10 bg-white group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            onClick={() => setLightboxIndex(index)}
          >
            <div className="relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[0.65rem] uppercase tracking-widest text-gold font-medium mb-1">{item.category.replace('-', ' & ')}</span>
                <h4 className="text-white font-serif text-lg leading-snug">{item.title}</h4>
                <p className="text-white/70 font-sans font-light text-xs mt-1">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col justify-center items-center p-4 md:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream hover:bg-cream hover:text-black transition-colors duration-300"
            onClick={() => setLightboxIndex(null)}
          >
            <span className="text-2xl font-light">✕</span>
          </button>

          {/* Lightbox Frame */}
          <div className="relative max-w-[1200px] w-full max-h-[80vh] flex justify-center items-center">
            {/* Prev Control */}
            <button 
              className="absolute left-4 z-10 w-12 h-12 rounded-full border border-cream/20 bg-black/50 flex items-center justify-center text-cream hover:bg-cream hover:text-black transition-colors duration-300"
              onClick={handlePrev}
            >
              ←
            </button>

            <img 
              src={filteredImages[lightboxIndex].image} 
              alt={filteredImages[lightboxIndex].title} 
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-cream/10"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next Control */}
            <button 
              className="absolute right-4 z-10 w-12 h-12 rounded-full border border-cream/20 bg-black/50 flex items-center justify-center text-cream hover:bg-cream hover:text-black transition-colors duration-300"
              onClick={handleNext}
            >
              →
            </button>
          </div>

          {/* Info Details */}
          <div className="text-center mt-6 max-w-[600px] text-cream" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs uppercase tracking-widest text-gold font-medium mb-1 block">
              {filteredImages[lightboxIndex].category.replace('-', ' & ')}
            </span>
            <h4 className="font-serif text-xl md:text-2xl">{filteredImages[lightboxIndex].title}</h4>
            <p className="font-sans font-light text-sm text-cream/70 mt-2">{filteredImages[lightboxIndex].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
