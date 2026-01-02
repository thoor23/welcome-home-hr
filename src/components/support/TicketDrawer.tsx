import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { 
  Clock, 
  User, 
  MessageSquare, 
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Timer,
  Send,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  isInternal?: boolean;
}

interface TicketDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: {
    id: string;
    subject: string;
    category: string;
    priority: string;
    status: string;
    description: string;
    raisedBy: string;
    assignedTo?: string;
    createdAt: string;
    updatedAt: string;
    slaStatus: string;
    comments?: Comment[];
  } | null;
}

const statusOptions = [
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In Progress" },
  { value: "on-hold", label: "On Hold" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "critical": return "bg-red-500/10 text-red-500 border-red-500/20";
    case "high": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "low": return "bg-green-500/10 text-green-500 border-green-500/20";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "open": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "in-progress": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    case "on-hold": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "resolved": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "closed": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getSlaColor = (slaStatus: string) => {
  switch (slaStatus.toLowerCase()) {
    case "within sla": return "text-green-500";
    case "at risk": return "text-yellow-500";
    case "breached": return "text-red-500";
    default: return "text-muted-foreground";
  }
};

export function TicketDrawer({ open, onOpenChange, ticket }: TicketDrawerProps) {
  const [status, setStatus] = useState(ticket?.status || "open");
  const [comment, setComment] = useState("");

  if (!ticket) return null;

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    toast.success(`Ticket status updated to ${newStatus}`);
  };

  const handleAddComment = () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    toast.success("Comment added successfully");
    setComment("");
  };

  const sampleComments: Comment[] = [
    {
      id: "1",
      author: "John Smith",
      content: "I've looked into this issue. It seems to be related to the recent software update.",
      timestamp: "2026-01-02 10:30 AM",
    },
    {
      id: "2",
      author: "IT Support",
      content: "We're scheduling a system check. Please keep your laptop available.",
      timestamp: "2026-01-02 11:15 AM",
      isInternal: true,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <SheetTitle className="text-lg">{ticket.subject}</SheetTitle>
              <SheetDescription className="flex items-center gap-2 mt-1">
                <span className="font-mono text-xs">{ticket.id}</span>
                <span>•</span>
                <span>{ticket.category}</span>
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
          <div className="space-y-6">
            {/* Status and Priority */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                {ticket.priority}
              </Badge>
              <Badge variant="outline" className={getStatusColor(status)}>
                {status}
              </Badge>
              <Badge variant="outline" className={`${getSlaColor(ticket.slaStatus)}`}>
                <Timer className="h-3 w-3 mr-1" />
                {ticket.slaStatus}
              </Badge>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Raised by:</span>
                <span className="font-medium">{ticket.raisedBy}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Assigned to:</span>
                <span className="font-medium">{ticket.assignedTo || "Unassigned"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">{ticket.createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Updated:</span>
                <span className="font-medium">{ticket.updatedAt}</span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {ticket.description}
              </p>
            </div>

            <Separator />

            {/* Status Update */}
            <div className="space-y-2">
              <Label>Update Status</Label>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Comments */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <h4 className="font-semibold text-sm">Comments & Updates</h4>
              </div>

              <div className="space-y-4">
                {sampleComments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={c.avatar} />
                      <AvatarFallback className="text-xs">
                        {c.author.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{c.author}</span>
                        {c.isInternal && (
                          <Badge variant="outline" className="text-xs h-5">Internal</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{c.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{c.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach File
                  </Button>
                  <Button size="sm" onClick={handleAddComment}>
                    <Send className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  handleStatusChange("resolved");
                }}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Resolve Ticket
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={() => {
                  handleStatusChange("closed");
                }}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Close Ticket
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
