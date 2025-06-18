
-- Tworzenie tabeli produktów
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model TEXT NOT NULL,
  short_description TEXT,
  image TEXT, -- dla kompatybilności wstecznej
  specs JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tworzenie tabeli obrazów produktów
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  file_name TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Włączenie Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Polityki RLS - dla teraz wszystkie operacje są publiczne (można później ograniczyć do admina)
CREATE POLICY "Allow all operations on products" ON public.products
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on product_images" ON public.product_images
FOR ALL USING (true) WITH CHECK (true);

-- Bucket dla obrazów produktów
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);

-- Polityki storage - publiczny dostęp do odczytu i zapisu
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Public upload access" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Public update access" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Public delete access" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Włączenie real-time dla tabeli produktów
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER TABLE public.product_images REPLICA IDENTITY FULL;

-- Dodanie tabel do publikacji realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.product_images;

-- Funkcja aktualizacji updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger dla automatycznej aktualizacji updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
