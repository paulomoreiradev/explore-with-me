import { ArrowLeft, Star, MapPin, Calendar, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ExperienceCard from "@/components/ExperienceCard";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const GuideProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  // Mock guide data
  const guide = {
    id: "1",
    name: "Maria Silva",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    location: "Jijoca de Jericoacoara, CE",
    rating: 4.9,
    reviewCount: 127,
    experienceCount: 5,
    memberSince: "Janeiro 2024",
    verified: true,
    bio: "Apaixonada pela culinária cearense e pela cultura local. Nascida e criada em Jericoacoara, conheço cada cantinho desta terra maravilhosa. Adoro compartilhar os segredos gastronômicos e culturais da nossa região com viajantes de todo o mundo.",
    languages: ["Português", "Inglês", "Espanhol"],
    specialties: ["Gastronomia", "Cultura Local", "História"],
  experiences: [
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
        id: "7",
        title: "Café da Manhã Típico",
        location: "Jijoca de Jericoacoara, CE",
        duration: "1.5 horas",
        price: 80,
        rating: 4.8,
        reviewCount: 89,
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
        category: "Gastronomia",
        guideName: "Maria Silva",
      },
    ],
  };

  const handleChat = () => {
    navigate(`/chat/${guide.id}`);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary to-accent" />
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-4 shadow-lg"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <main className="container mx-auto max-w-2xl px-4">
        {/* Profile Header */}
        <div className="-mt-16 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="mb-4 h-24 w-24 border-4 border-background">
                  <AvatarImage src={guide.avatar} />
                  <AvatarFallback>{guide.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{guide.name}</h1>
                  {guide.verified && (
                    <Shield className="h-5 w-5 fill-primary text-primary" />
                  )}
                </div>
                <Badge variant="secondary" className="mt-2">
                  Guia Local Verificado
                </Badge>
                <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{guide.location}</span>
                </div>

                <div className="mt-4 grid w-full grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-5 w-5 fill-secondary text-secondary" />
                      <span className="text-xl font-bold">{guide.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{guide.reviewCount} avaliações</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{guide.experienceCount}</p>
                    <p className="text-xs text-muted-foreground">Experiências</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">Desde {guide.memberSince}</p>
                  </div>
                </div>

                <Button className="mt-6 w-full" onClick={handleChat}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bio */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="mb-3 font-semibold">Sobre</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{guide.bio}</p>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div>
                <h3 className="mb-2 text-sm font-semibold">Idiomas</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((lang) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((spec) => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experiences */}
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-bold">Experiências de {guide.name.split(" ")[0]}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {guide.experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                {...exp}
                onClick={() => navigate(`/experience/${exp.id}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuideProfile;
