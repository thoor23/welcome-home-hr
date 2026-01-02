import { Pie, PieChart, Label } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { department: "engineering", employees: 112, fill: "var(--color-engineering)" },
  { department: "marketing", employees: 62, fill: "var(--color-marketing)" },
  { department: "sales", employees: 50, fill: "var(--color-sales)" },
  { department: "hr", employees: 24, fill: "var(--color-hr)" },
];

const chartConfig = {
  employees: {
    label: "Employees",
  },
  engineering: {
    label: "Engineering",
    color: "hsl(var(--primary))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(142.1 76.2% 36.3%)",
  },
  sales: {
    label: "Sales",
    color: "hsl(262.1 83.3% 57.8%)",
  },
  hr: {
    label: "HR",
    color: "hsl(38.3 95.8% 53.1%)",
  },
} satisfies ChartConfig;

export function DepartmentChart() {
  const total = chartData.reduce((sum, item) => sum + item.employees, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Department Distribution</CardTitle>
        <CardDescription>Employees by department</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="employees"
              nameKey="department"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="department" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
