
import { Link } from 'react-router-dom';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Calendar, Eye } from 'lucide-react';
import { Product } from '@/types';
import LazyImage from './LazyImage';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const mainImage = product.images?.[0] || product.image || '/placeholder.svg';
  const hasMultipleImages = product.images && product.images.length > 1;
  
  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex">
          <div className="w-48 h-32 relative flex-shrink-0">
            <LazyImage
              src={mainImage}
              alt={product.model}
              className="w-full h-full object-cover"
            />
            {hasMultipleImages && (
              <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                +{product.images!.length - 1}
              </Badge>
            )}
          </div>
          
          <CardContent className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-stakerpol-navy line-clamp-1">
                {product.model}
              </h3>
              <div className="flex items-center text-xs text-gray-500 ml-4">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(product.updatedAt).toLocaleDateString('pl-PL')}
              </div>
            </div>
            
            {product.shortDescription && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {product.shortDescription}
              </p>
            )}
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {product.specs?.condition && (
                  <Badge variant="outline" className="text-xs">
                    {product.specs.condition}
                  </Badge>
                )}
                {product.specs?.productionYear && (
                  <Badge variant="outline" className="text-xs">
                    {product.specs.productionYear}
                  </Badge>
                )}
              </div>
              
              <Link 
                to={`/products/${product.id}`}
                className="inline-flex items-center text-stakerpol-orange hover:text-stakerpol-navy text-sm font-medium"
              >
                <Eye className="h-4 w-4 mr-1" />
                Zobacz więcej
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <LazyImage
            src={mainImage}
            alt={product.model}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        {hasMultipleImages && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            +{product.images!.length - 1}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-stakerpol-navy line-clamp-2">
            {product.model}
          </h3>
        </div>
        
        {product.shortDescription && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {product.shortDescription}
          </p>
        )}
        
        <div className="space-y-2 mb-4">
          {product.specs?.condition && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stan:</span>
              <span className="font-medium">{product.specs.condition}</span>
            </div>
          )}
          {product.specs?.productionYear && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Rok:</span>
              <span className="font-medium">{product.specs.productionYear}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(product.updatedAt).toLocaleDateString('pl-PL')}
          </div>
          
          <Link 
            to={`/products/${product.id}`}
            className="inline-flex items-center text-stakerpol-orange hover:text-stakerpol-navy text-sm font-medium"
          >
            <Eye className="h-4 w-4 mr-1" />
            Zobacz
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
