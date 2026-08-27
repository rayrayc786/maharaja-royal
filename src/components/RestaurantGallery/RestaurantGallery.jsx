import { useState, useCallback, useEffect, useRef } from 'react';
import './RestaurantGallery.css';

import galleryImg1 from '../../assets/IMG_20260827_114647_090.jpg';
import galleryImg2 from '../../assets/IMG_20260827_114651_868.jpg';
import galleryImg3 from '../../assets/IMG_20260827_114656_411.jpg';
import galleryImg4 from '../../assets/1000758996.png';

const slides = [
  {
    id: 1,
    image: galleryImg4,
    title: 'FRESH FLAVORS. GREAT COMPANY',
    description: 'Authentic Indian cuisine and a welcoming space for friends and family',
  },
  {
    id: 2,
    image: galleryImg1,
    title: 'VIBRANT DINING ATMOSPHERE',
    description: 'Modern interiors, warm lighting, and the perfect setting to relax and enjoy',
  },
  {
    id: 3,
    image: galleryImg2,
    title: 'A ROYAL CULINARY EXPERIENCE',
    description: 'Every dish is crafted with devotion — a celebration of Indian royal heritage',
  },
  {
    id: 4,
    image: galleryImg3,
    title: 'A ROYAL CULINARY EXPERIENCE',
    description: 'Every dish is crafted with devotion — a celebration of Indian royal heritage',
  },
];

export const RestaurantGallery = () => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const total = slides.length;

  const transitioning = useRef(false);
  const autoRef = useRef(null);
  const currentRef = useRef(0);

  useEffect(() => { currentRef.current = current; }, [current]);

  const goTo = useCallback((index) => {
    if (transitioning.current) return;
    transitioning.current = true;
    const next = ((index % total) + total) % total;
    setCurrent(next);
    setTimeout(() => { transitioning.current = false; }, 500);
  }, [total]);

  const goPrev = useCallback(() => goTo(currentRef.current - 1), [goTo]);
  const goNext = useCallback(() => goTo(currentRef.current + 1), [goTo]);

  // Auto-advance every 5 s — pause on hover
  useEffect(() => {
    if (hovered) { clearInterval(autoRef.current); return; }
    autoRef.current = setInterval(() => goTo(currentRef.current + 1), 5000);
    return () => clearInterval(autoRef.current);
  }, [hovered, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext]);

  const prevIndex = ((current - 1) + total) % total;
  const nextIndex = (current + 1) % total;

  return (
    <section
      className="rg-section"
      aria-label="Restaurant gallery"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="rg-gallery" role="region" aria-roledescription="carousel" aria-label="Gallery slides">
        <div className="rg-track">

          {/* Active */}
          <div
            key={current}
            className="rg-slide rg-slide--active"
            aria-label={`Slide ${current + 1} of ${total}: ${slides[current].title}`}
          >
            <img src={slides[current].image} alt={slides[current].title} className="rg-slide__img" loading="eager" />
          </div>

          {/* Next (partial) */}
          <button className="rg-slide rg-slide--side rg-slide--next" aria-label="Go to next slide" onClick={goNext} tabIndex={0}>
            <img src={slides[nextIndex].image} alt={slides[nextIndex].title} className="rg-slide__img" loading="lazy" />
          </button>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="rg-bottom">
        <div className="rg-text">
          <p className="rg-eyebrow">{slides[current].title}</p>
          <p className="rg-description">{slides[current].description}</p>
        </div>

        <nav className="rg-nav" aria-label="Gallery navigation">
          <button className="rg-nav__prev" onClick={goPrev} aria-label="Previous slide">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <span className="rg-nav__counter" aria-live="polite" aria-atomic="true">
            {current + 1} / {total}
          </span>

          <button className="rg-nav__next" onClick={goNext} aria-label="Next slide">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>
      </div>
    </section>
  );
};
