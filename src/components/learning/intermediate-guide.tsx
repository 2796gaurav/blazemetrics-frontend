import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { 
  Settings, 
  Zap, 
  Shield, 
  BarChart3, 
  Copy, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb,
  Code,
  Database,
  Globe,
  TrendingUp,
  Wrench,
  BookOpen
} from "lucide-react"
import { useState } from "react"

export default function IntermediateGuide() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const bestPracticesCode = `from blazemetrics import BlazeMetricsClient

# Production-ready configuration
client = BlazeMetricsClient(
    # Performance optimization
    metrics_include=["rouge1", "rouge2", "bleu", "meteor"],  # Only needed metrics
    metrics_lowercase=True,  # Normalize case for consistency
    batch_size=100,  # Process in batches for memory efficiency
    
    # Guardrails and safety
    redact_pii=True,
    blocklist=["sensitive", "confidential"],
    regexes=[r"\\b\\d{3}-\\d{2}-\\d{4}\\b"],  # SSN pattern
    
    # Analytics and monitoring
    enable_analytics=True,
    analytics_window=1000,
    analytics_alerts=True,
    
    # Export configuration
    export_format="json",
    export_path="./metrics_output/",
    
    # Advanced settings
    case_insensitive=True,
    parallel_processing=True,
    cache_embeddings=True
)

# Best practice: Always validate inputs
def evaluate_with_validation(candidates, references):
    # Input validation
    if not candidates or not references:
        raise ValueError("Candidates and references cannot be empty")
    
    if len(candidates) != len(references):
        raise ValueError("Candidates and references must have same length")
    
    # Compute metrics with error handling
    try:
        metrics = client.compute_metrics(candidates, references)
        aggregated = client.aggregate_metrics(metrics)
        
        # Log results for monitoring
        print(f"Processed {len(candidates)} examples")
        print(f"Average ROUGE-1: {aggregated.get('rouge1_f1', 0):.3f}")
        
        return metrics, aggregated
        
    except Exception as e:
        print(f"Evaluation failed: {e}")
        return None, None

# Usage
candidates = ["Your model outputs here..."]
references = [["Reference texts here..."]]
metrics, agg = evaluate_with_validation(candidates, references)`

  const configOptimizationCode = `from blazemetrics import BlazeMetricsClient

# Configuration for different use cases

# 1. High-speed evaluation (minimal metrics)
speed_client = BlazeMetricsClient(
    metrics_include=["rouge1", "bleu"],  # Only essential metrics
    parallel_processing=True,
    batch_size=500,  # Larger batches
    cache_embeddings=True
)

# 2. Comprehensive evaluation (all metrics)
comprehensive_client = BlazeMetricsClient(
    metrics_include="all",  # All available metrics
    enable_analytics=True,
    export_format="detailed_json"
)

# 3. Production monitoring (with guardrails)
production_client = BlazeMetricsClient(
    # Core metrics for monitoring
    metrics_include=["rouge1", "rouge2", "meteor"],
    
    # Safety and compliance
    redact_pii=True,
    blocklist_file="./config/blocklist.txt",
    regexes_file="./config/patterns.txt",
    
    # Real-time analytics
    enable_analytics=True,
    analytics_window=10000,
    analytics_alerts=True,
    alert_thresholds={
        "rouge1_f1": 0.5,  # Alert if quality drops below 50%
        "safety_violations": 0.01  # Alert if >1% violations
    },
    
    # Export for downstream systems
    export_format="prometheus",  # For monitoring dashboards
    export_interval=300  # Export every 5 minutes
)

# 4. Research/experimentation (flexible configuration)
research_client = BlazeMetricsClient(
    metrics_include="all",
    custom_metrics={
        "domain_specific": lambda c, r: custom_domain_metric(c, r)
    },
    enable_detailed_logging=True,
    export_raw_scores=True
)`

  const troubleshootingCode = `from blazemetrics import BlazeMetricsClient
import logging

# Enable detailed logging for troubleshooting
logging.basicConfig(level=logging.DEBUG)

client = BlazeMetricsClient(enable_detailed_logging=True)

# Common issue 1: Memory errors with large datasets
def handle_large_dataset(candidates, references):
    """Process large datasets in chunks to avoid memory issues"""
    chunk_size = 100
    all_metrics = {}
    
    for i in range(0, len(candidates), chunk_size):
        chunk_candidates = candidates[i:i+chunk_size]
        chunk_references = references[i:i+chunk_size]
        
        try:
            chunk_metrics = client.compute_metrics(chunk_candidates, chunk_references)
            
            # Merge results
            for metric, values in chunk_metrics.items():
                if metric not in all_metrics:
                    all_metrics[metric] = []
                all_metrics[metric].extend(values)
                
        except MemoryError:
            print(f"Memory error at chunk {i//chunk_size + 1}, reducing chunk size")
            # Recursively handle with smaller chunks
            return handle_large_dataset(candidates, references)
    
    return all_metrics

# Common issue 2: Handling different text encodings
def handle_encoding_issues(texts):
    """Clean and normalize text encoding"""
    cleaned_texts = []
    for text in texts:
        try:
            # Normalize unicode
            import unicodedata
            normalized = unicodedata.normalize('NFKD', text)
            
            # Remove non-printable characters
            cleaned = ''.join(char for char in normalized if char.isprintable() or char.isspace())
            cleaned_texts.append(cleaned)
            
        except UnicodeError:
            print(f"Encoding error in text: {text[:50]}...")
            # Fallback to ASCII
            cleaned_texts.append(text.encode('ascii', 'ignore').decode('ascii'))
    
    return cleaned_texts

# Common issue 3: Handling empty or invalid inputs
def robust_evaluation(candidates, references):
    """Robust evaluation with input validation and error handling"""
    
    # Filter out empty inputs
    valid_pairs = []
    for i, (cand, ref_list) in enumerate(zip(candidates, references)):
        if cand and cand.strip() and ref_list and any(r.strip() for r in ref_list):
            valid_pairs.append((cand.strip(), [r.strip() for r in ref_list if r.strip()]))
        else:
            print(f"Skipping invalid pair at index {i}")
    
    if not valid_pairs:
        print("No valid candidate-reference pairs found")
        return None
    
    valid_candidates, valid_references = zip(*valid_pairs)
    
    try:
        return client.compute_metrics(list(valid_candidates), list(valid_references))
    except Exception as e:
        print(f"Evaluation failed: {e}")
        return None`

  const integrationCode = `# Integration with popular frameworks

# 1. LangChain Integration
from blazemetrics.integrations import LangChainEvaluator
from langchain.chains import LLMChain

langchain_evaluator = LangChainEvaluator(
    metrics=["rouge1", "rouge2", "bleu"],
    enable_guardrails=True
)

# Automatically evaluate LangChain outputs
chain = LLMChain(...)
result = chain.run("Your prompt")
evaluation = langchain_evaluator.evaluate(result, reference="Expected output")

# 2. HuggingFace Integration
from blazemetrics.integrations import HuggingFaceEvaluator
from transformers import pipeline

hf_evaluator = HuggingFaceEvaluator()
generator = pipeline("text-generation", model="gpt2")

# Evaluate generated text
generated = generator("Once upon a time", max_length=50)
evaluation = hf_evaluator.evaluate(
    generated[0]['generated_text'], 
    reference="Your reference story"
)

# 3. OpenAI Integration
from blazemetrics.integrations import OpenAIEvaluator
import openai

openai_evaluator = OpenAIEvaluator(
    api_key="your-api-key",
    model="gpt-3.5-turbo",
    enable_safety_checks=True
)

# Evaluate OpenAI responses
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Explain quantum computing"}]
)

evaluation = openai_evaluator.evaluate(
    response.choices[0].message.content,
    reference="Your reference explanation"
)

# 4. Custom Framework Integration
class CustomFrameworkEvaluator:
    def __init__(self):
        self.client = BlazeMetricsClient(
            metrics_include=["rouge1", "rouge2", "meteor"],
            enable_analytics=True
        )
    
    def evaluate_batch(self, model_outputs, references):
        """Evaluate a batch of model outputs"""
        metrics = self.client.compute_metrics(model_outputs, references)
        
        # Add custom business logic
        for i, output in enumerate(model_outputs):
            if metrics['rouge1_f1'][i] < 0.5:
                print(f"Low quality output detected at index {i}")
        
        return self.client.aggregate_metrics(metrics)
    
    def continuous_evaluation(self, model, test_dataset):
        """Continuously evaluate model performance"""
        results = []
        
        for batch in test_dataset:
            outputs = model.generate(batch['inputs'])
            evaluation = self.evaluate_batch(outputs, batch['references'])
            results.append(evaluation)
            
            # Real-time monitoring
            if evaluation['rouge1_f1'] < 0.6:
                print("⚠️  Model performance degradation detected!")
        
        return results`

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center mb-4">
          <Settings className="h-8 w-8 text-accent mr-3" />
          <h1 className="text-3xl font-bold">
            Intermediate User Guide
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Master BlazeMetrics with advanced configurations, best practices, and framework integrations.
        </p>
      </motion.div>

      {/* Content Tabs */}
      <Tabs defaultValue="best-practices" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="best-practices" className="flex items-center space-x-2">
            <Lightbulb className="h-4 w-4" />
            <span>Best Practices</span>
          </TabsTrigger>
          <TabsTrigger value="configuration" className="flex items-center space-x-2">
            <Wrench className="h-4 w-4" />
            <span>Configuration</span>
          </TabsTrigger>
          <TabsTrigger value="troubleshooting" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Troubleshooting</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Integrations</span>
          </TabsTrigger>
        </TabsList>

        {/* Best Practices Tab */}
        <TabsContent value="best-practices">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Lightbulb className="h-6 w-6 text-accent mr-2" />
                Production Best Practices
              </h2>
              <p className="text-muted-foreground mb-6">
                Follow these practices to ensure reliable, efficient evaluation in production environments.
              </p>

              <div className="space-y-6">
                {/* Code Example */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Production-Ready Configuration</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bestPracticesCode, 'best-practices')}
                    >
                      {copiedCode === 'best-practices' ? (
                        <CheckCircle className="h-4 w-4 text-performance-excellent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Card className="overflow-hidden">
                    <SyntaxHighlighter
                      language="python"
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'hsl(var(--brand-navy))'
                      }}
                    >
                      {bestPracticesCode}
                    </SyntaxHighlighter>
                  </Card>
                </div>

                {/* Best Practices List */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-4 border-l-4 border-l-performance-excellent">
                    <h4 className="font-semibold text-performance-excellent mb-2 flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      Performance Optimization
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Use only necessary metrics to reduce computation</li>
                      <li>• Enable parallel processing for large datasets</li>
                      <li>• Cache embeddings when evaluating similar texts</li>
                      <li>• Process in batches to manage memory usage</li>
                    </ul>
                  </Card>

                  <Card className="p-4 border-l-4 border-l-brand-crimson">
                    <h4 className="font-semibold text-brand-crimson mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Safety & Compliance
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Always enable PII redaction in production</li>
                      <li>• Maintain updated blocklists and regex patterns</li>
                      <li>• Set up safety violation alerts</li>
                      <li>• Log all safety checks for audit trails</li>
                    </ul>
                  </Card>

                  <Card className="p-4 border-l-4 border-l-accent">
                    <h4 className="font-semibold text-accent mb-2 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Monitoring & Analytics
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Enable analytics for trend monitoring</li>
                      <li>• Set appropriate alert thresholds</li>
                      <li>• Export metrics to monitoring systems</li>
                      <li>• Track performance degradation over time</li>
                    </ul>
                  </Card>

                  <Card className="p-4 border-l-4 border-l-brand-slate">
                    <h4 className="font-semibold text-brand-slate mb-2 flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      Code Quality
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Always validate inputs before evaluation</li>
                      <li>• Implement proper error handling</li>
                      <li>• Use type hints and documentation</li>
                      <li>• Write unit tests for custom configurations</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="configuration">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Wrench className="h-6 w-6 text-accent mr-2" />
                Advanced Configuration
              </h2>
              <p className="text-muted-foreground mb-6">
                Optimize BlazeMetrics configuration for different use cases and requirements.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Use Case-Specific Configurations</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(configOptimizationCode, 'config')}
                    >
                      {copiedCode === 'config' ? (
                        <CheckCircle className="h-4 w-4 text-performance-excellent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Card className="overflow-hidden">
                    <SyntaxHighlighter
                      language="python"
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'hsl(var(--brand-navy))'
                      }}
                    >
                      {configOptimizationCode}
                    </SyntaxHighlighter>
                  </Card>
                </div>

                {/* Configuration Guidelines */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-performance-excellent" />
                      Performance Tuning
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Small datasets (&lt;1K):</span>
                        <code className="bg-muted px-1 rounded">batch_size=50</code>
                      </div>
                      <div className="flex justify-between">
                        <span>Medium datasets (1K-10K):</span>
                        <code className="bg-muted px-1 rounded">batch_size=200</code>
                      </div>
                      <div className="flex justify-between">
                        <span>Large datasets (&gt;10K):</span>
                        <code className="bg-muted px-1 rounded">batch_size=500</code>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Database className="h-4 w-4 mr-2 text-accent" />
                      Memory Management
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Low memory (&lt;4GB):</span>
                        <code className="bg-muted px-1 rounded">batch_size=25</code>
                      </div>
                      <div className="flex justify-between">
                        <span>Medium memory (4-8GB):</span>
                        <code className="bg-muted px-1 rounded">batch_size=100</code>
                      </div>
                      <div className="flex justify-between">
                        <span>High memory (&gt;8GB):</span>
                        <code className="bg-muted px-1 rounded">batch_size=500</code>
                      </div>
                    </div>
                  </Card>
                </div>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Pro Tip:</strong> Start with conservative settings and gradually increase batch sizes 
                    while monitoring memory usage. Enable detailed logging to identify bottlenecks.
                  </AlertDescription>
                </Alert>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Troubleshooting Tab */}
        <TabsContent value="troubleshooting">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-performance-average mr-2" />
                Common Issues & Solutions
              </h2>
              <p className="text-muted-foreground mb-6">
                Resolve common problems and optimize your BlazeMetrics implementation.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Troubleshooting Code Examples</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(troubleshootingCode, 'troubleshooting')}
                    >
                      {copiedCode === 'troubleshooting' ? (
                        <CheckCircle className="h-4 w-4 text-performance-excellent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Card className="overflow-hidden">
                    <SyntaxHighlighter
                      language="python"
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'hsl(var(--brand-navy))'
                      }}
                    >
                      {troubleshootingCode}
                    </SyntaxHighlighter>
                  </Card>
                </div>

                {/* Common Issues */}
                <div className="space-y-4">
                  <Card className="p-4 border-l-4 border-l-performance-poor">
                    <h4 className="font-semibold text-performance-poor mb-2">Memory Errors</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Large datasets can cause out-of-memory errors.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Reduce batch_size parameter</li>
                      <li>• Process data in chunks</li>
                      <li>• Disable embedding caching for very large datasets</li>
                      <li>• Use streaming evaluation for continuous data</li>
                    </ul>
                  </Card>

                  <Card className="p-4 border-l-4 border-l-performance-average">
                    <h4 className="font-semibold text-performance-average mb-2">Slow Performance</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Evaluation taking longer than expected.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Enable parallel_processing=True</li>
                      <li>• Reduce number of metrics computed</li>
                      <li>• Increase batch_size if memory allows</li>
                      <li>• Cache embeddings for repeated evaluations</li>
                    </ul>
                  </Card>

                  <Card className="p-4 border-l-4 border-l-brand-crimson">
                    <h4 className="font-semibold text-brand-crimson mb-2">Encoding Issues</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Unicode or special character problems.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Normalize unicode before evaluation</li>
                      <li>• Remove non-printable characters</li>
                      <li>• Use UTF-8 encoding consistently</li>
                      <li>• Handle mixed-language content properly</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Globe className="h-6 w-6 text-accent mr-2" />
                Framework Integrations
              </h2>
              <p className="text-muted-foreground mb-6">
                Integrate BlazeMetrics with popular ML frameworks and platforms.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Integration Examples</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(integrationCode, 'integrations')}
                    >
                      {copiedCode === 'integrations' ? (
                        <CheckCircle className="h-4 w-4 text-performance-excellent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Card className="overflow-hidden">
                    <SyntaxHighlighter
                      language="python"
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'hsl(var(--brand-navy))'
                      }}
                    >
                      {integrationCode}
                    </SyntaxHighlighter>
                  </Card>
                </div>

                {/* Integration Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-accent" />
                      LangChain
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Automatic evaluation of LangChain chain outputs
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Built-in chain evaluation</li>
                      <li>• Automatic prompt optimization</li>
                      <li>• Real-time quality monitoring</li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-performance-excellent" />
                      HuggingFace
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Evaluate Transformers model outputs
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Pipeline integration</li>
                      <li>• Model comparison tools</li>
                      <li>• Batch evaluation support</li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-brand-slate" />
                      OpenAI
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Direct integration with OpenAI API
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• GPT model evaluation</li>
                      <li>• Safety check integration</li>
                      <li>• Cost optimization tracking</li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Code className="h-4 w-4 mr-2 text-brand-crimson" />
                      Custom Frameworks
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Build your own integration patterns
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Flexible API design</li>
                      <li>• Custom metric support</li>
                      <li>• Extensible architecture</li>
                    </ul>
                  </Card>
                </div>

                <Alert>
                  <Globe className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Integration Support:</strong> Need help integrating with a specific framework? 
                    Check our examples directory or reach out to our community for custom integration patterns.
                  </AlertDescription>
                </Alert>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}