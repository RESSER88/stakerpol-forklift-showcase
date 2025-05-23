
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import CallToAction from '@/components/ui/CallToAction';
import { products } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

const Products = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <Layout>
      <section className="bg-gradient-to-b from-gray-100 to-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-6 text-center animate-fade-in">{t('products')}</h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in">
            Oferujemy szeroki wybór wózków widłowych BT Toyota, idealnie dopasowanych do różnych zastosowań i potrzeb.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <CallToAction />
    </Layout>
  );
};

export default Products;
