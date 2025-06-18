
import { Button } from '@/components/ui/button';
import { Plus, Grid, Table as TableIcon, Database } from 'lucide-react';
import { useProductManager } from '@/hooks/useProductManager';
import ProductList from './ProductList';
import ProductDetailsModal from './ProductDetailsModal';
import SupabaseMigrator from './SupabaseMigrator';
import { useProductStore } from '@/stores/productStore';
import { useState } from 'react';

const ProductManager = () => {
  const [showMigrator, setShowMigrator] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const { products: localProducts } = useProductStore();
  
  const {
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedProduct,
    productImages,
    setProductImages,
    products,
    defaultNewProduct,
    loading,
    handleEdit,
    handleAdd,
    handleCopy,
    handleDelete,
    handleSave
  } = useProductManager();

  // Sprawdź czy są dane lokalne do migracji
  const hasLocalData = localProducts.length > 0;

  if (showMigrator) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setShowMigrator(false)}
          className="mb-4"
        >
          ← Powrót do zarządzania produktami
        </Button>
        <SupabaseMigrator />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stakerpol-navy">Zarządzanie Produktami</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Łącznie produktów w bazie: <span className="font-semibold text-stakerpol-orange">{products.length}</span>
            {loading && <span className="ml-2 text-blue-600">⟳ Ładowanie...</span>}
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {hasLocalData && (
            <Button 
              variant="outline" 
              onClick={() => setShowMigrator(true)}
              className="mr-2"
            >
              <Database className="h-4 w-4 mr-2" />
              Migruj dane ({localProducts.length})
            </Button>
          )}
          
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
        useSupabase={true}
      />
    </div>
  );
};

export default ProductManager;
