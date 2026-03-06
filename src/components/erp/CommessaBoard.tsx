import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Trash2, Upload, FileText, ExternalLink,
  DollarSign, StickyNote, GitBranch, Loader2, Plus,
  Calendar, TrendingUp, FolderOpen, Receipt
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
  { key: "nuova", label: "Nuova", color: "text-muted-foreground" },
  { key: "qualificata", label: "Qualificata", color: "text-yellow-400" },
  { key: "trattativa", label: "Trattativa", color: "text-blue-400" },
  { key: "approvata", label: "Approvata", color: "text-primary" },
];

const CATEGORY_LABELS: Record<string, string> = {
  general: "Generale",
  development: "Sviluppo",
  design: "Design",
  hosting: "Hosting",
  licenses: "Licenze",
  marketing: "Marketing",
};

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
  const budgetNum = Number(project.budget) || 0;
  const budgetUsedPercent = budgetNum > 0 ? Math.min((totalExpenses / budgetNum) * 100, 100) : 0;
  const remaining = budgetNum - totalExpenses;
  const stageIndex = PIPELINE_STAGES.findIndex(s => s.key === project.status);
  const pipelinePercent = stageIndex >= 0 ? ((stageIndex + 1) / PIPELINE_STAGES.length) * 100 : 25;

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <Input
            className="text-2xl font-heading border-none px-0 bg-transparent h-auto focus-visible:ring-0 font-bold"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            onBlur={(e) => updateField("name", e.target.value)}
          />
        </div>
      </div>

      {/* Pipeline Progress */}
      <div className="mb-6 ml-12">
        <div className="flex items-center gap-2 mb-2">
          {PIPELINE_STAGES.map((stage, i) => (
            <button
              key={stage.key}
              onClick={() => updateField("status", stage.key)}
              className={`text-xs font-medium px-3 py-1 rounded-full transition-all ${
                project.status === stage.key
                  ? "bg-primary text-primary-foreground"
                  : i <= stageIndex
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>
        <Progress value={pipelinePercent} className="h-1.5" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Card className="border-border/30 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <DollarSign className="h-3.5 w-3.5" />
              <span className="text-xs">Budget</span>
            </div>
            <p className="text-lg font-bold">€{budgetNum.toLocaleString("it-IT")}</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-xs">Speso</span>
            </div>
            <p className="text-lg font-bold">€{totalExpenses.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Receipt className="h-3.5 w-3.5" />
              <span className="text-xs">Rimanente</span>
            </div>
            <p className={`text-lg font-bold ${remaining < 0 ? "text-destructive" : ""}`}>
              €{remaining.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FolderOpen className="h-3.5 w-3.5" />
              <span className="text-xs">File</span>
            </div>
            <p className="text-lg font-bold">{files.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      {budgetNum > 0 && (
        <div className="mb-6 px-1">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Utilizzo budget</span>
            <span>{budgetUsedPercent.toFixed(0)}%</span>
          </div>
          <Progress value={budgetUsedPercent} className="h-2" />
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="expenses">Spese ({expenses.length})</TabsTrigger>
          <TabsTrigger value="files">File ({files.length})</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Description */}
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <StickyNote className="h-4 w-4" />
                  <span className="text-sm font-medium">Descrizione</span>
                </div>
                <Textarea
                  value={project.description}
                  onChange={(e) => setProject({ ...project, description: e.target.value })}
                  onBlur={(e) => updateField("description", e.target.value)}
                  placeholder="Descrizione della commessa..."
                  className="min-h-[100px] border-none bg-transparent px-0 focus-visible:ring-0 resize-none"
                />
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <StickyNote className="h-4 w-4" />
                  <span className="text-sm font-medium">Appunti</span>
                </div>
                <Textarea
                  value={project.notes}
                  onChange={(e) => setProject({ ...project, notes: e.target.value })}
                  onBlur={(e) => updateField("notes", e.target.value)}
                  placeholder="Appunti, note, promemoria..."
                  className="min-h-[100px] border-none bg-transparent px-0 focus-visible:ring-0 resize-none"
                />
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <GitBranch className="h-4 w-4" />
                  <span className="text-sm font-medium">Repository</span>
                </div>
                <Input
                  value={project.repository_url}
                  onChange={(e) => setProject({ ...project, repository_url: e.target.value })}
                  onBlur={(e) => updateField("repository_url", e.target.value)}
                  placeholder="https://github.com/..."
                  className="border-border/30 bg-background/50"
                />
                {project.repository_url && (
                  <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">
                    <ExternalLink className="h-3 w-3" /> Apri repository
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Budget Edit */}
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm font-medium">Budget</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">€</span>
                  <Input
                    type="number"
                    value={project.budget}
                    onChange={(e) => setProject({ ...project, budget: parseFloat(e.target.value) || 0 })}
                    onBlur={(e) => updateField("budget", parseFloat(e.target.value) || 0)}
                    className="border-border/30 bg-background/50"
                  />
                </div>
                {project.deadline && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Scadenza: {new Date(project.deadline).toLocaleDateString("it-IT")}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isExpenseOpen} onOpenChange={setIsExpenseOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1" /> Nuova spesa</Button>
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
                        {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                          <SelectItem key={k} value={k}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>Data</Label><Input type="date" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} /></div>
                  <Button onClick={addExpense} className="w-full">Aggiungi Spesa</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {expenses.length === 0 ? (
            <Card className="border-border/30 bg-card/50">
              <CardContent className="py-12 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">Nessuna spesa registrata</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/30 bg-card/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30">
                    <TableHead>Descrizione</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Importo</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((e) => (
                    <TableRow key={e.id} className="border-border/20">
                      <TableCell className="font-medium">{e.description}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs border-border/30">{CATEGORY_LABELS[e.category] || e.category}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{new Date(e.date).toLocaleDateString("it-IT")}</TableCell>
                      <TableCell className="text-right font-mono">€{Number(e.amount).toLocaleString("it-IT", { minimumFractionDigits: 2 })}</TableCell>
                      <TableCell><Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => deleteExpense(e.id)}><Trash2 className="h-3 w-3" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files" className="space-y-4">
          <div className="flex justify-end">
            <label className="cursor-pointer">
              <input type="file" multiple className="hidden" onChange={(e) => e.target.files && uploadFiles(e.target.files)} />
              <Button variant="outline" size="sm" asChild><span><Upload className="h-3.5 w-3.5 mr-1" /> Carica file</span></Button>
            </label>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
              isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border/30 hover:border-border/60"
            }`}
          >
            {uploading ? (
              <Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" />
            ) : (
              <div>
                <Upload className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">Trascina i file qui oppure clicca "Carica file"</p>
              </div>
            )}
          </div>

          {files.length > 0 && (
            <div className="space-y-1">
              {files.map((f) => (
                <div key={f.id} className="flex items-center justify-between py-2.5 px-4 rounded-lg hover:bg-muted/30 transition-colors group">
                  <button onClick={() => downloadFile(f)} className="flex items-center gap-3 truncate text-left hover:text-primary transition-colors">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                    <div className="truncate">
                      <span className="text-sm font-medium truncate block">{f.file_name}</span>
                      <span className="text-xs text-muted-foreground">{(f.file_size / 1024).toFixed(0)} KB · {new Date(f.created_at).toLocaleDateString("it-IT")}</span>
                    </div>
                  </button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive" onClick={() => deleteFile(f)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
