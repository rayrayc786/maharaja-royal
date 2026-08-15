import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

export const ReservationModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(modalRef.current, { autoAlpha: 1, duration: 0.4 });
      gsap.fromTo(contentRef.current, 
        { y: 50, opacity: 0, scale: 0.98 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    } else {
      gsap.to(contentRef.current, { y: 20, opacity: 0, scale: 0.98, duration: 0.3 });
      gsap.to(modalRef.current, { autoAlpha: 0, duration: 0.4, delay: 0.1 });
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" ref={modalRef} style={{ visibility: 'hidden', opacity: 0 }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-royal-gradient opacity-95 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Content Container */}
      <div 
        className="relative bg-cream text-text-dark w-full max-w-[1000px] max-h-[90vh] overflow-y-auto rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col md:flex-row z-[1] scrollbar-hide" 
        ref={contentRef}
      >
        {/* Left Side - Image (Hidden on very small screens) */}
        <div className="md:w-5/12 relative hidden md:block min-h-[300px]">
          <img 
            src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Fine Dining" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-blue/90 via-royal-blue/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-10 flex flex-col">
             <span className="font-serif text-3xl tracking-[0.2em] text-cream">MAHARAJA</span>
             <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold mt-2 font-sans">Royal Bites</span>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full md:w-7/12 p-8 md:p-14 relative flex flex-col justify-center">
          <button className="absolute top-6 right-6 text-royal-blue/50 hover:text-royal-blue transition-transform duration-300 hover:rotate-90" onClick={onClose}>
            <X size={28} strokeWidth={1.5} />
          </button>
          
          <div className="mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-royal-blue/70 mb-3 block">Reservation</span>
            <h2 className="font-serif text-4xl text-royal-blue leading-tight mb-2">Your Table Awaits</h2>
            <p className="text-text-dark/70 font-sans font-light text-sm">Join us for an unforgettable culinary experience.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 relative">
                <label className="text-[0.65rem] uppercase tracking-[0.1em] text-royal-blue/70 absolute -top-4 left-0">Date</label>
                <input type="date" required className="w-full pb-2 pt-2 border-b border-royal-blue/20 bg-transparent font-sans text-sm text-royal-blue outline-none focus:border-gold transition-colors" />
              </div>
              <div className="flex-1 relative">
                <label className="text-[0.65rem] uppercase tracking-[0.1em] text-royal-blue/70 absolute -top-4 left-0">Time</label>
                <input type="time" required className="w-full pb-2 pt-2 border-b border-royal-blue/20 bg-transparent font-sans text-sm text-royal-blue outline-none focus:border-gold transition-colors" />
              </div>
            </div>
            
            <div className="relative pt-2">
              <label className="text-[0.65rem] uppercase tracking-[0.1em] text-royal-blue/70 absolute -top-2 left-0">Guests</label>
              <select required className="w-full pb-2 pt-2 border-b border-royal-blue/20 bg-transparent font-sans text-sm text-royal-blue outline-none focus:border-gold transition-colors cursor-pointer appearance-none">
                <option value="" disabled selected>Select number of guests</option>
                {[1,2,3,4,5,6,7,8, "9+"].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>)}
              </select>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-2">
              <div className="flex-1 relative">
                <input type="text" placeholder="Full Name" required className="w-full pb-2 pt-2 border-b border-royal-blue/20 bg-transparent font-sans text-sm text-royal-blue placeholder:text-royal-blue/40 outline-none focus:border-gold transition-colors" />
              </div>
              <div className="flex-1 relative">
                <input type="email" placeholder="Email Address" required className="w-full pb-2 pt-2 border-b border-royal-blue/20 bg-transparent font-sans text-sm text-royal-blue placeholder:text-royal-blue/40 outline-none focus:border-gold transition-colors" />
              </div>
            </div>
            
            <div className="pt-2">
              <textarea placeholder="Special Requests (Allergies, Occasion, etc.)" className="w-full pb-2 pt-2 border-b border-royal-blue/20 bg-transparent font-sans text-sm text-royal-blue placeholder:text-royal-blue/40 outline-none focus:border-gold transition-colors min-h-[60px] resize-y"></textarea>
            </div>
            
            <button type="submit" className="w-full py-4 bg-royal-gradient text-cream uppercase text-[0.75rem] font-medium tracking-[0.2em] mt-8 transition-all duration-500 hover:bg-gold hover:text-royal-blue shadow-lg hover:shadow-xl group relative overflow-hidden">
              <span className="relative z-10">Confirm Reservation</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
