import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/ExperienceCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">Favoritos</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">Nenhum favorito ainda</h2>
            <p className="mb-6 text-muted-foreground">
              Explore experiências e salve suas favoritas aqui
            </p>
            <Button onClick={() => navigate("/explore")}>
              Explorar Experiências
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              {favorites.length} experiência{favorites.length !== 1 ? "s" : ""} salva{favorites.length !== 1 ? "s" : ""}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  id={exp.id}
                  title={exp.title}
                  location={exp.location}
                  duration={exp.duration}
                  price={exp.price}
                  rating={exp.rating}
                  reviewCount={exp.reviewCount}
                  imageUrl={exp.imageUrl}
                  category={exp.category}
                  guideName={exp.guideName}
                  onClick={() => navigate(`/experience/${exp.id}`)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Favorites;
