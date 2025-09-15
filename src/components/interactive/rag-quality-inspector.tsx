import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  Search, 
  FileText, 
  Link, 
  CheckCircle, 
  AlertCircle,
  Zap, 
  Database,
  Target,
  TrendingUp,
  Eye,
  RefreshCw,
  Download
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Document {
  id: string
  title: string
  content: string
  metadata: {
    source: string
    category: string
    relevance_score?: number
    reranked_score?: number
  }
}

interface RAGResult {
  query: string
  retrieved_docs: Document[]
  generated_response: string
  reference_answer: string
  metrics: {
    retrieval_relevance: number
    answer_faithfulness: number
    context_utilization: number
    citation_accuracy: number
    semantic_similarity: number
  }
  provenance: {
    cited_sources: string[]
    citation_coverage: number
    source_attribution: { source: string; confidence: number }[]
  }
  quality_scores: {
    overall: number
    retrieval: number
    generation: number
    faithfulness: number
  }
}

const sampleDocuments: Document[] = [
  {
    id: "doc1",
    title: "Machine Learning Fundamentals",
    content: "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to identify patterns in data.",
    metadata: {
      source: "AI Textbook Chapter 3",
      category: "Education"
    }
  },
  {
    id: "doc2", 
    title: "Deep Learning Overview",
    content: "Deep learning is a specialized subset of machine learning that uses neural networks with multiple layers to model and understand complex patterns in data. It's particularly effective for image and speech recognition.",
    metadata: {
      source: "Research Paper 2023",
      category: "Research"
    }
  },
  {
    id: "doc3",
    title: "AI Applications in Healthcare",
    content: "Artificial intelligence applications in healthcare include diagnostic imaging, drug discovery, personalized treatment plans, and predictive analytics for patient outcomes.",
    metadata: {
      source: "Medical Journal",
      category: "Healthcare"
    }
  },
  {
    id: "doc4",
    title: "Natural Language Processing",
    content: "Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret and manipulate human language. It combines computational linguistics with machine learning.",
    metadata: {
      source: "NLP Handbook",
      category: "Technology"
    }
  },
  {
    id: "doc5",
    title: "Computer Vision Basics",
    content: "Computer vision is a field of AI that trains computers to interpret and understand visual information from the world. It uses deep learning models to identify objects, faces, and scenes in images.",
    metadata: {
      source: "Vision Systems Guide",
      category: "Technology"
    }
  }
]

const sampleQueries = [
  {
    query: "What is machine learning?",
    expected_docs: ["doc1", "doc2"],
    reference: "Machine learning is a subset of AI that allows computers to learn from data without explicit programming."
  },
  {
    query: "How is AI used in healthcare?",
    expected_docs: ["doc3"],
    reference: "AI is used in healthcare for diagnostic imaging, drug discovery, and personalized treatment."
  },
  {
    query: "What is the difference between machine learning and deep learning?",
    expected_docs: ["doc1", "doc2"],
    reference: "Deep learning is a specialized subset of machine learning that uses neural networks with multiple layers."
  }
]

