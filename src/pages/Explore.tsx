import { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExperienceCard from "@/components/ExperienceCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Todos", color: "bg-primary" },
    { id: "gastronomy", label: "Gastronomia", color: "bg-primary" },
    { id: "adventure", label: "Aventura", color: "bg-accent" },
    { id: "culture", label: "Cultura", color: "bg-secondary" },
    { id: "beach", label: "Praia", color: "bg-accent" },
    { id: "events", label: "Eventos", color: "bg-primary" },
    { id: "accommodation", label: "Hospedagem", color: "bg-accent" },
  ];

  const experiences = [
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
    {
      id: "4",
      title: "Mergulho em Recifes de Corais",
      location: "Porto de Galinhas, PE",
      duration: "5 horas",
      price: 280,
      rating: 4.9,
      reviewCount: 156,
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      category: "Aventura",
      guideName: "Carlos Mendes",
    },
    {
      id: "5",
      title: "Workshop de Cerâmica Indígena",
      location: "Alto Paraíso, GO",
      duration: "3 horas",
      price: 110,
      rating: 4.7,
      reviewCount: 74,
      imageUrl: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&h=600&fit=crop",
      category: "Cultura",
      guideName: "Tainá Oliveira",
    },
    {
      id: "6",
      title: "Tour de Cafés Especiais",
      location: "São Paulo, SP",
      duration: "2.5 horas",
      price: 95,
      rating: 4.8,
      reviewCount: 198,
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      category: "Gastronomia",
      guideName: "Roberto Lima",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <h1 className="mb-4 text-2xl font-bold text-primary">Explorar Experiências</h1>

          <div className="flex gap-2">
            <Input
              placeholder="Buscar por cidade ou atividade..."
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue="relevance">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="price-low">Menor Preço</SelectItem>
                <SelectItem value="price-high">Maior Preço</SelectItem>
                <SelectItem value="rating">Avaliação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Categories Filter */}
      <section className="sticky top-[140px] z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap px-4 py-2 transition-smooth ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-4 text-sm text-muted-foreground">
          {experiences.length} experiências encontradas
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              {...exp}
              onClick={() => navigate(`/experience/${exp.id}`)}
            />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Explore;
