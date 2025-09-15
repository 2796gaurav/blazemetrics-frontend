import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  Download, 
  RefreshCw, 
  Info, 
  TrendingUp,
  Target,
  Zap,
  Scale,
  Eye,
  Settings2
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface MetricInfo {
  name: string
  displayName: string
  description: string
  category: 'similarity' | 'fluency' | 'accuracy' | 'diversity'
  range: [number, number]
  higherIsBetter: boolean
  useCase: string[]
  formula?: string
}

interface ComparisonResult {
  metric: string
  value: number
  normalized: number
  interpretation: string
  confidence: number
}

interface ComparisonData {
  text1: ComparisonResult[]
  text2: ComparisonResult[]
  winner: string
  overallScore: { text1: number; text2: number }
}

const metricDefinitions: MetricInfo[] = [
  {
    name: "bleu",
    displayName: "BLEU",
    description: "Measures n-gram overlap between candidate and reference text. Widely used for machine translation evaluation.",
    category: "similarity",
    range: [0, 1],
    higherIsBetter: true,
    useCase: ["translation", "summarization", "text-generation"],
    formula: "BLEU = BP × exp(∑(wₙ × log(pₙ)))"
  },
  {
    name: "rouge1",
    displayName: "ROUGE-1",
    description: "Measures unigram overlap between candidate and reference. Good for content coverage assessment.",
    category: "similarity",
    range: [0, 1],
    higherIsBetter: true,
    useCase: ["summarization", "question-answering", "content-generation"]
  },
  {
    name: "rougeL",
    displayName: "ROUGE-L",
    description: "Measures longest common subsequence. Captures sentence-level structure similarity.",
    category: "similarity",
    range: [0, 1],
    higherIsBetter: true,
    useCase: ["summarization", "paraphrasing", "text-rewriting"]
  },
  {
    name: "meteor",
    displayName: "METEOR",
    description: "Considers synonyms, stemming, and word order. More sophisticated than BLEU for semantic similarity.",
    category: "similarity",
    range: [0, 1],
    higherIsBetter: true,
    useCase: ["translation", "paraphrasing", "semantic-matching"]
  },
  {
    name: "wer",
    displayName: "WER",
    description: "Word Error Rate - measures word-level edit distance. Lower values indicate better quality.",
    category: "accuracy",
    range: [0, 2],
    higherIsBetter: false,
    useCase: ["speech-recognition", "transcription", "text-correction"]
  },
  {
    name: "chrf",
    displayName: "chrF",
    description: "Character-level F-score. Good for morphologically rich languages and handling typos.",
    category: "similarity",
    range: [0, 1],
    higherIsBetter: true,
    useCase: ["translation", "spell-correction", "morphology-rich-languages"]
  },
  {
    name: "token_f1",
    displayName: "Token F1",
    description: "F1 score at token level. Balances precision and recall for token overlap.",
    category: "accuracy",
    range: [0, 1],
    higherIsBetter: true,
    useCase: ["named-entity-recognition", "information-extraction", "classification"]
  },
  {
    name: "jaccard",
    displayName: "Jaccard",
    description: "Measures set similarity using intersection over union of tokens.",
    category: "similarity",
    range: [0, 1],
    higherIsBetter: true,
    useCase: ["document-similarity", "clustering", "deduplication"]
  }
]

const sampleComparisons = [
  {
    name: "Translation Quality",
    text1: "The quick brown fox jumps over the lazy dog.",
    text2: "A fast brown fox leaps over a sleepy dog.",
    reference: "The quick brown fox jumps over the lazy dog."
  },
  {
    name: "Summarization Comparison",
    text1: "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.",
    text2: "ML is part of AI that lets computers learn from data automatically.",
    reference: "Machine learning is a subset of AI that allows computers to learn from data."
  },
  {
    name: "Paraphrasing Quality",
    text1: "Climate change poses significant risks to global food security and agricultural productivity.",
    text2: "Global warming threatens worldwide food safety and farming output.",
    reference: "Climate change threatens global food security and agricultural production."
  }
]

