
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import CallToAction from '@/components/ui/CallToAction';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import { useProductStore } from '@/stores/productStore';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Products = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { products } = useProductStore();

  return (
    <Layout>
      <section className="bg-gradient-to-b from-stakerpol-lightgray to-white py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-center animate-fade-in text-stakerpol-navy">{t('products')}</h1>
            <Link 
              to="/admin" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-stakerpol-orange transition-colors"
            >
              <Shield size={16} />
              Panel Admin
            </Link>
          </div>
          
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
