import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const navigate = useNavigate();

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      experience: "Tour Gastronômico",
      experienceImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      rating: 5,
      date: "15/01/2026",
      comment: "Experiência incrível! Recomendo muito para quem quer conhecer a culinária local.",
    },
    {
      id: "2",
      experience: "Trilha ao Pôr do Sol",
      experienceImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
      rating: 4,
      date: "10/01/2026",
      comment: "Paisagens lindas, guia muito atencioso. Só achei um pouco puxado o ritmo.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">Minhas Avaliações</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-6 space-y-4">
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Star className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">Nenhuma avaliação ainda</h2>
            <p className="mb-6 text-muted-foreground">
              Após participar de experiências, você poderá avaliá-las aqui
            </p>
            <Button onClick={() => navigate("/explore")}>
              Explorar Experiências
            </Button>
          </div>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={review.experienceImage}
                    alt={review.experience}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{review.experience}</h3>
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-secondary text-secondary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Reviews;
