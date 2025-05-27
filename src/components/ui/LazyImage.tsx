
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  aspectRatio?: '4:3' | '1:1' | 'auto';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  generateThumbnail?: boolean;
}

const LazyImage = ({ 
  src, 
  alt, 
  aspectRatio = 'auto',
  className,
  onLoad,
  onError,
  generateThumbnail = false
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '4:3':
        return 'aspect-[4/3]';
      case '1:1':
        return 'aspect-square';
      default:
        return '';
    }
  };

  const getImageStyle = () => {
    if (generateThumbnail && aspectRatio === '1:1') {
      return 'object-contain bg-white';
    }
    return 'object-cover';
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-gray-100 rounded-lg',
        generateThumbnail && aspectRatio === '1:1' ? 'bg-white' : 'bg-gray-100',
        getAspectRatioClass(),
        className
      )}
    >
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-stakerpol-orange rounded-full animate-spin" />
        </div>
      )}
      
      {/* Error placeholder */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <span className="text-sm">Błąd ładowania zdjęcia</span>
        </div>
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            getImageStyle(),
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazyImage;
