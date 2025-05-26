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
import { Plus, Pencil, Trash2, Image, X, GripVertical } from 'lucide-react';
import { Product } from '@/types';
import { useProductStore } from '@/stores/productStore';

const ProductManager = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
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
    setImagePreviews(product.images || [product.image].filter(Boolean));
    setIsEditDialogOpen(true);
  };
  
  const handleAdd = () => {
    setSelectedProduct(null);
    setEditedProduct({...defaultNewProduct, id: Date.now().toString()});
    setImagePreviews([]);
    setIsEditDialogOpen(true);
  };
  
  const handleSave = () => {
    try {
      const productToSave = {
        ...editedProduct,
        images: imagePreviews,
        image: imagePreviews[0] || ''
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
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const imageUrl = URL.createObjectURL(file);
    const newPreviews = [...imagePreviews];
    newPreviews[index] = imageUrl;
    setImagePreviews(newPreviews);
  };
  
  const handleRemoteImageUrl = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const url = e.target.value;
    const newPreviews = [...imagePreviews];
    newPreviews[index] = url;
    setImagePreviews(newPreviews);
  };
  
  const removeImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
  };
  
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    
    const newPreviews = [...imagePreviews];
    const draggedItem = newPreviews[draggedIndex];
    newPreviews.splice(draggedIndex, 1);
    newPreviews.splice(dropIndex, 0, draggedItem);
    
    setImagePreviews(newPreviews);
    setDraggedIndex(null);
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? `Edytuj ${selectedProduct.model}` : 'Dodaj nowy produkt'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Model</label>
                <Input 
                  value={editedProduct.model} 
                  onChange={(e) => updateField('model', e.target.value)} 
                  placeholder="np. BT Toyota SWE200D"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Krótki opis</label>
                <Textarea 
                  value={editedProduct.shortDescription} 
                  onChange={(e) => updateField('shortDescription', e.target.value)}
                  placeholder="Krótki opis produktu"
                  rows={3}
                />
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium mb-1">Galeria zdjęć (maksymalnie 5)</label>
                
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Zdjęcie {index + 1} {index === 0 && "(główne)"}
                      </span>
                      {imagePreviews[index] && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        className="mb-2"
                      />
                      <p className="text-xs text-gray-500">lub</p>
                      <Input
                        type="text"
                        placeholder="URL do zdjęcia"
                        value={imagePreviews[index] || ''}
                        onChange={(e) => handleRemoteImageUrl(e, index)}
                      />
                    </div>
                    
                    {imagePreviews[index] && (
                      <div className="mt-2">
                        <div 
                          className="relative w-full h-24 cursor-move"
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                        >
                          <img 
                            src={imagePreviews[index]} 
                            alt={`Podgląd ${index + 1}`}
                            className="w-full h-full object-cover rounded"
                            onError={() => {
                              const newPreviews = [...imagePreviews];
                              newPreviews[index] = '';
                              setImagePreviews(newPreviews);
                            }}
                          />
                          <div className="absolute top-1 right-1 bg-black/50 rounded p-1">
                            <GripVertical className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg mb-2">Specyfikacja</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Numer seryjny</label>
                  <Input 
                    value={editedProduct.specs.serialNumber || ''} 
                    onChange={(e) => updateSpecsField('serialNumber', e.target.value)} 
                    placeholder="np. ABC123456"
                    maxLength={20}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Rok produkcji</label>
                  <Input 
                    value={editedProduct.specs.productionYear} 
                    onChange={(e) => updateSpecsField('productionYear', e.target.value)} 
                    placeholder="np. 2018"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Udźwig</label>
                  <Input 
                    value={editedProduct.specs.capacity} 
                    onChange={(e) => updateSpecsField('capacity', e.target.value)} 
                    placeholder="np. 2000 kg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Godziny pracy</label>
                  <Input 
                    value={editedProduct.specs.workingHours} 
                    onChange={(e) => updateSpecsField('workingHours', e.target.value)} 
                    placeholder="np. 3200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Wysokość podnoszenia</label>
                  <Input 
                    value={editedProduct.specs.liftHeight} 
                    onChange={(e) => updateSpecsField('liftHeight', e.target.value)} 
                    placeholder="np. 1600 mm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Minimalna wysokość</label>
                  <Input 
                    value={editedProduct.specs.minHeight} 
                    onChange={(e) => updateSpecsField('minHeight', e.target.value)} 
                    placeholder="np. 85 mm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bateria</label>
                  <Input 
                    value={editedProduct.specs.battery} 
                    onChange={(e) => updateSpecsField('battery', e.target.value)} 
                    placeholder="np. Litowo-jonowa, 48V 120Ah"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Ładowarka</label>
                  <Input 
                    value={editedProduct.specs.charger} 
                    onChange={(e) => updateSpecsField('charger', e.target.value)} 
                    placeholder="np. Wbudowana ładowarka 230V"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Stan</label>
                  <Input 
                    value={editedProduct.specs.condition} 
                    onChange={(e) => updateSpecsField('condition', e.target.value)} 
                    placeholder="np. Bardzo dobry"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Wymiary</label>
                  <Input 
                    value={editedProduct.specs.dimensions} 
                    onChange={(e) => updateSpecsField('dimensions', e.target.value)} 
                    placeholder="np. 1900/720/1500 mm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Koła</label>
                  <Input 
                    value={editedProduct.specs.wheels} 
                    onChange={(e) => updateSpecsField('wheels', e.target.value)} 
                    placeholder="np. Poliuretan"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Opcje dodatkowe</label>
                  <Input 
                    value={editedProduct.specs.additionalOptions} 
                    onChange={(e) => updateSpecsField('additionalOptions', e.target.value)} 
                    placeholder="np. Platforma dla operatora"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
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
