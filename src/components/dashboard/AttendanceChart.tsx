import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", present: 85, absent: 10, leave: 5 },
  { name: "Tue", present: 88, absent: 8, leave: 4 },
  { name: "Wed", present: 82, absent: 12, leave: 6 },
  { name: "Thu", present: 90, absent: 6, leave: 4 },
  { name: "Fri", present: 78, absent: 15, leave: 7 },
  { name: "Sat", present: 45, absent: 5, leave: 2 },
  { name: "Sun", present: 20, absent: 2, leave: 1 },
];

export function AttendanceChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weekly Attendance</h3>
          <p className="text-sm text-muted-foreground">Employee attendance overview</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">On Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-muted-foreground">Absent</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Bar dataKey="present" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="leave" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="absent" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div>
          <p className="text-sm text-muted-foreground">Total Employees</p>
          <p className="text-xl font-bold text-foreground">248</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ 12.5%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Avg. Attendance</p>
          <p className="text-xl font-bold text-foreground">94.2%</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ 3.2%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">On Leave Today</p>
          <p className="text-xl font-bold text-foreground">12</p>
          <p className="text-xs text-red-500">↓ 2.1%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Late Arrivals</p>
          <p className="text-xl font-bold text-foreground">8</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ 15.3%</p>
        </div>
      </div>
    </div>
  );
}
