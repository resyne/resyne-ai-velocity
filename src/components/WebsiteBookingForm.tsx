import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { format } from "date-fns";

const bookingSchema = z.object({
  firstName: z.string().trim().min(1, "Nome richiesto").max(100),
  lastName: z.string().trim().min(1, "Cognome richiesto").max(100),
  email: z.string().trim().email("Email non valida").max(255),
  city: z.string().trim().max(100),
  phone: z.string().trim().min(1, "Telefono richiesto").max(50),
});

export const WebsiteBookingForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasWebsite, setHasWebsite] = useState<boolean | null>(null);
  const [hasLogo, setHasLogo] = useState<boolean | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
    preferWhatsApp: false,
    preferEmail: false,
    preferPhone: false,
    preferConference: false,
  });

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate form data
      const validatedData = bookingSchema.parse(formData);

      const bookingData = {
        ...validatedData,
        hasWebsite: hasWebsite ?? false,
        hasLogo: hasLogo ?? false,
        appointmentDate: selectedDate ? format(selectedDate, "dd/MM/yyyy") : "",
        appointmentTime: selectedTime,
        preferWhatsApp: formData.preferWhatsApp,
        preferEmail: formData.preferEmail,
        preferPhone: formData.preferPhone,
        preferConference: formData.preferConference,
      };

      console.log("Sending booking data:", bookingData);

      const { data, error } = await supabase.functions.invoke('send-booking-confirmation', {
        body: bookingData,
      });

      if (error) throw error;

      console.log("Booking confirmation sent:", data);

      toast({
        title: t("websiteBooking.form.success"),
        description: t("websiteBooking.form.successDesc"),
      });

      // Reset form
      setStep(1);
      setHasWebsite(null);
      setHasLogo(null);
      setSelectedDate(undefined);
      setSelectedTime("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        phone: "",
        preferWhatsApp: false,
        preferEmail: false,
        preferPhone: false,
        preferConference: false,
      });
    } catch (error: any) {
      console.error("Error submitting booking:", error);
      
      if (error instanceof z.ZodError) {
        toast({
          title: t("websiteBooking.form.error"),
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("websiteBooking.form.error"),
          description: error.message || t("websiteBooking.form.errorDesc"),
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const canGoNext = () => {
    switch (step) {
      case 1:
        return hasWebsite !== null;
      case 2:
        return hasLogo !== null;
      case 3:
        return selectedDate !== undefined && selectedTime !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="glass-card p-8 rounded-2xl max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                "flex-1 h-2 rounded-full mx-1",
                s <= step ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {t("websiteBooking.step")} {step} {t("websiteBooking.of")} 4
        </p>
      </div>

      {/* Step 1: Do you have a website? */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-subtitle text-center mb-8">
            {t("websiteBooking.question1")}
          </h3>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant={hasWebsite === true ? "default" : "outline"}
              onClick={() => setHasWebsite(true)}
              className="w-32"
            >
              <Check className="w-5 h-5 mr-2" />
              {t("websiteBooking.yes")}
            </Button>
            <Button
              size="lg"
              variant={hasWebsite === false ? "default" : "outline"}
              onClick={() => setHasWebsite(false)}
              className="w-32"
            >
              <X className="w-5 h-5 mr-2" />
              {t("websiteBooking.no")}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Do you have a logo? */}
      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-subtitle text-center mb-8">
            {t("websiteBooking.question2")}
          </h3>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant={hasLogo === true ? "default" : "outline"}
              onClick={() => setHasLogo(true)}
              className="w-32"
            >
              <Check className="w-5 h-5 mr-2" />
              {t("websiteBooking.yes")}
            </Button>
            <Button
              size="lg"
              variant={hasLogo === false ? "default" : "outline"}
              onClick={() => setHasLogo(false)}
              className="w-32"
            >
              <X className="w-5 h-5 mr-2" />
              {t("websiteBooking.no")}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: When would you like to be contacted? */}
      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-subtitle text-center mb-8">
            {t("websiteBooking.question3")}
          </h3>
          <div className="flex flex-col items-center gap-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className={cn("rounded-md border pointer-events-auto")}
            />
            {selectedDate && (
              <div className="w-full">
                <Label className="mb-2 block">{t("websiteBooking.selectTime")}</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="w-full"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 4: Contact Form */}
      {step === 4 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-subtitle text-center mb-8">
            {t("websiteBooking.question4")}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">{t("websiteBooking.form.firstName")}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder={t("websiteBooking.form.firstName")}
              />
            </div>
            <div>
              <Label htmlFor="lastName">{t("websiteBooking.form.lastName")}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder={t("websiteBooking.form.lastName")}
              />
            </div>
            <div>
              <Label htmlFor="email">{t("websiteBooking.form.email")}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t("websiteBooking.form.email")}
              />
            </div>
            <div>
              <Label htmlFor="phone">{t("websiteBooking.form.phone")}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t("websiteBooking.form.phone")}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="city">{t("websiteBooking.form.city")}</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={t("websiteBooking.form.city")}
              />
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Label>{t("websiteBooking.form.contactPreference")}</Label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whatsapp"
                  checked={formData.preferWhatsApp}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, preferWhatsApp: checked as boolean })
                  }
                />
                <label htmlFor="whatsapp" className="text-sm cursor-pointer">
                  {t("websiteBooking.form.whatsapp")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={formData.preferEmail}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, preferEmail: checked as boolean })
                  }
                />
                <label htmlFor="email" className="text-sm cursor-pointer">
                  {t("websiteBooking.form.emailContact")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="phone"
                  checked={formData.preferPhone}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, preferPhone: checked as boolean })
                  }
                />
                <label htmlFor="phone" className="text-sm cursor-pointer">
                  {t("websiteBooking.form.phoneContact")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="conference"
                  checked={formData.preferConference}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, preferConference: checked as boolean })
                  }
                />
                <label htmlFor="conference" className="text-sm cursor-pointer">
                  {t("websiteBooking.form.conference")}
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        {step > 1 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t("websiteBooking.back")}
          </Button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canGoNext()}>
            {t("websiteBooking.next")}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t("websiteBooking.sending")}
              </>
            ) : (
              t("websiteBooking.submit")
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
