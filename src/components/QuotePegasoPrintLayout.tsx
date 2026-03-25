import { Check, Clock, CreditCard, Euro, Landmark } from "lucide-react";
import equipeResyneLogo from "@/assets/equipe-resyne-logo.png";

interface DevelopmentItem {
  id: string;
  number: number;
  name: string;
  description: string;
  features: string[];
  category: string;
}

interface QuotePegasoPrintLayoutProps {
  items: DevelopmentItem[];
  anticipo: number;
  monthlyFee: number;
  totalProject: number;
  durationMonths: number;
}

function PrintHeader({ today, validUntil, quoteRef }: { today: string; validUntil: string; quoteRef: string }) {
  return (
    <header className="flex justify-between items-start border-b-2 border-[#30c9b0] pb-3 mb-4">
      <div>
        <img src={equipeResyneLogo} alt="Equipe Resyne" className="h-10 mb-1" />
        <p className="text-[9px] text-gray-500">Software ERP su misura</p>
      </div>
      <div className="text-right text-[9px]">
        <p className="font-bold text-sm text-[#1f1f1f] mb-0.5">PREVENTIVO</p>
        <p className="text-gray-600">Data: {today}</p>
        <p className="text-gray-600">Validità: {validUntil}</p>
        <p className="text-gray-500 font-mono text-[8px]">Rif: {quoteRef}</p>
      </div>
    </header>
  );
}

function PrintFooter({ pageNum, totalPages }: { pageNum: number; totalPages: number }) {
  return (
    <footer className="pt-2 mt-auto border-t border-[#30c9b0] flex justify-between items-center text-[9px] text-gray-500">
      <div>
        <p className="font-semibold text-gray-700">Equipe Resyne</p>
        <p>www.re-syne.com | info@re-syne.com</p>
      </div>
      <div className="text-right">
        <p className="text-[8px] text-gray-400 mb-0.5">Pagina {pageNum} di {totalPages}</p>
        <p className="text-[8px] text-gray-400">Preventivo generato automaticamente</p>
      </div>
    </footer>
  );
}

