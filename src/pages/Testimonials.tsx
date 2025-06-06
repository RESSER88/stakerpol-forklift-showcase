
import Layout from '@/components/layout/Layout';
import TestimonialCard from '@/components/ui/TestimonialCard';
import CallToAction from '@/components/ui/CallToAction';
import { testimonials } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import { getRandomItems } from '@/utils/randomUtils';
import { useMemo } from 'react';

const Testimonials = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Shuffle testimonials on each page load
  const shuffledTestimonials = useMemo(() => {
    return getRandomItems(testimonials, testimonials.length);
  }, []);

  const getPageDescription = () => {
    switch (language) {
      case 'en':
        return 'Discover the opinions of our customers who trusted Stakerpol and chose BT Toyota forklifts.';
      case 'cs':
        return 'Poznejte názory našich zákazníků, kteří důvěřovali společnosti Stakerpol a vybrali si vysokozdvižné vozíky BT Toyota.';
      case 'sk':
        return 'Spoznajte názory našich zákazníkov, ktorí dôverovali spoločnosti Stakerpol a vybrali si vysokozdvižné vozíky BT Toyota.';
      case 'de':
        return 'Entdecken Sie die Meinungen unserer Kunden, die Stakerpol vertraut und BT Toyota Gabelstapler gewählt haben.';
      default:
        return 'Poznaj opinie naszych klientów, którzy zaufali firmie Stakerpol i wybrali wózki widłowe BT Toyota.';
    }
  };

  const getExperienceContent = () => {
    switch (language) {
      case 'en':
        return {
          title: 'Have experience with our company?',
          description: 'Share your opinion on our Google page or contact us directly.',
          buttonText: 'Add Google review'
        };
      case 'cs':
        return {
          title: 'Máte zkušenosti s naší společností?',
          description: 'Sdílejte svůj názor na naší stránce Google nebo nás kontaktujte přímo.',
          buttonText: 'Přidat hodnocení na Google'
        };
      case 'sk':
        return {
          title: 'Máte skúsenosti s našou spoločnosťou?',
          description: 'Zdieľajte svoj názor na našej stránke Google alebo nás kontaktujte priamo.',
          buttonText: 'Pridať hodnotenie na Google'
        };
      case 'de':
        return {
          title: 'Haben Sie Erfahrungen mit unserem Unternehmen?',
          description: 'Teilen Sie Ihre Meinung auf unserer Google-Seite oder kontaktieren Sie uns direkt.',
          buttonText: 'Google-Bewertung hinzufügen'
        };
      default:
        return {
          title: 'Masz doświadczenie z naszą firmą?',
          description: 'Podziel się swoją opinią na naszej stronie Google lub skontaktuj się z nami bezpośrednio.',
          buttonText: 'Dodaj opinię na Google'
        };
    }
  };

  const experienceContent = getExperienceContent();

  return (
    <Layout>
      <section className="bg-gradient-to-b from-gray-100 to-white py-12 md:py-20">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-6 text-center animate-fade-in">{t('customerOpinions')}</h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in delay-100">
            {getPageDescription()}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shuffledTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} style={{ animationDelay: `${index * 100}ms` }}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-white p-8 rounded-lg shadow text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">{experienceContent.title}</h3>
            <p className="text-lg mb-6">
              {experienceContent.description}
            </p>
            <a 
              href="https://g.co/kgs/tR5khFz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button inline-block"
            >
              {experienceContent.buttonText}
            </a>
          </div>
        </div>
      </section>
      
      <CallToAction />
    </Layout>
  );
};

export default Testimonials;
