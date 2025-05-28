
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
    },
    createdAt: product.createdAt || new Date().toISOString(),
    updatedAt: product.updatedAt || new Date().toISOString()
  };
};

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetToInitial: () => void;
  getFeaturedProducts: (count?: number) => Product[];
  getRecentProducts: (count?: number) => Product[];
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts.map(migrateProduct),
      
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, {
            ...product,
            image: product.images?.[0] || product.image,
            images: product.images || [product.image].filter(Boolean),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }]
        })),
      
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) => 
            p.id === product.id ? {
              ...product,
              image: product.images?.[0] || product.image,
              images: product.images || [product.image].filter(Boolean),
              updatedAt: new Date().toISOString()
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

      getFeaturedProducts: (count = 3) => {
        const { products } = get();
        if (products.length === 0) return [];
        
        // Mix of recent and random products
        const sortedByDate = [...products].sort((a, b) => 
          new Date(b.updatedAt || b.createdAt || 0).getTime() - 
          new Date(a.updatedAt || a.createdAt || 0).getTime()
        );
        
        // Take 2 most recent and 1 random from the rest
        const recent = sortedByDate.slice(0, Math.min(2, count));
        const remaining = sortedByDate.slice(2);
        
        if (remaining.length > 0 && recent.length < count) {
          const randomIndex = Math.floor(Math.random() * remaining.length);
          recent.push(remaining[randomIndex]);
        }
        
        // If we still need more products, add from the beginning
        while (recent.length < count && recent.length < products.length) {
          const nextProduct = sortedByDate.find(p => !recent.includes(p));
          if (nextProduct) recent.push(nextProduct);
          else break;
        }
        
        return recent.slice(0, count);
      },

      getRecentProducts: (count = 3) => {
        const { products } = get();
        return [...products]
          .sort((a, b) => 
            new Date(b.updatedAt || b.createdAt || 0).getTime() - 
            new Date(a.updatedAt || a.createdAt || 0).getTime()
          )
          .slice(0, count);
      }
    }),
    {
      name: 'product-store',
      version: 1
    }
  )
);
