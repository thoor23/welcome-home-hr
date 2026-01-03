import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Wallet, TrendingUp, Percent, Building, Calendar, CreditCard, PiggyBank, Shield } from "lucide-react";

const salaryStructure = {
  basic: 50000,
  hra: 20000,
  da: 10000,
  specialAllowance: 5000,
  lta: 15000,
  medicalAllowance: 1250,
  conveyance: 1600,
  totalEarnings: 102850,
  employerPF: 6000,
  employerESI: 0,
  gratuity: 2404,
  totalCTC: 111254,
};

const deductions = {
  pf: 6000,
  tax: 10000,
  professionalTax: 200,
  insurance: 2300,
  totalDeductions: 18500,
};

const bankDetails = {
  accountName: "John Doe",
  accountNumber: "XXXX XXXX 4589",
  bankName: "HDFC Bank",
  ifscCode: "HDFC0001234",
  branch: "Koramangala, Bangalore",
};

const taxInfo = {
  regime: "New",
  taxableIncome: 1020000,
  estimatedTax: 120000,
  taxPaid: 100000,
  remainingTax: 20000,
  investments: {
    section80C: 150000,
    section80D: 25000,
    hra: 120000,
    lta: 15000,
  },
};

export default function SalaryDetails() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const netSalary = salaryStructure.totalEarnings - deductions.totalDeductions;

  return (
    <ESSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Salary Details</h1>
          <p className="text-muted-foreground">View your complete salary structure and benefits</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual CTC</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(salaryStructure.totalCTC * 12)}</div>
              <p className="text-xs text-muted-foreground">Per annum</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Gross</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(salaryStructure.totalEarnings)}</div>
              <p className="text-xs text-muted-foreground">Before deductions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Net</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(netSalary)}</div>
              <p className="text-xs text-muted-foreground">Take-home pay</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tax Regime</CardTitle>
              <Percent className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{taxInfo.regime}</div>
              <p className="text-xs text-muted-foreground">Current FY</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="structure" className="space-y-4">
          <TabsList>
            <TabsTrigger value="structure">Salary Structure</TabsTrigger>
            <TabsTrigger value="benefits">Benefits & Perks</TabsTrigger>
            <TabsTrigger value="bank">Bank Details</TabsTrigger>
            <TabsTrigger value="tax">Tax Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="structure" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    Earnings
                  </CardTitle>
                  <CardDescription>Monthly salary components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Basic Salary</p>
                        <p className="text-xs text-muted-foreground">Fixed component</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(salaryStructure.basic)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">House Rent Allowance</p>
                        <p className="text-xs text-muted-foreground">40% of Basic</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(salaryStructure.hra)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Dearness Allowance</p>
                        <p className="text-xs text-muted-foreground">20% of Basic</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(salaryStructure.da)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Special Allowance</p>
                        <p className="text-xs text-muted-foreground">Variable component</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(salaryStructure.specialAllowance)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Leave Travel Allowance</p>
                        <p className="text-xs text-muted-foreground">Annual benefit</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(salaryStructure.lta)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Medical Allowance</p>
                        <p className="text-xs text-muted-foreground">Monthly benefit</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(salaryStructure.medicalAllowance)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Conveyance</p>
                        <p className="text-xs text-muted-foreground">Transport allowance</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(salaryStructure.conveyance)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Earnings</span>
                    <span className="text-lg font-bold text-emerald-600">{formatCurrency(salaryStructure.totalEarnings)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Percent className="h-5 w-5" />
                    Deductions
                  </CardTitle>
                  <CardDescription>Monthly deductions from salary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Provident Fund</p>
                        <p className="text-xs text-muted-foreground">12% of Basic</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(deductions.pf)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Income Tax (TDS)</p>
                        <p className="text-xs text-muted-foreground">As per tax slab</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(deductions.tax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Professional Tax</p>
                        <p className="text-xs text-muted-foreground">State tax</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(deductions.professionalTax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Health Insurance</p>
                        <p className="text-xs text-muted-foreground">Employee contribution</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(deductions.insurance)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Deductions</span>
                    <span className="text-lg font-bold text-red-600">{formatCurrency(deductions.totalDeductions)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="font-semibold">Net Salary</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(netSalary)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-blue-500" />
                    Provident Fund
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Employee Contribution</span>
                      <span className="font-medium">{formatCurrency(deductions.pf)}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Employer Contribution</span>
                      <span className="font-medium">{formatCurrency(salaryStructure.employerPF)}/mo</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-medium">Total Monthly</span>
                      <span className="font-bold text-blue-600">{formatCurrency(deductions.pf * 2)}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-full justify-center">UAN: 10XXXXXXXX89</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-500" />
                    Health Insurance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Coverage Type</span>
                      <span className="font-medium">Family Floater</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sum Insured</span>
                      <span className="font-medium">{formatCurrency(500000)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Premium (Monthly)</span>
                      <span className="font-medium">{formatCurrency(deductions.insurance)}</span>
                    </div>
                  </div>
                  <Badge className="w-full justify-center bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Active Coverage</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-500" />
                    Gratuity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Accrual</span>
                      <span className="font-medium">{formatCurrency(salaryStructure.gratuity)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Years of Service</span>
                      <span className="font-medium">3.5 years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Amount</span>
                      <span className="font-medium">{formatCurrency(100962)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Payable after 5 years of service</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bank" className="space-y-4">
            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Salary Account Details
                </CardTitle>
                <CardDescription>Your registered bank account for salary credit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Account Holder</span>
                    <span className="font-medium">{bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Account Number</span>
                    <span className="font-medium font-mono">{bankDetails.accountNumber}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Bank Name</span>
                    <span className="font-medium">{bankDetails.bankName}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">IFSC Code</span>
                    <span className="font-medium font-mono">{bankDetails.ifscCode}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Branch</span>
                    <span className="font-medium">{bankDetails.branch}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  To update your bank details, please contact HR or raise a support ticket.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tax Summary FY 2025-26</CardTitle>
                  <CardDescription>Your income tax calculation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Gross Taxable Income</span>
                      <span className="font-semibold">{formatCurrency(taxInfo.taxableIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Estimated Tax</span>
                      <span className="font-semibold">{formatCurrency(taxInfo.estimatedTax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tax Paid (YTD)</span>
                      <span className="font-semibold text-emerald-600">{formatCurrency(taxInfo.taxPaid)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Remaining Tax</span>
                      <span className="font-semibold text-amber-600">{formatCurrency(taxInfo.remainingTax)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tax Payment Progress</span>
                      <span>{Math.round((taxInfo.taxPaid / taxInfo.estimatedTax) * 100)}%</span>
                    </div>
                    <Progress value={(taxInfo.taxPaid / taxInfo.estimatedTax) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Saving Investments</CardTitle>
                  <CardDescription>Declared investments for tax benefits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Section 80C</p>
                        <p className="text-xs text-muted-foreground">PF, PPF, ELSS, etc.</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(taxInfo.investments.section80C)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Section 80D</p>
                        <p className="text-xs text-muted-foreground">Health Insurance</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(taxInfo.investments.section80D)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">HRA Exemption</p>
                        <p className="text-xs text-muted-foreground">Rent receipts declared</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(taxInfo.investments.hra)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">LTA Claimed</p>
                        <p className="text-xs text-muted-foreground">Travel bills submitted</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(taxInfo.investments.lta)}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-full justify-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Declaration window open till Mar 31
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ESSLayout>
  );
}
