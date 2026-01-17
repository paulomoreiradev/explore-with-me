import { ArrowLeft, Star, MapPin, Calendar, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ExperienceCard from "@/components/ExperienceCard";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock guides data
const guidesData: Record<string, any> = {
  "1": {
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
  },
  "2": {
    id: "2",
    name: "João Santos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=João",
    location: "Guaramiranga, CE",
    rating: 4.8,
    reviewCount: 89,
    experienceCount: 4,
    memberSince: "Março 2023",
    verified: true,
    bio: "Guia de trilhas e aventuras há mais de 10 anos. Conheço todos os caminhos secretos da Serra de Guaramiranga. Minha paixão é mostrar a natureza exuberante do Ceará para pessoas de todo o Brasil.",
    languages: ["Português", "Inglês"],
    specialties: ["Aventura", "Trilhas", "Natureza"],
    experiences: [
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
        id: "8",
        title: "Cachoeiras Escondidas",
        location: "Guaramiranga, CE",
        duration: "5 horas",
        price: 180,
        rating: 4.9,
        reviewCount: 56,
        imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&h=600&fit=crop",
        category: "Aventura",
        guideName: "João Santos",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Ana Oliveira",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    location: "Canoa Quebrada, CE",
    rating: 4.7,
    reviewCount: 64,
    experienceCount: 3,
    memberSince: "Junho 2023",
    verified: true,
    bio: "Instrutora de esportes aquáticos e amante da vida praiana. Canoa Quebrada é meu lar e minha inspiração. Venha descobrir as melhores praias e aprender a surfar com as melhores ondas do Ceará!",
    languages: ["Português", "Inglês", "Francês"],
    specialties: ["Praia", "Esportes Aquáticos", "Surf"],
    experiences: [
      {
        id: "3",
        title: "Aula de Surf para Iniciantes",
        location: "Canoa Quebrada, CE",
        duration: "2 horas",
        price: 90,
        rating: 4.7,
        reviewCount: 64,
        imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop",
        category: "Praia",
        guideName: "Ana Oliveira",
      },
      {
        id: "9",
        title: "Passeio de Buggy pelas Dunas",
        location: "Canoa Quebrada, CE",
        duration: "3 horas",
        price: 200,
        rating: 4.9,
        reviewCount: 112,
        imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop",
        category: "Aventura",
        guideName: "Ana Oliveira",
      },
    ],
  },
  "4": {
    id: "4",
    name: "Pedro Almeida",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    location: "Fortaleza, CE",
    rating: 4.9,
    reviewCount: 156,
    experienceCount: 6,
    memberSince: "Dezembro 2022",
    verified: true,
    bio: "Historiador e apaixonado por Fortaleza. Conheço cada esquina, cada prédio histórico e cada história fascinante desta cidade. Faço tours culturais que revelam a alma da capital cearense.",
    languages: ["Português", "Inglês", "Espanhol", "Italiano"],
    specialties: ["História", "Cultura", "Arquitetura"],
    experiences: [
      {
        id: "4",
        title: "Tour Histórico pelo Centro",
        location: "Fortaleza, CE",
        duration: "3 horas",
        price: 100,
        rating: 4.9,
        reviewCount: 156,
        imageUrl: "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=800&h=600&fit=crop",
        category: "Cultura",
        guideName: "Pedro Almeida",
      },
      {
        id: "10",
        title: "Noite Cultural em Fortaleza",
        location: "Fortaleza, CE",
        duration: "4 horas",
        price: 130,
        rating: 4.8,
        reviewCount: 78,
        imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
        category: "Cultura",
        guideName: "Pedro Almeida",
      },
    ],
  },
  "5": {
    id: "5",
    name: "Carla Mendes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla",
    location: "Baturité, CE",
    rating: 4.6,
    reviewCount: 42,
    experienceCount: 2,
    memberSince: "Agosto 2024",
    verified: true,
    bio: "Bióloga e guia de ecoturismo. A Serra de Baturité é meu laboratório natural. Conheça a biodiversidade única da mata atlântica cearense e se encante com a fauna e flora local.",
    languages: ["Português", "Inglês"],
    specialties: ["Natureza", "Ecoturismo", "Observação de Aves"],
    experiences: [
      {
        id: "5",
        title: "Observação de Aves na Serra",
        location: "Baturité, CE",
        duration: "4 horas",
        price: 150,
        rating: 4.6,
        reviewCount: 42,
        imageUrl: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&h=600&fit=crop",
        category: "Natureza",
        guideName: "Carla Mendes",
      },
    ],
  },
  "6": {
    id: "6",
    name: "Roberto Lima",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    location: "Aquiraz, CE",
    rating: 4.8,
    reviewCount: 98,
    experienceCount: 4,
    memberSince: "Abril 2023",
    verified: true,
    bio: "Pescador artesanal há 20 anos e agora compartilho meu conhecimento com turistas. Venha conhecer as técnicas tradicionais de pesca e saborear o peixe mais fresco do litoral!",
    languages: ["Português"],
    specialties: ["Pesca", "Gastronomia", "Tradições Locais"],
    experiences: [
      {
        id: "6",
        title: "Pesca Artesanal com Jangadeiros",
        location: "Aquiraz, CE",
        duration: "5 horas",
        price: 200,
        rating: 4.8,
        reviewCount: 98,
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
        category: "Praia",
        guideName: "Roberto Lima",
      },
    ],
  },
};

const GuideProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  // Get guide by ID or default to first guide
  const guide = id && guidesData[id] ? guidesData[id] : guidesData["1"];

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
                  {guide.languages.map((lang: string) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((spec: string) => (
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
            {guide.experiences.map((exp: any) => (
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
