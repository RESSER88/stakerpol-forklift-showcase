
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md shadow-lg border-stakerpol-navy/20">
        <CardHeader className="text-center">
          <Lock className="mx-auto h-12 w-12 text-stakerpol-orange mb-2" />
          <CardTitle className="text-2xl">Logowanie do panelu</CardTitle>
          <CardDescription>
            Wprowadź hasło, aby uzyskać dostęp do panelu administracyjnego
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full cta-button">
                Zaloguj się
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>Dla demo: hasło to "admin123"</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
