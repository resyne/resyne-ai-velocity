import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, FileText } from "lucide-react";

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  vat_rate: number;
  status: string;
  issue_date: string;
  due_date: string | null;
  paid_date: string | null;
  notes: string;
  project_id: string | null;
  client_id: string | null;
}

const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  draft: { label: "Bozza", variant: "outline" },
  sent: { label: "Inviata", variant: "secondary" },
  paid: { label: "Pagata", variant: "default" },
  overdue: { label: "Scaduta", variant: "destructive" },
};

export default function FatturazioneView() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [form, setForm] = useState({
    invoice_number: "", amount: "", vat_rate: "22", status: "draft",
    issue_date: new Date().toISOString().split("T")[0], due_date: "", notes: "",
  });

  const fetchInvoices = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase.from("erp_invoices").select("*").order("issue_date", { ascending: false });
      setInvoices((data as Invoice[]) || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  const createInvoice = async () => {
    if (!form.invoice_number.trim() || !user) return;
    try {
      const { error } = await supabase.from("erp_invoices").insert({
        user_id: user.id,
        invoice_number: form.invoice_number.trim(),
        amount: parseFloat(form.amount) || 0,
        vat_rate: parseFloat(form.vat_rate) || 22,
        status: form.status,
        issue_date: form.issue_date,
        due_date: form.due_date || null,
        notes: form.notes,
      });
      if (error) { toast({ title: "Errore", description: error.message, variant: "destructive" }); return; }
      setForm({ invoice_number: "", amount: "", vat_rate: "22", status: "draft", issue_date: new Date().toISOString().split("T")[0], due_date: "", notes: "" });
      setIsCreateOpen(false);
      fetchInvoices();
      toast({ title: "Fattura creata" });
    } catch (err) { console.error(err); }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const updateData: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
      if (status === "paid") updateData.paid_date = new Date().toISOString().split("T")[0];
      await supabase.from("erp_invoices").update(updateData).eq("id", id);
      fetchInvoices();
    } catch (err) { console.error(err); }
  };

  const deleteInvoice = async (id: string) => {
    try {
      await supabase.from("erp_invoices").delete().eq("id", id);
      fetchInvoices();
      toast({ title: "Fattura eliminata" });
    } catch (err) { console.error(err); }
  };

  const totalAmount = invoices.reduce((sum, i) => sum + Number(i.amount), 0);
  const paidAmount = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading">Fatturazione</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Nuova Fattura</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nuova Fattura</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Numero Fattura *</Label><Input value={form.invoice_number} onChange={(e) => setForm({ ...form, invoice_number: e.target.value })} placeholder="FT-001" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Importo (€)</Label><Input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" /></div>
                <div><Label>IVA (%)</Label><Input type="number" value={form.vat_rate} onChange={(e) => setForm({ ...form, vat_rate: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Data Emissione</Label><Input type="date" value={form.issue_date} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} /></div>
                <div><Label>Scadenza</Label><Input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} /></div>
              </div>
              <div><Label>Note</Label><Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Note..." /></div>
              <Button onClick={createInvoice} className="w-full">Crea Fattura</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Totale Fatturato</p>
            <p className="text-xl font-heading">€{totalAmount.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Incassato</p>
            <p className="text-xl font-heading text-green-600">€{paidAmount.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Da Incassare</p>
            <p className="text-xl font-heading text-orange-600">€{(totalAmount - paidAmount).toLocaleString("it-IT", { minimumFractionDigits: 2 })}</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
      ) : invoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <FileText className="h-12 w-12 mb-4 opacity-30" />
          <p>Nessuna fattura. Crea la prima!</p>
        </div>
      ) : (
        <Card className="border-border/50">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Fattura</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Scadenza</TableHead>
                  <TableHead className="text-right">Importo</TableHead>
                  <TableHead className="text-right">IVA</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.invoice_number}</TableCell>
                    <TableCell className="text-sm">{new Date(inv.issue_date).toLocaleDateString("it-IT")}</TableCell>
                    <TableCell className="text-sm">{inv.due_date ? new Date(inv.due_date).toLocaleDateString("it-IT") : "—"}</TableCell>
                    <TableCell className="text-right">€{Number(inv.amount).toLocaleString("it-IT", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-right text-xs">{inv.vat_rate}%</TableCell>
                    <TableCell>
                      <Select value={inv.status} onValueChange={(v) => updateStatus(inv.id, v)}>
                        <SelectTrigger className="w-28 h-7 text-xs border-none">
                          <Badge variant={STATUS_MAP[inv.status]?.variant || "outline"} className="text-xs">
                            {STATUS_MAP[inv.status]?.label || inv.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(STATUS_MAP).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteInvoice(inv.id)}><Trash2 className="h-3 w-3" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
