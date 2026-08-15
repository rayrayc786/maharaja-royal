import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import logoImg from '../../assets/Maharaja-logo.png';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroVideo = videoRef.current;
      const heroLogo = logoRef.current;

      if (!heroLogo) return;

      // Smooth fade in and scale down for the video
      gsap.fromTo(heroVideo, 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
      );

      // Parallax & Fade on Scroll
      gsap.to(heroVideo, {
        scale: 1.05,
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Logo Scroll Transformation Timeline
      const logoTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Animate logo downward and scale down to meet header by 35% scroll
      logoTimeline.to(heroLogo, {
        x: () => {
          const headerLogo = document.querySelector('.header-logo-container');
          if (!headerLogo) return 0;
          const heroRect = heroLogo.getBoundingClientRect();
          const headerRect = headerLogo.getBoundingClientRect();
          const heroCenterX = heroRect.left + heroRect.width / 2;
          const headerCenterX = headerRect.left + headerRect.width / 2;
          return headerCenterX - heroCenterX;
        },
        y: () => {
          const headerLogo = document.querySelector('.header-logo-container');
          if (!headerLogo) return 0;
          const headerRect = headerLogo.getBoundingClientRect();
          const heroCenterY = window.innerHeight * 0.5;
          // Target center Y relative to the top of the header bar
          const targetY = window.innerHeight - (headerRect.height / 2);
          return targetY - heroCenterY;
        },
        scale: () => {
          const headerLogo = document.querySelector('.header-logo-container');
          if (!headerLogo) return 0.15;
          const heroRect = heroLogo.getBoundingClientRect();
          const headerRect = headerLogo.getBoundingClientRect();
          return headerRect.width / heroRect.width;
        },
        ease: "power1.out",
        duration: 0.35
      }, 0);

      // Fade out hero logo and fade in header logo right as "Royal Bites" meets the header (at 25% to 35% scroll)
      logoTimeline.to(heroLogo, {
        opacity: 0,
        ease: "power1.in",
        duration: 0.1
      }, 0.20);

      logoTimeline.to(document.querySelector('.header-logo-container'), {
        opacity: 1,
        ease: "power1.out",
        duration: 0.1
      }, 0.20);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-dark" ref={containerRef}>
      {/* Darker Overlay to ensure text readability against the video */}
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>
      
      {/* Video */}
      <video 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay 
        muted 
        loop 
        playsInline
        src="https://www.pexels.com/download/video/3769033/" 
      />

      {/* Hero Logo (Absolute position, escapes stacking context, moves downward to meet header) */}
      <div className="absolute z-[110] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center group drop-shadow-lg" ref={logoRef}>
         <img src={logoImg} alt="Maharaja Royal Bites Logo" className="w-[clamp(12rem,35vw,25rem)] h-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
      </div>

      {/* Content */}
      <div className="relative z-[2] h-full flex flex-col items-center justify-center text-center px-4">
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/70">Scroll to Explore</span>
          <div className="w-[1px] h-[50px] bg-gold/70 origin-top animate-grow-line"></div>
        </div>
      </div>
    </div>
  );
};
