
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import { Product } from '@/types';
import PriceInquiryModal from './PriceInquiryModal';

interface ProductHeaderProps {
  product: Product;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-stakerpol-navy mb-2">
              {product.model}
            </h1>
            <p className="text-lg text-gray-600">
              {product.shortDescription}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {product.specs.condition && (
              <Badge variant="secondary">
                Stan: {product.specs.condition}
              </Badge>
            )}
            {product.specs.productionYear && (
              <Badge variant="outline">
                Rok: {product.specs.productionYear}
              </Badge>
            )}
            {product.specs.workingHours && (
              <Badge variant="outline">
                {product.specs.workingHours}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Floating Contact Button - Fixed positioning, non-intrusive */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowInquiryModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full h-14 w-14 p-0"
          title="Zapytanie o cenę"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      <PriceInquiryModal 
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        productModel={product.model}
      />
    </>
  );
};

export default ProductHeader;
