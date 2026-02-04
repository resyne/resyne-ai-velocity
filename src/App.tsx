import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { DemoSection } from "@/components/DemoSection";
import { LeadSection } from "@/components/LeadSection";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import Audit from "./pages/Audit";
import WebsiteInOneDay from "./pages/WebsiteInOneDay";
import BookACall from "./pages/BookACall";
import BandoPID from "./pages/BandoPID";
import VoucherVdA from "./pages/VoucherVdA";
import DigitSicilia from "./pages/DigitSicilia";
import Automation from "./pages/Automation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <HeroSection />
              <DemoSection />
              <LeadSection />
              <Footer />
            </>
          } />
          <Route path="/audit" element={<Audit />} />
          <Route path="/website-in-1-day" element={<WebsiteInOneDay />} />
          <Route path="/book-a-call" element={<BookACall />} />
          <Route path="/bando-pid" element={<BandoPID />} />
          <Route path="/voucher-vda" element={<VoucherVdA />} />
          <Route path="/digit-sicilia" element={<DigitSicilia />} />
          <Route path="/automation" element={<Automation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
