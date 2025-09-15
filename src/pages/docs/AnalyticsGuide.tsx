import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, CheckCircle, TrendingUp, AlertTriangle, BarChart3, Activity, Monitor, Zap } from "lucide-react"
import { useState } from "react"

export default function AnalyticsGuide() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const streamingExample = `from blazemetrics.streaming_analytics import StreamingAnalytics, AlertRule

analytics = StreamingAnalytics(
    window_size=100,
    alert_rules=[
        AlertRule(
            metric_name="rouge1_f1", 
            threshold=0.6, 
            comparison="lt", 
            severity="critical"
        ),
        AlertRule(
            metric_name="wer", 
            threshold=0.2, 
            comparison="gt", 
            severity="warning"
        )
    ],
    anomaly_detection=True,
    trend_analysis=True
)

# Add metrics continuously
analytics.add_metrics({
    "rouge1_f1": 0.59, 
    "wer": 0.23,
    "safety_score": 0.98
})

print(analytics.get_metric_summary())`

  const productionExample = `from blazemetrics import ProductionMonitor

monitor = ProductionMonitor(
    models=["llama-3", "gpt-4o"],
    metrics=["wer", "rouge1"],
    alert_thresholds={"wer": 0.2, "rouge1": 0.6},
    a_b_testing=True,
    drift_detection=True
)

for event in monitor.track_production():
    print(event)
    if event["quality_drop_detected"]:
        monitor.auto_failover_to_backup()
    if event["drift_detected"]:
        monitor.trigger_retraining_pipeline()`

  const exporterExample = `from blazemetrics.exporters import MetricsExporters

exporter = MetricsExporters(
    prometheus_gateway="http://localhost:9091",
    statsd_addr="localhost:8125",
    job="blazemetrics"
)

# Export metrics with labels
exporter.export({
    "bleu": 0.812, 
    "wer": 0.041,
    "safety_violations": 2,
    "processing_time_ms": 45
}, labels={
    "model": "gpt-4o",
    "environment": "production",
    "version": "v1.2.3"
})`

  const dashboardExample = `# Dashboard (Web/Streaming GUI)
# Run: python -m blazemetrics.dashboard
# http://localhost:8000/dashboard

from blazemetrics import BlazeMetricsClient

client = BlazeMetricsClient(config={
    "enable_analytics": True,
    "analytics_window": 100,
    "enable_monitoring": True
})

# All metrics automatically flow to dashboard
metrics = client.compute_metrics(candidates, references)

# Custom dashboard integration
from blazemetrics.dashboard import DashboardAPI

api = DashboardAPI()
api.register_custom_metric("business_kpi", lambda: calculate_business_metric())
api.start_server(port=8000)`

  const alertingExample = `@dataclass
class AlertRule:
    metric_name: str
    threshold: float
    comparison: str  # "gt", "lt", "gte", "lte", "eq"
    severity: str = "warning"
    duration: int = 1  # consecutive evaluations
    message_template: str = "Alert: {metric_name} {comparison} {threshold}"
    
    def evaluate(self, current_value: float) -> bool:
        if self.comparison == "gt":
            return current_value > self.threshold
        elif self.comparison == "lt":
            return current_value < self.threshold
        # ... other comparisons

@dataclass  
class Alert:
    rule: AlertRule
    current_value: float
    timestamp: datetime
    message: str
    severity: str
    metadata: dict

# Custom alert handling
def handle_alert(alert: Alert):
    if alert.severity == "critical":
        send_page(alert.message)
    else:
        log_warning(alert.message)

analytics = StreamingAnalytics(
    alert_rules=[
        AlertRule("safety_score", 0.5, "lt", "critical"),
        AlertRule("response_time", 1000, "gt", "warning")
    ],
    on_alert=handle_alert
)`

  const features = [
    {
      name: "Streaming Analytics",
      icon: Activity,
      description: "Real-time metrics processing with sliding windows and trend analysis",
      features: ["Rolling windows", "Trend detection", "Anomaly detection", "Real-time updates"],
      example: streamingExample
    },
    {
      name: "Production Monitoring", 
      icon: Monitor,
      description: "End-to-end monitoring for production AI systems with drift detection",
      features: ["Model drift detection", "A/B testing", "Auto-failover", "Performance tracking"],
      example: productionExample
    },
    {
      name: "Metrics Export",
      icon: TrendingUp,
      description: "Export to Prometheus, StatsD, and other monitoring systems",
      features: ["Prometheus gateway", "StatsD integration", "Custom labels", "Batch export"],
      example: exporterExample
    },
    {
      name: "Dashboard & API",
      icon: BarChart3,
      description: "Web dashboard for visualization and REST API for integration",
      features: ["Real-time visualization", "REST API", "Custom metrics", "Alert management"],
      example: dashboardExample
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-brand-slate/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/10 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="h-8 w-8 text-accent mr-3" />
              <h1 className="text-3xl lg:text-4xl font-bold">
                <span className="gradient-text">Analytics</span> & Monitoring
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Real-time streaming analytics, production monitoring, alerting, and export 
              capabilities for production AI systems.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-muted to-accent/5 shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="streaming">Streaming</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-8">
            <Card className="p-6 bg-gradient-to-r from-card to-accent/5 border-l-4 border-l-accent/30">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <BarChart3 className="h-6 w-6 text-accent mr-2" />
                Analytics & Monitoring Suite
              </h2>
              <p className="text-muted-foreground mb-6">
                BlazeMetrics provides comprehensive analytics and monitoring capabilities for production 
                AI systems, including real-time streaming, alerting, drift detection, and export to 
                popular monitoring platforms.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="p-4 h-full">
                        <Icon className="h-8 w-8 text-accent mb-3" />
                        <h3 className="font-semibold mb-2">{feature.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {feature.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {feature.features.map((item) => (
                            <Badge key={item} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              <Card className="p-6 bg-accent/10 border-accent/20">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold">Key Benefits</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Real-time Processing</h4>
                    <p className="text-muted-foreground">Process millions of metrics per second with minimal latency</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Production Ready</h4>
                    <p className="text-muted-foreground">Built-in alerting, failover, and integration with monitoring systems</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Anomaly Detection</h4>
                    <p className="text-muted-foreground">Automatic detection of drift, outliers, and performance degradation</p>
                  </div>
                </div>
              </Card>
            </Card>
          </TabsContent>

          {/* Streaming Analytics */}
          <TabsContent value="streaming" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Streaming Analytics</h2>
              
              <Card className="overflow-hidden mb-6">
                <div className="bg-muted/50 px-6 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Real-time Analytics Setup</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(streamingExample, 'streaming')}
                    >
                      {copiedCode === 'streaming' ? (
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
                  {streamingExample}
                </SyntaxHighlighter>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Analytics Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Rolling Windows:</strong> Configurable window sizes for trend analysis</li>
                    <li>• <strong>Anomaly Detection:</strong> Statistical outlier detection with thresholds</li>
                    <li>• <strong>Trend Analysis:</strong> Automatic trend detection and forecasting</li>
                    <li>• <strong>Real-time Updates:</strong> Sub-millisecond metric ingestion</li>
                  </ul>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Alert Configuration</h3>
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
                      {alertingExample}
                    </SyntaxHighlighter>
                  </Card>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Production Monitoring */}
          <TabsContent value="monitoring" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Production Monitoring</h2>
              
              <Card className="overflow-hidden mb-6">
                <div className="bg-muted/50 px-6 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Production Monitor Setup</span>
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
                  <h3 className="font-semibold mb-3">Monitoring Capabilities</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">Model Drift Detection</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Statistical drift detection algorithms</li>
                        <li>• Configurable sensitivity thresholds</li>
                        <li>• Automatic retraining triggers</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-blue-600">A/B Testing</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Multi-model comparison</li>
                        <li>• Statistical significance testing</li>
                        <li>• Automatic traffic splitting</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-purple-600">Auto-Failover</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Health check monitoring</li>
                        <li>• Configurable failover policies</li>
                        <li>• Backup model activation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-accent">Performance Tracking</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Latency and throughput metrics</li>
                        <li>• Resource utilization monitoring</li>
                        <li>• Cost tracking and optimization</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-yellow-500/10 border-yellow-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <h4 className="font-medium text-yellow-700 dark:text-yellow-300">Production Best Practices</h4>
                  </div>
                  <ul className="text-sm text-yellow-600 dark:text-yellow-400 space-y-1">
                    <li>• Set up monitoring before deploying to production</li>
                    <li>• Configure multiple backup models for failover</li>
                    <li>• Use staged rollouts for model updates</li>
                    <li>• Monitor both technical and business metrics</li>
                  </ul>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Export & Integration */}
          <TabsContent value="export" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Metrics Export & Integration</h2>
              
              <Card className="overflow-hidden mb-6">
                <div className="bg-muted/50 px-6 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Export Configuration</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(exporterExample, 'export')}
                    >
                      {copiedCode === 'export' ? (
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
                  {exporterExample}
                </SyntaxHighlighter>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Supported Platforms</h3>
                  <div className="space-y-3">
                    <div className="border-l-2 border-accent/30 pl-3">
                      <h4 className="font-medium">Prometheus</h4>
                      <p className="text-sm text-muted-foreground">Push gateway integration with custom labels</p>
                    </div>
                    <div className="border-l-2 border-blue-500/30 pl-3">
                      <h4 className="font-medium">StatsD</h4>
                      <p className="text-sm text-muted-foreground">UDP metrics for Datadog, Grafana, etc.</p>
                    </div>
                    <div className="border-l-2 border-green-500/30 pl-3">
                      <h4 className="font-medium">Custom Endpoints</h4>
                      <p className="text-sm text-muted-foreground">REST API integration for any platform</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Dashboard Integration</h3>
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
                      {dashboardExample}
                    </SyntaxHighlighter>
                  </Card>
                </Card>
              </div>

              <Card className="p-4 mt-6">
                <h3 className="font-semibold mb-3">Model & Data Cards</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate comprehensive model and data cards for compliance and documentation.
                </p>
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
{`client = BlazeMetricsClient()
model_card = client.generate_model_card(
    model_name="my-llm-v1",
    metrics=metrics,
    analytics=analytics.get_metric_summary(),
    config=client.config.__dict__,
    violations=[{"blocked": True, "text": "PII"}]
)
print(model_card)`}
                  </SyntaxHighlighter>
                </Card>
              </Card>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}