export function RAGQualityInspector() {
  const [query, setQuery] = useState(sampleQueries[0].query)
  const [customResponse, setCustomResponse] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<RAGResult | null>(null)
  const [selectedDocs, setSelectedDocs] = useState<Document[]>([])
  const [topK, setTopK] = useState(3)
  const [useCustomResponse, setUseCustomResponse] = useState(false)

  const runRAGEvaluation = async () => {
    setIsAnalyzing(true)
    setResults(null)

    // Simulate retrieval and analysis
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Mock retrieval based on query
    const currentQuery = sampleQueries.find(q => q.query === query) || sampleQueries[0]
    const retrievedDocs = sampleDocuments
      .filter(doc => currentQuery.expected_docs.includes(doc.id))
      .slice(0, topK)
      .map(doc => ({
        ...doc,
        metadata: {
          ...doc.metadata,
          relevance_score: Math.random() * 0.3 + 0.7, // 0.7-1.0
          reranked_score: Math.random() * 0.2 + 0.8    // 0.8-1.0
        }
      }))

    // Generate mock response if not custom
    const generatedResponse = useCustomResponse ? customResponse : 
      `Based on the retrieved documents, ${currentQuery.reference} This information comes from multiple authoritative sources in our knowledge base.`

    const mockResult: RAGResult = {
      query,
      retrieved_docs: retrievedDocs,
      generated_response: generatedResponse,
      reference_answer: currentQuery.reference,
      metrics: {
        retrieval_relevance: 0.89,
        answer_faithfulness: 0.92,
        context_utilization: 0.78,
        citation_accuracy: 0.85,
        semantic_similarity: 0.87
      },
      provenance: {
        cited_sources: retrievedDocs.map(doc => doc.metadata.source),
        citation_coverage: 0.83,
        source_attribution: retrievedDocs.map(doc => ({
          source: doc.metadata.source,
          confidence: doc.metadata.reranked_score || 0.8
        }))
      },
      quality_scores: {
        overall: 0.86,
        retrieval: 0.89,
        generation: 0.84,
        faithfulness: 0.92
      }
    }

    setResults(mockResult)
    setSelectedDocs(retrievedDocs)
    setIsAnalyzing(false)
  }

  const loadSampleQuery = (sample: typeof sampleQueries[0]) => {
    setQuery(sample.query)
    setResults(null)
    setSelectedDocs([])
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 dark:text-green-400'
    if (score >= 0.6) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  const exportResults = () => {
    if (!results) return
    
    const exportData = {
      evaluation: results,
      timestamp: new Date().toISOString(),
      configuration: { topK, useCustomResponse }
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rag_evaluation_results.json'
    a.click()
    URL.revokeObjectURL(url)
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
            <div className="flex items-center justify-center gap-3 mb-4">
              <Database className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">RAG System Quality Inspector</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Evaluate your RAG pipeline end-to-end: retrieval quality, answer faithfulness, 
              context utilization, and citation accuracy with provenance tracking.
            </p>
          </motion.div>

          {/* Sample Queries */}
          <div className="flex flex-wrap justify-center gap-2">
            {sampleQueries.map((sample, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => loadSampleQuery(sample)}
                className="text-xs"
              >
                {sample.query}
              </Button>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              RAG Pipeline Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="query">Search Query</Label>
                <Input
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your question..."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="topk">Top-K Documents</Label>
                <Input
                  id="topk"
                  type="number"
                  value={topK}
                  onChange={(e) => setTopK(parseInt(e.target.value) || 3)}
                  min="1"
                  max="10"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUseCustomResponse(!useCustomResponse)}
              >
                {useCustomResponse ? "Use Generated Response" : "Custom Response"}
              </Button>
            </div>

            {useCustomResponse && (
              <div>
                <Label htmlFor="custom-response">Custom Generated Response</Label>
                <Textarea
                  id="custom-response"
                  value={customResponse}
                  onChange={(e) => setCustomResponse(e.target.value)}
                  placeholder="Enter the RAG system's generated response..."
                  className="mt-1"
                  rows={4}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Document Corpus Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Knowledge Base ({sampleDocuments.length} documents)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
              {sampleDocuments.map((doc) => (
                <Card key={doc.id} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium line-clamp-1">{doc.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {doc.metadata.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {doc.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Source: {doc.metadata.source}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Run Analysis */}
        <div className="flex justify-center">
          <Button
            onClick={runRAGEvaluation}
            disabled={isAnalyzing || !query.trim()}
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
                Analyzing RAG Pipeline...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Evaluate RAG System
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Overall Quality Scores */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      RAG System Quality Scores
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={exportResults}>
                      <Download className="w-4 h-4 mr-2" />
                      Export Results
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center space-y-2">
                      <div className={`text-2xl font-bold ${getScoreColor(results.quality_scores.overall)}`}>
                        {(results.quality_scores.overall * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Overall Quality</div>
                      <Progress value={results.quality_scores.overall * 100} className="h-2" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <div className={`text-2xl font-bold ${getScoreColor(results.quality_scores.retrieval)}`}>
                        {(results.quality_scores.retrieval * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Retrieval</div>
                      <Progress value={results.quality_scores.retrieval * 100} className="h-2" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <div className={`text-2xl font-bold ${getScoreColor(results.quality_scores.generation)}`}>
                        {(results.quality_scores.generation * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Generation</div>
                      <Progress value={results.quality_scores.generation * 100} className="h-2" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <div className={`text-2xl font-bold ${getScoreColor(results.quality_scores.faithfulness)}`}>
                        {(results.quality_scores.faithfulness * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Faithfulness</div>
                      <Progress value={results.quality_scores.faithfulness * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Retrieved Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Retrieved Documents & Relevance Scores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.retrieved_docs.map((doc, index) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{doc.title}</h4>
                              <div className="flex gap-2">
                                <Badge className={getScoreBadge(doc.metadata.relevance_score || 0)}>
                                  Relevance: {((doc.metadata.relevance_score || 0) * 100).toFixed(1)}%
                                </Badge>
                                <Badge className={getScoreBadge(doc.metadata.reranked_score || 0)}>
                                  Reranked: {((doc.metadata.reranked_score || 0) * 100).toFixed(1)}%
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              {doc.content}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Source: {doc.metadata.source}</span>
                              <span>Category: {doc.metadata.category}</span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Generated Response Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Generated Response Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Query</Label>
                    <p className="text-sm bg-muted/30 p-3 rounded mt-1">
                      {results.query}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Generated Response</Label>
                    <p className="text-sm bg-muted/30 p-3 rounded mt-1">
                      {results.generated_response}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Reference Answer</Label>
                    <p className="text-sm bg-muted/30 p-3 rounded mt-1">
                      {results.reference_answer}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Detailed RAG Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Quality Metrics</h4>
                      <div className="space-y-3">
                        {Object.entries(results.metrics).map(([metric, value]) => (
                          <div key={metric} className="flex items-center justify-between">
                            <span className="text-sm capitalize">
                              {metric.replace('_', ' ')}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm">{(value * 100).toFixed(1)}%</span>
                              <Progress value={value * 100} className="w-16 h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Provenance & Citations</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Citation Coverage</span>
                          <span className="font-mono text-sm">
                            {(results.provenance.citation_coverage * 100).toFixed(1)}%
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium">Cited Sources:</span>
                          <div className="mt-2 space-y-1">
                            {results.provenance.source_attribution.map((attr, index) => (
                              <div key={index} className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{attr.source}</span>
                                <Badge variant="outline" className="text-xs">
                                  {(attr.confidence * 100).toFixed(0)}% confidence
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Code Example */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    BlazeMetrics Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted/50 p-4 rounded overflow-x-auto">
                    <code>{`from blazemetrics import BlazeMetricsClient
from blazemetrics.rag import RAGEvaluator

# Initialize RAG evaluator
client = BlazeMetricsClient()
rag_evaluator = RAGEvaluator()

# Your RAG pipeline components
query = "${results.query}"
retrieved_docs = [
${results.retrieved_docs.map(doc => `    "${doc.content.substring(0, 50)}..."`).join(',\n')}
]
generated_response = "${results.generated_response.substring(0, 100)}..."
reference_answer = "${results.reference_answer}"

# Comprehensive RAG evaluation
rag_metrics = rag_evaluator.evaluate_rag(
    query=query,
    retrieved_docs=retrieved_docs,
    generated_response=generated_response,
    reference_answer=reference_answer
)

# Text quality metrics
text_metrics = client.compute_metrics([generated_response], [[reference_answer]])
aggregated = client.aggregate_metrics(text_metrics)

print(f"Retrieval Relevance: {rag_metrics['retrieval_relevance']:.3f}")
print(f"Answer Faithfulness: {rag_metrics['answer_faithfulness']:.3f}")
print(f"Context Utilization: {rag_metrics['context_utilization']:.3f}")`}</code>
                  </pre>
                </CardContent>
              </Card>

              {/* Performance Info */}
              <div className="text-center">
                <Badge variant="secondary" className="px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  RAG evaluation completed in 2.8s • Rust-powered performance
                </Badge>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}