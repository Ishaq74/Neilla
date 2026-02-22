import { useState } from "react";
import axios from "axios";
import Button from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Download, Upload, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BackupData {
  version: string;
  created_at: string;
  site_settings: Record<string, unknown>[];
  site_content: Record<string, unknown>[];
  theme_settings: Record<string, unknown>[];
}

const BackupRestore = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [lastBackup, setLastBackup] = useState<string | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Fetch all data in parallel via REST API
      const [site_settings, site_content, theme_settings] = await Promise.all([
        axios.get("/api/site-settings").then(res => res.data),
        axios.get("/api/site-content").then(res => res.data),
        axios.get("/api/theme-settings").then(res => res.data)
      ]);
      const backup: BackupData = {
        version: "1.0",
        created_at: new Date().toISOString(),
        site_settings,
        site_content,
        theme_settings,
      };
      // Create and download file
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup-site-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setLastBackup(new Date().toLocaleString("fr-FR"));
      toast.success("Sauvegarde téléchargée avec succès !");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Erreur lors de l'export");
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const backup: BackupData = JSON.parse(text);
      // Validate backup structure
      if (!backup.version || !backup.site_settings || !backup.site_content || !backup.theme_settings) {
        throw new Error("Format de sauvegarde invalide");
      }
      // Restore settings
      if (backup.site_settings.length > 0) {
        await axios.post("/api/site-settings/restore", backup.site_settings);
      }
      // Restore content
      if (backup.site_content.length > 0) {
        await axios.post("/api/site-content/restore", backup.site_content);
      }
      // Restore theme
      if (backup.theme_settings.length > 0) {
        await axios.post("/api/theme-settings/restore", backup.theme_settings);
      }
      toast.success("Restauration terminée ! Rechargez la page pour voir les changements.");
      event.target.value = "";
    } catch (error) {
      console.error("Import error:", error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'import");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Sauvegarde & Restauration
        </CardTitle>
        <CardDescription>
          Exportez ou restaurez tous les paramètres du site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Section */}
        <div className="p-4 bg-muted/50 rounded-lg space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Exporter la configuration</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Télécharge un fichier JSON contenant tous les paramètres, contenus et thèmes.
              </p>
              {lastBackup && (
                <p className="text-xs text-muted-foreground mt-2">
                  Dernière sauvegarde : {lastBackup}
                </p>
              )}
            </div>
          </div>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full"
            variant="outline"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Export en cours...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Télécharger la sauvegarde
              </>
            )}
          </Button>
        </div>

        {/* Import Section */}
        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Restaurer une sauvegarde</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Attention : cette action remplacera tous les paramètres actuels.
              </p>
            </div>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full"
                disabled={isImporting}
              >
                {isImporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Restauration en cours...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Importer une sauvegarde
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la restauration</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action va remplacer tous les paramètres, contenus et thèmes actuels 
                  par ceux de la sauvegarde. Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <label htmlFor="backup-file" className="cursor-pointer">
                    Choisir le fichier
                    <input
                      id="backup-file"
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackupRestore;
