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

const Auth = () => {
  const [userType, setUserType] = useState<"traveler" | "guide" | "entrepreneur">("traveler");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login realizado!",
      description: "Bem-vindo ao Vai Por Mim",
    });
    navigate("/dashboard");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cadastro realizado!",
      description: "Sua conta foi criada com sucesso",
    });
    navigate("/dashboard");
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
