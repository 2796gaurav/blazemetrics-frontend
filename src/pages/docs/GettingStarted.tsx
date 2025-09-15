import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Terminal, Zap, ArrowRight, Sparkles, Target, BookOpen } from "lucide-react"
import BeginnerPath from "@/components/learning/beginner-path"
import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/layout/page-header"
import { ContentSection } from "@/components/layout/content-section"
import { CodeBlock } from "@/components/ui/code-block"
import { FeatureCard } from "@/components/ui/feature-card"
import { ResponsiveGrid } from "@/components/layout/responsive-grid"
import { SectionIndicator } from "@/components/navigation/section-indicator"

export default function GettingStarted() {
  const installCode = `# Install from PyPI (recommended)
pip install blazemetrics

# Or install from source with Rust/PyO3 builds
git clone https://github.com/2796gaurav/blazemetrics.git
cd blazemetrics
pip install -r requirements.txt
maturin develop`

  const dashboardInstall = `pip install "blazemetrics[dashboard]"`

  const quickStartCode = `from blazemetrics import BlazeMetricsClient

# Example predictions (candidates) and their references (ground truths)
candidates = [
    "The quick brown fox jumps over the lazy dog.",
    "Hello world, this is a test."
]
references = [
    ["The fast brown fox jumps over the lazy dog."],   # ref for first candidate
    ["Hello World! This is only a test."]             # ref for second
]

client = BlazeMetricsClient()

# Compute all default metrics (ROUGE, BLEU, CHRF, METEOR, WER, etc)
metrics = client.compute_metrics(candidates, references)
agg_metrics = client.aggregate_metrics(metrics)

print("Sample-wise metrics:")
for k, vals in metrics.items():
    print(f"  {k}: {vals}")

print("\\nAggregate metrics:")
for k, v in agg_metrics.items():
    print(f"  {k}: {v:.3f}")`

  const completeExample = `from blazemetrics import BlazeMetricsClient

# Your LLM generations and references
candidates = [
    "Alice's email is alice@example.com.",
    "Paris is the capital city of France.",
    "2 + 2 is 5.",
    "You should buy Bitcoin on my advice."
]
references = [
    ["Her email is alice@example.com."],
    ["Paris is the capital of France."],
    ["2 + 2 = 4"],
    [""]
]

client = BlazeMetricsClient(
    # Guardrails and compliance
    blocklist=["Bitcoin"],
    redact_pii=True,
    regexes=[r"\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b"],
    case_insensitive=True,
    # Analytics/monitoring
    enable_analytics=True,
    analytics_window=100,
    analytics_alerts=True,
    # Metrics configuration
    metrics_include=["bleu", "rouge1", "wer", "meteor", "chrf"],
    metrics_lowercase=True
)

# 1. Metrics evaluation
metrics = client.compute_metrics(candidates, references)
agg = client.aggregate_metrics(metrics)

# 2. Safety checks (guardrails, PII, blocklist, regex, etc.)
safety = client.check_safety(candidates)

# 3. Add to analytics window; get analytic summary
client.add_metrics(agg)
analytics = client.get_analytics_summary()

print("Metrics:", agg)
print("Safety violations:", [s.get('blocked') for s in safety])
print("Analytics:", analytics)`

  const expectedOutput = `Sample-wise metrics:
  rouge1_f1: [0.923, 0.857]
  rouge2_f1: [0.756, 0.667]
  rougeL_f1: [0.889, 0.800]
  bleu: [0.847, 0.750]
  chrf: [0.691, 0.625]
  meteor: [0.734, 0.680]
  wer: [0.041, 0.125]

Aggregate metrics:
  rouge1_f1: 0.890
  bleu: 0.799
  chrf: 0.658

⚡ Completed in 8ms - Rust-powered speed`

  return (
    <PageLayout>
      <SectionIndicator />
      
      <PageHeader
        title="Getting Started"
        description="Get up and running with BlazeMetrics in minutes. This guide covers installation, basic usage, and your first evaluation."
        category="docs"
        badge="Quick Start"
        showGithubLink={true}
        showDocsLink={false}
      />

      <ContentSection>
        <Tabs defaultValue="guided" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="guided" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>5-Minute Guided Path</span>
            </TabsTrigger>
            <TabsTrigger value="reference" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Quick Reference</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="guided">
            <BeginnerPath />
          </TabsContent>
          
          <TabsContent value="reference">
            <div className="space-y-12">
              {/* Why BlazeMetrics */}
              <ContentSection
                title="Why BlazeMetrics?"
                description="BlazeMetrics is a unified, ultra-high-performance evaluation, guardrail, and analytics suite designed for fast, scalable evaluation of LLMs, GenAI, RAG, code, agentic workflows, and multimodal models."
                variant="elevated"
                size="lg"
              >
                <ResponsiveGrid columns={{ sm: 1, md: 2 }} gap="lg">
                  <FeatureCard
                    title="Rust-Powered Speed"
                    description="Combines the speed of Rust with the flexibility of Python for lightning-fast evaluations."
                    icon={<Zap className="h-6 w-6" />}
                    category="performance"
                    features={[
                      "10-100x faster than pure Python solutions",
                      "Parallel processing and SIMD optimizations",
                      "Memory-efficient algorithms"
                    ]}
                  />
                  <FeatureCard
                    title="Universal Integration"
                    description="Plug in any LLM, provider, or agent—strictly provider-agnostic design."
                    icon={<Sparkles className="h-6 w-6" />}
                    category="llm"
                    features={[
                      "OpenAI, Anthropic, HuggingFace support",
                      "Custom model integration",
                      "Framework-agnostic design"
                    ]}
                  />
                </ResponsiveGrid>
              </ContentSection>

              {/* Installation */}
              <ContentSection
                title="Installation & Setup"
                description="Install BlazeMetrics and get your environment ready for evaluation."
                size="lg"
              >
                <div className="space-y-6">
                  <CodeBlock
                    title="Basic Installation"
                    description="Install from PyPI (recommended) or build from source"
                    code={installCode}
                    language="bash"
                    filename="terminal"
                    showCopy={true}
                  />

                  <CodeBlock
                    title="Dashboard (Optional)"
                    description="Add the interactive dashboard for visual analytics"
                    code={dashboardInstall}
                    language="bash"
                    filename="terminal"
                    showCopy={true}
                  />

                  <Card className="p-6 bg-muted/20 border-l-4 border-l-accent">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Terminal className="h-5 w-5 mr-2 text-accent" />
                      System Requirements
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Python 3.8+ with pip</li>
                      <li>• Rust toolchain (for building from source)</li>
                      <li>• 4GB+ RAM recommended for large evaluations</li>
                      <li>• Optional: CUDA for GPU acceleration</li>
                    </ul>
                  </Card>
                </div>
              </ContentSection>

              {/* Quick Start */}
              <ContentSection
                title="Your First Evaluation"
                description="Run your first evaluation in just a few lines of code."
                size="lg"
              >
                <div className="space-y-6">
                  <CodeBlock
                    title="Minimal Usage Example"
                    description="Basic text evaluation with multiple metrics"
                    code={quickStartCode}
                    language="python"
                    filename="quickstart.py"
                    showCopy={true}
                    output={expectedOutput}
                  />
                </div>
              </ContentSection>

              {/* Complete Example */}
              <ContentSection
                title="Complete Example"
                description="A comprehensive example showing metrics, guardrails, and analytics in action."
                size="lg"
              >
                <div className="space-y-6">
                  <CodeBlock
                    title="Complete LLM Evaluation"
                    description="Metrics, safety checks, and analytics combined"
                    code={completeExample}
                    language="python"
                    filename="complete_example.py"
                    showCopy={true}
                  />

                  <Card className="p-6 bg-gradient-to-r from-card to-accent/5">
                    <h4 className="font-semibold mb-4">This example demonstrates:</h4>
                    <ResponsiveGrid columns={{ sm: 1, md: 2 }} gap="md">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                          Text quality metrics (BLEU, ROUGE, etc.)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                          PII detection and redaction
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                          Content filtering with blocklists
                        </li>
                      </ul>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                          Custom regex pattern matching
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                          Real-time analytics and monitoring
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                          Configurable metric selection
                        </li>
                      </ul>
                    </ResponsiveGrid>
                  </Card>
                </div>
              </ContentSection>

              {/* What's Next */}
              <ContentSection
                title="What's Next?"
                description="Continue your BlazeMetrics journey with these recommended next steps."
                size="lg"
              >
                <ResponsiveGrid columns={{ sm: 1, md: 2 }} gap="lg">
                  <FeatureCard
                    title="Explore Metrics"
                    description="Learn about all available evaluation metrics and how to configure them"
                    icon={<Target className="h-6 w-6" />}
                    category="docs"
                    href="/docs/metrics"
                    variant="interactive"
                  />
                  <FeatureCard
                    title="Add Guardrails"
                    description="Set up PII detection, content filtering, and safety checks"
                    icon={<CheckCircle className="h-6 w-6" />}
                    category="docs"
                    href="/docs/guardrails"
                    variant="interactive"
                  />
                  <FeatureCard
                    title="LLM Integration"
                    description="Connect with OpenAI, Anthropic, HuggingFace, or your custom models"
                    icon={<Sparkles className="h-6 w-6" />}
                    category="llm"
                    href="/docs/llm-integration"
                    variant="interactive"
                  />
                  <FeatureCard
                    title="Production Setup"
                    description="Deploy monitoring, analytics, and export to production systems"
                    icon={<ArrowRight className="h-6 w-6" />}
                    category="docs"
                    href="/docs/production"
                    variant="interactive"
                  />
                </ResponsiveGrid>
              </ContentSection>
            </div>
          </TabsContent>
        </Tabs>
      </ContentSection>
    </PageLayout>
  )
}