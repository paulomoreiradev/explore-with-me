import { useState } from "react";
import { ArrowLeft, Search, MessageSquare, Clock, CheckCheck, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

interface Conversation {
  id: string;
  travelerName: string;
  travelerAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  experience?: string;
  status: "active" | "inquiry" | "booked";
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    travelerName: "João Santos",
    travelerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    lastMessage: "Ótimo! Então confirmo a reserva para sábado às 9h.",
    timestamp: "10:30",
    unread: true,
    experience: "Tour Gastronômico",
    status: "active",
  },
  {
    id: "2",
    travelerName: "Ana Paula",
    travelerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    lastMessage: "Vocês aceitam crianças no tour?",
    timestamp: "Ontem",
    unread: true,
    experience: "Trilha ao Pôr do Sol",
    status: "inquiry",
  },
  {
    id: "3",
    travelerName: "Carlos Mendes",
    travelerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    lastMessage: "Obrigado pela experiência incrível!",
    timestamp: "15/01",
    unread: false,
    experience: "City Tour Histórico",
    status: "booked",
  },
  {
    id: "4",
    travelerName: "Mariana Lima",
    travelerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    lastMessage: "Qual o ponto de encontro?",
    timestamp: "14/01",
    unread: false,
    experience: "Tour Gastronômico",
    status: "booked",
  },
  {
    id: "5",
    travelerName: "Roberto Alves",
    travelerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    lastMessage: "Pode me enviar mais informações sobre os passeios de aventura?",
    timestamp: "13/01",
    unread: false,
    status: "inquiry",
  },
];

const GuideInbox = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState(mockConversations);

  const unreadCount = conversations.filter(c => c.unread).length;

  const filteredConversations = conversations.filter(c =>
    c.travelerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.experience?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Conversation["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-600 text-xs">Ativo</Badge>;
      case "inquiry":
        return <Badge className="bg-blue-500/10 text-blue-600 text-xs">Consulta</Badge>;
      case "booked":
        return <Badge className="bg-primary/10 text-primary text-xs">Reservado</Badge>;
    }
  };

  const handleOpenChat = (conversationId: string) => {
    // Mark as read
    setConversations(prev => 
      prev.map(c => c.id === conversationId ? { ...c, unread: false } : c)
    );
    navigate(`/chat/${conversationId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/guide-dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Mensagens</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">{unreadCount} não lida{unreadCount > 1 ? 's' : ''}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">Todas</TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              Não lidas
              {unreadCount > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full px-1.5">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex-1">Consultas</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-2">
            {filteredConversations.map((conv) => (
              <ConversationCard 
                key={conv.id} 
                conversation={conv} 
                onClick={() => handleOpenChat(conv.id)}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </TabsContent>

          <TabsContent value="unread" className="mt-4 space-y-2">
            {filteredConversations.filter(c => c.unread).map((conv) => (
              <ConversationCard 
                key={conv.id} 
                conversation={conv} 
                onClick={() => handleOpenChat(conv.id)}
                getStatusBadge={getStatusBadge}
              />
            ))}
            {filteredConversations.filter(c => c.unread).length === 0 && (
              <EmptyState message="Nenhuma mensagem não lida" />
            )}
          </TabsContent>

          <TabsContent value="inquiries" className="mt-4 space-y-2">
            {filteredConversations.filter(c => c.status === "inquiry").map((conv) => (
              <ConversationCard 
                key={conv.id} 
                conversation={conv} 
                onClick={() => handleOpenChat(conv.id)}
                getStatusBadge={getStatusBadge}
              />
            ))}
            {filteredConversations.filter(c => c.status === "inquiry").length === 0 && (
              <EmptyState message="Nenhuma consulta pendente" />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

const ConversationCard = ({ 
  conversation, 
  onClick,
  getStatusBadge
}: { 
  conversation: Conversation; 
  onClick: () => void;
  getStatusBadge: (status: Conversation["status"]) => React.ReactNode;
}) => (
  <Card 
    className={`cursor-pointer transition-all hover:shadow-md ${conversation.unread ? 'border-primary/30 bg-primary/5' : ''}`}
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="flex gap-3">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarImage src={conversation.travelerAvatar} />
            <AvatarFallback>{conversation.travelerName[0]}</AvatarFallback>
          </Avatar>
          {conversation.unread && (
            <Circle className="absolute -top-1 -right-1 h-3 w-3 fill-primary text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className={`font-semibold truncate ${conversation.unread ? 'text-foreground' : ''}`}>
              {conversation.travelerName}
            </h3>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {conversation.timestamp}
            </span>
          </div>
          {conversation.experience && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted-foreground">{conversation.experience}</span>
              {getStatusBadge(conversation.status)}
            </div>
          )}
          <p className={`text-sm truncate mt-1 ${conversation.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            {conversation.lastMessage}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
    <p className="text-muted-foreground">{message}</p>
  </div>
);

export default GuideInbox;
