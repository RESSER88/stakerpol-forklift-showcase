
import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { Language } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import SpecificationsTable from './SpecificationsTable';
import PriceInquiryModal from './PriceInquiryModal';

interface ProductInfoProps {
  product: Product;
  language: Language;
}

const ProductInfo = ({ product, language }: ProductInfoProps) => {
  const t = useTranslation(language);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  return (
    <div className="animate-slide-in">
      <h1 className="text-3xl font-bold mb-4">{product.model}</h1>
      <p className="text-lg mb-6">{product.shortDescription}</p>
      
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <Button className="cta-button text-lg" size="lg" asChild>
          <a href="tel:+48123456789">
            <Phone className="mr-2" />
            {t('callNow')}
          </a>
        </Button>
        <Button 
          className="secondary-button text-lg" 
          size="lg" 
          variant="outline"
          onClick={() => setIsPriceModalOpen(true)}
        >
          <Mail className="mr-2" />
          {t('askForPrice')}
        </Button>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">{t('specifications')}</h2>
      <SpecificationsTable product={product} language={language} />
      
      <PriceInquiryModal 
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductInfo;
