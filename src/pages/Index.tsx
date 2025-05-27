
import { Link } from 'react-router-dom';
import { Truck, Headphones, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import CallToAction from '@/components/ui/CallToAction';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

const Index = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Only show 3 featured products on the homepage
  const featuredProducts = products.slice(0, 3);

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
                Wózki widłowe <span className="text-toyota-orange">BT Toyota</span> od Stakerpol
              </h1>
              <p className="text-lg text-gray-300 md:text-xl">
                Profesjonalna sprzedaż i serwis wózków widłowych BT Toyota. 
                Zapewniamy najwyższą jakość, szybką dostawę i fachowe doradztwo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  className="cta-button text-lg"
                  size="lg"
                  asChild
                >
                  <Link to="/products">
                    Przeglądaj wózki
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
            {/* Remove the right side image since we're using background */}
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
          
          <h3 className="text-2xl font-bold mt-12 mb-8 text-center">{t('advantages')}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in border border-gray-100">
              <div className="w-16 h-16 bg-stakerpol-orange rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-stakerpol-navy">{t('advantagesDelivery')}</h4>
              <p className="text-gray-600">
                Dostarczamy wózki widłowe BT Toyota w najkrótszym możliwym terminie, 
                dostosowując się do Twoich potrzeb.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in delay-100 border border-gray-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-stakerpol-navy">{t('advantagesConsultation')}</h4>
              <p className="text-gray-600">
                Nasi eksperci pomogą Ci wybrać idealny wózek widłowy, dopasowany do 
                specyfiki Twojej działalności.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in delay-200 border border-gray-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-stakerpol-navy">{t('advantagesAvailability')}</h4>
              <p className="text-gray-600">
                Posiadamy szeroki wybór używanych wózków widłowych dostępnych od ręki, 
                gotowych do natychmiastowej pracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center">{t('featuredProducts')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 100}ms` }}>
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
                Zobacz wszystkie produkty
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
