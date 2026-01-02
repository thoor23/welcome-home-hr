import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tags, Layers, TrendingUp, Calendar, Plus, MoreHorizontal, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample categories data
const initialCategories = [
  { id: "1", name: "Meeting", color: "#3B82F6", description: "Team and client meetings", eventsCount: 45, status: "Active" },
  { id: "2", name: "Training", color: "#8B5CF6", description: "Employee training sessions", eventsCount: 23, status: "Active" },
  { id: "3", name: "Workshop", color: "#10B981", description: "Hands-on workshops", eventsCount: 18, status: "Active" },
  { id: "4", name: "Conference", color: "#F59E0B", description: "Large conferences", eventsCount: 8, status: "Active" },
  { id: "5", name: "Holiday", color: "#EF4444", description: "Company holidays", eventsCount: 12, status: "Active" },
  { id: "6", name: "Team Building", color: "#EC4899", description: "Team activities", eventsCount: 15, status: "Active" },
  { id: "7", name: "Webinar", color: "#06B6D4", description: "Online webinars", eventsCount: 32, status: "Active" },
  { id: "8", name: "Interview", color: "#6366F1", description: "Candidate interviews", eventsCount: 28, status: "Inactive" },
];

const EventCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<typeof initialCategories[0] | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCategories = categories.length;
  const activeCategories = categories.filter((c) => c.status === "Active").length;
  const mostUsedCategory = [...categories].sort((a, b) => b.eventsCount - a.eventsCount)[0];
  const totalEvents = categories.reduce((sum, c) => sum + c.eventsCount, 0);

  const handleOpenDialog = (category?: typeof initialCategories[0]) => {
    if (category) {
      setEditingCategory(category);
      setName(category.name);
      setColor(category.color);
      setDescription(category.description);
      setIsActive(category.status === "Active");
    } else {
      setEditingCategory(null);
      setName("");
      setColor("#3B82F6");
      setDescription("");
      setIsActive(true);
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required.",
        variant: "destructive",
      });
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name, color, description, status: isActive ? "Active" : "Inactive" }
            : c
        )
      );
      toast({
        title: "Category Updated",
        description: "The category has been updated successfully.",
      });
    } else {
      const newCategory = {
        id: String(Date.now()),
        name,
        color,
        description,
        eventsCount: 0,
        status: isActive ? "Active" : "Inactive",
      };
      setCategories((prev) => [...prev, newCategory]);
      toast({
        title: "Category Created",
        description: "The category has been created successfully.",
      });
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: "Category Deleted",
      description: "The category has been deleted successfully.",
      variant: "destructive",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">Event Categories</h1>
              <p className="text-muted-foreground">Manage event categories and their colors</p>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatsCard
                title="Total Categories"
                value={totalCategories.toString()}
                icon={Tags}
              />
              <StatsCard
                title="Active Categories"
                value={activeCategories.toString()}
                icon={Layers}
              />
              <StatsCard
                title="Most Used"
                value={mostUsedCategory?.name || "N/A"}
                icon={TrendingUp}
              />
              <StatsCard
                title="Total Events"
                value={totalEvents.toString()}
                icon={Calendar}
              />
            </div>

            {/* Filters */}
            <div className="bg-card rounded-lg border border-border p-4 mb-6">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </div>

            {/* Categories Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Category Name</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Events Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-md border border-border"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm text-muted-foreground font-mono">
                            {category.color}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-[200px] truncate">
                        {category.description}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {category.eventsCount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            category.status === "Active"
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              : "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
                          }
                        >
                          {category.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenDialog(category)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(category.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCategory
                      ? "Update the category details below."
                      : "Fill in the details to create a new category."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Category Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter category name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="color">Color</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="color"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="#3B82F6"
                        className="flex-1 font-mono"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter category description"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="status"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                    <Label htmlFor="status">Active</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    {editingCategory ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EventCategories;
