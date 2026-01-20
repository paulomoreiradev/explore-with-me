import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Calendar, MessageSquare, Star, CreditCard, CheckCircle, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

interface Notification {
  id: string;
  type: "booking" | "message" | "review" | "payment" | "system";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "Reserva Confirmada!",
    description: "Sua reserva para 'Tour Gastronômico' com Maria Silva foi confirmada para 20/01 às 14h.",
    timestamp: "Há 10 min",
    read: false,
    actionUrl: "/bookings",
  },
  {
    id: "2",
    type: "message",
    title: "Nova mensagem de Maria Silva",
    description: "Olá! Estou animada para o nosso tour de amanhã. Lembre-se de trazer...",
    timestamp: "Há 30 min",
    read: false,
    actionUrl: "/chat/1",
  },
  {
    id: "3",
    type: "payment",
    title: "Pagamento processado",
    description: "Seu pagamento de R$ 180,00 foi processado com sucesso.",
    timestamp: "Há 1 hora",
    read: false,
    actionUrl: "/bookings",
  },
  {
    id: "4",
    type: "review",
    title: "Avalie sua experiência",
    description: "Como foi o 'City Tour Histórico'? Conte para outros viajantes!",
    timestamp: "Há 2 dias",
    read: true,
    actionUrl: "/reviews",
  },
  {
    id: "5",
    type: "system",
    title: "Bem-vindo ao Vai Por Mim!",
    description: "Complete seu perfil para ter acesso a recomendações personalizadas.",
    timestamp: "Há 5 dias",
    read: true,
    actionUrl: "/profile",
  },
  {
    id: "6",
    type: "booking",
    title: "Lembrete de experiência",
    description: "Sua experiência 'Trilha ao Pôr do Sol' acontece amanhã às 16h.",
    timestamp: "Ontem",
    read: true,
    actionUrl: "/bookings",
  },
];

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-5 w-5" />;
      case "message":
        return <MessageSquare className="h-5 w-5" />;
      case "review":
        return <Star className="h-5 w-5" />;
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      case "system":
        return <Info className="h-5 w-5" />;
    }
  };

  const getIconBg = (type: Notification["type"]) => {
    switch (type) {
      case "booking":
        return "bg-primary/10 text-primary";
      case "message":
        return "bg-blue-500/10 text-blue-500";
      case "review":
        return "bg-yellow-500/10 text-yellow-600";
      case "payment":
        return "bg-green-500/10 text-green-600";
      case "system":
        return "bg-muted text-muted-foreground";
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredByType = (type?: Notification["type"]) => {
    return type 
      ? notifications.filter(n => n.type === type)
      : notifications;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Notificações</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">{unreadCount} não lida{unreadCount > 1 ? 's' : ''}</p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar todas
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-4">
        <Tabs defaultValue="all">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">Todas</TabsTrigger>
            <TabsTrigger value="booking" className="flex-1">Reservas</TabsTrigger>
            <TabsTrigger value="message" className="flex-1">Mensagens</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-0">
            {notifications.length === 0 ? (
              <EmptyState />
            ) : (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                  getIcon={getIcon}
                  getIconBg={getIconBg}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="booking" className="space-y-3 mt-0">
            {filteredByType("booking").length === 0 ? (
              <EmptyState message="Nenhuma notificação de reserva" />
            ) : (
              filteredByType("booking").map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                  getIcon={getIcon}
                  getIconBg={getIconBg}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="message" className="space-y-3 mt-0">
            {filteredByType("message").length === 0 ? (
              <EmptyState message="Nenhuma notificação de mensagem" />
            ) : (
              filteredByType("message").map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                  getIcon={getIcon}
                  getIconBg={getIconBg}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

const NotificationCard = ({
  notification,
  onClick,
  getIcon,
  getIconBg,
}: {
  notification: Notification;
  onClick: () => void;
  getIcon: (type: Notification["type"]) => React.ReactNode;
  getIconBg: (type: Notification["type"]) => string;
}) => (
  <Card
    className={`cursor-pointer transition-all hover:shadow-md ${
      !notification.read ? 'border-primary/30 bg-primary/5' : ''
    }`}
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="flex gap-3">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${getIconBg(notification.type)}`}>
          {getIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
              {notification.title}
            </h3>
            {!notification.read && (
              <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {notification.description}
          </p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {notification.timestamp}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const EmptyState = ({ message = "Você não tem notificações" }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <Bell className="h-16 w-16 text-muted-foreground mb-4" />
    <h2 className="text-lg font-semibold mb-2">Tudo tranquilo por aqui</h2>
    <p className="text-muted-foreground">{message}</p>
  </div>
);

export default Notifications;
