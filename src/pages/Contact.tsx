
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

const Contact = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tutaj byłaby logika wysyłania formularza
    console.log('Contact form submitted:', formData);
    toast({
      title: "Wiadomość wysłana",
      description: "Dziękujemy za kontakt. Odpowiemy tak szybko jak to możliwe.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  {t('sendMessage')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">{t('fullName')}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">{t('message')}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full cta-button">
                    {t('submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information and Map */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>{t('contact')}</CardTitle>
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
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-stakerpol-orange" />
                    <div>
                      <p className="font-semibold">Puławska 403</p>
                      <p className="text-sm text-gray-600">02-801 Warszawa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-stakerpol-orange mt-1" />
                    <div>
                      <p className="font-semibold">{t('workingHours')}</p>
                      <p className="text-sm text-gray-600">{t('mondayToFriday')}</p>
                      <p className="text-sm text-gray-600">{t('weekend')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {t('ourLocation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative w-full h-96 rounded-b-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.5!2d21.0122!3d52.1672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c1b5f8a85%3A0x5c8b9c8b5f8a85b5!2sPu%C5%82awska%20403%2C%2002-801%20Warszawa!5e0!3m2!1spl!2spl!4v1624887654321!5m2!1spl!2spl"
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
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
