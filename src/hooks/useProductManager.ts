
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { useProductStore } from '@/stores/productStore';

export const useProductManager = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const { toast } = useToast();
  
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  
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
    const copiedProduct = {
      ...product,
      id: Date.now().toString(),
      model: `${product.model} (kopia)`,
      specs: {
        ...product.specs,
        serialNumber: ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setSelectedProduct(null);
    setProductImages(product.images || [product.image].filter(Boolean));
    setIsEditDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Czy na pewno chcesz usunąć produkt ${product.model}?`)) {
      deleteProduct(product.id);
      toast({
        title: "Produkt usunięty",
        description: `Pomyślnie usunięto produkt ${product.model}`
      });
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
    
    // Actions
    handleEdit,
    handleAdd,
    handleCopy,
    handleDelete,
    addProduct,
    updateProduct
  };
};
