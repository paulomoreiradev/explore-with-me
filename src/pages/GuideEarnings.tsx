import { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, Download, ChevronRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

interface Transaction {
  id: string;
  experience: string;
  travelerName: string;
  date: string;
  amount: number;
  commission: number;
  netAmount: number;
  status: "completed" | "pending" | "processing";
  paymentMethod: string;
}

interface EarningsSummary {
  totalEarnings: number;
  pendingPayment: number;
  nextPayout: string;
  monthlyChange: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    experience: "Tour Gastronômico",
    travelerName: "João Santos",
    date: "18/01/2026",
    amount: 180,
    commission: 27,
    netAmount: 153,
    status: "completed",
    paymentMethod: "PIX",
  },
  {
    id: "2",
    experience: "Trilha ao Pôr do Sol",
    travelerName: "Ana Paula",
    date: "17/01/2026",
    amount: 120,
    commission: 18,
    netAmount: 102,
    status: "processing",
    paymentMethod: "Cartão",
  },
  {
    id: "3",
    experience: "City Tour Histórico",
    travelerName: "Carlos Mendes",
    date: "15/01/2026",
    amount: 200,
    commission: 30,
    netAmount: 170,
    status: "completed",
    paymentMethod: "PIX",
  },
  {
    id: "4",
    experience: "Tour Gastronômico",
    travelerName: "Mariana Lima",
    date: "14/01/2026",
    amount: 360,
    commission: 54,
    netAmount: 306,
    status: "completed",
    paymentMethod: "Cartão",
  },
  {
    id: "5",
    experience: "Passeio de Jangada",
    travelerName: "Roberto Alves",
    date: "12/01/2026",
    amount: 150,
    commission: 22.5,
    netAmount: 127.5,
    status: "pending",
    paymentMethod: "PIX",
  },
];

const mockSummary: EarningsSummary = {
  totalEarnings: 3450,
  pendingPayment: 229.5,
  nextPayout: "20/01/2026",
  monthlyChange: 12.5,
};

const GuideEarnings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [period, setPeriod] = useState("month");
  const [transactions] = useState(mockTransactions);
  const [summary] = useState(mockSummary);

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-600">Pago</Badge>;
      case "processing":
        return <Badge className="bg-yellow-500/10 text-yellow-600">Processando</Badge>;
      case "pending":
        return <Badge className="bg-blue-500/10 text-blue-600">Pendente</Badge>;
    }
  };

  const handleExportReport = () => {
    toast({
      title: "Relatório exportado",
      description: "O relatório foi enviado para seu e-mail.",
    });
  };

  const handleRequestPayout = () => {
    toast({
      title: "Saque solicitado",
      description: "O valor será transferido em até 2 dias úteis.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate("/guide-dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">Meus Ganhos</h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total do Mês</p>
                  <p className="text-2xl font-bold text-primary">
                    R$ {summary.totalEarnings.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className={`flex items-center gap-1 text-sm ${summary.monthlyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {summary.monthlyChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {Math.abs(summary.monthlyChange)}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground">A Receber</p>
                <p className="text-2xl font-bold">
                  R$ {summary.pendingPayment.toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Próx. pagamento: {summary.nextPayout}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Action */}
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Solicitar Saque</p>
                  <p className="text-sm text-muted-foreground">Valor mínimo: R$ 50,00</p>
                </div>
              </div>
              <Button onClick={handleRequestPayout} className="bg-accent hover:bg-accent/90">
                Sacar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Period Filter */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Histórico de Transações</h2>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-primary">{transactions.length}</p>
              <p className="text-xs text-muted-foreground">Transações</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-accent">15%</p>
              <p className="text-xs text-muted-foreground">Comissão</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold">R$ 172</p>
              <p className="text-xs text-muted-foreground">Média/reserva</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{transaction.experience}</h3>
                      {getStatusBadge(transaction.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {transaction.travelerName}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {transaction.date}
                      </span>
                      <span>{transaction.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">
                      +R$ {transaction.netAmount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Valor: R$ {transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-destructive/70">
                      -R$ {transaction.commission.toFixed(2)} (taxa)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Commission Info */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Sobre as Taxas</h3>
            <p className="text-sm text-muted-foreground">
              A plataforma cobra uma comissão de 15% sobre cada reserva realizada. 
              Este valor inclui custos de processamento de pagamento, seguro e suporte ao cliente.
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default GuideEarnings;
