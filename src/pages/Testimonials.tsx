
import Layout from '@/components/layout/Layout';
import TestimonialCard from '@/components/ui/TestimonialCard';
import CallToAction from '@/components/ui/CallToAction';
import { testimonials } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

const Testimonials = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <Layout>
      <section className="bg-gray-100 py-12 md:py-20">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-6 text-center">{t('customerOpinions')}</h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Poznaj opinie naszych klientów, którzy zaufali firmie Stakerpol i wybrali wózki widłowe BT Toyota.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="mt-16 bg-white p-8 rounded-lg shadow-sm text-center">
            <h3 className="text-2xl font-bold mb-4">Masz doświadczenie z naszą firmą?</h3>
            <p className="text-lg mb-6">
              Podziel się swoją opinią na naszej stronie Google lub skontaktuj się z nami bezpośrednio.
            </p>
            <a 
              href="https://g.co/kgs/tR5khFz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button inline-block"
            >
              Dodaj opinię na Google
            </a>
          </div>
        </div>
      </section>
      
      <CallToAction />
    </Layout>
  );
};

export default Testimonials;
