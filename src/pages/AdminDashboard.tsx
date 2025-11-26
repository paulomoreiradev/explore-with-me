import { Users, ShieldCheck, Flag, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const stats = [
    { label: "Usuários Ativos", value: "1,234", icon: Users, change: "+12%" },
    { label: "Experiências", value: "342", icon: TrendingUp, change: "+8%" },
    { label: "Aprovações Pendentes", value: "23", icon: ShieldCheck, change: "" },
    { label: "Denúncias", value: "5", icon: Flag, change: "-15%" },
  ];

  const pendingApprovals = [
    {
      id: "1",
      type: "Experiência",
      name: "Tour de Bike pela Orla",
      submitter: "Carlos Mendes",
      date: "14 Dez 2024",
      status: "Pendente",
    },
    {
      id: "2",
      type: "Guia",
      name: "Ana Carolina Silva",
      submitter: "Ana Carolina Silva",
      date: "13 Dez 2024",
      status: "Pendente",
    },
    {
      id: "3",
      type: "Experiência",
      name: "Workshop de Fotografia",
      submitter: "Pedro Santos",
      date: "12 Dez 2024",
      status: "Pendente",
    },
  ];

  const recentReports = [
    {
      id: "1",
      type: "Usuário",
      subject: "Comportamento inapropriado",
      reporter: "Maria Silva",
      date: "15 Dez 2024",
    },
    {
      id: "2",
      type: "Experiência",
      subject: "Informações incorretas",
      reporter: "João Pedro",
      date: "14 Dez 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Painel Administrativo</h1>
          <p className="text-sm text-muted-foreground">Gerencie toda a plataforma</p>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      {stat.change && (
                        <span className="text-sm font-medium text-primary">
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Aprovações Pendentes</CardTitle>
                <Badge variant="secondary">{pendingApprovals.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.date}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10">
                            Rejeitar
                          </Button>
                          <Button size="sm" className="bg-primary hover:bg-primary-hover">
                            Aprovar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Denúncias Recentes</CardTitle>
                <Badge variant="destructive">{recentReports.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="rounded-lg border border-border p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <Badge variant="outline">{report.type}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {report.date}
                          </span>
                        </div>
                        <p className="font-semibold">{report.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          Denunciado por: {report.reporter}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Ver Detalhes
                      </Button>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary-hover">
                        Resolver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                Gerenciar Usuários
              </Button>
              <Button variant="outline" className="justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Ver Relatórios
              </Button>
              <Button variant="outline" className="justify-start">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Configurações
              </Button>
              <Button variant="outline" className="justify-start">
                <Flag className="mr-2 h-4 w-4" />
                Gerenciar Categorias
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
