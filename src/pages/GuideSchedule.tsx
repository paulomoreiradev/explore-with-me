import { useState } from "react";
import { Calendar, Clock, Users, MapPin, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

interface ScheduleEvent {
  id: string;
  time: string;
  endTime: string;
  title: string;
  customer: string;
  people: number;
  location: string;
  status: "confirmed" | "pending" | "rejected";
}

interface WeekEvent {
  id: string;
  time: string;
  title: string;
  people: number;
  status: "confirmed" | "pending" | "rejected";
}

interface WeekDay {
  date: string;
  events: WeekEvent[];
}

const GuideSchedule = () => {
  const [todaySchedule, setTodaySchedule] = useState<ScheduleEvent[]>([
    {
      id: "1",
      time: "09:00",
      endTime: "12:00",
      title: "Tour Gastronômico no Centro Histórico",
      customer: "João Silva",
      people: 2,
      location: "Praça da Sé",
      status: "confirmed",
    },
    {
      id: "2",
      time: "14:00",
      endTime: "17:00",
      title: "Aula de Culinária Baiana",
      customer: "Maria Santos",
      people: 4,
      location: "Mercado Modelo",
      status: "pending",
    },
  ]);

  const [weekSchedule, setWeekSchedule] = useState<WeekDay[]>([
    {
      date: "Terça, 17 Dez",
      events: [
        { id: "w1", time: "10:00", title: "Caminhada Histórica", people: 3, status: "confirmed" },
      ],
    },
    {
      date: "Quarta, 18 Dez",
      events: [
        { id: "w2", time: "09:00", title: "Tour Gastronômico", people: 2, status: "confirmed" },
        { id: "w3", time: "15:00", title: "Aula de Culinária", people: 6, status: "pending" },
      ],
    },
    {
      date: "Quinta, 19 Dez",
      events: [
        { id: "w4", time: "14:00", title: "Tour Gastronômico", people: 4, status: "confirmed" },
      ],
    },
    {
      date: "Sexta, 20 Dez",
      events: [],
    },
  ]);

  const handleConfirmToday = (eventId: string) => {
    setTodaySchedule((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, status: "confirmed" as const } : event
      )
    );
    toast.success("Reserva confirmada com sucesso!");
  };

  const handleRejectToday = (eventId: string) => {
    setTodaySchedule((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, status: "rejected" as const } : event
      )
    );
    toast.error("Reserva recusada");
  };

  const handleConfirmWeek = (dayIndex: number, eventId: string) => {
    setWeekSchedule((prev) =>
      prev.map((day, idx) =>
        idx === dayIndex
          ? {
              ...day,
              events: day.events.map((event) =>
                event.id === eventId ? { ...event, status: "confirmed" as const } : event
              ),
            }
          : day
      )
    );
    toast.success("Reserva confirmada com sucesso!");
  };

  const handleRejectWeek = (dayIndex: number, eventId: string) => {
    setWeekSchedule((prev) =>
      prev.map((day, idx) =>
        idx === dayIndex
          ? {
              ...day,
              events: day.events.map((event) =>
                event.id === eventId ? { ...event, status: "rejected" as const } : event
              ),
            }
          : day
      )
    );
    toast.error("Reserva recusada");
  };

  const getStatusBadge = (status: string) => {
    if (status === "confirmed") {
      return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Confirmada</Badge>;
    }
    if (status === "rejected") {
      return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Recusada</Badge>;
    }
    return <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">Pendente</Badge>;
  };

  const getStatusIcon = (status: string) => {
    if (status === "confirmed") {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (status === "rejected") {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    return <Clock className="h-4 w-4 text-amber-500" />;
  };

  const confirmedCount = todaySchedule.filter((e) => e.status === "confirmed").length +
    weekSchedule.reduce((acc, day) => acc + day.events.filter((e) => e.status === "confirmed").length, 0);

  const pendingCount = todaySchedule.filter((e) => e.status === "pending").length +
    weekSchedule.reduce((acc, day) => acc + day.events.filter((e) => e.status === "pending").length, 0);

  const totalCount = todaySchedule.length +
    weekSchedule.reduce((acc, day) => acc + day.events.length, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Minha Agenda</h1>
              <p className="text-sm text-muted-foreground">Segunda, 16 de Dezembro</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-primary">
                <Calendar className="mr-1 h-3 w-3" />
                2 hoje
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySchedule.map((event, index) => (
              <div key={event.id}>
                <div className="flex gap-4">
                  {/* Time column */}
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-bold text-primary">{event.time}</div>
                    <div className="h-full w-0.5 bg-border my-1" />
                    <div className="text-xs text-muted-foreground">{event.endTime}</div>
                  </div>

                  {/* Event details */}
                  <div className="flex-1 rounded-lg border border-border p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm">{event.title}</h3>
                      {getStatusBadge(event.status)}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.customer} ({event.people} pessoas)
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                    </div>

                    {event.status === "pending" && (
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1 h-8 bg-primary hover:bg-primary-hover"
                          onClick={() => handleConfirmToday(event.id)}
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Confirmar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 h-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleRejectToday(event.id)}
                        >
                          <XCircle className="mr-1 h-3 w-3" />
                          Recusar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {index < todaySchedule.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Week Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" />
              Próximos Dias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weekSchedule.map((day, index) => (
              <div key={day.date}>
                <div className="flex items-start gap-4">
                  <div className="w-28 shrink-0">
                    <p className="text-sm font-semibold">{day.date}</p>
                  </div>
                  <div className="flex-1">
                    {day.events.length > 0 ? (
                      <div className="space-y-2">
                        {day.events.map((event) => (
                          <div 
                            key={event.id}
                            className="rounded-lg bg-muted/50 px-3 py-2 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-medium text-primary">{event.time}</span>
                                <span className="text-sm">{event.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  <Users className="inline h-3 w-3 mr-1" />
                                  {event.people}
                                </span>
                                {getStatusIcon(event.status)}
                              </div>
                            </div>
                            {event.status === "pending" && (
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="flex-1 h-7 text-xs bg-primary hover:bg-primary-hover"
                                  onClick={() => handleConfirmWeek(index, event.id)}
                                >
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Confirmar
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="flex-1 h-7 text-xs text-destructive hover:bg-destructive/10"
                                  onClick={() => handleRejectWeek(index, event.id)}
                                >
                                  <XCircle className="mr-1 h-3 w-3" />
                                  Recusar
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-border px-3 py-2 text-center">
                        <p className="text-sm text-muted-foreground">Sem eventos</p>
                      </div>
                    )}
                  </div>
                </div>
                {index < weekSchedule.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-primary">{totalCount}</p>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
              <p className="text-xs text-muted-foreground">Confirmadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default GuideSchedule;