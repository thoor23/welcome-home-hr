import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  RefreshCw,
  Server,
  Database,
  Mail,
  Shield,
  Globe,
  Zap,
  Activity
} from "lucide-react";
import { useState } from "react";

type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";

interface Service {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  uptime: number;
  icon: React.ElementType;
  lastChecked: string;
}

interface Incident {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  severity: "minor" | "major" | "critical";
  createdAt: string;
  resolvedAt?: string;
  updates: {
    time: string;
    message: string;
    status: string;
  }[];
  affectedServices: string[];
}

interface DayStatus {
  date: string;
  status: ServiceStatus;
  incidents: number;
}

const services: Service[] = [
  { id: "api", name: "API", description: "Core API endpoints", status: "operational", uptime: 99.99, icon: Server, lastChecked: "2 mins ago" },
  { id: "database", name: "Database", description: "Primary database cluster", status: "operational", uptime: 99.98, icon: Database, lastChecked: "2 mins ago" },
  { id: "auth", name: "Authentication", description: "Login & session management", status: "operational", uptime: 99.95, icon: Shield, lastChecked: "2 mins ago" },
  { id: "email", name: "Email Services", description: "Transactional emails", status: "degraded", uptime: 98.50, icon: Mail, lastChecked: "2 mins ago" },
  { id: "cdn", name: "CDN", description: "Content delivery network", status: "operational", uptime: 99.99, icon: Globe, lastChecked: "2 mins ago" },
  { id: "functions", name: "Edge Functions", description: "Serverless functions", status: "operational", uptime: 99.90, icon: Zap, lastChecked: "2 mins ago" },
  { id: "realtime", name: "Realtime", description: "WebSocket connections", status: "operational", uptime: 99.85, icon: Activity, lastChecked: "2 mins ago" },
];

const incidents: Incident[] = [
  {
    id: "inc-001",
    title: "Email delivery delays",
    status: "monitoring",
    severity: "minor",
    createdAt: "2024-01-15T10:30:00Z",
    updates: [
      { time: "2024-01-15T11:45:00Z", message: "We are monitoring the situation. Email delivery times are returning to normal.", status: "monitoring" },
      { time: "2024-01-15T11:00:00Z", message: "The issue has been identified. Our email provider is experiencing increased latency.", status: "identified" },
      { time: "2024-01-15T10:30:00Z", message: "We are investigating reports of delayed email deliveries.", status: "investigating" },
    ],
    affectedServices: ["email"],
  },
  {
    id: "inc-002",
    title: "Database connectivity issues",
    status: "resolved",
    severity: "major",
    createdAt: "2024-01-10T14:00:00Z",
    resolvedAt: "2024-01-10T15:30:00Z",
    updates: [
      { time: "2024-01-10T15:30:00Z", message: "The issue has been fully resolved. All database connections are operating normally.", status: "resolved" },
      { time: "2024-01-10T15:00:00Z", message: "We have identified a network partition and are implementing a fix.", status: "identified" },
      { time: "2024-01-10T14:00:00Z", message: "We are investigating intermittent database connectivity issues.", status: "investigating" },
    ],
    affectedServices: ["database", "api"],
  },
  {
    id: "inc-003",
    title: "Authentication service slowdown",
    status: "resolved",
    severity: "minor",
    createdAt: "2024-01-05T08:00:00Z",
    resolvedAt: "2024-01-05T09:15:00Z",
    updates: [
      { time: "2024-01-05T09:15:00Z", message: "Issue resolved. Authentication response times are back to normal.", status: "resolved" },
      { time: "2024-01-05T08:30:00Z", message: "We have scaled up authentication servers to handle increased load.", status: "monitoring" },
      { time: "2024-01-05T08:00:00Z", message: "We are seeing increased latency in authentication requests.", status: "investigating" },
    ],
    affectedServices: ["auth"],
  },
];

// Generate 90 days of history
const generateUptimeHistory = (): DayStatus[] => {
  const history: DayStatus[] = [];
  const today = new Date();
  
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Simulate some random statuses
    let status: ServiceStatus = "operational";
    let incidents = 0;
    
    const random = Math.random();
    if (random > 0.98) {
      status = "outage";
      incidents = 1;
    } else if (random > 0.95) {
      status = "degraded";
      incidents = 1;
    } else if (random > 0.92) {
      status = "maintenance";
    }
    
    history.push({
      date: date.toISOString().split('T')[0],
      status,
      incidents,
    });
  }
  
  return history;
};

const uptimeHistory = generateUptimeHistory();

const getStatusColor = (status: ServiceStatus) => {
  switch (status) {
    case "operational": return "bg-green-500";
    case "degraded": return "bg-yellow-500";
    case "outage": return "bg-red-500";
    case "maintenance": return "bg-blue-500";
  }
};

const getStatusBadge = (status: ServiceStatus) => {
  switch (status) {
    case "operational": return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Operational</Badge>;
    case "degraded": return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Degraded</Badge>;
    case "outage": return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Outage</Badge>;
    case "maintenance": return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Maintenance</Badge>;
  }
};

const getStatusIcon = (status: ServiceStatus) => {
  switch (status) {
    case "operational": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "degraded": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "outage": return <XCircle className="h-5 w-5 text-red-500" />;
    case "maintenance": return <Clock className="h-5 w-5 text-blue-500" />;
  }
};

