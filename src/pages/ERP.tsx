import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, LogOut, FolderOpen, Trash2, Upload, FileText, ExternalLink,
  DollarSign, StickyNote, GitBranch, Loader2
} from "lucide-react";
import resyneLogo from "@/assets/resyne-logo-main.png";

interface Project {
  id: string;
  name: string;
  description: string;
  repository_url: string;
  notes: string;
  status: string;
  budget: number;
  created_at: string;
}

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

const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Attivo", variant: "default" },
  completed: { label: "Completato", variant: "secondary" },
  on_hold: { label: "In pausa", variant: "outline" },
  cancelled: { label: "Annullato", variant: "destructive" },
};

export default function ERP() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // New project form
  const [newProject, setNewProject] = useState({ name: "", description: "", repository_url: "", budget: "" });
  // New expense form
  const [newExpense, setNewExpense] = useState({ description: "", amount: "", category: "general", date: new Date().toISOString().split("T")[0] });

  useEffect(() => {
    if (!loading && !user) navigate("/erp/login");
  }, [loading, user, navigate]);

  const fetchProjects = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from("erp_projects")
        .select("*")
        .order("created_at", { ascending: false });
      setProjects((data as Project[]) || []);
    } catch (err) {
      console.error("Fetch projects error:", err);
    } finally {
      setLoadingData(false);
    }
  }, [user]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const fetchProjectDetails = useCallback(async (projectId: string) => {
    try {
      const [expRes, fileRes] = await Promise.all([
        supabase.from("erp_expenses").select("*").eq("project_id", projectId).order("date", { ascending: false }),
        supabase.from("erp_files").select("*").eq("project_id", projectId).order("created_at", { ascending: false }),
      ]);
      setExpenses((expRes.data as Expense[]) || []);
      setFiles((fileRes.data as ProjectFile[]) || []);
    } catch (err) {
      console.error("Fetch project details error:", err);
    }
  }, []);

  const selectProject = (p: Project) => {
    setSelectedProject(p);
    fetchProjectDetails(p.id);
  };

  const createProject = async () => {
    if (!newProject.name.trim() || !user) return;
    const { error } = await supabase.from("erp_projects").insert({
      user_id: user.id,
      name: newProject.name.trim(),
      description: newProject.description.trim(),
      repository_url: newProject.repository_url.trim(),
      budget: parseFloat(newProject.budget) || 0,
    });
    if (error) { toast({ title: "Errore", description: error.message, variant: "destructive" }); return; }
    setNewProject({ name: "", description: "", repository_url: "", budget: "" });
    setIsCreateOpen(false);
    fetchProjects();
    toast({ title: "Progetto creato" });
  };

  const updateProject = async (field: string, value: string) => {
    if (!selectedProject) return;
    const updateData: Record<string, unknown> = { [field]: field === "budget" ? parseFloat(value) || 0 : value, updated_at: new Date().toISOString() };
    await supabase.from("erp_projects").update(updateData).eq("id", selectedProject.id);
    setSelectedProject({ ...selectedProject, [field]: field === "budget" ? parseFloat(value) || 0 : value } as Project);
    fetchProjects();
  };

  const deleteProject = async (id: string) => {
    await supabase.from("erp_projects").delete().eq("id", id);
    if (selectedProject?.id === id) { setSelectedProject(null); setExpenses([]); setFiles([]); }
    fetchProjects();
    toast({ title: "Progetto eliminato" });
  };

  const addExpense = async () => {
    if (!newExpense.description.trim() || !selectedProject || !user) return;
    await supabase.from("erp_expenses").insert({
      project_id: selectedProject.id,
      user_id: user.id,
      description: newExpense.description.trim(),
      amount: parseFloat(newExpense.amount) || 0,
      category: newExpense.category,
      date: newExpense.date,
    });
    setNewExpense({ description: "", amount: "", category: "general", date: new Date().toISOString().split("T")[0] });
    setIsExpenseOpen(false);
    fetchProjectDetails(selectedProject.id);
  };

  const deleteExpense = async (id: string) => {
    await supabase.from("erp_expenses").delete().eq("id", id);
    if (selectedProject) fetchProjectDetails(selectedProject.id);
  };

  const uploadFiles = async (fileList: FileList) => {
    if (!selectedProject || !user) return;
    setUploading(true);
    for (const file of Array.from(fileList)) {
      const filePath = `${user.id}/${selectedProject.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("erp-files").upload(filePath, file);
      if (uploadError) { toast({ title: "Errore upload", description: uploadError.message, variant: "destructive" }); continue; }
      await supabase.from("erp_files").insert({
        project_id: selectedProject.id,
        user_id: user.id,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
      });
    }
    setUploading(false);
    fetchProjectDetails(selectedProject.id);
    toast({ title: "File caricati" });
  };

  const deleteFile = async (f: ProjectFile) => {
    await supabase.storage.from("erp-files").remove([f.file_path]);
    await supabase.from("erp_files").delete().eq("id", f.id);
    if (selectedProject) fetchProjectDetails(selectedProject.id);
  };

  const downloadFile = async (f: ProjectFile) => {
    const { data } = await supabase.storage.from("erp-files").createSignedUrl(f.file_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) uploadFiles(e.dataTransfer.files);
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={resyneLogo} alt="Resyne" className="h-7" />
          <span className="text-sm font-subtitle text-muted-foreground">ERP • Gestione Progetti</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:block">{user.email}</span>
          <Button variant="ghost" size="icon" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-57px)]">
        {/* Sidebar - Projects list */}
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border/50 p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg">Progetti</h2>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Nuovo</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Nuovo Progetto</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Nome *</Label><Input value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} placeholder="Nome progetto" /></div>
                  <div><Label>Descrizione</Label><Textarea value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} placeholder="Descrizione..." /></div>
                  <div><Label>Repository URL</Label><Input value={newProject.repository_url} onChange={(e) => setNewProject({ ...newProject, repository_url: e.target.value })} placeholder="https://github.com/..." /></div>
                  <div><Label>Budget (€)</Label><Input type="number" value={newProject.budget} onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })} placeholder="0.00" /></div>
                  <Button onClick={createProject} className="w-full">Crea Progetto</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {loadingData ? (
            <div className="flex justify-center py-8"><Loader2 className="animate-spin h-5 w-5 text-muted-foreground" /></div>
          ) : projects.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">Nessun progetto. Crea il primo!</p>
          ) : (
            <div className="space-y-2">
              {projects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => selectProject(p)}
                  className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                    selectedProject?.id === p.id
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm truncate">{p.name}</span>
                    <Badge variant={STATUS_MAP[p.status]?.variant || "default"} className="text-xs">
                      {STATUS_MAP[p.status]?.label || p.status}
                    </Badge>
                  </div>
                  {p.budget > 0 && <p className="text-xs text-muted-foreground mt-1">Budget: €{Number(p.budget).toLocaleString("it-IT", { minimumFractionDigits: 2 })}</p>}
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {!selectedProject ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <FolderOpen className="h-12 w-12 mb-4 opacity-30" />
              <p>Seleziona un progetto dalla sidebar</p>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl">
              {/* Project header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Input
                    className="text-xl font-heading border-none px-0 bg-transparent h-auto focus-visible:ring-0"
                    value={selectedProject.name}
                    onChange={(e) => setSelectedProject({ ...selectedProject, name: e.target.value })}
                    onBlur={(e) => updateProject("name", e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedProject.status} onValueChange={(v) => updateProject("status", v)}>
                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_MAP).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="destructive" size="icon" onClick={() => deleteProject(selectedProject.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><StickyNote className="h-4 w-4" /> Descrizione</CardTitle></CardHeader>
                <CardContent>
                  <Textarea
                    value={selectedProject.description}
                    onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                    onBlur={(e) => updateProject("description", e.target.value)}
                    placeholder="Descrizione del progetto..."
                    className="min-h-[80px] border-none bg-transparent px-0 focus-visible:ring-0"
                  />
                </CardContent>
              </Card>

              {/* Repository & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><GitBranch className="h-4 w-4" /> Repository</CardTitle></CardHeader>
                  <CardContent>
                    <Input
                      value={selectedProject.repository_url}
                      onChange={(e) => setSelectedProject({ ...selectedProject, repository_url: e.target.value })}
                      onBlur={(e) => updateProject("repository_url", e.target.value)}
                      placeholder="https://github.com/..."
                      className="border-none bg-transparent px-0 focus-visible:ring-0"
                    />
                    {selectedProject.repository_url && (
                      <a href={selectedProject.repository_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 mt-2 hover:underline">
                        <ExternalLink className="h-3 w-3" /> Apri repo
                      </a>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><DollarSign className="h-4 w-4" /> Budget & Spese</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Budget: €</span>
                      <Input
                        type="number"
                        value={selectedProject.budget}
                        onChange={(e) => setSelectedProject({ ...selectedProject, budget: parseFloat(e.target.value) || 0 })}
                        onBlur={(e) => updateProject("budget", e.target.value)}
                        className="border-none bg-transparent px-0 focus-visible:ring-0 w-28"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Speso: €{totalExpenses.toLocaleString("it-IT", { minimumFractionDigits: 2 })} / Rimanente: €{(Number(selectedProject.budget) - totalExpenses).toLocaleString("it-IT", { minimumFractionDigits: 2 })}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Notes */}
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><StickyNote className="h-4 w-4" /> Appunti</CardTitle></CardHeader>
                <CardContent>
                  <Textarea
                    value={selectedProject.notes}
                    onChange={(e) => setSelectedProject({ ...selectedProject, notes: e.target.value })}
                    onBlur={(e) => updateProject("notes", e.target.value)}
                    placeholder="Appunti, note, promemoria..."
                    className="min-h-[120px] border-none bg-transparent px-0 focus-visible:ring-0"
                  />
                </CardContent>
              </Card>

              {/* Files - Drag & Drop */}
              <Card>
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
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragging ? "border-primary bg-primary/5" : "border-border/50"
                    }`}
                  >
                    {uploading ? (
                      <Loader2 className="animate-spin h-6 w-6 mx-auto text-primary" />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Trascina i file qui o usa il pulsante "Carica"
                      </p>
                    )}
                  </div>
                  {files.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {files.map((f) => (
                        <div key={f.id} className="flex items-center justify-between py-2 px-3 rounded hover:bg-card text-sm">
                          <button onClick={() => downloadFile(f)} className="flex items-center gap-2 truncate text-left hover:text-primary transition-colors">
                            <FileText className="h-4 w-4 shrink-0" />
                            <span className="truncate">{f.file_name}</span>
                            <span className="text-xs text-muted-foreground shrink-0">({(f.file_size / 1024).toFixed(0)} KB)</span>
                          </button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => deleteFile(f)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Expenses */}
              <Card>
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
                          <div><Label>Categoria</Label>
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
          )}
        </main>
      </div>
    </div>
  );
}
