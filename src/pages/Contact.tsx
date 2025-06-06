
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
          <h1 className="text-4xl font-bold mb-6 text-center text-stakerpol-navy">{t('contact')}</h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Skontaktuj się z nami, aby uzyskać więcej informacji o naszych wózkach widłowych BT Toyota.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-stakerpol-navy">FHU Stakerpol</h2>
                <h3 className="text-2xl font-semibold mb-8 text-gray-700">Michał Seweryn</h3>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-xl mb-4 text-stakerpol-navy">Lokalizacja: Stakerpol – Magazyn</h4>
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-stakerpol-orange flex-shrink-0 mt-1" />
                    <address className="text-lg not-italic text-gray-700">
                      ul. Międzyleśna 115<br />
                      32-095 Celiny
                    </address>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-stakerpol-orange flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-stakerpol-navy">{t('callNow')}</h3>
                      <a 
                        href="tel:+48694133592" 
                        className="text-xl hover:text-stakerpol-orange transition-colors font-medium"
                      >
                        +48 694 133 592
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-stakerpol-orange flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-stakerpol-navy">{t('sendMessage')}</h3>
                      <a 
                        href="mailto:info@stakerpol.pl" 
                        className="text-xl hover:text-stakerpol-orange transition-colors font-medium"
                      >
                        info@stakerpol.pl
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-xl mb-4 text-stakerpol-navy">Adres rejestracyjny:</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>FHU Stakerpol</strong></p>
                  <p>Michał Seweryn</p>
                  <p>ul. Szewska 6</p>
                  <p>32-043 Skała</p>
                  <p><strong>NIP: PL6492111954</strong></p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-4 text-stakerpol-navy">Godziny pracy</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Poniedziałek - Piątek:</strong> 8:00 - 17:00</p>
                  <p><strong>Sobota:</strong> 9:00 - 14:00</p>
                  <p><strong>Niedziela:</strong> Zamknięte</p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Map Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-stakerpol-navy">{t('ourLocation')}</h3>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="h-[600px] lg:h-[700px] bg-gray-200 rounded-lg overflow-hidden shadow-inner">
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
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Kliknij na mapę, aby uzyskać szczegółowe wskazówki dojazdu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
