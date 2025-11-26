import { useState } from "react";
import { Plus, Calendar, MapPin, Clock, Trash2, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

interface ItineraryItem {
  id: string;
  title: string;
  time: string;
  duration: string;
  location: string;
  price: number;
  type: string;
}

const Itinerary = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ItineraryItem[]>([
    {
      id: "1",
      title: "Tour Gastronômico",
      time: "09:00",
      duration: "3h",
      location: "Centro Histórico",
      price: 150,
      type: "Gastronomia",
    },
    {
      id: "2",
      title: "Visita ao Museu de Arte",
      time: "14:00",
      duration: "2h",
      location: "Bairro Cultural",
      price: 45,
      type: "Cultura",
    },
  ]);

  const suggestions = [
    {
      id: "3",
      title: "Pôr do Sol na Praia",
      time: "17:30",
      duration: "1.5h",
      location: "Praia do Farol",
      price: 0,
      type: "Lazer",
    },
    {
      id: "4",
      title: "Jantar em Restaurante Local",
      time: "19:30",
      duration: "2h",
      location: "Orla",
      price: 120,
      type: "Gastronomia",
    },
  ];

  const totalCost = items.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item removido",
      description: "O item foi removido do seu roteiro",
    });
  };

  const handleAddSuggestion = (suggestion: ItineraryItem) => {
    setItems([...items, suggestion]);
    toast({
      title: "Item adicionado",
      description: "O item foi adicionado ao seu roteiro",
    });
  };

  const handleSave = () => {
    toast({
      title: "Roteiro salvo!",
      description: "Seu roteiro foi salvo com sucesso",
    });
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
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="destination" 
                    placeholder="Ex: Salvador, BA" 
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  💡 Dica: Comece digitando a cidade
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
                {["Gastronomia", "Cultura", "Aventura", "Praia", "História", "Natureza"].map((interest) => (
                  <Badge
                    key={interest}
                    variant="outline"
                    className="cursor-pointer px-3 py-1.5 hover:bg-primary hover:text-primary-foreground"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                🎯 Selecione seus interesses para recomendações personalizadas
              </p>
            </div>

            <Button className="w-full bg-primary hover:bg-primary-hover">
              <Sparkles className="mr-2 h-4 w-4" />
              Gerar Sugestões com IA
            </Button>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Sugestões Personalizadas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Baseadas nos seus interesses e no tempo disponível
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

        {/* Current Itinerary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Seu Roteiro</CardTitle>
              <Badge variant="outline" className="text-primary">
                {items.length} atividades
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.length === 0 ? (
              <div className="py-12 text-center">
                <Calendar className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Seu roteiro está vazio. Adicione atividades das sugestões acima!
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
          >
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
      </main>

      <BottomNav />
    </div>
  );
};

export default Itinerary;
