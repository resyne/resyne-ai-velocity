import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import resyneLogo from "@/assets/resyne-logo-white.png";

export const QuickMessagePopup = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      const wasClosed = sessionStorage.getItem("quickMessageClosed");
      if (!wasClosed) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
    sessionStorage.setItem("quickMessageClosed", "true");
  };

  if (!isVisible || isClosed) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-left duration-500"
      role="dialog"
      aria-label={t("quickMessage.title")}
    >
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white rounded-2xl shadow-2xl p-4 pr-12 max-w-[320px] relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex gap-3 items-start">
          <div className="flex-shrink-0">
            <img 
              src={resyneLogo} 
              alt="Resyne" 
              className="w-12 h-12 rounded-full bg-white/10 p-2 object-contain"
            />
          </div>
          
          <div className="flex-1 pt-1">
            <h3 className="font-semibold text-base mb-1">
              {t("quickMessage.title")}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              {t("quickMessage.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
