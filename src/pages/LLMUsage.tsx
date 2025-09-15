import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  Code, 
  Play, 
  Copy, 
  ExternalLink,
  CheckCircle,
  Zap,
  Shield,
  BarChart3
} from "lucide-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const llmProviders = [
  {
    name: "OpenAI",
    description: "GPT-4, GPT-3.5, and Embeddings",
    icon: "🤖",
    color: "bg-green-500/10 text-green-500",
    features: ["GPT-4 Turbo", "Function Calling", "Embeddings", "Fine-tuning"],
    example: `from blazemetrics import BlazeMetricsClient
import openai

# Initialize BlazeMetrics with OpenAI
client = BlazeMetricsClient()
openai.api_key = "your-api-key"

# Generate responses
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Explain quantum computing"}]
)

# Evaluate with BlazeMetrics
candidates = [response.choices[0].message.content]
references = [["A quantum computer uses quantum mechanics..."]]

metrics = client.compute_metrics(candidates, references)
safety = client.check_safety(candidates)

print(f"BLEU Score: {metrics['bleu']:.3f}")
print(f"Safety Check: {'✓' if safety[0]['safe'] else '✗'}")
`,
    tutorial: "/docs/llm/openai"
  },
  {
    name: "Anthropic",
    description: "Claude 3 Opus, Sonnet, and Haiku",
    icon: "🧠",
    color: "bg-purple-500/10 text-purple-500",
    features: ["Claude 3 Opus", "Constitutional AI", "Long Context", "Tool Use"],
    example: `from blazemetrics import BlazeMetricsClient
import anthropic

# Initialize clients
client = BlazeMetricsClient()
claude = anthropic.Anthropic(api_key="your-api-key")

# Generate with Claude
message = claude.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1000,
    messages=[{"role": "user", "content": "Write a summary of AI ethics"}]
)

# Real-time evaluation and safety
candidates = [message.content[0].text]

# Comprehensive evaluation
result = client.evaluate_comprehensive(
    candidates=candidates,
    references=[["AI ethics involves..."]], 
    check_safety=True,
    check_factuality=True,
    detect_bias=True
)

print(f"Overall Score: {result['overall_score']:.3f}")
print(f"Safety: {result['safety_score']:.3f}")
print(f"Factuality: {result['factuality_score']:.3f}")
`,
    tutorial: "/docs/llm/anthropic"
  },
  {
    name: "HuggingFace",
    description: "Open source models and transformers",
    icon: "🤗",
    color: "bg-yellow-500/10 text-yellow-500",
    features: ["Transformers", "Datasets", "AutoModel", "Pipeline"],
    example: `from blazemetrics import BlazeMetricsClient
from transformers import pipeline, AutoTokenizer, AutoModel

# Initialize BlazeMetrics with HF model
client = BlazeMetricsClient()
generator = pipeline("text-generation", model="microsoft/DialoGPT-large")

# Generate responses
prompt = "Hello, how are you?"
response = generator(prompt, max_length=50, num_return_sequences=1)
generated_text = response[0]['generated_text']

# Evaluate dialogue quality
candidates = [generated_text]
references = [["Hello! I'm doing well, thank you for asking."]]

# Advanced evaluation for dialogue
metrics = client.evaluate_dialogue(
    candidates=candidates,
    references=references,
    context=[prompt],
    metrics=["bleu", "rouge", "dialogue_coherence", "engagement"]
)

print(f"BLEU: {metrics['bleu']:.3f}")
print(f"Dialogue Coherence: {metrics['dialogue_coherence']:.3f}")
print(f"Engagement Score: {metrics['engagement']:.3f}")
`,
    tutorial: "/docs/llm/huggingface"
  },
  {
    name: "Custom Models",
    description: "Your own models and APIs",
    icon: "⚙️", 
    color: "bg-blue-500/10 text-blue-500",
    features: ["REST APIs", "gRPC", "Local Models", "Custom Scoring"],
    example: `from blazemetrics import BlazeMetricsClient
import requests

# Initialize BlazeMetrics with custom model
client = BlazeMetricsClient()

def call_custom_model(prompt):
    """Call your custom model API"""
    response = requests.post(
        "https://your-model-api.com/generate",
        json={"prompt": prompt, "max_tokens": 100},
        headers={"Authorization": "Bearer your-token"}
    )
    return response.json()["generated_text"]

# Generate and evaluate
prompt = "Summarize the benefits of renewable energy"
generated = call_custom_model(prompt)

# Custom evaluation pipeline
result = client.evaluate_custom(
    generated_text=generated,
    prompt=prompt,
    domain="sustainability",
    custom_metrics=[
        "domain_relevance", 
        "factual_accuracy",
        "clarity_score"
    ]
)

# Export results for monitoring
client.export_to_prometheus(result, labels={
    "model": "custom-summarizer",
    "domain": "sustainability"
})

print(f"Domain Relevance: {result['domain_relevance']:.3f}")
print(f"Factual Accuracy: {result['factual_accuracy']:.3f}")
`,
    tutorial: "/docs/llm/custom"
  }
]

