import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, File, Trash2 } from "lucide-react";

export interface DocumentItem {
  name: string;
  type: string;
  file?: File;
  url?: string;
}

interface DocumentUploadProps {
  documents: DocumentItem[];
  onChange: (documents: DocumentItem[]) => void;
}

export function DocumentUpload({ documents, onChange }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDocs: DocumentItem[] = Array.from(files).map((file) => ({
        name: file.name,
        type: file.type,
        file,
        url: URL.createObjectURL(file),
      }));
      onChange([...documents, ...newDocs]);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const newDocs = documents.filter((_, i) => i !== index);
    onChange(newDocs);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <Image className="h-4 w-4 text-blue-500" />;
    }
    if (type.includes("pdf")) {
      return <FileText className="h-4 w-4 text-red-500" />;
    }
    return <File className="h-4 w-4 text-muted-foreground" />;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      const newDocs: DocumentItem[] = Array.from(files).map((file) => ({
        name: file.name,
        type: file.type,
        file,
        url: URL.createObjectURL(file),
      }));
      onChange([...documents, ...newDocs]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
      >
        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          PDF, DOC, DOCX, JPG, PNG supported
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(doc.type)}
                <span className="text-sm text-foreground truncate max-w-[200px]">
                  {doc.name}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(index)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
