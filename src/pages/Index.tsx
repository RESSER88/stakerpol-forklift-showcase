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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-toyota-black text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Wózki widłowe <span className="text-toyota-red">BT Toyota</span> od Stakerpol
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
                  className="border-white text-white hover:bg-white hover:text-toyota-black text-lg"
                  size="lg"
                  asChild
                >
                  <Link to="/contact">
                    {t('contact')}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://stakerpol.pl/wp-content/uploads/2020/05/bt-75-1-768x550.png" 
                alt="BT Toyota wózek widłowy" 
                className="w-full h-auto animate-fade-in" 
              />
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
          
          <h3 className="text-2xl font-bold mt-12 mb-8 text-center">{t('advantages')}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-toyota-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">{t('advantagesDelivery')}</h4>
              <p className="text-gray-600">
                Dostarczamy wózki widłowe BT Toyota w najkrótszym możliwym terminie, 
                dostosowując się do Twoich potrzeb.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-toyota-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">{t('advantagesConsultation')}</h4>
              <p className="text-gray-600">
                Nasi eksperci pomogą Ci wybrać idealny wózek widłowy, dopasowany do 
                specyfiki Twojej działalności.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-toyota-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">{t('advantagesAvailability')}</h4>
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
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
