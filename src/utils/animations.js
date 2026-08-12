import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a split text reveal animation (simulated here with lines/words wrappers if not using GSAP SplitText plugin which is premium).
 * Since we don't have SplitText, we assume the component maps words/lines to span elements.
 */
export const createTextReveal = (elements, trigger) => {
  return gsap.fromTo(
    elements,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: trigger,
        start: 'top 85%',
      },
    }
  );
};

export const createImageReveal = (container, image) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
    },
  });

  tl.fromTo(
    container,
    { clipPath: 'inset(100% 0 0 0)' },
    { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power3.inOut' }
  ).fromTo(
    image,
    { scale: 1.2 },
    { scale: 1, duration: 1.5, ease: 'power3.inOut' },
    '-=1.5'
  );

  return tl;
};

export const createParallax = (trigger, target, yPercent = 20) => {
  return gsap.to(target, {
    yPercent: yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};
