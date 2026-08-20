import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import logoImg from '../../assets/Maharaja-logo.png';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const hero = containerRef.current;
      const video = videoRef.current;
      const heroLogo = logoRef.current;

      const header = document.querySelector('[data-header]');
      const headerLogo = document.querySelector('[data-header-logo]');

      if (!hero || !video || !heroLogo || !header || !headerLogo) {
        return;
      }

      const setupGSAP = () => {
        /*
         * ==========================================================
         * INITIAL STATE
         *
         * Hero logo: fully visible, centered in hero
         * Header logo: hidden — GSAP reveals it at handoff moment
         *
         * NOTE: We do NOT hide the entire header bar here.
         * The header is below the hero at absolute top-[100vh]
         * and rises naturally as the user scrolls.
         * ==========================================================
         */

        gsap.set(heroLogo, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          transformOrigin: 'center center',
        });

        gsap.set(headerLogo, { opacity: 0 });

        const overlay = overlayRef.current;

        /*
         * ==========================================================
         * VIDEO INTRO
         * ==========================================================
         */

        gsap.fromTo(
          [video, overlay],
          { opacity: 0 },
          { opacity: 1, duration: 2.5, ease: 'power2.out' }
        );

        gsap.fromTo(
          video,
          { scale: 1.1 },
          { scale: 1, duration: 2.5, ease: 'power2.out' }
        );

        /*
         * ==========================================================
         * VIDEO PARALLAX
         * ==========================================================
         */

        gsap.to(video, {
          scale: 1.05,
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        /*
         * ==========================================================
         * MEASURE ELEMENTS
         *
         * The header is at absolute top-[100vh] (below viewport).
         * We use headerLogoRect only for:
         *   - X center (correct — horizontal layout is independent of Y)
         *   - width (for scale calculation)
         *
         * For Y, we calculate manually based on hero height.
         * This avoids using headerLogoRect.top which would be
         * off-screen and give a wrong value.
         * ==========================================================
         */

        const headerRect = headerLogo.getBoundingClientRect();
        const heroRect = heroLogo.getBoundingClientRect();

        const heroCenterX = heroRect.left + heroRect.width / 2;
        const heroCenterY = heroRect.top + heroRect.height / 2;

        const headerCenterX = headerRect.left + headerRect.width / 2;

        // Header's target Y center in the viewport once it reaches the top
        // (Since the header will snap to fixed top-0)
        // Note: The header has padding, so we must add the top padding to get the actual logo center!
        // The header has py-4 (16px) or py-5 (20px). The exact position in the viewport will be headerRect.top + headerRect.height/2.
        // Wait, since header is currently at top-[100vh], its viewport top is 100vh.
        // Once it reaches top-0, its viewport top will be 0.
        // So its final viewport center Y is just its current viewport center Y minus 100vh!
        // This is mathematically flawless and avoids hardcoding padding.
        
        const headerInitialCenterY = headerRect.top + headerRect.height / 2;
        const headerFinalCenterY = headerInitialCenterY - window.innerHeight;

        const moveX = headerCenterX - heroCenterX;
        
        // We want the hero logo to end up at headerFinalCenterY in the viewport.
        // But the hero section itself scrolls UP by window.innerHeight.
        // So we must move the logo DOWN by window.innerHeight to cancel the scroll,
        // AND THEN move it to the final destination.
        const moveY = (headerFinalCenterY - heroCenterY) + window.innerHeight;

        const targetScale = headerRect.width / heroRect.width;

        console.log("=== INITIAL LOGO MEASUREMENTS ===");
        console.log("Window Info:", {
          innerHeight: window.innerHeight,
          scrollY: window.scrollY,
        });
        console.log("Hero Logo Rect:", {
          top: heroRect.top,
          height: heroRect.height,
          bottom: heroRect.bottom,
          width: heroRect.width,
        });
        console.log("Header Logo Rect:", {
          top: headerRect.top,
          height: headerRect.height,
          bottom: headerRect.bottom,
          width: headerRect.width,
        });
        console.log("=== CALCULATED MOVEMENT TARGETS ===");
        console.log("heroCenterX: ", heroCenterX);
        console.log("heroCenterY: ", heroCenterY);
        console.log("headerCenterX: ", headerCenterX);
        console.log("headerInitialCenterY: ", headerInitialCenterY);
        console.log("headerFinalCenterY: ", headerFinalCenterY);
        console.log("moveX (distance to move right): ", moveX);
        console.log("moveY (distance to move down): ", moveY);
        console.log("targetScale (how much to shrink): ", targetScale);
        console.log("===================================");
        console.log("=================================");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Real-time tracking of both logos during the scroll
              const currentHeroRect = heroLogo.getBoundingClientRect();
              const currentHeaderRect = headerLogo.getBoundingClientRect();
              const heroStyle = window.getComputedStyle(heroLogo);
              const headerStyle = window.getComputedStyle(headerLogo);
              
              console.log(`[Scroll Progress: ${(self.progress * 100).toFixed(1)}%]`, {
                // Real-time values
                heroViewportY: currentHeroRect.top.toFixed(2),
                headerViewportY: currentHeaderRect.top.toFixed(2),
                distanceBetweenThem: (currentHeaderRect.top - currentHeroRect.bottom).toFixed(2),
                heroOpacity: heroStyle.opacity,
                headerOpacity: headerStyle.opacity,
                heroTransform: heroStyle.transform,
                
                // Calculated target values (shown continuously as requested)
                targetMoveX: moveX,
                targetMoveY: moveY,
                targetScale: targetScale,
                heroCenterX,
                heroCenterY,
                headerCenterX,
                headerInitialCenterY,
                headerFinalCenterY,
              });
            }
          },
        });

        timeline.to(heroLogo, {
          x: moveX,
          y: moveY-50,
          scale: targetScale,
          duration: 1,
          ease: 'none', // Must be 'none' to smoothly glide to the top without bobbing
        });

