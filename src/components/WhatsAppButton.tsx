import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.link/vvhx4j";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-white shadow-2xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" fill="currentColor" />
      <span className="text-sm font-semibold whitespace-nowrap">Chat us on whatsapp</span>
    </a>
  );
};

export default WhatsAppButton;
