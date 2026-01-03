import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Search, 
  Wallet,
  CalendarDays,
  Clock,
  Laptop,
  Shield,
  Users,
  Building,
  FileText,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  views: number;
  helpful: number;
}

const articlesData: Article[] = [
  {
    id: "KB-001",
    title: "How to apply for leave?",
    category: "Leave Management",
    content: "To apply for leave, navigate to My Leaves > Apply Leave. Select the leave type, enter the dates, provide a reason, and submit. Your manager will receive a notification for approval. You can track the status in My Requests.",
    views: 1250,
    helpful: 156
  },
  {
    id: "KB-002",
    title: "How to download my payslip?",
    category: "Payroll",
    content: "Go to Payroll > Payslips, find the month you need, and click the download button. Payslips are available in PDF format. You can also view the detailed breakdown before downloading.",
    views: 980,
    helpful: 142
  },
  {
    id: "KB-003",
    title: "How to regularize my attendance?",
    category: "Attendance",
    content: "Navigate to My Attendance > Regularization. Select the date with incorrect attendance, provide the actual check-in/check-out times, add a reason, and submit for approval.",
    views: 875,
    helpful: 98
  },
  {
    id: "KB-004",
    title: "How to submit an expense claim?",
    category: "Expenses",
    content: "Go to Expenses > Submit Claim. Add a title, then add expense items with category, date, amount, and receipt. Multiple items can be added to one claim. Submit for manager approval.",
    views: 720,
    helpful: 85
  },
  {
    id: "KB-005",
    title: "How to connect to VPN?",
    category: "IT Support",
    content: "Download the VPN client from IT portal, install it, and use your AD credentials to connect. If you face issues, ensure your password hasn't expired and check your internet connection.",
    views: 650,
    helpful: 78
  },
  {
    id: "KB-006",
    title: "What are the leave types available?",
    category: "Leave Management",
    content: "Available leave types include: Casual Leave (12 days), Sick Leave (12 days), Earned Leave (15 days), Maternity Leave (26 weeks), Paternity Leave (5 days), and Bereavement Leave (5 days).",
    views: 580,
    helpful: 72
  },
  {
    id: "KB-007",
    title: "How to update my personal information?",
    category: "Profile",
    content: "Go to My Profile and click Edit. Update your details and submit. Changes to sensitive information like bank details require HR approval. Emergency contacts can be updated directly.",
    views: 520,
    helpful: 65
  },
  {
    id: "KB-008",
    title: "How to request a shift swap?",
    category: "Shifts",
    content: "Navigate to My Shifts > Swap Requests. Click New Request, select the colleague you want to swap with, choose the dates, and submit. Both parties need to approve the swap.",
    views: 480,
    helpful: 58
  },
];

const categories = [
  { id: "all", label: "All Topics", icon: BookOpen },
  { id: "leave", label: "Leave Management", icon: CalendarDays },
  { id: "payroll", label: "Payroll", icon: Wallet },
  { id: "attendance", label: "Attendance", icon: Clock },
  { id: "it", label: "IT Support", icon: Laptop },
  { id: "expenses", label: "Expenses", icon: FileText },
];

const faqData = [
  {
    question: "How many casual leaves can I take in a month?",
    answer: "You can take a maximum of 3 casual leaves per month, subject to manager approval and team requirements."
  },
  {
    question: "When is salary credited?",
    answer: "Salary is credited on the last working day of each month. If it falls on a holiday, it's credited on the previous working day."
  },
  {
    question: "Can I carry forward my leaves?",
    answer: "Earned leaves can be carried forward (max 30 days). Casual and sick leaves expire at year end and cannot be encashed."
  },
  {
    question: "How do I report a lost asset?",
    answer: "Immediately report through IT Support ticket with priority 'Urgent'. Include details like asset ID, when/where it was lost."
  },
  {
    question: "What is the notice period?",
    answer: "Notice period varies by role: 30 days for junior roles, 60 days for senior roles, and 90 days for management positions."
  },
];

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArticles = articlesData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           article.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleHelpful = (articleId: string, helpful: boolean) => {
    toast.success(helpful ? "Thank you for your feedback!" : "We'll improve this article");
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground">Knowledge Base</h1>
          <p className="text-muted-foreground mt-2">Find answers to common questions and learn how to use the system</p>
          
          {/* Search */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search articles, FAQs, guides..." 
              className="pl-12 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </Button>
            );
          })}
        </div>

        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="mx-auto flex w-fit">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          {/* Articles */}
          <TabsContent value="articles">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:bg-muted/50 transition-all cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{article.title}</CardTitle>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {article.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{article.views} views</span>
                        <span>{article.helpful} found helpful</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleHelpful(article.id, true)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleHelpful(article.id, false)}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No articles found matching your search</p>
              </div>
            )}
          </TabsContent>
          
          {/* FAQ */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Still need help */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-8">
            <div className="text-center max-w-md mx-auto">
              <MessageSquare className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Create a support ticket and our team will assist you.
              </p>
              <Link to="/ess/support/new">
                <Button>
                  Create Support Ticket
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </ESSLayout>
  );
}
