"use client"

import { Card } from "@/components/ui/card"

const topEndpoints = [
  { endpoint: "/api/users", requests: 1200000, latency: "45ms", errorRate: "0.2%" },
  { endpoint: "/api/posts", requests: 980000, latency: "52ms", errorRate: "0.3%" },
  { endpoint: "/api/comments", requests: 850000, latency: "38ms", errorRate: "0.1%" },
  { endpoint: "/api/search", requests: 720000, latency: "120ms", errorRate: "1.2%" },
  { endpoint: "/api/auth", requests: 650000, latency: "65ms", errorRate: "0.5%" },
]

const recentErrors = [
  { time: "14:32:15", code: "500", endpoint: "/api/search", message: "Database connection timeout" },
  { time: "14:28:42", code: "429", endpoint: "/api/users", message: "Rate limit exceeded" },
  { time: "14:25:08", code: "503", endpoint: "/api/media", message: "Service temporarily unavailable" },
  { time: "14:22:33", code: "502", endpoint: "/api/posts", message: "Bad gateway from upstream" },
  { time: "14:18:47", code: "500", endpoint: "/api/analytics", message: "Internal server error" },
]

const userAgents = [
  { agent: "Chrome 120.0", requests: 3200000, percentage: "40%" },
  { agent: "Safari 17.0", requests: 1600000, percentage: "20%" },
  { agent: "Firefox 121.0", requests: 1280000, percentage: "16%" },
  { agent: "Mobile Safari", requests: 960000, percentage: "12%" },
  { agent: "Other", requests: 960000, percentage: "12%" },
]

export function TablesSection() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold mb-4">Top Endpoints</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Endpoint</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Requests</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Latency</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Error Rate</th>
              </tr>
            </thead>
            <tbody>
              {topEndpoints.map((row, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs">{row.endpoint}</td>
                  <td className="text-right py-3 px-4">{row.requests.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">{row.latency}</td>
                  <td className="text-right py-3 px-4">{row.errorRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Recent Errors</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Endpoint</th>
                </tr>
              </thead>
              <tbody>
                {recentErrors.map((row, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-xs font-mono">{row.time}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold">
                        {row.code}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono">{row.endpoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">User Agents</h3>
          <div className="space-y-3">
            {userAgents.map((ua, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{ua.agent}</span>
                  <span className="text-muted-foreground">{ua.percentage}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: ua.percentage }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
