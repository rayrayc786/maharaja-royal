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
        const heroLogoRect = heroLogo.getBoundingClientRect();
        const heroSectionRect = hero.getBoundingClientRect();

        // 1. Calculate X movement (independent of vertical scroll)
        const heroCenterX = heroLogoRect.left + heroLogoRect.width / 2;
        const headerCenterX = headerRect.left + headerRect.width / 2;
        const moveX = headerCenterX - heroCenterX;

        // 2. Calculate Y movement robustly using absolute document coordinates
        // This avoids bugs when user navigates back to Home with a non-zero scroll position
        const absoluteHeroSectionTop = heroSectionRect.top + window.scrollY;
        const targetScrollY = absoluteHeroSectionTop + heroSectionRect.height;
        
        const headerElRect = header.getBoundingClientRect();
        const logoOffsetY = headerRect.top - headerElRect.top;
        const targetViewportCenterY = logoOffsetY + headerRect.height / 2;
        
        const targetAbsoluteCenterY = targetScrollY + targetViewportCenterY;
        const absoluteHeroLogoCenterY = heroLogoRect.top + window.scrollY + heroLogoRect.height / 2;
        
        const moveY = targetAbsoluteCenterY - absoluteHeroLogoCenterY;

        const targetScale = headerRect.width / heroLogoRect.width;

        console.log("=== INITIAL LOGO MEASUREMENTS ===");
        console.log("Window Info:", {
          innerHeight: window.innerHeight,
          scrollY: window.scrollY,
        });
        console.log("Hero Logo Rect:", {
          top: heroLogoRect.top,
          height: heroLogoRect.height,
          bottom: heroLogoRect.bottom,
          width: heroLogoRect.width,
        });
        console.log("Header Logo Rect:", {
          top: headerRect.top,
          height: headerRect.height,
          bottom: headerRect.bottom,
          width: headerRect.width,
        });
        console.log("=== CALCULATED MOVEMENT TARGETS ===");
        console.log("heroCenterX: ", heroCenterX);
        console.log("headerCenterX: ", headerCenterX);
        console.log("targetViewportCenterY: ", targetViewportCenterY);
        console.log("targetAbsoluteCenterY: ", targetAbsoluteCenterY);
        console.log("absoluteHeroLogoCenterY: ", absoluteHeroLogoCenterY);
        console.log("moveX (distance to move right): ", moveX);
        console.log("moveY (distance to move down): ", moveY);
        console.log("targetScale (how much to shrink): ", targetScale);
        console.log("===================================");

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
                headerCenterX,
                targetViewportCenterY,
                targetAbsoluteCenterY,
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
