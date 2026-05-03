import { useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  rootMargin?: string;
  callback?: (isVisible: boolean) => void;
}

export const useIntersectionObserver = (
  {
    threshold = 0.1,
    rootMargin = '0px',
    callback,
  }: UseIntersectionObserverProps = {}
) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          callback?.(true);
          
          if (ref.current) {
            ref.current.classList.add('fade-up');
            ref.current.style.animation = 'fadeUp 0.6s ease-out forwards';
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, callback]);

  return ref;
};
