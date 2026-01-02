import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Printer,
  Trash2,
  Share2,
  Eye,
  FileText,
  Calendar,
  User,
  Folder,
  Tag,
  Lock,
  History,
} from "lucide-react";
import { toast } from "sonner";

interface FilePreviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: {
    id: string;
    name: string;
    type: string;
    size: string;
    category: string;
    module: string;
    uploadedBy: string;
    uploadedAt: string;
    accessLevel: string;
    tags: string[];
    description?: string;
  } | null;
}

const accessLevelColors: Record<string, string> = {
  private: "bg-red-500/10 text-red-500",
  department: "bg-yellow-500/10 text-yellow-500",
  public: "bg-green-500/10 text-green-500",
};

const versionHistory = [
  { version: "1.2", date: "Jan 15, 2026", user: "John Smith" },
  { version: "1.1", date: "Jan 10, 2026", user: "Sarah Johnson" },
  { version: "1.0", date: "Jan 5, 2026", user: "John Smith" },
];

export function FilePreviewDrawer({ open, onOpenChange, file }: FilePreviewDrawerProps) {
  if (!file) return null;

  const handleDownload = () => {
    toast.success("Download started");
  };

  const handlePrint = () => {
    toast.info("Preparing document for print...");
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard");
  };

  const handleDelete = () => {
    toast.success("File deleted successfully");
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <div className="flex items-start justify-between">
              <div>
                <DrawerTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {file.name}
                </DrawerTitle>
                <DrawerDescription className="mt-1">
                  {file.type.toUpperCase()} • {file.size}
                </DrawerDescription>
              </div>
              <Badge className={accessLevelColors[file.accessLevel] || "bg-muted"}>
                <Lock className="h-3 w-3 mr-1" />
                {file.accessLevel}
              </Badge>
            </div>
          </DrawerHeader>

          <div className="px-4 pb-4 overflow-y-auto max-h-[60vh]">
            {/* Preview Area */}
            <div className="bg-secondary/50 rounded-xl p-8 mb-6 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Preview not available for this file type
                </p>
                <Button variant="outline" className="mt-4" onClick={handleDownload}>
                  <Eye className="h-4 w-4 mr-2" />
                  Open in New Tab
                </Button>
              </div>
            </div>

            {/* File Details */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">File Details</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Folder className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="text-sm text-foreground">{file.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Module</p>
                      <p className="text-sm text-foreground">{file.module}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Uploaded By</p>
                      <p className="text-sm text-foreground">{file.uploadedBy}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Uploaded On</p>
                      <p className="text-sm text-foreground">{file.uploadedAt}</p>
                    </div>
                  </div>

                  {file.tags.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Tag className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Tags</p>
                        <div className="flex flex-wrap gap-1">
                          {file.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {file.description && (
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                    <p className="text-sm text-foreground">{file.description}</p>
                  </div>
                )}
              </div>

              {/* Version History */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Version History
                </h4>
                <div className="space-y-3">
                  {versionHistory.map((version, index) => (
                    <div
                      key={version.version}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Version {version.version}
                          {index === 0 && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Current
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {version.user} • {version.date}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <DrawerFooter className="flex-row justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <DrawerClose asChild>
                <Button variant="secondary">Close</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
