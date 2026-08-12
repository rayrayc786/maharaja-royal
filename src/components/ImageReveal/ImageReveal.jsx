import { useEffect, useRef } from 'react';
import { createImageReveal, createParallax } from '../../utils/animations';

export const ImageReveal = ({ src, alt, parallax = true }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = createImageReveal(containerRef.current, imageRef.current);
    
    if (parallax) {
      createParallax(containerRef.current, imageRef.current, 15);
    }

    return () => {
      tl.kill();
    };
  }, [parallax]);

  return (
    <div className="image-reveal-container w-full h-full overflow-hidden relative" ref={containerRef}>
      <img src={src} alt={alt} className="reveal-image" ref={imageRef} />
    </div>
  );
};
