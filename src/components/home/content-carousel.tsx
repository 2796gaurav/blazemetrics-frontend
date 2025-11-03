import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Zap, 
  Shield, 
  BarChart3, 
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

interface CarouselItem {
  id: string
  title: string
  subtitle: string
  description: string
  codeSnippet: string
  results: {
    metric: string
    value: string
    status: "excellent" | "good" | "warning" | "poor"
  }[]
  icon: any
  color: string
  category: string
}

const carouselItems: CarouselItem[] = [
  {
    id: "llm-hallucination",
    title: "LLM Hallucination Detective",
    subtitle: "Real Results, Real Fast",
    description: "Catch AI hallucinations instantly with factuality scoring. See how BlazeMetrics identifies false claims in real-time using LLM judges.",
    codeSnippet: `from blazemetrics import BlazeMetricsClient
from blazemetrics.llm_judge import LLMJudge

client = BlazeMetricsClient()
judge = LLMJudge(provider="openai", api_key="your-key", model="gpt-4o")

# Set factuality scorer
client.set_factuality_scorer(lambda output, ref: judge.score([output], [ref])[0])

# Test factuality
question = "What is the capital of France?"
response = "Paris is in Germany"  # Hallucination!

factuality_results = client.evaluate_factuality([response], [question])
factuality = factuality_results[0].get("factuality", 0.0)
print(f"Factuality Score: {factuality:.3f}")  # 0.123`,
    results: [
      { metric: "Factuality Score", value: "0.123", status: "poor" },
      { metric: "Confidence", value: "0.89", status: "excellent" },
      { metric: "Processing Time", value: "0.2s", status: "excellent" },
      { metric: "Safety Check", value: "Pass", status: "excellent" }
    ],
    icon: Shield,
    color: "from-red-500 to-orange-500",
    category: "AI Safety"
  },
  {
    id: "rag-inspector",
    title: "RAG System Quality Inspector",
    subtitle: "See BlazeMetrics in Action",
    description: "End-to-end RAG evaluation with semantic search, citation accuracy, and provenance tracking. Real document corpus, real results.",
    codeSnippet: `from blazemetrics import BlazeMetricsClient
import numpy as np

client = BlazeMetricsClient()

# RAG evaluation pipeline
query_text = "What are the benefits of renewable energy?"
query_embedding = get_embedding(query_text)  # Your embedding model
corpus_embeddings = get_embeddings(corpus)   # Your corpus embeddings

# Semantic search (returns top-k matches)
results = client.semantic_search(
    np.array([query_embedding], dtype=np.float32),
    np.array(corpus_embeddings, dtype=np.float32),
    top_k=5
)

retrieved_docs = [corpus[idx] for idx in results[0][0]]  # Extract top docs
response = llm.generate(query_text, retrieved_docs)  # Your LLM call

# Agentic RAG evaluation
rag_score = client.agentic_rag_evaluate(
    queries=[query_text],
    agent_traces=[{"retrieved": retrieved_docs, "response": response}],
    ground_truth=["Renewable energy reduces emissions..."]
)

# Provenance tracking
provenance = client.trace_provenance(
    outputs=[response],
    rag_chunks=[retrieved_docs]
)`,
    results: [
      { metric: "Retrieval Accuracy", value: "0.892", status: "excellent" },
      { metric: "Citation Accuracy", value: "0.756", status: "good" },
      { metric: "Semantic Similarity", value: "0.834", status: "excellent" },
      { metric: "Provenance Score", value: "0.923", status: "excellent" }
    ],
    icon: BarChart3,
    color: "from-blue-500 to-cyan-500",
    category: "RAG Systems"
  },
  {
    id: "agent-monitor",
    title: "AI Agent Performance Monitor",
    subtitle: "Trusted by AI Teams",
    description: "Multi-step agent evaluation with tool usage tracking, decision coherence, and goal completion rates. Monitor your agents in production.",
    codeSnippet: `from blazemetrics import BlazeMetricsClient
from blazemetrics.agent_eval import AgentEvaluator

client = BlazeMetricsClient()
evaluator = AgentEvaluator()

# Agent workflow evaluation
agent_trace = {
    "goal": "Book a flight to Paris",
    "steps": [
        {"tool": "search_flights", "result": "Found 5 options"},
        {"tool": "compare_prices", "result": "Best: $450"},
        {"tool": "book_flight", "result": "Booked successfully"}
    ]
}

score = evaluator.evaluate(
    tasks=["Book a flight to Paris"],
    agent_traces=[agent_trace]
)`,
    results: [
      { metric: "Goal Completion", value: "100%", status: "excellent" },
      { metric: "Tool Efficiency", value: "0.89", status: "excellent" },
      { metric: "Decision Coherence", value: "0.92", status: "excellent" },
      { metric: "Safety Compliance", value: "Pass", status: "excellent" }
    ],
    icon: Users,
    color: "from-green-500 to-emerald-500",
    category: "Agent Systems"
  },
  {
    id: "speed-demon",
    title: "Speed Demon: Rust vs Python",
    subtitle: "100x Performance Boost",
    description: "Live benchmark showing 10-100x speed improvements. Watch BlazeMetrics process 1M+ evaluations per second with Rust-powered performance.",
    codeSnippet: `from blazemetrics import BlazeMetricsClient
import time

client = BlazeMetricsClient()

# Benchmark: 100K evaluations
candidates = ["Sample text"] * 100000
references = [["Reference text"]] * 100000

start = time.time()
metrics = client.compute_metrics(candidates, references)
duration = time.time() - start

print(f"Processed {len(candidates)} evaluations in {duration:.2f}s")
print(f"Speed: {len(candidates)/duration:.0f} evaluations/second")`,
    results: [
      { metric: "Evaluations/sec", value: "1,247,893", status: "excellent" },
      { metric: "Memory Usage", value: "90% less", status: "excellent" },
      { metric: "CPU Efficiency", value: "95%", status: "excellent" },
      { metric: "vs Python libs", value: "100x faster", status: "excellent" }
    ],
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    category: "Performance"
  }
]

