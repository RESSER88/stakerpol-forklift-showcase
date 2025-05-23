
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProductStore } from '@/stores/productStore';
import CallToAction from '@/components/ui/CallToAction';
import ProductImage from '@/components/products/ProductImage';
import ProductInfo from '@/components/products/ProductInfo';
import ProductHeader from '@/components/products/ProductHeader';
import RelatedProducts from '@/components/products/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { products } = useProductStore();
  
  const product = products.find((p) => p.id === id);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <h1 className="text-3xl font-bold mb-4">Produkt nie został znaleziony</h1>
          <Link to="/products" className="text-stakerpol-orange hover:underline">
            Powrót do listy produktów
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-white py-12">
        <div className="container-custom">
          <ProductHeader />
          
          <div className="grid lg:grid-cols-2 gap-12">
            <ProductImage image={product.image} alt={product.model} />
            <ProductInfo product={product} language={language} />
          </div>
        </div>
      </section>
      
      <RelatedProducts currentProductId={product.id} products={products} />
      
      <CallToAction />
    </Layout>
  );
};

export default ProductDetail;
