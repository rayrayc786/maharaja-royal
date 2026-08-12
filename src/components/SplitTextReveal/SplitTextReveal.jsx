import { useEffect, useRef } from 'react';
import { createTextReveal } from '../../utils/animations';

export const SplitTextReveal = ({ text, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const words = containerRef.current.querySelectorAll('.word');
      const tl = createTextReveal(words, containerRef.current);
      
      return () => {
        tl.kill();
      };
    }
  }, [text]);

  // Very basic word splitting since we don't have SplitText
  const words = text.split(' ').map((word, i) => (
    <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingRight: '0.25em' }}>
      <span className="word" style={{ display: 'inline-block' }}>{word}</span>
    </span>
  ));

  return (
    <div ref={containerRef} className={className}>
      {words}
    </div>
  );
};
