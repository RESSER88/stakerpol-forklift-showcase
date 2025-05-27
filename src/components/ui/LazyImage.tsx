
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
  const [imgSrc, setImgSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);
    setImgSrc('');
    
    // Add a small delay to ensure proper initialization
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '50px' // Start loading 50px before the image comes into view
        }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [src]);

  useEffect(() => {
    if (isInView && src && !imgSrc && !hasError) {
      // Preload the image
      const img = new Image();
      
      img.onload = () => {
        setImgSrc(src);
        console.log(`Image loaded successfully: ${src}`);
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        setHasError(true);
        onError?.();
      };
      
      // Start loading
      img.src = src;
    }
  }, [isInView, src, imgSrc, hasError, onError]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
    console.log(`Image displayed: ${src}`);
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
    console.error(`Image display error: ${src}`);
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4">
          <div className="text-4xl mb-2">📷</div>
          <span className="text-sm text-center">Błąd ładowania zdjęcia</span>
          <span className="text-xs text-center mt-1 opacity-75">{src}</span>
        </div>
      )}
      
      {/* Actual image */}
      {imgSrc && !hasError && (
        <img
          ref={imgRef}
          src={imgSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full transition-opacity duration-500',
            getImageStyle(),
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default LazyImage;
