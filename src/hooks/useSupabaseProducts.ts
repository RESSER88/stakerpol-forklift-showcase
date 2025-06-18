
import { useState, useEffect } from 'react';
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

  // Konwersja z formatu Supabase do lokalnego formatu Product
  const convertFromSupabase = (supabaseProduct: SupabaseProduct): Product => {
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
  };

  // Konwersja z lokalnego formatu Product do Supabase
  const convertToSupabase = (product: Product) => {
    return {
      id: product.id,
      model: product.model,
      short_description: product.shortDescription,
      image: product.images?.[0] || product.image,
      specs: product.specs
    };
  };

  // Pobieranie wszystkich produktów
  const fetchProducts = async () => {
    console.log('Fetching products from Supabase...'); // Debug log
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error: fetchError }); // Debug log

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

      console.log('Converted products:', productsWithImages); // Debug log
      setProducts(productsWithImages);
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
  };

  // Dodawanie produktu
  const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, images: string[] = []) => {
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

      await fetchProducts();
      
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
  };

  // Aktualizacja produktu
  const updateProduct = async (product: Product, images: string[] = []) => {
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

      await fetchProducts();
      
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
  };

  // Usuwanie produktu
  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchProducts();
      
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
  };

  // Nasłuchiwanie zmian real-time
  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel('products-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'products'
      }, () => {
        console.log('Real-time update detected, refetching products...');
        fetchProducts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  };
};
