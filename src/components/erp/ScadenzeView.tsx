import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, CalendarDays, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Deadline {
  id: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  priority: string;
  project_id: string | null;
}

interface Project {
  id: string;
  name: string;
}

export default function ScadenzeView() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("pending");
  const [form, setForm] = useState({
    title: "", description: "", due_date: new Date().toISOString().split("T")[0],
    priority: "medium", project_id: "",
  });

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      const [dlRes, prRes] = await Promise.all([
        supabase.from("erp_deadlines").select("*").order("due_date"),
        supabase.from("erp_projects").select("id, name").order("name"),
      ]);
      setDeadlines((dlRes.data as Deadline[]) || []);
      setProjects((prRes.data as Project[]) || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const createDeadline = async () => {
    if (!form.title.trim() || !user) return;
    try {
      const { error } = await supabase.from("erp_deadlines").insert({
        user_id: user.id,
        title: form.title.trim(),
        description: form.description,
        due_date: form.due_date,
        priority: form.priority,
        project_id: form.project_id || null,
      });
      if (error) { toast({ title: "Errore", description: error.message, variant: "destructive" }); return; }
      setForm({ title: "", description: "", due_date: new Date().toISOString().split("T")[0], priority: "medium", project_id: "" });
      setIsCreateOpen(false);
      fetchData();
      toast({ title: "Scadenza creata" });
    } catch (err) { console.error(err); }
  };

  const toggleCompleted = async (id: string, completed: boolean) => {
    try {
      await supabase.from("erp_deadlines").update({ completed }).eq("id", id);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const deleteDeadline = async (id: string) => {
    try {
      await supabase.from("erp_deadlines").delete().eq("id", id);
      fetchData();
      toast({ title: "Scadenza eliminata" });
    } catch (err) { console.error(err); }
  };

  const filtered = deadlines.filter((d) => {
    if (filter === "pending") return !d.completed;
    if (filter === "completed") return d.completed;
    return true;
  });

  const isOverdue = (date: string) => new Date(date) < new Date() && new Date(date).toDateString() !== new Date().toDateString();
  const isToday = (date: string) => new Date(date).toDateString() === new Date().toDateString();

  const pendingCount = deadlines.filter((d) => !d.completed).length;
  const overdueCount = deadlines.filter((d) => !d.completed && isOverdue(d.due_date)).length;

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading">Scadenze</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Nuova Scadenza</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nuova Scadenza</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Titolo *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titolo scadenza" /></div>
              <div><Label>Descrizione</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Dettagli..." /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Data Scadenza</Label><Input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} /></div>
                <div>
                  <Label>Priorità</Label>
                  <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Bassa</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {projects.length > 0 && (
                <div>
                  <Label>Commessa (opzionale)</Label>
                  <Select value={form.project_id} onValueChange={(v) => setForm({ ...form, project_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Nessuna commessa" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nessuna</SelectItem>
                      {projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button onClick={createDeadline} className="w-full">Crea Scadenza</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">In scadenza</p>
              <p className="text-xl font-heading">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-xs text-muted-foreground">Scadute</p>
              <p className="text-xl font-heading text-red-600">{overdueCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-xs text-muted-foreground">Completate</p>
              <p className="text-xl font-heading">{deadlines.filter((d) => d.completed).length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {(["pending", "all", "completed"] as const).map((f) => (
          <Button key={f} variant={filter === f ? "secondary" : "ghost"} size="sm" onClick={() => setFilter(f)}>
            {f === "pending" ? "In scadenza" : f === "all" ? "Tutte" : "Completate"}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <CalendarDays className="h-12 w-12 mb-4 opacity-30" />
          <p>Nessuna scadenza</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((d) => {
            const projectName = projects.find((p) => p.id === d.project_id)?.name;
            return (
              <Card key={d.id} className={`border-border/50 ${d.completed ? "opacity-60" : ""}`}>
                <CardContent className="p-3 flex items-center gap-3">
                  <Checkbox
                    checked={d.completed}
                    onCheckedChange={(checked) => toggleCompleted(d.id, !!checked)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium text-sm ${d.completed ? "line-through" : ""}`}>{d.title}</span>
                      {projectName && <Badge variant="outline" className="text-xs">{projectName}</Badge>}
                    </div>
                    {d.description && <p className="text-xs text-muted-foreground mt-0.5">{d.description}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs ${!d.completed && isOverdue(d.due_date) ? "text-red-600 font-medium" : isToday(d.due_date) ? "text-orange-600" : "text-muted-foreground"}`}>
                      {new Date(d.due_date).toLocaleDateString("it-IT")}
                    </span>
                    <Badge variant="outline" className={`text-xs ${d.priority === "high" ? "border-red-500/50 text-red-600" : d.priority === "low" ? "border-muted-foreground/30" : ""}`}>
                      {d.priority === "high" ? "Alta" : d.priority === "low" ? "Bassa" : "Media"}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteDeadline(d.id)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
