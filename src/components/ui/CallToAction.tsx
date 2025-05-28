
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

const CallToAction = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <section className="bg-stakerpol-navy text-white py-16">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold mb-4 animate-fade-in">{t('readyToStart')}</h2>
        <p className="text-xl mb-8 animate-fade-in">{t('contactUs')}</p>
        <Button className="cta-button text-lg animate-fade-in" size="lg" asChild>
          <a href="tel:+48123456789">
            <Phone className="mr-2" />
            {t('callNow')}
          </a>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
