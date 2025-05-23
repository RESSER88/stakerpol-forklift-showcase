
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Wiadomość wysłana",
      description: "Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.",
    });
    
    reset();
    setIsSubmitting(false);
  };

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
              <h2 className="text-2xl font-bold mb-6">Stakerpol</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-toyota-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">{t('callNow')}</h3>
                    <a 
                      href="tel:+48123456789" 
                      className="text-lg hover:text-toyota-red transition-colors"
                    >
                      +48 123 456 789
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-toyota-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">{t('sendMessage')}</h3>
                    <a 
                      href="mailto:kontakt@stakerpol.pl" 
                      className="text-lg hover:text-toyota-red transition-colors"
                    >
                      kontakt@stakerpol.pl
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-toyota-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">{t('ourLocation')}</h3>
                    <address className="text-lg not-italic">
                      ul. Przykładowa 123<br />
                      00-000 Warszawa<br />
                      Polska
                    </address>
                  </div>
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
              
              {/* Map */}
              <div className="mt-8 h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156388.35438500328!2d20.900201748118483!3d52.23285144742892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarszawa!5e0!3m2!1spl!2spl!4v1621345678901!5m2!1spl!2spl" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy"
                  title="Stakerpol location"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">{t('sendMessage')}</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block mb-2 font-medium">
                    {t('fullName')}
                  </label>
                  <Input
                    id="fullName"
                    {...register('fullName', { 
                      required: 'To pole jest wymagane' 
                    })}
                    placeholder="Jan Kowalski"
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    {t('email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'To pole jest wymagane',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Nieprawidłowy adres email'
                      }
                    })}
                    placeholder="jan.kowalski@przykład.pl"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    {t('phone')}
                  </label>
                  <Input
                    id="phone"
                    {...register('phone', { 
                      required: 'To pole jest wymagane' 
                    })}
                    placeholder="+48 123 456 789"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    {t('message')}
                  </label>
                  <Textarea
                    id="message"
                    {...register('message', { 
                      required: 'To pole jest wymagane',
                      minLength: {
                        value: 10,
                        message: 'Wiadomość musi zawierać co najmniej 10 znaków'
                      }
                    })}
                    placeholder="W czym możemy pomóc?"
                    className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="cta-button w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Wysyłanie...' : t('submit')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
