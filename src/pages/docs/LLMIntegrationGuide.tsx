import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Code, Zap, Shield } from 'lucide-react';

const LLMIntegrationGuide: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">LLM Integration Guide</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Comprehensive guide to integrating BlazeMetrics with OpenAI, Anthropic, HuggingFace, and custom LLM providers
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary"><Zap className="w-3 h-3 mr-1" />Universal Adapters</Badge>
          <Badge variant="secondary"><Shield className="w-3 h-3 mr-1" />Auto Evaluation</Badge>
          <Badge variant="secondary"><Code className="w-3 h-3 mr-1" />Zero Config</Badge>
        </div>
      </div>

      <Alert className="mb-8">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          BlazeMetrics provides universal LLM adapters that automatically inject evaluation and safety checks into your LLM calls, 
          supporting OpenAI, Anthropic, HuggingFace, and custom models with zero configuration changes.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="openai">OpenAI</TabsTrigger>
          <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
          <TabsTrigger value="huggingface">HuggingFace</TabsTrigger>
          <TabsTrigger value="custom">Custom Models</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Universal LLM Adapters
              </CardTitle>
              <CardDescription>
                Seamless integration with automatic evaluation injection for all major LLM providers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Supported Providers</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• OpenAI (GPT-3.5, GPT-4, GPT-4o)</li>
                    <li>• Anthropic (Claude 3, Claude 2)</li>
                    <li>• HuggingFace (API & Local)</li>
                    <li>• Custom BYOM (Bring Your Own Model)</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Auto Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Prompt injection detection</li>
                    <li>• Real-time safety checks</li>
                    <li>• PII detection & redaction</li>
                    <li>• Streaming evaluation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Quick Start Example</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`from blazemetrics.llm_providers.factory import create_openai_adapter
from blazemetrics.llm_providers.base import EvaluationConfig, EvaluationType

# Create adapter with automatic evaluation
config = EvaluationConfig(
    enabled_evaluations=[
        EvaluationType.PROMPT_INJECTION,
        EvaluationType.SAFETY_CHECK,
        EvaluationType.PII_DETECTION
    ],
    streaming_evaluation=True,
    block_on_violation=False
)

adapter = create_openai_adapter(
    api_key="your-api-key",
    evaluation_config=config
)

# Generate with automatic evaluation
response = await adapter.generate("Hello, how are you?")
print(f"Response: {response.content}")
print(f"Safety passed: {response.safety_passed}")
print(f"Evaluations: {len(response.evaluation_results)}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Detection & Factory Pattern</CardTitle>
              <CardDescription>
                Automatic provider detection based on API keys and model names
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                <code>{`from blazemetrics.llm_providers.factory import LLMAdapterFactory

# Automatic provider detection
test_cases = [
    {
        "api_key": "sk-test123",
        "model_name": "gpt-4",
        "expected": "openai"
    },
    {
        "api_key": "sk-ant-test123", 
        "model_name": "claude-3-sonnet",
        "expected": "anthropic"
    },
    {
        "model_name": "microsoft/DialoGPT-medium",
        "expected": "huggingface"
    }
]

