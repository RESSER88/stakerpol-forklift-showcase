
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import { Product } from '@/types';

interface PriceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const PriceInquiryModal = ({ isOpen, onClose, product }: PriceInquiryModalProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email && !phone) {
      toast({
        title: t('error'),
        description: t('pleaseProvideEmailOrPhone'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate email sending (in real app, this would call a backend API)
      const emailData = {
        to: 'maciejsew@gmail.com',
        subject: 'Prośba o cenę',
        body: `
Zapytanie o cenę dla produktu: ${product.model}

Dane kontaktowe:
${email ? `Email: ${email}` : ''}
${phone ? `Telefon: ${phone}` : ''}

Wysłane ze strony: ${window.location.href}
        `.trim()
      };

      console.log('Wysyłanie e-maila:', emailData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: t('success'),
        description: t('inquirySent'),
      });

      setEmail('');
      setPhone('');
      onClose();
    } catch (error) {
      console.error('Błąd wysyłania zapytania:', error);
      toast({
        title: t('error'),
        description: t('inquiryError'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('askForPrice')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            {t('productModel')}: <strong>{product.model}</strong>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('yourEmail')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">{t('phone')}</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('yourPhone')}
            />
          </div>
          
          <div className="text-xs text-muted-foreground">
            {t('provideAtLeastOne')}
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? t('sending') : 'OK'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PriceInquiryModal;
