import { useState, useEffect } from "react";
import { Settings, Heart, Calendar, Star, LogOut, ChevronRight, Map, Plus, BarChart3, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CurrentUser {
  email: string;
  name: string;
  type: "traveler" | "guide" | "entrepreneur";
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    } else {
      // Default to traveler if no user data
      setCurrentUser({
        email: "usuario@email.com",
        name: "Usuário Viajante",
        type: "traveler",
      });
    }
  }, []);

  const isGuide = currentUser?.type === "guide";

  // Menu items for travelers
  const travelerMenuItems = [
    { icon: Calendar, label: "Minhas Reservas", path: "/bookings" },
    { icon: Map, label: "Meus Roteiros", path: "/my-itineraries" },
    { icon: Heart, label: "Favoritos", path: "/favorites" },
    { icon: Star, label: "Avaliações", path: "/reviews" },
    { icon: Settings, label: "Configurações", path: "/settings" },
  ];

  // Menu items for guides
  const guideMenuItems = [
    { icon: BarChart3, label: "Dashboard do Guia", path: "/guide-dashboard" },
    { icon: Plus, label: "Criar Experiência", path: "/guide-dashboard" },
    { icon: Calendar, label: "Minhas Reservas", path: "/bookings" },
    { icon: Users, label: "Meus Clientes", path: "/bookings" },
    { icon: MessageSquare, label: "Mensagens", path: "/chat/1" },
    { icon: Star, label: "Minhas Avaliações", path: "/reviews" },
    { icon: Settings, label: "Configurações", path: "/settings" },
  ];

  const menuItems = isGuide ? guideMenuItems : travelerMenuItems;

  // Stats for travelers
  const travelerStats = [
    { label: "Viagens", value: "12" },
    { label: "Avaliações", value: "8" },
    { label: "Salvos", value: "24" },
  ];

  // Stats for guides
  const guideStats = [
    { label: "Experiências", value: "5" },
    { label: "Reservas", value: "47" },
    { label: "Avaliação", value: "4.9" },
  ];

  const stats = isGuide ? guideStats : travelerStats;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Logout realizado",
      description: "Até a próxima viagem!",
    });
    navigate("/");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Perfil</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* User Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isGuide ? 'Guide' : 'Traveler'}`} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                <Badge variant={isGuide ? "default" : "secondary"} className="text-xs">
                  {isGuide ? "Guia Local" : "Viajante"}
                </Badge>
              </div>
              <p className="text-muted-foreground">{currentUser.email}</p>
              <Button variant="outline" size="sm" className="mt-4">
                Editar Perfil
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guide Quick Actions */}
        {isGuide && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="mb-4 font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Resumo Rápido
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-background p-3 text-center">
                  <p className="text-lg font-bold text-primary">R$ 3.450</p>
                  <p className="text-xs text-muted-foreground">Ganhos este mês</p>
                </div>
                <div className="rounded-lg bg-background p-3 text-center">
                  <p className="text-lg font-bold text-accent">3</p>
                  <p className="text-xs text-muted-foreground">Reservas pendentes</p>
                </div>
              </div>
              <Button 
                className="w-full mt-4 bg-primary hover:bg-primary-hover"
                onClick={() => navigate("/guide-dashboard")}
              >
                Ir para Dashboard Completo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Interests (only for travelers) */}
        {!isGuide && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 font-semibold">Meus Interesses</h3>
              <div className="flex flex-wrap gap-2">
                {["Gastronomia", "Aventura", "Cultura", "Praia", "História", "Fotografia"].map((interest) => (
                  <div
                    key={interest}
                    className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Specialties (only for guides) */}
        {isGuide && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 font-semibold">Minhas Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {["Gastronomia", "História", "Cultura Local", "Trilhas", "Fotografia"].map((specialty) => (
                  <div
                    key={specialty}
                    className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
                  >
                    {specialty}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Menu */}
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <div key={item.label}>
                <button
                  className="flex w-full items-center justify-between p-4 transition-smooth hover:bg-muted/50"
                  onClick={() => navigate(item.path)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                {index < menuItems.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sair
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