for case in test_cases:
    detected = LLMAdapterFactory.auto_detect_provider(
        api_key=case.get("api_key"),
        model_name=case.get("model_name")
    )
    print(f"{case['model_name']}: {detected}")`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="openai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img src="https://openai.com/favicon.ico" alt="OpenAI" className="w-5 h-5" />
                OpenAI Integration
              </CardTitle>
              <CardDescription>
                Complete integration guide for OpenAI GPT models with automatic evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Requires OpenAI API key. Install with: <code>pip install openai</code>
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">Basic Setup</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics.llm_providers.factory import create_openai_adapter
from blazemetrics.llm_providers.base import EvaluationConfig, EvaluationType
import os

# Configure evaluation settings
eval_config = EvaluationConfig(
    enabled_evaluations=[
        EvaluationType.PROMPT_INJECTION,
        EvaluationType.SAFETY_CHECK,
        EvaluationType.PII_DETECTION,
        EvaluationType.TOXICITY_CHECK
    ],
    parallel_evaluation=True,
    streaming_evaluation=True,
    block_on_violation=False,  # Set to True for strict blocking
    violation_threshold=0.8
)

# Create OpenAI adapter
adapter = create_openai_adapter(
    api_key=os.getenv("OPENAI_API_KEY"),
    evaluation_config=eval_config
)

# Generate with evaluation
response = await adapter.generate(
    prompt="Explain quantum computing",
    model="gpt-4o",
    temperature=0.7,
    max_tokens=500
)

print(f"Response: {response.content}")
print(f"Model: {response.model}")
print(f"Provider: {response.provider}")
print(f"Safety passed: {response.safety_passed}")
print(f"Latency: {response.latency_ms}ms")
print(f"Usage: {response.usage}")

# Check evaluation results
for eval_result in response.evaluation_results:
    print(f"Evaluation: {eval_result.evaluation_type}")
    print(f"  Passed: {eval_result.passed}")
    print(f"  Score: {eval_result.score}")
    print(f"  Details: {eval_result.details}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Streaming with Real-time Evaluation</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Streaming generation with real-time safety checks
async def stream_with_evaluation():
    accumulated = ""
    
    async for chunk in adapter.generate_stream(
        prompt="Write a story about artificial intelligence",
        model="gpt-4o",
        temperature=0.8
    ):
        accumulated += chunk.chunk
        print(f"Chunk: '{chunk.chunk}'", end="")
        
        # Check for real-time evaluations
        if chunk.partial_evaluations:
            print(f" [Evaluations: {len(chunk.partial_evaluations)}]", end="")
        
        # Check for safety violations
        if chunk.safety_violation_detected:
            print(" [SAFETY VIOLATION]", end="")
        
        print()  # New line
        
        # Handle interruption
        if chunk.should_interrupt:
            print("Stream interrupted due to safety violation!")
            break
        
        if chunk.is_complete:
            print(f"\\nFinal response: {accumulated}")
            print(f"Final evaluations: {len(chunk.partial_evaluations)}")
            break

await stream_with_evaluation()`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Batch Processing</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Process multiple prompts in parallel
prompts = [
    "What is machine learning?",
    "Explain neural networks",
    "How does AI work?",
    "Tell me about deep learning"
]

responses = await adapter.batch_generate(
    prompts,
    model="gpt-3.5-turbo",
    temperature=0.5
)