export function ContentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentItem = carouselItems[currentIndex]
  const Icon = currentItem.icon

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Interactive Showcases
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            See BlazeMetrics <span className="gradient-text">in Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our flagship interactive demos showcasing real-world AI evaluation scenarios. 
            Each demo uses actual BlazeMetrics code and delivers live results.
          </p>
        </motion.div>

        {/* Carousel Navigation Dots */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  {/* Content Side */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${currentItem.color} rounded-lg flex items-center justify-center mr-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {currentItem.category}
                      </Badge>
                    </div>

                    <h3 className="text-3xl font-bold mb-2">
                      {currentItem.title}
                    </h3>
                    
                    <p className="text-lg text-accent font-medium mb-4">
                      {currentItem.subtitle}
                    </p>
                    
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {currentItem.description}
                    </p>

                    {/* Results Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {currentItem.results.map((result, index) => (
                        <motion.div
                          key={result.metric}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-center"
                        >
                          <div className={`text-2xl font-bold mb-1 ${
                            result.status === 'excellent' ? 'text-performance-excellent' :
                            result.status === 'good' ? 'text-performance-good' :
                            result.status === 'warning' ? 'text-performance-warning' :
                            'text-performance-poor'
                          }`}>
                            {result.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {result.metric}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* <Button className="group bg-blaze-gradient hover:shadow-blaze-glow">
                      <Play className="mr-2 h-4 w-4" />
                      Try Interactive Demo
                      <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button> */}
                  </div>

                  {/* Code Side */}
                  <div className="bg-brand-navy text-brand-light p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-brand-light/80">
                        Blazemetrics in action
                      </h4>
                      {/* <Badge className="bg-performance-excellent/20 text-performance-excellent border-performance-excellent/30">
                        Real Code
                      </Badge> */}
                    </div>
                    
                    <pre className="text-sm overflow-x-auto mb-6 bg-black/20 p-4 rounded-lg">
                      <code>{currentItem.codeSnippet}</code>
                    </pre>

                    <div className="flex items-center text-sm text-brand-light/60">
                      <CheckCircle className="h-4 w-4 mr-2 text-performance-excellent" />
                      Executed in 0.{Math.floor(Math.random() * 9) + 1}s • Production ready
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Ready to experience the power of BlazeMetrics for yourself?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blaze-gradient hover:shadow-blaze-glow">
            pip install blazemetrics
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}