import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, CheckCircle, BarChart3, Zap, Target, Info } from "lucide-react"
import { useState } from "react"

export default function MetricsGuide() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const basicExample = `from blazemetrics import BlazeMetricsClient

client = BlazeMetricsClient(
    metrics_include=["rouge1", "rouge2", "rougeL", "bleu", "chrf", "meteor", "wer"],
    metrics_lowercase=True,
    metrics_stemming=False
)

candidates = [
    "The quick brown fox jumps over the lazy dog.",
    "Hello world, this is a test."
]
references = [
    ["The fast brown fox jumps over the lazy dog."],
    ["Hello World! This is only a test."]
]

# Compute selected metrics
metrics = client.compute_metrics(candidates, references)
agg_metrics = client.aggregate_metrics(metrics)

print("Sample-wise metrics:")
for k, vals in metrics.items():
    print(f"  {k}: {vals}")

print("\\nAggregate metrics:")
for k, v in agg_metrics.items():
    print(f"  {k}: {v:.3f}")`

  const parallelExample = `# For large datasets - parallel processing
metrics = client.compute_metrics_parallel(
    candidates=long_candidate_list, 
    references=long_reference_list, 
    chunksize=1000,
    include=["bleu", "rouge1", "rouge2", "rougeL"]
)

# Async processing
import asyncio
async def evaluate_async():
    metrics = await client.compute_metrics_async(
        candidates, references, 
        include=["bleu", "rouge1"]
    )
    return metrics

# Run async evaluation
metrics = asyncio.run(evaluate_async())`

  const customMetricExample = `from blazemetrics import BlazeMetricsClient

# Custom configuration for specific domain
client = BlazeMetricsClient(
    metrics_include=["bleu", "rouge1", "rouge2", "rougeL", "meteor", "chrf"],
    metrics_lowercase=True,
    metrics_stemming=True,  # Better for morphologically rich languages
    parallel_processing=True,
    max_workers=4
)

# Evaluate dialogue quality
candidates = ["Hello! How can I help you today?"]
references = [["Hi there! What can I do for you?"]]

# Get detailed breakdown
metrics = client.compute_metrics(candidates, references)

# Access individual scores (note: metrics return lists for each sample)
print(f"BLEU: {metrics['bleu'][0]:.3f}")
print(f"ROUGE-1 F1: {metrics['rouge1_f1'][0]:.3f}")
print(f"ROUGE-L F1: {metrics['rougeL_f1'][0]:.3f}")
print(f"METEOR: {metrics['meteor'][0]:.3f}")

# Aggregate scores across samples
aggregated = client.aggregate_metrics(metrics)
print("\\nAggregated scores:")
for metric, score in aggregated.items():
    print(f"  {metric}: {score:.3f}")

# Custom weighted aggregation
weights = [0.8, 0.2]  # Weight first sample more heavily
weighted_agg = client.aggregate_metrics(metrics, weights=weights)`

  const embeddingExample = `# Semantic similarity with embeddings
import numpy as np

# Your embeddings (from BERT, sentence-transformers, etc.)
candidate_embeddings = np.random.rand(100, 768).astype(np.float32)
reference_embeddings = np.random.rand(100, 768).astype(np.float32)

# Fast batch cosine similarity computation (Rust-accelerated)
similarities = client.batch_similarity(
    candidate_embeddings, 
    reference_embeddings
)
print(f"Similarities shape: {similarities.shape}")

# Semantic search with top-k retrieval
query_embeddings = np.random.rand(10, 768).astype(np.float32)
corpus_embeddings = np.random.rand(1000, 768).astype(np.float32)

search_results = client.semantic_search(
    query_embeddings,
    corpus_embeddings,
    top_k=5
)

# Results format: List[List[Tuple[int, float]]]
# Each query gets top-k (index, similarity_score) pairs
for i, query_results in enumerate(search_results):
    print(f"Query {i} top results:")
    for idx, score in query_results:
        print(f"  Document {idx}: {score:.3f}")

# BERTScore and MoverScore (if available)
try:
    bert_scores = client.bert_score_similarity(candidates, references)
    mover_scores = client.moverscore_greedy(candidates, references)
    print(f"BERTScore: {bert_scores}")
    print(f"MoverScore: {mover_scores}")
except Exception as e:
    print(f"Advanced embedding metrics require additional setup: {e}")`

  const metrics = [
    {
      name: "BLEU",
      category: "n-gram",
      description: "Bilingual Evaluation Understudy - measures n-gram precision with brevity penalty",
      useCase: "Machine translation, text generation quality",
      range: "0.0 - 1.0 (higher is better)",
      pros: ["Rust-accelerated computation", "Well-established baseline", "Good for fluency"],
      cons: ["Doesn't capture semantic meaning", "Sensitive to exact word matches"],
      example: "bleu: [0.847, 0.750]"
    },
    {
      name: "ROUGE-1/2/L",
      category: "n-gram",
      description: "Recall-Oriented Understudy for Gisting Evaluation - focuses on recall of n-grams",
      useCase: "Summarization, content coverage evaluation",
      range: "0.0 - 1.0 (higher is better)",
      pros: ["Good for summarization", "Captures content overlap", "F1, precision, recall variants"],
      cons: ["Word order not fully captured", "Synonyms not recognized"],
      example: "rouge1_f1: [0.923, 0.857], rouge2_f1: [0.756, 0.667], rougeL_f1: [0.889, 0.800]"
    },
    {
      name: "METEOR",
      category: "hybrid",
      description: "Combines precision, recall, and alignment with WordNet synonyms",
      useCase: "More nuanced text evaluation, handling synonyms",
      range: "0.0 - 1.0 (higher is better)",
      pros: ["Handles synonyms", "Better correlation with human judgment", "Considers word order"],
      cons: ["Requires WordNet", "Language-dependent", "Slower than n-gram metrics"],
      example: "meteor: [0.734, 0.680]"
    },
    {
      name: "CHRF",
      category: "character",
      description: "Character n-gram F-score - works at character level",
      useCase: "Morphologically rich languages, handling typos",
      range: "0.0 - 1.0 (higher is better)",
      pros: ["Language-agnostic", "Handles morphology", "Robust to spelling errors"],
      cons: ["May be too lenient", "Less intuitive", "Character-level focus"],
      example: "chrf: [0.691, 0.625]"
    },
    {
      name: "WER",
      category: "error-based",
      description: "Word Error Rate - percentage of word-level errors",
      useCase: "Speech recognition, exact accuracy measurement",
      range: "0.0+ (lower is better)",
      pros: ["Intuitive error measurement", "Standard in ASR", "Exact matching"],
      cons: ["Harsh penalty for synonyms", "No partial credit", "Word order sensitive"],
      example: "wer: [0.041, 0.125]"
    },
    {
      name: "Token F1",
      category: "token-based",
      description: "F1 score computed at token level with exact matching",
      useCase: "Named entity recognition, token classification",
      range: "0.0 - 1.0 (higher is better)",
      pros: ["Simple and interpretable", "Good for entity extraction", "Fast computation"],
      cons: ["Exact matching only", "No semantic understanding", "Sensitive to tokenization"],
      example: "token_f1: [0.856, 0.792]"
    },
    {
      name: "Jaccard",
      category: "set-based",
      description: "Jaccard similarity coefficient - intersection over union of token sets",
      useCase: "Set similarity, keyword matching",
      range: "0.0 - 1.0 (higher is better)",
      pros: ["Simple set-based metric", "Good for keyword overlap", "Order-independent"],
      cons: ["Ignores token frequency", "No semantic understanding", "May miss nuances"],
      example: "jaccard: [0.743, 0.667]"
    },
    {
      name: "BERTScore",
      category: "embedding",
      description: "Contextual embeddings similarity using BERT-based models",
      useCase: "Semantic similarity, paraphrase detection",
      range: "0.0 - 1.0 (higher is better)",
      pros: ["Captures semantic meaning", "Handles paraphrases", "Contextual understanding"],
      cons: ["Computationally expensive", "Requires model", "May be too lenient"],
      example: "bert_score_similarity: [0.912, 0.887]"
    },
    {
      name: "MoverScore",
      category: "embedding",
      description: "Earth Mover's Distance between contextualized embeddings",
      useCase: "Semantic similarity with alignment, abstractive summarization",
      range: "0.0 - 1.0 (higher is better)",
      pros: ["Handles word alignment", "Good for abstractive tasks", "Semantic understanding"],
      cons: ["Very computationally expensive", "Requires embeddings", "Complex to interpret"],
      example: "moverscore_greedy: [0.834, 0.798]"
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
              <BarChart3 className="h-8 w-8 text-accent mr-3" />
              <h1 className="text-3xl lg:text-4xl font-bold">
                <span className="gradient-text">Metrics Guide</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Comprehensive guide to evaluation metrics in BlazeMetrics. Learn when and how 
              to use each metric for optimal model evaluation.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">All Metrics</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Text Evaluation Metrics</h2>
              <p className="text-muted-foreground mb-6">
                BlazeMetrics provides a comprehensive suite of text evaluation metrics, 
                from traditional n-gram based measures to modern embedding-based approaches.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "N-gram Metrics",
                    description: "Fast, traditional metrics based on word/character overlap",
                    metrics: ["BLEU", "ROUGE", "CHRF"],
                    icon: Target,
                    color: "text-blue-500"
                  },
                  {
                    title: "Hybrid Metrics", 
                    description: "Combine multiple signals including synonyms and alignment",
                    metrics: ["METEOR", "Token-F1"],
                    icon: Zap,
                    color: "text-accent"
                  },
                  {
                    title: "Embedding Metrics",
                    description: "Semantic similarity using contextual embeddings",
                    metrics: ["BERTScore", "MoverScore"],
                    icon: BarChart3,
                    color: "text-green-500"
                  }
                ].map((category, index) => {
                  const Icon = category.icon
                  return (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="p-4 h-full">
                        <Icon className={`h-8 w-8 ${category.color} mb-3`} />
                        <h3 className="font-semibold mb-2">{category.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {category.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {category.metrics.map((metric) => (
                            <Badge key={metric} variant="outline" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              {/* Basic Usage */}
              <Card className="overflow-hidden">
                <div className="bg-muted/50 px-6 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Basic Usage Example</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(basicExample, 'basic')}
                    >
                      {copiedCode === 'basic' ? (
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
                  {basicExample}
                </SyntaxHighlighter>
              </Card>
            </Card>

            {/* Performance Optimization */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Performance Optimization</h3>
              <p className="text-muted-foreground mb-4">
                BlazeMetrics is designed for speed. Here are the key performance features:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Rust-Accelerated Core</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• SIMD vectorization for string operations</li>
                    <li>• Zero-copy processing where possible</li>
                    <li>• Memory-efficient data structures</li>
                    <li>• No Python GIL limitations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Parallel Processing</h4>
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
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-5 w-5 text-accent" />
                  <span className="font-medium">Rust-Powered Performance</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-2">
                      <strong>Core metrics (BLEU, ROUGE, CHRF):</strong> 1M+ evaluations/second
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>Embedding operations:</strong> 10-100x faster than pure Python
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">
                      <strong>Memory efficiency:</strong> Zero-copy operations where possible
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Parallelization:</strong> No Python GIL limitations
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* All Metrics */}
          <TabsContent value="metrics" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Complete Metrics Reference</h2>
              
              <div className="space-y-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-accent">{metric.name}</h3>
                            <Badge variant="outline">{metric.category}</Badge>
                          </div>
                          <p className="text-muted-foreground">{metric.description}</p>
                        </div>
                        <div className="text-right text-sm">
                          <div className="font-medium">Range</div>
                          <div className="text-muted-foreground">{metric.range}</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium text-green-600 mb-2">Best For</h4>
                          <p className="text-sm text-muted-foreground">{metric.useCase}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-blue-600 mb-2">Advantages</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {metric.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-orange-600 mb-2">Limitations</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {metric.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded p-3">
                        <div className="text-sm font-medium mb-1">Example Output:</div>
                        <code className="text-sm text-accent">{metric.example}</code>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Examples */}
          <TabsContent value="examples" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Usage Examples</h2>

              <div className="space-y-8">
                {/* Custom Configuration */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Custom Configuration & Aggregation</h3>
                  <Card className="overflow-hidden">
                    <div className="bg-muted/50 px-6 py-3 border-b">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Domain-Specific Evaluation</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(customMetricExample, 'custom')}
                        >
                          {copiedCode === 'custom' ? (
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
                      {customMetricExample}
                    </SyntaxHighlighter>
                  </Card>
                </div>

                {/* Embedding-based Metrics */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Semantic Similarity & Search</h3>
                  <Card className="overflow-hidden">
                    <div className="bg-muted/50 px-6 py-3 border-b">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Embedding-based Evaluation</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(embeddingExample, 'embedding')}
                        >
                          {copiedCode === 'embedding' ? (
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
                      {embeddingExample}
                    </SyntaxHighlighter>
                  </Card>
                </div>

                {/* Use Case Recommendations */}
                <Card className="p-6 bg-blaze-gradient-soft">
                  <h3 className="text-lg font-semibold mb-4">Metric Selection Guide</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-medium mb-3">For Machine Translation:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• <strong>BLEU:</strong> Standard baseline, good for fluency</li>
                        <li>• <strong>METEOR:</strong> Better correlation with human judgment</li>
                        <li>• <strong>CHRF:</strong> Good for morphologically rich languages</li>
                        <li>• <strong>BERTScore:</strong> Captures semantic adequacy</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">For Summarization:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• <strong>ROUGE-1/2/L:</strong> Content coverage and recall</li>
                        <li>• <strong>BERTScore:</strong> Semantic similarity to reference</li>
                        <li>• <strong>MoverScore:</strong> Handles abstractive summaries</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Advanced */}
          <TabsContent value="advanced" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Advanced Features</h2>

              <div className="space-y-6">
                {/* Batch Processing */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Batch Processing & Memory Management</h3>
                  <p className="text-muted-foreground mb-4">
                    For large-scale evaluation, BlazeMetrics provides sophisticated batching and memory management.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Automatic Chunking</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Configurable chunk sizes</li>
                        <li>• Memory-aware processing</li>
                        <li>• Progress tracking</li>
                        <li>• Error recovery</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Performance Tuning</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Worker thread configuration</li>
                        <li>• Memory pool optimization</li>
                        <li>• SIMD utilization control</li>
                        <li>• Cache-friendly data layout</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Custom Metrics */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Custom Metric Integration</h3>
                  <p className="text-muted-foreground mb-4">
                    Extend BlazeMetrics with your own evaluation functions while maintaining performance.
                  </p>

                  <Card className="p-3 bg-muted/50">
                    <code className="text-sm">
                      {`# Register custom metric
client.register_metric("custom_score", my_scoring_function)

# Use in evaluation pipeline  
metrics = client.compute_metrics(
    candidates, references,
    include=["bleu", "rouge1", "custom_score"]
)`}
                    </code>
                  </Card>
                </Card>

                {/* Production Deployment */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Production Deployment</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Streaming Processing",
                        features: ["Real-time evaluation", "Sliding windows", "Incremental updates"]
                      },
                      {
                        title: "Monitoring Integration",
                        features: ["Prometheus metrics", "Custom dashboards", "Alert rules"]
                      },
                      {
                        title: "Caching & Optimization",
                        features: ["Result caching", "Warm-up procedures", "Load balancing"]
                      }
                    ].map((feature) => (
                      <div key={feature.title} className="space-y-2">
                        <h4 className="font-medium">{feature.title}</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {feature.features.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}