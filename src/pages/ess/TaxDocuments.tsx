import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Calendar, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const form16Documents = [
  { id: 1, year: "FY 2024-25", generatedDate: "2025-06-15", status: "available", fileSize: "245 KB" },
  { id: 2, year: "FY 2023-24", generatedDate: "2024-06-15", status: "available", fileSize: "238 KB" },
  { id: 3, year: "FY 2022-23", generatedDate: "2023-06-15", status: "available", fileSize: "220 KB" },
];

const investmentProofs = [
  { id: 1, type: "80C - PPF", amount: 50000, status: "approved", submittedDate: "2025-01-10" },
  { id: 2, type: "80C - ELSS", amount: 100000, status: "approved", submittedDate: "2025-01-10" },
  { id: 3, type: "80D - Health Insurance", amount: 25000, status: "pending", submittedDate: "2025-01-12" },
  { id: 4, type: "HRA - Rent Receipts", amount: 120000, status: "approved", submittedDate: "2025-01-08" },
];

const taxStatements = [
  { id: 1, month: "December 2025", tds: 10000, status: "filed" },
  { id: 2, month: "November 2025", tds: 10000, status: "filed" },
  { id: 3, month: "October 2025", tds: 10000, status: "filed" },
  { id: 4, month: "September 2025", tds: 9540, status: "filed" },
  { id: 5, month: "August 2025", tds: 9540, status: "filed" },
  { id: 6, month: "July 2025", tds: 9540, status: "filed" },
];

export default function TaxDocuments() {
  const [selectedYear, setSelectedYear] = useState("2025-26");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownload = (docName: string) => {
    toast.success(`Downloading ${docName}...`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Available</Badge>;
      case "approved":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Approved</Badge>;
      case "pending":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Rejected</Badge>;
      case "filed":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Filed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalTDS = taxStatements.reduce((sum, item) => sum + item.tds, 0);

  return (
    <ESSLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tax Documents</h1>
            <p className="text-muted-foreground">Access your tax-related documents and investment proofs</p>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-26">FY 2025-26</SelectItem>
              <SelectItem value="2024-25">FY 2024-25</SelectItem>
              <SelectItem value="2023-24">FY 2023-24</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Form 16 Status</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-lg font-semibold">Available</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Generated on Jun 15, 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TDS Deducted (YTD)</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalTDS)}</div>
              <p className="text-xs text-muted-foreground">As of December 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investment Proofs</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">3/4 Approved</span>
              </div>
              <p className="text-xs text-muted-foreground">1 pending review</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="form16" className="space-y-4">
          <TabsList>
            <TabsTrigger value="form16">Form 16</TabsTrigger>
            <TabsTrigger value="investments">Investment Proofs</TabsTrigger>
            <TabsTrigger value="statements">TDS Statements</TabsTrigger>
          </TabsList>

          <TabsContent value="form16" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Form 16 Documents</CardTitle>
                <CardDescription>Annual tax deduction certificates from your employer</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Financial Year</TableHead>
                      <TableHead>Generated Date</TableHead>
                      <TableHead>File Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {form16Documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {doc.year}
                          </div>
                        </TableCell>
                        <TableCell>{doc.generatedDate}</TableCell>
                        <TableCell>{doc.fileSize}</TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownload(`Form 16 - ${doc.year}`)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other Tax Documents</CardTitle>
                <CardDescription>Additional tax-related certificates and forms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Form 12BA</p>
                        <p className="text-xs text-muted-foreground">Perquisites Statement</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload("Form 12BA")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Provisional Form 16</p>
                        <p className="text-xs text-muted-foreground">Current FY Estimate</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload("Provisional Form 16")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Proofs Submitted</CardTitle>
                <CardDescription>Track the status of your tax-saving investment declarations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investment Type</TableHead>
                      <TableHead className="text-right">Amount Declared</TableHead>
                      <TableHead>Submitted Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investmentProofs.map((proof) => (
                      <TableRow key={proof.id}>
                        <TableCell className="font-medium">{proof.type}</TableCell>
                        <TableCell className="text-right">{formatCurrency(proof.amount)}</TableCell>
                        <TableCell>{proof.submittedDate}</TableCell>
                        <TableCell>{getStatusBadge(proof.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Declared</span>
                    <span className="text-lg font-bold">
                      {formatCurrency(investmentProofs.reduce((sum, p) => sum + p.amount, 0))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly TDS Statements</CardTitle>
                <CardDescription>Tax deducted at source from your monthly salary</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">TDS Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxStatements.map((statement) => (
                      <TableRow key={statement.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {statement.month}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(statement.tds)}
                        </TableCell>
                        <TableCell>{getStatusBadge(statement.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownload(`TDS Statement - ${statement.month}`)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total TDS (YTD)</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(totalTDS)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ESSLayout>
  );
}
