import { useState, useEffect } from "react";
import { Plus, Calendar, MapPin, Clock, Trash2, Save, Sparkles, Loader2, Map, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ItineraryItem {
  id: string;
  title: string;
  time: string;
  duration: string;
  location: string;
  price: number;
  type: string;
}

// Mock cities data (simulating API)
const mockCities = [
  { id: "1", name: "Fortaleza", state: "CE" },
  { id: "2", name: "Jijoca de Jericoacoara", state: "CE" },
  { id: "3", name: "Canoa Quebrada", state: "CE" },
  { id: "4", name: "Guaramiranga", state: "CE" },
  { id: "5", name: "Aquiraz", state: "CE" },
  { id: "6", name: "Baturité", state: "CE" },
  { id: "7", name: "Caucaia", state: "CE" },
  { id: "8", name: "Aracati", state: "CE" },
  { id: "9", name: "Camocim", state: "CE" },
  { id: "10", name: "Sobral", state: "CE" },
  { id: "11", name: "Crato", state: "CE" },
  { id: "12", name: "Juazeiro do Norte", state: "CE" },
];

const Itinerary = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<ItineraryItem[]>([]);
  const [showMapModal, setShowMapModal] = useState(false);

  const interests = ["Gastronomia", "Cultura", "Aventura", "Praia", "História", "Natureza"];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const totalCost = items.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast({
      title: "Item removido",
      description: "O item foi removido do seu roteiro",
    });
  };

  const handleAddSuggestion = (suggestion: ItineraryItem) => {
    // Check if item already exists
    const exists = items.some((item) => item.id === suggestion.id);
    if (exists) {
      toast({
        title: "Item já adicionado",
        description: "Esta atividade já está no seu roteiro",
        variant: "destructive",
      });
      return;
    }

    // Create a new item with a unique ID
    const newItem: ItineraryItem = {
      ...suggestion,
      id: `${suggestion.id}-${Date.now()}`, // Make ID unique
    };

    setItems((prevItems) => [...prevItems, newItem]);
    toast({
      title: "Item adicionado",
      description: "O item foi adicionado ao seu roteiro",
    });
  };

  const generateAISuggestions = () => {
    if (!selectedCity) {
      toast({
        title: "Selecione um destino",
        description: "Escolha uma cidade para gerar sugestões personalizadas",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation with a delay
    setTimeout(() => {
      const cityName = mockCities.find((c) => c.id === selectedCity)?.name || "Destino";
      
      const generatedSuggestions: ItineraryItem[] = [
        {
          id: `ai-${Date.now()}-1`,
          title: `Café da Manhã em ${cityName}`,
          time: "08:00",
          duration: "1h",
          location: `Centro de ${cityName}`,
          price: 45,
          type: selectedInterests.includes("Gastronomia") ? "Gastronomia" : "Lazer",
        },
        {
          id: `ai-${Date.now()}-2`,
          title: selectedInterests.includes("Praia") 
            ? `Passeio nas Praias de ${cityName}`
            : `Tour Cultural em ${cityName}`,
          time: "10:00",
          duration: "3h",
          location: cityName,
          price: selectedInterests.includes("Praia") ? 80 : 60,
          type: selectedInterests.includes("Praia") ? "Praia" : "Cultura",
        },
        {
          id: `ai-${Date.now()}-3`,
          title: "Almoço Típico Regional",
          time: "13:00",
          duration: "1.5h",
          location: `Restaurante Local - ${cityName}`,
          price: 75,
          type: "Gastronomia",
        },
        {
          id: `ai-${Date.now()}-4`,
          title: selectedInterests.includes("Aventura")
            ? "Trilha ao Pôr do Sol"
            : "Passeio pelo Centro Histórico",
          time: "16:00",
          duration: "2h",
          location: cityName,
          price: selectedInterests.includes("Aventura") ? 100 : 40,
          type: selectedInterests.includes("Aventura") ? "Aventura" : "História",
        },
        {
          id: `ai-${Date.now()}-5`,
          title: "Jantar com Música ao Vivo",
          time: "19:30",
          duration: "2.5h",
          location: `Orla de ${cityName}`,
          price: 120,
          type: "Gastronomia",
        },
      ];

      setSuggestions(generatedSuggestions);
      setIsGenerating(false);

      toast({
        title: "Sugestões geradas!",
        description: `Criamos ${generatedSuggestions.length} atividades personalizadas para você`,
      });
    }, 2000);
  };

  const handleSave = () => {
    if (items.length === 0) {
      toast({
        title: "Roteiro vazio",
        description: "Adicione pelo menos uma atividade antes de salvar",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    const savedItinerary = {
      id: crypto.randomUUID(),
      city: selectedCity,
      date: selectedDate,
      items,
      totalCost,
      createdAt: new Date().toISOString(),
    };

    const existingItineraries = JSON.parse(localStorage.getItem("vai-por-mim-itineraries") || "[]");
    localStorage.setItem("vai-por-mim-itineraries", JSON.stringify([savedItinerary, ...existingItineraries]));

    toast({
      title: "Roteiro salvo!",
      description: "Seu roteiro foi salvo com sucesso",
    });

    // Navigate to bookings page
    navigate("/bookings");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Monte seu Roteiro</h1>
          <p className="text-sm text-muted-foreground">Planeje sua viagem perfeita</p>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Trip Info */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" />
              Informações da Viagem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-base font-semibold">
                  Destino
                </Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Selecione uma cidade" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {mockCities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}, {city.state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  💡 Dica: Selecione a cidade que deseja visitar
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="text-base font-semibold">
                  Data
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="date" 
                    type="date" 
                    className="pl-10"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  📅 Selecione quando pretende viajar
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interests" className="text-base font-semibold">
                Interesses
              </Label>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-1.5 transition-smooth ${
                      selectedInterests.includes(interest)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary hover:text-primary-foreground"
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                🎯 Selecione seus interesses para recomendações personalizadas
              </p>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary-hover"
              onClick={generateAISuggestions}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando sugestões...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Gerar Sugestões com IA
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        {suggestions.length > 0 && (
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Sugestões Personalizadas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Baseadas nos seus interesses e no destino selecionado
              </p>
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{suggestion.title}</h4>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {suggestion.time}
                        </span>
                        <span>•</span>
                        <span>{suggestion.duration}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {suggestion.location}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {suggestion.type}
                        </Badge>
                        <span className="text-sm font-semibold text-primary">
                          R$ {suggestion.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddSuggestion(suggestion)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Itinerary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Seu Roteiro</CardTitle>
              <Badge variant="outline" className="text-primary">
                {items.length} atividade{items.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.length === 0 ? (
              <div className="py-12 text-center">
                <Calendar className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Seu roteiro está vazio. Gere sugestões com IA e adicione atividades!
                </p>
              </div>
            ) : (
              <>
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-border p-4 transition-smooth hover:shadow-card"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.title}</h4>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="ml-11 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{item.time} • {item.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{item.location}</span>
                      </div>
                      <p className="font-semibold text-foreground">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Summary */}
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">Custo Total Estimado</span>
                    <span className="text-xl font-bold text-primary">
                      R$ {totalCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            disabled={items.length === 0}
            onClick={() => setShowMapModal(true)}
          >
            <Map className="mr-2 h-4 w-4" />
            Visualizar no Mapa
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary-hover"
            onClick={handleSave}
            disabled={items.length === 0}
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar Roteiro
          </Button>
        </div>

        {/* Map Modal */}
        <Dialog open={showMapModal} onOpenChange={setShowMapModal}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Mapa do Roteiro
              </DialogTitle>
            </DialogHeader>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              {/* Placeholder Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
                <svg viewBox="0 0 400 300" className="h-full w-full opacity-30">
                  {/* Grid lines */}
                  {[...Array(10)].map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={i * 30}
                      x2="400"
                      y2={i * 30}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-muted-foreground"
                    />
                  ))}
                  {[...Array(14)].map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={i * 30}
                      y1="0"
                      x2={i * 30}
                      y2="300"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-muted-foreground"
                    />
                  ))}
                  {/* Decorative roads */}
                  <path
                    d="M0 150 Q100 120 200 150 T400 150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-primary/40"
                  />
                  <path
                    d="M200 0 Q180 100 200 150 T220 300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-primary/40"
                  />
                </svg>
              </div>
              
              {/* Itinerary points */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-full w-full">
                  {items.map((item, index) => {
                    // Calculate positions in a circular pattern
                    const angle = (index / items.length) * 2 * Math.PI - Math.PI / 2;
                    const radius = Math.min(35, 80 / items.length);
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    
                    return (
                      <div
                        key={item.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 cursor-pointer group"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg">
                          {index + 1}
                        </div>
                        <div className="absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-xs font-medium shadow-md opacity-0 transition-opacity group-hover:opacity-100">
                          {item.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Overlay message */}
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/90 p-3 backdrop-blur-sm">
                <p className="text-center text-sm text-muted-foreground">
                  🗺️ Mapa interativo em breve! Por enquanto, veja os {items.length} pontos do seu roteiro.
                </p>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Pontos do Roteiro:</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2 text-sm">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <span className="truncate">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <BottomNav />
    </div>
  );
};

export default Itinerary;
