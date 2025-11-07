import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, Mail, Phone, Building, ArrowRight, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";

export function LeadSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    azienda: "",
    servizio: "",
    messaggio: ""
  });
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      toast({
        title: t('leads.toast.success'),
        description: t('leads.toast.successDesc'),
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
        title: t('leads.toast.error'),
        description: t('leads.toast.errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 tech-web" id="leads">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-title text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 px-2">
            <span className="gradient-text">{t('leads.title1')}</span> {t('leads.title2')}{" "}
            <span className="text-tech-glow">{t('leads.title3')}</span> {t('leads.title4')}
          </h2>
          <p className="font-subtitle text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {t('leads.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* Benefits Cards */}
          <div className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6">
              <Card className="glass-card shadow-card">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-lg bg-resyne-gold/20 shrink-0">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-resyne-gold" />
                    </div>
                    <div>
                      <h3 className="font-subtitle text-base sm:text-lg mb-1 sm:mb-2 text-resyne-gold">
                        {t('leads.benefit1.title')}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {t('leads.benefit1.description')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card shadow-card">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-lg bg-tech-blue/20 shrink-0">
                      <Building className="w-5 h-5 sm:w-6 sm:h-6 text-tech-blue" />
                    </div>
                    <div>
                      <h3 className="font-subtitle text-base sm:text-lg mb-1 sm:mb-2 text-tech-blue">
                        {t('leads.benefit2.title')}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {t('leads.benefit2.description')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card shadow-card">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-lg bg-tech-purple/20 shrink-0">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-tech-purple" />
                    </div>
                    <div>
                      <h3 className="font-subtitle text-base sm:text-lg mb-1 sm:mb-2 text-tech-purple">
                        {t('leads.benefit3.title')}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {t('leads.benefit3.description')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 glass-card rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-resyne-gold" />
                <span className="font-subtitle text-base sm:text-lg text-resyne-gold">{t('leads.callTitle')}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {t('leads.callDescription')}
              </p>
              <Button className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light text-sm sm:text-base">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                +393911491256
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="glass-card shadow-glow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="font-title text-xl sm:text-2xl gradient-text text-center">
                {t('leads.formTitle')}
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground text-sm sm:text-base">
                {t('leads.formDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">{t('leads.form.name')} *</Label>
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
                    <Label htmlFor="azienda">{t('leads.form.company')}</Label>
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
                  <Label htmlFor="email">{t('leads.form.email')} *</Label>
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
                  <Label htmlFor="telefono">{t('leads.form.phone')}</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="bg-muted/50"
                    placeholder="+39 123 456 7890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servizio">{t('leads.form.service')}</Label>
                  <Select value={formData.servizio} onValueChange={(value) => setFormData({...formData, servizio: value})}>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue placeholder={t('leads.form.selectService')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="erp">{t('leads.form.services.erp')}</SelectItem>
                      <SelectItem value="automation">{t('leads.form.services.automation')}</SelectItem>
                      <SelectItem value="ai">{t('leads.form.services.ai')}</SelectItem>
                      <SelectItem value="completo">{t('leads.form.services.complete')}</SelectItem>
                      <SelectItem value="consulenza">{t('leads.form.services.consultation')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="messaggio">{t('leads.form.message')}</Label>
                  <Textarea
                    id="messaggio"
                    value={formData.messaggio}
                    onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                    className="bg-muted/50 min-h-[100px]"
                    placeholder={t('leads.form.messagePlaceholder')}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="privacy" 
                    checked={acceptedPrivacy}
                    onCheckedChange={(checked) => setAcceptedPrivacy(checked as boolean)}
                    required
                  />
                  <label
                    htmlFor="privacy"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('leads.form.privacyAccept')}{" "}
                    <a 
                      href="https://www.iubenda.com/privacy-policy/31200612" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-resyne-gold hover:underline"
                    >
                      {t('leads.form.privacyLink')}
                    </a>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light font-subtitle text-base sm:text-lg py-5 sm:py-6"
                  disabled={isLoading || !acceptedPrivacy}
                >
                  {isLoading ? (
                    t('leads.form.sending')
                  ) : (
                    <>
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      {t('leads.form.submit')}
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
                  {t('leads.form.privacy')}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
