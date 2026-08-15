import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Smooth fade in and scale down for the video
    tl.fromTo(videoRef.current, 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
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

    // Logo Animate Downward & Fade
    gsap.to(logoRef.current, {
      y: 150,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "50% top", // Fades out completely by the time they scroll halfway down the hero
        scrub: 1,
      }
    });



    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
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

      {/* Content */}
      <div className="relative z-[2] h-full flex flex-col items-center justify-center text-center px-4">

        {/* Hero Logo */}
        <div className="flex flex-col items-center group drop-shadow-lg" ref={logoRef}>
           <span className="font-serif text-[clamp(3rem,8vw,6rem)] tracking-[0.2em] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] text-white">MAHARAJA</span>
           <span className="text-[clamp(0.7rem,2vw,1.2rem)] uppercase tracking-[0.4em] mt-2 font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-gold">Royal Bites</span>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/70">Scroll to Explore</span>
          <div className="w-[1px] h-[50px] bg-gold/70 origin-top animate-grow-line"></div>
        </div>
      </div>
    </div>
  );
};
