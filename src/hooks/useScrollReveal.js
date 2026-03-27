import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to trigger animations when an element enters the viewport.
 * @param {Object} options - IntersectionObserver options.
 * @returns {[MutableRefObject, boolean]} - Ref to attach to the element and visible state.
 */
export default function useScrollReveal(options = { threshold: 0.15 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, we can stop observing to save resources
        if (currentRef) observer.unobserve(currentRef);
      }
    }, options);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
}
