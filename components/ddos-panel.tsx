"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"

interface DDoSPanelProps {
  isSimulating: boolean
  setIsSimulating: (value: boolean) => void
}

export function DDoSPanel({ isSimulating, setIsSimulating }: DDoSPanelProps) {
  const [status, setStatus] = useState<"normal" | "suspected" | "mitigating">("normal")
  const [alerts, setAlerts] = useState([
    { id: 1, time: "14:32", message: "Spike detected — 2.5x traffic increase", level: "warning" },
    { id: 2, time: "14:15", message: "Unusual pattern from AS64512", level: "info" },
    { id: 3, time: "13:48", message: "Rate limit triggered on /api/search", level: "warning" },
  ])

  const [suspiciousIPs, setSuspiciousIPs] = useState([
    { ip: "203.0.113.45", country: "CN", asn: "AS64512", requests: 450000 },
    { ip: "198.51.100.89", country: "RU", asn: "AS64513", requests: 320000 },
    { ip: "192.0.2.12", country: "KP", asn: "AS64514", requests: 280000 },
  ])

  useEffect(() => {
    if (isSimulating) {
      setStatus("suspected")
      const timer = setTimeout(() => {
        setStatus("mitigating")
        const mitigateTimer = setTimeout(() => {
          setStatus("normal")
          setIsSimulating(false)
        }, 3000)
        return () => clearTimeout(mitigateTimer)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isSimulating, setIsSimulating])

  const statusConfig = {
    normal: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Normal" },
    suspected: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Suspected Attack" },
    mitigating: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Mitigating" },
  }

  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${config.bg}`}>
              <StatusIcon className={`w-6 h-6 ${config.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">DDoS & Anomaly Detection</h3>
              <p className={`text-sm ${config.color}`}>{config.label}</p>
            </div>
          </div>
          <Button onClick={() => setIsSimulating(true)} disabled={isSimulating} variant="outline">
            Simulate Traffic Spike
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h4 className="font-semibold mb-4">Suspicious IPs</h4>
          <div className="space-y-3">
            {suspiciousIPs.map((ip, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-mono text-sm font-semibold">{ip.ip}</p>
                  <p className="text-xs text-muted-foreground">
                    {ip.country} • {ip.asn}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{ip.requests.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">requests</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h4 className="font-semibold mb-4">Recent Alerts</h4>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const levelConfig = {
                info: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                critical: "bg-red-500/10 text-red-600 dark:text-red-400",
              }
              return (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg ${levelConfig[alert.level as keyof typeof levelConfig]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold opacity-75">{alert.time}</p>
                      <p className="text-sm mt-1">{alert.message}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
