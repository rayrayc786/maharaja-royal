import { useLayoutEffect, useRef } from 'react';
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

        /*
         * ==========================================================
         * VIDEO INTRO
         * ==========================================================
         */

        gsap.fromTo(
          video,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' }
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

        const heroHeight = hero.offsetHeight; // = window.innerHeight

        const heroRect = heroLogo.getBoundingClientRect();
        const headerLogoRect = headerLogo.getBoundingClientRect();

        /*
         * X — align hero logo center to header logo center
         * (Header is full-width, so X is the same whether fixed or absolute)
         */
        const heroCenterX = heroRect.left + heroRect.width / 2;
        const headerLogoCenterX = headerLogoRect.left + headerLogoRect.width / 2;
        const moveX = headerLogoCenterX - heroCenterX;

        /*
         * SCALE — shrink hero logo down to header logo size
         */
        const targetScale = headerLogoRect.width / heroRect.width;

        /*
         * Y — move hero logo DOWN toward the bottom of the hero section.
         *
         * The hero logo moves DOWN (positive Y) while the hero section
         * scrolls UP. Their combined effect keeps the logo roughly
         * stationary in the viewport until it reaches the hero bottom.
         *
         * Target: hero logo center should be at heroHeight - scaledLogoHeight/2
         * (bottom edge of hero, so logo bottom aligns with hero bottom = header top)
         *
         * Movement = target_center_document - initial_center_viewport
         */
        const scaledLogoHeight = heroRect.height * targetScale;

        const heroLogoInitialCenterY = heroRect.top + heroRect.height / 2;
        // Document coordinate of where the logo should end up (hero section bottom)
        const targetHeroLogoCenterY = heroHeight - scaledLogoHeight / 2;

        const moveY = targetHeroLogoCenterY - heroLogoInitialCenterY;

        console.log('=== LOGO HANDOFF ===');
        console.log('heroHeight:', heroHeight);
        console.log('heroLogo height:', heroRect.height);
        console.log('heroLogo center Y (viewport):', heroLogoInitialCenterY);
        console.log('targetScale:', targetScale);
        console.log('scaledLogoHeight:', scaledLogoHeight);
        console.log('targetHeroLogoCenterY (document):', targetHeroLogoCenterY);
        console.log('moveX:', moveX, ' moveY (positive = down):', moveY);
        console.log('====================');

        /*
         * ==========================================================
         * MASTER LOGO HANDOFF TIMELINE
         *
         * This timeline is scrubbed by scroll.
         * Total scroll range: top-of-hero to bottom-of-hero (100vh).
         *
         * Stage 1 (0–50% scroll):
         *   Hero logo moves DOWN within the hero section.
         *   Simultaneously the hero section scrolls UP.
         *   Net effect: hero logo stays near viewport center
         *   while the header rises from below.
         *
         * Stage 2+3 (at ~50% scroll, SIMULTANEOUSLY):
         *   Hero logo:   opacity 0 (disappears)
         *   Header logo: opacity 1 (appears)
         *   No delay between them — they happen at the exact same moment.
         *
         * Stage 4 (50–100% scroll):
         *   Header logo stays visible as header continues rising
         *   until it reaches the top and becomes fixed.
         * ==========================================================
         */

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Stage 1: Hero logo moves DOWN to the hero section's bottom edge
        timeline.to(heroLogo, {
          x: moveX,
          y: moveY,
          scale: targetScale,
          duration: 0.5,
          ease: 'power2.inOut',
        });

        // Stage 2: Hero logo disappears instantly
        timeline.to(heroLogo, {
          opacity: 0,
          duration: 0.01,
          ease: 'none',
        });

        // Stage 3: Header logo appears at the SAME TIME as stage 2
        // '<' means "start at the same position as the previous tween"
        timeline.to(
          headerLogo,
          {
            opacity: 1,
            duration: 0.01,
            ease: 'none',
          },
          '<'
        );

        // Stage 4: Hold state while header continues rising to the top
        timeline.to({}, { duration: 0.48 });
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
        bg-dark
      "
    >

      {/* ======================================================
          VIDEO OVERLAY
      ====================================================== */}

      <div
        className="
          absolute inset-0 bg-black/40 z-[1]
        "
      />

      {/* ======================================================
          VIDEO
      ====================================================== */}

      <video
        ref={videoRef}
        className="
          absolute inset-0 w-full h-full object-cover z-0
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
