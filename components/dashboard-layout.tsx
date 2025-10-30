"use client"

import { useState } from "react"
import { Header } from "./header"
import { StatisticsCards } from "./statistics-cards"
import { ChartsSection } from "./charts-section"
import { DDoSPanel } from "./ddos-panel"
import { TablesSection } from "./tables-section"
import { Footer } from "./footer"

export function DashboardLayout() {
  const [dateRange, setDateRange] = useState("24h")
  const [isSimulating, setIsSimulating] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-400">
      <Header dateRange={dateRange} setDateRange={setDateRange} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <StatisticsCards isSimulating={isSimulating} />
        <ChartsSection dateRange={dateRange} isSimulating={isSimulating} />
        <DDoSPanel isSimulating={isSimulating} setIsSimulating={setIsSimulating} />
        <TablesSection />
      </main>

      <Footer />
    </div>
  )
}
