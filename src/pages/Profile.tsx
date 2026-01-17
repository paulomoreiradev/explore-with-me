import { Settings, Heart, Calendar, Star, LogOut, ChevronRight, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { icon: Calendar, label: "Minhas Reservas", path: "/bookings" },
    { icon: Route, label: "Meus Roteiros", path: "/my-itineraries" },
    { icon: Heart, label: "Favoritos", path: "/favorites" },
    { icon: Star, label: "Avaliações", path: "/reviews" },
    { icon: Settings, label: "Configurações", path: "/settings" },
  ];

  const stats = [
    { label: "Viagens", value: "12" },
    { label: "Avaliações", value: "8" },
    { label: "Salvos", value: "24" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Até a próxima viagem!",
    });
    navigate("/");
  };

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
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">Usuário Viajante</h2>
              <p className="text-muted-foreground">usuario@email.com</p>
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

        {/* Interests */}
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
