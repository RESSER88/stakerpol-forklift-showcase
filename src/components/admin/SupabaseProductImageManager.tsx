
import { useState, useCallback } from 'react';
import { Upload, X, Star, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseImageUpload } from '@/hooks/useSupabaseImageUpload';
import { cn } from '@/lib/utils';

interface SupabaseProductImageManagerProps {
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  currentImages?: string[];
  className?: string;
}

const SupabaseProductImageManager = ({ 
  onImagesChange, 
  maxImages = 10, 
  currentImages = [],
  className 
}: SupabaseProductImageManagerProps) => {
  const [images, setImages] = useState<string[]>(currentImages);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const { uploadMultipleImages, deleteImage, uploading } = useSupabaseImageUpload();
  const { toast } = useToast();

  const handleFileSelect = useCallback(async (files: FileList) => {
    if (images.length >= maxImages) {
      toast({
        title: "Limit zdjęć osiągnięty",
        description: `Możesz dodać maksymalnie ${maxImages} zdjęć`,
        variant: "destructive"
      });
      return;
    }

    const filesArray = Array.from(files);
    const remainingSlots = maxImages - images.length;
    const filesToUpload = filesArray.slice(0, remainingSlots);

    try {
      const uploadedUrls = await uploadMultipleImages(filesToUpload);
      const updatedImages = [...images, ...uploadedUrls];
      
      setImages(updatedImages);
      onImagesChange(updatedImages);

      toast({
        title: "Zdjęcia dodane",
        description: `Dodano ${uploadedUrls.length} zdjęć`
      });
    } catch (error) {
      toast({
        title: "Błąd uploadu",
        description: "Nie udało się przesłać wszystkich zdjęć",
        variant: "destructive"
      });
    }
  }, [images, maxImages, onImagesChange, uploadMultipleImages, toast]);

  const removeImage = useCallback(async (index: number) => {
    const imageToDelete = images[index];
    const updatedImages = images.filter((_, i) => i !== index);
    
    setImages(updatedImages);
    onImagesChange(updatedImages);
    
    // Usuń z Supabase Storage
    await deleteImage(imageToDelete);
    
    if (mainImageIndex >= updatedImages.length) {
      setMainImageIndex(Math.max(0, updatedImages.length - 1));
    } else if (index <= mainImageIndex && mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
    }
  }, [images, onImagesChange, deleteImage, mainImageIndex]);

  const setAsMainImage = useCallback((index: number) => {
    setMainImageIndex(index);
    const reorderedImages = [...images];
    const [mainImage] = reorderedImages.splice(index, 1);
    reorderedImages.unshift(mainImage);
    
    setImages(reorderedImages);
    onImagesChange(reorderedImages);
    setMainImageIndex(0);
    
    toast({
      title: "Zdjęcie główne ustawione",
      description: "Wybrane zdjęcie zostało ustawione jako główne"
    });
  }, [images, onImagesChange, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  }, [handleFileSelect]);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="border-2 border-dashed border-gray-300 rounded-lg">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="p-8 text-center hover:border-stakerpol-orange transition-colors"
        >
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-stakerpol-navy">
            Dodaj zdjęcia produktu
          </h3>
          <p className="text-gray-600 mb-4">
            Przeciągnij zdjęcia tutaj lub kliknij, aby wybrać (maksymalnie {maxImages})
          </p>
          
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            className="hidden"
            id="supabase-images-upload"
            disabled={uploading || images.length >= maxImages}
          />
          
          <Button
            type="button"
            className="cta-button"
            asChild
            disabled={uploading || images.length >= maxImages}
          >
            <label htmlFor="supabase-images-upload" className="cursor-pointer">
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Przesyłanie...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Wybierz zdjęcia
                </>
              )}
            </label>
          </Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-stakerpol-navy">
            Przesłane zdjęcia ({images.length}/{maxImages})
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className={cn(
                  "relative aspect-[4/3] bg-white rounded-lg overflow-hidden border-2 transition-all",
                  index === mainImageIndex 
                    ? "border-stakerpol-orange shadow-lg ring-2 ring-stakerpol-orange/20" 
                    : "border-gray-200 hover:border-gray-300"
                )}>
                  <img
                    src={imageUrl}
                    alt={`Zdjęcie produktu ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                  
                  {index === mainImageIndex && (
                    <div className="absolute top-2 left-2 bg-stakerpol-orange text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Główne
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {index !== mainImageIndex && (
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="h-6 w-6 p-0 bg-white/90 hover:bg-white"
                        onClick={() => setAsMainImage(index)}
                      >
                        <Star className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupabaseProductImageManager;
