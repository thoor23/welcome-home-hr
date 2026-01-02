import { FileText, Image, FileSpreadsheet, File, Download, Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileCardProps {
  name: string;
  type: string;
  size: string;
  date: string;
  onView?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  className?: string;
}

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return <FileText className="w-8 h-8 text-red-500" />;
    case "doc":
    case "docx":
      return <FileText className="w-8 h-8 text-blue-500" />;
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <Image className="w-8 h-8 text-purple-500" />;
    default:
      return <File className="w-8 h-8 text-muted-foreground" />;
  }
};

const getFileColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return "bg-red-500/10";
    case "doc":
    case "docx":
      return "bg-blue-500/10";
    case "xls":
    case "xlsx":
      return "bg-green-500/10";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "bg-purple-500/10";
    default:
      return "bg-muted";
  }
};

export function FileCard({
  name,
  type,
  size,
  date,
  onView,
  onDownload,
  onDelete,
  className,
}: FileCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-all hover:shadow-lg hover:border-primary/30",
        className
      )}
    >
      {/* Action buttons on hover */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onView && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onView}>
            <Eye className="h-4 w-4" />
          </Button>
        )}
        {onDownload && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onDownload}>
            <Download className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center mb-3", getFileColor(type))}>
        {getFileIcon(type)}
      </div>
      <p className="font-medium text-foreground text-center truncate max-w-full text-sm">
        {name}
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
        <span className="uppercase">{type}</span>
        <span>•</span>
        <span>{size}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{date}</p>
    </div>
  );
}
