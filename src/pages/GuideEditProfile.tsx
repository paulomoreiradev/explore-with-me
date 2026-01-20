import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Plus, X, Upload, CheckCircle, Clock, AlertCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

interface GuideProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  specialties: string[];
  languages: string[];
  certifications: string[];
  photos: string[];
  verificationStatus: "pending" | "verified" | "rejected";
  documents: {
    id: string;
    name: string;
    status: "pending" | "approved" | "rejected";
  }[];
}

const SPECIALTIES_OPTIONS = [
  "Gastronomia", "História", "Cultura Local", "Trilhas", "Fotografia",
  "Aventura", "Praia", "Ecoturismo", "Arte", "Arquitetura", "Vida Noturna"
];

const LANGUAGES_OPTIONS = [
  "Português", "Inglês", "Espanhol", "Francês", "Italiano", "Alemão"
];

const GuideEditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<GuideProfile>({
    name: "Maria Silva",
    email: "guia@demo.com",
    phone: "(85) 99999-9999",
    bio: "Guia local apaixonada por compartilhar a cultura e gastronomia cearense. Com mais de 5 anos de experiência, ofereço experiências autênticas e personalizadas.",
    specialties: ["Gastronomia", "História", "Cultura Local"],
    languages: ["Português", "Inglês"],
    certifications: ["Cadastur", "Guia de Turismo Regional"],
    photos: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    ],
    verificationStatus: "verified",
    documents: [
      { id: "1", name: "RG/CPF", status: "approved" },
      { id: "2", name: "Cadastur", status: "approved" },
      { id: "3", name: "Comprovante de Residência", status: "pending" },
    ],
  });

  const [newCertification, setNewCertification] = useState("");

  const handleSpecialtyToggle = (specialty: string) => {
    setProfile(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleAddCertification = () => {
    if (newCertification.trim() && !profile.certifications.includes(newCertification.trim())) {
      setProfile(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification("");
    }
  };

  const handleRemoveCertification = (cert: string) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== cert)
    }));
  };

  const handleSave = () => {
    toast({
      title: "Perfil atualizado!",
      description: "Suas alterações foram salvas com sucesso.",
    });
    navigate("/profile");
  };

  const handleUploadDocument = () => {
    toast({
      title: "Upload iniciado",
      description: "Seu documento está sendo enviado para verificação.",
    });
    // Mock: add new pending document
    setProfile(prev => ({
      ...prev,
      documents: [...prev.documents, { 
        id: crypto.randomUUID(), 
        name: "Novo Documento", 
        status: "pending" 
      }]
    }));
  };

  const getVerificationBadge = () => {
    switch (profile.verificationStatus) {
      case "verified":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verificado
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Em Análise
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
            <AlertCircle className="h-3 w-3 mr-1" />
            Documentação Pendente
          </Badge>
        );
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">Editar Perfil</h1>
            </div>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Verification Status */}
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Status de Verificação</CardTitle>
              {getVerificationBadge()}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Documentos necessários para validar seu perfil como guia local verificado.
            </p>
            <div className="space-y-2">
              {profile.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">{doc.name}</span>
                  {getDocumentStatusIcon(doc.status)}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full" onClick={handleUploadDocument}>
              <Upload className="h-4 w-4 mr-2" />
              Enviar Novo Documento
            </Button>
          </CardContent>
        </Card>

        {/* Profile Photo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Foto de Perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="h-28 w-28">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Guide" />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input 
                id="name" 
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone" 
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea 
                id="bio" 
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                placeholder="Conte um pouco sobre você e sua experiência como guia..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Photos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fotos do Portfólio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {profile.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <img 
                    src={photo} 
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => setProfile(prev => ({
                      ...prev,
                      photos: prev.photos.filter((_, i) => i !== index)
                    }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <button
                className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-primary/50 transition-colors"
                onClick={() => toast({ title: "Funcionalidade de upload", description: "Upload de fotos em breve!" })}
              >
                <Plus className="h-8 w-8 text-muted-foreground" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Especialidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES_OPTIONS.map((specialty) => (
                <Badge
                  key={specialty}
                  variant={profile.specialties.includes(specialty) ? "default" : "outline"}
                  className="cursor-pointer transition-all"
                  onClick={() => handleSpecialtyToggle(specialty)}
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Idiomas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES_OPTIONS.map((language) => (
                <Badge
                  key={language}
                  variant={profile.languages.includes(language) ? "default" : "outline"}
                  className="cursor-pointer transition-all"
                  onClick={() => handleLanguageToggle(language)}
                >
                  {language}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Certificações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {profile.certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="gap-1">
                  {cert}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => handleRemoveCertification(cert)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Adicionar certificação..."
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCertification()}
              />
              <Button variant="outline" onClick={handleAddCertification}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default GuideEditProfile;
