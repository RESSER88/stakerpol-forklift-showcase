
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Product } from '@/types';
import ProductImageManager from './ProductImageManager';
import ProductForm from './ProductForm';
import { useProductFormValidation } from '@/hooks/useProductFormValidation';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
  defaultNewProduct: Product;
  productImages: string[];
  onImagesChange: (images: string[]) => void;
  onSave: (product: Product, images: string[]) => void;
  products: Product[];
}

const ProductDetailsModal = ({ 
  isOpen, 
  onClose, 
  selectedProduct, 
  defaultNewProduct,
  productImages,
  onImagesChange,
  onSave,
  products
}: ProductDetailsModalProps) => {
  const [editedProduct, setEditedProduct] = useState<Product>(defaultNewProduct);
  const { toast } = useToast();
  const { validateProduct } = useProductFormValidation(products);

  useEffect(() => {
    if (selectedProduct) {
      setEditedProduct({...selectedProduct});
    } else {
      setEditedProduct({...defaultNewProduct, id: Date.now().toString()});
    }
  }, [selectedProduct, defaultNewProduct]);

  const updateField = (field: string, value: string) => {
    setEditedProduct({...editedProduct, [field]: value});
  };
  
  const updateSpecsField = (field: string, value: string) => {
    setEditedProduct({
      ...editedProduct, 
      specs: {...editedProduct.specs, [field]: value}
    });
  };

  const handleSave = () => {
    try {
      if (!validateProduct(editedProduct, productImages, selectedProduct?.id)) {
        return;
      }

      onSave(editedProduct, productImages);
      
      toast({
        title: selectedProduct ? "Produkt zaktualizowany" : "Produkt dodany",
        description: `Pomyślnie ${selectedProduct ? 'zaktualizowano' : 'dodano'} produkt ${editedProduct.model}`
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać produktu",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {selectedProduct ? `Edytuj ${selectedProduct.model}` : 'Dodaj nowy produkt'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 py-4 sm:py-6">
          <div className="space-y-4 sm:space-y-6">
            <ProductImageManager
              onImagesChange={onImagesChange}
              maxImages={10}
              currentImages={productImages}
            />
          </div>
          
          <ProductForm
            product={editedProduct}
            onFieldChange={updateField}
            onSpecsFieldChange={updateSpecsField}
          />
        </div>
        
        <DialogFooter className="border-t pt-4 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Anuluj
          </Button>
          <Button className="cta-button w-full sm:w-auto" onClick={handleSave}>
            {selectedProduct ? 'Zapisz zmiany' : 'Dodaj produkt'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
