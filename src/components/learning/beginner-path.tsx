import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { 
  CheckCircle, 
  Clock, 
  Play, 
  BookOpen, 
  Zap, 
  ArrowRight, 
  Target,
  Lightbulb,
  Copy,
  ChevronRight
} from "lucide-react"
import { useState } from "react"

interface LearningStep {
  id: string
  title: string
  duration: string
  description: string
  code?: string
  expectedOutput?: string
  tips?: string[]
  completed?: boolean
}

export default function BeginnerPath() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const markStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]))
    if (stepIndex === currentStep && stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1)
    }
  }

  const steps: LearningStep[] = [
    {
      id: "install",
      title: "Install BlazeMetrics",
      duration: "1 min",
      description: "Get BlazeMetrics installed and ready to use",
      code: `# Install BlazeMetrics
pip install blazemetrics

# Verify installation
python -c "import blazemetrics; print('✅ BlazeMetrics installed successfully!')"`,
      tips: [
        "Use a virtual environment to avoid conflicts",
        "Python 3.8+ is required",
        "Installation includes all core metrics"
      ]
    },
    {
      id: "first-eval",
      title: "Your First Evaluation",
      duration: "2 min",
      description: "Run your first text evaluation with minimal code",
      code: `from blazemetrics import BlazeMetricsClient

# Create a client
client = BlazeMetricsClient()

# Simple example: comparing two sentences
candidate = "The quick brown fox jumps over the lazy dog"
reference = ["The fast brown fox jumps over the lazy dog"]

# Compute metrics
metrics = client.compute_metrics([candidate], [reference])
print("Your first metrics:", metrics)`,
      expectedOutput: `Your first metrics: {
  'rouge1_f1': [0.923],
  'rouge2_f1': [0.756], 
  'bleu': [0.847],
  'meteor': [0.734]
}`,
      tips: [
        "References should be in lists (even for single references)",
        "Metrics are returned as lists (one value per candidate)",
        "Higher scores generally mean better quality"
      ]
    },
    {
      id: "understand-metrics",
      title: "Understanding Your Results",
      duration: "1 min",
      description: "Learn what the numbers mean and which metrics to focus on",
      tips: [
        "ROUGE-1: Measures word overlap (good for content coverage)",
        "BLEU: Measures n-gram precision (good for translation quality)",
        "METEOR: Considers synonyms and word order (balanced metric)",
        "Scores range from 0.0 (worst) to 1.0 (perfect match)"
      ]
    },
    {
      id: "multiple-examples",
      title: "Evaluate Multiple Texts",
      duration: "1 min", 
      description: "Scale up to evaluate multiple text pairs at once",
      code: `from blazemetrics import BlazeMetricsClient

client = BlazeMetricsClient()

# Multiple candidates and references
candidates = [
    "Hello world, this is a test.",
    "The weather is nice today.",
    "Machine learning is fascinating."
]

references = [
    ["Hello World! This is only a test."],
    ["Today the weather is beautiful."],
    ["AI and machine learning are amazing."]
]

# Compute metrics for all pairs
metrics = client.compute_metrics(candidates, references)

# Get average scores across all examples
averages = client.aggregate_metrics(metrics)
print("Average scores:", averages)`,
      expectedOutput: `Average scores: {
  'rouge1_f1': 0.856,
  'rouge2_f1': 0.623,
  'bleu': 0.734,
  'meteor': 0.689
}`,
      tips: [
        "Process multiple examples in one call for better performance",
        "Use aggregate_metrics() to get overall performance",
        "Individual scores help identify problematic examples"
      ]
    },
    {
      id: "simple-use-case",
      title: "Real-World Example: Chatbot Responses",
      duration: "2 min",
      description: "Apply BlazeMetrics to evaluate chatbot response quality",
      code: `from blazemetrics import BlazeMetricsClient

# Simulate chatbot evaluation
client = BlazeMetricsClient()

# Chatbot responses vs. ideal responses
chatbot_responses = [
    "I can help you with that. Let me check our inventory.",
    "Sorry, I don't understand your question.",
    "Your order has been processed successfully."
]

ideal_responses = [
    ["I'd be happy to help! Let me check our current inventory for you."],
    ["I apologize, but I didn't understand. Could you please rephrase your question?"],
    ["Great! Your order has been successfully processed and confirmed."]
]

# Evaluate response quality
metrics = client.compute_metrics(chatbot_responses, ideal_responses)
averages = client.aggregate_metrics(metrics)

print("Chatbot Quality Scores:")
for metric, score in averages.items():
    print(f"  {metric}: {score:.3f}")
    
# Identify which responses need improvement
for i, response in enumerate(chatbot_responses):
    rouge_score = metrics['rouge1_f1'][i]
    quality = "Good" if rouge_score > 0.7 else "Needs improvement"
    print(f"Response {i+1}: {quality} (ROUGE-1: {rouge_score:.3f})")`,
      expectedOutput: `Chatbot Quality Scores:
  rouge1_f1: 0.789
  rouge2_f1: 0.567
  bleu: 0.623
  meteor: 0.712

Response 1: Good (ROUGE-1: 0.823)
Response 2: Needs improvement (ROUGE-1: 0.645)
Response 3: Good (ROUGE-1: 0.901)`,
      tips: [
        "Use ROUGE-1 > 0.7 as a quality threshold for most use cases",
        "Lower scores indicate responses that may need improvement",
        "Combine multiple metrics for a complete quality picture"
      ]
    }
  ]

  const progressPercentage = (completedSteps.size / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center mb-4">
          <Target className="h-8 w-8 text-accent mr-3" />
          <h1 className="text-3xl font-bold">
            Beginner Learning Path
          </h1>
        </div>
        <p className="text-lg text-muted-foreground mb-6">
          Get started with BlazeMetrics in just 5 minutes. Follow these simple steps to run your first evaluation.
        </p>
        
        {/* Progress Bar */}
        <Card className="p-4 bg-gradient-to-r from-accent/5 to-accent/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedSteps.size} of {steps.length} completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </Card>
      </motion.div>

      {/* Learning Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(index)
          const isCurrent = index === currentStep
          const isAccessible = index <= currentStep || isCompleted

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`overflow-hidden transition-all duration-300 ${
                isCurrent ? 'ring-2 ring-accent shadow-blaze-lg' : 
                isCompleted ? 'bg-accent/5 border-accent/20' : 
                'opacity-75'
              }`}>
                {/* Step Header */}
                <div className={`px-6 py-4 border-b ${
                  isCurrent ? 'bg-gradient-to-r from-accent/10 to-accent/5' :
                  isCompleted ? 'bg-accent/5' : 'bg-muted/30'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-accent text-white' :
                        isCurrent ? 'bg-accent/20 text-accent' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{step.duration}</span>
                          {isCurrent && (
                            <Badge variant="secondary" className="ml-2">
                              Current Step
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {isAccessible && !isCompleted && (
                      <Button
                        onClick={() => markStepComplete(index)}
                        size="sm"
                        className="ml-4"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>

                {/* Step Content */}
                {isAccessible && (
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4">{step.description}</p>

                    {/* Code Example */}
                    {step.code && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium flex items-center">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Code Example
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(step.code!, `${step.id}-code`)}
                          >
                            {copiedCode === `${step.id}-code` ? (
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
                              padding: '1rem',
                              background: 'hsl(var(--brand-navy))'
                            }}
                          >
                            {step.code}
                          </SyntaxHighlighter>
                        </Card>
                      </div>
                    )}

                    {/* Expected Output */}
                    {step.expectedOutput && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-accent" />
                          Expected Output
                        </h4>
                        <Card className="p-3 bg-muted/50">
                          <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                            {step.expectedOutput}
                          </pre>
                        </Card>
                      </div>
                    )}

                    {/* Tips */}
                    {step.tips && step.tips.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2 text-performance-average" />
                          Pro Tips
                        </h4>
                        <ul className="space-y-2">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start text-sm">
                              <ChevronRight className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Complete Step Button */}
                    {isAccessible && !isCompleted && (
                      <div className="flex justify-end pt-4 border-t">
                        <Button
                          onClick={() => markStepComplete(index)}
                          className="flex items-center"
                        >
                          Mark Complete
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Completion Message */}
      {completedSteps.size === steps.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-r from-accent/10 to-performance-excellent/10 border-accent/20">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Congratulations! 🎉</h3>
              <p className="text-muted-foreground mb-4">
                You've completed the beginner learning path. You now know how to install BlazeMetrics, 
                run evaluations, and understand the results.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild>
                  <a href="/docs/metrics">
                    Explore More Metrics
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/use-cases">
                    See Use Cases
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}