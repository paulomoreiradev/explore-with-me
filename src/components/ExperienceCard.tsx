import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ExperienceCardProps {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  guideName: string;
  onClick?: () => void;
}

const ExperienceCard = ({
  title,
  location,
  duration,
  price,
  rating,
  reviewCount,
  imageUrl,
  category,
  guideName,
  onClick,
}: ExperienceCardProps) => {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-smooth hover:shadow-hover"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
          {category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="line-clamp-2 text-lg font-bold text-foreground">{title}</h3>
        </div>
        
        <div className="mb-3 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="mb-3 flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="font-semibold">{rating}</span>
          </div>
          <span className="text-muted-foreground">({reviewCount} avaliações)</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">por {guideName}</p>
            <p className="text-xl font-bold text-primary">
              R$ {price.toFixed(2)}
            </p>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary-hover">
            Ver Mais
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
