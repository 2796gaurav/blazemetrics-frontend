import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Brain, Search, Shield, Target, Zap, Code } from 'lucide-react';

const LLMUseCases: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">LLM Use Cases Showcase</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Real-world LLM evaluation scenarios with complete workflows and code examples
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary"><Brain className="w-3 h-3 mr-1" />Output Quality</Badge>
          <Badge variant="secondary"><Search className="w-3 h-3 mr-1" />RAG Systems</Badge>
          <Badge variant="secondary"><Shield className="w-3 h-3 mr-1" />Safety & Compliance</Badge>
          <Badge variant="secondary"><Target className="w-3 h-3 mr-1" />Agent Workflows</Badge>
        </div>
      </div>

      <Alert className="mb-8">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          These use cases demonstrate complete end-to-end workflows using real BlazeMetrics backend examples. 
          Each includes working code, expected outputs, and evaluation strategies.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quality">Output Quality</TabsTrigger>
          <TabsTrigger value="hallucination">Hallucination</TabsTrigger>
          <TabsTrigger value="rag">RAG Systems</TabsTrigger>
          <TabsTrigger value="agents">Agent Workflows</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                LLM Evaluation Use Cases
              </CardTitle>
              <CardDescription>
                Comprehensive scenarios covering the most common LLM evaluation challenges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Output Quality Assessment
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Multi-model comparison (GPT vs Claude vs Llama)</li>
                    <li>• Response quality scoring</li>
                    <li>• Coherence and relevance evaluation</li>
                    <li>• Performance benchmarking</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    RAG System Evaluation
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Retrieval accuracy assessment</li>
                    <li>• Citation and provenance tracking</li>
                    <li>• Semantic search quality</li>
                    <li>• End-to-end RAG pipeline testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent> 
       <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                LLM Output Quality Evaluation
              </CardTitle>
              <CardDescription>
                Compare and evaluate output quality across different LLM providers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Multi-Provider Comparison</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics import BlazeMetricsClient
import openai
from transformers import pipeline

# Setup different LLM providers
openai_client = openai.OpenAI(api_key="your-api-key")
hf_pipeline = pipeline("text-generation", model="distilgpt2")

# Test prompt
prompt = "Explain quantum computing in simple terms"

# Generate responses from different providers
def get_openai_response(prompt):
    response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200
    )
    return response.choices[0].message.content

def get_hf_response(prompt):
    result = hf_pipeline(prompt, max_new_tokens=100)[0]
    return result['generated_text'][len(prompt):].strip()

# Get responses
openai_output = get_openai_response(prompt)
hf_output = get_hf_response(prompt)

# Reference answer for comparison
reference = ["Quantum computing uses quantum mechanics principles like superposition and entanglement to process information in ways classical computers cannot."]

# Evaluate with BlazeMetrics
client = BlazeMetricsClient(
    metrics_include=["bleu", "rouge1", "rouge2", "meteor", "chrf"],
    enable_analytics=True
)

outputs = [openai_output, hf_output]
providers = ["OpenAI GPT-4o", "HuggingFace DistilGPT2"]

# Compute metrics
metrics = client.compute_metrics(outputs, [reference, reference])

# Display results
for i, provider in enumerate(providers):
    print(f"\\n{provider}:")
    print(f"Output: {outputs[i][:100]}...")
    for metric, values in metrics.items():
        print(f"  {metric}: {values[i]:.3f}")

