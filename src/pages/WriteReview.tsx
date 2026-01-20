import { useState } from "react";
import { ArrowLeft, Star, Camera, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const WriteReview = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { toast } = useToast();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock experience data
  const experience = {
    title: "Tour Gastronômico",
    date: "18/01/2026",
    guideName: "Maria Silva",
    guideAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
  };

  const ratingLabels = ["", "Péssimo", "Ruim", "Regular", "Bom", "Excelente"];

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Avaliação necessária",
        description: "Por favor, selecione uma nota de 1 a 5 estrelas.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Avaliação enviada!",
      description: "Obrigado por compartilhar sua experiência.",
    });
    
    navigate("/reviews");
  };

  const handleAddPhoto = () => {
    // Mock adding a photo
    const mockPhotos = [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    ];
    if (photos.length < 3) {
      setPhotos([...photos, mockPhotos[photos.length]]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Avaliar Experiência</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-lg px-4 py-6 space-y-6">
        {/* Experience Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src={experience.image}
                alt={experience.title}
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{experience.title}</h2>
                <p className="text-sm text-muted-foreground">{experience.date}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={experience.guideAvatar} />
                    <AvatarFallback>{experience.guideName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{experience.guideName}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Label className="text-lg font-semibold">Como foi sua experiência?</Label>
              <div className="flex justify-center gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="transition-transform hover:scale-110"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`h-10 w-10 ${
                        star <= (hoverRating || rating)
                          ? "fill-secondary text-secondary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {(hoverRating || rating) > 0 && (
                <p className="mt-2 text-lg font-medium text-primary">
                  {ratingLabels[hoverRating || rating]}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Comment */}
        <Card>
          <CardContent className="pt-6">
            <Label htmlFor="comment" className="text-lg font-semibold">
              Conte mais sobre sua experiência
            </Label>
            <p className="text-sm text-muted-foreground mb-4">
              Sua avaliação ajudará outros viajantes a escolherem suas experiências.
            </p>
            <Textarea
              id="comment"
              placeholder="O que você mais gostou? O que poderia ser melhor? O guia foi atencioso?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
            />
            <p className="text-xs text-muted-foreground mt-2 text-right">
              {comment.length}/500 caracteres
            </p>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card>
          <CardContent className="pt-6">
            <Label className="text-lg font-semibold">Adicionar fotos (opcional)</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Compartilhe momentos da sua experiência.
            </p>
            <div className="flex gap-2 flex-wrap">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Review photo ${index + 1}`}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {photos.length < 3 && (
                <button
                  type="button"
                  className="h-20 w-20 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-primary/50 transition-colors"
                  onClick={handleAddPhoto}
                >
                  <Camera className="h-6 w-6 text-muted-foreground" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          className="w-full bg-primary hover:bg-primary-hover"
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Enviando..."
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Enviar Avaliação
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Sua avaliação será pública e poderá ajudar outros viajantes.
        </p>
      </main>
    </div>
  );
};

export default WriteReview;
