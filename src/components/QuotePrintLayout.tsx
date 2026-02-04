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

  return (
    <div className="print-layout invisible print:visible bg-white text-black fixed inset-0 z-[-1] print:z-[99999] overflow-auto">
      <div className="max-w-[210mm] mx-auto p-6 print:p-8">
        {/* Header */}
        <header className="flex justify-between items-start border-b-2 border-[#30c9b0] pb-4 mb-6">
          <div>
            <img 
              src={equipeResyneLogo} 
              alt="Equipe Resyne" 
              className="h-12 mb-1"
            />
            <p className="text-xs text-gray-500">Software ERP su misura per edilizia</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-bold text-base text-[#1f1f1f] mb-1">PREVENTIVO</p>
            <p className="text-gray-600">Data: {today}</p>
            <p className="text-gray-600">Validità: {validUntil}</p>
            <p className="text-gray-500 mt-1 font-mono text-[10px]">Rif: {quoteRef}</p>
          </div>
        </header>

        {/* Client info */}
        <section className="mb-5 p-3 bg-gray-50 rounded border border-gray-200">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Destinatario</p>
          <p className="font-semibold text-sm">G-Group S.r.l.</p>
          <p className="text-xs text-gray-500">Via ________________ | P.IVA: ________________</p>
        </section>

        {/* Services Table - Compact */}
        <section className="mb-5">
          <p className="text-[10px] text-[#30c9b0] uppercase tracking-wider font-semibold mb-2">
            Moduli e Servizi Inclusi
          </p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 border-b border-[#30c9b0] font-semibold">Modulo</th>
                <th className="text-left p-2 border-b border-[#30c9b0] font-semibold">Descrizione</th>
                <th className="text-right p-2 border-b border-[#30c9b0] font-semibold w-20">Valore</th>
              </tr>
            </thead>
            <tbody>
              {selectedServicesList.map((service, index) => (
                <tr key={service.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-2 border-b border-gray-100 font-medium text-[11px]">{service.name}</td>
                  <td className="p-2 border-b border-gray-100 text-gray-500 text-[10px]">{service.description}</td>
                  <td className="p-2 border-b border-gray-100 text-right font-mono text-[11px]">
                    €{service.basePrice.toLocaleString('it-IT')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td colSpan={2} className="p-2 font-semibold text-[11px]">Totale lordo ({selectedServices.length} moduli)</td>
                <td className="p-2 text-right font-mono font-semibold text-[11px]">
                  €{Math.round(grossTotal).toLocaleString('it-IT')}
                </td>
              </tr>
              {volumeDiscountPercent > 0 && (
                <tr className="bg-[#30c9b0]/10">
                  <td colSpan={2} className="p-2 text-[#30c9b0] font-semibold text-[11px]">
                    Sconto volume ({volumeDiscountPercent}%)
                  </td>
                  <td className="p-2 text-right font-mono text-[#30c9b0] font-semibold text-[11px]">
                    -€{Math.round(grossTotal - selectedTotal).toLocaleString('it-IT')}
                  </td>
                </tr>
              )}
              <tr className="bg-[#1f1f1f] text-white">
                <td colSpan={2} className="p-2 font-bold text-sm">TOTALE NETTO SERVIZI</td>
                <td className="p-2 text-right font-mono font-bold text-sm">
                  €{Math.round(selectedTotal).toLocaleString('it-IT')}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* Pricing Summary - Side by Side - More Compact */}
        <section className="mb-4 grid grid-cols-2 gap-3">
          {/* Upfront Payment */}
          <div className="p-3 bg-[#30c9b0]/10 rounded-lg border-2 border-[#30c9b0]">
            <div className="flex items-center gap-1 mb-1">
              <Euro className="h-3 w-3 text-[#30c9b0]" />
              <p className="font-semibold text-[#30c9b0] text-[10px] uppercase">Pagamento Iniziale ({upfrontPercentage}%)</p>
            </div>
            <p className="text-xl font-bold font-mono text-[#1f1f1f]">
              €{Math.round(upfrontAmount).toLocaleString('it-IT')}
            </p>
            <div className="flex items-center gap-1 text-[9px] text-gray-600 mt-1">
              <Landmark className="h-2.5 w-2.5" />
              <span>Bonifico bancario</span>
            </div>
          </div>

          {/* Monthly Fee */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-1 mb-1">
              <CreditCard className="h-3 w-3 text-gray-500" />
              <p className="font-semibold text-gray-700 text-[10px] uppercase">Canone Mensile</p>
            </div>
            <p className="text-xl font-bold font-mono text-[#1f1f1f]">
              €{Math.round(monthlyFee).toLocaleString('it-IT')}<span className="text-xs font-normal">/mese</span>
            </p>
            {monthlyDiscount > 0 && (
              <p className="text-[9px] text-[#30c9b0] font-medium">
                Risparmio del {monthlyDiscount}%
              </p>
            )}
            
            {/* Variable costs breakdown - inline */}
            <div className="text-[9px] text-gray-600 mt-1 pt-1 border-t border-gray-200 grid grid-cols-2 gap-x-2 gap-y-0.5">
              <span>Fee fissa:</span>
              <span className="font-mono text-right">€{Math.round(fixedMonthlyFee).toLocaleString('it-IT')}</span>
              {variableMonthlyFee.vehicleCost > 0 && (
                <>
                  <span className="flex items-center gap-0.5"><Truck className="h-2 w-2" /> GPS:</span>
                  <span className="font-mono text-right">€{variableMonthlyFee.vehicleCost}</span>
                </>
              )}
              {variableMonthlyFee.employeeCost > 0 && (
                <>
                  <span className="flex items-center gap-0.5"><Users className="h-2 w-2" /> Timb:</span>
                  <span className="font-mono text-right">€{variableMonthlyFee.employeeCost}</span>
                </>
              )}
              {variableMonthlyFee.storageCost > 0 && (
                <>
                  <span className="flex items-center gap-0.5"><HardDrive className="h-2 w-2" /> Storage:</span>
                  <span className="font-mono text-right">€{variableMonthlyFee.storageCost}</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Delivery Time - Compact */}
        <section className="mb-5 p-3 bg-blue-50 rounded border border-blue-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-800 text-xs">Tempi di consegna stimati</p>
              <p className="text-[10px] text-blue-600">Dalla conferma dell'ordine al go-live</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold font-mono text-blue-800">{deliveryWeeks} <span className="text-xs font-normal">settimane</span></p>
          </div>
        </section>

        {/* Features List - More compact */}
        {selectedServicesList.length > 0 && (
          <section className="mb-5">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">
              Funzionalità Dettagliate
            </p>
            <div className="grid grid-cols-3 gap-2">
              {selectedServicesList.slice(0, 6).map(service => (
                <div key={service.id} className="p-2 bg-gray-50 rounded border border-gray-100">
                  <p className="font-semibold text-[10px] mb-1 text-[#30c9b0]">{service.name}</p>
                  <ul className="space-y-0.5">
                    {service.features?.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1 text-[9px] text-gray-600">
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

        {/* Terms - Compact */}
        <section className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
          <p className="font-semibold text-[10px] text-gray-700 mb-1">Note e Condizioni</p>
          <ul className="text-[9px] text-gray-500 grid grid-cols-2 gap-x-4 gap-y-0.5">
            <li>• Preventivo valido 30 giorni dalla data di emissione</li>
            <li>• I prezzi sono IVA esclusa</li>
            <li>• Il canone mensile decorre dalla data di go-live</li>
            <li>• Formazione base inclusa</li>
            <li>• Supporto tecnico incluso: email e ticket</li>
            <li>• Hosting cloud conforme GDPR</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="pt-3 border-t border-[#30c9b0] flex justify-between items-center text-[10px] text-gray-500">
          <div>
            <p className="font-semibold text-gray-700">Equipe Resyne</p>
            <p>www.re-syne.com | info@re-syne.com</p>
          </div>
          <p className="text-[9px] text-gray-400 text-right">
            Preventivo generato automaticamente<br/>
            Non necessita di firma
          </p>
        </footer>
      </div>
    </div>
  );
}
