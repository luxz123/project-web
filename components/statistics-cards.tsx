"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: number | string
  unit?: string
  isAnimating?: boolean
}

function StatCard({ label, value, unit, isAnimating }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isAnimating || typeof value !== "number") {
      setDisplayValue(typeof value === "number" ? value : 0)
      return
    }

    let current = 0
    const target = value
    const increment = target / 30
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setDisplayValue(target)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, 30)

    return () => clearInterval(interval)
  }, [value, isAnimating])

  const formattedValue = typeof value === "number" ? displayValue.toLocaleString() : value

  return (
    <Card className="p-6 bg-card border-border hover:shadow-lg transition-shadow">
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-foreground">{formattedValue}</p>
        {unit && <p className="text-sm text-muted-foreground">{unit}</p>}
      </div>
    </Card>
  )
}

interface StatisticsCardsProps {
  isSimulating: boolean
}

export function StatisticsCards({ isSimulating }: StatisticsCardsProps) {
  const stats = [
    { label: "Total Requests", value: 8000000, unit: "req" },
    { label: "Request per Second", value: 308, unit: "req/s" },
    { label: "Error Rate", value: "0.87%", unit: "" },
    { label: "P95 Latency", value: 420, unit: "ms" },
    { label: "Peak Requests/sec", value: 1200, unit: "req/s" },
    { label: "Current Requests/min", value: 74000, unit: "req/min" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <StatCard key={idx} label={stat.label} value={stat.value} unit={stat.unit} isAnimating={isSimulating} />
      ))}
    </div>
  )
}
