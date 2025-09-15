import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PerformanceData {
  library: string
  bleu: number
  rouge: number
  chrf: number
  pii: number
  color: string
}

const performanceData: PerformanceData[] = [
  {
    library: "BlazeMetrics",
    bleu: 0.285,
    rouge: 0.742,
    chrf: 0.456,
    pii: 0.398,
    color: "#DC143C"
  },
  {
    library: "HF Evaluate",
    bleu: 4.823,
    rouge: 12.456,
    chrf: 7.892,
    pii: 999, // N/A represented as high value
    color: "#D3D3D3"
  },
  {
    library: "SacreBLEU",
    bleu: 2.156,
    rouge: 999, // N/A
    chrf: 1.987,
    pii: 999, // N/A
    color: "#D3D3D3"
  },
  {
    library: "NLTK",
    bleu: 14.567,
    rouge: 999, // N/A
    chrf: 999, // N/A
    pii: 999, // N/A
    color: "#D3D3D3"
  }
]

export function PerformanceChart() {
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const maxValue = Math.max(...performanceData.flatMap(d => [d.bleu, d.rouge, d.chrf, d.pii === 999 ? 20 : d.pii]))

  const getBarHeight = (value: number) => {
    if (value === 999) return 5 // Minimal height for N/A
    return Math.max((value / maxValue) * 100, 2)
  }

  const getPerformanceColor = (library: string) => {
    if (library === "BlazeMetrics") return "performance-excellent"
    if (library === "HF Evaluate") return "performance-poor"
    return "performance-average"
  }

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/50">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Performance Comparison</h3>
        <p className="text-sm text-muted-foreground">
          Execution time in seconds for 1,000 text pairs
        </p>
      </div>

      <div className="space-y-6">
        {performanceData.map((item, index) => (
          <motion.div
            key={item.library}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.library}</span>
              <Badge className={`performance-badge ${getPerformanceColor(item.library)}`}>
                {item.library === "BlazeMetrics" ? "Winner" : "Slower"}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "BLEU", value: item.bleu },
                { label: "ROUGE", value: item.rouge },
                { label: "CHRF", value: item.chrf },
                { label: "WER", value: item.pii }
              ].map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="font-mono">
                      {metric.value === 999 ? "N/A" : `${metric.value}s`}
                    </span>
                  </div>
                  <div className="h-20 bg-muted rounded-sm relative overflow-hidden">
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 rounded-sm"
                      style={{ backgroundColor: item.color }}
                      initial={{ height: 0 }}
                      animate={{ 
                        height: animationStarted ? `${getBarHeight(metric.value)}%` : 0 
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2 + 0.3,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-muted-foreground">
              {item.library === "BlazeMetrics" && (
                <span className="text-red-600 dark:text-red-400 font-medium">
                  🚀 10-50x faster with Rust core + SIMD optimizations
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          <strong>Test Environment:</strong> 1K samples on multi-core CPU • Lower is better
        </p>
      </div>
    </Card>
  )
}