
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.model}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2">{product.model}</h3>
        <p className="text-muted-foreground mb-4">{product.shortDescription}</p>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button 
            className="cta-button flex-1"
            asChild
          >
            <Link to={`/contact`}>
              <Phone className="mr-2 h-4 w-4" />
              {t('callNow')}
            </Link>
          </Button>
          <Button 
            className="secondary-button flex-1"
            variant="outline"
            asChild
          >
            <Link to={`/products/${product.id}`}>
              {t('specifications')}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
