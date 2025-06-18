
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone } from 'lucide-react';
import { Product } from '@/types';

interface PriceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productModel?: string;
  product?: Product;
}

const PriceInquiryModal = ({ isOpen, onClose, productModel, product }: PriceInquiryModalProps) => {
  const modelName = productModel || product?.model || 'Produkt';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Dzień dobry, interesuje mnie produkt ${modelName}. Proszę o kontakt w sprawie ceny i dostępności.`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mailtoLink = `mailto:info@stakerpol.pl?subject=Zapytanie o ${modelName}&body=${encodeURIComponent(
      `Imię i nazwisko: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Telefon: ${formData.phone}\n\n` +
      `Wiadomość:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    onClose();
  };

  const handlePhoneCall = () => {
    window.location.href = 'tel:+48694133592';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Zapytanie o cenę - {modelName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Szybki kontakt telefoniczny:</h3>
            <Button 
              onClick={handlePhoneCall}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <Phone className="mr-2 h-4 w-4" />
              +48 694 133 592
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">lub wypełnij formularz</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Imię i nazwisko"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Input
                type="tel"
                placeholder="Telefon"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <div>
              <Textarea
                placeholder="Twoja wiadomość..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                required
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Anuluj
              </Button>
              <Button type="submit" className="flex-1 cta-button">
                Wyślij zapytanie
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceInquiryModal;
