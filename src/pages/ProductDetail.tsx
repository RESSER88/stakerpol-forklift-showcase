
import { useParams, Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import CallToAction from '@/components/ui/CallToAction';
import ProductCard from '@/components/ui/ProductCard';
import { useEffect } from 'react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const t = useTranslation(language);
  
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
          <Link to="/products" className="text-toyota-red hover:underline">
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
          <Link to="/products" className="text-toyota-red hover:underline mb-6 inline-block">
            &larr; Powrót do listy produktów
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.model} 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.model}</h1>
              <p className="text-lg mb-6">{product.shortDescription}</p>
              
              <div className="mb-8">
                <Button className="cta-button text-lg" size="lg">
                  <Phone className="mr-2" />
                  {t('callNow')}
                </Button>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">{t('specifications')}</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                        {t('model')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.model}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('productionYear')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.productionYear}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('capacity')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.capacity}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('workingHours')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.workingHours}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('liftHeight')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.liftHeight}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('minHeight')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.minHeight}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('battery')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.battery}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('charger')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.charger}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('condition')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.condition}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('dimensions')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.dimensions}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('wheels')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.wheels}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {t('additionalOptions')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.specs.additionalOptions}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-6">Podobne produkty</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            }
          </div>
        </div>
      </section>
      
      <CallToAction />
    </Layout>
  );
};

export default ProductDetail;
