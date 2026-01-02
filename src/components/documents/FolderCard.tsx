import { Folder } from "lucide-react";
import { cn } from "@/lib/utils";

interface FolderCardProps {
  name: string;
  itemsCount: number;
  onClick?: () => void;
  className?: string;
}

export function FolderCard({ name, itemsCount, onClick, className }: FolderCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:bg-secondary/50 cursor-pointer transition-all hover:shadow-lg hover:border-primary/30",
        className
      )}
    >
      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
        <Folder className="w-8 h-8 text-primary" />
      </div>
      <p className="font-medium text-foreground text-center truncate max-w-full">
        {name}
      </p>
      <p className="text-sm text-muted-foreground">
        {itemsCount} {itemsCount === 1 ? "item" : "items"}
      </p>
    </div>
  );
}
