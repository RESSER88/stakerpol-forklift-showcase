
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import CallToAction from '@/components/ui/CallToAction';
import ProductCard from '@/components/ui/ProductCard';
import WhyChooseUs from '@/components/ui/WhyChooseUs';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import { getRandomItems } from '@/utils/randomUtils';
import { useMemo } from 'react';

const Index = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { products } = useSupabaseProducts();

  // Get 3 random products on each page load for better 3-column layout
  const featuredProducts = useMemo(() => {
    return getRandomItems(products, 3);
  }, [products]);

  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-toyota-black text-white min-h-[600px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 100%), url('/lovable-uploads/cba7623d-e272-43d2-9cb1-c4864cb74fde.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container-custom py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:pr-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-lg text-gray-300 md:text-xl">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  className="cta-button text-lg"
                  size="lg"
                  asChild
                >
                  <Link to="/products">
                    {t('browseProducts')}
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-black bg-white hover:bg-gray-100 hover:text-black text-lg transition-all duration-300"
                  size="lg"
                  asChild
                >
                  <Link to="/contact">
                    {t('contact')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center">{t('aboutUsTitle')}</h2>
          <p className="section-subtitle text-center max-w-3xl mx-auto">
            {t('aboutUsDesc')}
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Featured Products Section - 3 column grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center">{t('featuredProducts')}</h2>
          <p className="text-center text-gray-600 mb-8">
            {t('featuredProductsSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="secondary-button"
              asChild
            >
              <Link to="/products">
                {t('viewAllProducts')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CallToAction />
    </Layout>
  );
};

export default Index;
