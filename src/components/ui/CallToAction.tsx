
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
    <section className={`bg-toyota-red text-white ${className}`}>
      <div className="container-custom py-16 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('callToAction')}</h2>
          <p className="text-lg mb-8">
            Zadzwoń do naszych ekspertów, którzy pomogą Ci wybrać idealny wózek widłowy 
            dopasowany do Twoich potrzeb.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              className="bg-white hover:bg-gray-100 text-toyota-red py-3 px-8 rounded-md shadow-lg text-lg font-semibold min-w-[200px]"
              asChild
            >
              <a href="tel:+48123456789">
                <Phone className="mr-2 h-5 w-5" />
                +48 123 456 789
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-toyota-red py-3 px-8 rounded-md text-lg font-semibold min-w-[200px]"
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
