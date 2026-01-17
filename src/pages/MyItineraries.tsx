import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, MapPin, Clock, Trash2, ChevronRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ItineraryItem {
  id: string;
  title: string;
  time: string;
  duration: string;
  location: string;
  price: number;
  type: string;
}

interface SavedItinerary {
  id: string;
  city: string;
  date: string;
  items: ItineraryItem[];
  totalCost: number;
  createdAt: string;
}

// Mock cities data (same as Itinerary page)
const mockCities: Record<string, string> = {
  "1": "Fortaleza",
  "2": "Jijoca de Jericoacoara",
  "3": "Canoa Quebrada",
  "4": "Guaramiranga",
  "5": "Aquiraz",
  "6": "Baturité",
  "7": "Caucaia",
  "8": "Aracati",
  "9": "Camocim",
  "10": "Sobral",
  "11": "Crato",
  "12": "Juazeiro do Norte",
};

const MyItineraries = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [itineraries, setItineraries] = useState<SavedItinerary[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<SavedItinerary | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("vai-por-mim-itineraries");
    if (saved) {
      setItineraries(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = itineraries.filter((it) => it.id !== id);
    setItineraries(updated);
    localStorage.setItem("vai-por-mim-itineraries", JSON.stringify(updated));
    setSelectedItinerary(null);
    toast({
      title: "Roteiro excluído",
      description: "O roteiro foi removido com sucesso",
    });
  };

  const handleCheckout = (itinerary: SavedItinerary) => {
    // Save itinerary data to localStorage for payment page
    localStorage.setItem("vai-por-mim-checkout-itinerary", JSON.stringify({
      type: "itinerary",
      id: itinerary.id,
      city: getCityName(itinerary.city),
      date: itinerary.date,
      items: itinerary.items,
      totalCost: itinerary.totalCost,
    }));
    navigate("/payment");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data não definida";
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getCityName = (cityId: string) => {
    return mockCities[cityId] || "Destino não definido";
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Meus Roteiros</h1>
            <p className="text-sm text-muted-foreground">
              {itineraries.length} roteiro{itineraries.length !== 1 ? "s" : ""} salvo{itineraries.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-6">
        {itineraries.length === 0 ? (
          <Card className="py-12">
            <CardContent className="text-center">
              <Calendar className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-semibold">Nenhum roteiro salvo</h2>
              <p className="mb-6 text-muted-foreground">
                Crie seu primeiro roteiro e ele aparecerá aqui
              </p>
              <Button onClick={() => navigate("/itinerary")}>
                Criar Roteiro
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {itineraries.map((itinerary) => (
              <Card 
                key={itinerary.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedItinerary?.id === itinerary.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedItinerary(
                  selectedItinerary?.id === itinerary.id ? null : itinerary
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">
                          {getCityName(itinerary.city)}
                        </CardTitle>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(itinerary.date)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        {itinerary.items.length} atividade{itinerary.items.length !== 1 ? "s" : ""}
                      </Badge>
                      <p className="mt-1 text-lg font-bold text-primary">
                        R$ {itinerary.totalCost.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {selectedItinerary?.id === itinerary.id && (
                  <CardContent className="pt-4">
                    <div className="mb-4 space-y-3">
                      {itinerary.items.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-lg border border-border p-3"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.title}</p>
                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {item.time}
                              </span>
                              <span>•</span>
                              <span>{item.duration}</span>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                            </div>
                          </div>
                          <p className="font-semibold text-primary">
                            R$ {item.price.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckout(itinerary);
                        }}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Reservar Roteiro
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir roteiro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. O roteiro será permanentemente excluído.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(itinerary.id)}
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                )}

                {selectedItinerary?.id !== itinerary.id && (
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Toque para ver detalhes</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Create New Button */}
        <div className="mt-6">
          <Button 
            className="w-full"
            onClick={() => navigate("/itinerary")}
          >
            Criar Novo Roteiro
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default MyItineraries;