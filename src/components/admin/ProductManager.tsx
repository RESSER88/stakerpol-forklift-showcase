
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Grid, Table as TableIcon } from 'lucide-react';
import { useProductManager } from '@/hooks/useProductManager';
import ProductList from './ProductList';
import ProductDetailsModal from './ProductDetailsModal';
import { useToast } from '@/hooks/use-toast';

const ProductManager = () => {
  const { toast } = useToast();
  const {
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedProduct,
    productImages,
    setProductImages,
    viewMode,
    setViewMode,
    products,
    defaultNewProduct,
    handleEdit,
    handleAdd,
    handleCopy,
    handleDelete,
    addProduct,
    updateProduct
  } = useProductManager();

  const handleSave = (product: any, images: string[]) => {
    const productToSave = {
      ...product,
      images: images,
      image: images[0] || ''
    };
    
    try {
      if (selectedProduct && selectedProduct.id) {
        // Sprawdzamy czy to jest edycja istniejącego produktu (ma ID które już istnieje w products)
        const existingProduct = products.find(p => p.id === selectedProduct.id);
        if (existingProduct) {
          updateProduct(productToSave);
          toast({
            title: "Produkt zaktualizowany",
            description: `Pomyślnie zaktualizowano produkt ${productToSave.model}`
          });
        } else {
          // To jest nowy produkt (kopia) - dodajemy jako nowy
          addProduct(productToSave);
          toast({
            title: "Produkt dodany",
            description: `Pomyślnie dodano nowy produkt ${productToSave.model}`
          });
        }
      } else {
        // Nowy produkt - generujemy ID
        const newProduct = {
          ...productToSave,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        addProduct(newProduct);
        toast({
          title: "Produkt dodany",
          description: `Pomyślnie dodano nowy produkt ${newProduct.model}`
        });
      }
      
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas zapisywania produktu",
        variant: "destructive"
      });
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stakerpol-navy">Zarządzanie Produktami</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Łącznie opublikowanych produktów: <span className="font-semibold text-stakerpol-orange">{products.length}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8"
            >
              <Grid className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Kafelki</span>
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="h-8"
            >
              <TableIcon className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Tabela</span>
            </Button>
          </div>
          <Button onClick={handleAdd} className="cta-button">
            <Plus className="mr-2 h-4 w-4" /> 
            <span className="hidden sm:inline">Dodaj Produkt</span>
            <span className="sm:hidden">Dodaj</span>
          </Button>
        </div>
      </div>

      <ProductList
        products={products}
        viewMode={viewMode}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />
      
      <ProductDetailsModal
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        selectedProduct={selectedProduct}
        defaultNewProduct={defaultNewProduct}
        productImages={productImages}
        onImagesChange={setProductImages}
        onSave={handleSave}
        products={products}
      />
    </div>
  );
};

export default ProductManager;