timeline.to(
  heroLogo,
  {
    opacity: 0,
    duration: 0.05,
  }
);

timeline.to(
  headerLogo,
  {
    opacity: 1,
    duration: 0.05,
  },
  '<'
);
      };

      // Wait for both logos to be fully loaded before measuring dimensions
      const heroImg = heroLogo.querySelector('img');
      const headerImg = headerLogo.querySelector('img');

      if (heroImg && headerImg) {
        if (heroImg.complete && headerImg.complete) {
          setupGSAP();
        } else {
          let loaded = 0;
          const onLoad = () => {
            loaded++;
            if (loaded >= 2) setupGSAP();
          };
          if (!heroImg.complete) heroImg.addEventListener('load', onLoad);
          else loaded++;
          if (!headerImg.complete) headerImg.addEventListener('load', onLoad);
          else loaded++;
          if (loaded >= 2) setupGSAP();
        }
      } else {
        setupGSAP();
      }

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        relative
        w-screen
        h-screen
        overflow-hidden
        bg-royal-gradient
      "
    >

      {/* ======================================================
          VIDEO OVERLAY
      ====================================================== */}

      <div
        ref={overlayRef}
        className="
          absolute inset-0 bg-black/40 opacity-0 z-[1]
        "
      />

      {/* ======================================================
          VIDEO
      ====================================================== */}

      <video
        ref={videoRef}
        className="
          absolute inset-0 w-full h-full object-cover opacity-0 z-0
        "
        autoPlay
        muted
        loop
        playsInline
        src="https://www.pexels.com/download/video/3769033/"
      />

      {/* ======================================================
          HERO LOGO

      DO NOT use -translate-x-1/2 or -translate-y-1/2 here.
      GSAP owns the transform on this element.
      The initial centering is done via inline style below.
      ====================================================== */}

      <div
        ref={logoRef}
        className="
          absolute z-[150] left-1/2 top-1/2
          pointer-events-none
          flex items-center justify-center
          drop-shadow-lg
        "
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <img
          src={logoImg}
          alt="Maharaja Royal Bites Logo"
          className="
            w-[clamp(12rem,35vw,25rem)]
            h-auto
            object-contain
            drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]
          "
        />
      </div>

      {/* ======================================================
          HERO CONTENT
      ====================================================== */}

      <div
        className="
          relative z-[2] h-full
          flex flex-col items-center justify-center
          text-center px-4
        "
      >

        <div
          className="
            absolute bottom-12 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-6
          "
        >

          <span
            className="
              text-[0.65rem] uppercase tracking-[0.2em] text-cream/70
            "
          >
            Scroll to Explore
          </span>

          <div
            className="
              w-[1px] h-[50px] bg-gold/70
              origin-top animate-grow-line
            "
          />

        </div>

      </div>

    </div>
  );
};
