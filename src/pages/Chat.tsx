import { useState } from "react";
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "user" | "guide";
  timestamp: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const { guideId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Bem-vindo(a)! Como posso ajudar você?",
      sender: "guide",
      timestamp: "10:30",
    },
    {
      id: "2",
      text: "Oi! Gostaria de saber mais sobre o Tour Gastronômico",
      sender: "user",
      timestamp: "10:32",
    },
    {
      id: "3",
      text: "Claro! O tour passa pelos melhores restaurantes locais e você vai conhecer a culinária típica da região. A duração é de 3 horas e inclui degustação em 5 estabelecimentos.",
      sender: "guide",
      timestamp: "10:33",
    },
  ]);

  // Mock guide data
  const guide = {
    name: "Maria Silva",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    online: true,
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate guide response
    setTimeout(() => {
      const responses = [
        "Entendi! Posso te ajudar com isso.",
        "Ótima pergunta! Deixa eu explicar...",
        "Claro, terei prazer em esclarecer.",
        "Perfeito! Vamos combinar os detalhes.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: randomResponse,
          sender: "guide",
          timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border bg-background px-4 py-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={guide.avatar} />
          <AvatarFallback>{guide.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="font-semibold">{guide.name}</h1>
          <p className="text-xs text-muted-foreground">
            {guide.online ? "Online" : "Offline"}
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`mt-1 text-xs ${
                  msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background p-4">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
