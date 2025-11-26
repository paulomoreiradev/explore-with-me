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
      title: "Tour Gastronômico",
      location: "Jijoca de Jericoacoara, CE",
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
      location: "Guaramiranga, CE",
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
      title: "Aula de Forró",
      location: "Fortaleza, CE",
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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop')] bg-cover bg-center opacity-[0.08]" />
        <div className="container relative mx-auto px-4 py-12">
          <div className="mb-6 text-center max-w-4xl mx-auto">
            <h1 className="mb-2 text-4xl font-bold text-white">Vai Por Mim</h1>
            <p className="text-lg text-white/90">Descubra experiências autênticas ✨</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Para onde você quer ir?" className="h-14 bg-white pl-12 pr-4 text-base shadow-lg" />
          </div>

          <div className="mt-6 flex gap-3 justify-center overflow-x-auto pb-2 max-w-4xl mx-auto">
            {["🌊 Praias", "🏔️ Montanhas", "🍴 Gastronomia", "🎭 Cultura"].map((tag) => (
              <Badge
                key={tag}
                className="cursor-pointer whitespace-nowrap bg-white px-4 py-2 text-primary shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="cursor-pointer border-2 border-transparent transition-smooth hover:border-primary hover:shadow-card"
            onClick={() => navigate("/itinerary")}
          >
            <CardContent className="p-4">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold">Monte seu Roteiro</h3>
              <p className="text-xs text-muted-foreground">IA personalizada</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer border-2 border-transparent transition-smooth hover:border-primary hover:shadow-card"
            onClick={() => navigate("/explore")}
          >
            <CardContent className="p-4">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold">Explorar</h3>
              <p className="text-xs text-muted-foreground">Descubra locais</p>
            </CardContent>
          </Card>
        </div>

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
              <ExperienceCard key={exp.id} {...exp} onClick={() => navigate(`/experience/${exp.id}`)} />
            ))}
          </div>
        </section>

        {/* Nearby Destinations */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-bold">Perto de Você</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/explore")}>
              Ver mais
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                name: "Caucaia",
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
              },
              {
                name: "Aracati",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
              },
              {
                name: "Camocim",
                image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop",
              },
              {
                name: "Sobral",
                image: "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=400&h=300&fit=crop",
              },
            ].map((city) => (
              <Card
                key={city.name}
                className="cursor-pointer overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg"
                onClick={() => navigate(`/explore?city=${encodeURIComponent(city.name)}`)}
              >
                <div className="relative h-32">
                  <img src={city.image} alt={city.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 text-lg font-bold text-white">{city.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
