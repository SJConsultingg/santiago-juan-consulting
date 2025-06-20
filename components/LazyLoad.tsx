import { useEffect, useRef, useState } from 'react';
import { PERFORMANCE_CONFIG } from '@/lib/performance-config';

interface LazyLoadProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

export default function LazyLoad({
  children,
  placeholder,
  className = '',
  rootMargin = PERFORMANCE_CONFIG.lazyLoading.rootMargin,
  threshold = PERFORMANCE_CONFIG.lazyLoading.threshold,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(container);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? children : placeholder || null}
    </div>
  );
} 