export default function LLMUsage() {
  const [activeProvider, setActiveProvider] = useState(0)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, provider: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(provider)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const runExample = (provider: string) => {
    // In a real implementation, this would execute the code
    console.log(`Running ${provider} example...`)
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Brain className="h-12 w-12 text-accent mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="gradient-text">LLM Integration</span> Examples
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Complete integration examples for popular LLM providers. 
              Copy, paste, and run real evaluation code in your environment.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {llmProviders.map((provider, index) => (
                <Badge key={provider.name} className={provider.color}>
                  {provider.icon} {provider.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs value={llmProviders[activeProvider].name.toLowerCase()} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              {llmProviders.map((provider, index) => (
                <TabsTrigger 
                  key={provider.name} 
                  value={provider.name.toLowerCase()}
                  onClick={() => setActiveProvider(index)}
                  className="flex items-center space-x-2"
                >
                  <span>{provider.icon}</span>
                  <span className="hidden sm:inline">{provider.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {llmProviders.map((provider, index) => (
              <TabsContent key={provider.name} value={provider.name.toLowerCase()}>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Provider Info */}
                  <div className="space-y-6">
                    <Card className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-2xl">{provider.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {provider.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Supported Features:</h4>
                        <ul className="space-y-2">
                          {provider.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-accent mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 space-y-2">
                        <Button className="w-full" asChild>
                          <a href={provider.tutorial}>
                            <Code className="h-4 w-4 mr-2" />
                            Full Tutorial
                          </a>
                        </Button>
                        {/* <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => runExample(provider.name)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Run Example
                        </Button> */}
                      </div>
                    </Card>

                    {/* Performance Notes */}
                    <Card className="p-4 bg-blaze-gradient-soft">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span className="font-medium text-sm">Performance Tips</span>
                      </div>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Use batch evaluation for multiple samples</li>
                        <li>• Enable parallel processing for speed</li>
                        <li>• Cache frequent model outputs</li>
                        <li>• Monitor with real-time dashboard</li>
                      </ul>
                    </Card>

                    {/* Security Notes */}
                    <Card className="p-4 border-accent/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-4 w-4 text-accent" />
                        <span className="font-medium text-sm">Security Best Practices</span>
                      </div>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Always check for PII before sending to APIs</li>
                        <li>• Use environment variables for API keys</li>
                        <li>• Enable safety guardrails in production</li>
                        <li>• Log and monitor all evaluations</li>
                      </ul>
                    </Card>
                  </div>

                  {/* Code Example */}
                  <div className="lg:col-span-2">
                    <Card className="overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-muted/30 border-b">
                        <div className="flex items-center space-x-2">
                          <Code className="h-4 w-4" />
                          <span className="font-medium">
                            {provider.name} Integration Example
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(provider.example, provider.name)}
                          >
                            {copiedCode === provider.name ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <a href={provider.tutorial}>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div className="relative">
                        <SyntaxHighlighter
                          language="python"
                          style={oneDark}
                          customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.5',
                            background: 'hsl(var(--brand-navy))'
                          }}
                        >
                          {provider.example}
                        </SyntaxHighlighter>

                        {/* Floating performance indicator */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute top-4 right-4 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium"
                        >
                          ⚡ ~100ms eval time
                        </motion.div>
                      </div>
                    </Card>

                    {/* Expected Output */}
                    <Card className="mt-4 p-4">
                      <h4 className="font-medium mb-2">Expected Output:</h4>
                      <div className="bg-muted/50 rounded p-3 font-mono text-sm space-y-1">
                        <div className="text-green-600">BLEU Score: 0.847</div>
                        <div className="text-green-600">Safety Check: ✓</div>
                        <div className="text-blue-600">Evaluation completed in 0.12s</div>
                        {provider.name === "Anthropic" && (
                          <>
                            <div className="text-purple-600">Overall Score: 0.892</div>
                            <div className="text-purple-600">Factuality: 0.935</div>
                          </>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            More Integration Resources
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Batch Processing",
                description: "Evaluate thousands of samples efficiently",
                href: "/docs/batch-processing",
                icon: Zap
              },
              {
                title: "Real-time Monitoring", 
                description: "Monitor model performance in production",
                href: "/docs/monitoring",
                icon: BarChart3
              },
              {
                title: "Custom Metrics",
                description: "Build domain-specific evaluation metrics",
                href: "/docs/custom-metrics", 
                icon: Code
              }
            ].map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 group hover:shadow-lg transition-shadow">
                    <Icon className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <Button variant="ghost" className="p-0 group-hover:text-black">
                      Learn more
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}