for i, response in enumerate(responses):
    print(f"Prompt {i+1}: {prompts[i]}")
    print(f"Response: {response.content}")
    print(f"Safety: {response.safety_passed}")
    print(f"Evaluations: {len(response.evaluation_results)}")
    print("-" * 50)`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Supported Models</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>• gpt-4o</div>
                  <div>• gpt-4o-mini</div>
                  <div>• gpt-4</div>
                  <div>• gpt-4-turbo</div>
                  <div>• gpt-3.5-turbo</div>
                  <div>• gpt-3.5-turbo-16k</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anthropic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img src="https://www.anthropic.com/favicon.ico" alt="Anthropic" className="w-5 h-5" />
                Anthropic Claude Integration
              </CardTitle>
              <CardDescription>
                Complete integration guide for Anthropic Claude models with streaming evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Requires Anthropic API key. Install with: <code>pip install anthropic</code>
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">Basic Setup</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics.llm_providers.factory import create_anthropic_adapter
from blazemetrics.llm_providers.base import EvaluationConfig, EvaluationType
import os

# Configure evaluation for Claude
eval_config = EvaluationConfig(
    enabled_evaluations=[
        EvaluationType.PROMPT_INJECTION,
        EvaluationType.SAFETY_CHECK,
        EvaluationType.PII_DETECTION,
        EvaluationType.BIAS_DETECTION
    ],
    streaming_evaluation=True,
    block_on_violation=False,
    violation_threshold=0.75
)

# Create Anthropic adapter
adapter = create_anthropic_adapter(
    api_key=os.getenv("ANTHROPIC_API_KEY"),
    evaluation_config=eval_config
)

# Generate with Claude
response = await adapter.generate(
    prompt="Analyze the ethical implications of AI in healthcare",
    model="claude-3-sonnet-20240229",
    max_tokens=1000,
    temperature=0.3,
    system="You are a thoughtful AI ethics expert."
)

print(f"Response: {response.content}")
print(f"Model: {response.model}")
print(f"Safety passed: {response.safety_passed}")
print(f"Token usage: {response.usage}")

# Detailed evaluation results
for eval_result in response.evaluation_results:
    print(f"\\n{eval_result.evaluation_type}:")
    print(f"  Passed: {eval_result.passed}")
    print(f"  Score: {eval_result.score:.3f}")
    if eval_result.details:
        print(f"  Details: {eval_result.details}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Streaming with Claude</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Claude streaming with real-time evaluation
async def claude_streaming_example():
    print("Streaming Claude response with evaluation:")
    accumulated = ""
    
    async for chunk in adapter.generate_stream(
        prompt="Write a comprehensive guide to responsible AI development",
        model="claude-3-opus-20240229",
        max_tokens=1500,
        temperature=0.4,
        system="You are an AI safety researcher."
    ):
        accumulated += chunk.chunk
        print(f"Chunk: '{chunk.chunk}'", end="")
        
        # Real-time safety monitoring
        if chunk.partial_evaluations:
            safety_scores = [e.score for e in chunk.partial_evaluations 
                           if e.evaluation_type == EvaluationType.SAFETY_CHECK]
            if safety_scores:
                print(f" [Safety: {safety_scores[0]:.2f}]", end="")
        
        if chunk.safety_violation_detected:
            print(" [VIOLATION DETECTED]", end="")
        
        print()
        
        if chunk.should_interrupt:
            print("\\nStream interrupted for safety!")
            break
        
        if chunk.is_complete:
            print(f"\\nComplete response length: {len(accumulated)} chars")
            break

await claude_streaming_example()`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Advanced Configuration</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Advanced Claude configuration with custom evaluation
from blazemetrics.llm_providers.base import EvaluationResult

# Custom evaluation function for Claude responses
async def claude_specific_evaluator(text: str) -> EvaluationResult:
    # Custom logic for evaluating Claude responses
    score = 1.0 if "I don't know" not in text.lower() else 0.5
    return EvaluationResult(
        evaluation_type="claude_confidence",
        passed=score > 0.7,
        score=score,
        details={"confidence_indicator": score}
    )

# Enhanced configuration
enhanced_config = EvaluationConfig(
    enabled_evaluations=[
        EvaluationType.SAFETY_CHECK,
        EvaluationType.FACTUALITY_CHECK,
        EvaluationType.BIAS_DETECTION
    ],
    custom_evaluators=[claude_specific_evaluator],
    streaming_evaluation=True,
    evaluation_interval=10,  # Evaluate every 10 chunks
    block_on_violation=True,
    violation_threshold=0.8
)

enhanced_adapter = create_anthropic_adapter(
    api_key=os.getenv("ANTHROPIC_API_KEY"),
    evaluation_config=enhanced_config
)

# Use enhanced adapter
response = await enhanced_adapter.generate(
    prompt="Explain quantum mechanics to a 10-year-old",
    model="claude-3-haiku-20240307",
    max_tokens=800
)

