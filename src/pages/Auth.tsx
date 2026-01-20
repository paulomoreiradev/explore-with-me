import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, Lock, User, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock users for demo
const MOCK_USERS = {
  traveler: {
    email: "viajante@demo.com",
    password: "123456",
    name: "Maria Viajante",
    type: "traveler" as const,
  },
  guide: {
    email: "guia@demo.com",
    password: "123456",
    name: "João Guia",
    type: "guide" as const,
  },
};

const Auth = () => {
  const [userType, setUserType] = useState<"traveler" | "guide" | "entrepreneur">("traveler");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for mock users
    const traveler = MOCK_USERS.traveler;
    const guide = MOCK_USERS.guide;
    
    if (email === traveler.email && password === traveler.password) {
      localStorage.setItem("currentUser", JSON.stringify(traveler));
      toast({
        title: "Login realizado!",
        description: `Bem-vinda, ${traveler.name}!`,
      });
      navigate("/dashboard");
      return;
    }
    
    if (email === guide.email && password === guide.password) {
      localStorage.setItem("currentUser", JSON.stringify(guide));
      toast({
        title: "Login realizado!",
        description: `Bem-vindo, ${guide.name}!`,
      });
      navigate("/guide-dashboard");
      return;
    }
    
    // Default login (treat as traveler)
    const defaultUser = { email, name: "Usuário", type: "traveler" as const };
    localStorage.setItem("currentUser", JSON.stringify(defaultUser));
    toast({
      title: "Login realizado!",
      description: "Bem-vindo ao Vai Por Mim",
    });
    navigate("/dashboard");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      email,
      name: "Novo Usuário",
      type: userType,
    };
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    toast({
      title: "Cadastro realizado!",
      description: "Sua conta foi criada com sucesso",
    });
    
    if (userType === "guide") {
      navigate("/guide-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-hover">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero">
            <Plane className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Vai Por Mim</CardTitle>
          <CardDescription>Descubra do Seu Jeito!</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Demo Users Info */}
          <div className="mb-4 rounded-lg bg-muted/50 p-3 text-sm">
            <p className="font-semibold text-primary mb-2">Usuários Demo:</p>
            <div className="space-y-1 text-muted-foreground">
              <p>🧳 Viajante: viajante@demo.com / 123456</p>
              <p>🎯 Guia: guia@demo.com / 123456</p>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
                  Entrar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Tipo de Perfil</Label>
                  <RadioGroup value={userType} onValueChange={(value: any) => setUserType(value)}>
                    <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="traveler" id="traveler" />
                      <Label htmlFor="traveler" className="flex-1 cursor-pointer">
                        Viajante
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="guide" id="guide" />
                      <Label htmlFor="guide" className="flex-1 cursor-pointer">
                        Guia Local
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="entrepreneur" id="entrepreneur" />
                      <Label htmlFor="entrepreneur" className="flex-1 cursor-pointer">
                        Empreendedor
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
                  Criar Conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
