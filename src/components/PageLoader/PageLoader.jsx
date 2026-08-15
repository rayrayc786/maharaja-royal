import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const PageLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 15) + 5;
      if (p > 100) p = 100;
      setProgress(p);
      if (p === 100) {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({ onComplete: onComplete });
      tl.to(logoRef.current, { scale: 1.1, duration: 0.8, ease: "power2.inOut" })
        .to(textRef.current, { opacity: 0, y: -20, duration: 0.4 }, "-=0.4")
        .to(loaderRef.current, { yPercent: -100, duration: 1.2, ease: "power4.inOut" });
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-royal-gradient flex items-center justify-center" ref={loaderRef}>
      <div className="text-center text-cream">
        <h1 className="heading-large mb-8 md:mb-16" ref={logoRef}>
          <span className="text-gold">MAHARAJA</span><br/>
          <span className="text-[0.4em]">ROYAL BITES</span>
        </h1>
        <div className="flex flex-col items-center gap-4" ref={textRef}>
          <span className="text-micro">RENO • ROYAL INDIAN CUISINE</span>
          <div className="w-48 h-[2px] bg-white/10 overflow-hidden">
            <div className="h-full bg-gold transition-all duration-200 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
