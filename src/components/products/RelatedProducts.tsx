
import { Product } from '@/types';
import ProductCard from '@/components/ui/ProductCard';

interface RelatedProductsProps {
  currentProductId: string;
  products: Product[];
}

const RelatedProducts = ({ currentProductId, products }: RelatedProductsProps) => {
  const relatedProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 3);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container-custom">
        <h2 className="text-2xl font-bold mb-6 animate-fade-in">Podobne produkty</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
