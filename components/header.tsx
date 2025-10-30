"use client"

import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Download } from "lucide-react"

interface HeaderProps {
  dateRange: string
  setDateRange: (range: string) => void
}

export function Header({ dateRange, setDateRange }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
              d
            </div>
            <div>
              <h1 className="text-2xl font-bold">dstat</h1>
              <p className="text-sm text-muted-foreground">System Performance Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {["24h", "7d", "30d"].map((range) => (
                <Button
                  key={range}
                  variant={dateRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>

            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>

            <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2 bg-transparent">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
