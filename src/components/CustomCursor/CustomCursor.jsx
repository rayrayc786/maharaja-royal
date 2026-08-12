import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
        setHoverText('');
      } else if (target.closest('[data-cursor-text]')) {
        setIsHovering(true);
        setHoverText(target.closest('[data-cursor-text]').getAttribute('data-cursor-text'));
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference ${isHovering ? 'hover' : ''} ${hoverText ? 'has-text' : ''}`}
    >
      <div className="cursor-dot w-3 h-3 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center overflow-hidden">
        {hoverText && <span className="text-royal-blue text-[12px] font-semibold uppercase tracking-widest">{hoverText}</span>}
      </div>
    </div>
  );
};
