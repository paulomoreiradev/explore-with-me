import { ArrowLeft, Bell, Moon, Globe, Shield, HelpCircle, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationChange = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: checked ? "Notificações ativadas" : "Notificações desativadas",
    });
  };

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    toast({
      title: checked ? "Modo escuro ativado" : "Modo claro ativado",
      description: "Esta funcionalidade será implementada em breve",
    });
  };

  const settingsOptions = [
    { icon: Globe, label: "Idioma", value: "Português (BR)" },
    { icon: Shield, label: "Privacidade e Segurança", value: "" },
    { icon: HelpCircle, label: "Central de Ajuda", value: "" },
    { icon: FileText, label: "Termos de Uso", value: "" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">Configurações</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preferências</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Notificações</p>
                  <p className="text-sm text-muted-foreground">Receber alertas e novidades</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={handleNotificationChange} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Modo Escuro</p>
                  <p className="text-sm text-muted-foreground">Alternar tema do aplicativo</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={handleDarkModeChange} />
            </div>
          </CardContent>
        </Card>

        {/* Other Options */}
        <Card>
          <CardContent className="p-0">
            {settingsOptions.map((option, index) => (
              <div key={option.label}>
                <button className="flex w-full items-center justify-between p-4 transition-smooth hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <option.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {option.value && (
                      <span className="text-sm text-muted-foreground">{option.value}</span>
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </button>
                {index < settingsOptions.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Vai Por Mim v1.0.0</p>
          <p className="mt-1">© 2026 Todos os direitos reservados</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
