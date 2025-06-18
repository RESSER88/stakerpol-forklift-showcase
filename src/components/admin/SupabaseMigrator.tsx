
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProductStore } from '@/stores/productStore';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SupabaseMigrator = () => {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [migrated, setMigrated] = useState(false);
  const { products: localProducts } = useProductStore();
  const { addProduct } = useSupabaseProducts();
  const { toast } = useToast();

  const migrateData = async () => {
    if (localProducts.length === 0) {
      toast({
        title: "Brak danych",
        description: "Nie ma produktów do migracji w localStorage",
        variant: "destructive"
      });
      return;
    }

    setMigrating(true);
    setProgress(0);

    try {
      for (let i = 0; i < localProducts.length; i++) {
        const product = localProducts[i];
        
        // Przygotuj produkt do migracji z pełną specyfikacją
        const productToMigrate = {
          model: product.model,
          shortDescription: product.shortDescription || '',
          image: product.images?.[0] || product.image || '',
          specs: {
            productionYear: product.specs?.productionYear || '',
            mastLiftingCapacity: product.specs?.mastLiftingCapacity || '',
            preliminaryLiftingCapacity: product.specs?.preliminaryLiftingCapacity || '',
            workingHours: product.specs?.workingHours || '',
            liftHeight: product.specs?.liftHeight || '',
            minHeight: product.specs?.minHeight || '',
            preliminaryLifting: product.specs?.preliminaryLifting || '',
            battery: product.specs?.battery || '',
            condition: product.specs?.condition || '',
            serialNumber: product.specs?.serialNumber || '',
            driveType: product.specs?.driveType || '',
            mast: product.specs?.mast || '',
            freeStroke: product.specs?.freeStroke || '',
            dimensions: product.specs?.dimensions || '',
            wheels: product.specs?.wheels || '',
            operatorPlatform: product.specs?.operatorPlatform || '',
            additionalOptions: product.specs?.additionalOptions || '',
            additionalDescription: product.specs?.additionalDescription || '',
            capacity: product.specs?.capacity || '',
            charger: product.specs?.charger || ''
          },
          images: product.images || [product.image].filter(Boolean)
        };

        await addProduct(productToMigrate, productToMigrate.images);
        
        setProgress(((i + 1) / localProducts.length) * 100);
        
        // Małe opóźnienie dla UI
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setMigrated(true);
      toast({
        title: "Migracja zakończona",
        description: `Pomyślnie zmigrowano ${localProducts.length} produktów do Supabase`
      });
    } catch (error: any) {
      toast({
        title: "Błąd migracji",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setMigrating(false);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('product-store');
    toast({
      title: "localStorage wyczyszczony",
      description: "Dane lokalne zostały usunięte"
    });
    window.location.reload();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Migracja danych do Supabase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            Znaleziono <strong>{localProducts.length}</strong> produktów w localStorage. 
            Ta operacja przeniesie wszystkie dane do bazy Supabase.
          </p>
        </div>

        {migrating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Migrowanie...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        {migrated && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>Migracja zakończona pomyślnie!</span>
          </div>
        )}

        <div className="flex gap-3">
          <Button 
            onClick={migrateData}
            disabled={migrating || migrated || localProducts.length === 0}
            className="flex-1"
          >
            {migrating ? 'Migrowanie...' : 'Migruj do Supabase'}
          </Button>
          
          {migrated && (
            <Button 
              onClick={clearLocalStorage}
              variant="outline"
              className="flex-1"
            >
              Wyczyść localStorage
            </Button>
          )}
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Uwaga:</p>
              <p>Po migracji zalecamy wyczyszczenie localStorage, aby uniknąć konfliktów danych.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseMigrator;
