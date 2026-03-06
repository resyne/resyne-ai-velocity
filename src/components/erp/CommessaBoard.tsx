import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Trash2, Upload, FileText, ExternalLink,
  DollarSign, StickyNote, GitBranch, Loader2, Plus
} from "lucide-react";
import type { Commessa } from "./CommesseView";

interface Expense {
  id: string;
  project_id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ProjectFile {
  id: string;
  project_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  created_at: string;
}

const PIPELINE_STAGES = [
  { key: "nuova", label: "Nuova" },
  { key: "qualificata", label: "Qualificata" },
  { key: "trattativa", label: "Trattativa" },
  { key: "approvata", label: "Approvata" },
];

interface Props {
  commessa: Commessa;
  onBack: () => void;
  onUpdate: (c: Commessa) => void;
}

export function CommessaBoard({ commessa, onBack, onUpdate }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [project, setProject] = useState(commessa);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "", category: "general", date: new Date().toISOString().split("T")[0] });

  const fetchDetails = useCallback(async () => {
    try {
      const [expRes, fileRes] = await Promise.all([
        supabase.from("erp_expenses").select("*").eq("project_id", commessa.id).order("date", { ascending: false }),
        supabase.from("erp_files").select("*").eq("project_id", commessa.id).order("created_at", { ascending: false }),
      ]);
      setExpenses((expRes.data as Expense[]) || []);
      setFiles((fileRes.data as ProjectFile[]) || []);
    } catch (err) {
      console.error(err);
    }
  }, [commessa.id]);

  useEffect(() => { fetchDetails(); }, [fetchDetails]);

  const updateField = async (field: string, value: string | number) => {
    const updateData: Record<string, unknown> = { [field]: value, updated_at: new Date().toISOString() };
    try {
      await supabase.from("erp_projects").update(updateData).eq("id", project.id);
      const updated = { ...project, [field]: value } as Commessa;
      setProject(updated);
      onUpdate(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const addExpense = async () => {
    if (!newExpense.description.trim() || !user) return;
    try {
      await supabase.from("erp_expenses").insert({
        project_id: project.id,
        user_id: user.id,
        description: newExpense.description.trim(),
        amount: parseFloat(newExpense.amount) || 0,
        category: newExpense.category,
        date: newExpense.date,
      });
      setNewExpense({ description: "", amount: "", category: "general", date: new Date().toISOString().split("T")[0] });
      setIsExpenseOpen(false);
      fetchDetails();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await supabase.from("erp_expenses").delete().eq("id", id);
      fetchDetails();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFiles = async (fileList: FileList) => {
    if (!user) return;
    setUploading(true);
    try {
      for (const file of Array.from(fileList)) {
        const filePath = `${user.id}/${project.id}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage.from("erp-files").upload(filePath, file);
        if (uploadError) { toast({ title: "Errore upload", description: uploadError.message, variant: "destructive" }); continue; }
        await supabase.from("erp_files").insert({
          project_id: project.id,
          user_id: user.id,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
        });
      }
      fetchDetails();
      toast({ title: "File caricati" });
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (f: ProjectFile) => {
    try {
      await supabase.storage.from("erp-files").remove([f.file_path]);
      await supabase.from("erp_files").delete().eq("id", f.id);
      fetchDetails();
    } catch (err) {
      console.error(err);
    }
  };

  const downloadFile = async (f: ProjectFile) => {
    try {
      const { data } = await supabase.storage.from("erp-files").createSignedUrl(f.file_path, 60);
      if (data?.signedUrl) window.open(data.signedUrl, "_blank");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) uploadFiles(e.dataTransfer.files);
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="p-4 lg:p-6 max-w-5xl">
      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1 min-w-0">
          <Input
            className="text-xl font-heading border-none px-0 bg-transparent h-auto focus-visible:ring-0"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            onBlur={(e) => updateField("name", e.target.value)}
          />
        </div>
        <Select value={project.status} onValueChange={(v) => updateField("status", v)}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            {PIPELINE_STAGES.map((s) => <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Description */}
        <Card className="border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><StickyNote className="h-4 w-4" /> Descrizione</CardTitle></CardHeader>
          <CardContent>
            <Textarea
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              onBlur={(e) => updateField("description", e.target.value)}
              placeholder="Descrizione della commessa..."
              className="min-h-[80px] border-none bg-transparent px-0 focus-visible:ring-0"
            />
          </CardContent>
        </Card>

        {/* Repository */}
        <Card className="border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><GitBranch className="h-4 w-4" /> Repository</CardTitle></CardHeader>
          <CardContent>
            <Input
              value={project.repository_url}
              onChange={(e) => setProject({ ...project, repository_url: e.target.value })}
              onBlur={(e) => updateField("repository_url", e.target.value)}
              placeholder="https://github.com/..."
              className="border-none bg-transparent px-0 focus-visible:ring-0"
            />
            {project.repository_url && (
              <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 mt-2 hover:underline">
                <ExternalLink className="h-3 w-3" /> Apri repo
              </a>
            )}
          </CardContent>
        </Card>

        {/* Budget & Expenses Summary */}
        <Card className="border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><DollarSign className="h-4 w-4" /> Budget & Spese</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Budget: €</span>
              <Input
                type="number"
                value={project.budget}
                onChange={(e) => setProject({ ...project, budget: parseFloat(e.target.value) || 0 })}
                onBlur={(e) => updateField("budget", parseFloat(e.target.value) || 0)}
                className="border-none bg-transparent px-0 focus-visible:ring-0 w-28"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Speso: €{totalExpenses.toLocaleString("it-IT", { minimumFractionDigits: 2 })} / Rimanente: €{(Number(project.budget) - totalExpenses).toLocaleString("it-IT", { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><StickyNote className="h-4 w-4" /> Appunti</CardTitle></CardHeader>
          <CardContent>
            <Textarea
              value={project.notes}
              onChange={(e) => setProject({ ...project, notes: e.target.value })}
              onBlur={(e) => updateField("notes", e.target.value)}
              placeholder="Appunti, note, promemoria..."
              className="min-h-[80px] border-none bg-transparent px-0 focus-visible:ring-0"
            />
          </CardContent>
        </Card>
      </div>

      {/* Files - Drag & Drop */}
      <Card className="mt-4 border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2"><FileText className="h-4 w-4" /> File ({files.length})</CardTitle>
            <label className="cursor-pointer">
              <input type="file" multiple className="hidden" onChange={(e) => e.target.files && uploadFiles(e.target.files)} />
              <Button variant="outline" size="sm" asChild><span><Upload className="h-3 w-3 mr-1" /> Carica</span></Button>
            </label>
          </div>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border/50"}`}
          >
            {uploading ? <Loader2 className="animate-spin h-6 w-6 mx-auto text-primary" /> : <p className="text-sm text-muted-foreground">Trascina i file qui o usa il pulsante "Carica"</p>}
          </div>
          {files.length > 0 && (
            <div className="mt-3 space-y-1">
              {files.map((f) => (
                <div key={f.id} className="flex items-center justify-between py-2 px-3 rounded hover:bg-muted/50 text-sm">
                  <button onClick={() => downloadFile(f)} className="flex items-center gap-2 truncate text-left hover:text-primary transition-colors">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">{f.file_name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">({(f.file_size / 1024).toFixed(0)} KB)</span>
                  </button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => deleteFile(f)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expenses */}
      <Card className="mt-4 border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2"><DollarSign className="h-4 w-4" /> Spese ({expenses.length})</CardTitle>
            <Dialog open={isExpenseOpen} onOpenChange={setIsExpenseOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm"><Plus className="h-3 w-3 mr-1" /> Aggiungi</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Nuova Spesa</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Descrizione *</Label><Input value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} placeholder="Descrizione spesa" /></div>
                  <div><Label>Importo (€)</Label><Input type="number" step="0.01" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} placeholder="0.00" /></div>
                  <div>
                    <Label>Categoria</Label>
                    <Select value={newExpense.category} onValueChange={(v) => setNewExpense({ ...newExpense, category: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Generale</SelectItem>
                        <SelectItem value="development">Sviluppo</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="hosting">Hosting</SelectItem>
                        <SelectItem value="licenses">Licenze</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>Data</Label><Input type="date" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} /></div>
                  <Button onClick={addExpense} className="w-full">Aggiungi Spesa</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Nessuna spesa registrata</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrizione</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Importo</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.description}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{e.category}</Badge></TableCell>
                    <TableCell className="text-sm">{new Date(e.date).toLocaleDateString("it-IT")}</TableCell>
                    <TableCell className="text-right">€{Number(e.amount).toLocaleString("it-IT", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell><Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteExpense(e.id)}><Trash2 className="h-3 w-3" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
