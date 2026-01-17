import { useState, useMemo } from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ExperienceCard from "@/components/ExperienceCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = [
    { id: "all", label: "Todos" },
    { id: "gastronomia", label: "Gastronomia" },
    { id: "aventura", label: "Aventura" },
    { id: "cultura", label: "Cultura" },
    { id: "praia", label: "Praia" },
    { id: "eventos", label: "Eventos" },
    { id: "hospedagem", label: "Hospedagem" },
  ];

  const experiences = [
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
    {
      id: "4",
      title: "Mergulho num Naufrago",
      location: "Fortaleza, CE",
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
      location: "Aquiraz, CE",
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
      location: "Baturité, CE",
      duration: "2.5 horas",
      price: 95,
      rating: 4.8,
      reviewCount: 198,
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      category: "Gastronomia",
      guideName: "Roberto Lima",
    },
    {
      id: "7",
      title: "Passeio de Buggy nas Dunas",
      location: "Canoa Quebrada, CE",
      duration: "3 horas",
      price: 180,
      rating: 4.9,
      reviewCount: 245,
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      category: "Praia",
      guideName: "Pedro Alves",
    },
    {
      id: "8",
      title: "Festival de Música Regional",
      location: "Fortaleza, CE",
      duration: "6 horas",
      price: 75,
      rating: 4.6,
      reviewCount: 89,
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
      category: "Eventos",
      guideName: "Lucas Ferreira",
    },
  ];

  // Filter and sort experiences
  const filteredExperiences = useMemo(() => {
    let result = [...experiences];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (exp) => exp.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (exp) =>
          exp.title.toLowerCase().includes(query) ||
          exp.location.toLowerCase().includes(query) ||
          exp.category.toLowerCase().includes(query) ||
          exp.guideName.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    result = result.filter(
      (exp) => exp.price >= priceRange[0] && exp.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // relevance - keep original order
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("relevance");
    setPriceRange([0, 500]);
  };

  const hasActiveFilters = selectedCategory !== "all" || searchQuery.trim() || priceRange[0] > 0 || priceRange[1] < 500;

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <SlidersHorizontal className="h-5 w-5" />
                  {hasActiveFilters && (
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription>
                    Refine sua busca por experiências
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Faixa de Preço</Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      step={10}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>R$ {priceRange[0]}</span>
                      <span>R$ {priceRange[1]}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={clearFilters}
                    >
                      Limpar
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => setFiltersOpen(false)}
                    >
                      Aplicar
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
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
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                <X className="mr-1 h-4 w-4" />
                Limpar filtros
              </Button>
            )}
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
          {filteredExperiences.length} experiência{filteredExperiences.length !== 1 ? "s" : ""} encontrada{filteredExperiences.length !== 1 ? "s" : ""}
        </div>

        {filteredExperiences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Filter className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">Nenhuma experiência encontrada</h2>
            <p className="mb-6 text-muted-foreground">
              Tente ajustar os filtros ou buscar por outro termo
            </p>
            <Button onClick={clearFilters}>Limpar Filtros</Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} onClick={() => navigate(`/experience/${exp.id}`)} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Explore;
