import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, Mail, Phone, Building, ArrowRight, CheckCircle } from "lucide-react";

export function LeadSection() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    azienda: "",
    servizio: "",
    messaggio: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      toast({
        title: "Richiesta Inviata!",
        description: "Ti ricontatteremo entro 24 ore per una consulenza gratuita.",
      });

      // Reset form
      setFormData({
        nome: "",
        email: "",
        telefono: "",
        azienda: "",
        servizio: "",
        messaggio: ""
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un problema. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 tech-web" id="leads">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="font-title text-4xl md:text-6xl mb-6">
            <span className="gradient-text">Trasforma</span> la tua{" "}
            <span className="text-tech-glow">Azienda</span> oggi
          </h2>
          <p className="font-subtitle text-xl text-muted-foreground max-w-3xl mx-auto">
            Richiedi una consulenza gratuita personalizzata. I nostri esperti analizzeranno 
            le tue esigenze e ti proporranno la soluzione AI-ERP perfetta.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Benefits Cards */}
          <div className="space-y-6">
            <div className="grid gap-6">
              <Card className="glass-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-resyne-gold/20">
                      <CheckCircle className="w-6 h-6 text-resyne-gold" />
                    </div>
                    <div>
                      <h3 className="font-subtitle text-lg mb-2 text-resyne-gold">
                        Consulenza Gratuita
                      </h3>
                      <p className="text-muted-foreground">
                        Analisi completa dei tuoi processi aziendali senza impegno. 
                        Identificheremo opportunità di miglioramento immediate.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-tech-blue/20">
                      <Building className="w-6 h-6 text-tech-blue" />
                    </div>
                    <div>
                      <h3 className="font-subtitle text-lg mb-2 text-tech-blue">
                        Implementazione Rapida
                      </h3>
                      <p className="text-muted-foreground">
                        Grazie all'AI, riduciamo i tempi di implementazione da mesi a settimane. 
                        Sistema operativo in tempi record.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-tech-purple/20">
                      <Users className="w-6 h-6 text-tech-purple" />
                    </div>
                    <div>
                      <h3 className="font-subtitle text-lg mb-2 text-tech-purple">
                        Supporto 24/7
                      </h3>
                      <p className="text-muted-foreground">
                        Assistenza continua con AI integrata e team di esperti. 
                        Non rimarrai mai senza supporto.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4 p-6 glass-card rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5 text-resyne-gold" />
                <span className="font-subtitle text-lg text-resyne-gold">Chiamata Immediata</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Preferisci parlare direttamente? Chiamaci al numero dedicato
              </p>
              <Button className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light">
                <Phone className="w-4 h-4 mr-2" />
                +393911491256
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="glass-card shadow-glow">
            <CardHeader>
              <CardTitle className="font-title text-2xl gradient-text text-center">
                Richiedi Consulenza Gratuita
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Compila il modulo e ti ricontatteremo entro 24 ore
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome e Cognome *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      required
                      className="bg-muted/50"
                      placeholder="Mario Rossi"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="azienda">Azienda</Label>
                    <Input
                      id="azienda"
                      value={formData.azienda}
                      onChange={(e) => setFormData({...formData, azienda: e.target.value})}
                      className="bg-muted/50"
                      placeholder="La Tua Azienda S.r.l."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="bg-muted/50"
                    placeholder="mario@azienda.it"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Telefono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="bg-muted/50"
                    placeholder="+39 123 456 7890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servizio">Servizio di Interesse</Label>
                  <Select value={formData.servizio} onValueChange={(value) => setFormData({...formData, servizio: value})}>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue placeholder="Seleziona il servizio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="erp">ERP Solutions</SelectItem>
                      <SelectItem value="automation">Automation</SelectItem>
                      <SelectItem value="ai">AI Solutions</SelectItem>
                      <SelectItem value="completo">Soluzione Completa</SelectItem>
                      <SelectItem value="consulenza">Solo Consulenza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="messaggio">Descrivi le tue Esigenze</Label>
                  <Textarea
                    id="messaggio"
                    value={formData.messaggio}
                    onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                    className="bg-muted/50 min-h-[100px]"
                    placeholder="Raccontaci della tua azienda e delle tue esigenze specifiche..."
                  />
                </div>


                <Button 
                  type="submit" 
                  className="w-full bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light font-subtitle text-lg py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Invio in corso..."
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Invia Richiesta
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Rispettiamo la tua privacy. Non condivideremo mai i tuoi dati con terze parti.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}