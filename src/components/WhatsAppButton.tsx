import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.link/vvhx4j";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-1 rounded-xl bg-[#25D366] px-3 py-2 text-white shadow-2xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] md:bottom-8 md:right-8 md:gap-2 md:rounded-2xl md:px-6 md:py-4"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 md:h-8 md:w-8" fill="currentColor" />
      <span className="text-xs font-semibold whitespace-nowrap md:text-sm">Chat us on whatsapp</span>
    </a>
  );
};

export default WhatsAppButton;
