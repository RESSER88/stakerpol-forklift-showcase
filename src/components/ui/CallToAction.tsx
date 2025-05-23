
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

interface CallToActionProps {
  className?: string;
}

const CallToAction = ({ className = '' }: CallToActionProps) => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <section className={`bg-gradient-to-br from-stakerpol-navy to-blue-900 text-white ${className}`}>
      <div className="container-custom py-16 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">{t('callToAction')}</h2>
          <p className="text-lg mb-8 animate-fade-in delay-100">
            Zadzwoń do naszych ekspertów, którzy pomogą Ci wybrać idealny wózek widłowy 
            dopasowany do Twoich potrzeb.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              className="bg-white hover:bg-gray-100 text-stakerpol-navy py-3 px-8 rounded-md shadow-lg text-lg font-semibold min-w-[200px] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 animate-zoom-in"
              asChild
            >
              <a href="tel:+48123456789">
                <Phone className="mr-2 h-5 w-5" />
                +48 123 456 789
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-stakerpol-navy py-3 px-8 rounded-md text-lg font-semibold min-w-[200px] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 animate-zoom-in delay-100"
              asChild
            >
              <Link to="/contact">
                {t('contact')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