# Aggregate comparison
aggregated = client.aggregate_metrics(metrics)
print(f"\\nOverall Quality Scores:")
for metric, value in aggregated.items():
    print(f"  {metric}: {value:.3f}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Response Quality Scoring</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Advanced quality evaluation with custom scoring
from blazemetrics.llm_judge import LLMJudge
import os

# Setup LLM judge for quality assessment
judge = LLMJudge(
    provider="openai",
    api_key=os.getenv("OPENAI_API_KEY"),
    model="gpt-4o",
    system_prompt="""Rate the response quality on these dimensions:
    - Accuracy: How factually correct is the response?
    - Clarity: How clear and understandable is the explanation?
    - Completeness: Does it fully address the question?
    - Relevance: How relevant is the response to the query?
    
    Return scores 0-1 for each dimension and overall quality."""
)

def quality_scorer(output, reference):
    result = judge.score([output], [reference])
    return {
        "accuracy": result[0].get("accuracy", 0.0),
        "clarity": result[0].get("clarity", 0.0),
        "completeness": result[0].get("completeness", 0.0),
        "relevance": result[0].get("relevance", 0.0),
        "overall_quality": result[0].get("overall_quality", 0.0)
    }

# Set custom quality scorer
client.set_factuality_scorer(quality_scorer)

# Evaluate quality
quality_results = client.evaluate_factuality(
    outputs,
    [reference[0] for _ in outputs]
)

print("\\nQuality Assessment Results:")
for i, provider in enumerate(providers):
    print(f"\\n{provider}:")
    result = quality_results[i]
    print(f"  Accuracy: {result.get('accuracy', 0):.3f}")
    print(f"  Clarity: {result.get('clarity', 0):.3f}")
    print(f"  Completeness: {result.get('completeness', 0):.3f}")
    print(f"  Relevance: {result.get('relevance', 0):.3f}")
    print(f"  Overall Quality: {result.get('overall_quality', 0):.3f}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Batch Quality Evaluation</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Evaluate multiple prompts across providers
test_prompts = [
    "What is machine learning?",
    "Explain the greenhouse effect",
    "How do neural networks work?",
    "What are the benefits of renewable energy?"
]

references = [
    ["Machine learning is a subset of AI that enables computers to learn from data without explicit programming."],
    ["The greenhouse effect is the warming of Earth's surface due to atmospheric gases trapping heat."],
    ["Neural networks are computing systems inspired by biological neural networks that learn patterns in data."],
    ["Renewable energy provides clean power, reduces emissions, and offers long-term sustainability."]
]

# Batch evaluation across providers
all_outputs = []
all_providers = []

for prompt in test_prompts:
    openai_resp = get_openai_response(prompt)
    hf_resp = get_hf_response(prompt)
    
    all_outputs.extend([openai_resp, hf_resp])
    all_providers.extend(["OpenAI", "HuggingFace"])

# Prepare references for batch evaluation
batch_references = []
for ref in references:
    batch_references.extend([ref, ref])  # Duplicate for each provider

# Compute batch metrics
batch_metrics = client.compute_metrics(all_outputs, batch_references)

# Analyze results by provider
provider_scores = {"OpenAI": [], "HuggingFace": []}
for i, provider in enumerate(all_providers):
    scores = {}
    for metric, values in batch_metrics.items():
        scores[metric] = values[i]
    provider_scores[provider].append(scores)

# Calculate average scores per provider
for provider, scores_list in provider_scores.items():
    print(f"\\n{provider} Average Scores:")
    avg_scores = {}
    for metric in batch_metrics.keys():
        avg_scores[metric] = sum(s[metric] for s in scores_list) / len(scores_list)
        print(f"  {metric}: {avg_scores[metric]:.3f}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hallucination" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Hallucination Detection & Factuality Scoring
              </CardTitle>
              <CardDescription>
                Detect and score hallucinations using LLM judges and factuality evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Based on real backend example: <code>11_factuality_llm_openai.py</code>
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">OpenAI-based Factuality Judge</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`import openai
import json
import os

# Setup OpenAI factuality judge
def openai_factuality_scorer(output, reference):
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    system_prompt = """You are a trustworthy factuality judge. 
    Rate the OUTPUT vs. REFERENCE for factuality (1.0: perfectly truthful, 0.0: entirely fabricated) 
    and hallucination (1.0: complete hallucination, 0.0: none). 
    Respond with JSON: {"factuality": float, "hallucination": float, "explanation": string}"""
    
    user_prompt = f"OUTPUT: {output}\\nREFERENCE: {reference if reference else ''}"
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.0,
        max_tokens=256
    )
    
    try:
        return json.loads(response.choices[0].message.content)
    except Exception:
        # Fallback if JSON parsing fails
        return {
            "factuality": 0.0, 
            "hallucination": 1.0, 
            "explanation": response.choices[0].message.content
        }

# Test cases with known factuality
test_outputs = [
    "Paris is the capital of France.",           # Factual
    "Barack Obama was the 44th President.",      # Factual  
    "The moon is made of cheese.",               # Hallucination
    "The sky is green during the day.",          # Hallucination
    "GPT-3 was created by OpenAI.",              # Factual
    "Bitcoin is a centralized bank.",            # Hallucination
]

test_references = [
    "Paris is the capital of France.",
    "Barack Obama served as the 44th US President.",
    "",  # No reference for moon composition
    "The sky appears blue during daylight.",
    "The GPT-3 language model was released by OpenAI.",
    "Bitcoin is a decentralized cryptocurrency.",
]

# Setup BlazeMetrics with factuality scorer
from blazemetrics import BlazeMetricsClient

client = BlazeMetricsClient()
client.set_factuality_scorer(openai_factuality_scorer)

# Evaluate factuality
results = client.evaluate_factuality(test_outputs, test_references)

print("--- Factuality Results (OpenAI Judge) ---")
for i, result in enumerate(results):
    print(f"{i+1}: Output: {test_outputs[i]!r}")
    print(f"    Reference: {test_references[i]}")
    print(f"    Factuality: {result.get('factuality'):.3f}")
    print(f"    Hallucination: {result.get('hallucination'):.3f}")
    print(f"    Explanation: {result.get('explanation')}")
    print()`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">HuggingFace Local Factuality Judge</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Local HuggingFace model for factuality (no API costs)
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

def huggingface_factuality_scorer(output, reference):
    """
    Uses MNLI-style models for entailment vs contradiction detection
    No API costs - runs locally
    """
    model_name = "microsoft/deberta-v3-base-mnli"
    
    # Load model on first call (cached)
    if not hasattr(huggingface_factuality_scorer, "_model"):
        model = AutoModelForSequenceClassification.from_pretrained(model_name)
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model.eval()
        device = "cuda" if torch.cuda.is_available() else "cpu"
        model.to(device)
        
        huggingface_factuality_scorer._model = model
        huggingface_factuality_scorer._tokenizer = tokenizer
        huggingface_factuality_scorer._device = device
    
    model = huggingface_factuality_scorer._model
    tokenizer = huggingface_factuality_scorer._tokenizer
    device = huggingface_factuality_scorer._device
    
    # For entailment: premise is reference, hypothesis is output
    inputs = tokenizer(
        reference, output, 
        return_tensors="pt", 
        truncation=True, 
        max_length=256
    ).to(device)
    
    with torch.no_grad():
        outputs = model(**inputs)
        scores = outputs.logits.softmax(dim=-1).cpu().numpy()[0]
    
    # MNLI label mapping: [contradiction, neutral, entailment]
    label_map = model.config.id2label
    predicted_label = label_map[int(scores.argmax())]
    
    # Map to factuality scores
    factuality = float(scores[2])      # entailment score
    hallucination = float(scores[0])   # contradiction score
    
    explanation = f"HF MNLI label: {predicted_label}, entailment: {factuality:.2f}, contradiction: {hallucination:.2f}"
    
    return {
        "factuality": factuality,
        "hallucination": hallucination,
        "explanation": explanation
    }

# Use HuggingFace judge instead
client.set_factuality_scorer(huggingface_factuality_scorer)
hf_results = client.evaluate_factuality(test_outputs, test_references)

print("--- Factuality Results (HuggingFace Local Judge) ---")
for i, result in enumerate(hf_results):
    print(f"{i+1}: Output: {test_outputs[i]!r}")
    print(f"    Factuality: {result.get('factuality'):.3f}")
    print(f"    Hallucination: {result.get('hallucination'):.3f}")
    print(f"    Explanation: {result.get('explanation')}")
    print()`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Real-time Hallucination Monitoring</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Monitor hallucinations in production LLM outputs
from blazemetrics import BlazeMetricsClient
import time

# Setup monitoring client
monitor_client = BlazeMetricsClient(
    enable_analytics=True,
    analytics_window=100,
    analytics_alerts=True,
    analytics_anomalies=True
)

monitor_client.set_factuality_scorer(openai_factuality_scorer)

# Simulate production LLM outputs
production_outputs = [
    "The Eiffel Tower is 324 meters tall.",
    "Python was created by Guido van Rossum.",
    "The Earth has 12 moons.",  # Hallucination
    "Water boils at 100°C at sea level.",
    "Shakespeare wrote 50 plays.",  # Inaccurate
    "The speed of light is 299,792,458 m/s.",
]

production_references = [
    "The Eiffel Tower is 324 meters tall.",
    "Python was created by Guido van Rossum in 1991.",
    "The Earth has one moon.",
    "Water boils at 100°C at sea level pressure.",
    "Shakespeare wrote 37-39 plays.",
    "The speed of light is 299,792,458 m/s.",
]

# Monitor each output
hallucination_scores = []
for i, (output, reference) in enumerate(zip(production_outputs, production_references)):
    # Evaluate factuality
    result = monitor_client.evaluate_factuality([output], [reference])[0]
    
    hallucination_score = result.get('hallucination', 0.0)
    factuality_score = result.get('factuality', 1.0)
    
    hallucination_scores.append(hallucination_score)
    
    # Add to analytics
    monitor_client.add_metrics({
        'hallucination_score': hallucination_score,
        'factuality_score': factuality_score
    })
    
    print(f"Output {i+1}: {output}")
    print(f"  Hallucination: {hallucination_score:.3f}")
    print(f"  Factuality: {factuality_score:.3f}")
    
    # Alert on high hallucination
    if hallucination_score > 0.7:
        print(f"  🚨 HIGH HALLUCINATION DETECTED!")
    
    print()

# Get analytics summary
analytics = monitor_client.get_analytics_summary()
print("--- Hallucination Monitoring Summary ---")
print(f"Average hallucination score: {sum(hallucination_scores)/len(hallucination_scores):.3f}")
print(f"Max hallucination score: {max(hallucination_scores):.3f}")
print(f"Outputs with high hallucination (>0.5): {sum(1 for s in hallucination_scores if s > 0.5)}")

if analytics:
    print(f"Analytics trends: {analytics.get('trends', {})}")
    print(f"Anomalies detected: {analytics.get('anomalies', [])}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <
TabsContent value="rag" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                RAG System Evaluation
              </CardTitle>
              <CardDescription>
                Complete RAG pipeline evaluation with retrieval, generation, and citation tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Based on real backend examples: <code>15_rag_semantic_search.py</code> and <code>use_cases/02_rag_search_and_provenance.py</code>
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">Semantic Search & Retrieval Evaluation</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`import numpy as np
from blazemetrics import BlazeMetricsClient

# Simulate document embeddings (in practice, use your embedding model)
np.random.seed(42)
query_embedding = np.random.randn(768).astype(np.float32)
document_embeddings = np.random.randn(10, 768).astype(np.float32)

# Document corpus for demonstration
documents = [
    "Artificial intelligence is transforming healthcare through diagnostic tools.",
    "Machine learning algorithms can predict patient outcomes with high accuracy.",
    "Deep learning models are used for medical image analysis and diagnosis.",
    "Natural language processing helps extract insights from medical records.",
    "AI-powered drug discovery is accelerating pharmaceutical research.",
    "Robotic surgery systems provide precision and minimize invasive procedures.",
    "Telemedicine platforms use AI for remote patient monitoring.",
    "Electronic health records benefit from AI-driven data analysis.",
    "Personalized medicine relies on AI to tailor treatments to individuals.",
    "Clinical decision support systems use AI to assist healthcare providers."
]

client = BlazeMetricsClient()

# Perform semantic search
query = "How is AI used in medical diagnosis?"
search_results = client.semantic_search(
    query_embedding[None, :], 
    document_embeddings, 
    top_k=5
)[0]

print("=== Semantic Search Results ===")
print(f"Query: {query}")
print("\\nTop 5 most relevant documents:")
for idx, score in search_results:
    print(f"  Score: {score:.3f} - {documents[idx]}")

# RAG retrieval with reranking
rag_results = client.rag_search(
    query_embedding, 
    document_embeddings, 
    top_k=5
)

print("\\n=== RAG Search with Reranking ===")
for idx, similarity, reranked_score in rag_results:
    print(f"  Doc {idx}: Similarity={similarity:.3f}, Reranked={reranked_score:.3f}")
    print(f"    Content: {documents[idx]}")
    print()`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">End-to-End RAG Pipeline Evaluation</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Complete RAG pipeline with generation and evaluation
import openai
from blazemetrics import BlazeMetricsClient

class RAGPipeline:
    def __init__(self, documents, embeddings, openai_client):
        self.documents = documents
        self.embeddings = embeddings
        self.openai_client = openai_client
        self.blazemetrics = BlazeMetricsClient()
    
    def retrieve(self, query_embedding, top_k=3):
        """Retrieve most relevant documents"""
        results = self.blazemetrics.semantic_search(
            query_embedding[None, :], 
            self.embeddings, 
            top_k=top_k
        )[0]
        
        retrieved_docs = []
        retrieval_scores = []
        
        for idx, score in results:
            retrieved_docs.append(self.documents[idx])
            retrieval_scores.append(score)
        
        return retrieved_docs, retrieval_scores
    
    def generate(self, query, retrieved_docs):
        """Generate answer using retrieved documents"""
        context = "\\n".join([f"Document {i+1}: {doc}" 
                             for i, doc in enumerate(retrieved_docs)])
        
        prompt = f"""Based on the following documents, answer the question.
        Provide citations using [Doc X] format.

        Documents:
        {context}

        Question: {query}
        
        Answer:"""
        
        response = self.openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=300
        )
        
        return response.choices[0].message.content
    
    def evaluate_rag(self, query, query_embedding, ground_truth=None):
        """Complete RAG evaluation"""
        # Step 1: Retrieval
        retrieved_docs, retrieval_scores = self.retrieve(query_embedding)
        
        # Step 2: Generation
        generated_answer = self.generate(query, retrieved_docs)
        
        # Step 3: Evaluation
        evaluation_results = {
            "query": query,
            "retrieved_documents": retrieved_docs,
            "retrieval_scores": retrieval_scores,
            "generated_answer": generated_answer,
            "retrieval_quality": {
                "avg_retrieval_score": np.mean(retrieval_scores),
                "top_score": max(retrieval_scores),
                "score_variance": np.var(retrieval_scores)
            }
        }
        
        # Evaluate generation quality if ground truth provided
        if ground_truth:
            metrics = self.blazemetrics.compute_metrics(
                [generated_answer], 
                [ground_truth],
                include=["bleu", "rouge1", "rouge2", "meteor"]
            )
            evaluation_results["generation_quality"] = {
                metric: values[0] for metric, values in metrics.items()
            }
        
        return evaluation_results

# Initialize RAG pipeline
openai_client = openai.OpenAI(api_key="your-api-key")
rag_pipeline = RAGPipeline(documents, document_embeddings, openai_client)

# Test queries
test_queries = [
    {
        "query": "How does AI help with medical diagnosis?",
        "embedding": np.random.randn(768).astype(np.float32),  # Use real embeddings
        "ground_truth": "AI helps medical diagnosis through image analysis, pattern recognition, and decision support systems that can identify diseases with high accuracy."
    },
    {
        "query": "What role does machine learning play in drug discovery?",
        "embedding": np.random.randn(768).astype(np.float32),
        "ground_truth": "Machine learning accelerates drug discovery by predicting molecular properties, identifying drug targets, and optimizing compound design."
    }
]

# Evaluate RAG pipeline
print("=== RAG Pipeline Evaluation ===")
for test_case in test_queries:
    print(f"\\nQuery: {test_case['query']}")
    
    results = rag_pipeline.evaluate_rag(
        test_case["query"],
        test_case["embedding"],
        test_case["ground_truth"]
    )
    
    print(f"\\nRetrieved Documents:")
    for i, (doc, score) in enumerate(zip(results["retrieved_documents"], results["retrieval_scores"])):
        print(f"  {i+1}. (Score: {score:.3f}) {doc[:80]}...")
    
    print(f"\\nGenerated Answer: {results['generated_answer']}")
    
    print(f"\\nRetrieval Quality:")
    for metric, value in results["retrieval_quality"].items():
        print(f"  {metric}: {value:.3f}")
    
    if "generation_quality" in results:
        print(f"\\nGeneration Quality:")
        for metric, value in results["generation_quality"].items():
            print(f"  {metric}: {value:.3f}")
    
    print("-" * 80)`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Citation & Provenance Tracking</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Advanced RAG with citation tracking and provenance
import re
from typing import List, Dict, Tuple

class ProvenanceRAG:
    def __init__(self, documents, embeddings, openai_client):
        self.documents = documents
        self.embeddings = embeddings
        self.openai_client = openai_client
        self.blazemetrics = BlazeMetricsClient()
    
    def extract_citations(self, text: str) -> List[str]:
        """Extract citation markers from generated text"""
        # Look for patterns like [Doc 1], [Document 2], etc.
        citations = re.findall(r'\\[Doc(?:ument)?\\s*(\\d+)\\]', text, re.IGNORECASE)
        return [int(c) for c in citations]
    
    def verify_citations(self, generated_text: str, retrieved_docs: List[str]) -> Dict:
        """Verify that citations are accurate and relevant"""
        citations = self.extract_citations(generated_text)
        
        citation_accuracy = {
            "total_citations": len(citations),
            "valid_citations": 0,
            "invalid_citations": 0,
            "citation_coverage": 0.0,
            "hallucinated_citations": 0
        }
        
        # Check each citation
        for citation_num in citations:
            if 1 <= citation_num <= len(retrieved_docs):
                citation_accuracy["valid_citations"] += 1
                
                # Check if citation content is actually used
                doc_content = retrieved_docs[citation_num - 1]
                # Simple overlap check (in practice, use more sophisticated methods)
                if any(word in generated_text.lower() 
                       for word in doc_content.lower().split()[:10]):
                    citation_accuracy["citation_coverage"] += 1
            else:
                citation_accuracy["invalid_citations"] += 1
                citation_accuracy["hallucinated_citations"] += 1
        
        # Calculate coverage percentage
        if citation_accuracy["total_citations"] > 0:
            citation_accuracy["citation_coverage"] = (
                citation_accuracy["citation_coverage"] / 
                citation_accuracy["total_citations"]
            )
        
        return citation_accuracy
    
    def evaluate_with_provenance(self, query: str, query_embedding: np.ndarray) -> Dict:
        """RAG evaluation with full provenance tracking"""
        # Retrieve documents
        search_results = self.blazemetrics.semantic_search(
            query_embedding[None, :], 
            self.embeddings, 
            top_k=5
        )[0]
        
        retrieved_docs = []
        doc_indices = []
        retrieval_scores = []
        
        for idx, score in search_results:
            retrieved_docs.append(self.documents[idx])
            doc_indices.append(idx)
            retrieval_scores.append(score)
        
        # Generate with explicit citation instructions
        context = "\\n".join([f"Document {i+1}: {doc}" 
                             for i, doc in enumerate(retrieved_docs)])
        
        prompt = f"""Based on the following documents, answer the question.
        IMPORTANT: Cite your sources using [Doc X] format where X is the document number.
        Only use information from the provided documents.

        Documents:
        {context}

        Question: {query}
        
        Answer with citations:"""
        
        response = self.openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,  # Lower temperature for more consistent citations
            max_tokens=400
        )
        
        generated_answer = response.choices[0].message.content
        
        # Verify citations
        citation_analysis = self.verify_citations(generated_answer, retrieved_docs)
        
        # Create provenance trace
        provenance = {
            "query": query,
            "retrieved_document_indices": doc_indices,
            "retrieved_documents": retrieved_docs,
            "retrieval_scores": retrieval_scores,
            "generated_answer": generated_answer,
            "citations_found": self.extract_citations(generated_answer),
            "citation_analysis": citation_analysis,
            "provenance_score": self._calculate_provenance_score(citation_analysis, retrieval_scores)
        }
        
        return provenance
    
    def _calculate_provenance_score(self, citation_analysis: Dict, retrieval_scores: List[float]) -> float:
        """Calculate overall provenance quality score"""
        # Combine citation accuracy with retrieval quality
        citation_score = 0.0
        if citation_analysis["total_citations"] > 0:
            citation_score = (
                citation_analysis["valid_citations"] / citation_analysis["total_citations"] * 0.5 +
                citation_analysis["citation_coverage"] * 0.5
            )
        
        retrieval_score = np.mean(retrieval_scores) if retrieval_scores else 0.0
        
        # Weighted combination
        provenance_score = citation_score * 0.6 + retrieval_score * 0.4
        return provenance_score

# Test provenance tracking
provenance_rag = ProvenanceRAG(documents, document_embeddings, openai_client)

test_query = "What are the applications of AI in healthcare?"
test_embedding = np.random.randn(768).astype(np.float32)

provenance_results = provenance_rag.evaluate_with_provenance(test_query, test_embedding)

print("=== Provenance & Citation Analysis ===")
print(f"Query: {provenance_results['query']}")
print(f"\\nGenerated Answer: {provenance_results['generated_answer']}")

print(f"\\nCitation Analysis:")
for metric, value in provenance_results['citation_analysis'].items():
    print(f"  {metric}: {value}")

print(f"\\nProvenance Score: {provenance_results['provenance_score']:.3f}")

print(f"\\nRetrieved Documents with Scores:")
for i, (doc, score) in enumerate(zip(provenance_results['retrieved_documents'], 
                                   provenance_results['retrieval_scores'])):
    print(f"  Doc {i+1} (Score: {score:.3f}): {doc[:60]}...")

print(f"\\nCitations Found: {provenance_results['citations_found']}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>       
 <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Agent Workflow Assessment
              </CardTitle>
              <CardDescription>
                Multi-step agent evaluation with tool usage, reasoning coherence, and goal completion tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Based on real backend example: <code>07_agent_eval.py</code> with OpenAI function calling integration
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">Basic Agent Evaluation</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics import BlazeMetricsClient

# Define agent tasks and traces
tasks = [
    "Find the best hotel in Paris, book it, and summarize the booking details.",
    "Search for weather in NYC, then suggest an outfit for tomorrow."
]

agent_traces = [
    {
        "steps": [
            {"action": "search", "tool": "GoogleSearch", "result": "Top hotels: Ritz Paris..."},
            {"action": "book", "tool": "HotelAPI", "result": "Ritz Paris booked for 3 nights"},
            {"action": "summarize", "tool": "LLM", "result": "Booked Ritz Paris, 3 nights, $1200."}
        ],
        "goal_completed": True,
        "safety_violations": [],
    },
    {
        "steps": [
            {"action": "search", "tool": "WeatherAPI", "result": "Rain in NYC tomorrow"},
            {"action": "suggest", "tool": "LLM", "result": "Bring an umbrella and wear boots."}
        ],
        "goal_completed": True,
        "safety_violations": [],
    },
]

# Agent evaluation metrics
metrics = [
    "tool_selection_accuracy", 
    "reasoning_coherence", 
    "goal_completion_rate",
    "safety_compliance_score", 
    "efficiency_ratio"
]

# Evaluate agent performance
client = BlazeMetricsClient()
results = client.evaluate_agent(
    tasks, 
    agent_traces, 
    metrics,
    available_tools=["GoogleSearch", "HotelAPI", "LLM", "WeatherAPI"],
    safety_policies=["no PII disclosure", "no dangerous bookings"],
    goal_tracking=True
)

print("=== Agent Evaluation Results ===")
for metric, score in results.items():
    if isinstance(metric, str):
        print(f"  {metric}: {score:.3f}")

# Calculate additional metrics
total_steps = sum(len(trace['steps']) for trace in agent_traces)
avg_steps_per_task = total_steps / len(tasks)
print(f"  average_steps_per_task: {avg_steps_per_task:.1f}")

# Analyze individual traces
print("\\n=== Individual Trace Analysis ===")
for i, (task, trace) in enumerate(zip(tasks, agent_traces)):
    print(f"\\nTask {i+1}: {task}")
    print(f"  Steps taken: {len(trace['steps'])}")
    print(f"  Goal completed: {trace['goal_completed']}")
    print(f"  Safety violations: {len(trace['safety_violations'])}")
    
    print("  Step breakdown:")
    for j, step in enumerate(trace['steps']):
        print(f"    {j+1}. {step['action']} using {step['tool']}")
        print(f"       Result: {step['result'][:50]}...")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">OpenAI Function Calling Agent</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`import openai
import json
from blazemetrics import BlazeMetricsClient

class OpenAIFunctionAgent:
    def __init__(self, api_key):
        self.client = openai.OpenAI(api_key=api_key)
        self.blazemetrics = BlazeMetricsClient()
        
        # Define available tools
        self.tools = [
            {
                "type": "function",
                "function": {
                    "name": "search_hotels",
                    "description": "Search for hotels in a given city",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "city": {"type": "string", "description": "The city to search hotels in"},
                            "checkin": {"type": "string", "description": "Check-in date"},
                            "checkout": {"type": "string", "description": "Check-out date"}
                        },
                        "required": ["city"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "book_hotel",
                    "description": "Book a hotel",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "hotel_name": {"type": "string", "description": "Name of the hotel to book"},
                            "nights": {"type": "integer", "description": "Number of nights"}
                        },
                        "required": ["hotel_name"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "get_weather",
                    "description": "Get weather information for a city",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "city": {"type": "string", "description": "The city to get weather for"},
                            "date": {"type": "string", "description": "Date for weather forecast"}
                        },
                        "required": ["city"]
                    }
                }
            }
        ]
    
    def execute_function(self, function_name, arguments):
        """Simulate function execution"""
        if function_name == "search_hotels":
            city = arguments.get("city", "Unknown")
            return f"Found hotels in {city}: Ritz {city}, Four Seasons {city}, Marriott {city}"
        elif function_name == "book_hotel":
            hotel = arguments.get("hotel_name", "Unknown Hotel")
            nights = arguments.get("nights", 1)
            return f"Successfully booked {hotel} for {nights} nights. Confirmation: ABC123"
        elif function_name == "get_weather":
            city = arguments.get("city", "Unknown")
            return f"Weather in {city}: Partly cloudy, 22°C, chance of rain"
        else:
            return f"Unknown function: {function_name}"
    
    def run_task(self, task_description):
        """Execute a task using OpenAI function calling"""
        messages = [
            {"role": "system", "content": "You are a helpful assistant that can search hotels, book them, and get weather information. Use the available functions to complete tasks."},
            {"role": "user", "content": task_description}
        ]
        
        steps = []
        max_iterations = 5
        
        for iteration in range(max_iterations):
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                tools=self.tools,
                tool_choice="auto"
            )
            
            message = response.choices[0].message
            messages.append(message)
            
            if message.tool_calls:
                # Execute function calls
                for tool_call in message.tool_calls:
                    function_name = tool_call.function.name
                    arguments = json.loads(tool_call.function.arguments)
                    
                    # Execute the function
                    result = self.execute_function(function_name, arguments)
                    
                    # Record the step
                    steps.append({
                        "action": function_name,
                        "tool": function_name,
                        "arguments": arguments,
                        "result": result
                    })
                    
                    # Add function result to conversation
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": result
                    })
            else:
                # No more function calls, task is complete
                final_response = message.content
                break
        
        return {
            "steps": steps,
            "final_response": final_response,
            "goal_completed": len(steps) > 0 and "error" not in final_response.lower(),
            "safety_violations": []
        }

