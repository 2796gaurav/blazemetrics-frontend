import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, CheckCircle, Rocket, Settings, Workflow, Database } from "lucide-react"
import { useState } from "react"

export default function ProductionGuide() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const workflowExample = `# Custom Workflows: Dashboards, Reporting, and Integration

# Dashboard (Web/Streaming GUI)
# Run: python -m blazemetrics.dashboard
# http://localhost:8000/dashboard — visualize metrics, analytics, run evals, see alerts, generate cards.
# All API functions available via REST endpoints (/api/*)

from blazemetrics import BlazeMetricsClient

client = BlazeMetricsClient(config={
    "enable_analytics": True,
    "enable_monitoring": True,
    "prometheus_gateway": "http://localhost:9091"
})

# Model/Data Cards for Compliance
model_card = client.generate_model_card(
    model_name="my-llm-v1",
    metrics=metrics,
    analytics=analytics.get_metric_summary(),
    config=client.config.__dict__,
    violations=[{"blocked": True, "text": "PII"}]
)
print(model_card)

# Exporter Example
from blazemetrics.exporters import MetricsExporters
exporter = MetricsExporters(prometheus_gateway="http://localhost:9091")
exporter.export({"bleu": 0.812, "wer": 0.041}, labels={"model": "my-llm"})`

  const productionExample = `# Productionizing, Extending, and Advanced Use

# Streaming Analytics for Monitoring and Drift
from blazemetrics import ProductionMonitor

monitor = ProductionMonitor(
    models=["llama-3", "gpt-4o"],
    metrics=["wer", "rouge1"],
    alert_thresholds={"wer": 0.2, "rouge1": 0.6},
    a_b_testing=True
)

for event in monitor.track_production():
    print(event)
    if event["quality_drop_detected"]:
        monitor.auto_failover_to_backup()
    if event["drift_detected"]:
        monitor.trigger_retraining_pipeline()`

  const guardrailsExample = `# Custom Guardrails/Callbacks
from blazemetrics.enhanced_guardrails import EnhancedGuardrails

guard = EnhancedGuardrails(
    blocklist=["hack", "exploit"],
    enforcement_policies=[
        {"condition": lambda out: any(out["blocked"]), "action": "reject"},
        {"condition": lambda out: out["safety_score"] > 0.7, "action": "rewrite"},
    ],
    on_violation=lambda out: print("Violation!", out)
)

print(guard.check(["how to hack wifi?"]))`

  const llmIntegrationExample = `# Bringing Your Own LLM—Factuality, Judging, Correction
# All LLM/generation behavior is decoupled—plug in OpenAI, Anthropic, vLLM, or your own.

import openai
from blazemetrics import FactualityEvaluator

def openai_factuality_scorer(output, reference):
    """Custom LLM-based factuality scorer using OpenAI"""
    prompt = f"""
    Compare these two texts for factual accuracy:
    Generated: {output}
    Reference: {reference}
    
    Return a score from 0.0 to 1.0 where 1.0 means perfectly factual.
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    
    # Parse the score from response
    score = float(response.choices[0].message.content.strip())
    return {"factuality": score, "explanation": response.choices[0].message.content}

# Use with BlazeMetrics
evaluator = FactualityEvaluator(openai_factuality_scorer)
results = evaluator.score_factuality(
    outputs=["Paris is the capital of France."],
    references=["Paris is the capital of France."]
)

# Anthropic Claude integration
import anthropic

def claude_safety_scorer(text):
    """Custom safety scorer using Claude"""
    client = anthropic.Anthropic(api_key="your-key")
    
    message = client.messages.create(
        model="claude-3-sonnet-20240229",
        max_tokens=100,
        messages=[{
            "role": "user", 
            "content": f"Rate the safety of this text from 0-1: {text}"
        }]
    )
    
    return float(message.content[0].text.strip())

# HuggingFace integration
from transformers import pipeline

def huggingface_classifier(texts):
    """Use any HuggingFace model for classification"""
    classifier = pipeline("text-classification", model="unitary/toxic-bert")
    results = classifier(texts)
    return [{"safety_score": 1 - r["score"] if r["label"] == "TOXIC" else r["score"]} for r in results]`

  const parallelExample = `# Parallel/Environment Control
from blazemetrics import set_parallel, get_parallel, set_parallel_threshold

# Enable/disable parallel processing globally
set_parallel(True)
print(f"Parallel processing enabled: {get_parallel()}")

# Set threshold for when to use parallel processing
set_parallel_threshold(1000)  # Use parallel for datasets > 1000 samples

# Advanced parallel configuration
from blazemetrics import BlazeMetricsClient

client = BlazeMetricsClient(config={
    "parallel_processing": True,
    "chunk_size": 5000,  # Process in chunks of 5000
    "max_workers": 8     # Use 8 worker threads
})

# Process large datasets efficiently
large_candidates = ["text " + str(i) for i in range(100000)]
large_references = [["ref " + str(i)] for i in range(100000)]

metrics = client.compute_metrics_parallel(
    large_candidates, 
    large_references,
    chunksize=10000
)`

  const sections = [
    {
      title: "Custom Workflows",
      icon: Workflow,
      description: "Dashboards, reporting, and integration patterns",
      example: workflowExample
    },
    {
      title: "Production Deployment",
      icon: Rocket,
      description: "Production monitoring, drift detection, and failover",
      example: productionExample
    },
    {
      title: "LLM Integration",
      icon: Database,
      description: "Integrate with any LLM provider for advanced evaluation",
      example: llmIntegrationExample
    },
    {
      title: "Performance Optimization",
      icon: Settings,
      description: "Parallel processing and performance tuning",
      example: parallelExample
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-performance-excellent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-crimson/10 to-transparent rounded-full translate-y-48 -translate-x-48"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <Rocket className="h-8 w-8 text-accent mr-3" />
              <h1 className="text-3xl lg:text-4xl font-bold">
                <span className="gradient-text">Production</span> Guide
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Complete guide to deploying BlazeMetrics in production environments with 
              custom workflows, monitoring, and LLM integrations.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-muted to-accent/5 shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-8">
            <Card className="p-6 bg-gradient-to-r from-card to-brand-crimson/5 border-l-4 border-l-brand-crimson/30">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Rocket className="h-6 w-6 text-accent mr-2" />
                Production Deployment
              </h2>
              <p className="text-muted-foreground mb-6">
                BlazeMetrics is designed for production deployment with enterprise-grade features 
                including monitoring, alerting, custom integrations, and high-performance processing.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {sections.map((section, index) => {
                  const Icon = section.icon
                  return (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="p-4 h-full">
                        <Icon className="h-8 w-8 text-accent mb-3" />
                        <h3 className="font-semibold mb-2">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              <Card className="p-6 bg-accent/10 border-accent/20">
                <h3 className="text-lg font-semibold mb-4">Key Production Features</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Extensibility</h4>
                    <p className="text-muted-foreground">Plug in external models, custom scorers, and third-party services</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Scalability</h4>
                    <p className="text-muted-foreground">Process millions of evaluations with automatic scaling and optimization</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Reliability</h4>
                    <p className="text-muted-foreground">Built-in monitoring, alerting, and failover for production workloads</p>
                  </div>
                </div>
              </Card>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Architecture Philosophy</h3>
              <p className="text-muted-foreground mb-4">
                BlazeMetrics follows a "bring your own" philosophy - you choose your LLMs, models, 
                policies, and infrastructure while BlazeMetrics provides the fast, reliable backbone.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Core Principles</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Provider-agnostic integration</li>
                    <li>• Minimal vendor lock-in</li>
                    <li>• Composable architecture</li>
                    <li>• Performance-first design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Extension Points</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Custom scoring functions</li>
                    <li>• External model integrations</li>
                    <li>• Policy enforcement callbacks</li>
                    <li>• Metrics export pipelines</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Custom Workflows */}
          <TabsContent value="workflows" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Custom Workflows & Dashboards</h2>
              
              <Card className="overflow-hidden mb-6">
                <div className="bg-muted/50 px-6 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Workflow Integration Example</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(workflowExample, 'workflow')}
                    >
                      {copiedCode === 'workflow' ? (
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
                  {workflowExample}
                </SyntaxHighlighter>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Dashboard Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Real-time metrics visualization</li>
                    <li>• Interactive evaluation playground</li>
                    <li>• Alert management interface</li>
                    <li>• Model comparison tools</li>
                    <li>• Export and reporting</li>
                  </ul>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">REST API Endpoints</h3>
                  <div className="space-y-2 text-sm">
                    <div><code className="text-accent">POST /api/metrics</code> - Compute metrics</div>
                    <div><code className="text-accent">POST /api/safety</code> - Safety checks</div>
                    <div><code className="text-accent">GET /api/analytics</code> - Analytics summary</div>
                    <div><code className="text-accent">POST /api/alerts</code> - Alert configuration</div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Production Deployment */}
          <TabsContent value="deployment" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Production Deployment</h2>
              
              <Card className="overflow-hidden mb-6">
                <div className="bg-muted/50 px-6 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Production Monitoring Setup</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(productionExample, 'production')}
                    >
                      {copiedCode === 'production' ? (
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
                  {productionExample}
                </SyntaxHighlighter>
              </Card>

              <div className="space-y-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Production Checklist</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">Setup</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>✓ Configure monitoring and alerting</li>
                        <li>✓ Set up metrics export to Prometheus/StatsD</li>
                        <li>✓ Enable drift detection</li>
                        <li>✓ Configure backup models for failover</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-blue-600">Optimization</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>✓ Enable parallel processing for large workloads</li>
                        <li>✓ Configure appropriate chunk sizes</li>
                        <li>✓ Set up connection pooling</li>
                        <li>✓ Monitor resource utilization</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Enhanced Guardrails</h3>
                  <Card className="overflow-hidden">
                    <SyntaxHighlighter
                      language="python"
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: 'hsl(var(--brand-navy))',
                        fontSize: '0.75rem'
                      }}
                    >
                      {guardrailsExample}
                    </SyntaxHighlighter>
                  </Card>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* LLM Integration */}
          <TabsContent value="integration" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">LLM Integration & Performance</h2>
              
              <Card className="overflow-hidden mb-6">
                <div className="bg-muted/50 px-6 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">LLM Integration Examples</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(llmIntegrationExample, 'llm')}
                    >
                      {copiedCode === 'llm' ? (
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
                  {llmIntegrationExample}
                </SyntaxHighlighter>
              </Card>

              <Card className="p-4 mb-6">
                <h3 className="font-semibold mb-3">Performance Optimization</h3>
                <Card className="overflow-hidden">
                  <SyntaxHighlighter
                    language="python" 
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      background: 'hsl(var(--brand-navy))',
                      fontSize: '0.75rem'
                    }}
                  >
                    {parallelExample}
                  </SyntaxHighlighter>
                </Card>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Supported Providers</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">OpenAI</Badge>
                      <span className="text-muted-foreground">GPT-3.5, GPT-4, GPT-4o</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">Anthropic</Badge>
                      <span className="text-muted-foreground">Claude 3 Opus, Sonnet, Haiku</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">HuggingFace</Badge>
                      <span className="text-muted-foreground">Any transformer model</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">Custom</Badge>
                      <span className="text-muted-foreground">Your own API endpoints</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Integration Patterns</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Custom scoring functions</li>
                    <li>• Async/await support</li>
                    <li>• Connection pooling</li>
                    <li>• Rate limiting</li>
                    <li>• Error handling & retries</li>
                    <li>• Cost tracking</li>
                  </ul>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}