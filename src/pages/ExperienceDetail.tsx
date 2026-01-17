import { useState } from "react";
import { ArrowLeft, Star, MapPin, Clock, Users, Calendar, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { useFavorites, FavoriteExperience } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/use-toast";

// Mock experiences data
const experiencesData: Record<string, any> = {
  "1": {
    id: "1",
    title: "Tour Gastronômico",
    location: "Jijoca de Jericoacoara, CE",
    duration: "3 horas",
    price: 150,
    rating: 4.9,
    reviewCount: 127,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=800&fit=crop",
    category: "Gastronomia",
    guideName: "Maria Silva",
    guideId: "1",
    guideAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    maxPeople: 8,
    description:
      "Descubra os sabores autênticos da culinária Cearense em um tour pelos melhores restaurantes do litoral oeste do Ceará. Uma experiência única que combina gastronomia, história e cultura local.",
    included: [
      "Degustação em 5 estabelecimentos locais",
      "Guia especializado em gastronomia cearense",
      "Água mineral durante o passeio",
      "Material informativo sobre a culinária local",
    ],
    schedule: [
      "09:00 - Encontro na Igreja Matriz",
      "09:30 - Primeira parada: Tapioca da Regina",
      "10:30 - Mercado Municipal",
      "11:30 - Almoço em restaurante típico",
      "12:30 - Encerramento",
    ],
    reviews: [
      {
        id: "1",
        author: "João Pedro",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=João",
        rating: 5,
        date: "15 dias atrás",
        comment:
          "Experiência incrível! A Maria é uma guia excepcional e conhece cada cantinho da cidade. A comida estava maravilhosa!",
      },
      {
        id: "2",
        author: "Ana Carolina",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
        rating: 5,
        date: "1 mês atrás",
        comment:
          "Melhor tour gastronômico que já fiz! Super recomendo para quem quer conhecer a verdadeira culinária cearense.",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Trilha ao Pôr do Sol na Serra",
    location: "Guaramiranga, CE",
    duration: "4 horas",
    price: 120,
    rating: 4.8,
    reviewCount: 89,
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop",
    category: "Aventura",
    guideName: "João Santos",
    guideId: "2",
    guideAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=João",
    maxPeople: 12,
    description:
      "Uma trilha inesquecível pela Serra de Guaramiranga, culminando em um pôr do sol espetacular. Perfeita para amantes da natureza e aventura.",
    included: [
      "Guia especializado em trilhas",
      "Equipamentos de segurança",
      "Lanche energético",
      "Transporte do ponto de encontro",
    ],
    schedule: [
      "15:00 - Encontro no centro de Guaramiranga",
      "15:30 - Início da trilha",
      "17:00 - Chegada ao mirante",
      "18:00 - Contemplação do pôr do sol",
      "19:00 - Retorno",
    ],
    reviews: [
      {
        id: "1",
        author: "Mariana Lima",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
        rating: 5,
        date: "3 dias atrás",
        comment: "Paisagens deslumbrantes! O João conhece todos os melhores pontos para fotos.",
      },
    ],
  },
};

const defaultExperience = {
  id: "1",
  title: "Tour Gastronômico",
  location: "Jijoca de Jericoacoara, CE",
  duration: "3 horas",
  price: 150,
  rating: 4.9,
  reviewCount: 127,
  imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=800&fit=crop",
  category: "Gastronomia",
  guideName: "Maria Silva",
  guideId: "1",
  guideAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  maxPeople: 8,
  description:
    "Descubra os sabores autênticos da culinária Cearense em um tour pelos melhores restaurantes do litoral oeste do Ceará. Uma experiência única que combina gastronomia, história e cultura local.",
  included: [
    "Degustação em 5 estabelecimentos locais",
    "Guia especializado em gastronomia cearense",
    "Água mineral durante o passeio",
    "Material informativo sobre a culinária local",
  ],
  schedule: [
    "09:00 - Encontro na Igreja Matriz",
    "09:30 - Primeira parada: Tapioca da Regina",
    "10:30 - Mercado Municipal",
    "11:30 - Almoço em restaurante típico",
    "12:30 - Encerramento",
  ],
  reviews: [
    {
      id: "1",
      author: "João Pedro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=João",
      rating: 5,
      date: "15 dias atrás",
      comment:
        "Experiência incrível! A Maria é uma guia excepcional e conhece cada cantinho da cidade. A comida estava maravilhosa!",
    },
    {
      id: "2",
      author: "Ana Carolina",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      rating: 5,
      date: "1 mês atrás",
      comment:
        "Melhor tour gastronômico que já fiz! Super recomendo para quem quer conhecer a verdadeira culinária cearense.",
    },
  ],
};

const ExperienceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();

  const experience = id && experiencesData[id] ? experiencesData[id] : defaultExperience;
  const [isLiked, setIsLiked] = useState(isFavorite(experience.id));

  const handleFavorite = () => {
    const favoriteData: FavoriteExperience = {
      id: experience.id,
      title: experience.title,
      location: experience.location,
      duration: experience.duration,
      price: experience.price,
      rating: experience.rating,
      reviewCount: experience.reviewCount,
      imageUrl: experience.imageUrl,
      category: experience.category,
      guideName: experience.guideName,
    };

    const added = toggleFavorite(favoriteData);
    setIsLiked(added);
    
    toast({
      title: added ? "Adicionado aos favoritos" : "Removido dos favoritos",
      description: added 
        ? `${experience.title} foi salvo na sua lista de favoritos`
        : `${experience.title} foi removido da sua lista`,
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: experience.title,
      text: `Confira essa experiência incrível: ${experience.title} em ${experience.location}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para a área de transferência",
        });
      }
    } catch (error) {
      // User cancelled share
    }
  };

  const handleViewGuideProfile = () => {
    navigate(`/guide-profile/${experience.guideId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Image Header */}
      <div className="relative h-80 w-full">
        <img src={experience.imageUrl} alt={experience.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-4 shadow-lg"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="absolute right-4 top-4 flex gap-2">
          <Button 
            variant="secondary" 
            size="icon" 
            className="shadow-lg"
            onClick={handleFavorite}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="shadow-lg"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Badge className="absolute bottom-4 left-4 bg-accent text-accent-foreground">{experience.category}</Badge>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="mb-6">
          <h1 className="mb-3 text-3xl font-bold">{experience.title}</h1>

          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{experience.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Até {experience.maxPeople} pessoas</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-secondary text-secondary" />
              <span className="text-lg font-bold">{experience.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({experience.reviewCount} avaliações)</span>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Guide Info */}
        <Card className="mb-6">
          <CardContent className="flex items-center gap-4 p-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={experience.guideAvatar} />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">Experiência oferecida por</h3>
              <p className="text-lg font-bold text-primary">{experience.guideName}</p>
              <p className="text-sm text-muted-foreground">Guia local verificada</p>
            </div>
            <Button variant="outline" onClick={handleViewGuideProfile}>Ver Perfil</Button>
          </CardContent>
        </Card>

        {/* Description */}
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Sobre esta experiência</h2>
          <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
        </section>

        {/* What's Included */}
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">O que está incluído</h2>
          <ul className="space-y-2">
            {experience.included.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Schedule */}
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Programação</h2>
          <div className="space-y-3">
            {experience.schedule.map((item: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-6" />

        {/* Reviews */}
        <section className="mb-20">
          <h2 className="mb-4 text-xl font-bold">Avaliações</h2>
          <div className="space-y-4">
            {experience.reviews.map((review: any) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm text-muted-foreground">A partir de</p>
            <p className="text-2xl font-bold text-primary">
              R$ {experience.price.toFixed(2)}
              <span className="text-sm font-normal text-muted-foreground"> / pessoa</span>
            </p>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary-hover" onClick={() => navigate("/payment")}>
            Reservar Agora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;
