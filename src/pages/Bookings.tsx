import { Calendar, MapPin, Clock, Users, MoreVertical, Star, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BottomNav from "@/components/BottomNav";
import { useBookings, Booking } from "@/hooks/useBookings";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const statusConfig = {
  confirmed: { label: "Confirmada", variant: "default" as const },
  pending: { label: "Pendente", variant: "secondary" as const },
  completed: { label: "Concluída", variant: "outline" as const },
  cancelled: { label: "Cancelada", variant: "destructive" as const },
};

const BookingCard = ({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: (id: string) => void;
}) => {
  const status = statusConfig[booking.status];
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-40 w-full sm:h-auto sm:w-40 flex-shrink-0">
          <img
            src={booking.imageUrl}
            alt={booking.experience}
            className="h-full w-full object-cover"
          />
          <Badge
            variant={status.variant}
            className="absolute left-2 top-2 sm:hidden"
          >
            {status.label}
          </Badge>
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold line-clamp-1">
                  {booking.experience}
                </h3>
                <Badge variant={status.variant} className="hidden sm:inline-flex">
                  {status.label}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{booking.location}</span>
              </div>
            </div>
            {booking.status === "confirmed" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onCancel(booking.id)}
                  >
                    Cancelar Reserva
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{booking.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-primary" />
              <span>
                {booking.people} {booking.people === 1 ? "pessoa" : "pessoas"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Total:</span>
              <span className="ml-2 font-bold text-primary">
                R$ {booking.total.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-2">
              {booking.status === "completed" && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate(`/write-review/${booking.id}`)}
                >
                  <Star className="mr-1 h-4 w-4" />
                  Avaliar
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/experience/1")}
              >
                Ver Detalhes
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const Bookings = () => {
  const { bookings, cancelBooking } = useBookings();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCancel = (id: string) => {
    cancelBooking(id);
    toast({
      title: "Reserva cancelada",
      description: "Sua reserva foi cancelada com sucesso.",
    });
  };

  const upcomingBookings = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Minhas Reservas</h1>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
              3
            </span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-6">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Calendar className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h2 className="mb-2 text-xl font-semibold">
              Nenhuma reserva ainda
            </h2>
            <p className="mb-6 text-muted-foreground">
              Explore experiências incríveis e faça sua primeira reserva!
            </p>
            <Button onClick={() => navigate("/explore")}>
              Explorar Experiências
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {upcomingBookings.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-semibold">Próximas</h2>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={handleCancel}
                    />
                  ))}
                </div>
              </section>
            )}

            {pastBookings.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-semibold">Histórico</h2>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={handleCancel}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Bookings;
