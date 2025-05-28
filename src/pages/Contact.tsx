
import { Phone, Mail, MapPin } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

const Contact = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <Layout>
      <section className="bg-gray-100 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-6 text-center">{t('contact')}</h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Skontaktuj się z nami, aby uzyskać więcej informacji o naszych wózkach widłowych BT Toyota.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">FHU Stakerpol</h2>
              <h3 className="text-xl font-semibold mb-6">Michał Seweryn</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-4">Lokalizacja: Stakerpol – Magazyn</h4>
                  <div className="flex items-start space-x-4 mb-4">
                    <MapPin className="w-6 h-6 text-toyota-red flex-shrink-0 mt-1" />
                    <address className="text-lg not-italic">
                      ul. Międzyleśna 115<br />
                      32-095 Celiny
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-toyota-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">{t('callNow')}</h3>
                    <a 
                      href="tel:+48694133592" 
                      className="text-lg hover:text-toyota-red transition-colors"
                    >
                      +48 694 133 592
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-toyota-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">{t('sendMessage')}</h3>
                    <a 
                      href="mailto:info@stakerpol.pl" 
                      className="text-lg hover:text-toyota-red transition-colors"
                    >
                      info@stakerpol.pl
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold text-lg mb-4">Adres rejestracyjny:</h4>
                <div className="space-y-1">
                  <p><strong>FHU Stakerpol</strong></p>
                  <p>Michał Seweryn</p>
                  <p>ul. Szewska 6</p>
                  <p>32-043 Skała</p>
                  <p><strong>NIP: PL6492111954</strong></p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Godziny pracy</h3>
                <div className="space-y-1">
                  <p>Poniedziałek - Piątek: 8:00 - 17:00</p>
                  <p>Sobota: 9:00 - 14:00</p>
                  <p>Niedziela: Zamknięte</p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('ourLocation')}</h3>
              <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2610899.651257704!2d19.995502000000002!3d50.278735!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471655f810639623%3A0xc3bcd72bdd0d6aa!2sStakerpol%20Paleciak%20elektryczny%20Bt%20Swe%20200d!5e0!3m2!1spl!2sus!4v1748436780377!5m2!1spl!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Stakerpol location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