# Test OpenAI function calling agent
agent = OpenAIFunctionAgent("your-openai-api-key")

test_tasks = [
    "Find a hotel in Paris and book it for 2 nights",
    "Check the weather in London and suggest if it's good for outdoor activities"
]

print("=== OpenAI Function Calling Agent Evaluation ===")
agent_traces = []

for i, task in enumerate(test_tasks):
    print(f"\\nTask {i+1}: {task}")
    
    # Execute task
    trace = agent.run_task(task)
    agent_traces.append(trace)
    
    print(f"Steps executed: {len(trace['steps'])}")
    for j, step in enumerate(trace['steps']):
        print(f"  {j+1}. {step['action']} with args: {step['arguments']}")
        print(f"     Result: {step['result']}")
    
    print(f"Final response: {trace['final_response']}")
    print(f"Goal completed: {trace['goal_completed']}")

# Evaluate with BlazeMetrics
evaluation_results = agent.blazemetrics.evaluate_agent(
    test_tasks,
    agent_traces,
    ["tool_selection_accuracy", "reasoning_coherence", "goal_completion_rate", "efficiency_ratio"],
    available_tools=["search_hotels", "book_hotel", "get_weather"],
    safety_policies=["no unauthorized bookings", "accurate information only"],
    goal_tracking=True
)

