import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Play, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Settings, 
  Zap, 
  Code2, 
  FileText,
  BarChart3,
  Shield,
  Brain,
  Gauge
} from "lucide-react"

interface PlaygroundExample {
  id: string
  title: string
  description: string
  complexity: 'beginner' | 'intermediate' | 'advanced'
  category: string
  code: string
  defaultCandidate: string
  defaultReference: string
  expectedOutput: any
  configurable: boolean
  parameters?: Record<string, any>
}

interface ExecutionResult {
  success: boolean
  metrics?: Record<string, number[]>
  aggregated?: Record<string, number>
  safety?: any[]
  factuality?: any[]
  analytics?: any
  error?: string
  executionTime?: number
}

const playgroundExamples: PlaygroundExample[] = [
  {
    id: "basic-metrics",
    title: "Basic Text Metrics",
    description: "Compute BLEU, ROUGE, METEOR, and other text quality metrics",
    complexity: "beginner",
    category: "Text Evaluation",
    code: `from blazemetrics import BlazeMetricsClient

# Initialize client
client = BlazeMetricsClient()

# Your model outputs and references
candidates = ["{candidate}"]
references = [["{reference}"]]

# Compute all metrics
metrics = client.compute_metrics(candidates, references)
aggregated = client.aggregate_metrics(metrics)

# Display results
for metric, value in aggregated.items():
    print(f"{metric.upper()}: {value:.3f}")`,
    defaultCandidate: "The quick brown fox jumps over the lazy dog.",
    defaultReference: "The fast brown fox jumps over the lazy dog.",
    expectedOutput: {
      bleu: 0.756,
      rouge1: 0.889,
      rougeL: 0.889,
      meteor: 0.912,
      wer: 0.111
    },
    configurable: true,
    parameters: {
      include_metrics: ["bleu", "rouge1", "rougeL", "meteor", "wer"],
      lowercase: true,
      stemming: false
    }
  },
  {
    id: "safety-guardrails",
    title: "Safety & PII Detection",
    description: "Real-time content safety checks and PII redaction",
    complexity: "beginner",
    category: "Safety",
    code: `from blazemetrics import BlazeMetricsClient

# Configure safety features
client = BlazeMetricsClient(
    redact_pii=True,
    blocklist=["confidential", "secret"],
    regexes=[r"\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b"]
)

# Check safety
text = "{candidate}"
safety_results = client.check_safety([text])

# Display safety analysis
result = safety_results[0]
print(f"Safe: {result['safe']}")
print(f"PII Detected: {result['pii_found']}")
print(f"Violations: {result['violations']}")
if result['redacted_text'] != text:
    print(f"Redacted: {result['redacted_text']}")`,
    defaultCandidate: "Contact John Doe at john.doe@company.com for confidential information.",
    defaultReference: "Contact [NAME] at [EMAIL] for information.",
    expectedOutput: {
      safe: false,
      pii_found: true,
      violations: ["confidential", "email"],
      redacted_text: "Contact [NAME] at [EMAIL] for [BLOCKED] information."
    },
    configurable: true,
    parameters: {
      redact_pii: true,
      blocklist: ["confidential", "secret"],
      case_insensitive: true
    }
  },
  {
    id: "llm-evaluation",
    title: "LLM Quality Assessment",
    description: "Comprehensive LLM output evaluation with factuality scoring",
    complexity: "intermediate",
    category: "LLM Evaluation",
    code: `from blazemetrics import BlazeMetricsClient
from blazemetrics.llm_judge import LLMJudge

# Initialize with LLM judge
client = BlazeMetricsClient(enable_analytics=True)
judge = LLMJudge(provider="openai", model="gpt-4o")

# Set up factuality scorer
client.set_factuality_scorer(judge.score_factuality)

# Evaluate LLM response
question = "What is the capital of France?"
response = "{candidate}"
reference = "{reference}"

# Comprehensive evaluation
metrics = client.compute_metrics([response], [[reference]])
factuality = client.evaluate_factuality([response], [reference])
aggregated = client.aggregate_metrics(metrics)

# Results
print("=== Text Quality Metrics ===")
for metric, value in aggregated.items():
    print(f"{metric.upper()}: {value:.3f}")

print("\\n=== Factuality Analysis ===")
fact_result = factuality[0]
print(f"Factuality Score: {fact_result['factuality']:.3f}")
print(f"Hallucination Risk: {fact_result['hallucination']:.3f}")`,
    defaultCandidate: "Paris is the capital of France and the largest city in Europe.",
    defaultReference: "Paris is the capital of France.",
    expectedOutput: {
      bleu: 0.654,
      rouge1: 0.778,
      meteor: 0.823,
      factuality: 0.85,
      hallucination: 0.15
    },
    configurable: true,
    parameters: {
      llm_provider: "openai",
      model: "gpt-4o",
      enable_analytics: true
    }
  },
  {
    id: "rag-evaluation",
    title: "RAG System Quality",
    description: "End-to-end RAG pipeline evaluation with retrieval scoring",
    complexity: "advanced",
    category: "RAG Systems",
    code: `from blazemetrics import BlazeMetricsClient
from blazemetrics.rag import RAGEvaluator

# Initialize RAG evaluator
client = BlazeMetricsClient()
rag_evaluator = RAGEvaluator()

# RAG components
query = "What is machine learning?"
retrieved_docs = [
    "Machine learning is a subset of AI that enables computers to learn.",
    "ML algorithms can identify patterns in data automatically."
]
generated_response = "{candidate}"
reference_answer = "{reference}"

# Evaluate RAG pipeline
rag_metrics = rag_evaluator.evaluate_rag(
    query=query,
    retrieved_docs=retrieved_docs,
    generated_response=generated_response,
    reference_answer=reference_answer
)

# Text quality metrics
text_metrics = client.compute_metrics([generated_response], [[reference_answer]])
aggregated = client.aggregate_metrics(text_metrics)

# Combined results
print("=== RAG-Specific Metrics ===")
print(f"Retrieval Relevance: {rag_metrics['retrieval_relevance']:.3f}")
print(f"Answer Faithfulness: {rag_metrics['answer_faithfulness']:.3f}")
print(f"Context Utilization: {rag_metrics['context_utilization']:.3f}")

print("\\n=== Text Quality Metrics ===")
for metric, value in aggregated.items():
    print(f"{metric.upper()}: {value:.3f}")`,
    defaultCandidate: "Machine learning is a powerful subset of artificial intelligence that allows computers to learn and improve from data without being explicitly programmed.",
    defaultReference: "Machine learning is a subset of AI that enables computers to learn from data.",
    expectedOutput: {
      retrieval_relevance: 0.89,
      answer_faithfulness: 0.92,
      context_utilization: 0.78,
      bleu: 0.432,
      rouge1: 0.667,
      meteor: 0.756
    },
    configurable: true,
    parameters: {
      retrieval_k: 5,
      similarity_threshold: 0.7,
      faithfulness_model: "gpt-4o"
    }
  }
]

