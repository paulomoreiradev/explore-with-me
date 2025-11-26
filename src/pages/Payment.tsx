import { useState } from "react";
import { ArrowLeft, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const booking = {
    experience: "Tour Gastronômico no Centro Histórico",
    date: "15 de Dezembro, 2024",
    time: "09:00",
    people: 2,
    pricePerPerson: 150,
  };

  const total = booking.pricePerPerson * booking.people;
  const serviceFee = total * 0.1;
  const grandTotal = total + serviceFee;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pagamento confirmado!",
      description: "Você receberá um e-mail com os detalhes da reserva",
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-primary">Pagamento</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Método de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex flex-1 cursor-pointer items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="font-medium">Cartão de Crédito</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit" className="flex flex-1 cursor-pointer items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="font-medium">Cartão de Débito</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex flex-1 cursor-pointer items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-accent text-xs font-bold text-accent-foreground">
                        PIX
                      </div>
                      <span className="font-medium">PIX</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {paymentMethod !== "pix" && (
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Cartão</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input
                        id="cardName"
                        placeholder="Nome como está no cartão"
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Validade</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="000"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover"
                      size="lg"
                    >
                      Confirmar Pagamento
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "pix" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-lg bg-muted">
                      <span className="text-sm text-muted-foreground">QR Code PIX</span>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Escaneie o QR Code com o app do seu banco
                    </p>
                    <Button
                      onClick={handlePayment}
                      className="w-full bg-primary hover:bg-primary-hover"
                      size="lg"
                    >
                      Confirmar Pagamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo da Reserva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{booking.experience}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {booking.date} às {booking.time}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.people} {booking.people === 1 ? "pessoa" : "pessoas"}
                  </p>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      R$ {booking.pricePerPerson.toFixed(2)} x {booking.people}
                    </span>
                    <span className="font-medium">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxa de serviço</span>
                    <span className="font-medium">R$ {serviceFee.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">
                    R$ {grandTotal.toFixed(2)}
                  </span>
                </div>

                <div className="rounded-lg bg-accent/10 p-3">
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 text-accent" />
                    <div className="text-sm">
                      <p className="font-medium text-accent">Garantia de qualidade</p>
                      <p className="text-muted-foreground">
                        Cancelamento gratuito até 24h antes
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
