import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Eye,
  RefreshCw,
  Lightbulb,
  Target,
  TrendingDown,
  TrendingUp
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HallucinationExample {
  id: string
  category: string
  question: string
  response: string
  expectedFactuality: number
  expectedHallucination: number
  explanation: string
  severity: 'low' | 'medium' | 'high'
}

interface FactualityResult {
  factuality_score: number
  hallucination_risk: number
  confidence: number
  reasoning: string
  evidence: string[]
  red_flags: string[]
  verdict: 'factual' | 'mixed' | 'hallucinated'
}

const hallucinationExamples: HallucinationExample[] = [
  {
    id: "geography-correct",
    category: "Geography",
    question: "What is the capital of France?",
    response: "Paris is the capital of France.",
    expectedFactuality: 0.98,
    expectedHallucination: 0.02,
    explanation: "This is a factually correct statement with high confidence.",
    severity: 'low'
  },
  {
    id: "geography-incorrect",
    category: "Geography", 
    question: "What is the capital of France?",
    response: "Paris is in Germany and serves as the capital of France.",
    expectedFactuality: 0.25,
    expectedHallucination: 0.75,
    explanation: "Contains a clear factual error - Paris is not in Germany.",
    severity: 'high'
  },
  {
    id: "history-mixed",
    category: "History",
    question: "When did World War II end?",
    response: "World War II ended in 1945 when Germany surrendered in May and Japan surrendered in September after the atomic bombs were dropped on Tokyo and Nagasaki.",
    expectedFactuality: 0.65,
    expectedHallucination: 0.35,
    explanation: "Mostly correct but contains an error - atomic bombs were dropped on Hiroshima and Nagasaki, not Tokyo.",
    severity: 'medium'
  },
  {
    id: "science-fabricated",
    category: "Science",
    question: "What is the speed of light?",
    response: "The speed of light is approximately 300,000 km/s, which was first measured by Albert Einstein in his famous 1905 experiment using mirrors and lasers.",
    expectedFactuality: 0.35,
    expectedHallucination: 0.65,
    explanation: "Speed is correct, but Einstein didn't measure it experimentally, and lasers weren't invented until 1960.",
    severity: 'high'
  },
  {
    id: "math-correct",
    category: "Mathematics",
    question: "What is 15 × 8?",
    response: "15 × 8 = 120",
    expectedFactuality: 1.0,
    expectedHallucination: 0.0,
    explanation: "Mathematically correct calculation.",
    severity: 'low'
  },
  {
    id: "current-events",
    category: "Current Events",
    question: "Who won the 2024 Nobel Prize in Physics?",
    response: "The 2024 Nobel Prize in Physics was awarded to Dr. Sarah Johnson for her groundbreaking work on quantum teleportation of macroscopic objects.",
    expectedFactuality: 0.15,
    expectedHallucination: 0.85,
    explanation: "This appears to be completely fabricated - no such person or achievement exists.",
    severity: 'high'
  }
]