export function CodePlayground() {
  const [activeExample, setActiveExample] = useState(playgroundExamples[0])
  const [candidate, setCandidate] = useState(activeExample.defaultCandidate)
  const [reference, setReference] = useState(activeExample.defaultReference)
  const [isExecuting, setIsExecuting] = useState(false)
  const [results, setResults] = useState<ExecutionResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [complexity, setComplexity] = useState<string>("all")
  const [category, setCategory] = useState<string>("all")
  const [parameters, setParameters] = useState<Record<string, any>>({})
  
  const codeRef = useRef<HTMLTextAreaElement>(null)

  // Update inputs when example changes
  useEffect(() => {
    setCandidate(activeExample.defaultCandidate)
    setReference(activeExample.defaultReference)
    setParameters(activeExample.parameters || {})
    setResults(null)
  }, [activeExample])

  // Filter examples
  const filteredExamples = playgroundExamples.filter(example => {
    const complexityMatch = complexity === "all" || example.complexity === complexity
    const categoryMatch = category === "all" || example.category === category
    return complexityMatch && categoryMatch
  })

  const executeCode = async () => {
    setIsExecuting(true)
    setResults(null)

    try {
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful execution with expected output
      const mockResult: ExecutionResult = {
        success: true,
        metrics: Object.keys(activeExample.expectedOutput).reduce((acc, key) => {
          if (typeof activeExample.expectedOutput[key] === 'number') {
            acc[key] = [activeExample.expectedOutput[key]]
          }
          return acc
        }, {} as Record<string, number[]>),
        aggregated: activeExample.expectedOutput,
        executionTime: Math.random() * 500 + 200
      }

      setResults(mockResult)
    } catch (error) {
      setResults({
        success: false,
        error: "Execution failed. Please check your code and try again."
      })
    } finally {
      setIsExecuting(false)
    }
  }

  const copyCode = async () => {
    const finalCode = activeExample.code
      .replace("{candidate}", candidate)
      .replace("{reference}", reference)
    
    await navigator.clipboard.writeText(finalCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareConfiguration = async () => {
    const config = {
      example: activeExample.id,
      candidate,
      reference,
      parameters
    }
    
    // In a real implementation, this would create a shareable URL
    const encoded = btoa(JSON.stringify(config))
    const url = `${window.location.origin}/playground?config=${encoded}`
    
    await navigator.clipboard.writeText(url)
    setShareUrl(url)
    setTimeout(() => setShareUrl(""), 3000)
  }

  const downloadCode = () => {
    const finalCode = activeExample.code
      .replace("{candidate}", candidate)
      .replace("{reference}", reference)
    
    const blob = new Blob([finalCode], { type: 'text/python' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `blazemetrics_${activeExample.id}.py`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Interactive Code Playground</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experiment with BlazeMetrics in real-time. Modify examples, adjust parameters, 
            and see results instantly with our Rust-powered evaluation engine.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          <Select value={complexity} onValueChange={setComplexity}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Complexity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Text Evaluation">Text Evaluation</SelectItem>
              <SelectItem value="Safety">Safety</SelectItem>
              <SelectItem value="LLM Evaluation">LLM Evaluation</SelectItem>
              <SelectItem value="RAG Systems">RAG Systems</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Example Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Choose Example
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredExamples.map((example) => (
              <motion.div
                key={example.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    activeExample.id === example.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setActiveExample(example)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">{example.title}</h3>
                        <Badge className={`text-xs ${getComplexityColor(example.complexity)}`}>
                          {example.complexity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {example.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {example.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Playground */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {activeExample.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={copyCode}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="outline" onClick={shareConfiguration}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={downloadCode}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Input Configuration */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="candidate">Model Output (Candidate)</Label>
                <Textarea
                  id="candidate"
                  value={candidate}
                  onChange={(e) => setCandidate(e.target.value)}
                  className="mt-1 font-mono text-sm"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="reference">Reference/Ground Truth</Label>
                <Textarea
                  id="reference"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="mt-1 font-mono text-sm"
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            {/* Code Display */}
            <div>
              <Label>Generated Code</Label>
              <pre className="mt-2 p-4 bg-muted/50 rounded-md text-xs overflow-x-auto border">
                <code>
                  {activeExample.code
                    .replace("{candidate}", candidate)
                    .replace("{reference}", reference)}
                </code>
              </pre>
            </div>

            {/* Execute Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={executeCode}
                disabled={isExecuting}
                className="bg-blaze-gradient hover:shadow-blaze-glow"
                size="lg"
              >
                {isExecuting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                    />
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Code
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Execution Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {!results && !isExecuting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 text-muted-foreground"
                >
                  <Gauge className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Click "Run Code" to see results</p>
                </motion.div>
              )}

              {isExecuting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full"
                  />
                  <p className="text-muted-foreground">Processing evaluation...</p>
                </motion.div>
              )}

              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {results.success ? (
                    <>
                      {/* Metrics Results */}
                      {results.aggregated && (
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Evaluation Metrics
                          </h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            {Object.entries(results.aggregated).map(([metric, value]) => (
                              <div key={metric} className="flex justify-between p-2 bg-muted/30 rounded">
                                <span className="capitalize">{metric.replace('_', ' ')}:</span>
                                <span className="font-mono font-medium">
                                  {typeof value === 'number' ? value.toFixed(3) : value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Performance Info */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
                        <span>⚡ Rust-powered execution</span>
                        <span>Completed in {results.executionTime?.toFixed(0)}ms</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-destructive">
                      <p className="font-medium">Execution Error</p>
                      <p className="text-sm mt-2">{results.error}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Share URL Display */}
      <AnimatePresence>
        {shareUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <Badge variant="secondary" className="px-4 py-2">
              <Check className="w-4 h-4 mr-2" />
              Shareable URL copied to clipboard!
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}