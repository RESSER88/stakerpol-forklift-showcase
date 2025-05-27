
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Image } from 'lucide-react';
import { Product } from '@/types';
import { useProductStore } from '@/stores/productStore';
import ProductImageManager from './ProductImageManager';

const ProductManager = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const { toast } = useToast();
  
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  
  const defaultNewProduct: Product = {
    id: '',
    model: '',
    image: '',
    images: [],
    shortDescription: '',
    specs: {
      productionYear: '',
      capacity: '',
      workingHours: '',
      liftHeight: '',
      minHeight: '',
      battery: '',
      charger: '',
      condition: '',
      dimensions: '',
      wheels: '',
      additionalOptions: '',
      serialNumber: ''
    }
  };
  
  const [editedProduct, setEditedProduct] = useState<Product>(defaultNewProduct);
  
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditedProduct({...product});
    setProductImages(product.images || [product.image].filter(Boolean));
    setIsEditDialogOpen(true);
  };
  
  const handleAdd = () => {
    setSelectedProduct(null);
    setEditedProduct({...defaultNewProduct, id: Date.now().toString()});
    setProductImages([]);
    setIsEditDialogOpen(true);
  };
  
  const handleSave = () => {
    try {
      if (!editedProduct.model.trim()) {
        toast({
          title: "Błąd walidacji",
          description: "Model produktu jest wymagany",
          variant: "destructive"
        });
        return;
      }

      if (productImages.length === 0) {
        toast({
          title: "Błąd walidacji", 
          description: "Dodaj przynajmniej jedno zdjęcie produktu",
          variant: "destructive"
        });
        return;
      }

      const productToSave = {
        ...editedProduct,
        images: productImages,
        image: productImages[0] || ''
      };
      
      if (selectedProduct) {
        updateProduct(productToSave);
        toast({
          title: "Produkt zaktualizowany",
          description: `Pomyślnie zaktualizowano produkt ${editedProduct.model}`
        });
      } else {
        addProduct(productToSave);
        toast({
          title: "Produkt dodany",
          description: `Pomyślnie dodano produkt ${editedProduct.model}`
        });
      }
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać produktu",
        variant: "destructive"
      });
    }
  };
  
  const handleDelete = (product: Product) => {
    if (confirm(`Czy na pewno chcesz usunąć produkt ${product.model}?`)) {
      deleteProduct(product.id);
      toast({
        title: "Produkt usunięty",
        description: `Pomyślnie usunięto produkt ${product.model}`
      });
    }
  };
  
  const updateField = (field: string, value: string) => {
    setEditedProduct({...editedProduct, [field]: value});
  };
  
  const updateSpecsField = (field: string, value: string) => {
    setEditedProduct({
      ...editedProduct, 
      specs: {...editedProduct.specs, [field]: value}
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stakerpol-navy">Zarządzanie Produktami</h2>
        <Button onClick={handleAdd} className="cta-button">
          <Plus className="mr-2 h-4 w-4" /> Dodaj Produkt
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zdjęcie</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Krótki Opis</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Brak produktów. Dodaj pierwszy produkt używając przycisku powyżej.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        {product.images?.[0] || product.image ? (
                          <img 
                            src={product.images?.[0] || product.image} 
                            alt={product.model} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/150?text=Brak+zdjęcia";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <Image className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.model}</TableCell>
                    <TableCell className="max-w-xs truncate">{product.shortDescription}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(product)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedProduct ? `Edytuj ${selectedProduct.model}` : 'Dodaj nowy produkt'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
            {/* Left column - Images */}
            <div className="space-y-6">
              <ProductImageManager
                onImagesChange={setProductImages}
                maxImages={3}
                currentImages={productImages}
              />
            </div>
            
            {/* Right column - Product details */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-stakerpol-navy">Informacje podstawowe</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Model *</label>
                  <Input 
                    value={editedProduct.model} 
                    onChange={(e) => updateField('model', e.target.value)} 
                    placeholder="np. BT Toyota SWE200D"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Krótki opis</label>
                  <Textarea 
                    value={editedProduct.shortDescription} 
                    onChange={(e) => updateField('shortDescription', e.target.value)}
                    placeholder="Krótki opis produktu dla klientów"
                    rows={3}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-stakerpol-navy">Specyfikacja techniczna</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Numer seryjny</label>
                    <Input 
                      value={editedProduct.specs.serialNumber || ''} 
                      onChange={(e) => updateSpecsField('serialNumber', e.target.value)} 
                      placeholder="ABC123456"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Rok produkcji</label>
                    <Input 
                      value={editedProduct.specs.productionYear} 
                      onChange={(e) => updateSpecsField('productionYear', e.target.value)} 
                      placeholder="2023"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Udźwig</label>
                    <Input 
                      value={editedProduct.specs.capacity} 
                      onChange={(e) => updateSpecsField('capacity', e.target.value)} 
                      placeholder="2000 kg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Godziny pracy</label>
                    <Input 
                      value={editedProduct.specs.workingHours} 
                      onChange={(e) => updateSpecsField('workingHours', e.target.value)} 
                      placeholder="3200 h"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Wysokość podnoszenia</label>
                    <Input 
                      value={editedProduct.specs.liftHeight} 
                      onChange={(e) => updateSpecsField('liftHeight', e.target.value)} 
                      placeholder="1600 mm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Minimalna wysokość</label>
                    <Input 
                      value={editedProduct.specs.minHeight} 
                      onChange={(e) => updateSpecsField('minHeight', e.target.value)} 
                      placeholder="85 mm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Bateria</label>
                    <Input 
                      value={editedProduct.specs.battery} 
                      onChange={(e) => updateSpecsField('battery', e.target.value)} 
                      placeholder="48V 120Ah"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Ładowarka</label>
                    <Input 
                      value={editedProduct.specs.charger} 
                      onChange={(e) => updateSpecsField('charger', e.target.value)} 
                      placeholder="230V wbudowana"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Stan</label>
                    <Input 
                      value={editedProduct.specs.condition} 
                      onChange={(e) => updateSpecsField('condition', e.target.value)} 
                      placeholder="Bardzo dobry"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Wymiary</label>
                    <Input 
                      value={editedProduct.specs.dimensions} 
                      onChange={(e) => updateSpecsField('dimensions', e.target.value)} 
                      placeholder="1900/720/1500 mm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Koła</label>
                    <Input 
                      value={editedProduct.specs.wheels} 
                      onChange={(e) => updateSpecsField('wheels', e.target.value)} 
                      placeholder="Poliuretan"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Opcje dodatkowe</label>
                    <Input 
                      value={editedProduct.specs.additionalOptions} 
                      onChange={(e) => updateSpecsField('additionalOptions', e.target.value)} 
                      placeholder="Platforma operatora"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Anuluj
            </Button>
            <Button className="cta-button" onClick={handleSave}>
              {selectedProduct ? 'Zapisz zmiany' : 'Dodaj produkt'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManager;
