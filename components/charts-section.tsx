"use client"

import { Card } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const requestsData = [
  { time: "00:00", requests: 45000, success: 44700, failed: 300 },
  { time: "04:00", requests: 52000, success: 51500, failed: 500 },
  { time: "08:00", requests: 78000, success: 77200, failed: 800 },
  { time: "12:00", requests: 95000, success: 93500, failed: 1500 },
  { time: "16:00", requests: 120000, success: 118000, failed: 2000 },
  { time: "20:00", requests: 98000, success: 96500, failed: 1500 },
  { time: "24:00", requests: 65000, success: 64200, failed: 800 },
]

const endpointsData = [
  { name: "/api/users", requests: 1200000 },
  { name: "/api/posts", requests: 980000 },
  { name: "/api/comments", requests: 850000 },
  { name: "/api/search", requests: 720000 },
  { name: "/api/auth", requests: 650000 },
  { name: "/api/media", requests: 580000 },
  { name: "/api/notifications", requests: 520000 },
  { name: "/api/analytics", requests: 450000 },
  { name: "/api/settings", requests: 380000 },
  { name: "/api/export", requests: 280000 },
]

interface ChartsSectionProps {
  dateRange: string
  isSimulating: boolean
}

export function ChartsSection({ dateRange, isSimulating }: ChartsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Requests Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={requestsData}>
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="time" stroke="currentColor" opacity={0.5} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Area type="monotone" dataKey="requests" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRequests)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Success vs Failed Requests</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={requestsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="time" stroke="currentColor" opacity={0.5} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Legend />
              <Area type="monotone" dataKey="success" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="failed" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold mb-4">Top 10 Endpoints</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={endpointsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
            <XAxis dataKey="name" stroke="currentColor" opacity={0.5} angle={-45} textAnchor="end" height={100} />
            <YAxis stroke="currentColor" opacity={0.5} />
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
            <Bar dataKey="requests" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
