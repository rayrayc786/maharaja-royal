import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../utils/scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Header = ({ onReserve }) => {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };
  
  const logoRef = useRef(null);
  const navLeftRef = useRef(null);
  const navRightRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // For Home, header becomes fixed when it reaches the top of the viewport
      const threshold = isHome ? window.innerHeight : 0;
      if (window.scrollY >= threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // GSAP Scroll Animation for Logo (Only on Home)
    let ctx;
    if (isHome) {
      ctx = gsap.context(() => {
        // We want the logo to start in the center of the screen (50vh)
        // Since the header itself is at 100vh, its center is at 100vh + (headerHeight / 2)
        // So the offset to reach 50vh is -50vh - (headerHeight / 2)
        const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 80;
        const offset = -(window.innerHeight / 2) - (headerHeight / 2);
        
        // Initial setup for the logo container
        gsap.set(logoRef.current, {
          y: offset,
          scale: window.innerWidth < 768 ? 2.5 : 4,
          transformOrigin: 'center center'
        });
        
        // Ensure child text elements start as pure white/gold over the video for max contrast
        gsap.set('.logo-title', { color: '#FFFFFF' });
        gsap.set('.logo-subtitle', { color: '#D4AF37' });

        // As the user scrolls from 0 to 100vh, the header moves UP on the screen.
        // We animate the logo's offset from -50vh to 0.
        // This creates the perfect effect of the logo shrinking into the header.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
          }
        });

        tl.to(logoRef.current, {
          y: 0,
          scale: 1,
          ease: "none",
        }, 0)
        .to('.logo-title', {
          color: '#0A1930', // royal-blue
          ease: "none",
        }, 0)
        .to('.logo-subtitle', {
          color: '#0A1930', // royal-blue
          ease: "none",
        }, 0);
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (ctx) ctx.revert();
    };
  }, [isHome]);

  // Determine header classes based on page and scroll position
  let headerClasses = "w-full z-[100] transition-colors duration-300 py-4 px-6 md:py-5 md:px-12 lg:px-24 border-b border-royal-blue/10 ";
  
  if (isHome) {
    if (isScrolled) {
      // Scrolled past 100vh -> fixed at top
      headerClasses += "fixed top-0 left-0 bg-cream text-royal-blue";
    } else {
      // Before 100vh -> absolute at bottom of Hero
      headerClasses += "absolute top-[100vh] left-0 bg-cream text-royal-blue";
    }
  } else {
    // Other pages -> always fixed
    headerClasses += "fixed top-0 left-0 bg-cream text-royal-blue";
  }

  return (
    <header 
      ref={headerRef} 
      className={headerClasses}
    >
      <div className="flex justify-between items-center relative">
        {/* Mobile Hamburger (Left) */}
        <div ref={navLeftRef} className="md:hidden flex-1">
          <button 
            className="flex flex-col gap-1.5 z-50 relative" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-[2px] bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
            <span className={`block w-6 h-[2px] bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-[2px] bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
          </button>
        </div>

        {/* Desktop Nav Left */}
        <div ref={navLeftRef} className="hidden md:flex flex-1 gap-10 items-center justify-start">
          <button onClick={() => handleNavClick('menus')} className="text-[0.8rem] uppercase tracking-[0.15em] relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full transition-colors">Menus</button>
          <button onClick={() => handleNavClick('desserts')} className="text-[0.8rem] uppercase tracking-[0.15em] relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full transition-colors">Desserts</button>
        </div>

        {/* Logo Center */}
        <div className="flex-1 flex justify-center items-center z-50">
          <Link to="/" ref={logoRef} className="flex flex-col items-center group drop-shadow-lg">
             <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] logo-title drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">MAHARAJA</span>
             <span className="text-[0.55rem] uppercase tracking-[0.3em] mt-1 font-sans logo-subtitle drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Royal Bites</span>
          </Link>
        </div>

        {/* Desktop Nav Right */}
        <div ref={navRightRef} className="hidden md:flex flex-1 gap-10 items-center justify-end">
          <button onClick={() => handleNavClick('our-story')} className="text-[0.8rem] uppercase tracking-[0.15em] relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full hover:text-gold transition-colors">Our Story</button>
          <button 
            onClick={onReserve}
            className="px-8 py-3 bg-gold text-royal-blue uppercase text-[0.8rem] tracking-[0.15em] font-medium rounded-full transition-all duration-500 hover:bg-cream hover:text-royal-blue hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >Reserve a Table</button>
        </div>

        {/* Mobile Reserve (Right) */}
        <div ref={navRightRef} className="md:hidden flex-1 flex justify-end">
          <button 
            onClick={onReserve}
            className="px-5 py-2 bg-gold text-royal-blue uppercase text-[0.65rem] tracking-[0.15em] font-medium rounded-full"
          >Reserve</button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-royal-blue z-40 flex flex-col items-center justify-center gap-10 transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={() => handleNavClick('menus')} className="font-serif text-4xl text-cream hover:text-gold transition-colors">Menus</button>
        <button onClick={() => handleNavClick('desserts')} className="font-serif text-4xl text-cream hover:text-gold transition-colors">Desserts</button>
        <button onClick={() => handleNavClick('our-story')} className="font-serif text-4xl text-cream hover:text-gold transition-colors">Our Story</button>
      </div>
    </header>
  );
};
