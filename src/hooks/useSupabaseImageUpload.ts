
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSupabaseImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;

    // Sprawdź rozmiar pliku (max 5MB na plik)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Błąd",
        description: "Plik jest za duży (max 5MB)",
        variant: "destructive"
      });
      return null;
    }

    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Błąd uploadu",
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(file => uploadImage(file));
    const results = await Promise.all(uploadPromises);
    return results.filter(url => url !== null) as string[];
  };

  const deleteImage = async (url: string) => {
    try {
      const fileName = url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('product-images')
          .remove([fileName]);
      }
    } catch (error: any) {
      console.error('Error deleting image:', error);
    }
  };

  return {
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    uploading
  };
};
