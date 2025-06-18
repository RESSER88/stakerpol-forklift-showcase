
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface SupabaseProduct {
  id: string;
  model: string;
  short_description: string | null;
  image: string | null;
  specs: any;
  created_at: string;
  updated_at: string;
}

export const useSupabaseProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Cache management
  const [lastFetch, setLastFetch] = useState(0);
  const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

  // Konwersja z formatu Supabase do lokalnego formatu Product
  const convertFromSupabase = useCallback((supabaseProduct: SupabaseProduct): Product => {
    return {
      id: supabaseProduct.id,
      model: supabaseProduct.model,
      shortDescription: supabaseProduct.short_description || '',
      image: supabaseProduct.image || '',
      images: [], // Będzie pobierane osobno z product_images
      specs: supabaseProduct.specs || {},
      createdAt: supabaseProduct.created_at,
      updatedAt: supabaseProduct.updated_at
    };
  }, []);

  // Konwersja z lokalnego formatu Product do Supabase
  const convertToSupabase = useCallback((product: Product) => {
    return {
      id: product.id,
      model: product.model,
      short_description: product.shortDescription,
      image: product.images?.[0] || product.image,
      specs: product.specs
    };
  }, []);

  // Pobieranie wszystkich produktów z cache'em
  const fetchProducts = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
    
    // Sprawdź cache
    if (!forceRefresh && products.length > 0 && (now - lastFetch) < CACHE_DURATION) {
      console.log('Using cached products data');
      return;
    }

    console.log('Fetching products from Supabase...');
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error: fetchError });

      if (fetchError) {
        console.error('Supabase fetch error:', fetchError);
        throw fetchError;
      }

      if (!data) {
        console.log('No data returned from Supabase');
        setProducts([]);
        return;
      }

      // Pobierz obrazy dla każdego produktu
      const productsWithImages = await Promise.all(
        data.map(async (product) => {
          const { data: images } = await supabase
            .from('product_images')
            .select('image_url')
            .eq('product_id', product.id)
            .order('is_primary', { ascending: false });

          const convertedProduct = convertFromSupabase(product);
          convertedProduct.images = images?.map(img => img.image_url) || [];
          convertedProduct.image = convertedProduct.images[0] || convertedProduct.image || '';
          
          return convertedProduct;
        })
      );

      console.log('Converted products:', productsWithImages);
      setProducts(productsWithImages);
      setLastFetch(now);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Nieznany błąd podczas pobierania produktów');
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać produktów: " + (err.message || 'Nieznany błąd'),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [products.length, lastFetch, convertFromSupabase, toast]);

  // Dodawanie produktu
  const addProduct = useCallback(async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, images: string[] = []) => {
    try {
      const newProduct = {
        ...convertToSupabase({
          ...product,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      };

      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select()
        .single();

      if (error) throw error;

      // Dodaj obrazy
      if (images.length > 0) {
        const imageInserts = images.map((imageUrl, index) => ({
          product_id: data.id,
          image_url: imageUrl,
          is_primary: index === 0
        }));

        await supabase.from('product_images').insert(imageInserts);
      }

      await fetchProducts(true);
      
      toast({
        title: "Sukces",
        description: "Produkt został dodany"
      });
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message,
        variant: "destructive"
      });
    }
  }, [convertToSupabase, fetchProducts, toast]);

  // Aktualizacja produktu
  const updateProduct = useCallback(async (product: Product, images: string[] = []) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(convertToSupabase(product))
        .eq('id', product.id);

      if (error) throw error;

      // Usuń stare obrazy i dodaj nowe
      await supabase.from('product_images').delete().eq('product_id', product.id);
      
      if (images.length > 0) {
        const imageInserts = images.map((imageUrl, index) => ({
          product_id: product.id,
          image_url: imageUrl,
          is_primary: index === 0
        }));

        await supabase.from('product_images').insert(imageInserts);
      }

      await fetchProducts(true);
      
      toast({
        title: "Sukces",
        description: "Produkt został zaktualizowany"
      });
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message,
        variant: "destructive"
      });
    }
  }, [convertToSupabase, fetchProducts, toast]);

  // Usuwanie produktu
  const deleteProduct = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchProducts(true);
      
      toast({
        title: "Sukces",
        description: "Produkt został usunięty"
      });
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message,
        variant: "destructive"
      });
    }
  }, [fetchProducts, toast]);

  // Usuwanie wszystkich produktów
  const deleteAllProducts = useCallback(async () => {
    try {
      // Usuń wszystkie obrazy produktów
      await supabase.from('product_images').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Usuń wszystkie produkty
      const { error } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) throw error;

      await fetchProducts(true);
      
      toast({
        title: "Sukces",
        description: "Wszystkie produkty zostały usunięte"
      });
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message,
        variant: "destructive"
      });
    }
  }, [fetchProducts, toast]);

  // Bulk dodawanie produktów
  const bulkAddProducts = useCallback(async (productsList: any[]) => {
    try {
      const defaultImage = "/lovable-uploads/c6b103db-0f96-4137-9911-80b50af35519.png";
      
      for (const productData of productsList) {
        const newProduct = {
          model: productData.model,
          short_description: `Stan: używany | Rok: ${productData.rok} | Nr seryjny: ${productData.serialNumber}`,
          image: defaultImage,
          specs: {
            productionYear: productData.rok.toString(),
            serialNumber: productData.serialNumber,
            mastLiftingCapacity: productData.udzwigMaszt,
            preliminaryLiftingCapacity: productData.udzwigWstepne,
            workingHours: productData.przebieg,
            liftHeight: productData.podnoszenie,
            minHeight: productData.minWys || '',
            preliminaryLifting: productData.skokSwobodny === 'Tak' ? 'Tak' : 'Nie',
            battery: productData.bateria,
            condition: 'Używany',
            driveType: productData.naped,
            mast: productData.maszt,
            freeStroke: productData.skokSwobodny === 'Tak' ? 'Tak' : 'Brak',
            dimensions: productData.wymiary,
            wheels: '',
            operatorPlatform: productData.podestSkladany === 'Tak' ? 'Tak' : 'Nie',
            additionalOptions: '',
            additionalDescription: ''
          }
        };

        const { data, error } = await supabase
          .from('products')
          .insert([newProduct])
          .select()
          .single();

        if (error) throw error;

        // Dodaj domyślny obraz
        await supabase.from('product_images').insert([{
          product_id: data.id,
          image_url: defaultImage,
          is_primary: true
        }]);
      }

      await fetchProducts(true);
      
      toast({
        title: "Sukces",
        description: `Dodano ${productsList.length} produktów`
      });
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message,
        variant: "destructive"
      });
    }
  }, [fetchProducts, toast]);

  // Optimized realtime subscription
  useEffect(() => {
    fetchProducts();

    const channelName = `products-${Date.now()}`;
    
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'products'
      }, (payload) => {
        console.log('Real-time update detected:', payload);
        // Delay refetch to allow for consistency
        setTimeout(() => fetchProducts(true), 500);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    bulkAddProducts,
    refetch: () => fetchProducts(true)
  };
};
