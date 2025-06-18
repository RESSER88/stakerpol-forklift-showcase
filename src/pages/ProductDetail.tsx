
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import CallToAction from '@/components/ui/CallToAction';
import ProductCard from '@/components/ui/ProductCard';
import ProductImage from '@/components/products/ProductImage';
import ProductInfo from '@/components/products/ProductInfo';
import ProductHeader from '@/components/products/ProductHeader';
import RelatedProducts from '@/components/products/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { products } = useSupabaseProducts();
  
  const product = products.find((p) => p.id === id);
  
  useEffect(() => {
    // Scroll to top when component mounts or when ID changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-stakerpol-navy">{t('productNotFound')}</h1>
          <Link to="/products" className="text-stakerpol-orange hover:underline text-lg">
            {t('backToProducts')}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section id="product-details" className="bg-white py-12">
        <div className="container-custom">
          <ProductHeader />
          
          <div className="grid lg:grid-cols-2 gap-12">
            <ProductImage 
              image={product.image} 
              alt={product.model} 
              images={product.images} 
            />
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-stakerpol-navy leading-tight">
                  {product.model}
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>
              <ProductInfo product={product} language={language} />
            </div>
          </div>
        </div>
      </section>
      
      <RelatedProducts currentProductId={product.id} products={products} />
      
      <CallToAction />
    </Layout>
  );
};

export default ProductDetail;