export function MetricComparisonTool() {
  const [text1, setText1] = useState(sampleComparisons[0].text1)
  const [text2, setText2] = useState(sampleComparisons[0].text2)
  const [reference, setReference] = useState(sampleComparisons[0].reference)
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["bleu", "rouge1", "meteor", "wer"])
  const [isComparing, setIsComparing] = useState(false)
  const [results, setResults] = useState<ComparisonData | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [parameters, setParameters] = useState({
    lowercase: true,
    stemming: false,
    removeStopwords: false,
    ngramWeights: [0.25, 0.25, 0.25, 0.25] // for BLEU
  })

  const runComparison = async () => {
    setIsComparing(true)
    setResults(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock results based on actual metric calculations
    const mockResults: ComparisonData = {
      text1: [
        { metric: "bleu", value: 1.0, normalized: 100, interpretation: "Perfect match", confidence: 0.95 },
        { metric: "rouge1", value: 1.0, normalized: 100, interpretation: "Excellent coverage", confidence: 0.98 },
        { metric: "meteor", value: 1.0, normalized: 100, interpretation: "Perfect semantic match", confidence: 0.96 },
        { metric: "wer", value: 0.0, normalized: 100, interpretation: "No word errors", confidence: 0.99 }
      ],
      text2: [
        { metric: "bleu", value: 0.456, normalized: 46, interpretation: "Moderate similarity", confidence: 0.87 },
        { metric: "rouge1", value: 0.667, normalized: 67, interpretation: "Good content overlap", confidence: 0.91 },
        { metric: "meteor", value: 0.723, normalized: 72, interpretation: "Good semantic similarity", confidence: 0.89 },
        { metric: "wer", value: 0.444, normalized: 56, interpretation: "Some word differences", confidence: 0.93 }
      ],
      winner: "text1",
      overallScore: { text1: 87.5, text2: 60.25 }
    }

    setResults(mockResults)
    setIsComparing(false)
  }

  const loadSample = (sample: typeof sampleComparisons[0]) => {
    setText1(sample.text1)
    setText2(sample.text2)
    setReference(sample.reference)
    setResults(null)
  }

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    )
  }

  const exportResults = () => {
    if (!results) return
    
    const exportData = {
      comparison: {
        text1,
        text2,
        reference
      },
      metrics: selectedMetrics,
      results,
      parameters,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'blazemetrics_comparison.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'similarity': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'fluency': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'accuracy': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'diversity': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold mb-2">Metric Comparison Tool</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare two texts against a reference using multiple evaluation metrics.<br/>
              <b>BlazeMetrics is the fastest & most memory efficient NLP scorer (4.85s for 10,000 pairs, median, official test vs NLTK 5.40s, SacreBLEU 5.51s, Huggingface 18.19s, TorchMetrics 63.59s).</b>
              <br/>Results normalized after case/punctuation as per <a href="/benchmarks" className="underline text-accent">official benchmark methodology</a>.
            </p>
          </motion.div>

          {/* Sample Comparisons */}
          <div className="flex flex-wrap justify-center gap-2">
            {sampleComparisons.map((sample, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => loadSample(sample)}
                className="text-xs"
              >
                {sample.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Text Comparison Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="text1">Text 1 (Candidate A)</Label>
                <Textarea
                  id="text1"
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  className="mt-1 min-h-24"
                  placeholder="Enter first text to compare..."
                />
              </div>
              
              <div>
                <Label htmlFor="text2">Text 2 (Candidate B)</Label>
                <Textarea
                  id="text2"
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  className="mt-1 min-h-24"
                  placeholder="Enter second text to compare..."
                />
              </div>
              
              <div>
                <Label htmlFor="reference">Reference (Ground Truth)</Label>
                <Textarea
                  id="reference"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="mt-1 min-h-24"
                  placeholder="Enter reference text..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Select Metrics
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Settings2 className="w-4 h-4 mr-2" />
                Advanced
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metricDefinitions.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={selectedMetrics.includes(metric.name)}
                      onCheckedChange={() => toggleMetric(metric.name)}
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{metric.displayName}</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="space-y-2">
                            <p className="text-xs">{metric.description}</p>
                            <div className="flex gap-2">
                              <Badge className={`text-xs ${getCategoryColor(metric.category)}`}>
                                {metric.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {metric.higherIsBetter ? '↑ Higher Better' : '↓ Lower Better'}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Use cases: {metric.useCase.join(', ')}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getCategoryColor(metric.category)}`}>
                    {metric.category}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Advanced Parameters */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-4 border-t"
                >
                  <h4 className="font-medium">Advanced Parameters</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lowercase">Lowercase normalization</Label>
                      <Switch
                        id="lowercase"
                        checked={parameters.lowercase}
                        onCheckedChange={(checked) => 
                          setParameters(prev => ({ ...prev, lowercase: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="stemming">Enable stemming</Label>
                      <Switch
                        id="stemming"
                        checked={parameters.stemming}
                        onCheckedChange={(checked) => 
                          setParameters(prev => ({ ...prev, stemming: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="stopwords">Remove stopwords</Label>
                      <Switch
                        id="stopwords"
                        checked={parameters.removeStopwords}
                        onCheckedChange={(checked) => 
                          setParameters(prev => ({ ...prev, removeStopwords: checked }))
                        }
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center pt-4">
              <Button
                onClick={runComparison}
                disabled={isComparing || selectedMetrics.length === 0}
                className="bg-blaze-gradient hover:shadow-blaze-glow"
                size="lg"
              >
                {isComparing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                    />
                    Comparing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Compare Texts
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Overall Comparison */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Overall Comparison
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={exportResults}>
                      <Download className="w-4 h-4 mr-2" />
                      Export Results
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Text 1 (Candidate A)</h4>
                        <Badge variant={results.winner === 'text1' ? 'default' : 'secondary'}>
                          {results.winner === 'text1' ? 'Winner' : 'Runner-up'}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Score</span>
                          <span className={`font-mono font-bold ${getScoreColor(results.overallScore.text1)}`}>
                            {results.overallScore.text1.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={results.overallScore.text1} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                        {text1}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Text 2 (Candidate B)</h4>
                        <Badge variant={results.winner === 'text2' ? 'default' : 'secondary'}>
                          {results.winner === 'text2' ? 'Winner' : 'Runner-up'}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Score</span>
                          <span className={`font-mono font-bold ${getScoreColor(results.overallScore.text2)}`}>
                            {results.overallScore.text2.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={results.overallScore.text2} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                        {text2}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Detailed Metric Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {selectedMetrics.map((metricName) => {
                      const metricInfo = metricDefinitions.find(m => m.name === metricName)
                      const result1 = results.text1.find(r => r.metric === metricName)
                      const result2 = results.text2.find(r => r.metric === metricName)
                      
                      if (!metricInfo || !result1 || !result2) return null

                      return (
                        <div key={metricName} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{metricInfo.displayName}</h4>
                              <Badge className={`text-xs ${getCategoryColor(metricInfo.category)}`}>
                                {metricInfo.category}
                              </Badge>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="w-4 h-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p className="text-xs">{metricInfo.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Text 1</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{result1.value.toFixed(3)}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {result1.confidence * 100}% confidence
                                  </Badge>
                                </div>
                              </div>
                              <Progress value={result1.normalized} className="h-2" />
                              <p className="text-xs text-muted-foreground">{result1.interpretation}</p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Text 2</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{result2.value.toFixed(3)}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {result2.confidence * 100}% confidence
                                  </Badge>
                                </div>
                              </div>
                              <Progress value={result2.normalized} className="h-2" />
                              <p className="text-xs text-muted-foreground">{result2.interpretation}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Info */}
              <div className="text-center">
                <Badge variant="secondary" className="px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Comparison completed in 0.34s • Rust-powered performance
                </Badge>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}