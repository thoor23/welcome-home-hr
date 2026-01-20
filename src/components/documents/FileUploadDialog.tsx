import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, File } from "lucide-react";
import { toast } from "sonner";

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  "Offer Letters",
  "Appointment Letters",
  "Payslips",
  "Invoices",
  "Contracts",
  "ID Proofs",
  "Certificates",
  "Policies",
  "Photos",
  "Miscellaneous",
];

const modules = [
  "Employees",
  "Payroll",
  "HR",
  "Billing",
  "General",
];

const accessLevels = [
  { value: "private", label: "Private - Only you" },
  { value: "department", label: "Department - Team members" },
  { value: "public", label: "Public - All employees" },
];

export function FileUploadDialog({ open, onOpenChange }: FileUploadDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("");
  const [module, setModule] = useState("");
  const [accessLevel, setAccessLevel] = useState("private");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      toast.error("Please select at least one file");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    toast.success(`${files.length} file(s) uploaded successfully`);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFiles([]);
    setCategory("");
    setModule("");
    setAccessLevel("private");
    setDescription("");
    setTags("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
          <DialogDescription>
            Upload files to your document library. Supported formats: PDF, DOCX, JPG, PNG, XLS.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-foreground font-medium">
              Drag & drop files here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Maximum file size: 10MB
            </p>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-secondary rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-primary" />
                      <span className="text-sm truncate max-w-[300px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Module</Label>
              <Select value={module} onValueChange={setModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((mod) => (
                    <SelectItem key={mod} value={mod}>
                      {mod}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Access Level</Label>
            <Select value={accessLevel} onValueChange={setAccessLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                {accessLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Input
              placeholder="Enter tags separated by commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Add a description for these files..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Upload Files</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
