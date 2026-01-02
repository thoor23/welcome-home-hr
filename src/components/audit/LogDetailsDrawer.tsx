import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Copy, Flag } from "lucide-react";
import { toast } from "sonner";

interface LogDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  log: {
    id: string;
    timestamp: string;
    type: string;
    user: string;
    action: string;
    module: string;
    status: string;
    ipAddress?: string;
    device?: string;
    details?: string;
    changes?: { field: string; oldValue: string; newValue: string }[];
  } | null;
}

export function LogDetailsDrawer({ open, onOpenChange, log }: LogDetailsDrawerProps) {
  if (!log) return null;

  const getTypeBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case "activity":
        return "default";
      case "data":
        return "secondary";
      case "security":
        return "destructive";
      case "system":
        return "outline";
      case "api":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "default";
      case "failed":
        return "destructive";
      case "warning":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
    toast.success("Log copied to clipboard");
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(log, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `log-${log.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Log exported");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Log Details
            <Badge variant={getTypeBadgeVariant(log.type)}>{log.type}</Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyJson}>
              <Copy className="h-4 w-4 mr-2" />
              Copy JSON
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="h-4 w-4 mr-2" />
              Flag for Review
            </Button>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="json">JSON View</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="font-medium">{log.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={getStatusBadgeVariant(log.status)}>{log.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User</p>
                  <p className="font-medium">{log.user}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Module</p>
                  <p className="font-medium">{log.module}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Action</p>
                  <p className="font-medium">{log.action}</p>
                </div>
                {log.ipAddress && (
                  <div>
                    <p className="text-sm text-muted-foreground">IP Address</p>
                    <p className="font-medium font-mono text-sm">{log.ipAddress}</p>
                  </div>
                )}
                {log.device && (
                  <div>
                    <p className="text-sm text-muted-foreground">Device</p>
                    <p className="font-medium text-sm">{log.device}</p>
                  </div>
                )}
              </div>

              {log.details && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Details</p>
                    <p className="text-sm bg-muted p-3 rounded-lg">{log.details}</p>
                  </div>
                </>
              )}

              {log.changes && log.changes.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Field Changes</p>
                    <div className="space-y-2">
                      {log.changes.map((change, index) => (
                        <div key={index} className="bg-muted p-3 rounded-lg">
                          <p className="font-medium text-sm mb-1">{change.field}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Old: </span>
                              <span className="text-destructive line-through">{change.oldValue}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">New: </span>
                              <span className="text-green-600">{change.newValue}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="json" className="mt-4">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                {JSON.stringify(log, null, 2)}
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
