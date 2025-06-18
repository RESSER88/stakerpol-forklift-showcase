
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompactProductTable from '@/components/admin/CompactProductTable';
import AdminLogin from '@/components/admin/AdminLogin';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  // Sprawdź czy użytkownik jest już zalogowany (localStorage)
  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_authenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogin = (password: string) => {
    if (password === "Kacperek2024") {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    toast({
      title: "Wylogowano",
      description: "Zostałeś pomyślnie wylogowany",
    });
  };

  const handleEdit = (product: any) => {
    console.log('Edit product:', product);
  };

  const handleCopy = (product: any) => {
    console.log('Copy product:', product);
  };

  return (
    <Layout>
      <section className="bg-white py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-stakerpol-navy">Panel Administracyjny</h1>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 underline"
              >
                Wyloguj
              </button>
            )}
          </div>
          
          {isAuthenticated ? (
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="products">Zarządzanie Produktami</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products">
                <CompactProductTable onEdit={handleEdit} onCopy={handleCopy} />
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
