import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Header = ({ onReserve }) => {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Header hide/show animation removed for sticky behavior

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      ref={headerRef} 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 text-cream
        ${isScrolled 
          ? 'bg-royal-blue/95 backdrop-blur-md py-4 px-6 md:py-5 md:px-12 lg:px-24 border-b border-gold/10' 
          : 'py-6 px-6 md:py-8 md:px-12 lg:px-24 bg-gradient-to-b from-royal-blue/60 to-transparent'
        }`}
    >
      <div className="flex justify-between items-center relative">
        {/* Mobile Hamburger (Left) */}
        <div className="md:hidden flex-1">
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
        <div className="hidden md:flex flex-1 gap-10 items-center justify-start">
          <Link to="/menus" className="text-[0.8rem] uppercase tracking-[0.15em] relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full hover:text-gold transition-colors">Menus</Link>
          <Link to="/desserts" className="text-[0.8rem] uppercase tracking-[0.15em] relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full hover:text-gold transition-colors">Desserts</Link>
        </div>

        {/* Logo Center */}
        <div className="flex-1 flex justify-center items-center z-50">
          <Link to="/" className="flex flex-col items-center group">
             {/* Replace with actual logo SVG if available, using text for now to match Novikov style closely */}
             <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-cream group-hover:text-gold transition-colors duration-500">MAHARAJA</span>
             <span className="text-[0.55rem] uppercase tracking-[0.3em] text-gold mt-1 font-sans">Royal Bites</span>
          </Link>
        </div>

        {/* Desktop Nav Right */}
        <div className="hidden md:flex flex-1 gap-10 items-center justify-end">
          <Link to="/our-story" className="text-[0.8rem] uppercase tracking-[0.15em] relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full hover:text-gold transition-colors">Our Story</Link>
          <button 
            onClick={onReserve}
            className="px-8 py-3 bg-gold text-royal-blue uppercase text-[0.8rem] tracking-[0.15em] font-medium rounded-full transition-all duration-500 hover:bg-cream hover:text-royal-blue hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >Reserve a Table</button>
        </div>

        {/* Mobile Reserve (Right) */}
        <div className="md:hidden flex-1 flex justify-end">
          <button 
            onClick={onReserve}
            className="px-5 py-2 bg-gold text-royal-blue uppercase text-[0.65rem] tracking-[0.15em] font-medium rounded-full"
          >Reserve</button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-royal-blue z-40 flex flex-col items-center justify-center gap-10 transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <Link to="/menus" onClick={() => setMenuOpen(false)} className="font-serif text-4xl text-cream hover:text-gold transition-colors">Menus</Link>
        <Link to="/desserts" onClick={() => setMenuOpen(false)} className="font-serif text-4xl text-cream hover:text-gold transition-colors">Desserts</Link>
        <Link to="/our-story" onClick={() => setMenuOpen(false)} className="font-serif text-4xl text-cream hover:text-gold transition-colors">Our Story</Link>
      </div>
    </header>
  );
};
