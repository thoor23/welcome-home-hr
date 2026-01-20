import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Switch } from "@/components/ui/switch";
import { 
  BookOpen, 
  FileText,
  Eye,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  category: string;
  tags: string[];
  author: string;
  status: string;
  views: number;
  lastUpdated: string;
  content: string;
}

const sampleArticles: Article[] = [
  {
    id: "1",
    title: "How to reset your password",
    category: "IT",
    tags: ["password", "login", "security"],
    author: "IT Support",
    status: "Published",
    views: 245,
    lastUpdated: "2026-01-02",
    content: "Step-by-step guide on how to reset your company password...",
  },
  {
    id: "2",
    title: "Leave Policy FAQ",
    category: "HR",
    tags: ["leave", "policy", "benefits"],
    author: "HR Team",
    status: "Published",
    views: 189,
    lastUpdated: "2025-12-28",
    content: "Frequently asked questions about leave policies...",
  },
  {
    id: "3",
    title: "Expense Claim Process",
    category: "Finance",
    tags: ["expense", "reimbursement", "claims"],
    author: "Finance Team",
    status: "Published",
    views: 156,
    lastUpdated: "2025-12-20",
    content: "Complete guide on submitting expense claims...",
  },
  {
    id: "4",
    title: "VPN Setup Guide",
    category: "IT",
    tags: ["vpn", "remote", "network"],
    author: "IT Support",
    status: "Published",
    views: 134,
    lastUpdated: "2025-12-15",
    content: "How to set up VPN for remote work...",
  },
  {
    id: "5",
    title: "Employee Handbook Guide",
    category: "HR",
    tags: ["handbook", "policies", "guide"],
    author: "HR Team",
    status: "Draft",
    views: 0,
    lastUpdated: "2026-01-01",
    content: "Complete guide to company policies and procedures...",
  },
  {
    id: "6",
    title: "Office Amenities Guide",
    category: "Facilities",
    tags: ["office", "amenities", "facilities"],
    author: "Admin Team",
    status: "Published",
    views: 98,
    lastUpdated: "2025-11-30",
    content: "Guide to all office amenities and facilities...",
  },
];

const categories = ["IT", "HR", "Finance", "Facilities", "Policies", "General"];

export default function KnowledgeBase() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const stats = {
    total: sampleArticles.length,
    published: sampleArticles.filter(a => a.status === "Published").length,
    draft: sampleArticles.filter(a => a.status === "Draft").length,
    viewsMonth: sampleArticles.reduce((acc, a) => acc + a.views, 0),
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setDialogOpen(true);
  };

  const handleDelete = (article: Article) => {
    toast.success(`Article "${article.title}" deleted`);
  };

  const columns: Column<Article>[] = [
    {
      key: "title",
      header: "Title",
      render: (item) => (
        <div>
          <span className="font-medium">{item.title}</span>
          <div className="flex gap-1 mt-1">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (item) => <Badge variant="secondary">{item.category}</Badge>,
    },
    {
      key: "author",
      header: "Author",
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <Badge variant={item.status === "Published" ? "default" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "views",
      header: "Views",
      render: (item) => (
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4 text-muted-foreground" />
          {item.views}
        </div>
      ),
    },
    {
      key: "lastUpdated",
      header: "Last Updated",
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (item) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => toast.info("Preview article")}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        <p className="text-muted-foreground">Self-help articles and FAQs for employees</p>
      </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Articles</p>
                      <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-500/10">
                      <FileText className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Published</p>
                      <p className="text-2xl font-bold">{stats.published}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-yellow-500/10">
                      <FileText className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Drafts</p>
                      <p className="text-2xl font-bold">{stats.draft}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <Eye className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Views This Month</p>
                      <p className="text-2xl font-bold">{stats.viewsMonth}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <DataTable
              columns={columns}
              data={sampleArticles}
              searchPlaceholder="Search articles..."
              toolbarActions={
                <Button onClick={() => {
                  setEditingArticle(null);
                  setDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Article
                </Button>
              }
        />

      {/* Add/Edit Article Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingArticle ? "Edit Article" : "New Article"}</DialogTitle>
            <DialogDescription>
              {editingArticle ? "Update the article details below." : "Create a new knowledge base article."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Article title" defaultValue={editingArticle?.title} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue={editingArticle?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tags (comma-separated)</Label>
                <Input 
                  placeholder="e.g., password, login, security" 
                  defaultValue={editingArticle?.tags.join(", ")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea 
                placeholder="Write your article content here..." 
                defaultValue={editingArticle?.content}
                rows={10}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Publish immediately</Label>
              <Switch defaultChecked={editingArticle?.status === "Published"} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success(editingArticle ? "Article updated" : "Article created");
              setDialogOpen(false);
            }}>
              {editingArticle ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
