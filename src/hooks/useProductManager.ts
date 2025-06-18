
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';

export const useProductManager = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const { toast } = useToast();
  
  const { products, addProduct, updateProduct, deleteProduct, loading } = useSupabaseProducts();
  
  const defaultNewProduct: Product = {
    id: '',
    model: '',
    image: '',
    images: [],
    shortDescription: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    specs: {
      productionYear: '',
      mastLiftingCapacity: '',
      preliminaryLiftingCapacity: '',
      workingHours: '',
      liftHeight: '',
      minHeight: '',
      preliminaryLifting: '',
      battery: '',
      condition: '',
      serialNumber: '',
      driveType: '',
      mast: '',
      freeStroke: '',
      dimensions: '',
      wheels: '',
      operatorPlatform: '',
      additionalOptions: '',
      additionalDescription: '',
      capacity: '',
      charger: ''
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setProductImages(product.images || [product.image].filter(Boolean));
    setIsEditDialogOpen(true);
  };
  
  const handleAdd = () => {
    setSelectedProduct(null);
    setProductImages([]);
    setIsEditDialogOpen(true);
  };

  const handleCopy = (product: Product) => {
    const timestamp = new Date().toISOString();
    const dateTimeSuffix = timestamp.replace(/[:.]/g, '-').slice(0, 19);
    
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const copiedProduct = {
      ...product,
      id: uniqueId,
      model: `${product.model} (kopia)`,
      specs: {
        ...product.specs,
        serialNumber: product.specs.serialNumber ? `${product.specs.serialNumber}-COPY-${dateTimeSuffix}` : `COPY-${dateTimeSuffix}`
      },
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    setSelectedProduct(copiedProduct);
    setProductImages(product.images || [product.image].filter(Boolean));
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (confirm(`Czy na pewno chcesz usunąć produkt ${product.model}?`)) {
      await deleteProduct(product.id);
    }
  };

  const handleSave = async (product: Product, images: string[]) => {
    try {
      if (selectedProduct && selectedProduct.id && products.find(p => p.id === selectedProduct.id)) {
        // Aktualizacja istniejącego produktu
        await updateProduct({...product, images}, images);
      } else {
        // Dodanie nowego produktu
        await addProduct({
          model: product.model,
          shortDescription: product.shortDescription,
          image: images[0] || '', // Dodaj brakującą właściwość image
          specs: product.specs,
          images: images
        }, images);
      }
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return {
    // State
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedProduct,
    productImages,
    setProductImages,
    viewMode,
    setViewMode,
    products,
    defaultNewProduct,
    loading,
    
    // Actions
    handleEdit,
    handleAdd,
    handleCopy,
    handleDelete,
    handleSave
  };
};
