
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

const Contact = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <Layout>
      <section className="bg-white py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-stakerpol-navy">
              {t('contact')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('contactUs')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              {/* Main Contact */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    {t('contact')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-stakerpol-orange" />
                    <div>
                      <p className="font-semibold">+48 694 133 592</p>
                      <p className="text-sm text-gray-600">Marcin Barwijuk</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-stakerpol-orange" />
                    <div>
                      <p className="font-semibold">info@stakerpol.pl</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-stakerpol-orange mt-1" />
                    <div>
                      <p className="font-semibold">{t('businessHours')}</p>
                      <p className="text-sm text-gray-600">{t('mondayToFriday')}</p>
                      <p className="text-sm text-gray-600">{t('weekend')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Warehouse Address */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {t('warehouseAddress')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-stakerpol-orange mt-1" />
                    <div>
                      <p className="font-semibold">ul. Żwirki i Wigury 16A</p>
                      <p className="text-sm text-gray-600">02-092 Warszawa</p>
                      <p className="text-sm text-gray-600 mt-2">{t('warehouseHours')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {t('billingAddress')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-stakerpol-orange mt-1" />
                    <div>
                      <p className="font-semibold">ul. Puławska 403</p>
                      <p className="text-sm text-gray-600">02-801 Warszawa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t('ourLocation')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full h-[600px] rounded-b-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.8668397434887!2d20.968089976770234!3d52.19883437197896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecce7c5c26e2d%3A0x3ba3b0b8b8b8b8b8!2s%C5%BBwirki%20i%20Wigury%2016A%2C%2002-092%20Warszawa!5e0!3m2!1spl!2spl!4v1699999999999!5m2!1spl!2spl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t('ourLocation')}
                    className="rounded-b-lg"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
