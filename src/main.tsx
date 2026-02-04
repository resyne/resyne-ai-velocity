import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-tiffany border-t-transparent rounded-full animate-spin" />
          <div className="text-foreground text-lg">Caricamento...</div>
        </div>
      </div>
    }>
      <App />
    </Suspense>
  </HelmetProvider>
);