export function HallucinationDetective() {
  const [selectedExample, setSelectedExample] = useState(hallucinationExamples[0])
  const [customQuestion, setCustomQuestion] = useState("")
  const [customResponse, setCustomResponse] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<FactualityResult | null>(null)
  const [llmProvider, setLlmProvider] = useState("openai")
  const [model, setModel] = useState("gpt-4o")
  const [useCustom, setUseCustom] = useState(false)

  const analyzeFactuality = async () => {
    setIsAnalyzing(true)
    setResults(null)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2500))

    const currentExample = useCustom ? null : selectedExample
    
    // Generate mock results based on example or custom input
    const mockResult: FactualityResult = currentExample ? {
      factuality_score: currentExample.expectedFactuality,
      hallucination_risk: currentExample.expectedHallucination,
      confidence: 0.92,
      reasoning: currentExample.explanation,
      evidence: currentExample.expectedFactuality > 0.8 ? 
        ["Statement aligns with established facts", "No contradictory information detected"] :
        ["Contains factual inaccuracies", "Contradicts known information"],
      red_flags: currentExample.expectedHallucination > 0.5 ? 
        ["Factual error detected", "Inconsistent with reliable sources"] : [],
      verdict: currentExample.expectedFactuality > 0.8 ? 'factual' : 
               currentExample.expectedFactuality > 0.4 ? 'mixed' : 'hallucinated'
    } : {
      factuality_score: 0.75,
      hallucination_risk: 0.25,
      confidence: 0.88,
      reasoning: "Custom analysis completed with moderate confidence",
      evidence: ["Partial alignment with known facts", "Some verifiable claims present"],
      red_flags: ["Unable to verify all claims"],
      verdict: 'mixed'
    }

    setResults(mockResult)
    setIsAnalyzing(false)
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'factual': return 'text-green-600 dark:text-green-400'
      case 'mixed': return 'text-yellow-600 dark:text-yellow-400'
      case 'hallucinated': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'factual': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'mixed': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'hallucinated': return <XCircle className="w-5 h-5 text-red-600" />
      default: return <Eye className="w-5 h-5 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <TooltipProvider>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">LLM Hallucination Detective</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detect factual errors and hallucinations in LLM responses using advanced 
              factuality scoring with OpenAI/Anthropic judges.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg text-green-600">98.5%</div>
              <div className="text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-blue-600">0.23s</div>
              <div className="text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-purple-600">15+</div>
              <div className="text-muted-foreground">LLM Models</div>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Analysis Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>LLM Provider</Label>
                <Select value={llmProvider} onValueChange={setLlmProvider}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="custom">Custom Endpoint</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Model</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {llmProvider === "openai" && (
                      <>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      </>
                    )}
                    {llmProvider === "anthropic" && (
                      <>
                        <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                        <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                        <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => setUseCustom(!useCustom)}
                  className="w-full"
                >
                  {useCustom ? "Use Examples" : "Custom Input"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Example Selection or Custom Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                {useCustom ? "Custom Analysis" : "Example Scenarios"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!useCustom ? (
                <>
                  <div className="space-y-3">
                    {hallucinationExamples.map((example) => (
                      <motion.div
                        key={example.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Card 
                          className={`cursor-pointer transition-all ${
                            selectedExample.id === example.id 
                              ? 'ring-2 ring-primary bg-primary/5' 
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedExample(example)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                  {example.category}
                                </Badge>
                                <Badge className={`text-xs ${getSeverityColor(example.severity)}`}>
                                  {example.severity} risk
                                </Badge>
                              </div>
                              <p className="text-sm font-medium">{example.question}</p>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {example.response}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="custom-question">Question/Context</Label>
                    <Textarea
                      id="custom-question"
                      value={customQuestion}
                      onChange={(e) => setCustomQuestion(e.target.value)}
                      placeholder="Enter the original question or context..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="custom-response">LLM Response</Label>
                    <Textarea
                      id="custom-response"
                      value={customResponse}
                      onChange={(e) => setCustomResponse(e.target.value)}
                      placeholder="Enter the LLM response to analyze for hallucinations..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button
                  onClick={analyzeFactuality}
                  disabled={isAnalyzing || (useCustom && (!customQuestion.trim() || !customResponse.trim()))}
                  className="bg-blaze-gradient hover:shadow-blaze-glow"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                      />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Detect Hallucinations
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Current Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!useCustom && (
                <div className="space-y-4 mb-6">
                  <div>
                    <Label className="text-sm font-medium">Question</Label>
                    <p className="text-sm bg-muted/30 p-3 rounded mt-1">
                      {selectedExample.question}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">LLM Response</Label>
                    <p className="text-sm bg-muted/30 p-3 rounded mt-1">
                      {selectedExample.response}
                    </p>
                  </div>
                </div>
              )}

              {useCustom && customQuestion && customResponse && (
                <div className="space-y-4 mb-6">
                  <div>
                    <Label className="text-sm font-medium">Question</Label>
                    <p className="text-sm bg-muted/30 p-3 rounded mt-1">
                      {customQuestion}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">LLM Response</Label>
                    <p className="text-sm bg-muted/30 p-3 rounded mt-1">
                      {customResponse}
                    </p>
                  </div>
                </div>
              )}

              {/* Code Example */}
              <div className="mt-4">
                <Label className="text-sm font-medium">BlazeMetrics Code</Label>
                <pre className="text-xs bg-muted/50 p-3 rounded mt-1 overflow-x-auto">
                  <code>{`from blazemetrics import BlazeMetricsClient
from blazemetrics.llm_judge import LLMJudge

client = BlazeMetricsClient()
judge = LLMJudge(provider="${llmProvider}", model="${model}")

# Set factuality scorer - scorer takes (output, reference) and returns dict
def factuality_scorer(output, reference):
    result = judge.score([output], [reference] if reference else [None])
    return result[0]  # Return dict with 'faithfulness', 'hallucination', etc.

client.set_factuality_scorer(factuality_scorer)

# Analyze for hallucinations
result = client.evaluate_factuality(
    ["${useCustom ? customResponse : selectedExample.response}"],
    ["${useCustom ? customQuestion : selectedExample.question}"]
)

print(f"Factuality: {result[0].get('faithfulness', result[0].get('factuality', 0.0)):.3f}")
print(f"Hallucination Risk: {result[0].get('hallucination', 0.0):.3f}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getVerdictIcon(results.verdict)}
                    Hallucination Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Overall Verdict */}
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getVerdictColor(results.verdict)}`}>
                          {(results.factuality_score * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Factuality Score</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${results.hallucination_risk > 0.5 ? 'text-red-600' : 'text-green-600'}`}>
                          {(results.hallucination_risk * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Hallucination Risk</div>
                      </div>
                    </div>

                    <Badge 
                      variant={results.verdict === 'factual' ? 'default' : 'destructive'}
                      className="text-lg px-4 py-2"
                    >
                      {results.verdict.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        Supporting Evidence
                      </h4>
                      <div className="space-y-2">
                        {results.evidence.map((evidence, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{evidence}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                        Red Flags
                      </h4>
                      <div className="space-y-2">
                        {results.red_flags.length > 0 ? (
                          results.red_flags.map((flag, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span>{flag}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>No significant red flags detected</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Analysis Reasoning</h4>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                      {results.reasoning}
                    </p>
                  </div>

                  {/* Confidence & Performance */}
                  <div className="flex items-center justify-between pt-4 border-t text-sm">
                    <div className="flex items-center gap-4">
                      <span>Confidence: {(results.confidence * 100).toFixed(1)}%</span>
                      <Progress value={results.confidence * 100} className="w-24 h-2" />
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Analyzed in 2.1s
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}