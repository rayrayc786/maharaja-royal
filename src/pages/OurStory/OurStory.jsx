import React, { useEffect } from 'react';
import { SplitTextReveal } from '../../components/SplitTextReveal/SplitTextReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OurStory = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Fade-up animation for story paragraphs and headings
      const fadeUpElements = gsap.utils.toArray('.gsap-story-fade-up');
      fadeUpElements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Parallax effect on hero image
      gsap.to('.story-hero-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-height-screen bg-[#0A1930] text-cream">
      {/* 1. Hero Section (Parallax & Premium Overlay) */}
      <section className="story-hero relative h-[80vh] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Maharaja Dining Hall" 
            className="story-hero-bg w-full h-[120%] object-cover opacity-35 -translate-y-[10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1930] via-[#0A1930]/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <span className="text-[0.8rem] uppercase tracking-[0.4em] text-gold mb-4 block">Our Heritage</span>
          <SplitTextReveal 
            className="font-serif text-[clamp(3rem,6vw,6rem)] leading-[1.1] text-cream" 
            text="Designed for Royalty" 
          />
          <p className="font-sans font-light text-cream/70 text-lg md:text-xl max-w-[600px] mx-auto mt-6 leading-relaxed">
            Unearthing the culinary recipes and luxury traditions of ancient royal Indian empires.
          </p>
        </div>
      </section>

      {/* 2. Brand Philosophy (Cream background) */}
      <section className="bg-cream text-royal-blue py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="w-full order-2 lg:order-1">
            <div className="aspect-[4/3] lg:aspect-square overflow-hidden rounded-xl border border-royal-blue/10 relative">
              <img 
                src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1000" 
                alt="Culinary Spices" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
          <div className="w-full order-1 lg:order-2 pl-0 lg:pl-12">
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-gold mb-3 block font-bold">The Soul of Taste</span>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] text-royal-blue mb-8 gsap-story-fade-up">
              Heritage Ingredients, Uncompromised Passion
            </h2>
            <div className="flex flex-col gap-6 font-sans font-light text-base md:text-lg text-royal-blue/80 leading-relaxed gsap-story-fade-up">
              <p>
                At Maharaja Royal Bites, we believe that true flavor is a form of poetry. Our culinary philosophy is anchored in Awadhi slow-cooking (Dum Pukht) where ingredients are simmered in heavy pots sealed with dough, trapping all flavors and nutrients inside.
              </p>
              <p>
                From the handpicked saffron of Kashmiri valleys to the cardamom pods of the Kerala hills, every single element in our kitchen is sourced at peak season. We never cut corners, nor do we compromise on the time-tested techniques that define royal cooking.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 3. The Kitchen Dynasty / Meet the Chef (Dark Blue Gradient) */}
      <section className="bg-royal-gradient relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Subtle Mandala Texture Overlay — reduced size and opacity for a softer backdrop */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: 'url(/mandala-tile.png)',
            backgroundSize: '110px 110px',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'screen',
            opacity: 0.07,
          }}
        />
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7 pr-0 lg:pr-12">
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-gold mb-3 block font-bold">The Master Artisan</span>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] text-cream mb-8 gsap-story-fade-up">
              Executive Chef Ranbir Kapoor
            </h2>
            <div className="flex flex-col gap-6 font-sans font-light text-base md:text-lg text-cream/80 leading-relaxed gsap-story-fade-up">
              <p>
                With over two decades of fine dining experience, Chef Ranbir Kapoor has dedicated his life to reviving the long-lost recipes of the Mughal royal courts. Trained under heritage culinary masters in Lucknow, he brings absolute authenticity to Reno.
              </p>
              <p>
                “Indian royal cooking is not about overpowering spice; it is about absolute harmony. My goal is to transport our diners to a different era, allowing them to experience the exact texture, aroma, and grace that was served at royal tables centuries ago.”
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="aspect-[3/4] overflow-hidden rounded-xl border border-cream/10 relative">
              <img 
                src="https://images.pexels.com/photos/6746839/pexels-photo-6746839.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Chef Ranbir Kapoor plating" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Timeline Section (Cream background) */}
      <section className="bg-cream text-royal-blue py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-gold mb-3 block font-bold">Our Journey</span>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] text-royal-blue">
              Milestones of Royalty
            </h2>
          </div>

          <div className="relative border-l border-royal-blue/10 ml-4 md:ml-12 pl-8 md:pl-16 space-y-12">
            {/* Timeline Item 1 */}
            <div className="relative gsap-story-fade-up">
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-gold border-4 border-cream"></div>
              <span className="font-serif text-2xl text-gold font-semibold">2018</span>
              <h4 className="font-serif text-xl text-royal-blue font-medium mt-1">The Saffron Quest</h4>
              <p className="font-sans font-light text-sm md:text-base text-royal-blue/70 mt-2 max-w-[600px]">
                Our founders spent months travelling through Lucknow and Kashmir, establishing direct relationships with spice farming cooperatives to guarantee heritage crop availability.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative gsap-story-fade-up">
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-gold border-4 border-cream"></div>
              <span className="font-serif text-2xl text-gold font-semibold">2021</span>
              <h4 className="font-serif text-xl text-royal-blue font-medium mt-1">Opening Maharaja Boutique</h4>
              <p className="font-sans font-light text-sm md:text-base text-royal-blue/70 mt-2 max-w-[600px]">
                We launched Maharaja Royal Bites in Reno, NV. It immediately became a focal point for fine-dining enthusiasts seeking elevated royal North-Indian flavours.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative gsap-story-fade-up">
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-gold border-4 border-cream"></div>
              <span className="font-serif text-2xl text-gold font-semibold">2026</span>
              <h4 className="font-serif text-xl text-royal-blue font-medium mt-1">Expanding the Chronicles</h4>
              <p className="font-sans font-light text-sm md:text-base text-royal-blue/70 mt-2 max-w-[600px]">
                Today, we continue to push boundaries by introducing ancient lost recipes and organic spice blends, elevating Reno's dining scene to royal standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
