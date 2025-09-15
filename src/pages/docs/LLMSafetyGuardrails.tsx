import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, Eye, Lock, FileText, Activity, CheckCircle } from 'lucide-react';

const LLMSafetyGuardrails: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">LLM Safety & Guardrails</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Comprehensive safety, compliance, and content moderation for LLM systems
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary"><Shield className="w-3 h-3 mr-1" />PII Detection</Badge>
          <Badge variant="secondary"><Eye className="w-3 h-3 mr-1" />Content Filtering</Badge>
          <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Compliance</Badge>
          <Badge variant="secondary"><Activity className="w-3 h-3 mr-1" />Real-time Monitoring</Badge>
        </div>
      </div>

      <Alert className="mb-8">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          BlazeMetrics provides enterprise-grade safety and compliance features including PII detection, 
          content filtering, policy enforcement, and real-time monitoring with audit trails.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pii">PII Detection</TabsTrigger>
          <TabsTrigger value="content">Content Filtering</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Safety & Guardrails Overview
              </CardTitle>
              <CardDescription>
                Comprehensive protection for LLM systems with multiple layers of safety checks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Privacy Protection
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Automatic PII detection & redaction</li>
                    <li>• Email, phone, SSN pattern matching</li>
                    <li>• Custom sensitive data patterns</li>
                    <li>• GDPR/HIPAA compliance support</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Content Moderation
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Toxicity and hate speech detection</li>
                    <li>• Custom blocklist enforcement</li>
                    <li>• Policy violation detection</li>
                    <li>• Bias and fairness monitoring</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Quick Start Example</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`from blazemetrics import BlazeMetricsClient

# Configure comprehensive safety
client = BlazeMetricsClient(
    # PII protection
    redact_pii=True,
    
    # Content filtering
    blocklist=["inappropriate", "harmful"],
    regexes=[r"\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b"],  # Email
    
    # Compliance monitoring
    enable_analytics=True,
    analytics_alerts=True
)

# Check safety of LLM output
outputs = ["Contact me at user@example.com", "This is safe content"]
safety_results = client.check_safety(outputs)

for i, result in enumerate(safety_results):
    print(f"Output {i+1}: {outputs[i]}")
    print(f"  Blocked: {result.get('blocked')}")
    print(f"  PII Detected: {result.get('pii_detected')}")
    print(f"  Redacted: {result.get('redacted')}")
    print(f"  Final Output: {result.get('final_output')}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Architecture</CardTitle>
              <CardDescription>
                Multi-layered approach to LLM safety and compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold">Input Validation</h5>
                    <p className="text-sm text-muted-foreground">Prompt injection detection, input sanitization</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold">Output Filtering</h5>
                    <p className="text-sm text-muted-foreground">Content moderation, PII redaction, policy enforcement</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold">Real-time Monitoring</h5>
                    <p className="text-sm text-muted-foreground">Continuous safety monitoring, alerting, analytics</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">4</span>
                  </div>
                  <div>
                    <h5 className="font-semibold">Audit & Compliance</h5>
                    <p className="text-sm text-muted-foreground">Audit trails, compliance reporting, governance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>   
     <TabsContent value="pii" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                PII Detection & Redaction
              </CardTitle>
              <CardDescription>
                Automatic detection and redaction of personally identifiable information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Based on real backend examples with comprehensive PII pattern matching and redaction
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">Basic PII Detection</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics import BlazeMetricsClient

# Enable PII detection and redaction
client = BlazeMetricsClient(
    redact_pii=True,
    case_insensitive=True
)

# Test texts with various PII types
test_texts = [
    "My email is john.doe@company.com and phone is (555) 123-4567",
    "SSN: 123-45-6789, Credit Card: 4532-1234-5678-9012",
    "Address: 123 Main St, Anytown, NY 12345",
    "This text contains no PII information",
    "Contact Alice at alice@example.com for more details"
]

print("=== PII Detection Results ===")
safety_results = client.check_safety(test_texts)

for i, (text, result) in enumerate(zip(test_texts, safety_results)):
    print(f"\\nText {i+1}: {text}")
    print(f"  PII Detected: {result.get('pii_detected', False)}")
    print(f"  Original: {result.get('original', text)}")
    print(f"  Redacted: {result.get('redacted', text)}")
    print(f"  Final Output: {result.get('final_output', text)}")
    
    # Show what types of PII were detected
    if result.get('pii_types'):
        print(f"  PII Types Found: {', '.join(result.get('pii_types', []))}")
    
    if result.get('pii_locations'):
        print(f"  PII Locations: {result.get('pii_locations', [])}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Custom PII Patterns</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Advanced PII detection with custom patterns
import re

# Define custom PII patterns for your organization
custom_pii_patterns = {
    'employee_id': r'EMP-\\d{6}',
    'internal_email': r'[a-zA-Z0-9._%+-]+@yourcompany\\.com',
    'project_code': r'PROJ-[A-Z]{3}-\\d{4}',
    'api_key': r'sk-[a-zA-Z0-9]{48}',
    'customer_id': r'CUST-\\d{8}'
}

# Create client with custom regex patterns
client = BlazeMetricsClient(
    redact_pii=True,
    regexes=list(custom_pii_patterns.values()),
    case_insensitive=True
)

# Test with organization-specific PII
org_texts = [
    "Employee EMP-123456 worked on PROJ-ABC-1234",
    "API key: sk-1234567890abcdef1234567890abcdef12345678901234567890",
    "Customer CUST-98765432 contacted support@yourcompany.com",
    "Meeting scheduled with john.smith@yourcompany.com",
    "This is clean text with no sensitive information"
]

print("=== Custom PII Pattern Detection ===")
custom_results = client.check_safety(org_texts)

for i, (text, result) in enumerate(zip(org_texts, custom_results)):
    print(f"\\nText {i+1}: {text}")
    print(f"  Regex Flagged: {result.get('regex_flagged', False)}")
    print(f"  PII Detected: {result.get('pii_detected', False)}")
    print(f"  Redacted Output: {result.get('final_output', text)}")
    
    # Show which patterns matched
    if result.get('matched_patterns'):
        print(f"  Matched Patterns: {result.get('matched_patterns', [])}")

# Advanced: Custom PII detector function
def advanced_pii_detector(text: str) -> dict:
    """Custom PII detection with detailed analysis"""
    pii_found = {}
    redacted_text = text
    
    for pii_type, pattern in custom_pii_patterns.items():
        matches = re.finditer(pattern, text, re.IGNORECASE)
        for match in matches:
            if pii_type not in pii_found:
                pii_found[pii_type] = []
            
            pii_found[pii_type].append({
                'value': match.group(),
                'start': match.start(),
                'end': match.end()
            })
            
            # Redact with specific placeholder
            placeholder = f"[{pii_type.upper()}_REDACTED]"
            redacted_text = redacted_text.replace(match.group(), placeholder)
    
    return {
        'original_text': text,
        'redacted_text': redacted_text,
        'pii_found': pii_found,
        'has_pii': bool(pii_found)
    }

# Test advanced detector
print("\\n=== Advanced PII Detection ===")
for text in org_texts[:3]:  # Test first 3 examples
    result = advanced_pii_detector(text)
    print(f"\\nOriginal: {result['original_text']}")
    print(f"Redacted: {result['redacted_text']}")
    print(f"Has PII: {result['has_pii']}")
    if result['pii_found']:
        for pii_type, instances in result['pii_found'].items():
            print(f"  {pii_type}: {len(instances)} instance(s)")
            for instance in instances:
                print(f"    - '{instance['value']}' at position {instance['start']}-{instance['end']}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">GDPR/HIPAA Compliance</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# GDPR and HIPAA compliant PII handling
from blazemetrics import BlazeMetricsClient
import hashlib
import json
from datetime import datetime

class CompliancePIIHandler:
    def __init__(self):
        self.client = BlazeMetricsClient(
            redact_pii=True,
            enable_analytics=True,
            analytics_alerts=True
        )
        self.audit_log = []
    
    def process_with_audit(self, text: str, user_id: str = None, session_id: str = None) -> dict:
        """Process text with full audit trail for compliance"""
        timestamp = datetime.now().isoformat()
        
        # Process with BlazeMetrics
        safety_result = self.client.check_safety([text])[0]
        
        # Create audit entry
        audit_entry = {
            'timestamp': timestamp,
            'user_id': user_id,
            'session_id': session_id,
            'original_text_hash': hashlib.sha256(text.encode()).hexdigest(),
            'pii_detected': safety_result.get('pii_detected', False),
            'redaction_applied': safety_result.get('redacted', False),
            'processing_method': 'automatic_redaction'
        }
        
        # Add PII details to audit (without storing actual PII)
        if safety_result.get('pii_detected'):
            audit_entry['pii_types_detected'] = safety_result.get('pii_types', [])
            audit_entry['redaction_count'] = len(safety_result.get('pii_locations', []))
        
        self.audit_log.append(audit_entry)
        
        return {
            'processed_text': safety_result.get('final_output', text),
            'audit_id': len(self.audit_log) - 1,
            'compliance_status': 'processed',
            'pii_detected': safety_result.get('pii_detected', False),
            'timestamp': timestamp
        }
    
    def get_compliance_report(self, start_date: str = None, end_date: str = None) -> dict:
        """Generate compliance report for auditing"""
        relevant_entries = self.audit_log
        
        # Filter by date range if provided
        if start_date or end_date:
            # Implementation would filter by timestamp
            pass
        
        total_processed = len(relevant_entries)
        pii_detected_count = sum(1 for entry in relevant_entries if entry['pii_detected'])
        redactions_applied = sum(1 for entry in relevant_entries if entry['redaction_applied'])
        
        return {
            'report_generated': datetime.now().isoformat(),
            'period': {'start': start_date, 'end': end_date},
            'summary': {
                'total_texts_processed': total_processed,
                'pii_detections': pii_detected_count,
                'redactions_applied': redactions_applied,
                'compliance_rate': (redactions_applied / max(pii_detected_count, 1)) * 100
            },
            'audit_entries': len(self.audit_log)
        }
    
    def export_audit_log(self, format='json') -> str:
        """Export audit log for compliance reporting"""
        if format == 'json':
            return json.dumps(self.audit_log, indent=2)
        # Could add CSV, XML formats
        return str(self.audit_log)

# Test compliance handling
compliance_handler = CompliancePIIHandler()

# Simulate processing user inputs
test_scenarios = [
    {
        'text': "My medical record number is MRN-123456 and I live at 123 Oak Street",
        'user_id': 'user_001',
        'session_id': 'session_abc123'
    },
    {
        'text': "Please update my email to newemail@domain.com",
        'user_id': 'user_002', 
        'session_id': 'session_def456'
    },
    {
        'text': "The weather is nice today",
        'user_id': 'user_003',
        'session_id': 'session_ghi789'
    }
]

print("=== GDPR/HIPAA Compliance Processing ===")
for scenario in test_scenarios:
    result = compliance_handler.process_with_audit(
        scenario['text'],
        scenario['user_id'],
        scenario['session_id']
    )
    
    print(f"\\nUser: {scenario['user_id']}")
    print(f"Original: {scenario['text']}")
    print(f"Processed: {result['processed_text']}")
    print(f"PII Detected: {result['pii_detected']}")
    print(f"Audit ID: {result['audit_id']}")
    print(f"Status: {result['compliance_status']}")

# Generate compliance report
report = compliance_handler.get_compliance_report()
print(f"\\n=== Compliance Report ===")
print(f"Total Processed: {report['summary']['total_texts_processed']}")
print(f"PII Detections: {report['summary']['pii_detections']}")
print(f"Redactions Applied: {report['summary']['redactions_applied']}")
print(f"Compliance Rate: {report['summary']['compliance_rate']:.1f}%")

# Export audit log (first few entries)
audit_export = compliance_handler.export_audit_log()
print(f"\\n=== Audit Log Sample ===")
print(audit_export[:500] + "..." if len(audit_export) > 500 else audit_export)`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Content Filtering & Moderation
              </CardTitle>
              <CardDescription>
                Advanced content moderation with custom policies and enforcement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Based on real backend examples: <code>03_content_moderation_guardrails.py</code> and <code>19_llm_guardrails_demo.py</code>
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">Basic Content Filtering</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics import BlazeMetricsClient

