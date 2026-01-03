import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Eye, FileText, Calendar, TrendingUp, Wallet, Receipt } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const payslips = [
  { 
    id: 1, 
    month: "December 2025", 
    payDate: "2025-12-28", 
    grossPay: 85000, 
    deductions: 18500, 
    netPay: 66500, 
    status: "paid",
    breakdown: {
      basic: 50000,
      hra: 20000,
      da: 10000,
      specialAllowance: 5000,
      pf: 6000,
      tax: 10000,
      professionalTax: 200,
      insurance: 2300,
    }
  },
  { 
    id: 2, 
    month: "November 2025", 
    payDate: "2025-11-28", 
    grossPay: 85000, 
    deductions: 18500, 
    netPay: 66500, 
    status: "paid",
    breakdown: {
      basic: 50000,
      hra: 20000,
      da: 10000,
      specialAllowance: 5000,
      pf: 6000,
      tax: 10000,
      professionalTax: 200,
      insurance: 2300,
    }
  },
  { 
    id: 3, 
    month: "October 2025", 
    payDate: "2025-10-28", 
    grossPay: 85000, 
    deductions: 18500, 
    netPay: 66500, 
    status: "paid",
    breakdown: {
      basic: 50000,
      hra: 20000,
      da: 10000,
      specialAllowance: 5000,
      pf: 6000,
      tax: 10000,
      professionalTax: 200,
      insurance: 2300,
    }
  },
  { 
    id: 4, 
    month: "September 2025", 
    payDate: "2025-09-28", 
    grossPay: 82000, 
    deductions: 17800, 
    netPay: 64200, 
    status: "paid",
    breakdown: {
      basic: 48000,
      hra: 19200,
      da: 9600,
      specialAllowance: 5200,
      pf: 5760,
      tax: 9540,
      professionalTax: 200,
      insurance: 2300,
    }
  },
];

const summaryStats = {
  ytdEarnings: 765000,
  ytdDeductions: 166500,
  ytdNetPay: 598500,
  avgMonthlyPay: 66500,
};

export default function Payslips() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedPayslip, setSelectedPayslip] = useState<typeof payslips[0] | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Payslips</h1>
            <p className="text-muted-foreground">View and download your monthly payslips</p>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">YTD Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(summaryStats.ytdEarnings)}</div>
              <p className="text-xs text-muted-foreground">Total gross earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">YTD Deductions</CardTitle>
              <Receipt className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(summaryStats.ytdDeductions)}</div>
              <p className="text-xs text-muted-foreground">Total deductions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">YTD Net Pay</CardTitle>
              <Wallet className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(summaryStats.ytdNetPay)}</div>
              <p className="text-xs text-muted-foreground">Take-home amount</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Monthly</CardTitle>
              <Calendar className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(summaryStats.avgMonthlyPay)}</div>
              <p className="text-xs text-muted-foreground">Average net pay</p>
            </CardContent>
          </Card>
        </div>

        {/* Payslips Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payslip History</CardTitle>
            <CardDescription>Your monthly payslips for {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Pay Date</TableHead>
                  <TableHead className="text-right">Gross Pay</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payslips.map((payslip) => (
                  <TableRow key={payslip.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {payslip.month}
                      </div>
                    </TableCell>
                    <TableCell>{payslip.payDate}</TableCell>
                    <TableCell className="text-right font-medium text-emerald-600">
                      {formatCurrency(payslip.grossPay)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      -{formatCurrency(payslip.deductions)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(payslip.netPay)}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedPayslip(payslip)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Payslip - {payslip.month}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-4">
                                  <h4 className="font-semibold text-emerald-600">Earnings</h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Basic Salary</span>
                                      <span>{formatCurrency(payslip.breakdown.basic)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">HRA</span>
                                      <span>{formatCurrency(payslip.breakdown.hra)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Dearness Allowance</span>
                                      <span>{formatCurrency(payslip.breakdown.da)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Special Allowance</span>
                                      <span>{formatCurrency(payslip.breakdown.specialAllowance)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                      <span>Total Earnings</span>
                                      <span className="text-emerald-600">{formatCurrency(payslip.grossPay)}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h4 className="font-semibold text-red-600">Deductions</h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Provident Fund</span>
                                      <span>{formatCurrency(payslip.breakdown.pf)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Income Tax</span>
                                      <span>{formatCurrency(payslip.breakdown.tax)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Professional Tax</span>
                                      <span>{formatCurrency(payslip.breakdown.professionalTax)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Insurance</span>
                                      <span>{formatCurrency(payslip.breakdown.insurance)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                      <span>Total Deductions</span>
                                      <span className="text-red-600">{formatCurrency(payslip.deductions)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Separator />
                              <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
                                <span className="text-lg font-semibold">Net Pay</span>
                                <span className="text-2xl font-bold text-primary">{formatCurrency(payslip.netPay)}</span>
                              </div>
                              <div className="flex justify-end">
                                <Button>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download PDF
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
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
      </div>
    </ESSLayout>
  );
}
