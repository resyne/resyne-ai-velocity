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

  const selectedServicesList = services.filter(s => selectedServices.includes(s.id));

  return (
    <div className="print-layout hidden print:block bg-white text-black p-8 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-start border-b-2 border-[#30c9b0] pb-6 mb-8">
        <div>
          <img 
            src={equipeResyneLogo} 
            alt="Equipe Resyne" 
            className="h-16 mb-2"
          />
          <p className="text-sm text-gray-600 mt-2">Software ERP su misura per edilizia</p>
        </div>
        <div className="text-right text-sm">
          <p className="font-semibold text-lg mb-2">PREVENTIVO</p>
          <p className="text-gray-600">Data: {today}</p>
          <p className="text-gray-600">Validità: {validUntil}</p>
          <p className="text-gray-600 mt-2">Rif: ERP-{Date.now().toString().slice(-6)}</p>
        </div>
      </header>

      {/* Client info placeholder */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-sm text-gray-500 mb-2">DESTINATARIO</h3>
        <p className="text-lg font-semibold">G-Group S.r.l.</p>
        <p className="text-sm text-gray-600">Via ________________</p>
        <p className="text-sm text-gray-600">P.IVA: ________________</p>
      </section>

      {/* Services Table */}
      <section className="mb-8">
        <h3 className="font-semibold text-sm text-[#30c9b0] mb-4 uppercase tracking-wide">
          Moduli e Servizi Inclusi
        </h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 border-b-2 border-[#30c9b0] font-semibold">Modulo</th>
              <th className="text-left p-3 border-b-2 border-[#30c9b0] font-semibold">Descrizione</th>
              <th className="text-right p-3 border-b-2 border-[#30c9b0] font-semibold">Valore</th>
            </tr>
          </thead>
          <tbody>
            {selectedServicesList.map((service, index) => (
              <tr key={service.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-3 border-b border-gray-200 font-medium">{service.name}</td>
                <td className="p-3 border-b border-gray-200 text-gray-600 text-xs">{service.description}</td>
                <td className="p-3 border-b border-gray-200 text-right font-mono">
                  €{service.basePrice.toLocaleString('it-IT')}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td colSpan={2} className="p-3 font-semibold">Totale lordo ({selectedServices.length} moduli)</td>
              <td className="p-3 text-right font-mono font-semibold">
                €{Math.round(grossTotal).toLocaleString('it-IT')}
              </td>
            </tr>
            {volumeDiscountPercent > 0 && (
              <tr className="bg-[#30c9b0]/10">
                <td colSpan={2} className="p-3 text-[#30c9b0] font-semibold">
                  Sconto volume ({volumeDiscountPercent}%)
                </td>
                <td className="p-3 text-right font-mono text-[#30c9b0] font-semibold">
                  -€{Math.round(grossTotal - selectedTotal).toLocaleString('it-IT')}
                </td>
              </tr>
            )}
            <tr className="bg-[#1f1f1f] text-white">
              <td colSpan={2} className="p-4 font-bold text-lg">TOTALE NETTO SERVIZI</td>
              <td className="p-4 text-right font-mono font-bold text-lg">
                €{Math.round(selectedTotal).toLocaleString('it-IT')}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>

      {/* Pricing Summary */}
      <section className="mb-8 grid grid-cols-2 gap-6">
        {/* Upfront Payment */}
        <div className="p-6 bg-[#30c9b0]/10 rounded-lg border-2 border-[#30c9b0]">
          <div className="flex items-center gap-2 mb-3">
            <Euro className="h-5 w-5 text-[#30c9b0]" />
            <h4 className="font-semibold text-[#30c9b0]">PAGAMENTO INIZIALE ({upfrontPercentage}%)</h4>
          </div>
          <p className="text-4xl font-bold font-mono text-[#1f1f1f] mb-2">
            €{Math.round(upfrontAmount).toLocaleString('it-IT')}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-3 pt-3 border-t border-[#30c9b0]/30">
            <Landmark className="h-4 w-4" />
            <span>Pagamento: Bonifico bancario</span>
          </div>
        </div>

        {/* Monthly Fee */}
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-5 w-5 text-gray-600" />
            <h4 className="font-semibold text-gray-700">CANONE MENSILE</h4>
          </div>
          <p className="text-4xl font-bold font-mono text-[#1f1f1f] mb-2">
            €{Math.round(monthlyFee).toLocaleString('it-IT')}/mese
          </p>
          {monthlyDiscount > 0 && (
            <p className="text-sm text-[#30c9b0] font-medium">
              Risparmio del {monthlyDiscount}% sulla fee base
            </p>
          )}
          
          {/* Variable costs breakdown */}
          <div className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-200 space-y-1">
            <div className="flex justify-between">
              <span>Fee fissa:</span>
              <span className="font-mono">€{Math.round(fixedMonthlyFee).toLocaleString('it-IT')}</span>
            </div>
            {variableMonthlyFee.vehicleCost > 0 && (
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Truck className="h-3 w-3" /> GPS ({numVehicles} mezzi × €8):
                </span>
                <span className="font-mono">€{variableMonthlyFee.vehicleCost.toLocaleString('it-IT')}</span>
              </div>
            )}
            {variableMonthlyFee.employeeCost > 0 && (
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> Timbrature ({numEmployees} dip. × €2):
                </span>
                <span className="font-mono">€{variableMonthlyFee.employeeCost.toLocaleString('it-IT')}</span>
              </div>
            )}
            {variableMonthlyFee.storageCost > 0 && (
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <HardDrive className="h-3 w-3" /> Storage ({selectedStorage}):
                </span>
                <span className="font-mono">€{variableMonthlyFee.storageCost.toLocaleString('it-IT')}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-3 pt-3 border-t border-gray-200">
            <CreditCard className="h-4 w-4" />
            <span>Addebito automatico su carta di credito</span>
          </div>
        </div>
      </section>

      {/* Delivery Time */}
      <section className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-blue-600" />
          <div>
            <h4 className="font-semibold text-blue-800">Tempi di consegna stimati</h4>
            <p className="text-sm text-blue-600">Dalla conferma dell'ordine al go-live</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold font-mono text-blue-800">{deliveryWeeks}</p>
          <p className="text-sm text-blue-600">settimane</p>
        </div>
      </section>

      {/* Features List */}
      <section className="mb-8">
        <h3 className="font-semibold text-sm text-gray-500 mb-4 uppercase tracking-wide">
          Funzionalità Dettagliate
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {selectedServicesList.map(service => (
            <div key={service.id} className="p-3 bg-gray-50 rounded border border-gray-200">
              <h4 className="font-semibold text-sm mb-2 text-[#30c9b0]">{service.name}</h4>
              <ul className="space-y-1">
                {service.features?.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                    <Check className="h-3 w-3 text-[#30c9b0] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Terms */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Note e Condizioni</h3>
        <ul className="space-y-1 list-disc list-inside">
          <li>Preventivo valido 30 giorni dalla data di emissione</li>
          <li>I prezzi sono IVA esclusa</li>
          <li>Il canone mensile decorre dalla data di go-live</li>
          <li>Formazione base inclusa; formazione avanzata quotata separatamente</li>
          <li>Supporto tecnico incluso: email e ticket; supporto telefonico su richiesta</li>
          <li>Hosting cloud su infrastruttura europea sicura e conforme GDPR</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="pt-6 border-t-2 border-[#30c9b0] text-center text-sm text-gray-500">
        <p className="font-semibold text-gray-700 mb-1">Equipe Resyne</p>
        <p>www.resyne.it | info@resyne.it</p>
        <p className="mt-4 text-xs">
          Questo preventivo è stato generato automaticamente e non necessita di firma.
        </p>
      </footer>
    </div>
  );
}
