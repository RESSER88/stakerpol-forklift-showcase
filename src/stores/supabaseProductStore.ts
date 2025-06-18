
import { create } from 'zustand';
import { Product } from '@/types';
import { supabase } from '@/integrations/supabase/client';

interface SupabaseProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Cache dla performance
  lastFetch: number;
  shouldRefetch: () => boolean;
}

export const useSupabaseProductStore = create<SupabaseProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  lastFetch: 0,
  
  setProducts: (products) => set({ products, lastFetch: Date.now() }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  // Sprawdź czy dane należy odświeżyć (cache 5 minut)
  shouldRefetch: () => {
    const { lastFetch } = get();
    return Date.now() - lastFetch > 5 * 60 * 1000; // 5 minut
  }
}));
