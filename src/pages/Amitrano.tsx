import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Amitrano() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefono: "",
    email: "",
    messaggio: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefono.trim()) {
      toast({
        title: "Campi obbligatori",
        description: "Inserisci almeno nome e numero di telefono.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
    toast({
      title: "Richiesta inviata!",
      description: "Ti ricontatteremo al più presto.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Presentation Section */}
      <section className="pt-24 pb-8 sm:pt-28 sm:pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
              Consulenza Strategica & <span className="text-resyne-gold">Sviluppo Software</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Scopri come possiamo aiutare la tua PMI con digitalizzazione, automazione e integrazione AI.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-resyne-gold/10 text-resyne-gold px-4 py-2 rounded-full mb-4">
                <Phone className="h-4 w-4" />
                <span className="font-subtitle text-sm">Richiedi un contatto</span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl mb-2">
                Vuoi saperne di più?
              </h2>
              <p className="text-muted-foreground text-sm">
                Lascia i tuoi dati e ti richiameremo per una consulenza gratuita.
              </p>
            </div>

            {submitted ? (
              <div className="glass-card rounded-xl p-8 text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-resyne-gold mx-auto" />
                <h3 className="font-heading text-lg">Grazie, {form.nome}!</h3>
                <p className="text-muted-foreground text-sm">
                  Ti ricontatteremo al numero <strong>{form.telefono}</strong> il prima possibile.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 sm:p-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome e Cognome *</Label>
                  <Input
                    id="nome"
                    placeholder="Mario Rossi"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Numero di Telefono *</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="+39 333 1234567"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    maxLength={20}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (opzionale)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mario@azienda.it"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="messaggio">Messaggio (opzionale)</Label>
                  <Textarea
                    id="messaggio"
                    placeholder="Descrivi brevemente le tue esigenze..."
                    value={form.messaggio}
                    onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
                    maxLength={500}
                    rows={3}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light"
                >
                  {loading ? "Invio in corso..." : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Richiedi Contatto Telefonico
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
