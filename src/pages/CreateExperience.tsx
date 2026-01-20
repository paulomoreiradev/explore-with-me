import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Upload, MapPin, Clock, DollarSign, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const CATEGORIES = [
  "Gastronomia",
  "Cultura",
  "Aventura",
  "Arte",
  "História",
  "Natureza",
  "Música",
  "Esportes",
];

const LANGUAGES = ["Português", "Inglês", "Espanhol", "Francês", "Alemão", "Italiano"];

const CreateExperience = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    address: "",
    category: "",
    duration: "",
    price: "",
    maxParticipants: "",
    minParticipants: "1",
    whatToBring: "",
    included: "",
    notIncluded: "",
    meetingPoint: "",
    cancellationPolicy: "flexible",
    instantBooking: true,
  });
  
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["Português"]);
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
  ]);
  const [availability, setAvailability] = useState({
    monday: { active: true, times: ["09:00", "14:00"] },
    tuesday: { active: true, times: ["09:00", "14:00"] },
    wednesday: { active: true, times: ["09:00", "14:00"] },
    thursday: { active: true, times: ["09:00", "14:00"] },
    friday: { active: true, times: ["09:00", "14:00"] },
    saturday: { active: true, times: ["10:00"] },
    sunday: { active: false, times: [] },
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const addPhoto = () => {
    // Mock: In real app, this would open file picker
    const mockPhotos = [
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
    ];
    const randomPhoto = mockPhotos[Math.floor(Math.random() * mockPhotos.length)];
    setPhotos((prev) => [...prev, randomPhoto]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleDayAvailability = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], active: !prev[day as keyof typeof prev].active },
    }));
  };

  const addTimeSlot = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        times: [...prev[day as keyof typeof prev].times, "12:00"],
      },
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        times: prev[day as keyof typeof prev].times.filter((_, i) => i !== index),
      },
    }));
  };

  const updateTimeSlot = (day: string, index: number, value: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        times: prev[day as keyof typeof prev].times.map((t, i) => (i === index ? value : t)),
      },
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title || !formData.description || !formData.location || !formData.category || !formData.price) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock saving to localStorage
    const newExperience = {
      id: Date.now().toString(),
      ...formData,
      languages: selectedLanguages,
      photos,
      availability,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    const existingExperiences = JSON.parse(localStorage.getItem("guideExperiences") || "[]");
    localStorage.setItem("guideExperiences", JSON.stringify([...existingExperiences, newExperience]));

    setIsSubmitting(false);
    toast.success("Experiência criada com sucesso! Aguardando aprovação.");
    navigate("/guide-dashboard");
  };

  const dayNames: Record<string, string> = {
    monday: "Segunda",
    tuesday: "Terça",
    wednesday: "Quarta",
    thursday: "Quinta",
    friday: "Sexta",
    saturday: "Sábado",
    sunday: "Domingo",
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/guide-dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Nova Experiência</h1>
              <p className="text-sm text-muted-foreground">Preencha os detalhes</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-6 space-y-6">
        {/* Photos Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Fotos da Experiência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                  <img src={photo} alt={`Foto ${index + 1}`} className="h-full w-full object-cover" />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <Badge className="absolute bottom-1 left-1 text-xs">Capa</Badge>
                  )}
                </div>
              ))}
              <button
                onClick={addPhoto}
                className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-muted transition-colors"
              >
                <Plus className="h-8 w-8 text-muted-foreground" />
              </button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Adicione pelo menos 3 fotos. A primeira será a capa.
            </p>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título da Experiência *</Label>
              <Input
                id="title"
                placeholder="Ex: Tour Gastronômico pelo Centro Histórico"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                placeholder="Descreva sua experiência em detalhes. O que os participantes vão fazer, ver e aprender?"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Idiomas</Label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <Badge
                    key={lang}
                    variant={selectedLanguages.includes(lang) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleLanguage(lang)}
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Localização
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Cidade / Região *</Label>
              <Input
                id="location"
                placeholder="Ex: Salvador, BA"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço Completo</Label>
              <Input
                id="address"
                placeholder="Ex: Rua das Laranjeiras, 123 - Pelourinho"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingPoint">Ponto de Encontro</Label>
              <Input
                id="meetingPoint"
                placeholder="Ex: Em frente à Igreja de São Francisco"
                value={formData.meetingPoint}
                onChange={(e) => handleInputChange("meetingPoint", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Duration & Participants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Duração e Participantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duração *</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => handleInputChange("duration", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hora</SelectItem>
                    <SelectItem value="2h">2 horas</SelectItem>
                    <SelectItem value="3h">3 horas</SelectItem>
                    <SelectItem value="4h">4 horas</SelectItem>
                    <SelectItem value="5h">5 horas</SelectItem>
                    <SelectItem value="6h">6 horas</SelectItem>
                    <SelectItem value="dia">Dia inteiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Máx. Participantes *</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  min="1"
                  placeholder="Ex: 10"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minParticipants">Mín. Participantes</Label>
              <Input
                id="minParticipants"
                type="number"
                min="1"
                placeholder="Ex: 1"
                value={formData.minParticipants}
                onChange={(e) => handleInputChange("minParticipants", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Preço
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço por Pessoa (R$) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex: 150.00"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">Reserva Instantânea</p>
                <p className="text-sm text-muted-foreground">
                  Reservas são confirmadas automaticamente
                </p>
              </div>
              <Switch
                checked={formData.instantBooking}
                onCheckedChange={(checked) => handleInputChange("instantBooking", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancellationPolicy">Política de Cancelamento</Label>
              <Select
                value={formData.cancellationPolicy}
                onValueChange={(value) => handleInputChange("cancellationPolicy", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flexible">Flexível - Reembolso total até 24h antes</SelectItem>
                  <SelectItem value="moderate">Moderada - Reembolso total até 5 dias antes</SelectItem>
                  <SelectItem value="strict">Rigorosa - Reembolso de 50% até 7 dias antes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Disponibilidade Semanal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(availability).map(([day, config]) => (
              <div key={day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={config.active}
                      onCheckedChange={() => toggleDayAvailability(day)}
                    />
                    <span className={config.active ? "font-medium" : "text-muted-foreground"}>
                      {dayNames[day]}
                    </span>
                  </div>
                  {config.active && (
                    <Button variant="ghost" size="sm" onClick={() => addTimeSlot(day)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Horário
                    </Button>
                  )}
                </div>
                {config.active && config.times.length > 0 && (
                  <div className="ml-12 flex flex-wrap gap-2">
                    {config.times.map((time, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => updateTimeSlot(day, index, e.target.value)}
                          className="w-28"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeTimeSlot(day, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="included">O que está incluso</Label>
              <Textarea
                id="included"
                placeholder="Ex: Degustação de 5 pratos típicos, água e sobremesa"
                rows={2}
                value={formData.included}
                onChange={(e) => handleInputChange("included", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notIncluded">O que não está incluso</Label>
              <Textarea
                id="notIncluded"
                placeholder="Ex: Bebidas alcoólicas, transporte até o ponto de encontro"
                rows={2}
                value={formData.notIncluded}
                onChange={(e) => handleInputChange("notIncluded", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatToBring">O que os participantes devem trazer</Label>
              <Textarea
                id="whatToBring"
                placeholder="Ex: Roupa confortável, protetor solar, câmera fotográfica"
                rows={2}
                value={formData.whatToBring}
                onChange={(e) => handleInputChange("whatToBring", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary-hover"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Criando..." : "Criar Experiência"}
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CreateExperience;