print("\\n=== Agent Performance Metrics ===")
for metric, score in evaluation_results.items():
    if isinstance(metric, str):
        print(f"  {metric}: {score:.3f}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Advanced Agent Monitoring</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Advanced agent monitoring with safety and efficiency tracking
from blazemetrics import BlazeMetricsClient
import time
from typing import List, Dict

class AgentMonitor:
    def __init__(self):
        self.client = BlazeMetricsClient(
            enable_analytics=True,
            analytics_window=50,
            analytics_alerts=True
        )
        self.agent_sessions = []
    
    def monitor_agent_session(self, task: str, trace: Dict) -> Dict:
        """Monitor a single agent session"""
        session_start = time.time()
        
        # Analyze trace for potential issues
        analysis = {
            "task": task,
            "trace": trace,
            "timestamp": session_start,
            "metrics": {},
            "alerts": [],
            "efficiency_score": 0.0,
            "safety_score": 1.0
        }
        
        # Calculate efficiency metrics
        num_steps = len(trace.get('steps', []))
        if num_steps > 0:
            # Efficiency based on steps vs task complexity
            task_complexity = len(task.split()) / 10  # Simple heuristic
            expected_steps = max(2, int(task_complexity * 3))
            
            if num_steps <= expected_steps:
                analysis["efficiency_score"] = 1.0
            else:
                analysis["efficiency_score"] = max(0.1, expected_steps / num_steps)
        
        # Safety analysis
        safety_violations = trace.get('safety_violations', [])
        if safety_violations:
            analysis["safety_score"] = max(0.0, 1.0 - len(safety_violations) * 0.3)
            analysis["alerts"].append(f"Safety violations detected: {safety_violations}")
        
        # Tool usage analysis
        tools_used = [step.get('tool') for step in trace.get('steps', [])]
        unique_tools = set(tools_used)
        
        if len(tools_used) > len(unique_tools) * 2:
            analysis["alerts"].append("Potential tool overuse detected")
        
        # Goal completion analysis
        if not trace.get('goal_completed', False):
            analysis["alerts"].append("Task goal not completed")
            analysis["efficiency_score"] *= 0.5
        
        # Add to monitoring
        self.agent_sessions.append(analysis)
        
        # Update analytics
        self.client.add_metrics({
            'agent_efficiency': analysis["efficiency_score"],
            'agent_safety': analysis["safety_score"],
            'steps_taken': num_steps,
            'tools_used': len(unique_tools)
        })
        
        return analysis
    
    def get_monitoring_summary(self) -> Dict:
        """Get overall monitoring summary"""
        if not self.agent_sessions:
            return {"message": "No agent sessions monitored"}
        
        # Calculate aggregate metrics
        total_sessions = len(self.agent_sessions)
        avg_efficiency = sum(s["efficiency_score"] for s in self.agent_sessions) / total_sessions
        avg_safety = sum(s["safety_score"] for s in self.agent_sessions) / total_sessions
        
        total_alerts = sum(len(s["alerts"]) for s in self.agent_sessions)
        successful_tasks = sum(1 for s in self.agent_sessions 
                              if s["trace"].get("goal_completed", False))
        
        # Get analytics from BlazeMetrics
        analytics = self.client.get_analytics_summary()
        
        return {
            "total_sessions": total_sessions,
            "success_rate": successful_tasks / total_sessions,
            "average_efficiency": avg_efficiency,
            "average_safety": avg_safety,
            "total_alerts": total_alerts,
            "recent_trends": analytics.get("trends", {}),
            "anomalies": analytics.get("anomalies", [])
        }

# Test agent monitoring
monitor = AgentMonitor()

# Simulate various agent sessions
test_sessions = [
    {
        "task": "Book a flight to Tokyo",
        "trace": {
            "steps": [
                {"action": "search_flights", "tool": "FlightAPI", "result": "Found flights to Tokyo"},
                {"action": "book_flight", "tool": "BookingAPI", "result": "Flight booked successfully"}
            ],
            "goal_completed": True,
            "safety_violations": []
        }
    },
    {
        "task": "Find restaurant recommendations in Rome",
        "trace": {
            "steps": [
                {"action": "search", "tool": "GoogleSearch", "result": "Found restaurants"},
                {"action": "search", "tool": "GoogleSearch", "result": "More restaurants"},
                {"action": "search", "tool": "GoogleSearch", "result": "Even more restaurants"},
                {"action": "filter", "tool": "LLM", "result": "Filtered recommendations"}
            ],
            "goal_completed": True,
            "safety_violations": []
        }
    },
    {
        "task": "Transfer money to suspicious account",
        "trace": {
            "steps": [
                {"action": "verify_account", "tool": "BankAPI", "result": "Account verification failed"}
            ],
            "goal_completed": False,
            "safety_violations": ["attempted unauthorized transfer"]
        }
    }
]

print("=== Agent Monitoring Results ===")
for i, session in enumerate(test_sessions):
    print(f"\\nSession {i+1}:")
    analysis = monitor.monitor_agent_session(session["task"], session["trace"])
    
    print(f"  Task: {analysis['task']}")
    print(f"  Efficiency Score: {analysis['efficiency_score']:.3f}")
    print(f"  Safety Score: {analysis['safety_score']:.3f}")
    
    if analysis["alerts"]:
        print(f"  Alerts: {', '.join(analysis['alerts'])}")
    else:
        print(f"  Alerts: None")

# Get overall summary
summary = monitor.get_monitoring_summary()
print(f"\\n=== Monitoring Summary ===")
print(f"Total Sessions: {summary['total_sessions']}")
print(f"Success Rate: {summary['success_rate']:.1%}")
print(f"Average Efficiency: {summary['average_efficiency']:.3f}")
print(f"Average Safety: {summary['average_safety']:.3f}")
print(f"Total Alerts: {summary['total_alerts']}")

if summary.get("recent_trends"):
    print(f"Recent Trends: {summary['recent_trends']}")
if summary.get("anomalies"):
    print(f"Anomalies Detected: {len(summary['anomalies'])}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>     
   <TabsContent value="production" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Production LLM Workflow
              </CardTitle>
              <CardDescription>
                Complete end-to-end production pipeline with monitoring, analytics, and model cards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Based on real backend example: <code>10_complete_llm_workflow.py</code> - Production-ready evaluation pipeline
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">Complete Production Pipeline</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics import BlazeMetricsClient
from blazemetrics.llm_judge import LLMJudge
import os
import time

# Production LLM outputs and references
candidates = [
    "Alice's email is alice@example.com.",
    "Paris is the capital city of France.",
    "2 + 2 is 5.",
    "You should buy Bitcoin on my advice.",
    "The weather today is sunny with a temperature of 25°C.",
    "Machine learning is a subset of artificial intelligence."
]

references = [
    ["Her email is alice@example.com."],
    ["Paris is the capital of France."],
    ["2 + 2 = 4"],
    [""],  # No reference for investment advice
    ["Today's weather: sunny, 25°C"],
    ["Machine learning is a subset of AI that learns from data."]
]

# Configure comprehensive BlazeMetrics client
client = BlazeMetricsClient(
    # Guardrails and compliance
    blocklist=["Bitcoin", "investment advice"],
    redact_pii=True,
    regexes=[r"\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b"],  # Email regex
    case_insensitive=True,
    
    # Analytics and monitoring
    enable_analytics=True,
    analytics_window=100,
    analytics_alerts=True,
    analytics_anomalies=True,
    analytics_trends=True,
    
    # Metrics configuration
    metrics_include=["bleu", "rouge1", "rouge2", "wer", "meteor", "chrf", "token_f1", "jaccard"],
    metrics_lowercase=True,
    metrics_stemming=False,
)

print("=== Production LLM Evaluation Pipeline ===")
print(f"Evaluating {len(candidates)} LLM outputs...")

# Step 1: Compute text metrics
print("\\n1. Computing text similarity metrics...")
metrics = client.compute_metrics(
    candidates, 
    references,
    include=client.config.metrics_include,
    lowercase=client.config.metrics_lowercase,
    stemming=client.config.metrics_stemming,
)

# Aggregate metrics for overall performance
aggregated_metrics = client.aggregate_metrics(metrics)
print("   Text metrics computed successfully")

# Step 2: Safety and guardrails check
print("\\n2. Running safety and guardrails checks...")
safety_results = client.check_safety(candidates)

safety_violations = sum(1 for result in safety_results if result.get('blocked', False))
print(f"   Safety violations detected: {safety_violations}/{len(candidates)}")

# Step 3: Add to analytics window
print("\\n3. Updating analytics...")
client.add_metrics(aggregated_metrics)
analytics_summary = client.get_analytics_summary()
print("   Analytics updated successfully")

# Step 4: Factuality and hallucination scoring
print("\\n4. Evaluating factuality with LLM judge...")
judge = LLMJudge(
    provider="openai",
    api_key=os.getenv("OPENAI_API_KEY"),
    model="gpt-4o",
    system_prompt="""Evaluate the factual accuracy of the output compared to the reference.
    Rate on these dimensions (0.0 to 1.0):
    - factuality: How factually accurate is the output?
    - hallucination: How much hallucinated content is present? (1.0 = complete hallucination)
    - consistency: How consistent is the output with the reference?
    Return JSON with these scores and an explanation."""
)

def production_factuality_judge(output, reference):
    try:
        result = judge.score([output], [reference])
        return {
            **result[0],
            "factuality": result[0].get("factuality", result[0].get("faithfulness", 0.0)),
            "hallucination": result[0].get("hallucination", 1.0 - result[0].get("faithfulness", 0.0)),
        }
    except Exception as e:
        print(f"   Warning: Factuality scoring failed: {e}")
        return {"factuality": 0.5, "hallucination": 0.5, "explanation": "Scoring unavailable"}

client.set_factuality_scorer(production_factuality_judge)
factuality_results = client.evaluate_factuality(
    candidates,
    [r[0] if r else "" for r in references]
)
print("   Factuality evaluation completed")

# Step 5: Generate comprehensive model card
print("\\n5. Generating model card...")
model_card = client.generate_model_card(
    model_name="production-llm-v1.0",
    metrics=metrics,
    analytics=analytics_summary,
    metadata={
        "evaluation_timestamp": time.time(),
        "model_version": "1.0",
        "evaluation_config": {
            "metrics_used": client.config.metrics_include,
            "safety_enabled": True,
            "analytics_enabled": client.config.enable_analytics
        }
    },
    violations=safety_results,
    factuality=factuality_results,
    provenance=[]
)

print("   Model card generated successfully")

# Display comprehensive results
print("\\n" + "="*60)
print("PRODUCTION EVALUATION RESULTS")
print("="*60)

print("\\n📊 AGGREGATE METRICS:")
for metric, value in aggregated_metrics.items():
    print(f"   {metric}: {value:.3f}")

print("\\n🛡️ SAFETY SUMMARY:")
blocked_outputs = [i for i, result in enumerate(safety_results) if result.get('blocked', False)]
pii_detected = [i for i, result in enumerate(safety_results) if result.get('pii_detected', False)]
regex_flagged = [i for i, result in enumerate(safety_results) if result.get('regex_flagged', False)]

print(f"   Total outputs: {len(candidates)}")
print(f"   Blocked outputs: {len(blocked_outputs)}")
print(f"   PII detected: {len(pii_detected)}")
print(f"   Regex violations: {len(regex_flagged)}")

if blocked_outputs:
    print(f"   Blocked indices: {blocked_outputs}")

print("\\n🎯 FACTUALITY SUMMARY:")
factuality_scores = [r.get('factuality', 0) for r in factuality_results]
hallucination_scores = [r.get('hallucination', 0) for r in factuality_results]

avg_factuality = sum(factuality_scores) / len(factuality_scores)
avg_hallucination = sum(hallucination_scores) / len(hallucination_scores)

print(f"   Average factuality: {avg_factuality:.3f}")
print(f"   Average hallucination: {avg_hallucination:.3f}")
print(f"   High-quality outputs (factuality > 0.8): {sum(1 for s in factuality_scores if s > 0.8)}")
print(f"   Problematic outputs (hallucination > 0.5): {sum(1 for s in hallucination_scores if s > 0.5)}")

print("\\n📈 ANALYTICS SUMMARY:")
if analytics_summary:
    print(f"   Trends available: {bool(analytics_summary.get('trends'))}")
    print(f"   Anomalies detected: {len(analytics_summary.get('anomalies', []))}")
    if analytics_summary.get('trends'):
        for metric, trend in analytics_summary['trends'].items():
            print(f"   {metric} trend: {trend}")

print("\\n📋 DETAILED OUTPUT ANALYSIS:")
for i, (output, safety, factuality) in enumerate(zip(candidates, safety_results, factuality_results)):
    print(f"\\n   Output {i+1}: {output[:50]}{'...' if len(output) > 50 else ''}")
    
    # Safety status
    status_indicators = []
    if safety.get('blocked'):
        status_indicators.append("🚫 BLOCKED")
    if safety.get('pii_detected'):
        status_indicators.append("🔒 PII")
    if safety.get('regex_flagged'):
        status_indicators.append("⚠️ REGEX")
    
    if status_indicators:
        print(f"      Safety: {' '.join(status_indicators)}")
    else:
        print(f"      Safety: ✅ PASSED")
    
    # Factuality status
    fact_score = factuality.get('factuality', 0)
    hall_score = factuality.get('hallucination', 0)
    
    if fact_score > 0.8:
        fact_status = "✅ HIGH"
    elif fact_score > 0.5:
        fact_status = "⚠️ MEDIUM"
    else:
        fact_status = "❌ LOW"
    
    print(f"      Factuality: {fact_status} ({fact_score:.3f})")
    print(f"      Hallucination: {hall_score:.3f}")
    
    # Text metrics for this output
    print(f"      Text Quality:")
    for metric, values in metrics.items():
        print(f"        {metric}: {values[i]:.3f}")

print("\\n" + "="*60)
print("MODEL CARD PREVIEW")
print("="*60)
print(model_card[:1000] + "..." if len(model_card) > 1000 else model_card)`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Real-time Production Monitoring</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Real-time monitoring for production LLM systems
import asyncio
from datetime import datetime
from typing import List, Dict
import json

class ProductionLLMMonitor:
    def __init__(self):
        self.client = BlazeMetricsClient(
            enable_analytics=True,
            analytics_window=200,
            analytics_alerts=True,
            analytics_anomalies=True,
            blocklist=["harmful", "inappropriate"],
            redact_pii=True
        )
        
        # Set up factuality judge
        self.client.set_factuality_scorer(production_factuality_judge)
        
        # Monitoring state
        self.total_requests = 0
        self.blocked_requests = 0
        self.high_quality_responses = 0
        self.alerts = []
    
    async def process_llm_request(self, request_id: str, prompt: str, response: str, reference: str = "") -> Dict:
        """Process a single LLM request with full evaluation"""
        start_time = time.time()
        
        # Safety check
        safety_result = self.client.check_safety([response])[0]
        
        # Text quality metrics (if reference available)
        quality_metrics = {}
        if reference:
            metrics = self.client.compute_metrics([response], [[reference]])
            quality_metrics = {metric: values[0] for metric, values in metrics.items()}
        
        # Factuality check
        factuality_result = {}
        if reference or len(response) > 50:  # Only for substantial responses
            try:
                factuality_result = self.client.evaluate_factuality([response], [reference])[0]
            except Exception as e:
                factuality_result = {"factuality": 0.5, "hallucination": 0.5, "error": str(e)}
        
        # Update counters
        self.total_requests += 1
        if safety_result.get('blocked'):
            self.blocked_requests += 1
        
        if factuality_result.get('factuality', 0) > 0.8:
            self.high_quality_responses += 1
        
        # Check for alerts
        alerts = []
        if safety_result.get('blocked'):
            alerts.append(f"Request {request_id}: Content blocked by safety filters")
        
        if factuality_result.get('hallucination', 0) > 0.7:
            alerts.append(f"Request {request_id}: High hallucination detected ({factuality_result.get('hallucination'):.3f})")
        
        if quality_metrics.get('bleu', 0) < 0.1 and reference:
            alerts.append(f"Request {request_id}: Very low quality response (BLEU: {quality_metrics.get('bleu'):.3f})")
        
        self.alerts.extend(alerts)
        
        # Update analytics
        analytics_data = {
            'response_quality': quality_metrics.get('bleu', 0.5),
            'factuality_score': factuality_result.get('factuality', 0.5),
            'hallucination_score': factuality_result.get('hallucination', 0.5),
            'safety_passed': 1.0 if not safety_result.get('blocked') else 0.0,
            'processing_time': time.time() - start_time
        }
        
        self.client.add_metrics(analytics_data)
        
        return {
            "request_id": request_id,
            "timestamp": datetime.now().isoformat(),
            "prompt": prompt[:100] + "..." if len(prompt) > 100 else prompt,
            "response": response[:100] + "..." if len(response) > 100 else response,
            "safety": safety_result,
            "quality_metrics": quality_metrics,
            "factuality": factuality_result,
            "processing_time": time.time() - start_time,
            "alerts": alerts
        }
    
    def get_monitoring_dashboard(self) -> Dict:
        """Get comprehensive monitoring dashboard data"""
        analytics = self.client.get_analytics_summary()
        
        # Calculate rates
        block_rate = self.blocked_requests / max(self.total_requests, 1)
        quality_rate = self.high_quality_responses / max(self.total_requests, 1)
        
        return {
            "overview": {
                "total_requests": self.total_requests,
                "blocked_requests": self.blocked_requests,
                "high_quality_responses": self.high_quality_responses,
                "block_rate": block_rate,
                "quality_rate": quality_rate
            },
            "recent_alerts": self.alerts[-10:],  # Last 10 alerts
            "analytics": analytics,
            "health_status": self._calculate_health_status(block_rate, quality_rate),
            "recommendations": self._generate_recommendations(block_rate, quality_rate, analytics)
        }
    
    def _calculate_health_status(self, block_rate: float, quality_rate: float) -> str:
        """Calculate overall system health"""
        if block_rate > 0.1:  # More than 10% blocked
            return "CRITICAL"
        elif block_rate > 0.05 or quality_rate < 0.7:
            return "WARNING"
        elif quality_rate > 0.9:
            return "EXCELLENT"
        else:
            return "GOOD"
    
    def _generate_recommendations(self, block_rate: float, quality_rate: float, analytics: Dict) -> List[str]:
        """Generate actionable recommendations"""
        recommendations = []
        
        if block_rate > 0.05:
            recommendations.append("High block rate detected. Review safety filters and input preprocessing.")
        
        if quality_rate < 0.7:
            recommendations.append("Low quality responses. Consider model fine-tuning or prompt optimization.")
        
        if analytics and analytics.get('anomalies'):
            recommendations.append(f"Anomalies detected in {len(analytics['anomalies'])} metrics. Investigate unusual patterns.")
        
        if len(self.alerts) > 50:
            recommendations.append("High alert volume. Consider adjusting alert thresholds or improving model performance.")
        
        if not recommendations:
            recommendations.append("System performing well. Continue monitoring.")
        
        return recommendations

# Simulate production monitoring
async def simulate_production_monitoring():
    monitor = ProductionLLMMonitor()
    
    # Simulate various types of requests
    test_requests = [
        {
            "id": "req_001",
            "prompt": "What is the capital of France?",
            "response": "The capital of France is Paris.",
            "reference": "Paris is the capital of France."
        },
        {
            "id": "req_002", 
            "prompt": "Tell me about Bitcoin investment",
            "response": "You should definitely buy Bitcoin now for guaranteed profits!",
            "reference": ""
        },
        {
            "id": "req_003",
            "prompt": "Explain photosynthesis",
            "response": "Photosynthesis is the process by which plants convert sunlight into energy using chlorophyll.",
            "reference": "Photosynthesis is the process where plants use sunlight, water, and CO2 to produce glucose and oxygen."
        },
        {
            "id": "req_004",
            "prompt": "What is 2+2?",
            "response": "2+2 equals 5 according to my calculations.",
            "reference": "2+2 equals 4."
        },
        {
            "id": "req_005",
            "prompt": "Describe machine learning",
            "response": "Machine learning is a subset of AI that enables computers to learn from data without explicit programming.",
            "reference": "Machine learning is a method of data analysis that automates analytical model building."
        }
    ]
    
    print("=== Production LLM Monitoring Simulation ===")
    
    # Process requests
    results = []
    for request in test_requests:
        result = await monitor.process_llm_request(
            request["id"],
            request["prompt"], 
            request["response"],
            request["reference"]
        )
        results.append(result)
        
        print(f"\\nProcessed {request['id']}:")
        print(f"  Prompt: {result['prompt']}")
        print(f"  Response: {result['response']}")
        print(f"  Processing time: {result['processing_time']:.3f}s")
        
        if result['alerts']:
            print(f"  🚨 Alerts: {', '.join(result['alerts'])}")
        else:
            print(f"  ✅ No alerts")
        
        # Brief delay to simulate real-time processing
        await asyncio.sleep(0.1)
    
    # Get monitoring dashboard
    dashboard = monitor.get_monitoring_dashboard()
    
    print("\\n" + "="*50)
    print("PRODUCTION MONITORING DASHBOARD")
    print("="*50)
    
    print(f"\\n📊 OVERVIEW:")
    overview = dashboard["overview"]
    print(f"   Total Requests: {overview['total_requests']}")
    print(f"   Blocked Requests: {overview['blocked_requests']} ({overview['block_rate']:.1%})")
    print(f"   High Quality Responses: {overview['high_quality_responses']} ({overview['quality_rate']:.1%})")
    print(f"   Health Status: {dashboard['health_status']}")
    
    print(f"\\n🚨 RECENT ALERTS:")
    if dashboard["recent_alerts"]:
        for alert in dashboard["recent_alerts"]:
            print(f"   • {alert}")
    else:
        print(f"   No recent alerts")
    
    print(f"\\n💡 RECOMMENDATIONS:")
    for rec in dashboard["recommendations"]:
        print(f"   • {rec}")
    
    if dashboard["analytics"]:
        print(f"\\n📈 ANALYTICS:")
        analytics = dashboard["analytics"]
        if analytics.get("trends"):
            print(f"   Trends: {analytics['trends']}")
        if analytics.get("anomalies"):
            print(f"   Anomalies: {len(analytics['anomalies'])} detected")

# Run the simulation
if __name__ == "__main__":
    asyncio.run(simulate_production_monitoring())`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LLMUseCases;