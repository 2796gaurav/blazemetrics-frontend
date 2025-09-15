import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Copy, Check, Zap, Shield, BarChart3 } from "lucide-react"

interface MetricResult {
  bleu: number
  rouge1: number
  rougeL: number
  meteor: number
  wer: number
  safety_score: number
  pii_detected: boolean
}

interface DemoExample {
  id: string
  title: string
  description: string
  code: string
  candidate: string
  reference: string
  expectedResults: MetricResult
}

const demoExamples: DemoExample[] = [
  {
    id: "basic",
    title: "Basic Text Evaluation",
    description: "Evaluate text quality with multiple metrics",
    code: `from blazemetrics import BlazeMetricsClient

client = BlazeMetricsClient()

# Your model's output
candidate = "Paris is the capital city of France."
reference = ["Paris is the capital of France."]

# Compute all metrics at once
metrics = client.compute_metrics([candidate], [reference])
print(f"BLEU: {metrics['bleu'][0]:.3f}")
print(f"ROUGE-1: {metrics['rouge1_f1'][0]:.3f}")
print(f"METEOR: {metrics['meteor'][0]:.3f}")`,
    candidate: "Paris is the capital city of France.",
    reference: "Paris is the capital of France.",
    expectedResults: {
      bleu: 0.928,
      rouge1: 0.889,
      rougeL: 0.889,
      meteor: 0.945,
      wer: 0.111,
      safety_score: 0.98,
      pii_detected: false
    }
  },
  {
    id: "safety",
    title: "Safety & PII Detection",
    description: "Real-time content safety and privacy checks",
    code: `from blazemetrics import BlazeMetricsClient

client = BlazeMetricsClient(
    redact_pii=True,
    safety=True,
    blocklist=["confidential"]
)

# Check for safety issues and PII
text = "Contact John at john.doe@company.com for details"
safety_result = client.check_safety([text])

print(f"Safe: {safety_result[0]['safe']}")
print(f"PII found: {safety_result[0]['pii_found']}")
print(f"Redacted: {safety_result[0]['redacted_text']}")`,
    candidate: "Contact John at john.doe@company.com for details",
    reference: "Contact John at [EMAIL] for details",
    expectedResults: {
      bleu: 0.654,
      rouge1: 0.778,
      rougeL: 0.778,
      meteor: 0.712,
      wer: 0.222,
      safety_score: 0.85,
      pii_detected: true
    }
  },
  {
    id: "llm",
    title: "LLM Quality Assessment",
    description: "Evaluate LLM outputs with factuality scoring",
    code: `from blazemetrics import BlazeMetricsClient
from blazemetrics.llm_judge import OpenAIJudge

client = BlazeMetricsClient()
judge = OpenAIJudge(api_key="your-key")

# Evaluate LLM response quality
question = "What is the capital of France?"
response = "Paris is the capital of France, known for the Eiffel Tower."
reference = "Paris is the capital of France."

# Get comprehensive evaluation
metrics = client.compute_metrics([response], [reference])
factuality = judge.score_factuality(question, response)

print(f"Quality Score: {metrics['meteor'][0]:.3f}")
print(f"Factuality: {factuality:.3f}")`,
    candidate: "Paris is the capital of France, known for the Eiffel Tower.",
    reference: "Paris is the capital of France.",
    expectedResults: {
      bleu: 0.756,
      rouge1: 0.833,
      rougeL: 0.833,
      meteor: 0.889,
      wer: 0.167,
      safety_score: 0.99,
      pii_detected: false
    }
  }
]

export function InteractiveDemo() {
  const [activeExample, setActiveExample] = useState(demoExamples[0])
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<MetricResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [evaluationsCount, setEvaluationsCount] = useState(1247893)

  // Simulate real-time evaluation counter
  useEffect(() => {
    const interval = setInterval(() => {
      setEvaluationsCount(prev => prev + Math.floor(Math.random() * 50) + 10)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const runDemo = async () => {
    setIsRunning(true)
    setResults(null)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setResults(activeExample.expectedResults)
    setIsRunning(false)
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(activeExample.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Performance Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Badge variant="secondary" className="px-4 py-2 text-sm bg-blaze-gradient-soft">
          <Zap className="w-4 h-4 mr-2" />
          {evaluationsCount.toLocaleString()} evaluations processed today
        </Badge>
      </motion.div>

      {/* Demo Tabs */}
      <Tabs value={activeExample.id} onValueChange={(value) => {
        const example = demoExamples.find(ex => ex.id === value)
        if (example) {
          setActiveExample(example)
          setResults(null)
        }
      }}>
        <TabsList className="grid w-full grid-cols-3">
          {demoExamples.map((example) => (
            <TabsTrigger key={example.id} value={example.id} className="text-xs">
              {example.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {demoExamples.map((example) => (
          <TabsContent key={example.id} value={example.id} className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
              <p className="text-sm text-muted-foreground">{example.description}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {/* Code Editor */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Code Example</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyCode}
                    className="h-8 px-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="text-xs bg-muted/50 p-3 rounded-md overflow-x-auto">
                  <code>{example.code}</code>
                </pre>
                
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={runDemo}
                    disabled={isRunning}
                    className="bg-blaze-gradient hover:shadow-blaze-glow"
                  >
                    {isRunning ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                        />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Demo
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Results */}
              <Card className="p-4">
                <h4 className="text-sm font-medium mb-3">Live Results</h4>
                
                {!results && !isRunning && (
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Click "Run Demo" to see results</p>
                  </div>
                )}

                {isRunning && (
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 mx-auto mb-2 border-2 border-accent border-t-transparent rounded-full"
                    />
                    <p className="text-sm text-muted-foreground">Processing evaluation...</p>
                  </div>
                )}

                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span>BLEU:</span>
                        <span className="font-mono text-performance-excellent">{results.bleu.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROUGE-1:</span>
                        <span className="font-mono text-performance-excellent">{results.rouge1.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>METEOR:</span>
                        <span className="font-mono text-performance-excellent">{results.meteor.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>WER:</span>
                        <span className="font-mono text-performance-warning">{results.wer.toFixed(3)}</span>
                      </div>
                    </div>

                    <div className="border-t pt-3 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Shield className="w-4 h-4 mr-1 text-performance-excellent" />
                          Safety Score:
                        </span>
                        <span className="font-mono text-performance-excellent">{results.safety_score.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>PII Detected:</span>
                        <Badge variant={results.pii_detected ? "destructive" : "secondary"} className="text-xs">
                          {results.pii_detected ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                      ⚡ Processed in 0.23s • Rust-powered performance
                    </div>
                  </motion.div>
                )}
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}