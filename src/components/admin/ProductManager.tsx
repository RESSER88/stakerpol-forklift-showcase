
import { Button } from '@/components/ui/button';
import { Plus, Grid, Table as TableIcon, Database, Trash2 } from 'lucide-react';
import { useProductManager } from '@/hooks/useProductManager';
import ProductList from './ProductList';
import ProductDetailsModal from './ProductDetailsModal';
import SupabaseMigrator from './SupabaseMigrator';
import { useProductStore } from '@/stores/productStore';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import { useState } from 'react';

const ProductManager = () => {
  const [showMigrator, setShowMigrator] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const { products: localProducts } = useProductStore();
  const { deleteAllProducts, bulkAddProducts } = useSupabaseProducts();
  
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

  // Lista produktów do dodania
  const productsList = [
    { model: "SWE 200D", serialNumber: "6428064", rok: 2016, udzwigMaszt: "1000 kg", udzwigWstepne: "2000 kg", przebieg: "3727 mth", podnoszenie: "2.10 m", minWys: "1.54 m", bateria: "210 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "brak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE 200D", serialNumber: "6502448", rok: 2017, udzwigMaszt: "1000 kg", udzwigWstepne: "2000 kg", przebieg: "3184 mth", podnoszenie: "2.10 m", minWys: "1.54 m", bateria: "210 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "brak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE 200D", serialNumber: "6486414", rok: 2017, udzwigMaszt: "1000 kg", udzwigWstepne: "2000 kg", przebieg: "2739 mth", podnoszenie: "2.10 m", minWys: "1.54 m", bateria: "210 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "brak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE 200D", serialNumber: "6503984", rok: 2017, udzwigMaszt: "1000 kg", udzwigWstepne: "2000 kg", przebieg: "992 mth", podnoszenie: "1.70 m", minWys: "1.54 m", bateria: "210 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "brak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE200D", serialNumber: "6522932", rok: 2017, udzwigMaszt: "1000 kg", udzwigWstepne: "2000 kg", przebieg: "3420 mth", podnoszenie: "2.10 m", minWys: "1.54 m", bateria: "210 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "brak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE200D", serialNumber: "6524383", rok: 2017, udzwigMaszt: "1000 kg", udzwigWstepne: "2000 kg", przebieg: "3233 mth", podnoszenie: "2.10 m", minWys: "1.54 m", bateria: "210 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "brak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE200D", serialNumber: "6625316", rok: 2018, udzwigMaszt: "1000 kg", udzwigWstepne: "2000 kg", przebieg: "6668 mth", podnoszenie: "1.90 m", minWys: "1.44 m", bateria: "240 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "brak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE200D", serialNumber: "6556736", rok: 2018, udzwigMaszt: "1000 kg", udzwigWstepne: "2000 kg", przebieg: "3281 mth", podnoszenie: "2.10 m", minWys: "1.54 m", bateria: "210 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "brak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE 100", serialNumber: "6305917", rok: 2014, udzwigMaszt: "1000 kg", udzwigWstepne: "1000 kg", przebieg: "5004 mth", podnoszenie: "2.70 m", minWys: "1.95 m", bateria: "225 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "Tak", wymiary: "1.831 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE 120L", serialNumber: "6456929", rok: 2016, udzwigMaszt: "1200 kg", udzwigWstepne: "1200 kg", przebieg: "1073 mth", podnoszenie: "2.90 m", minWys: "1.95 m", bateria: "240 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "Tak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE 120L", serialNumber: "6442902", rok: 2016, udzwigMaszt: "1200 kg", udzwigWstepne: "1200 kg", przebieg: "1206 mth", podnoszenie: "2.90 m", minWys: "1.95 m", bateria: "240 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "Tak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE 120L", serialNumber: "6385068", rok: 2015, udzwigMaszt: "1200 kg", udzwigWstepne: "1200 kg", przebieg: "3545 mth", podnoszenie: "2.70 m", minWys: "", bateria: "240 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "Tak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Nie" },
    { model: "SWE 200D", serialNumber: "6662053", rok: 2019, udzwigMaszt: "1000 kg", udzwigWstepne: "2000 kg", przebieg: "4078 mth", podnoszenie: "2.10 m", minWys: "1.54 m", bateria: "240 Ah", naped: "Elektryczny", maszt: "Duplex", skokSwobodny: "brak", wymiary: "1.910 m x 0.770 m", podestSkladany: "Tak" },
    { model: "SPE 160L", serialNumber: "6669278", rok: 2019, udzwigMaszt: "1600 kg", udzwigWstepne: "1600 kg", przebieg: "1370 mth", podnoszenie: "6.00 m", minWys: "2.55 m", bateria: "500 Ah", naped: "Elektryczny", maszt: "Triplex", skokSwobodny: "brak", wymiary: "2.200 m x 0.920 m", podestSkladany: "Tak" },
    { model: "SPE 160L", serialNumber: "6669279", rok: 2019, udzwigMaszt: "1600 kg", udzwigWstepne: "1600 kg", przebieg: "2000 mth", podnoszenie: "6.00 m", minWys: "2.55 m", bateria: "500 Ah", naped: "Elektryczny", maszt: "Triplex", skokSwobodny: "brak", wymiary: "2.200 m x 0.920 m", podestSkladany: "Tak" }
  ];

  const handleClearAndAddProducts = async () => {
    if (confirm('Czy na pewno chcesz usunąć wszystkie produkty i dodać nową listę? Ta operacja jest nieodwracalna.')) {
      await deleteAllProducts();
      await bulkAddProducts(productsList);
    }
  };

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
          <Button 
            variant="outline" 
            onClick={handleClearAndAddProducts}
            className="mr-2"
          >
            <Database className="h-4 w-4 mr-2" />
            Załaduj listę produktów
          </Button>
          
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
