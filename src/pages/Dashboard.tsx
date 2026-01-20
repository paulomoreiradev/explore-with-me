import { useState, useRef, useEffect } from "react";
import { Search, Sparkles, TrendingUp, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ExperienceCard from "@/components/ExperienceCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const CEARA_CITIES = [
  "Fortaleza",
  "Jericoacoara",
  "Canoa Quebrada",
  "Guaramiranga",
  "Caucaia",
  "Aracati",
  "Camocim",
  "Sobral",
  "Crato",
  "Juazeiro do Norte",
  "Quixadá",
  "Ubajara",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredCities = CEARA_CITIES.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (city: string) => {
    setSearchQuery(city);
    setShowSuggestions(false);
    navigate(`/explore?city=${encodeURIComponent(city)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?city=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Guaramiranga_Pico_Alto.JPG/1280px-Guaramiranga_Pico_Alto.JPG",
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
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/e1/Apresenta%C3%A7%C3%A3o_de_Forr%C3%B3_%282457934394%29.jpg",
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
      <section className="relative pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop')] bg-cover bg-center opacity-[0.08]" />
        <div className="container relative mx-auto px-4 py-12">
          <div className="mb-6 text-center max-w-4xl mx-auto">
            <h1 className="mb-2 text-4xl font-bold text-white">Vai Por Mim</h1>
            <p className="text-lg text-white/90">Descubra experiências autênticas ✨</p>
          </div>

          <div ref={searchRef} className="relative max-w-4xl mx-auto">
            <form onSubmit={handleSearchSubmit}>
              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground z-10" />
              <Input
                placeholder="Para onde você quer ir?"
                className="h-14 bg-white pl-12 pr-4 text-base shadow-lg"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
            </form>
            {showSuggestions && (searchQuery.length > 0 || filteredCities.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50">
                {searchQuery.length === 0 ? (
                  <div className="p-3 text-sm text-muted-foreground border-b">
                    Destinos populares no Ceará
                  </div>
                ) : filteredCities.length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground text-center">
                    Nenhum destino encontrado
                  </div>
                ) : null}
                <div className="max-h-64 overflow-y-auto">
                  {(searchQuery.length === 0 ? CEARA_CITIES.slice(0, 6) : filteredCities).map((city) => (
                    <button
                      key={city}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors"
                      onClick={() => handleSearch(city)}
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{city}</span>
                      <span className="text-xs text-muted-foreground ml-auto">CE</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
                image: "https://www.sobral.ufc.br/wp-content/uploads/2014/11/800px-MARGEM_ESQUERDA.jpg",
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
