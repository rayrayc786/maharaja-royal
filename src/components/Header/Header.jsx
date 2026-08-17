import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../utils/scroll';

import logoImg from '../../assets/Maharaja-logo.png';

export const Header = ({ onReserve }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);

    if (!isHome) {
      navigate('/');

      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  /*
   * ==========================================================
   * HEADER POSITION
   *
   * On homepage:
   *   - NOT scrolled: header sits BELOW the hero at top-[100vh]
   *     It rises naturally as the user scrolls.
   *   - SCROLLED past hero: header snaps to fixed top-0.
   *
   * On other pages: always fixed top-0.
   * ==========================================================
   */

  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) {
        setIsScrolled(true);
        return;
      }
      setIsScrolled(window.scrollY >= window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  let headerClasses = `
    w-full
    z-[200]
    py-4
    px-6
    md:py-5
    md:px-12
    lg:px-24
    border-b
    border-transparent
    bg-royal-gradient
    text-cream
  `;

  if (isHome) {
    if (isScrolled) {
      headerClasses += ` fixed top-0 left-0`;
    } else {
      headerClasses += ` absolute top-[100vh] left-0`;
    }
  } else {
    headerClasses += ` fixed top-0 left-0`;
  }

  return (
    <header
      data-header
      className={headerClasses}
    >
      <div className="flex justify-between items-center relative">

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        <div className="md:hidden flex-1">

          <button
            className="flex flex-col gap-1.5 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span
              className={`
                block w-6 h-[2px] bg-cream transition-all duration-300
                ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}
              `}
            />
            <span
              className={`
                block w-6 h-[2px] bg-cream transition-all duration-300
                ${menuOpen ? 'opacity-0' : ''}
              `}
            />
            <span
              className={`
                block w-6 h-[2px] bg-cream transition-all duration-300
                ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}
              `}
            />
          </button>

        </div>

        {/* =====================================================
            LEFT NAV
        ===================================================== */}

        <div className="hidden md:flex flex-1 gap-10 items-center justify-start">

          <button
            onClick={() => handleNavClick('menus')}
            className="
              text-[0.8rem] uppercase tracking-[0.15em] relative
              after:content-[''] after:absolute after:bottom-[-6px] after:left-0
              after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300
              hover:after:w-full hover:text-gold transition-colors
            "
          >
            Menus
          </button>

          <Link
            to="/our-story"
            className="
              text-[0.8rem] uppercase tracking-[0.15em] relative
              after:content-[''] after:absolute after:bottom-[-6px] after:left-0
              after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300
              hover:after:w-full hover:text-gold transition-colors
            "
          >
            Our Story
          </Link>
        </div>

        {/* =====================================================
            CENTER LOGO

        IMPORTANT:
        GSAP controls opacity via inline style on the home page.
        The Tailwind class sets an initial CSS default only.
        GSAP's inline style wins over the class and persists
        through React re-renders (React does not own it).

        Do NOT add scroll-reactive opacity logic here.
        ===================================================== */}

        <div className="flex-1 flex justify-center items-center z-50">

          <Link
            to="/"
            data-header-logo
            className={`
              header-logo-container flex flex-col items-center group
              drop-shadow-lg pointer-events-auto
              ${isHome ? 'opacity-0' : 'opacity-100'}
            `}
          >
            <img
              src={logoImg}
              alt="Maharaja Royal Bites Logo"
              className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
            />
          </Link>

        </div>

        {/* =====================================================
            RIGHT NAV
        ===================================================== */}

        <div className="hidden md:flex flex-1 gap-10 items-center justify-end">

          <Link
            to="/blog"
            className="
              text-[0.8rem] uppercase tracking-[0.15em] relative
              after:content-[''] after:absolute after:bottom-[-6px] after:left-0
              after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300
              hover:after:w-full hover:text-gold transition-colors
            "
          >
            Journal
          </Link>

          <Link
            to="/gallery"
            className="
              text-[0.8rem] uppercase tracking-[0.15em] relative
              after:content-[''] after:absolute after:bottom-[-6px] after:left-0
              after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300
              hover:after:w-full hover:text-gold transition-colors
            "
          >
            Gallery
          </Link>

          <button
            onClick={onReserve}
            className="
              px-8 py-3 uppercase text-[0.8rem] tracking-[0.15em] font-medium
              rounded-full transition-all duration-500
              hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
              bg-cream text-royal-blue hover:bg-gold hover:text-royal-blue
            "
          >
            Order Online
          </button>

        </div>

        {/* =====================================================
            MOBILE RESERVE
        ===================================================== */}

        <div className="md:hidden flex-1 flex justify-end">

          <button
            onClick={onReserve}
            className="
              px-5 py-2 uppercase text-[0.65rem] tracking-[0.15em]
              font-medium rounded-full bg-cream text-royal-blue
            "
          >
            Reserve
          </button>

        </div>

      </div>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      <div
        className={`
          md:hidden fixed inset-0 bg-royal-gradient z-40
          flex flex-col items-center justify-center gap-10
          transition-all duration-500
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >

        <button
          onClick={() => handleNavClick('menus')}
          className="font-serif text-4xl text-cream hover:text-gold transition-colors"
        >
          Menus
        </button>

        <Link
          to="/our-story"
          onClick={() => setMenuOpen(false)}
          className="font-serif text-4xl text-cream hover:text-gold transition-colors"
        >
          Our Story
        </Link>

        <Link
          to="/blog"
          onClick={() => setMenuOpen(false)}
          className="font-serif text-4xl text-cream hover:text-gold transition-colors"
        >
          Journal
        </Link>

        <Link
          to="/gallery"
          onClick={() => setMenuOpen(false)}
          className="font-serif text-4xl text-cream hover:text-gold transition-colors"
        >
          Gallery
        </Link>

      </div>

    </header>
  );
};
