import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../utils/scroll';
import logoImg from '../../assets/Maharaja-logo.png';


export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <footer className="bg-royal-gradient pt-24 pb-8 px-6 md:px-12 lg:px-24 border-t border-cream/10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-cream mb-20">
          
          {/* Column 1: Logo & Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex flex-row items-baseline gap-2 group w-fit">
              <img src={logoImg} alt="Maharaja Royal Bites Logo" className="h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
            </Link>
            <p className="font-sans font-light text-sm leading-relaxed text-cream/80 mt-4 max-w-[280px]">
              Whether it's an intimate dinner, a celebration, or a spontaneous craving for great food, let us ensure your visit is nothing short of extraordinary.
            </p>
            {/* Socials (Optional placeholder) */}
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"><span className="text-xs">IG</span></a>
              <a href="#" className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"><span className="text-xs">FB</span></a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-6 lg:pl-12">
            <h4 className="font-serif text-lg text-gold font-medium mb-2">Navigation</h4>
            <div className="flex flex-col gap-4 font-sans font-light text-sm text-cream/80">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-gold transition-colors w-fit text-left">Home</button>
              <button onClick={() => handleNavClick('menus')} className="hover:text-gold transition-colors w-fit text-left">Menu</button>
              <button onClick={() => handleNavClick('desserts')} className="hover:text-gold transition-colors w-fit text-left">Desserts</button>
              <Link to="/our-story" className="hover:text-gold transition-colors w-fit text-left">Our Story</Link>
              <Link to="/blog" className="hover:text-gold transition-colors w-fit text-left">Journal</Link>
              <Link to="/gallery" className="hover:text-gold transition-colors w-fit text-left">Gallery</Link>
              <Link to="/privacy" className="hover:text-gold transition-colors w-fit text-left">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gold transition-colors w-fit text-left">Terms & Condition</Link>
            </div>
          </div>

          {/* Column 3: Location & Hours */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-lg text-gold font-medium mb-2">Location</h4>
            <p className="font-sans font-light text-sm text-cream/80 leading-relaxed max-w-[250px]">
              1601 S Virginia St,<br/>
              Reno, NV 89502
            </p>
            
            <h4 className="font-serif text-lg text-gold font-medium mt-4 mb-2">Hours</h4>
            <p className="font-sans font-light text-sm text-cream/80">
              12pm - 12am Daily
            </p>
          </div>

          {/* Column 4: Reservation */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-lg text-gold font-medium mb-2">Reservation</h4>
            <div className="flex flex-col gap-4 font-sans font-light text-sm text-cream/80">
              <Link to="/contact" className="hover:text-gold transition-colors w-fit">Contact Us</Link>
              <button className="text-left hover:text-gold transition-colors w-fit">Online Booking</button>
              <a href="tel:7756223146" className="hover:text-gold transition-colors w-fit mt-2 font-medium text-cream">(775) 622-3146</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-cream/10 text-xs font-sans font-light text-cream/60">
          <p>© {new Date().getFullYear()} Maharaja Royal Bites. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Designed for Royalty</p>
        </div>
      </div>
    </footer>
  );
};
