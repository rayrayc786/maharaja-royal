import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Smooth fade in and scale down for the video
    tl.fromTo(videoRef.current, 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
    ).fromTo(titleRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: "power3.out" },
      "-=1.5"
    );

    // Parallax & Fade on Scroll
    gsap.to(videoRef.current, {
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

    gsap.to(titleRef.current, {
      y: -100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-dark" ref={containerRef}>
      {/* Subtle Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-royal-blue/30 z-[1]"></div>
      
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

      {/* Content */}
      <div className="relative z-[2] h-full flex flex-col items-center justify-center text-center px-4">
        <h1 ref={titleRef} className="flex flex-col items-center overflow-hidden">
          {/* Novikov style grand serif text */}
          <span className="block font-serif text-[clamp(40px,8vw,140px)] leading-[1.1] text-cream font-medium tracking-wide">
            Maharaja
          </span>
          <span className="block font-serif text-[clamp(30px,5vw,90px)] leading-[1.1] text-gold italic font-light mt-[-10px] md:mt-[-20px]">
            Royal Bites
          </span>
        </h1>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/70">Scroll to Explore</span>
          <div className="w-[1px] h-[50px] bg-gold/70 origin-top animate-grow-line"></div>
        </div>
      </div>
    </div>
  );
};