export function QuotePegasoPrintLayout({
  items,
  anticipo,
  monthlyFee,
  totalProject,
  durationMonths,
}: QuotePegasoPrintLayoutProps) {
  const today = new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
  const quoteRef = `PGS-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;

  // Split items into pages: ~12 items per page for the table
  const page1Items = items.slice(0, 12);
  const page2Items = items.slice(12);
  const totalPages = 3; // page1: items 1-12, page2: items 13-24 + pricing, page3: details

  return (
    <div className="print-layout invisible print:visible bg-white text-black fixed inset-0 z-[-1] print:z-[99999] overflow-auto">
      {/* PAGE 1 */}
      <div className="print-page w-full mx-auto flex flex-col">
        <PrintHeader today={today} validUntil={validUntil} quoteRef={quoteRef} />

        <section className="mb-4 p-2 bg-gray-50 rounded border border-gray-200">
          <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Destinatario</p>
          <p className="font-semibold text-xs">Pegaso Design</p>
          <p className="text-[10px] text-gray-500">Via ________________ | P.IVA: ________________</p>
        </section>

        <section className="mb-4 p-2 bg-[#30c9b0]/5 rounded border border-[#30c9b0]/30">
          <p className="text-[10px] text-gray-700 leading-relaxed">
            Piattaforma ERP per la gestione della sicurezza sul lavoro, degli adempimenti normativi, della sorveglianza sanitaria e della conformità aziendale. 
            Il sistema include dashboard multi-livello (admin, partner, cliente), motore centralizzato delle scadenze, archivio documentale e sistema notifiche.
          </p>
        </section>

        <section className="mb-4 flex-shrink-0">
          <p className="text-[9px] text-[#30c9b0] uppercase tracking-wider font-semibold mb-1">
            Voci di Sviluppo (1/2)
          </p>
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-center p-1.5 border-b border-[#30c9b0] font-semibold w-6">#</th>
                <th className="text-left p-1.5 border-b border-[#30c9b0] font-semibold">Voce</th>
                <th className="text-left p-1.5 border-b border-[#30c9b0] font-semibold">Descrizione</th>
              </tr>
            </thead>
            <tbody>
              {page1Items.map((item, index) => (
                <tr key={item.id} className={`print-no-break ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="p-1.5 border-b border-gray-100 text-center font-mono text-[9px] font-bold text-[#30c9b0]">{item.number}</td>
                  <td className="p-1.5 border-b border-gray-100 font-medium text-[10px] whitespace-nowrap">{item.name}</td>
                  <td className="p-1.5 border-b border-gray-100 text-gray-500 text-[9px]">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[8px] text-gray-400 mt-1 italic">Continua a pagina 2...</p>
        </section>

        <div className="flex-grow" />
        <PrintFooter pageNum={1} totalPages={totalPages} />
      </div>

      {/* PAGE 2 */}
      <div className="print-page w-full mx-auto flex flex-col print-page-break">
        <PrintHeader today={today} validUntil={validUntil} quoteRef={quoteRef} />

        <section className="mb-4 flex-shrink-0">
          <p className="text-[9px] text-[#30c9b0] uppercase tracking-wider font-semibold mb-1">
            Voci di Sviluppo (2/2)
          </p>
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-center p-1.5 border-b border-[#30c9b0] font-semibold w-6">#</th>
                <th className="text-left p-1.5 border-b border-[#30c9b0] font-semibold">Voce</th>
                <th className="text-left p-1.5 border-b border-[#30c9b0] font-semibold">Descrizione</th>
              </tr>
            </thead>
            <tbody>
              {page2Items.map((item, index) => (
                <tr key={item.id} className={`print-no-break ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="p-1.5 border-b border-gray-100 text-center font-mono text-[9px] font-bold text-[#30c9b0]">{item.number}</td>
                  <td className="p-1.5 border-b border-gray-100 font-medium text-[10px] whitespace-nowrap">{item.name}</td>
                  <td className="p-1.5 border-b border-gray-100 text-gray-500 text-[9px]">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Pricing */}
        <section className="mb-3 grid grid-cols-2 gap-2 print-no-break">
          <div className="p-3 bg-[#30c9b0]/10 rounded border-2 border-[#30c9b0]">
            <div className="flex items-center gap-1 mb-0.5">
              <Euro className="h-3 w-3 text-[#30c9b0]" />
              <p className="font-semibold text-[#30c9b0] text-[9px] uppercase">Pagamento Iniziale</p>
            </div>
            <p className="text-xl font-bold font-mono text-[#1f1f1f]">
              €{anticipo.toLocaleString('it-IT')}
            </p>
            <div className="flex items-center gap-1 text-[8px] text-gray-600 mt-1">
              <Landmark className="h-2 w-2" />
              <span>Bonifico bancario</span>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded border border-gray-200">
            <div className="flex items-center gap-1 mb-0.5">
              <CreditCard className="h-3 w-3 text-gray-500" />
              <p className="font-semibold text-gray-700 text-[9px] uppercase">Canone Mensile</p>
            </div>
            <p className="text-xl font-bold font-mono text-[#1f1f1f]">
              €{monthlyFee.toLocaleString('it-IT')}<span className="text-[10px] font-normal">/mese</span>
            </p>
            <p className="text-[8px] text-gray-600 mt-1">Durata minima: {durationMonths} mesi</p>
          </div>
        </section>

        {/* Total */}
        <section className="mb-3 p-3 bg-[#1f1f1f] rounded text-white print-no-break">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-xs">TOTALE PROGETTO</p>
              <p className="text-[9px] text-gray-300 mt-0.5 font-mono">
                €{anticipo.toLocaleString('it-IT')} + (€{monthlyFee} × {durationMonths})
              </p>
            </div>
            <p className="text-xl font-bold font-mono">€{totalProject.toLocaleString('it-IT')}</p>
          </div>
        </section>

        {/* Delivery */}
        <section className="mb-3 p-2 bg-blue-50 rounded border border-blue-200 flex items-center justify-between print-no-break">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-800 text-[10px]">Tempi di consegna stimati</p>
              <p className="text-[8px] text-blue-600">Dalla conferma al go-live</p>
            </div>
          </div>
          <p className="text-lg font-bold font-mono text-blue-800">12–16 <span className="text-[10px] font-normal">settimane</span></p>
        </section>

        {/* Incentives */}
        <section className="mb-3 p-2 bg-amber-50 rounded border border-amber-300 print-no-break">
          <p className="font-semibold text-[10px] text-amber-800 mb-1 flex items-center gap-1">
            <span className="text-amber-600">★</span> Agevolazioni e Incentivi Fiscali
          </p>
          <div className="grid grid-cols-2 gap-2 text-[8px]">
            <div className="p-1.5 bg-white rounded border border-amber-200">
              <p className="font-bold text-amber-700 text-[9px] mb-0.5">Industria 4.0 – Iperammortamento 180%</p>
              <p className="text-gray-600 leading-tight">
                Software 4.0 funzionali alla trasformazione digitale. Maggiorazione del 80% delle quote di ammortamento.
              </p>
              <p className="text-[7px] text-gray-400 mt-0.5 italic">Rif: Allegato B – L. 232/2016</p>
            </div>
            <div className="p-1.5 bg-white rounded border border-amber-200">
              <p className="font-bold text-amber-700 text-[9px] mb-0.5">Bando ISI INAIL – Sicurezza sul Lavoro</p>
              <p className="text-gray-600 leading-tight">
                Sistema Digitale di Gestione della Sicurezza sul Lavoro (SGSL) per riduzione rischio operativo e miglioramento condizioni di sicurezza.
              </p>
              <p className="text-[7px] text-gray-400 mt-0.5 italic">Rif: INAIL – Bando ISI | Contributo a fondo perduto fino al 65%</p>
            </div>
          </div>
        </section>

        <div className="flex-grow" />
        <PrintFooter pageNum={2} totalPages={totalPages} />
      </div>

      {/* PAGE 3 - Detailed features */}
      <div className="print-page w-full mx-auto flex flex-col print-page-break">
        <PrintHeader today={today} validUntil={validUntil} quoteRef={quoteRef} />

        <section className="mb-4">
          <p className="text-[9px] text-[#30c9b0] uppercase tracking-wider font-semibold mb-2">
            Dettaglio Funzionalità per Voce
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {items.slice(0, 18).map(item => (
              <div key={item.id} className="p-1.5 bg-gray-50 rounded border border-gray-100 print-no-break">
                <p className="font-semibold text-[8px] mb-0.5 text-[#30c9b0]">
                  <span className="font-mono">{item.number}.</span> {item.name}
                </p>
                <ul className="space-y-0">
                  {item.features.slice(0, 3).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-0.5 text-[7px] text-gray-600">
                      <Check className="h-2 w-2 text-[#30c9b0] mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Terms */}
        <section className="mb-3 p-2 bg-gray-50 rounded border border-gray-200 print-no-break">
          <p className="font-semibold text-[9px] text-gray-700 mb-0.5">Note e Condizioni</p>
          <ul className="text-[8px] text-gray-500 grid grid-cols-2 gap-x-3 gap-y-0">
            <li>• Preventivo valido 30 giorni</li>
            <li>• Prezzi IVA esclusa</li>
            <li>• Canone decorre dal go-live</li>
            <li>• Formazione base inclusa</li>
            <li>• Supporto email e ticket incluso</li>
            <li>• Hosting cloud GDPR compliant</li>
            <li>• Durata minima contratto: {durationMonths} mesi</li>
            <li>• Manutenzione evolutiva inclusa</li>
          </ul>
        </section>

        <div className="flex-grow" />
        <PrintFooter pageNum={3} totalPages={totalPages} />
      </div>
    </div>
  );
}
