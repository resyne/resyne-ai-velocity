import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowRight,
  Phone,
  MessageCircle,
  Video,
  CheckCircle,
  Calendar as CalendarIcon
} from "lucide-react";
import { format } from "date-fns";
import { it, enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface GrantBookingSectionProps {
  grantName: string;
}

export function GrantBookingSection({ grantName }: GrantBookingSectionProps) {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const platforms = [
    {
      id: "whatsapp",
      label: t('grantBooking.platforms.whatsapp'),
      icon: MessageCircle,
      color: "text-green-500"
    },
    {
      id: "phone",
      label: t('grantBooking.platforms.phone'),
      icon: Phone,
      color: "text-tech-blue"
    },
    {
      id: "meet",
      label: t('grantBooking.platforms.meet'),
      icon: Video,
      color: "text-resyne-gold"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedPlatform) {
      toast({
        title: t('grantBooking.toast.error'),
        description: t('grantBooking.toast.errorDesc'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-booking-notification', {
        body: {
          ...formData,
          date: format(selectedDate, 'PPP', { locale: i18n.language === 'it' ? it : enUS }),
          platform: selectedPlatform,
          grant: grantName,
          type: 'grant-booking'
        }
      });

      if (error) throw error;

      toast({
        title: t('grantBooking.toast.success'),
        description: t('grantBooking.toast.successDesc'),
      });

      // Reset form
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setSelectedDate(undefined);
      setSelectedPlatform("");
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: t('grantBooking.toast.error'),
        description: t('grantBooking.toast.errorDescGeneric'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-resyne-gold/5 to-tech-blue/5">
      <div className="container mx-auto max-w-6xl">
        <Card className="glass-card border-resyne-gold/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-resyne-gold/10 to-tech-blue/10" />
          <CardContent className="p-4 sm:p-6 md:p-12 relative z-10">
            <div className="text-center space-y-3 mb-8 md:mb-12">
              <h2 className="font-title text-2xl sm:text-3xl md:text-4xl">
                {t('grantBooking.title')}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('grantBooking.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column - Calendar & Platform */}
              <div className="space-y-5 md:space-y-6 order-2 md:order-1">
                <div>
                  <label className="font-subtitle text-sm mb-3 block flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-resyne-gold" />
                    {t('grantBooking.selectDate')}
                  </label>
                  <Card className="glass-card">
                    <CardContent className="p-2 sm:p-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date < new Date("2024-01-01")}
                        initialFocus
                        locale={i18n.language === 'it' ? it : enUS}
                        className={cn("pointer-events-auto w-full [&_.rdp-month]:w-full [&_table]:w-full")}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <label className="font-subtitle text-sm mb-3 block">
                    {t('grantBooking.selectPlatform')}
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => setSelectedPlatform(platform.id)}
                        className={cn(
                          "p-3 sm:p-4 rounded-lg glass-card transition-all flex flex-col items-center gap-1.5 sm:gap-2 touch-manipulation",
                          selectedPlatform === platform.id
                            ? "border-2 border-resyne-gold bg-resyne-gold/10"
                            : "border border-border/20 hover:border-resyne-gold/50 active:border-resyne-gold/50"
                        )}
                      >
                        <platform.icon className={cn("h-5 w-5 sm:h-6 sm:w-6", platform.color)} />
                        <span className="text-[10px] sm:text-xs font-subtitle leading-tight text-center">{platform.label}</span>
                        {selectedPlatform === platform.id && (
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-resyne-gold" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Info */}
              <div className="space-y-4 order-1 md:order-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-subtitle text-sm mb-2 block">
                      {t('grantBooking.form.firstName')}
                    </label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder={t('grantBooking.form.firstNamePlaceholder')}
                      required
                      className="glass-card"
                    />
                  </div>
                  <div>
                    <label className="font-subtitle text-sm mb-2 block">
                      {t('grantBooking.form.lastName')}
                    </label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder={t('grantBooking.form.lastNamePlaceholder')}
                      required
                      className="glass-card"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-subtitle text-sm mb-2 block">
                    {t('grantBooking.form.email')}
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('grantBooking.form.emailPlaceholder')}
                    required
                    className="glass-card"
                  />
                </div>

                <div>
                  <label className="font-subtitle text-sm mb-2 block">
                    {t('grantBooking.form.phone')}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('grantBooking.form.phonePlaceholder')}
                    required
                    className="glass-card"
                  />
                </div>

                <div>
                  <label className="font-subtitle text-sm mb-2 block">
                    {t('grantBooking.form.message')}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('grantBooking.form.messagePlaceholder')}
                    rows={4}
                    className="glass-card"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={isLoading || !selectedDate || !selectedPlatform}
                  className="w-full bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light touch-manipulation min-h-[44px]"
                >
                  {isLoading ? t('grantBooking.form.submitting') : t('grantBooking.form.submit')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
