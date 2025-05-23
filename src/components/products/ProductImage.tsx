
import { useState } from 'react';

interface ProductImageProps {
  image: string;
  alt: string;
}

const ProductImage = ({ image, alt }: ProductImageProps) => {
  const [showZoom, setShowZoom] = useState(false);
  
  return (
    <div className="animate-fade-in">
      <div 
        className={`bg-gray-100 rounded-lg overflow-hidden relative ${showZoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={() => setShowZoom(!showZoom)}
      >
        {showZoom ? (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setShowZoom(false)}>
            <img 
              src={image} 
              alt={alt} 
              className="max-w-full max-h-full object-contain animate-zoom-in"
            />
            <button className="absolute top-4 right-4 text-white p-2 rounded-full bg-stakerpol-orange hover:bg-orange-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>
        ) : (
          <img 
            src={image} 
            alt={alt} 
            className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
          />
        )}
        <div className="absolute bottom-3 right-3 bg-stakerpol-orange text-white text-sm py-1 px-3 rounded-full shadow-md animate-pulse-light">
          Kliknij, aby powiększyć
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
