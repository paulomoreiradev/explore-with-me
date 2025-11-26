import { Search, Sparkles, TrendingUp, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ExperienceCard from "@/components/ExperienceCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: "1",
      title: "Tour Gastronômico no Centro Histórico",
      location: "Salvador, BA",
      duration: "3 horas",
      price: 150,
      rating: 4.9,
      reviewCount: 127,
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      category: "Gastronomia",
      guideName: "Maria Silva",
    },
    {
      id: "2",
      title: "Trilha ao Pôr do Sol na Serra",
      location: "Gramado, RS",
      duration: "4 horas",
      price: 120,
      rating: 4.8,
      reviewCount: 89,
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
      category: "Aventura",
      guideName: "João Santos",
    },
    {
      id: "3",
      title: "Aula de Samba com Passistas",
      location: "Rio de Janeiro, RJ",
      duration: "2 horas",
      price: 90,
      rating: 5.0,
      reviewCount: 203,
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
      category: "Cultura",
      guideName: "Ana Costa",
    },
  ];

  const categories = [
    { icon: "🍽️", name: "Gastronomia", color: "bg-primary" },
    { icon: "🥾", name: "Aventura", color: "bg-accent" },
    { icon: "🎭", name: "Cultura", color: "bg-secondary" },
    { icon: "🏖️", name: "Praia", color: "bg-primary" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Vai Por Mim</h1>
              <p className="text-sm text-muted-foreground">Olá, viajante! 👋</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero text-white font-bold">
                U
              </div>
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar destinos ou experiências..."
              className="pl-10 pr-4"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* AI Recommendations Banner */}
        <Card className="bg-gradient-hero text-white shadow-hover">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-xl font-bold">Recomendações Personalizadas</h2>
                <p className="mb-4 text-sm text-white/90">
                  Baseadas nos seus interesses e histórico de viagens
                </p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => navigate("/itinerary")}
                >
                  Monte seu Roteiro
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <section>
          <h2 className="mb-4 text-xl font-bold">Categorias</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex flex-col items-center gap-2 rounded-xl p-4 transition-smooth hover:bg-muted"
                onClick={() => navigate("/explore")}
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${category.color}`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <span className="text-xs font-medium text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Trending Experiences */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Em Alta</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/explore")}>
              Ver todos
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((exp) => (
              <ExperienceCard
                key={exp.id}
                {...exp}
                onClick={() => navigate(`/experience/${exp.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Nearby Destinations */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold">Perto de Você</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {["São Paulo", "Rio de Janeiro", "Salvador", "Florianópolis"].map((city) => (
              <Badge
                key={city}
                variant="outline"
                className="cursor-pointer whitespace-nowrap px-4 py-2 hover:bg-primary hover:text-primary-foreground"
              >
                {city}
              </Badge>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
