import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../utils/scroll';
import { Hero } from '../../components/Hero/Hero';
import { SplitTextReveal } from '../../components/SplitTextReveal/SplitTextReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Home = ({ onReserve }) => {
  const mainRef = useRef(null);
  const carouselRef = useRef(null);
  
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 1024 ? 424 : 324; // approx item width + gap
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade Up Elements
      const fadeUpElements = gsap.utils.toArray('.gsap-fade-up');
      fadeUpElements.forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Image Parallax
      const parallaxImages = gsap.utils.toArray('.gsap-parallax');
      parallaxImages.forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-cream selection:bg-gold selection:text-royal-blue">
      <Hero />
      
      {/* ===== INTRO SECTION ===== */}
      {/* Novikov style: light background, centered elegant text, generous padding */}
      <section id="our-story" className="bg-cream py-32 px-6 md:py-48 md:px-12 lg:py-[200px] lg:px-24 flex justify-center text-center relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gold-texture opacity-100 pointer-events-none"></div>
        
        <div className="max-w-[900px] relative z-10 flex flex-col items-center">
          <SplitTextReveal className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] text-royal-blue mb-8" text="Welcome to Maharaja Royal" />
          <h3 className="font-sans text-[clamp(1rem,2vw,1.5rem)] font-light text-royal-blue/80 mb-12 max-w-[700px] gsap-fade-up">
            The Modern Royal Indian Cuisine in the Heart of Reno
          </h3>
          <button onClick={() => scrollToSection('our-story')} className="gsap-fade-up inline-block px-10 py-4 bg-gold text-royal-blue uppercase text-[0.8rem] tracking-[0.15em] font-medium rounded-full transition-all duration-500 hover:bg-royal-blue hover:text-cream shadow-lg hover:shadow-xl">
            Our Story
          </button>
        </div>
      </section>

      {/* ===== BANNER SECTION ===== */}
      <section className="relative bg-royal-blue py-32 px-6 md:py-48 md:px-12 lg:py-[180px] lg:px-24 text-cream flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="max-w-[800px] relative z-10 flex flex-col items-center">
           <SplitTextReveal className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] mb-8" text="Experience the Grandeur" />
           <p className="font-sans font-light text-lg md:text-xl text-cream/80 mb-12 gsap-fade-up">
              Whether it's an intimate dinner, a celebration, or a spontaneous craving for great food, let us ensure your visit is nothing short of extraordinary.
           </p>
           <button onClick={onReserve} className="gsap-fade-up inline-block px-10 py-4 bg-cream text-royal-blue uppercase text-[0.8rem] tracking-[0.15em] font-medium rounded-full transition-all duration-500 hover:bg-gold hover:text-royal-blue shadow-lg">
            Reserve a Table
          </button>
        </div>
        
        {/* Subtle decorative dishes - styled like Novikov's floating elements */}
        <div className="absolute -top-[10%] -left-[5%] w-[300px] h-[300px] rounded-full overflow-hidden border-[6px] border-cream/10 opacity-60 gsap-parallax hidden lg:block">
           <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover scale-110" alt="Decor 1"/>
        </div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[350px] h-[350px] rounded-full overflow-hidden border-[6px] border-cream/10 opacity-60 gsap-parallax hidden lg:block">
           <img src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover scale-110" alt="Decor 2"/>
        </div>
      </section>

      {/* ===== EDITORIAL MENU SECTIONS ===== */}
      <section id="menus" className="bg-cream pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-32 lg:gap-48 px-6 md:px-12 lg:px-24">
          
          {/* Menu 1: Breakfast */}
          <div id="breakfast" className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 w-full order-2 lg:order-1 pr-0 lg:pr-12">
              <SplitTextReveal className="font-serif text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] text-royal-blue mb-8" text="Our Breakfast Treats" />
              <p className="font-sans font-light text-lg md:text-xl text-text-dark/80 mb-10 leading-relaxed gsap-fade-up">
                The breakfast menu offers a dish for every appetite and mood, from flaky, oven-fresh viennoiseries to elegant fruit bowls and decadent, caviar-laden eggs.
              </p>
              <div className="gsap-fade-up">
                <button onClick={() => scrollToSection('breakfast')} className="inline-block px-8 py-4 bg-[#b58b45] text-cream uppercase text-[0.8rem] tracking-[0.15em] font-medium rounded-full transition-all duration-300 hover:bg-royal-blue">
                  Breakfast Menu
                </button>
              </div>
            </div>
            <div className="flex-1 w-full order-1 lg:order-2">
              <div className="aspect-[4/3] lg:aspect-square overflow-hidden rounded-sm">
                <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Breakfast" className="w-full h-full object-cover scale-110 gsap-parallax" />
              </div>
            </div>
          </div>

          {/* Menu 2: Lunch & Dinner */}
          <div id="lunch-dinner" className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
             <div className="flex-1 w-full order-1 lg:order-1">
              <div className="aspect-[4/3] lg:aspect-square overflow-hidden rounded-sm">
                <img src="https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Lunch & Dinner" className="w-full h-full object-cover scale-110 gsap-parallax" />
              </div>
            </div>
            <div className="flex-1 w-full order-2 lg:order-2 pl-0 lg:pl-12">
              <SplitTextReveal className="font-serif text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] text-royal-blue mb-8" text="Lunch & Dinner" />
              <p className="font-sans font-light text-lg md:text-xl text-text-dark/80 mb-10 leading-relaxed gsap-fade-up">
                During lunch and dinner service, patrons embark on an extraordinary culinary voyage while dining à la carte. The menu showcases hearty-meets-elegant dishes executed with the restaurant's signature flair.
              </p>
              <div className="gsap-fade-up">
                <button onClick={() => scrollToSection('lunch-dinner')} className="inline-block px-8 py-4 bg-[#b58b45] text-cream uppercase text-[0.8rem] tracking-[0.15em] font-medium rounded-full transition-all duration-300 hover:bg-royal-blue">
                  Lunch & Dinner Menu
                </button>
              </div>
            </div>
          </div>

          {/* Menu 3: Desserts */}
          <div id="desserts" className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 w-full order-2 lg:order-1 pr-0 lg:pr-12">
              <SplitTextReveal className="font-serif text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] text-royal-blue mb-8" text="Beverages & Desserts" />
              <p className="font-sans font-light text-lg md:text-xl text-text-dark/80 mb-10 leading-relaxed gsap-fade-up">
                Maharaja boasts an array of beverages & desserts, spanning from expertly crafted specialty coffees, teas, Patisserie to thoughtfully curated smoothies, gateaux and mocktails.
              </p>
              <div className="gsap-fade-up">
                <button onClick={() => scrollToSection('desserts')} className="inline-block px-8 py-4 bg-[#b58b45] text-cream uppercase text-[0.8rem] tracking-[0.15em] font-medium rounded-full transition-all duration-300 hover:bg-royal-blue">
                  Desserts Menu
                </button>
              </div>
            </div>
            <div className="flex-1 w-full order-1 lg:order-2">
              <div className="aspect-[4/3] lg:aspect-square overflow-hidden rounded-sm">
                <img src="https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Desserts" className="w-full h-full object-cover scale-110 gsap-parallax" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== ROYAL COLLECTION CAROUSEL ===== */}
      <section className="bg-cream py-20 lg:py-32 overflow-hidden border-t border-royal-blue/10">
        <div className="px-6 md:px-12 lg:px-24 mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div className="max-w-2xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-royal-blue/70 mb-4 block">SIGNATURE BOUTIQUE</span>
            <SplitTextReveal className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] text-royal-blue mb-4" text="Maharaja's Royal Collection" />
            <p className="font-sans font-light text-lg text-royal-blue/80 gsap-fade-up">
              Our boutique showcases an exquisite selection of handcrafted delicacies and a symphony of flavors.
            </p>
          </div>
          <div className="flex gap-4 gsap-fade-up">
            <button onClick={() => scrollCarousel('left')} className="w-12 h-12 rounded-full border border-royal-blue/20 flex items-center justify-center text-royal-blue hover:bg-[#b58b45] hover:border-[#b58b45] hover:text-white transition-all">
              ←
            </button>
            <button onClick={() => scrollCarousel('right')} className="w-12 h-12 rounded-full border border-royal-blue/20 flex items-center justify-center text-royal-blue hover:bg-[#b58b45] hover:border-[#b58b45] hover:text-white transition-all">
              →
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="pl-6 md:pl-12 lg:pl-24 flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          {[
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=600&auto=format&fit=crop"
          ].map((src, index) => (
            <div key={index} className="min-w-[300px] lg:min-w-[400px] aspect-square bg-white flex-shrink-0 snap-start relative group cursor-pointer overflow-hidden rounded-sm shadow-sm">
              <div className="absolute inset-4 overflow-hidden">
                <img 
                  src={src} 
                  alt="Signature Dish" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-6">
                <button onClick={() => scrollToSection('menus')} className="w-full max-w-[200px] py-3 bg-white text-royal-blue font-sans text-[0.8rem] uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:bg-gray-100 flex items-center justify-center">
                  Learn More
                </button>
                <button onClick={onReserve} className="w-full max-w-[200px] py-3 bg-[#b58b45] text-white font-sans text-[0.8rem] uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:bg-[#d4af37]">
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ===== FINAL CTA SHOWCASE ===== */}
      <section className="relative py-32 lg:py-48 flex items-center justify-center px-6 overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80" 
            alt="Royal Heritage" 
            className="w-full h-[130%] object-cover -top-[15%] relative gsap-parallax"
          />
          {/* Dark Overlay to ensure the card pops */}
          <div className="absolute inset-0 bg-royal-blue/50"></div>
        </div>
        
        {/* Content Card */}
        <div className="relative z-10 bg-cream p-10 md:p-20 lg:p-24 max-w-3xl text-center flex flex-col items-center shadow-[0_20px_50px_rgba(10,25,48,0.5)] border border-gold/10">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-royal-blue/70 mb-4 block">EXPERIENCE ROYALTY</span>
          <SplitTextReveal className="font-serif text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-royal-blue mb-6" text="Fit for a King" />
          <p className="font-sans font-light text-lg text-text-dark/80 mb-10 leading-relaxed gsap-fade-up">
            Experience the culinary heritage of the Indian royal courts.
            Every spice carefully selected, every dish crafted with absolute devotion.
          </p>
          <button onClick={onReserve} className="gsap-fade-up inline-block px-10 py-4 bg-gold text-royal-blue uppercase text-[0.8rem] tracking-[0.15em] font-medium rounded-full transition-all duration-500 hover:bg-royal-blue hover:text-cream shadow-lg hover:shadow-xl">
            Book Your Royal Table
          </button>
        </div>
      </section>

    </div>
  );
};
