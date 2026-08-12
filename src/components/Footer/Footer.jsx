import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-cream pt-24 pb-8 px-6 md:px-12 lg:px-24 border-t border-royal-blue/10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-royal-blue mb-20">
          
          {/* Column 1: Logo & Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex flex-col group inline-block w-fit">
              <span className="font-serif text-3xl tracking-[0.2em] text-royal-blue group-hover:text-gold transition-colors duration-500">MAHARAJA</span>
              <span className="text-[0.55rem] uppercase tracking-[0.3em] text-gold mt-1 font-sans">Royal Bites</span>
            </Link>
            <p className="font-sans font-light text-sm leading-relaxed text-royal-blue/80 mt-4 max-w-[280px]">
              Whether it's an intimate dinner, a celebration, or a spontaneous craving for great food, let us ensure your visit is nothing short of extraordinary.
            </p>
            {/* Socials (Optional placeholder) */}
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-royal-blue/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"><span className="text-xs">IG</span></a>
              <a href="#" className="w-8 h-8 rounded-full border border-royal-blue/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"><span className="text-xs">FB</span></a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-6 lg:pl-12">
            <h4 className="font-serif text-lg text-royal-blue font-medium mb-2">Navigation</h4>
            <div className="flex flex-col gap-4 font-sans font-light text-sm">
              <Link to="/" className="hover:text-gold transition-colors w-fit">Home</Link>
              <Link to="/menus" className="hover:text-gold transition-colors w-fit">Menu</Link>
              <Link to="/desserts" className="hover:text-gold transition-colors w-fit">Desserts</Link>
              <Link to="/privacy" className="hover:text-gold transition-colors w-fit">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gold transition-colors w-fit">Terms & Condition</Link>
            </div>
          </div>

          {/* Column 3: Location & Hours */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-lg text-royal-blue font-medium mb-2">Location</h4>
            <p className="font-sans font-light text-sm text-royal-blue/80 leading-relaxed max-w-[250px]">
              1601 S Virginia St,<br/>
              Reno, NV 89502
            </p>
            
            <h4 className="font-serif text-lg text-royal-blue font-medium mt-4 mb-2">Hours</h4>
            <p className="font-sans font-light text-sm text-royal-blue/80">
              12pm - 12am Daily
            </p>
          </div>

          {/* Column 4: Reservation */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-lg text-royal-blue font-medium mb-2">Reservation</h4>
            <div className="flex flex-col gap-4 font-sans font-light text-sm">
              <Link to="/contact" className="hover:text-gold transition-colors w-fit">Contact Us</Link>
              <button className="text-left hover:text-gold transition-colors w-fit">Online Booking</button>
              <a href="tel:7756223146" className="hover:text-gold transition-colors w-fit mt-2 font-medium">(775) 622-3146</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-royal-blue/10 text-xs font-sans font-light text-royal-blue/60">
          <p>© {new Date().getFullYear()} Maharaja Royal Bites. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Designed for Royalty</p>
        </div>
      </div>
    </footer>
  );
};
