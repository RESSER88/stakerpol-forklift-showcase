
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '@/data/mockData';
import { Product } from '@/types';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetToInitial: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: initialProducts,
      
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product]
        })),
      
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) => 
            p.id === product.id ? product : p
          )
        })),
      
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id)
        })),
      
      resetToInitial: () => 
        set(() => ({
          products: initialProducts
        })),
    }),
    {
      name: 'product-store'
    }
  )
);
