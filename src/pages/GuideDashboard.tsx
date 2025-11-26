import { Plus, Calendar, DollarSign, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const GuideDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Experiências Ativas", value: "5", icon: BarChart3, color: "text-primary" },
    { label: "Reservas este Mês", value: "23", icon: Calendar, color: "text-accent" },
    { label: "Ganhos este Mês", value: "R$ 3.450", icon: DollarSign, color: "text-secondary" },
    { label: "Avaliação Média", value: "4.9", icon: CheckCircle, color: "text-primary" },
  ];

  const experiences = [
    {
      id: "1",
      title: "Tour Gastronômico no Centro Histórico",
      status: "Ativa",
      bookings: 12,
      revenue: 1800,
      rating: 4.9,
    },
    {
      id: "2",
      title: "Aula de Culinária Baiana",
      status: "Ativa",
      bookings: 8,
      revenue: 960,
      rating: 5.0,
    },
    {
      id: "3",
      title: "Caminhada Histórica",
      status: "Pendente",
      bookings: 3,
      revenue: 240,
      rating: 4.7,
    },
  ];

  const upcomingBookings = [
    {
      id: "1",
      customer: "João Silva",
      experience: "Tour Gastronômico",
      date: "15 Dez",
      time: "09:00",
      people: 2,
      status: "Confirmada",
    },
    {
      id: "2",
      customer: "Maria Santos",
      experience: "Aula de Culinária",
      date: "16 Dez",
      time: "14:00",
      people: 4,
      status: "Pendente",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Dashboard do Guia</h1>
              <p className="text-sm text-muted-foreground">Gerencie suas experiências</p>
            </div>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              Nova Experiência
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* My Experiences */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Experiências</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="rounded-lg border border-border p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{exp.title}</h3>
                          <Badge
                            variant={exp.status === "Ativa" ? "default" : "secondary"}
                            className="mt-2"
                          >
                            {exp.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Reservas</p>
                          <p className="font-semibold">{exp.bookings}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Receita</p>
                          <p className="font-semibold text-primary">R$ {exp.revenue}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avaliação</p>
                          <p className="font-semibold">⭐ {exp.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Bookings */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id}>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{booking.customer}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.experience}
                            </p>
                          </div>
                          <Badge
                            variant={booking.status === "Confirmada" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{booking.date} • {booking.time}</span>
                          <span>{booking.people} pessoas</span>
                        </div>
                        {booking.status === "Pendente" && (
                          <Button size="sm" className="w-full bg-primary hover:bg-primary-hover">
                            Confirmar
                          </Button>
                        )}
                      </div>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default GuideDashboard;
