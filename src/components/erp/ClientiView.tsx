import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, Users, Building, Mail, Phone, Edit } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  vat_number: string;
  address: string;
  notes: string;
  created_at: string;
}

export default function ClientiView() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", vat_number: "", address: "", notes: "" });

  const fetchClients = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase.from("erp_clients").select("*").order("name");
      setClients((data as Client[]) || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  const resetForm = () => setForm({ name: "", email: "", phone: "", company: "", vat_number: "", address: "", notes: "" });

  const saveClient = async () => {
    if (!form.name.trim() || !user) return;
    try {
      if (editingClient) {
        const { error } = await supabase.from("erp_clients").update({
          ...form, name: form.name.trim(), updated_at: new Date().toISOString(),
        }).eq("id", editingClient.id);
        if (error) { toast({ title: "Errore", description: error.message, variant: "destructive" }); return; }
        toast({ title: "Cliente aggiornato" });
      } else {
        const { error } = await supabase.from("erp_clients").insert({ ...form, name: form.name.trim(), user_id: user.id });
        if (error) { toast({ title: "Errore", description: error.message, variant: "destructive" }); return; }
        toast({ title: "Cliente creato" });
      }
      resetForm();
      setIsCreateOpen(false);
      setEditingClient(null);
      fetchClients();
    } catch (err) { console.error(err); }
  };

  const deleteClient = async (id: string) => {
    try {
      await supabase.from("erp_clients").delete().eq("id", id);
      fetchClients();
      toast({ title: "Cliente eliminato" });
    } catch (err) { console.error(err); }
  };

  const openEdit = (c: Client) => {
    setEditingClient(c);
    setForm({ name: c.name, email: c.email, phone: c.phone, company: c.company, vat_number: c.vat_number, address: c.address, notes: c.notes });
    setIsCreateOpen(true);
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading">Clienti</h1>
        <Dialog open={isCreateOpen} onOpenChange={(open) => { setIsCreateOpen(open); if (!open) { setEditingClient(null); resetForm(); } }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Nuovo Cliente</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editingClient ? "Modifica Cliente" : "Nuovo Cliente"}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Nome / Ragione Sociale *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome" /></div>
                <div><Label>Azienda</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Azienda" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@esempio.com" /></div>
                <div><Label>Telefono</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+39..." /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>P.IVA</Label><Input value={form.vat_number} onChange={(e) => setForm({ ...form, vat_number: e.target.value })} placeholder="IT..." /></div>
                <div><Label>Indirizzo</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Via..." /></div>
              </div>
              <div><Label>Note</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Note..." /></div>
              <Button onClick={saveClient} className="w-full">{editingClient ? "Salva Modifiche" : "Crea Cliente"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
      ) : clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Users className="h-12 w-12 mb-4 opacity-30" />
          <p>Nessun cliente. Aggiungi il primo!</p>
        </div>
      ) : (
        <Card className="border-border/50">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Azienda</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefono</TableHead>
                  <TableHead>P.IVA</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.company || "—"}</TableCell>
                    <TableCell>{c.email || "—"}</TableCell>
                    <TableCell>{c.phone || "—"}</TableCell>
                    <TableCell className="text-xs">{c.vat_number || "—"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(c)}><Edit className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteClient(c.id)}><Trash2 className="h-3 w-3" /></Button>
                      </div>
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
