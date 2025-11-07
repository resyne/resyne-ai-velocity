import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowRight,
  ArrowLeft,
  Phone,
  MessageCircle,
  Video,
  CheckCircle,
  Building2,
  Sparkles,
  Euro
} from "lucide-react";
import { format } from "date-fns";
import { it, enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface EligibilityFunnelProps {
  grantName: string;
}

export function EligibilityFunnel({ grantName }: EligibilityFunnelProps) {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form data
  const [businessType, setBusinessType] = useState<string>("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const totalSteps = 6;

  const businessTypes = [
    { id: "hotel", label: t('eligibilityFunnel.businessTypes.hotel') },
    { id: "resort", label: t('eligibilityFunnel.businessTypes.resort') },
    { id: "bnb", label: t('eligibilityFunnel.businessTypes.bnb') },
    { id: "beach", label: t('eligibilityFunnel.businessTypes.beach') },
    { id: "agency", label: t('eligibilityFunnel.businessTypes.agency') },
    { id: "transport", label: t('eligibilityFunnel.businessTypes.transport') },
    { id: "other", label: t('eligibilityFunnel.businessTypes.other') }
  ];

  const projectTypes = [
    { id: "ai", label: t('eligibilityFunnel.projects.ai') },
    { id: "erp", label: t('eligibilityFunnel.projects.erp') },
    { id: "booking", label: t('eligibilityFunnel.projects.booking') },
    { id: "automation", label: t('eligibilityFunnel.projects.automation') },
    { id: "analytics", label: t('eligibilityFunnel.projects.analytics') },
    { id: "experience", label: t('eligibilityFunnel.projects.experience') }
  ];

  const budgetOptions = [
    { id: "5k", label: "5.000€", value: "5000" },
    { id: "10k", label: "10.000€", value: "10000" },
    { id: "20k", label: "20.000€", value: "20000" },
    { id: "30k", label: "30.000€", value: "30000" },
    { id: "50k", label: "50.000€+", value: "50000" }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const platforms = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      color: "text-green-500"
    },
    {
      id: "phone",
      label: t('eligibilityFunnel.platforms.phone'),
      icon: Phone,
      color: "text-tech-blue"
    },
    {
      id: "meet",
      label: "Google Meet",
      icon: Video,
      color: "text-resyne-gold"
    }
  ];

  const toggleProject = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const canProceed = () => {
    switch(step) {
      case 1: return businessType !== "";
      case 2: return selectedProjects.length > 0;
      case 3: return budget !== "";
      case 4: return description.trim().length > 0;
      case 5: return selectedDate !== undefined && selectedTime !== "";
      case 6: return formData.firstName && formData.lastName && formData.email && formData.phone && selectedPlatform;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-booking-notification', {
        body: {
          ...formData,
          businessType,
          projects: selectedProjects.join(", "),
          budget,
          description,
          date: format(selectedDate!, 'PPP', { locale: i18n.language === 'it' ? it : enUS }),
          time: selectedTime,
          platform: selectedPlatform,
          grant: grantName,
          type: 'eligibility-check'
        }
      });

      if (error) throw error;

      toast({
        title: t('eligibilityFunnel.toast.success'),
        description: t('eligibilityFunnel.toast.successDesc'),
      });

      // Reset form
      setStep(1);
      setBusinessType("");
      setSelectedProjects([]);
      setBudget("");
      setDescription("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setSelectedPlatform("");
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    } catch (error) {
      console.error('Error submitting funnel:', error);
      toast({
        title: t('eligibilityFunnel.toast.error'),
        description: t('eligibilityFunnel.toast.errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-resyne-gold/5 to-tech-blue/5">
      <div className="container mx-auto max-w-4xl">
        <Card className="glass-card border-resyne-gold/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-resyne-gold/10 to-tech-blue/10" />
          <CardContent className="p-4 sm:p-6 md:p-12 relative z-10">
            {/* Header */}
            <div className="text-center space-y-3 mb-8">
              <h2 className="font-title text-2xl sm:text-3xl md:text-4xl">
                {t('eligibilityFunnel.title')}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {t('eligibilityFunnel.subtitle')}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-subtitle text-muted-foreground">
                  {t('eligibilityFunnel.step')} {step} {t('eligibilityFunnel.of')} {totalSteps}
                </span>
                <span className="text-sm font-subtitle text-resyne-gold">
                  {Math.round((step / totalSteps) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-resyne-gold to-tech-blue transition-all duration-500"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
              {/* Step 1: Business Type */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="h-6 w-6 text-resyne-gold" />
                    <h3 className="font-subtitle text-xl">
                      {t('eligibilityFunnel.step1.title')}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {businessTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setBusinessType(type.id)}
                        className={cn(
                          "p-4 rounded-lg glass-card transition-all text-left flex items-center justify-between",
                          businessType === type.id
                            ? "border-2 border-resyne-gold bg-resyne-gold/10"
                            : "border border-border/20 hover:border-resyne-gold/50"
                        )}
                      >
                        <span className="font-subtitle">{type.label}</span>
                        {businessType === type.id && (
                          <CheckCircle className="h-5 w-5 text-resyne-gold flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Project Types */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-6 w-6 text-resyne-gold" />
                    <h3 className="font-subtitle text-xl">
                      {t('eligibilityFunnel.step2.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('eligibilityFunnel.step2.subtitle')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projectTypes.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => toggleProject(project.id)}
                        className={cn(
                          "p-4 rounded-lg glass-card transition-all text-left flex items-center gap-3",
                          selectedProjects.includes(project.id)
                            ? "border-2 border-resyne-gold bg-resyne-gold/10"
                            : "border border-border/20 hover:border-resyne-gold/50"
                        )}
                      >
                        <Checkbox 
                          checked={selectedProjects.includes(project.id)}
                          className="pointer-events-none"
                        />
                        <span className="font-subtitle">{project.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Budget */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <Euro className="h-6 w-6 text-resyne-gold" />
                    <h3 className="font-subtitle text-xl">
                      {t('eligibilityFunnel.step3.title')}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {budgetOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setBudget(option.value)}
                        className={cn(
                          "p-6 rounded-lg glass-card transition-all flex flex-col items-center gap-2",
                          budget === option.value
                            ? "border-2 border-resyne-gold bg-resyne-gold/10"
                            : "border border-border/20 hover:border-resyne-gold/50"
                        )}
                      >
                        <span className="font-title text-2xl">{option.label}</span>
                        {budget === option.value && (
                          <CheckCircle className="h-5 w-5 text-resyne-gold" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Description */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="font-subtitle text-xl">
                    {t('eligibilityFunnel.step4.title')}
                  </h3>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('eligibilityFunnel.step4.placeholder')}
                    rows={8}
                    className="glass-card text-base"
                  />
                  <p className="text-sm text-muted-foreground">
                    {t('eligibilityFunnel.step4.hint')}
                  </p>
                </div>
              )}

              {/* Step 5: Date & Time */}
              {step === 5 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="font-subtitle text-xl mb-4">
                    {t('eligibilityFunnel.step5.title')}
                  </h3>
                  
                  <div>
                    <label className="font-subtitle text-sm mb-3 block">
                      {t('eligibilityFunnel.step5.selectDate')}
                    </label>
                    <Card className="glass-card">
                      <CardContent className="p-2 sm:p-4">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          locale={i18n.language === 'it' ? it : enUS}
                          className={cn("pointer-events-auto w-full")}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {selectedDate && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <label className="font-subtitle text-sm mb-3 block">
                        {t('eligibilityFunnel.step5.selectTime')}
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              "p-3 rounded-lg glass-card transition-all font-subtitle",
                              selectedTime === time
                                ? "border-2 border-resyne-gold bg-resyne-gold/10"
                                : "border border-border/20 hover:border-resyne-gold/50"
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 6: Contact Info & Platform */}
              {step === 6 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="font-subtitle text-xl mb-4">
                    {t('eligibilityFunnel.step6.title')}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-subtitle text-sm mb-2 block">
                        {t('eligibilityFunnel.step6.firstName')}
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder={t('eligibilityFunnel.step6.firstNamePlaceholder')}
                        className="glass-card"
                      />
                    </div>
                    <div>
                      <label className="font-subtitle text-sm mb-2 block">
                        {t('eligibilityFunnel.step6.lastName')}
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder={t('eligibilityFunnel.step6.lastNamePlaceholder')}
                        className="glass-card"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-subtitle text-sm mb-2 block">
                      {t('eligibilityFunnel.step6.email')}
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('eligibilityFunnel.step6.emailPlaceholder')}
                      className="glass-card"
                    />
                  </div>

                  <div>
                    <label className="font-subtitle text-sm mb-2 block">
                      {t('eligibilityFunnel.step6.phone')}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('eligibilityFunnel.step6.phonePlaceholder')}
                      className="glass-card"
                    />
                  </div>

                  <div>
                    <label className="font-subtitle text-sm mb-3 block">
                      {t('eligibilityFunnel.step6.platform')}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {platforms.map((platform) => (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => setSelectedPlatform(platform.id)}
                          className={cn(
                            "p-4 rounded-lg glass-card transition-all flex flex-col items-center gap-2",
                            selectedPlatform === platform.id
                              ? "border-2 border-resyne-gold bg-resyne-gold/10"
                              : "border border-border/20 hover:border-resyne-gold/50"
                          )}
                        >
                          <platform.icon className={cn("h-6 w-6", platform.color)} />
                          <span className="text-xs font-subtitle text-center">{platform.label}</span>
                          {selectedPlatform === platform.id && (
                            <CheckCircle className="h-4 w-4 text-resyne-gold" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('eligibilityFunnel.back')}
                </Button>
              )}
              
              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex-1 bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light"
                >
                  {t('eligibilityFunnel.next')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed() || isLoading}
                  className="flex-1 bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light"
                >
                  {isLoading ? t('eligibilityFunnel.submitting') : t('eligibilityFunnel.submit')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
