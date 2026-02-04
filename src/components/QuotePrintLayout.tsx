import { Check, Clock, CreditCard, Euro, HardDrive, Landmark, Truck, Users } from "lucide-react";
import equipeResyneLogo from "@/assets/equipe-resyne-logo.png";

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  features?: string[];
}

interface QuotePrintLayoutProps {
  selectedServices: string[];
  services: Service[];
  grossTotal: number;
  selectedTotal: number;
  volumeDiscountPercent: number;
  upfrontPercentage: number;
  upfrontAmount: number;
  fixedMonthlyFee: number;
  monthlyFee: number;
  monthlyDiscount: number;
  variableMonthlyFee: {
    vehicleCost: number;
    employeeCost: number;
    storageCost: number;
    total: number;
  };
  numVehicles: number;
  numEmployees: number;
  selectedStorage: string;
  deliveryWeeks: number;
}

// Header component for print pages
function PrintHeader({ today, validUntil, quoteRef }: { today: string; validUntil: string; quoteRef: string }) {
  return (
    <header className="flex justify-between items-start border-b-2 border-[#30c9b0] pb-3 mb-4">
      <div>
        <img 
          src={equipeResyneLogo} 
          alt="Equipe Resyne" 
          className="h-10 mb-1"
        />
        <p className="text-[9px] text-gray-500">Software ERP su misura per edilizia</p>
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

// Footer component for print pages
function PrintFooter({ pageNum, totalPages }: { pageNum?: number; totalPages?: number }) {
  return (
    <footer className="pt-2 mt-auto border-t border-[#30c9b0] flex justify-between items-center text-[9px] text-gray-500">
      <div>
        <p className="font-semibold text-gray-700">Equipe Resyne</p>
        <p>www.re-syne.com | info@re-syne.com</p>
      </div>
      <div className="text-right">
        {pageNum && totalPages && (
          <p className="text-[8px] text-gray-400 mb-0.5">Pagina {pageNum} di {totalPages}</p>
        )}
        <p className="text-[8px] text-gray-400">
          Preventivo generato automaticamente
        </p>
      </div>
    </footer>
  );
}

export function QuotePrintLayout({
  selectedServices,
  services,
  grossTotal,
  selectedTotal,
  volumeDiscountPercent,
  upfrontPercentage,
  upfrontAmount,
  fixedMonthlyFee,
  monthlyFee,
  monthlyDiscount,
  variableMonthlyFee,
  numVehicles,
  numEmployees,
  selectedStorage,
  deliveryWeeks,
}: QuotePrintLayoutProps) {
  const today = new Date().toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const quoteRef = `ERP-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
  const selectedServicesList = services.filter(s => selectedServices.includes(s.id));
  
  // Determine if we need multiple pages (more than 8 services = 2 pages)
  const needsSecondPage = selectedServicesList.length > 8;
  const firstPageServices = selectedServicesList.slice(0, 8);
  const secondPageServices = selectedServicesList.slice(8);

  return (
    <div className="print-layout invisible print:visible bg-white text-black fixed inset-0 z-[-1] print:z-[99999] overflow-auto">
      {/* PAGE 1 */}
      <div className="print-page w-full mx-auto flex flex-col">
        <PrintHeader today={today} validUntil={validUntil} quoteRef={quoteRef} />

        {/* Client info */}
        <section className="mb-4 p-2 bg-gray-50 rounded border border-gray-200">
          <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Destinatario</p>
          <p className="font-semibold text-xs">G-Group S.r.l.</p>
          <p className="text-[10px] text-gray-500">Via ________________ | P.IVA: ________________</p>
        </section>

        {/* Services Table */}
        <section className="mb-4 flex-shrink-0">
          <p className="text-[9px] text-[#30c9b0] uppercase tracking-wider font-semibold mb-1">
            Moduli e Servizi Inclusi {needsSecondPage && "(1/2)"}
          </p>
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-1.5 border-b border-[#30c9b0] font-semibold">Modulo</th>
                <th className="text-left p-1.5 border-b border-[#30c9b0] font-semibold">Descrizione</th>
                <th className="text-right p-1.5 border-b border-[#30c9b0] font-semibold w-16">Valore</th>
              </tr>
            </thead>
            <tbody>
              {firstPageServices.map((service, index) => (
                <tr key={service.id} className={`print-no-break ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="p-1.5 border-b border-gray-100 font-medium text-[10px]">{service.name}</td>
                  <td className="p-1.5 border-b border-gray-100 text-gray-500 text-[9px]">{service.description}</td>
                  <td className="p-1.5 border-b border-gray-100 text-right font-mono text-[10px]">
                    €{service.basePrice.toLocaleString('it-IT')}
                  </td>
                </tr>
              ))}
            </tbody>
            {!needsSecondPage && (
              <tfoot>
                <tr className="bg-gray-100">
                  <td colSpan={2} className="p-1.5 font-semibold text-[10px]">Totale lordo ({selectedServices.length} moduli)</td>
                  <td className="p-1.5 text-right font-mono font-semibold text-[10px]">
                    €{Math.round(grossTotal).toLocaleString('it-IT')}
                  </td>
                </tr>
                {volumeDiscountPercent > 0 && (
                  <tr className="bg-[#30c9b0]/10">
                    <td colSpan={2} className="p-1.5 text-[#30c9b0] font-semibold text-[10px]">
                      Sconto volume ({volumeDiscountPercent}%)
                    </td>
                    <td className="p-1.5 text-right font-mono text-[#30c9b0] font-semibold text-[10px]">
                      -€{Math.round(grossTotal - selectedTotal).toLocaleString('it-IT')}
                    </td>
                  </tr>
                )}
                <tr className="bg-[#1f1f1f] text-white">
                  <td colSpan={2} className="p-1.5 font-bold text-xs">TOTALE NETTO SERVIZI</td>
                  <td className="p-1.5 text-right font-mono font-bold text-xs">
                    €{Math.round(selectedTotal).toLocaleString('it-IT')}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
          {needsSecondPage && (
            <p className="text-[8px] text-gray-400 mt-1 italic">Continua a pagina 2...</p>
          )}
        </section>

        {/* Pricing Summary - Only on page 1 if no second page needed */}
        {!needsSecondPage && (
          <>
            <section className="mb-3 grid grid-cols-2 gap-2 print-no-break">
              {/* Upfront Payment */}
              <div className="p-2 bg-[#30c9b0]/10 rounded border-2 border-[#30c9b0]">
                <div className="flex items-center gap-1 mb-0.5">
                  <Euro className="h-3 w-3 text-[#30c9b0]" />
                  <p className="font-semibold text-[#30c9b0] text-[9px] uppercase">Pagamento Iniziale ({upfrontPercentage}%)</p>
                </div>
                <p className="text-lg font-bold font-mono text-[#1f1f1f]">
                  €{Math.round(upfrontAmount).toLocaleString('it-IT')}
                </p>
                <div className="flex items-center gap-1 text-[8px] text-gray-600 mt-0.5">
                  <Landmark className="h-2 w-2" />
                  <span>Bonifico bancario</span>
                </div>
              </div>

              {/* Monthly Fee */}
              <div className="p-2 bg-gray-50 rounded border border-gray-200">
                <div className="flex items-center gap-1 mb-0.5">
                  <CreditCard className="h-3 w-3 text-gray-500" />
                  <p className="font-semibold text-gray-700 text-[9px] uppercase">Canone Mensile</p>
                </div>
                <p className="text-lg font-bold font-mono text-[#1f1f1f]">
                  €{Math.round(monthlyFee).toLocaleString('it-IT')}<span className="text-[10px] font-normal">/mese</span>
                </p>
                {monthlyDiscount > 0 && (
                  <p className="text-[8px] text-[#30c9b0] font-medium">Risparmio del {monthlyDiscount}%</p>
                )}
                <div className="text-[8px] text-gray-600 mt-0.5 pt-0.5 border-t border-gray-200 space-y-0">
                  <div className="flex justify-between">
                    <span>Fee fissa:</span>
                    <span className="font-mono">€{Math.round(fixedMonthlyFee).toLocaleString('it-IT')}</span>
                  </div>
                  {variableMonthlyFee.vehicleCost > 0 && (
                    <div className="flex justify-between">
                      <span className="flex items-center gap-0.5"><Truck className="h-2 w-2" /> GPS ({numVehicles}×€8):</span>
                      <span className="font-mono">€{variableMonthlyFee.vehicleCost}</span>
                    </div>
                  )}
                  {variableMonthlyFee.employeeCost > 0 && (
                    <div className="flex justify-between">
                      <span className="flex items-center gap-0.5"><Users className="h-2 w-2" /> Timb ({numEmployees}×€2):</span>
                      <span className="font-mono">€{variableMonthlyFee.employeeCost}</span>
                    </div>
                  )}
                  {variableMonthlyFee.storageCost > 0 && (
                    <div className="flex justify-between">
                      <span className="flex items-center gap-0.5"><HardDrive className="h-2 w-2" /> Storage:</span>
                      <span className="font-mono">€{variableMonthlyFee.storageCost}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Delivery Time */}
            <section className="mb-3 p-2 bg-blue-50 rounded border border-blue-200 flex items-center justify-between print-no-break">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800 text-[10px]">Tempi di consegna stimati</p>
                  <p className="text-[8px] text-blue-600">Dalla conferma al go-live</p>
                </div>
              </div>
              <p className="text-lg font-bold font-mono text-blue-800">{deliveryWeeks} <span className="text-[10px] font-normal">settimane</span></p>
            </section>

            {/* Features Grid */}
            {selectedServicesList.length > 0 && (
              <section className="mb-3">
                <p className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                  Funzionalità Dettagliate
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {selectedServicesList.slice(0, 6).map(service => (
                    <div key={service.id} className="p-1.5 bg-gray-50 rounded border border-gray-100 print-no-break">
                      <p className="font-semibold text-[9px] mb-0.5 text-[#30c9b0]">{service.name}</p>
                      <ul className="space-y-0">
                        {service.features?.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-0.5 text-[8px] text-gray-600">
                            <Check className="h-2 w-2 text-[#30c9b0] mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Incentives Section */}
            <section className="mb-3 p-2 bg-amber-50 rounded border border-amber-300 print-no-break">
              <p className="font-semibold text-[10px] text-amber-800 mb-1 flex items-center gap-1">
                <span className="text-amber-600">★</span> Agevolazioni e Incentivi Fiscali
              </p>
              <div className="grid grid-cols-2 gap-2 text-[8px]">
                <div className="p-1.5 bg-white rounded border border-amber-200">
                  <p className="font-bold text-amber-700 text-[9px] mb-0.5">Industria 4.0 – Iperammortamento 180%</p>
                  <p className="text-gray-600 leading-tight">
                    Software 4.0 funzionali alla trasformazione digitale (ERP, MES, APS). 
                    Credito d'imposta fino al 20% per investimenti fino a 1M€.
                  </p>
                  <p className="text-[7px] text-gray-400 mt-0.5 italic">Rif: Allegato B – L. 232/2016 e L. 205/2017</p>
                </div>
                <div className="p-1.5 bg-white rounded border border-amber-200">
                  <p className="font-bold text-amber-700 text-[9px] mb-0.5">Nuova Sabatini – Beni Strumentali</p>
                  <p className="text-gray-600 leading-tight">
                    Contributo MiMIT per acquisto di beni strumentali (software inclusi). 
                    Agevolazione pari al 7,7% su finanziamenti fino a 4M€.
                  </p>
                  <p className="text-[7px] text-gray-400 mt-0.5 italic">Rif: MiSE/MiMIT – Beni Strumentali</p>
                </div>
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
              </ul>
            </section>
          </>
        )}

        <div className="flex-grow" />
        <PrintFooter pageNum={needsSecondPage ? 1 : undefined} totalPages={needsSecondPage ? 2 : undefined} />
      </div>

      {/* PAGE 2 - Only if needed */}
      {needsSecondPage && (
        <div className="print-page w-full mx-auto flex flex-col print-page-break">
          <PrintHeader today={today} validUntil={validUntil} quoteRef={quoteRef} />

          {/* Continue Services Table */}
          <section className="mb-4">
            <p className="text-[9px] text-[#30c9b0] uppercase tracking-wider font-semibold mb-1">
              Moduli e Servizi Inclusi (2/2)
            </p>
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-1.5 border-b border-[#30c9b0] font-semibold">Modulo</th>
                  <th className="text-left p-1.5 border-b border-[#30c9b0] font-semibold">Descrizione</th>
                  <th className="text-right p-1.5 border-b border-[#30c9b0] font-semibold w-16">Valore</th>
                </tr>
              </thead>
              <tbody>
                {secondPageServices.map((service, index) => (
                  <tr key={service.id} className={`print-no-break ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-1.5 border-b border-gray-100 font-medium text-[10px]">{service.name}</td>
                    <td className="p-1.5 border-b border-gray-100 text-gray-500 text-[9px]">{service.description}</td>
                    <td className="p-1.5 border-b border-gray-100 text-right font-mono text-[10px]">
                      €{service.basePrice.toLocaleString('it-IT')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100">
                  <td colSpan={2} className="p-1.5 font-semibold text-[10px]">Totale lordo ({selectedServices.length} moduli)</td>
                  <td className="p-1.5 text-right font-mono font-semibold text-[10px]">
                    €{Math.round(grossTotal).toLocaleString('it-IT')}
                  </td>
                </tr>
                {volumeDiscountPercent > 0 && (
                  <tr className="bg-[#30c9b0]/10">
                    <td colSpan={2} className="p-1.5 text-[#30c9b0] font-semibold text-[10px]">
                      Sconto volume ({volumeDiscountPercent}%)
                    </td>
                    <td className="p-1.5 text-right font-mono text-[#30c9b0] font-semibold text-[10px]">
                      -€{Math.round(grossTotal - selectedTotal).toLocaleString('it-IT')}
                    </td>
                  </tr>
                )}
                <tr className="bg-[#1f1f1f] text-white">
                  <td colSpan={2} className="p-1.5 font-bold text-xs">TOTALE NETTO SERVIZI</td>
                  <td className="p-1.5 text-right font-mono font-bold text-xs">
                    €{Math.round(selectedTotal).toLocaleString('it-IT')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>

          {/* Pricing Summary */}
          <section className="mb-3 grid grid-cols-2 gap-2 print-no-break">
            {/* Upfront Payment */}
            <div className="p-2 bg-[#30c9b0]/10 rounded border-2 border-[#30c9b0]">
              <div className="flex items-center gap-1 mb-0.5">
                <Euro className="h-3 w-3 text-[#30c9b0]" />
                <p className="font-semibold text-[#30c9b0] text-[9px] uppercase">Pagamento Iniziale ({upfrontPercentage}%)</p>
              </div>
              <p className="text-lg font-bold font-mono text-[#1f1f1f]">
                €{Math.round(upfrontAmount).toLocaleString('it-IT')}
              </p>
              <div className="flex items-center gap-1 text-[8px] text-gray-600 mt-0.5">
                <Landmark className="h-2 w-2" />
                <span>Bonifico bancario</span>
              </div>
            </div>

            {/* Monthly Fee */}
            <div className="p-2 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center gap-1 mb-0.5">
                <CreditCard className="h-3 w-3 text-gray-500" />
                <p className="font-semibold text-gray-700 text-[9px] uppercase">Canone Mensile</p>
              </div>
              <p className="text-lg font-bold font-mono text-[#1f1f1f]">
                €{Math.round(monthlyFee).toLocaleString('it-IT')}<span className="text-[10px] font-normal">/mese</span>
              </p>
              {monthlyDiscount > 0 && (
                <p className="text-[8px] text-[#30c9b0] font-medium">Risparmio del {monthlyDiscount}%</p>
              )}
              <div className="text-[8px] text-gray-600 mt-0.5 pt-0.5 border-t border-gray-200 space-y-0">
                <div className="flex justify-between">
                  <span>Fee fissa:</span>
                  <span className="font-mono">€{Math.round(fixedMonthlyFee).toLocaleString('it-IT')}</span>
                </div>
                {variableMonthlyFee.vehicleCost > 0 && (
                  <div className="flex justify-between">
                    <span className="flex items-center gap-0.5"><Truck className="h-2 w-2" /> GPS ({numVehicles}×€8):</span>
                    <span className="font-mono">€{variableMonthlyFee.vehicleCost}</span>
                  </div>
                )}
                {variableMonthlyFee.employeeCost > 0 && (
                  <div className="flex justify-between">
                    <span className="flex items-center gap-0.5"><Users className="h-2 w-2" /> Timb ({numEmployees}×€2):</span>
                    <span className="font-mono">€{variableMonthlyFee.employeeCost}</span>
                  </div>
                )}
                {variableMonthlyFee.storageCost > 0 && (
                  <div className="flex justify-between">
                    <span className="flex items-center gap-0.5"><HardDrive className="h-2 w-2" /> Storage:</span>
                    <span className="font-mono">€{variableMonthlyFee.storageCost}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Delivery Time */}
          <section className="mb-3 p-2 bg-blue-50 rounded border border-blue-200 flex items-center justify-between print-no-break">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-800 text-[10px]">Tempi di consegna stimati</p>
                <p className="text-[8px] text-blue-600">Dalla conferma al go-live</p>
              </div>
            </div>
            <p className="text-lg font-bold font-mono text-blue-800">{deliveryWeeks} <span className="text-[10px] font-normal">settimane</span></p>
          </section>

          {/* Features Grid - Page 2 */}
          {selectedServicesList.length > 6 && (
            <section className="mb-3">
              <p className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                Funzionalità Dettagliate
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {selectedServicesList.slice(6, 12).map(service => (
                  <div key={service.id} className="p-1.5 bg-gray-50 rounded border border-gray-100 print-no-break">
                    <p className="font-semibold text-[9px] mb-0.5 text-[#30c9b0]">{service.name}</p>
                    <ul className="space-y-0">
                      {service.features?.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-0.5 text-[8px] text-gray-600">
                          <Check className="h-2 w-2 text-[#30c9b0] mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Incentives Section */}
          <section className="mb-3 p-2 bg-amber-50 rounded border border-amber-300 print-no-break">
            <p className="font-semibold text-[10px] text-amber-800 mb-1 flex items-center gap-1">
              <span className="text-amber-600">★</span> Agevolazioni e Incentivi Fiscali
            </p>
            <div className="grid grid-cols-2 gap-2 text-[8px]">
              <div className="p-1.5 bg-white rounded border border-amber-200">
                <p className="font-bold text-amber-700 text-[9px] mb-0.5">Industria 4.0 – Iperammortamento 180%</p>
                <p className="text-gray-600 leading-tight">
                  Software 4.0 funzionali alla trasformazione digitale (ERP, MES, APS). 
                  Credito d'imposta fino al 20% per investimenti fino a 1M€.
                </p>
                <p className="text-[7px] text-gray-400 mt-0.5 italic">Rif: Allegato B – L. 232/2016 e L. 205/2017</p>
              </div>
              <div className="p-1.5 bg-white rounded border border-amber-200">
                <p className="font-bold text-amber-700 text-[9px] mb-0.5">Nuova Sabatini – Beni Strumentali</p>
                <p className="text-gray-600 leading-tight">
                  Contributo MiMIT per acquisto di beni strumentali (software inclusi). 
                  Agevolazione pari al 7,7% su finanziamenti fino a 4M€.
                </p>
                <p className="text-[7px] text-gray-400 mt-0.5 italic">Rif: MiSE/MiMIT – Beni Strumentali</p>
              </div>
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
            </ul>
          </section>

          <div className="flex-grow" />
          <PrintFooter pageNum={2} totalPages={2} />
        </div>
      )}
    </div>
  );
}