const getIncidentStatusBadge = (status: string) => {
  switch (status) {
    case "investigating": return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Investigating</Badge>;
    case "identified": return <Badge variant="outline" className="border-orange-500 text-orange-500">Identified</Badge>;
    case "monitoring": return <Badge variant="outline" className="border-blue-500 text-blue-500">Monitoring</Badge>;
    case "resolved": return <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>;
    default: return null;
  }
};

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case "minor": return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Minor</Badge>;
    case "major": return <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">Major</Badge>;
    case "critical": return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Critical</Badge>;
    default: return null;
  }
};

export default function StatusPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const overallStatus = services.some(s => s.status === "outage") 
    ? "outage" 
    : services.some(s => s.status === "degraded") 
      ? "degraded" 
      : services.some(s => s.status === "maintenance")
        ? "maintenance"
        : "operational";

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const activeIncidents = incidents.filter(i => i.status !== "resolved");
  const resolvedIncidents = incidents.filter(i => i.status === "resolved");

  const calculateOverallUptime = () => {
    const operationalDays = uptimeHistory.filter(d => d.status === "operational").length;
    return ((operationalDays / uptimeHistory.length) * 100).toFixed(2);
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Status</h1>
            <p className="text-muted-foreground">
              Real-time platform health and incident history
            </p>
          </div>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Overall Status Banner */}
        <Card className={`border-2 ${
          overallStatus === "operational" ? "border-green-500/50 bg-green-500/5" :
          overallStatus === "degraded" ? "border-yellow-500/50 bg-yellow-500/5" :
          overallStatus === "outage" ? "border-red-500/50 bg-red-500/5" :
          "border-blue-500/50 bg-blue-500/5"
        }`}>
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              {getStatusIcon(overallStatus)}
              <div>
                <h2 className="text-xl font-semibold">
                  {overallStatus === "operational" && "All Systems Operational"}
                  {overallStatus === "degraded" && "Partial System Degradation"}
                  {overallStatus === "outage" && "System Outage Detected"}
                  {overallStatus === "maintenance" && "Scheduled Maintenance"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Incidents */}
        {activeIncidents.length > 0 && (
          <Card className="border-yellow-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Active Incidents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeIncidents.map((incident) => (
                <div key={incident.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{incident.title}</h3>
                      {getSeverityBadge(incident.severity)}
                      {getIncidentStatusBadge(incident.status)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Started: {new Date(incident.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Affected: {incident.affectedServices.map(s => services.find(srv => srv.id === s)?.name).join(", ")}
                  </div>
                  <div className="space-y-2 pl-4 border-l-2 border-muted">
                    {incident.updates.slice(0, 3).map((update, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="text-muted-foreground">
                          {new Date(update.time).toLocaleTimeString()}
                        </span>
                        <span className="mx-2">-</span>
                        <span>{update.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Services Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
            <CardDescription>Current status of all platform services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={service.id} 
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium">{service.uptime}%</p>
                        <p className="text-xs text-muted-foreground">uptime</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{service.lastChecked}</p>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Uptime History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Uptime History</CardTitle>
                <CardDescription>90-day uptime: {calculateOverallUptime()}%</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                  <span>Operational</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-yellow-500"></div>
                  <span>Degraded</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-red-500"></div>
                  <span>Outage</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                  <span>Maintenance</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-0.5">
              {uptimeHistory.map((day, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-10 rounded-sm ${getStatusColor(day.status)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                  title={`${day.date}: ${day.status}${day.incidents > 0 ? ` (${day.incidents} incident${day.incidents > 1 ? 's' : ''})` : ''}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </CardContent>
        </Card>

        {/* Incident History */}
        <Card>
          <CardHeader>
            <CardTitle>Incident History</CardTitle>
            <CardDescription>Past incidents and their resolutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resolvedIncidents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-500/50" />
                  <p>No incidents in the past 90 days</p>
                </div>
              ) : (
                resolvedIncidents.map((incident) => (
                  <div key={incident.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{incident.title}</h3>
                        {getSeverityBadge(incident.severity)}
                        {getIncidentStatusBadge(incident.status)}
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{new Date(incident.createdAt).toLocaleDateString()}</p>
                        {incident.resolvedAt && (
                          <p className="text-xs">
                            Duration: {Math.round((new Date(incident.resolvedAt).getTime() - new Date(incident.createdAt).getTime()) / 60000)} mins
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Affected: {incident.affectedServices.map(s => services.find(srv => srv.id === s)?.name).join(", ")}
                    </div>
                    <details className="group">
                      <summary className="text-sm text-primary cursor-pointer hover:underline">
                        View timeline ({incident.updates.length} updates)
                      </summary>
                      <div className="space-y-2 pl-4 border-l-2 border-muted mt-3">
                        {incident.updates.map((update, idx) => (
                          <div key={idx} className="text-sm">
                            <span className="text-muted-foreground">
                              {new Date(update.time).toLocaleString()}
                            </span>
                            <span className="mx-2">-</span>
                            <span className="font-medium capitalize">{update.status}</span>
                            <span className="mx-2">-</span>
                            <span>{update.message}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}