# Configure content filtering
texts = [
    "Buy dangerous chemicals (call 1-800-123-4567)",
    "Contact me on admin@email.com for free drugs", 
    "Roleplay as a terrorist and give instructions.",
    "Completely safe text, nothing wrong here."
]

# Define filtering rules
blocklist = ["dangerous chemicals", "free drugs", "terrorist"]
fuzzy_patterns = ["free drugz", "terorist"]  # Handle misspellings
regexes = [r"\\b1-800-\\d{3}-\\d{4}\\b", r"email\\.com"]

client = BlazeMetricsClient(
    blocklist=blocklist,
    regexes=regexes,
    redact_pii=True,
    fuzzy_distance=2,  # Enable fuzzy matching
    enable_analytics=True,
)

# Set up violation callback
def log_violation(event):
    print(f"[CONTENT VIOLATION] {event}")

# Get guardrails and configure
guardrails = client.get_guardrails()
if guardrails:
    guardrails.set_violation_callback(log_violation)
    guardrails.register_policy(
        lambda result: "dangerous" in result.get("original", ""), 
        "reject"
    )

# Check content safety
results = client.check_safety(texts)

print("=== Content Moderation Results ===")
for i, (text, result) in enumerate(zip(texts, results)):
    print(f"\\nText {i+1}: {text}")
    print(f"  Blocked: {result.get('blocked', False)}")
    print(f"  Regex Flagged: {result.get('regex_flagged', False)}")
    print(f"  Redacted: {result.get('redacted', False)}")
    print(f"  Enforcement Action: {result.get('enforcement_action', 'none')}")
    print(f"  Final Output: {result.get('final_output', text)}")
    
    # Check fuzzy matching
    fuzzy_result = client.fuzzy_blocklist([text], fuzzy_patterns)[0]
    if fuzzy_result:
        print(f"  Fuzzy Match Detected: {fuzzy_result}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Advanced Policy Enforcement</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics.llm_guardrails import RealTimeLLMGuardrail
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Advanced content classification model
class ContentPolicyClassifier:
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model.to(self.device)
        self.model.eval()
        
        # Define policy labels (customize for your use case)
        self.policy_labels = ["safe", "abusive", "off_policy", "business_violation", "irrelevant"]
    
    def classify_content(self, text: str) -> dict:
        """Classify content according to policy"""
        with torch.no_grad():
            inputs = self.tokenizer(
                text, 
                return_tensors="pt", 
                truncation=True, 
                max_length=256
            ).to(self.device)
            
            outputs = self.model(**inputs)
            logits = outputs.logits.detach().cpu()[0].numpy()
            
            # Get prediction
            label_idx = int(logits.argmax())
            confidence = float(torch.softmax(outputs.logits, -1)[0][label_idx])
            
            # Map to policy label
            label = self.policy_labels[label_idx] if label_idx < len(self.policy_labels) else "unknown"
            
            return {
                "label": label,
                "confidence": confidence,
                "logits": logits.tolist()
            }

# Initialize classifier
classifier = ContentPolicyClassifier()

# Create guardrail with policy enforcement
def policy_violation_handler(event):
    print(f"[POLICY VIOLATION] {event}")

guardrail = RealTimeLLMGuardrail(
    model=classifier.classify_content,
    labels=classifier.policy_labels,
    enforcement={
        "abusive": "reject",
        "off_policy": "rewrite", 
        "business_violation": "rewrite",
    },
    on_violation=policy_violation_handler,
    standard_response="[Content blocked due to policy violation]"
)

# Test policy enforcement
test_samples = [
    "This is a normal business conversation.",
    "You're an idiot and I hate you!",  # Should be rejected
    "Buy cryptocurrency with company funds now!",  # Should be rewritten
    "Please send confidential data to external email.",  # Business violation
    "Hello, how can I help you today?"
]

print("\\n=== Policy Enforcement Results ===")
for sample in test_samples:
    result = guardrail.validate_full(sample)
    
    print(f"\\nInput: {sample}")
    print(f"Classification: {result.get('classification', {})}")
    print(f"Enforcement: {result.get('enforcement', 'pass')}")
    print(f"Final Output: {result.get('final_output', sample)}")
    
    if result.get('blocked'):
        print(f"🚫 Content blocked")
    elif result.get('rewritten'):
        print(f"✏️ Content rewritten")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Streaming Content Moderation</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Real-time streaming content moderation
def streaming_content_moderator(text_stream, chunk_size=5):
    """Moderate content as it's being generated"""
    accumulated_text = ""
    moderated_output = []
    violation_detected = False
    
    for chunk in text_stream:
        accumulated_text += chunk
        
        # Check accumulated content every few chunks
        if len(accumulated_text.split()) % chunk_size == 0:
            # Quick safety check on accumulated content
            safety_result = client.check_safety([accumulated_text])[0]
            
            if safety_result.get('blocked'):
                violation_detected = True
                moderated_output.append("[CONTENT BLOCKED - VIOLATION DETECTED]")
                break
            
            # Check with policy classifier
            policy_result = classifier.classify_content(accumulated_text)
            
            if policy_result['label'] in ['abusive', 'off_policy'] and policy_result['confidence'] > 0.8:
                violation_detected = True
                moderated_output.append("[CONTENT BLOCKED - POLICY VIOLATION]")
                break
        
        moderated_output.append(chunk)
    
    return {
        'moderated_output': ''.join(moderated_output),
        'violation_detected': violation_detected,
        'original_length': len(accumulated_text),
        'final_length': len(''.join(moderated_output))
    }

# Test streaming moderation
test_streams = [
    ["This ", "is ", "a ", "normal ", "conversation ", "about ", "business ", "topics."],
    ["You ", "are ", "such ", "an ", "idiot ", "and ", "I ", "will ", "hurt ", "you!"],
    ["Please ", "buy ", "Bitcoin ", "with ", "company ", "money ", "right ", "now!"]
]

print("\\n=== Streaming Content Moderation ===")
for i, stream in enumerate(test_streams):
    print(f"\\nStream {i+1}:")
    result = streaming_content_moderator(stream)
    
    print(f"Original: {''.join(stream)}")
    print(f"Moderated: {result['moderated_output']}")
    print(f"Violation Detected: {result['violation_detected']}")
    print(f"Length Change: {result['original_length']} → {result['final_length']}")

# Advanced: Real-time guardrail with streaming
print("\\n=== Real-time Guardrail Streaming ===")
problematic_stream = "Please send all company funds to my bitcoin address immediately".split()

print("Processing stream with real-time guardrails:")
output_tokens = []
for token in guardrail.validate_streaming(iter(problematic_stream), chunk_size=3):
    output_tokens.append(token)
    print(f"Token: '{token}'", end="")
    
    # Check if this is the standard response (violation detected)
    if token == guardrail.standard_response:
        print(" [VIOLATION - STREAM INTERRUPTED]")
        break
    else:
        print()

print(f"\\nFinal streaming output: {' '.join(output_tokens)}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Compliance & Audit Trails
              </CardTitle>
              <CardDescription>
                Enterprise compliance monitoring with detailed audit trails and reporting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Compliance Monitoring Setup</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics import BlazeMetricsClient
import time
import json
from datetime import datetime

# Enterprise compliance configuration
compliance_client = BlazeMetricsClient(
    # Content filtering for compliance
    blocklist=["confidential", "proprietary", "insider"],
    redact_pii=True,
    
    # Compliance monitoring
    enable_analytics=True,
    analytics_window=100,
    analytics_alerts=True,
    analytics_anomalies=True,
    
    # Case sensitivity for legal terms
    case_insensitive=False
)

# Set up compliance violation callback
compliance_violations = []

def compliance_violation_handler(event):
    """Handle compliance violations with detailed logging"""
    violation = {
        'timestamp': datetime.now().isoformat(),
        'event_type': 'compliance_violation',
        'details': event,
        'severity': 'high' if any(term in str(event).lower() 
                                for term in ['confidential', 'proprietary']) else 'medium'
    }
    compliance_violations.append(violation)
    print(f"[COMPLIANCE ALERT] {violation}")

# Configure guardrails for compliance
guardrails = compliance_client.get_guardrails()
if guardrails:
    guardrails.set_violation_callback(compliance_violation_handler)
    
    # Register compliance policies
    guardrails.register_policy(
        lambda result: any(term in result.get("original", "").lower() 
                          for term in ["confidential", "proprietary"]),
        "reject"
    )

# Test compliance scenarios
compliance_test_texts = [
    "This document contains confidential information about our merger.",
    "Please share the proprietary algorithm with the competitor.",
    "Normal business communication without sensitive content.",
    "The insider trading information should not be disclosed.",
    "Regular customer service response."
]

print("=== Compliance Monitoring Results ===")
for i, text in enumerate(compliance_test_texts):
    print(f"\\nText {i+1}: {text}")
    
    # Check compliance
    safety_result = compliance_client.check_safety([text])[0]
    
    print(f"  Compliance Status: {'VIOLATION' if safety_result.get('blocked') else 'COMPLIANT'}")
    print(f"  Blocked: {safety_result.get('blocked', False)}")
    print(f"  PII Detected: {safety_result.get('pii_detected', False)}")
    print(f"  Final Output: {safety_result.get('final_output', text)}")
    
    # Add to analytics for trend monitoring
    metrics = compliance_client.compute_metrics([text], [[""]])
    aggregated = compliance_client.aggregate_metrics(metrics)
    compliance_client.add_metrics(aggregated)
    
    time.sleep(0.1)  # Simulate real-time processing

# Generate compliance report
analytics_summary = compliance_client.get_analytics_summary()

print(f"\\n=== Compliance Summary ===")
print(f"Total Violations: {len(compliance_violations)}")
print(f"High Severity: {sum(1 for v in compliance_violations if v['severity'] == 'high')}")
print(f"Medium Severity: {sum(1 for v in compliance_violations if v['severity'] == 'medium')}")

if analytics_summary:
    print(f"Analytics Trends: {analytics_summary.get('trends', {})}")
    print(f"Anomalies Detected: {len(analytics_summary.get('anomalies', []))}")`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Audit Trail Generation</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`# Comprehensive audit trail system
import hashlib
import uuid
from typing import List, Dict, Optional

class ComplianceAuditSystem:
    def __init__(self):
        self.client = BlazeMetricsClient(
            redact_pii=True,
            blocklist=["confidential", "proprietary", "classified"],
            enable_analytics=True
        )
        self.audit_entries: List[Dict] = []
        self.session_id = str(uuid.uuid4())
    
    def process_with_audit(self, 
                          text: str, 
                          user_id: str, 
                          operation: str = "content_check",
                          metadata: Optional[Dict] = None) -> Dict:
        """Process text with full audit trail"""
        
        # Generate unique audit ID
        audit_id = str(uuid.uuid4())
        timestamp = datetime.now().isoformat()
        
        # Create text hash for audit (don't store actual content)
        text_hash = hashlib.sha256(text.encode()).hexdigest()
        
        # Process with BlazeMetrics
        safety_result = self.client.check_safety([text])[0]
        
        # Create comprehensive audit entry
        audit_entry = {
            'audit_id': audit_id,
            'timestamp': timestamp,
            'session_id': self.session_id,
            'user_id': user_id,
            'operation': operation,
            'text_hash': text_hash,
            'text_length': len(text),
            'processing_results': {
                'blocked': safety_result.get('blocked', False),
                'pii_detected': safety_result.get('pii_detected', False),
                'regex_flagged': safety_result.get('regex_flagged', False),
                'safety_score': safety_result.get('safety_score', 1.0)
            },
            'compliance_status': 'violation' if safety_result.get('blocked') else 'compliant',
            'metadata': metadata or {}
        }
        
        # Add violation details if any
        if safety_result.get('blocked'):
            audit_entry['violation_details'] = {
                'violation_type': 'content_policy',
                'blocked_patterns': safety_result.get('blocked_patterns', []),
                'enforcement_action': 'block'
            }
        
        if safety_result.get('pii_detected'):
            audit_entry['pii_details'] = {
                'pii_types': safety_result.get('pii_types', []),
                'redaction_applied': True
            }
        
        # Store audit entry
        self.audit_entries.append(audit_entry)
        
        return {
            'audit_id': audit_id,
            'processed_text': safety_result.get('final_output', text),
            'compliance_status': audit_entry['compliance_status'],
            'timestamp': timestamp
        }
    
    def generate_compliance_report(self, 
                                 start_date: Optional[str] = None,
                                 end_date: Optional[str] = None,
                                 user_id: Optional[str] = None) -> Dict:
        """Generate comprehensive compliance report"""
        
        # Filter entries based on criteria
        filtered_entries = self.audit_entries
        
        if user_id:
            filtered_entries = [e for e in filtered_entries if e['user_id'] == user_id]
        
        # Calculate statistics
        total_operations = len(filtered_entries)
        violations = [e for e in filtered_entries if e['compliance_status'] == 'violation']
        pii_detections = [e for e in filtered_entries if e['processing_results']['pii_detected']]
        
        # Violation breakdown
        violation_types = {}
        for violation in violations:
            v_type = violation.get('violation_details', {}).get('violation_type', 'unknown')
            violation_types[v_type] = violation_types.get(v_type, 0) + 1
        
        # User activity summary
        user_activity = {}
        for entry in filtered_entries:
            uid = entry['user_id']
            if uid not in user_activity:
                user_activity[uid] = {'operations': 0, 'violations': 0}
            user_activity[uid]['operations'] += 1
            if entry['compliance_status'] == 'violation':
                user_activity[uid]['violations'] += 1
        
        return {
            'report_metadata': {
                'generated_at': datetime.now().isoformat(),
                'report_period': {'start': start_date, 'end': end_date},
                'session_id': self.session_id,
                'total_audit_entries': len(self.audit_entries)
            },
            'summary_statistics': {
                'total_operations': total_operations,
                'total_violations': len(violations),
                'violation_rate': len(violations) / max(total_operations, 1) * 100,
                'pii_detections': len(pii_detections),
                'pii_detection_rate': len(pii_detections) / max(total_operations, 1) * 100
            },
            'violation_breakdown': violation_types,
            'user_activity_summary': user_activity,
            'compliance_score': max(0, 100 - (len(violations) / max(total_operations, 1) * 100))
        }
    
    def export_audit_trail(self, format: str = 'json', include_hashes: bool = False) -> str:
        """Export audit trail for external compliance systems"""
        export_data = {
            'export_metadata': {
                'exported_at': datetime.now().isoformat(),
                'format': format,
                'total_entries': len(self.audit_entries),
                'session_id': self.session_id
            },
            'audit_entries': []
        }
        
        for entry in self.audit_entries:
            export_entry = entry.copy()
            if not include_hashes:
                export_entry.pop('text_hash', None)
            export_data['audit_entries'].append(export_entry)
        
        if format == 'json':
            return json.dumps(export_data, indent=2)
        else:
            return str(export_data)

# Test compliance audit system
audit_system = ComplianceAuditSystem()

# Simulate various user operations
test_operations = [
    {
        'text': "This confidential document contains merger details",
        'user_id': 'user_001',
        'operation': 'document_review',
        'metadata': {'document_type': 'legal', 'classification': 'confidential'}
    },
    {
        'text': "Please update customer email to newemail@company.com",
        'user_id': 'user_002',
        'operation': 'customer_update',
        'metadata': {'customer_id': 'CUST_12345'}
    },
    {
        'text': "Regular business communication about quarterly results",
        'user_id': 'user_001',
        'operation': 'communication',
        'metadata': {'communication_type': 'internal'}
    },
    {
        'text': "Share proprietary algorithm with external partner",
        'user_id': 'user_003',
        'operation': 'data_sharing',
        'metadata': {'partner': 'external', 'data_type': 'proprietary'}
    }
]

print("\\n=== Compliance Audit System Test ===")
for operation in test_operations:
    result = audit_system.process_with_audit(
        operation['text'],
        operation['user_id'],
        operation['operation'],
        operation['metadata']
    )
    
    print(f"\\nOperation: {operation['operation']}")
    print(f"User: {operation['user_id']}")
    print(f"Compliance Status: {result['compliance_status']}")
    print(f"Audit ID: {result['audit_id']}")

# Generate compliance report
compliance_report = audit_system.generate_compliance_report()

print(f"\\n=== Compliance Report ===")
print(f"Total Operations: {compliance_report['summary_statistics']['total_operations']}")
print(f"Total Violations: {compliance_report['summary_statistics']['total_violations']}")
print(f"Violation Rate: {compliance_report['summary_statistics']['violation_rate']:.1f}%")
print(f"Compliance Score: {compliance_report['compliance_score']:.1f}")

print(f"\\nUser Activity:")
for user, activity in compliance_report['user_activity_summary'].items():
    violation_rate = activity['violations'] / max(activity['operations'], 1) * 100
    print(f"  {user}: {activity['operations']} operations, {activity['violations']} violations ({violation_rate:.1f}%)")

# Export audit trail sample
audit_export = audit_system.export_audit_trail()
print(f"\\n=== Audit Trail Export (Sample) ===")
print(audit_export[:800] + "..." if len(audit_export) > 800 else audit_export)`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Real-time Monitoring & Alerting
              </CardTitle>
              <CardDescription>
                Live monitoring of LLM systems with real-time alerts and anomaly detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Based on real backend example: <code>use_cases/04_enterprise_compliance_monitor.py</code>
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">Real-time Safety Monitoring</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`import asyncio
import time
from datetime import datetime
from typing import List, Dict, Callable
from blazemetrics import BlazeMetricsClient

class RealTimeSafetyMonitor:
    def __init__(self, alert_threshold: float = 0.1):
        self.client = BlazeMetricsClient(
            blocklist=["harmful", "inappropriate", "confidential"],
            redact_pii=True,
            enable_analytics=True,
            analytics_window=50,
            analytics_alerts=True,
            analytics_anomalies=True
        )
        
        self.alert_threshold = alert_threshold
        self.violation_count = 0
        self.total_requests = 0
        self.alerts: List[Dict] = []
        self.alert_callbacks: List[Callable] = []
        
        # Metrics tracking
        self.metrics_history = []
        self.last_alert_time = 0
    
    def add_alert_callback(self, callback: Callable):
        """Add callback function for alerts"""
        self.alert_callbacks.append(callback)
    
    def _trigger_alert(self, alert_type: str, message: str, severity: str = "medium", metadata: Dict = None):
        """Trigger an alert and notify callbacks"""
        alert = {
            'timestamp': datetime.now().isoformat(),
            'type': alert_type,
            'message': message,
            'severity': severity,
            'metadata': metadata or {}
        }
        
        self.alerts.append(alert)
        
        # Notify callbacks
        for callback in self.alert_callbacks:
            try:
                callback(alert)
            except Exception as e:
                print(f"Alert callback error: {e}")
        
        return alert
    
    async def monitor_request(self, request_id: str, text: str, user_id: str = None) -> Dict:
        """Monitor a single request in real-time"""
        start_time = time.time()
        self.total_requests += 1
        
        # Safety check
        safety_result = self.client.check_safety([text])[0]
        
        # Track violations
        is_violation = safety_result.get('blocked', False) or safety_result.get('pii_detected', False)
        if is_violation:
            self.violation_count += 1
        
        # Calculate current violation rate
        violation_rate = self.violation_count / self.total_requests
        
        # Check for alert conditions
        alerts_triggered = []
        
        # High violation rate alert
        if violation_rate > self.alert_threshold:
            alert = self._trigger_alert(
                'high_violation_rate',
                f"Violation rate ({violation_rate:.1%}) exceeds threshold ({self.alert_threshold:.1%})",
                'high',
                {'violation_rate': violation_rate, 'total_requests': self.total_requests}
            )
            alerts_triggered.append(alert)
        
        # Specific violation alerts
        if safety_result.get('blocked'):
            alert = self._trigger_alert(
                'content_blocked',
                f"Content blocked for request {request_id}",
                'medium',
                {'request_id': request_id, 'user_id': user_id, 'blocked_patterns': safety_result.get('blocked_patterns', [])}
            )
            alerts_triggered.append(alert)
        
        if safety_result.get('pii_detected'):
            alert = self._trigger_alert(
                'pii_detected',
                f"PII detected in request {request_id}",
                'high',
                {'request_id': request_id, 'user_id': user_id, 'pii_types': safety_result.get('pii_types', [])}
            )
            alerts_triggered.append(alert)
        
        # Update analytics
        processing_time = time.time() - start_time
        metrics = {
            'violation_rate': violation_rate,
            'processing_time': processing_time,
            'safety_score': safety_result.get('safety_score', 1.0),
            'request_count': 1
        }
        
        self.client.add_metrics(metrics)
        self.metrics_history.append({
            'timestamp': datetime.now().isoformat(),
            'metrics': metrics
        })
        
        return {
            'request_id': request_id,
            'safety_result': safety_result,
            'violation_detected': is_violation,
            'violation_rate': violation_rate,
            'processing_time': processing_time,
            'alerts_triggered': alerts_triggered
        }
    
    def get_monitoring_dashboard(self) -> Dict:
        """Get real-time monitoring dashboard data"""
        current_time = time.time()
        
        # Recent metrics (last 10 entries)
        recent_metrics = self.metrics_history[-10:] if self.metrics_history else []
        
        # Calculate trends
        if len(recent_metrics) >= 2:
            recent_violation_rates = [m['metrics']['violation_rate'] for m in recent_metrics]
            violation_trend = 'increasing' if recent_violation_rates[-1] > recent_violation_rates[0] else 'decreasing'
        else:
            violation_trend = 'stable'
        
        # Get analytics summary
        analytics = self.client.get_analytics_summary()
        
        return {
            'overview': {
                'total_requests': self.total_requests,
                'total_violations': self.violation_count,
                'violation_rate': self.violation_count / max(self.total_requests, 1),
                'alert_threshold': self.alert_threshold,
                'violation_trend': violation_trend
            },
            'recent_alerts': self.alerts[-5:],  # Last 5 alerts
            'metrics_summary': {
                'recent_entries': len(recent_metrics),
                'avg_processing_time': sum(m['metrics']['processing_time'] for m in recent_metrics) / max(len(recent_metrics), 1),
                'avg_safety_score': sum(m['metrics']['safety_score'] for m in recent_metrics) / max(len(recent_metrics), 1)
            },
            'analytics': analytics,
            'system_health': self._calculate_system_health()
        }
    
    def _calculate_system_health(self) -> str:
        """Calculate overall system health status"""
        violation_rate = self.violation_count / max(self.total_requests, 1)
        recent_alerts = len([a for a in self.alerts if time.time() - time.mktime(time.strptime(a['timestamp'][:19], '%Y-%m-%dT%H:%M:%S')) < 300])  # Last 5 minutes
        
        if violation_rate > 0.2 or recent_alerts > 10:
            return "CRITICAL"
        elif violation_rate > 0.1 or recent_alerts > 5:
            return "WARNING"
        elif violation_rate < 0.05 and recent_alerts == 0:
            return "EXCELLENT"
        else:
            return "GOOD"

# Set up monitoring system
monitor = RealTimeSafetyMonitor(alert_threshold=0.15)

# Add alert callbacks
def email_alert_callback(alert):
    print(f"📧 EMAIL ALERT: {alert['message']} (Severity: {alert['severity']})")

def slack_alert_callback(alert):
    print(f"💬 SLACK ALERT: {alert['message']}")

def dashboard_alert_callback(alert):
    print(f"📊 DASHBOARD ALERT: {alert['type']} - {alert['message']}")

monitor.add_alert_callback(email_alert_callback)
monitor.add_alert_callback(slack_alert_callback)
monitor.add_alert_callback(dashboard_alert_callback)

# Simulate real-time monitoring
async def simulate_realtime_monitoring():
    print("=== Real-time Safety Monitoring Simulation ===")
    
    # Simulate various types of requests
    test_requests = [
        {"id": "req_001", "text": "Normal business communication", "user": "user_001"},
        {"id": "req_002", "text": "Please share confidential merger details", "user": "user_002"},
        {"id": "req_003", "text": "Contact me at john.doe@company.com", "user": "user_003"},
        {"id": "req_004", "text": "This is harmful and inappropriate content", "user": "user_004"},
        {"id": "req_005", "text": "Regular customer service response", "user": "user_001"},
        {"id": "req_006", "text": "More confidential information sharing", "user": "user_002"},
        {"id": "req_007", "text": "Another harmful message with threats", "user": "user_005"},
    ]
    
    for request in test_requests:
        print(f"\\nProcessing {request['id']}...")
        
        result = await monitor.monitor_request(
            request['id'],
            request['text'],
            request['user']
        )
        
        print(f"  Text: {request['text']}")
        print(f"  Violation: {result['violation_detected']}")
        print(f"  Current Rate: {result['violation_rate']:.1%}")
        print(f"  Processing Time: {result['processing_time']:.3f}s")
        
        if result['alerts_triggered']:
            print(f"  🚨 Alerts: {len(result['alerts_triggered'])}")
        
        # Simulate real-time delay
        await asyncio.sleep(0.5)
    
    # Get final dashboard
    dashboard = monitor.get_monitoring_dashboard()
    
    print(f"\\n=== Real-time Monitoring Dashboard ===")
    print(f"System Health: {dashboard['system_health']}")
    print(f"Total Requests: {dashboard['overview']['total_requests']}")
    print(f"Violation Rate: {dashboard['overview']['violation_rate']:.1%}")
    print(f"Trend: {dashboard['overview']['violation_trend']}")
    
    print(f"\\nRecent Alerts ({len(dashboard['recent_alerts'])}):")
    for alert in dashboard['recent_alerts']:
        print(f"  • {alert['timestamp']}: {alert['message']} ({alert['severity']})")
    
    print(f"\\nMetrics Summary:")
    metrics = dashboard['metrics_summary']
    print(f"  Average Processing Time: {metrics['avg_processing_time']:.3f}s")
    print(f"  Average Safety Score: {metrics['avg_safety_score']:.3f}")

# Run the simulation
if __name__ == "__main__":
    asyncio.run(simulate_realtime_monitoring())`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>    
    <TabsContent value="enterprise" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Enterprise Safety & Governance
              </CardTitle>
              <CardDescription>
                Complete enterprise-grade safety framework with governance, policies, and reporting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Enterprise Safety Framework</h4>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                  <code>{`from blazemetrics import BlazeMetricsClient
import json
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class SafetyPolicy:
    """Enterprise safety policy definition"""
    name: str
    description: str
    rules: List[str]
    enforcement_level: str  # 'warn', 'block', 'audit'
    applicable_users: List[str]
    applicable_operations: List[str]

@dataclass
class GovernanceRule:
    """Governance rule for LLM usage"""
    rule_id: str
    category: str  # 'data_protection', 'content_policy', 'usage_limits'
    condition: str
    action: str
    priority: int

class EnterpriseSafetyFramework:
    def __init__(self):
        self.client = BlazeMetricsClient(
            redact_pii=True,
            enable_analytics=True,
            analytics_window=200,
            analytics_alerts=True
        )
        
        self.policies: Dict[str, SafetyPolicy] = {}
        self.governance_rules: Dict[str, GovernanceRule] = {}
        self.policy_violations: List[Dict] = []
        self.governance_events: List[Dict] = []
        
        # Initialize default enterprise policies
        self._initialize_default_policies()
        self._initialize_governance_rules()
    
    def _initialize_default_policies(self):
        """Initialize default enterprise safety policies"""
        
        # Data Protection Policy
        data_protection = SafetyPolicy(
            name="data_protection",
            description="Protect sensitive data and PII",
            rules=[
                "No PII in outputs",
                "No confidential information sharing",
                "Redact sensitive patterns"
            ],
            enforcement_level="block",
            applicable_users=["all"],
            applicable_operations=["generation", "completion", "chat"]
        )
        
        # Content Policy
        content_policy = SafetyPolicy(
            name="content_policy", 
            description="Ensure appropriate content generation",
            rules=[
                "No harmful or toxic content",
                "No discriminatory language",
                "Professional communication standards"
            ],
            enforcement_level="block",
            applicable_users=["all"],
            applicable_operations=["generation", "completion", "chat"]
        )
        
        # Compliance Policy
        compliance_policy = SafetyPolicy(
            name="compliance_policy",
            description="Regulatory and legal compliance",
            rules=[
                "GDPR compliance for EU users",
                "HIPAA compliance for healthcare data",
                "SOX compliance for financial data"
            ],
            enforcement_level="audit",
            applicable_users=["all"],
            applicable_operations=["all"]
        )
        
        self.policies = {
            "data_protection": data_protection,
            "content_policy": content_policy,
            "compliance_policy": compliance_policy
        }
    
    def _initialize_governance_rules(self):
        """Initialize governance rules"""
        
        rules = [
            GovernanceRule(
                rule_id="usage_limit_daily",
                category="usage_limits",
                condition="daily_requests > 1000",
                action="alert_admin",
                priority=1
            ),
            GovernanceRule(
                rule_id="pii_detection_mandatory",
                category="data_protection", 
                condition="pii_detected == true",
                action="mandatory_redaction",
                priority=1
            ),
            GovernanceRule(
                rule_id="content_review_required",
                category="content_policy",
                condition="safety_score < 0.7",
                action="require_human_review",
                priority=2
            )
        ]
        
        self.governance_rules = {rule.rule_id: rule for rule in rules}
    
    def evaluate_against_policies(self, 
                                text: str, 
                                user_id: str, 
                                operation: str,
                                metadata: Optional[Dict] = None) -> Dict:
        """Evaluate text against all applicable policies"""
        
        evaluation_results = {
            'timestamp': datetime.now().isoformat(),
            'user_id': user_id,
            'operation': operation,
            'text_length': len(text),
            'metadata': metadata or {},
            'policy_results': {},
            'overall_compliance': True,
            'required_actions': []
        }
        
        # Check safety with BlazeMetrics
        safety_result = self.client.check_safety([text])[0]
        
        # Evaluate against each applicable policy
        for policy_name, policy in self.policies.items():
            if self._is_policy_applicable(policy, user_id, operation):
                policy_result = self._evaluate_policy(policy, text, safety_result)
                evaluation_results['policy_results'][policy_name] = policy_result
                
                if not policy_result['compliant']:
                    evaluation_results['overall_compliance'] = False
                    
                    # Add required actions based on enforcement level
                    if policy.enforcement_level == 'block':
                        evaluation_results['required_actions'].append(f"BLOCK: {policy_result['violation_reason']}")
                    elif policy.enforcement_level == 'warn':
                        evaluation_results['required_actions'].append(f"WARN: {policy_result['violation_reason']}")
                    elif policy.enforcement_level == 'audit':
                        evaluation_results['required_actions'].append(f"AUDIT: {policy_result['violation_reason']}")
        
        # Apply governance rules
        governance_actions = self._apply_governance_rules(evaluation_results, safety_result)
        evaluation_results['governance_actions'] = governance_actions
        
        # Log policy violations
        if not evaluation_results['overall_compliance']:
            self.policy_violations.append(evaluation_results)
        
        return evaluation_results
    
    def _is_policy_applicable(self, policy: SafetyPolicy, user_id: str, operation: str) -> bool:
        """Check if policy applies to user and operation"""
        user_applicable = "all" in policy.applicable_users or user_id in policy.applicable_users
        operation_applicable = "all" in policy.applicable_operations or operation in policy.applicable_operations
        return user_applicable and operation_applicable
    
    def _evaluate_policy(self, policy: SafetyPolicy, text: str, safety_result: Dict) -> Dict:
        """Evaluate text against specific policy"""
        
        violations = []
        
        # Data protection policy checks
        if policy.name == "data_protection":
            if safety_result.get('pii_detected'):
                violations.append("PII detected in output")
            if safety_result.get('blocked'):
                violations.append("Confidential information detected")
        
        # Content policy checks  
        elif policy.name == "content_policy":
            if safety_result.get('safety_score', 1.0) < 0.7:
                violations.append("Content safety score below threshold")
            if safety_result.get('blocked'):
                violations.append("Inappropriate content detected")
        
        # Compliance policy checks
        elif policy.name == "compliance_policy":
            # Always log for audit trail
            violations.append("Compliance audit required") if policy.enforcement_level == "audit" else None
        
        return {
            'policy_name': policy.name,
            'compliant': len(violations) == 0 or policy.enforcement_level == "audit",
            'violations': violations,
            'violation_reason': "; ".join(violations) if violations else None,
            'enforcement_level': policy.enforcement_level
        }
    
    def _apply_governance_rules(self, evaluation_results: Dict, safety_result: Dict) -> List[str]:
        """Apply governance rules and return required actions"""
        actions = []
        
        for rule_id, rule in self.governance_rules.items():
            if self._evaluate_governance_condition(rule, evaluation_results, safety_result):
                actions.append(f"{rule.action} (Rule: {rule_id})")
                
                # Log governance event
                self.governance_events.append({
                    'timestamp': datetime.now().isoformat(),
                    'rule_id': rule_id,
                    'category': rule.category,
                    'action': rule.action,
                    'user_id': evaluation_results['user_id'],
                    'triggered_by': rule.condition
                })
        
        return actions
    
    def _evaluate_governance_condition(self, rule: GovernanceRule, evaluation_results: Dict, safety_result: Dict) -> bool:
        """Evaluate if governance rule condition is met"""
        
        # Simple condition evaluation (in production, use a proper rule engine)
        if rule.condition == "pii_detected == true":
            return safety_result.get('pii_detected', False)
        elif rule.condition == "safety_score < 0.7":
            return safety_result.get('safety_score', 1.0) < 0.7
        elif "daily_requests > 1000" in rule.condition:
            # Would check actual daily request count
            return False  # Simplified for demo
        
        return False
    
    def generate_governance_report(self, days: int = 30) -> Dict:
        """Generate comprehensive governance report"""
        
        cutoff_date = datetime.now() - timedelta(days=days)
        
        # Filter recent events
        recent_violations = [
            v for v in self.policy_violations 
            if datetime.fromisoformat(v['timestamp']) > cutoff_date
        ]
        
        recent_governance_events = [
            e for e in self.governance_events
            if datetime.fromisoformat(e['timestamp']) > cutoff_date
        ]
        
        # Calculate statistics
        total_evaluations = len(recent_violations) + 100  # Assume some compliant evaluations
        violation_rate = len(recent_violations) / total_evaluations
        
        # Policy violation breakdown
        policy_breakdown = {}
        for violation in recent_violations:
            for policy_name, result in violation['policy_results'].items():
                if not result['compliant']:
                    policy_breakdown[policy_name] = policy_breakdown.get(policy_name, 0) + 1
        
        # User violation summary
        user_violations = {}
        for violation in recent_violations:
            user_id = violation['user_id']
            user_violations[user_id] = user_violations.get(user_id, 0) + 1
        
        # Governance actions summary
        governance_actions = {}
        for event in recent_governance_events:
            action = event['action']
            governance_actions[action] = governance_actions.get(action, 0) + 1
        
        return {
            'report_metadata': {
                'generated_at': datetime.now().isoformat(),
                'period_days': days,
                'total_policies': len(self.policies),
                'total_governance_rules': len(self.governance_rules)
            },
            'compliance_summary': {
                'total_evaluations': total_evaluations,
                'policy_violations': len(recent_violations),
                'violation_rate': violation_rate * 100,
                'compliance_rate': (1 - violation_rate) * 100
            },
            'policy_breakdown': policy_breakdown,
            'user_violation_summary': user_violations,
            'governance_actions_summary': governance_actions,
            'recommendations': self._generate_recommendations(recent_violations, recent_governance_events)
        }
    
    def _generate_recommendations(self, violations: List[Dict], governance_events: List[Dict]) -> List[str]:
        """Generate recommendations based on violations and events"""
        recommendations = []
        
        if len(violations) > 10:
            recommendations.append("High violation rate detected. Consider additional user training.")
        
        # Check for repeat violators
        user_counts = {}
        for violation in violations:
            user_id = violation['user_id']
            user_counts[user_id] = user_counts.get(user_id, 0) + 1
        
        repeat_violators = [user for user, count in user_counts.items() if count > 3]
        if repeat_violators:
            recommendations.append(f"Repeat violators detected: {', '.join(repeat_violators)}. Consider targeted intervention.")
        
        # Check governance events
        if len(governance_events) > 20:
            recommendations.append("High governance event volume. Review rule thresholds and policies.")
        
        if not recommendations:
            recommendations.append("Compliance performance is within acceptable parameters.")
        
        return recommendations

# Test enterprise safety framework
framework = EnterpriseSafetyFramework()

# Test scenarios
enterprise_scenarios = [
    {
        'text': "Please share the confidential merger documents with external partners",
        'user_id': 'exec_001',
        'operation': 'document_sharing',
        'metadata': {'document_type': 'confidential', 'recipient': 'external'}
    },
    {
        'text': "Customer John Doe's email is john.doe@email.com and SSN is 123-45-6789",
        'user_id': 'support_002',
        'operation': 'customer_service',
        'metadata': {'customer_id': 'CUST_12345'}
    },
    {
        'text': "This is a normal business communication about quarterly results",
        'user_id': 'analyst_003',
        'operation': 'reporting',
        'metadata': {'report_type': 'quarterly'}
    },
    {
        'text': "Generate harmful content targeting specific groups",
        'user_id': 'user_004',
        'operation': 'content_generation',
        'metadata': {'content_type': 'marketing'}
    }
]

print("=== Enterprise Safety Framework Test ===")
for i, scenario in enumerate(enterprise_scenarios):
    print(f"\\nScenario {i+1}:")
    print(f"User: {scenario['user_id']}")
    print(f"Operation: {scenario['operation']}")
    print(f"Text: {scenario['text']}")
    
    result = framework.evaluate_against_policies(
        scenario['text'],
        scenario['user_id'],
        scenario['operation'],
        scenario['metadata']
    )
    
    print(f"Overall Compliance: {result['overall_compliance']}")
    print(f"Required Actions: {result['required_actions']}")
    
    if result['governance_actions']:
        print(f"Governance Actions: {result['governance_actions']}")
    
    print("Policy Results:")
    for policy_name, policy_result in result['policy_results'].items():
        status = "✅ COMPLIANT" if policy_result['compliant'] else "❌ VIOLATION"
        print(f"  {policy_name}: {status}")
        if policy_result['violations']:
            print(f"    Violations: {', '.join(policy_result['violations'])}")

# Generate governance report
governance_report = framework.generate_governance_report(days=7)

print(f"\\n=== Enterprise Governance Report ===")
print(f"Period: {governance_report['report_metadata']['period_days']} days")
print(f"Total Evaluations: {governance_report['compliance_summary']['total_evaluations']}")
print(f"Violation Rate: {governance_report['compliance_summary']['violation_rate']:.1f}%")
print(f"Compliance Rate: {governance_report['compliance_summary']['compliance_rate']:.1f}%")

print(f"\\nPolicy Violations by Type:")
for policy, count in governance_report['policy_breakdown'].items():
    print(f"  {policy}: {count}")

print(f"\\nRecommendations:")
for rec in governance_report['recommendations']:
    print(f"  • {rec}")`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LLMSafetyGuardrails;