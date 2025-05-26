
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '@/data/mockData';
import { Product } from '@/types';

// Migration function to add images array and ensure backward compatibility
const migrateProduct = (product: any): Product => {
  return {
    ...product,
    images: product.images || [product.image].filter(Boolean),
    specs: {
      ...product.specs,
      serialNumber: product.specs?.serialNumber || ''
    }
  };
};

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
      products: initialProducts.map(migrateProduct),
      
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, {
            ...product,
            image: product.images?.[0] || product.image,
            images: product.images || [product.image].filter(Boolean)
          }]
        })),
      
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) => 
            p.id === product.id ? {
              ...product,
              image: product.images?.[0] || product.image,
              images: product.images || [product.image].filter(Boolean)
            } : p
          )
        })),
      
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id)
        })),
      
      resetToInitial: () => 
        set(() => ({
          products: initialProducts.map(migrateProduct)
        })),
    }),
    {
      name: 'product-store'
    }
  )
);