print(f"Enhanced evaluation results: {len(response.evaluation_results)}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Supported Models</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>• claude-3-opus-20240229</div>
                  <div>• claude-3-sonnet-20240229</div>
                  <div>• claude-3-haiku-20240307</div>
                  <div>• claude-2.1</div>
                  <div>• claude-2.0</div>
                  <div>• claude-instant-1.2</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="huggingface" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img src="https://huggingface.co/favicon.ico" alt="HuggingFace" className="w-5 h-5" />
                HuggingFace Integration
              </CardTitle>
              <CardDescription>
                Integration with HuggingFace models via API and local transformers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  For local models: <code>pip install transformers torch</code>. For API: HuggingFace API token recommended.
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">API Mode Setup</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics.llm_providers.factory import create_huggingface_adapter
from blazemetrics.llm_providers.base import EvaluationConfig, EvaluationType
import os

# Configure for HuggingFace API
eval_config = EvaluationConfig(
    enabled_evaluations=[
        EvaluationType.SAFETY_CHECK,
        EvaluationType.TOXICITY_CHECK,
        EvaluationType.PII_DETECTION
    ],
    streaming_evaluation=False,  # API mode doesn't support true streaming
    block_on_violation=False
)

# Create HuggingFace adapter (API mode)
adapter = create_huggingface_adapter(
    api_key=os.getenv("HUGGINGFACE_API_KEY"),  # Optional but recommended
    model_name="microsoft/DialoGPT-medium",
    use_local=False,  # Use API
    evaluation_config=eval_config
)

# Generate response
response = await adapter.generate(
    prompt="Hello, how can I help you today?",
    max_length=100,
    temperature=0.7,
    top_p=0.9,
    do_sample=True
)

print(f"Response: {response.content}")
print(f"Model: {response.model}")
print(f"Safety passed: {response.safety_passed}")
print(f"Latency: {response.latency_ms}ms")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Local Model Setup</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Local transformers setup
local_adapter = create_huggingface_adapter(
    model_name="microsoft/DialoGPT-large",
    use_local=True,  # Use local transformers
    device="cuda",   # or "cpu"
    evaluation_config=eval_config
)

# Generate with local model
response = await local_adapter.generate(
    prompt="What is the meaning of life?",
    max_length=150,
    temperature=0.8,
    top_p=0.95,
    do_sample=True,
    pad_token_id=50256  # GPT-2 style models
)

print(f"Local model response: {response.content}")
print(f"Evaluation results: {len(response.evaluation_results)}")

# Check specific evaluations
for eval_result in response.evaluation_results:
    if eval_result.evaluation_type == EvaluationType.SAFETY_CHECK:
        print(f"Safety score: {eval_result.score:.3f}")
    elif eval_result.evaluation_type == EvaluationType.TOXICITY_CHECK:
        print(f"Toxicity score: {eval_result.score:.3f}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Advanced Local Setup</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Advanced local model configuration
advanced_adapter = create_huggingface_adapter(
    model_name="meta-llama/Llama-2-7b-chat-hf",
    use_local=True,
    device="cuda",
    evaluation_config=EvaluationConfig(
        enabled_evaluations=[
            EvaluationType.SAFETY_CHECK,
            EvaluationType.BIAS_DETECTION,
            EvaluationType.FACTUALITY_CHECK
        ],
        parallel_evaluation=True,
        streaming_evaluation=True  # Simulated streaming for local models
    ),
    # Model-specific parameters
    torch_dtype="float16",
    device_map="auto",
    load_in_8bit=True  # For memory efficiency
)

# Batch processing with local model
prompts = [
    "Explain renewable energy",
    "What are the benefits of solar power?",
    "How do wind turbines work?",
    "Compare nuclear vs renewable energy"
]

# Process with limited concurrency for local models
responses = await advanced_adapter.batch_generate(
    prompts,
    max_length=200,
    temperature=0.6
)

for i, response in enumerate(responses):
    print(f"\\nPrompt {i+1}: {prompts[i]}")
    print(f"Response: {response.content[:100]}...")
    print(f"Safety: {response.safety_passed}")
    
    # Check for bias in responses
    bias_results = [r for r in response.evaluation_results 
                   if r.evaluation_type == EvaluationType.BIAS_DETECTION]
    if bias_results:
        print(f"Bias score: {bias_results[0].score:.3f}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Popular Models</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div><strong>Chat Models:</strong></div>
                  <div>• microsoft/DialoGPT-medium</div>
                  <div>• microsoft/DialoGPT-large</div>
                  <div>• facebook/blenderbot-400M-distill</div>
                  <div>• meta-llama/Llama-2-7b-chat-hf</div>
                  <div>• mistralai/Mistral-7B-Instruct-v0.1</div>
                  <div><strong>Instruction Models:</strong></div>
                  <div>• google/flan-t5-base</div>
                  <div>• google/flan-t5-large</div>
                  <div>• HuggingFaceH4/zephyr-7b-beta</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Custom Model Integration (BYOM)
              </CardTitle>
              <CardDescription>
                Bring Your Own Model - integrate any custom LLM with BlazeMetrics evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Local Model Interface</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics.llm_providers.byom_adapter import LocalModelInterface
from blazemetrics.llm_providers.factory import create_byom_adapter
from blazemetrics.llm_providers.base import EvaluationConfig, EvaluationType
from typing import AsyncIterator
import asyncio

class CustomLLMModel(LocalModelInterface):
    """Example custom model implementation"""
    
    def __init__(self, model_name: str = "custom-llm-v1"):
        self._model_name = model_name
        # Initialize your model here
        # self.model = load_your_model()
    
    @property
    def model_name(self) -> str:
        return self._model_name
    
    async def generate(self, prompt: str, **kwargs) -> str:
        """Generate response from your custom model"""
        # Your custom generation logic here
        max_tokens = kwargs.get('max_tokens', 100)
        temperature = kwargs.get('temperature', 0.7)
        
        # Simulate model processing
        await asyncio.sleep(0.1)
        
        # Replace with your actual model inference
        response = f"Custom model response to: {prompt[:50]}..."
        return response
    
    async def generate_stream(self, prompt: str, **kwargs) -> AsyncIterator[str]:
        """Generate streaming response"""
        response = await self.generate(prompt, **kwargs)
        
        # Stream in chunks
        chunk_size = 10
        for i in range(0, len(response), chunk_size):
            chunk = response[i:i+chunk_size]
            yield chunk
            await asyncio.sleep(0.05)  # Simulate streaming delay

# Create custom model instance
custom_model = CustomLLMModel("my-custom-llm")

# Create BYOM adapter with evaluation
adapter = create_byom_adapter(
    custom_model,
    EvaluationConfig(
        enabled_evaluations=[
            EvaluationType.SAFETY_CHECK,
            EvaluationType.PII_DETECTION,
            EvaluationType.TOXICITY_CHECK
        ],
        streaming_evaluation=True,
        block_on_violation=False
    )
)

# Use your custom model with automatic evaluation
response = await adapter.generate(
    "Explain the benefits of renewable energy",
    max_tokens=200,
    temperature=0.6
)

print(f"Custom model response: {response.content}")
print(f"Safety passed: {response.safety_passed}")
print(f"Evaluations performed: {len(response.evaluation_results)}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">REST API Model Interface</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics.llm_providers.byom_adapter import RestAPIModelInterface
import aiohttp
import json

class CustomAPIModel(RestAPIModelInterface):
    """Custom REST API model implementation"""
    
    def __init__(self, api_url: str, api_key: str, model_name: str):
        self.api_url = api_url
        self.api_key = api_key
        self._model_name = model_name
    
    @property
    def model_name(self) -> str:
        return self._model_name
    
    async def generate(self, prompt: str, **kwargs) -> str:
        """Generate via REST API"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "prompt": prompt,
            "max_tokens": kwargs.get('max_tokens', 100),
            "temperature": kwargs.get('temperature', 0.7),
            **kwargs
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(
                self.api_url,
                headers=headers,
                json=payload
            ) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get('text', result.get('response', ''))
                else:
                    raise RuntimeError(f"API error: {response.status}")
    
    async def generate_stream(self, prompt: str, **kwargs) -> AsyncIterator[str]:
        """Streaming via REST API (if supported)"""
        # If your API supports streaming, implement here
        # Otherwise, fall back to chunked response
        full_response = await self.generate(prompt, **kwargs)
        
        chunk_size = 15
        for i in range(0, len(full_response), chunk_size):
            yield full_response[i:i+chunk_size]
            await asyncio.sleep(0.1)

# Create API model instance
api_model = CustomAPIModel(
    api_url="https://your-api.com/v1/generate",
    api_key="your-api-key",
    model_name="your-custom-api-model"
)

# Create adapter
api_adapter = create_byom_adapter(api_model, eval_config)

# Use API model with evaluation
response = await api_adapter.generate("What is machine learning?")
print(f"API model response: {response.content}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Integration with Existing Models</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Example: Integrating with vLLM or other inference servers
class VLLMModel(RestAPIModelInterface):
    """vLLM inference server integration"""
    
    def __init__(self, server_url: str, model_name: str):
        self.server_url = server_url
        self._model_name = model_name
    
    @property
    def model_name(self) -> str:
        return self._model_name
    
    async def generate(self, prompt: str, **kwargs) -> str:
        payload = {
            "prompt": prompt,
            "max_tokens": kwargs.get('max_tokens', 100),
            "temperature": kwargs.get('temperature', 0.7),
            "top_p": kwargs.get('top_p', 0.9),
            "stream": False
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.server_url}/generate",
                json=payload
            ) as response:
                result = await response.json()
                return result['text'][0] if result.get('text') else ''

# Example: Integrating with Ollama
class OllamaModel(RestAPIModelInterface):
    """Ollama local server integration"""
    
    def __init__(self, model_name: str, base_url: str = "http://localhost:11434"):
        self.base_url = base_url
        self._model_name = model_name
    
    @property
    def model_name(self) -> str:
        return self._model_name
    
    async def generate(self, prompt: str, **kwargs) -> str:
        payload = {
            "model": self._model_name,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": kwargs.get('temperature', 0.7),
                "top_p": kwargs.get('top_p', 0.9),
                "num_predict": kwargs.get('max_tokens', 100)
            }
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.base_url}/api/generate",
                json=payload
            ) as response:
                result = await response.json()
                return result.get('response', '')

# Use with BlazeMetrics
ollama_model = OllamaModel("llama2:7b")
ollama_adapter = create_byom_adapter(ollama_model, eval_config)

response = await ollama_adapter.generate("Explain photosynthesis")
print(f"Ollama response: {response.content}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Advanced Features
              </CardTitle>
              <CardDescription>
                Middleware, auto-injection, and ecosystem integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Middleware Integration</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics.middleware.auto_inject import enable_auto_evaluation, disable_auto_evaluation
from blazemetrics.middleware.context_managers import evaluation_context, safe_llm_context
from blazemetrics.middleware.decorators import evaluate_llm_call, safe_llm_call

# 1. Context Manager Usage
async def context_example():
    with evaluation_context() as ctx:
        print(f"Evaluation context created")
        print(f"Enabled evaluations: {[e.value for e in ctx.config.enabled_evaluations]}")
        
        # Your LLM calls here will be automatically evaluated
        # This works with any LLM provider
        
    print("Context closed, evaluation disabled")

# 2. Decorator Usage
@evaluate_llm_call()
async def my_llm_function(prompt: str) -> str:
    # This function will automatically have evaluation injected
    return f"Decorated response to: {prompt}"

@safe_llm_call(block_on_violation=False)
async def my_safe_llm_function(prompt: str) -> str:
    # This function includes safety checks
    return f"Safe decorated response to: {prompt}"

# Test decorated functions
result1 = await my_llm_function("Hello decorator!")
print(f"Decorated function result: {result1}")

result2 = await my_safe_llm_function("Hello safe decorator!")
print(f"Safe decorated function result: {result2}")

# 3. Auto-injection (Advanced)
try:
    # Enable automatic evaluation injection for all LLM calls
    enable_auto_evaluation(
        patch_libraries=["openai", "anthropic"],  # Libraries to patch
        default_config=EvaluationConfig(
            enabled_evaluations=[EvaluationType.SAFETY_CHECK],
            block_on_violation=False
        )
    )
    print("Auto-evaluation enabled for OpenAI and Anthropic")
    
    # Now all OpenAI/Anthropic calls will be automatically evaluated
    # Your existing code doesn't need to change!
    
    # Disable when done
    disable_auto_evaluation()
    print("Auto-evaluation disabled")
    
except Exception as e:
    print(f"Auto-injection demo failed: {e}")

await context_example()`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Ecosystem Integration</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# LangChain Integration
try:
    from blazemetrics.integrations.langchain_integration import create_langchain_callback
    from langchain.llms import OpenAI
    from langchain.chains import LLMChain
    from langchain.prompts import PromptTemplate
    
    # Create BlazeMetrics callback for LangChain
    callback = create_langchain_callback(
        evaluation_config=EvaluationConfig(
            enabled_evaluations=[
                EvaluationType.SAFETY_CHECK,
                EvaluationType.PII_DETECTION
            ]
        )
    )
    
    # Use with LangChain
    llm = OpenAI(temperature=0.7, callbacks=[callback])
    prompt = PromptTemplate(
        input_variables=["topic"],
        template="Write a brief explanation of {topic}"
    )
    chain = LLMChain(llm=llm, prompt=prompt)
    
    result = chain.run(topic="quantum computing")
    print(f"LangChain result with evaluation: {result}")
    
except ImportError:
    print("LangChain not available (install with: pip install langchain)")

# LlamaIndex Integration
try:
    from blazemetrics.integrations.llamaindex_integration import create_llamaindex_callback
    from llama_index import GPTSimpleVectorIndex, Document
    
    # Create BlazeMetrics callback for LlamaIndex
    callback = create_llamaindex_callback()
    
    # Use with LlamaIndex
    documents = [Document("Sample document for indexing")]
    index = GPTSimpleVectorIndex.from_documents(
        documents,
        callback_manager=callback
    )
    
    response = index.query("What is in the document?")
    print(f"LlamaIndex result with evaluation: {response}")
    
except ImportError:
    print("LlamaIndex not available (install with: pip install llama-index)")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Custom Evaluation Pipeline</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics.llm_providers.base import EvaluationResult
import re

# Custom evaluator functions
async def custom_profanity_detector(text: str) -> EvaluationResult:
    """Custom profanity detection"""
    profanity_words = ["badword1", "badword2"]  # Your custom list
    
    found_profanity = any(word in text.lower() for word in profanity_words)
    score = 0.0 if found_profanity else 1.0
    
    return EvaluationResult(
        evaluation_type="custom_profanity",
        passed=not found_profanity,
        score=score,
        details={"profanity_detected": found_profanity}
    )

async def custom_length_validator(text: str) -> EvaluationResult:
    """Custom response length validation"""
    min_length = 10
    max_length = 1000
    
    length = len(text)
    valid_length = min_length <= length <= max_length
    score = 1.0 if valid_length else 0.0
    
    return EvaluationResult(
        evaluation_type="length_validation",
        passed=valid_length,
        score=score,
        details={
            "length": length,
            "min_required": min_length,
            "max_allowed": max_length
        }
    )

async def custom_format_checker(text: str) -> EvaluationResult:
    """Custom format validation (e.g., no URLs)"""
    url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    contains_url = bool(re.search(url_pattern, text))
    
    score = 0.0 if contains_url else 1.0
    
    return EvaluationResult(
        evaluation_type="format_check",
        passed=not contains_url,
        score=score,
        details={"contains_url": contains_url}
    )

# Create configuration with custom evaluators
custom_config = EvaluationConfig(
    enabled_evaluations=[
        EvaluationType.SAFETY_CHECK,
        EvaluationType.PII_DETECTION
    ],
    custom_evaluators=[
        custom_profanity_detector,
        custom_length_validator,
        custom_format_checker
    ],
    parallel_evaluation=True,
    block_on_violation=True,
    violation_threshold=0.8
)

# Use with any adapter
adapter = create_openai_adapter(
    api_key=os.getenv("OPENAI_API_KEY"),
    evaluation_config=custom_config
)

response = await adapter.generate("Tell me about artificial intelligence")

print(f"Response: {response.content}")
print(f"Total evaluations: {len(response.evaluation_results)}")

# Check custom evaluation results
for eval_result in response.evaluation_results:
    print(f"\\n{eval_result.evaluation_type}:")
    print(f"  Passed: {eval_result.passed}")
    print(f"  Score: {eval_result.score}")
    print(f"  Details: {eval_result.details}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LLMIntegrationGuide;