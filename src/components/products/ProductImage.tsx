
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ProductImageProps {
  image: string;
  alt: string;
  images?: string[]; // Optional array for multiple images
}

const ProductImage = ({ image, alt, images = [image] }: ProductImageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  
  const currentImage = images[currentImageIndex];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const openZoom = () => setShowZoom(true);
  const closeZoom = () => setShowZoom(false);

  return (
    <div className="animate-fade-in">
      {/* Main Image Container */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden group">
        <div 
          className="aspect-square cursor-zoom-in relative"
          onClick={openZoom}
        >
          <img 
            src={currentImage} 
            alt={alt} 
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Navigation arrows for multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          
          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 bg-stakerpol-orange text-white text-sm py-1 px-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Kliknij, aby powiększyć
          </div>
        </div>
        
        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentImageIndex ? 'bg-stakerpol-orange' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Thumbnail Gallery for multiple images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`aspect-square rounded overflow-hidden border-2 transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'border-stakerpol-orange shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img 
                src={img} 
                alt={`${alt} - zdjęcie ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {showZoom && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" 
          onClick={closeZoom}
        >
          <div className="relative max-w-full max-h-full">
            <img 
              src={currentImage} 
              alt={alt} 
              className="max-w-full max-h-full object-contain animate-scale-in"
            />
            
            {/* Close button */}
            <button 
              onClick={closeZoom}
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-stakerpol-orange hover:bg-orange-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            {/* Navigation in zoom mode */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
                
                {/* Image counter in zoom */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
