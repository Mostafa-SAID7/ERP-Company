import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjI1NDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <Card className="w-full max-w-md relative animate-scale-in">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl font-bold shadow-lg">
              E
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Enterprise ERP</CardTitle>
          <CardDescription>Sign in to access your account</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Selector */}
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select 
                  id="company"
                  className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="acme">ACME Corporation</option>
                  <option value="tech">TechCorp Industries</option>
                  <option value="global">Global Manufacturing</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="john.smith@company.com"
                className="h-10"
                defaultValue="john.smith@company.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button type="button" variant="link" className="h-auto p-0 text-xs">
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••"
                  className="h-10 pr-10"
                  defaultValue="password123"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="h-4 w-4 rounded border-input"
                defaultChecked
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full h-10" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* MFA Notice */}
          <div className="mt-6 p-3 rounded-lg bg-muted/50 text-center">
            <p className="text-xs text-muted-foreground">
              Multi-factor authentication (MFA) may be required based on your organization's security policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
