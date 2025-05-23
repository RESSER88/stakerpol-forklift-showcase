
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { Language } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import SpecificationsTable from './SpecificationsTable';

interface ProductInfoProps {
  product: Product;
  language: Language;
}

const ProductInfo = ({ product, language }: ProductInfoProps) => {
  const t = useTranslation(language);

  return (
    <div className="animate-slide-in">
      <h1 className="text-3xl font-bold mb-4">{product.model}</h1>
      <p className="text-lg mb-6">{product.shortDescription}</p>
      
      <div className="mb-8">
        <Button className="cta-button text-lg" size="lg">
          <Phone className="mr-2" />
          {t('callNow')}
        </Button>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">{t('specifications')}</h2>
      <SpecificationsTable product={product} language={language} />
    </div>
  );
};

export default ProductInfo;
