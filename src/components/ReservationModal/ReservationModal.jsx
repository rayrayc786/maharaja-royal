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
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
      );
    } else {
      gsap.to(contentRef.current, { y: -50, opacity: 0, duration: 0.3 });
      gsap.to(modalRef.current, { autoAlpha: 0, duration: 0.4, delay: 0.2 });
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center" ref={modalRef} style={{ visibility: 'hidden', opacity: 0 }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-royal-blue/90 backdrop-blur-lg" onClick={onClose}></div>
      
      {/* Content */}
      <div className="relative bg-cream text-text-dark p-6 md:p-12 lg:p-16 w-[95%] max-w-[600px] rounded-lg z-[1]" ref={contentRef}>
        <button className="absolute top-4 right-4 text-text-dark transition-transform duration-300 hover:rotate-90" onClick={onClose}>
          <X size={32} />
        </button>
        
        <div className="text-center mb-6 md:mb-8">
          <h2 className="heading-large text-royal-blue">Your Table Awaits.</h2>
          <p className="text-gold font-serif italic mt-2">Experience the royal taste of India.</p>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="date" placeholder="Date" required className="flex-1 p-4 border border-black/10 bg-transparent font-sans text-base text-text-dark outline-none focus:border-gold" />
            <input type="time" placeholder="Time" required className="flex-1 p-4 border border-black/10 bg-transparent font-sans text-base text-text-dark outline-none focus:border-gold" />
          </div>
          <div className="flex gap-4">
            <select required className="flex-1 p-4 border border-black/10 bg-transparent font-sans text-base text-text-dark outline-none focus:border-gold">
              <option value="" disabled selected>Guests</option>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} People</option>)}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="text" placeholder="Name" required className="flex-1 p-4 border border-black/10 bg-transparent font-sans text-base text-text-dark outline-none focus:border-gold" />
            <input type="email" placeholder="Email" required className="flex-1 p-4 border border-black/10 bg-transparent font-sans text-base text-text-dark outline-none focus:border-gold" />
          </div>
          <div>
            <textarea placeholder="Special Requests (Optional)" className="w-full p-4 border border-black/10 bg-transparent font-sans text-base text-text-dark outline-none focus:border-gold min-h-[100px] resize-y"></textarea>
          </div>
          <button type="submit" className="w-full p-5 bg-gold text-royal-blue uppercase text-base font-semibold tracking-widest mt-4 transition-colors hover:bg-[#e5be49]">
            Reserve a Table
          </button>
        </form>
      </div>
    </div>
  );
};
