import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, CheckCircle, Code, Book, Settings } from "lucide-react"
import { useState } from "react"

export default function APIReference() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const clientExample = `from blazemetrics import BlazeMetricsClient

# Initialize with configuration
client = BlazeMetricsClient(config={
    "metrics_include": ["bleu", "rouge1", "rouge2", "rougeL"],
    "metrics_lowercase": True,
    "redact_pii": True,
    "safety": True,
    "parallel_processing": True
})

# Basic metrics computation
metrics = client.compute_metrics(
    candidates=["Generated text here"],
    references=[["Reference text here"]]
)

# Safety checking
safety = client.check_safety([
    "Text to check for safety issues"
])

# Parallel processing for large datasets  
metrics = client.compute_metrics_parallel(
    candidates_list, 
    references_list, 
    chunksize=1000
)`

  const configExample = `@dataclass
class ClientConfig:
    # Metrics Configuration
    metrics_include: List[str] = ["bleu", "rouge1", "rouge2", "rougeL"]
    metrics_lowercase: bool = False
    metrics_stemming: bool = False
    
    # Safety & Guardrails
    blocklist: List[str] = []
    regexes: List[str] = []
    case_insensitive: bool = True
    redact_pii: bool = True
    safety: bool = True
    detect_injection: bool = True
    
    # Fuzzy Matching
    fuzzy_distance: int = 2
    fuzzy_algorithm: Literal['levenshtein', 'jaro_winkler'] = 'levenshtein'
    
    # Analytics & Monitoring
    enable_analytics: bool = False
    analytics_window: int = 100
    analytics_alerts: bool = True
    
    # Performance
    parallel_processing: bool = True
    chunk_size: int = 1000
    max_workers: Optional[int] = None`

  const evaluatorExample = `# Agent Evaluation
from blazemetrics import AgentEvaluator

evaluator = AgentEvaluator(
    available_tools=["search", "calculator", "email"],
    safety_policies=["no-pii-disclosure", "no-harmful-actions"]
)

results = evaluator.evaluate(
    tasks=["Book a flight to Paris"],
    agent_traces=[{
        "steps": ["search_flights", "compare_prices", "book_flight"],
        "outcome": "success",
        "reasoning": "Found best price and completed booking"
    }],
    metrics=["goal_completion_rate", "reasoning_coherence", "tool_efficiency"]
)

# Code Evaluation  
from blazemetrics import CodeEvaluator

code_eval = CodeEvaluator(
    languages=["python", "javascript"],
    security_checks=True,
    performance_analysis=True
)

results = code_eval.evaluate(
    prompts=["Write a function to sort an array"],
    generated_code=["def sort_array(arr): return sorted(arr)"],
    reference_solutions=["def sort_array(arr): return sorted(arr)"],
    metrics=["correctness", "efficiency", "security", "style"]
)`

  const analyticsExample = `# Streaming Analytics
from blazemetrics.streaming_analytics import StreamingAnalytics, AlertRule

analytics = StreamingAnalytics(
    window_size=100,
    alert_rules=[
        AlertRule(
            metric_name="bleu",
            threshold=0.6,
            comparison="lt",
            severity="critical"
        )
    ]
)

# Add metrics continuously
analytics.add_metrics({
    "bleu": 0.85,
    "rouge1": 0.92,
    "safety_score": 0.98
})

# Get summary
summary = analytics.get_metric_summary()
print(summary)`

  const methods = [
    {
      name: "compute_metrics",
      description: "Compute evaluation metrics for candidate-reference pairs",
      signature: "compute_metrics(candidates: List[str], references: List[List[str]], include=None, lowercase=None) -> dict",
      example: `metrics = client.compute_metrics(
    candidates=["The cat sat on the mat"],
    references=[["A cat was sitting on the mat"]]
)`
    },
    {
      name: "check_safety", 
      description: "Check text for safety issues, PII, and policy violations",
      signature: "check_safety(texts: List[str]) -> List[Dict[str, Any]]",
      example: `safety = client.check_safety([
    "Please provide your email address"
])`
    },
    {
      name: "compute_metrics_parallel",
      description: "Parallel computation for large datasets with chunking",
      signature: "compute_metrics_parallel(candidates, references, chunksize=1000, max_workers=None) -> dict", 
      example: `metrics = client.compute_metrics_parallel(
    large_candidates_list,
    large_references_list,
    chunksize=5000
)`
    },
    {
      name: "generate_model_card",
      description: "Generate compliance model cards with metrics and metadata",
      signature: "generate_model_card(model_name, metrics, analytics, config, violations=None) -> str",
      example: `card = client.generate_model_card(
    model_name="gpt-4-eval",
    metrics=metrics,
    analytics=analytics_summary,
    config=client.config.__dict__
)`
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <Code className="h-8 w-8 text-accent mr-3" />
              <h1 className="text-3xl lg:text-4xl font-bold">
                <span className="gradient-text">API Reference</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Complete API documentation for all BlazeMetrics classes, methods, and configuration options.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="client" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="client">BlazeMetricsClient</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="evaluators">Evaluators</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Client API */}
          <TabsContent value="client" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">BlazeMetricsClient</h2>
                  <p className="text-muted-foreground mb-6">
                    The main entry point for all BlazeMetrics functionality. Provides a unified interface 
                    for metrics computation, safety checks, advanced evaluation, and analytics.
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Core Methods</h3>
                    {methods.map((method, index) => (
                      <Card key={method.name} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-accent">{method.name}</h4>
                          <Badge variant="outline" className="text-xs font-mono">
                            method
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {method.description}
                        </p>
                        <div className="bg-muted/50 rounded p-2 mb-3">
                          <code className="text-xs">{method.signature}</code>
                        </div>
                        <details className="text-sm">
                          <summary className="cursor-pointer hover:text-accent">
                            View example
                          </summary>
                          <div className="mt-2 bg-brand-navy rounded p-3">
                            <SyntaxHighlighter
                              language="python"
                              style={oneDark}
                              customStyle={{
                                margin: 0,
                                padding: 0,
                                background: 'transparent',
                                fontSize: '0.75rem'
                              }}
                            >
                              {method.example}
                            </SyntaxHighlighter>
                          </div>
                        </details>
                      </Card>
                    ))}
                  </div>
                </Card>

                {/* Usage Example */}
                <Card className="overflow-hidden">
                  <div className="bg-muted/50 px-6 py-3 border-b">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Complete Usage Example</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(clientExample, 'client')}
                      >
                        {copiedCode === 'client' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <SyntaxHighlighter
                    language="python"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'hsl(var(--brand-navy))'
                    }}
                  >
                    {clientExample}
                  </SyntaxHighlighter>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-4">
                  <h3 className="font-medium mb-3">Quick Navigation</h3>
                  <div className="space-y-2 text-sm">
                    {methods.map((method) => (
                      <div key={method.name}>
                        <a href={`#${method.name}`} className="text-accent hover:underline">
                          {method.name}()
                        </a>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                  <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                    Performance Tips
                  </h3>
                  <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                    <li>• Use parallel processing for datasets larger than 1000 samples</li>
                    <li>• Enable chunking for memory efficiency</li>
                    <li>• Configure metrics filtering to reduce compute</li>
                    <li>• Reuse client instances when possible</li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Configuration */}
          <TabsContent value="config" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">ClientConfig</h2>
              <p className="text-muted-foreground mb-6">
                Configuration class that controls all BlazeMetrics behavior. Pass to BlazeMetricsClient 
                constructor or modify individual settings.
              </p>

              <Card className="overflow-hidden mb-6">
                <div className="bg-muted/50 px-6 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Configuration Schema</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(configExample, 'config')}
                    >
                      {copiedCode === 'config' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <SyntaxHighlighter
                  language="python"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'hsl(var(--brand-navy))'
                  }}
                >
                  {configExample}
                </SyntaxHighlighter>
              </Card>

              {/* Configuration Sections */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Metrics Configuration",
                    options: [
                      { name: "metrics_include", type: "List[str]", description: "Which metrics to compute" },
                      { name: "metrics_lowercase", type: "bool", description: "Normalize text to lowercase" },
                      { name: "metrics_stemming", type: "bool", description: "Apply stemming during evaluation" }
                    ]
                  },
                  {
                    title: "Safety & Guardrails",
                    options: [
                      { name: "redact_pii", type: "bool", description: "Automatically detect and redact PII" },
                      { name: "safety", type: "bool", description: "Enable safety scoring" },
                      { name: "detect_injection", type: "bool", description: "Detect prompt injection attempts" }
                    ]
                  },
                  {
                    title: "Performance Settings", 
                    options: [
                      { name: "parallel_processing", type: "bool", description: "Enable multi-core processing" },
                      { name: "chunk_size", type: "int", description: "Batch size for parallel processing" },
                      { name: "max_workers", type: "Optional[int]", description: "Maximum worker threads" }
                    ]
                  },
                  {
                    title: "Analytics & Monitoring",
                    options: [
                      { name: "enable_analytics", type: "bool", description: "Enable streaming analytics" },
                      { name: "analytics_window", type: "int", description: "Rolling window size" },
                      { name: "analytics_alerts", type: "bool", description: "Enable alerting system" }
                    ]
                  }
                ].map((section, index) => (
                  <Card key={section.title} className="p-4">
                    <h3 className="font-semibold mb-3">{section.title}</h3>
                    <div className="space-y-3">
                      {section.options.map((option) => (
                        <div key={option.name} className="border-l-2 border-accent/30 pl-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <code className="text-sm font-medium text-accent">{option.name}</code>
                            <Badge variant="outline" className="text-xs">{option.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Evaluators */}
          <TabsContent value="evaluators" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Advanced Evaluators</h2>
              <p className="text-muted-foreground mb-6">
                Specialized evaluation classes for complex use cases like agent workflows, 
                multimodal outputs, and code generation.
              </p>

              <Card className="overflow-hidden mb-6">
                <div className="bg-muted/50 px-6 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Evaluator Examples</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(evaluatorExample, 'evaluators')}
                    >
                      {copiedCode === 'evaluators' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <SyntaxHighlighter
                  language="python"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'hsl(var(--brand-navy))'
                  }}
                >
                  {evaluatorExample}
                </SyntaxHighlighter>
              </Card>

              {/* Evaluator Classes */}
              <div className="space-y-6">
                {[
                  {
                    name: "AgentEvaluator",
                    description: "Evaluate multi-step LLM agent workflows including tool usage and reasoning",
                    metrics: ["goal_completion_rate", "reasoning_coherence", "tool_efficiency", "safety_compliance"]
                  },
                  {
                    name: "CodeEvaluator", 
                    description: "Assess generated code for correctness, security, style, and performance",
                    metrics: ["correctness", "efficiency", "security", "style", "readability"]
                  },
                  {
                    name: "MultimodalEvaluator",
                    description: "Evaluate text, image, and cross-modal generation quality",
                    metrics: ["clip_score", "fid", "inception_score", "text_image_alignment"]
                  },
                  {
                    name: "SafetyEvaluator",
                    description: "Advanced bias, fairness, and alignment testing for production systems",
                    metrics: ["bias_detection", "alignment_score", "adversarial_robustness"]
                  }
                ].map((evaluator, index) => (
                  <Card key={evaluator.name} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-accent">{evaluator.name}</h3>
                      <Badge>Evaluator</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{evaluator.description}</p>
                    
                    <div>
                      <h4 className="font-medium mb-2">Available Metrics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {evaluator.metrics.map((metric) => (
                          <Badge key={metric} variant="outline" className="text-xs">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Streaming Analytics</h2>
              <p className="text-muted-foreground mb-6">
                Real-time analytics, alerting, and monitoring capabilities for production deployments.
              </p>

              <Card className="overflow-hidden mb-6">
                <div className="bg-muted/50 px-6 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Analytics Setup</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(analyticsExample, 'analytics')}
                    >
                      {copiedCode === 'analytics' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <SyntaxHighlighter
                  language="python"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'hsl(var(--brand-navy))'
                  }}
                >
                  {analyticsExample}
                </SyntaxHighlighter>
              </Card>

              {/* Analytics Features */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Real-time Monitoring",
                    features: ["Sliding window analytics", "Anomaly detection", "Trend analysis", "Performance tracking"]
                  },
                  {
                    title: "Alerting System",
                    features: ["Custom alert rules", "Multiple severity levels", "Webhook notifications", "Email alerts"]
                  },
                  {
                    title: "Export Integration",
                    features: ["Prometheus metrics", "StatsD support", "Custom exporters", "Dashboard integration"]
                  },
                  {
                    title: "Production Features",
                    features: ["Model cards generation", "Compliance reporting", "A/B testing support", "Drift detection"]
                  }
                ].map((section, index) => (
                  <Card key={section.title} className="p-4">
                    <h3 className="font-semibold mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-accent mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}