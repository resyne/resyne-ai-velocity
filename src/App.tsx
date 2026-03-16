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
import { FounderSection } from "@/components/FounderSection";

import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Audit from "./pages/Audit";
import ERPLogin from "./pages/ERPLogin";
import ERPLayout from "./components/erp/ERPLayout";
import CommesseView from "./components/erp/CommesseView";
import ClientiView from "./components/erp/ClientiView";
import FatturazioneView from "./components/erp/FatturazioneView";
import ScadenzeView from "./components/erp/ScadenzeView";

import BookACall from "./pages/BookACall";
import BandoPID from "./pages/BandoPID";
import VoucherVdA from "./pages/VoucherVdA";
import DigitSicilia from "./pages/DigitSicilia";
import Automation from "./pages/Automation";
import AISolutions from "./pages/AISolutions";
import QuoteGGroup from "./pages/QuoteGGroup";
import Amitrano from "./pages/Amitrano";
import QuotePegasoDesign from "./pages/QuotePegasoDesign";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <HeroSection />
                <FounderSection />
                <DemoSection />
                <LeadSection />
                <Footer />
              </>
            } />
            <Route path="/audit" element={<Audit />} />
            <Route path="/erp/login" element={<ERPLogin />} />
            <Route path="/erp" element={<ERPLayout />}>
              <Route index element={<CommesseView />} />
              <Route path="clienti" element={<ClientiView />} />
              <Route path="fatturazione" element={<FatturazioneView />} />
              <Route path="scadenze" element={<ScadenzeView />} />
            </Route>
            <Route path="/book-a-call" element={<BookACall />} />
            <Route path="/bando-pid" element={<BandoPID />} />
            <Route path="/voucher-vda" element={<VoucherVdA />} />
            <Route path="/digit-sicilia" element={<DigitSicilia />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/ai-solutions" element={<AISolutions />} />
            <Route path="/quote-ggroup" element={<QuoteGGroup />} />
            <Route path="/amitrano" element={<Amitrano />} />
            <Route path="/quote-pegasodesign" element={<QuotePegasoDesign />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
