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
import { useToast } from "@/hooks/use-toast";
import { Plus, LayoutGrid, List, Loader2, ArrowRight } from "lucide-react";
import { CommessaBoard } from "./CommessaBoard";

export interface Commessa {
  id: string;
  name: string;
  description: string;
  repository_url: string;
  notes: string;
  status: string;
  budget: number;
  priority: string;
  deadline: string | null;
  client_id: string | null;
  created_at: string;
}

const PIPELINE_STAGES = [
  { key: "nuova", label: "Nuove", color: "bg-blue-500/10 text-blue-600 border-blue-500/30" },
  { key: "qualificata", label: "Qualificate", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30" },
  { key: "trattativa", label: "Trattativa", color: "bg-orange-500/10 text-orange-600 border-orange-500/30" },
  { key: "approvata", label: "Approvate", color: "bg-green-500/10 text-green-600 border-green-500/30" },
];

// Map legacy statuses to new pipeline
const LEGACY_STATUS_MAP: Record<string, string> = {
  active: "trattativa",
  completed: "approvata",
  on_hold: "qualificata",
  cancelled: "nuova",
};

export default function CommesseView() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [commesse, setCommesse] = useState<Commessa[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCommessa, setSelectedCommessa] = useState<Commessa | null>(null);
  const [newCommessa, setNewCommessa] = useState({ name: "", description: "", budget: "", priority: "medium" });

  const fetchCommesse = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from("erp_projects")
        .select("*")
        .order("created_at", { ascending: false });
      const items = ((data as Commessa[]) || []).map((c) => {
        const pipelineKeys = PIPELINE_STAGES.map((s) => s.key);
        if (!pipelineKeys.includes(c.status)) {
          const mapped = LEGACY_STATUS_MAP[c.status] || "nuova";
          // Auto-migrate legacy status
          supabase.from("erp_projects").update({ status: mapped }).eq("id", c.id).then(() => {});
          return { ...c, status: mapped };
        }
        return c;
      });
      setCommesse(items);
    } catch (err) {
      console.error("Fetch commesse error:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchCommesse(); }, [fetchCommesse]);

  const createCommessa = async () => {
    if (!newCommessa.name.trim() || !user) return;
    try {
      const { error } = await supabase.from("erp_projects").insert({
        user_id: user.id,
        name: newCommessa.name.trim(),
        description: newCommessa.description.trim(),
        budget: parseFloat(newCommessa.budget) || 0,
        priority: newCommessa.priority,
        status: "nuova",
      });
      if (error) { toast({ title: "Errore", description: error.message, variant: "destructive" }); return; }
      setNewCommessa({ name: "", description: "", budget: "", priority: "medium" });
      setIsCreateOpen(false);
      fetchCommesse();
      toast({ title: "Commessa creata" });
    } catch (err) {
      console.error(err);
    }
  };

  const moveCommessa = async (id: string, newStatus: string) => {
    try {
      await supabase.from("erp_projects").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", id);
      fetchCommesse();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCommessa = async (id: string) => {
    try {
      await supabase.from("erp_projects").delete().eq("id", id);
      if (selectedCommessa?.id === id) setSelectedCommessa(null);
      fetchCommesse();
      toast({ title: "Commessa eliminata" });
    } catch (err) {
      console.error(err);
    }
  };

  if (selectedCommessa) {
    return (
      <CommessaBoard
        commessa={selectedCommessa}
        onBack={() => { setSelectedCommessa(null); fetchCommesse(); }}
        onUpdate={(updated) => setSelectedCommessa(updated)}
      />
    );
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading">Commesse</h1>
        <div className="flex items-center gap-2">
          <div className="flex border border-border/50 rounded-lg overflow-hidden">
            <Button variant={viewMode === "kanban" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("kanban")}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Nuova Commessa</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Nuova Commessa</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Nome *</Label><Input value={newCommessa.name} onChange={(e) => setNewCommessa({ ...newCommessa, name: e.target.value })} placeholder="Nome commessa" /></div>
                <div><Label>Descrizione</Label><Textarea value={newCommessa.description} onChange={(e) => setNewCommessa({ ...newCommessa, description: e.target.value })} placeholder="Descrizione..." /></div>
                <div><Label>Budget (€)</Label><Input type="number" value={newCommessa.budget} onChange={(e) => setNewCommessa({ ...newCommessa, budget: e.target.value })} placeholder="0.00" /></div>
                <div>
                  <Label>Priorità</Label>
                  <Select value={newCommessa.priority} onValueChange={(v) => setNewCommessa({ ...newCommessa, priority: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Bassa</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={createCommessa} className="w-full">Crea Commessa</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
      ) : viewMode === "kanban" ? (
        /* Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {PIPELINE_STAGES.map((stage) => {
            const stageCommesse = commesse.filter((c) => c.status === stage.key);
            return (
              <div key={stage.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">{stage.label}</h3>
                  <Badge variant="outline" className="text-xs">{stageCommesse.length}</Badge>
                </div>
                <div className="space-y-2 min-h-[100px] bg-muted/20 rounded-lg p-2">
                  {stageCommesse.map((c) => (
                    <Card
                      key={c.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-border/50"
                      onClick={() => setSelectedCommessa(c)}
                    >
                      <CardContent className="p-3">
                        <p className="font-medium text-sm truncate">{c.name}</p>
                        {c.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>}
                        <div className="flex items-center justify-between mt-2">
                          {c.budget > 0 && <span className="text-xs text-muted-foreground">€{Number(c.budget).toLocaleString("it-IT")}</span>}
                          <Badge variant="outline" className={`text-xs ${c.priority === "high" ? "border-red-500/50 text-red-600" : c.priority === "low" ? "border-muted-foreground/30" : ""}`}>
                            {c.priority === "high" ? "Alta" : c.priority === "low" ? "Bassa" : "Media"}
                          </Badge>
                        </div>
                        {/* Quick move buttons */}
                        <div className="flex gap-1 mt-2">
                          {PIPELINE_STAGES.filter((s) => s.key !== c.status).map((s) => (
                            <Button
                              key={s.key}
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs px-2 flex-1"
                              onClick={(e) => { e.stopPropagation(); moveCommessa(c.id, s.key); }}
                            >
                              <ArrowRight className="h-3 w-3 mr-1" />{s.label}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-1">
          {PIPELINE_STAGES.map((stage) => {
            const stageCommesse = commesse.filter((c) => c.status === stage.key);
            if (stageCommesse.length === 0) return null;
            return (
              <div key={stage.key} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${stage.color.includes("blue") ? "bg-blue-500" : stage.color.includes("yellow") ? "bg-yellow-500" : stage.color.includes("orange") ? "bg-orange-500" : "bg-green-500"}`} />
                  <h3 className="font-medium text-sm">{stage.label}</h3>
                  <Badge variant="outline" className="text-xs">{stageCommesse.length}</Badge>
                </div>
                {stageCommesse.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCommessa(c)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-card cursor-pointer border border-transparent hover:border-border/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-medium text-sm truncate">{c.name}</span>
                      {c.description && <span className="text-xs text-muted-foreground truncate hidden sm:block">{c.description}</span>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {c.budget > 0 && <span className="text-xs text-muted-foreground">€{Number(c.budget).toLocaleString("it-IT")}</span>}
                      <Badge variant="outline" className="text-xs">
                        {c.priority === "high" ? "Alta" : c.priority === "low" ? "Bassa" : "Media"}
                      </Badge>
                      <Select value={c.status} onValueChange={(v) => moveCommessa(c.id, v)}>
                        <SelectTrigger className="w-28 h-7 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {PIPELINE_STAGES.map((s) => <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          {commesse.length === 0 && <p className="text-muted-foreground text-sm text-center py-16">Nessuna commessa. Crea la prima!</p>}
        </div>
      )}
    </div>
  );
}
