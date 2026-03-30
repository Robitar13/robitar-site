import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });

      // Update trails with stagger
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          gsap.to(trail, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15 + index * 0.05,
            ease: 'power2.out',
            opacity: 0.3 - index * 0.05,
          });
        }
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .cyber-button');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{ left: 0, top: 0 }}
      />
      
      {/* Cursor trails */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="cursor-trail"
          style={{ 
            left: 0, 
            top: 0,
            width: `${6 - i}px`,
            height: `${6 - i}px`,
          }}
        />
      ))}
    </>
  );
}
