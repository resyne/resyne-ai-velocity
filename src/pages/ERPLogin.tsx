import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import resyneLogo from "@/assets/resyne-logo-main.png";

export default function ERPLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);

    try {
      if (isRegister) {
        const { error } = await signUp(email.trim(), password.trim());
        if (error) {
          toast({
            title: "Errore di registrazione",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registrazione completata",
            description: "Controlla la tua email per confermare l'account.",
          });
          setIsRegister(false);
        }
      } else {
        const { error } = await signIn(email.trim(), password.trim());
        if (error) {
          toast({
            title: "Errore di accesso",
            description: "Credenziali non valide. Riprova.",
            variant: "destructive",
          });
        } else {
          navigate("/erp");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast({
        title: "Errore",
        description: "Si è verificato un errore imprevisto. Riprova.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50">
        <CardHeader className="text-center space-y-4">
          <img src={resyneLogo} alt="Resyne" className="h-10 mx-auto" />
          <CardTitle className="font-heading text-xl">
            {isRegister ? "Registrazione ERP" : "Accesso ERP"}
          </CardTitle>
          <p className="text-muted-foreground text-sm">Area riservata gestione progetti</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@esempio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? isRegister ? "Registrazione..." : "Accesso in corso..."
                : isRegister ? "Registrati" : "Accedi"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isRegister ? "Hai già un account? Accedi" : "Non hai un account? Registrati"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
