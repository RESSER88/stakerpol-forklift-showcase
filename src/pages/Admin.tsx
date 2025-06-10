
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductManager from '@/components/admin/ProductManager';
import AdminLogin from '@/components/admin/AdminLogin';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  const handleLogin = (password: string) => {
    // W prawdziwym systemie powinieneś używać bezpiecznej metody uwierzytelniania
    // To jest tylko proste demo dla wizualizacji
    if (password === "Kacperek2024") {
      setIsAuthenticated(true);
      toast({
        title: "Zalogowano pomyślnie",
        description: "Witaj w panelu administracyjnym",
      });
    } else {
      toast({
        title: "Błąd logowania",
        description: "Nieprawidłowe hasło",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <section className="bg-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-6 text-stakerpol-navy">Panel Administracyjny</h1>
          
          {isAuthenticated ? (
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="products">Zarządzanie Produktami</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products">
                <ProductManager />
              </TabsContent>
            </Tabs>
          ) : (
            <AdminLogin onLogin={handleLogin} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
