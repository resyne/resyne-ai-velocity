import { AuditForm } from "@/components/AuditForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Audit() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <AuditForm />
      </main>
      <Footer />
    </div>
  );
}
