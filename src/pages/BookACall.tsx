import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CalendarIcon, Clock, Phone, Video } from "lucide-react";
import { format } from "date-fns";
import { it, enUS } from "date-fns/locale";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

const platforms = [
  { id: "google-meet", label: "Google Meet", icon: Video },
  { id: "phone", label: "Cellulare (+39 338 315 6161)", icon: Phone }
];

export default function BookACall() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedPlatform || !acceptedPrivacy) {
      toast({
        variant: "destructive",
        title: t('bookCall.toast.error'),
        description: t('bookCall.toast.errorDescription')
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-booking-notification', {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          date: format(selectedDate, 'PPP', { locale: i18n.language === 'it' ? it : enUS }),
          time: selectedTime,
          platform: platforms.find(p => p.id === selectedPlatform)?.label || selectedPlatform
        }
      });

      if (error) throw error;

      toast({
        title: t('bookCall.toast.success'),
        description: t('bookCall.toast.successDescription')
      });

      // Reset form
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setSelectedDate(undefined);
      setSelectedTime("");
      setSelectedPlatform("");
      setAcceptedPrivacy(false);
    } catch (error) {
      console.error('Error booking call:', error);
      toast({
        variant: "destructive",
        title: t('bookCall.toast.error'),
        description: t('bookCall.toast.errorDescription')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-resyne-dark via-resyne-dark to-resyne-black">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold mb-3 md:mb-4 text-resyne-gold">
              {t('bookCall.title')}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              {t('bookCall.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg border border-border">
            {/* Calendar Section */}
            <div className="space-y-3 md:space-y-4">
              <Label className="text-base md:text-lg flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 text-resyne-gold" />
                {t('bookCall.form.selectDate')}
              </Label>
              <div className="flex justify-center overflow-x-auto">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-md border pointer-events-auto scale-90 sm:scale-100"
                />
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="space-y-3 md:space-y-4">
                <Label className="text-base md:text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-resyne-gold" />
                  {t('bookCall.form.selectTime')}
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`min-h-[44px] text-sm ${selectedTime === time ? "bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light" : ""}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Platform Selection */}
            {selectedTime && (
              <div className="space-y-3 md:space-y-4">
                <Label className="text-base md:text-lg">
                  {t('bookCall.form.selectPlatform')}
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <Button
                        key={platform.id}
                        type="button"
                        variant={selectedPlatform === platform.id ? "default" : "outline"}
                        className={`h-auto py-3 md:py-4 flex flex-col items-center gap-2 min-h-[80px] ${
                          selectedPlatform === platform.id 
                            ? "bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light" 
                            : ""
                        }`}
                        onClick={() => setSelectedPlatform(platform.id)}
                      >
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="text-sm md:text-base">{platform.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact Information */}
            {selectedPlatform && (
              <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t border-border">
                <h3 className="text-lg md:text-xl font-semibold text-resyne-gold">
                  {t('bookCall.form.contactInfo')}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('bookCall.form.firstName')}</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder={t('bookCall.form.firstNamePlaceholder')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('bookCall.form.lastName')}</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder={t('bookCall.form.lastNamePlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('bookCall.form.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('bookCall.form.emailPlaceholder')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('bookCall.form.phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('bookCall.form.phonePlaceholder')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('bookCall.form.message')}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('bookCall.form.messagePlaceholder')}
                    rows={4}
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
                    {t('bookCall.form.privacyAccept')}{" "}
                    <a 
                      href="https://www.iubenda.com/privacy-policy/31200612" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-resyne-gold hover:underline"
                    >
                      {t('bookCall.form.privacyLink')}
                    </a>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light font-subtitle text-base md:text-lg py-4 md:py-6 min-h-[52px]"
                  disabled={isLoading || !acceptedPrivacy}
                >
                  {isLoading ? t('bookCall.form.sending') : t('bookCall.form.submit')}
                </Button>
              </div>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
