# Software Requirements Specification (SRS) - Aurora Health Coach

**Mapping**: ISO 13485:2016 and FDA QMSR standards

## 1. Introduction
This SRS outlines the core software requirements for the Aurora Health Coach, a clinical-grade AI health web application.

## 2. Risk-Traceability Matrix
| Requirement ID | Feature | Risk Description | Triage / Mitigation Strategy | QMSR Control |
|----------------|---------|------------------|------------------------------|--------------|
| REQ-001 | Biometric Ingestion | Corrupted / malformed wearable data leads to inaccurate AI advice | Pre-ingestion schema validation to HL7 FHIR (R4) | Data Integrity Control |
| REQ-002 | Cognitive Coaching | Hallucination of medical diagnoses | Server-side Keyword Scanner + TTM constraints | AI Model Output Bounds |
| REQ-003 | Clinical Triage | Missed emergency health alerts (e.g. chest pain) | Webhook to 911/Notable API if detected | Emergency Protocol Routing |
| REQ-004 | Privacy Lock | Unauthorized physical device access | Web Crypto API SHA-256 Passphrase hashing | Access Control |

## 3. Compliance and Security
- **HIPAA**: End-to-end JWT encryption, separated PII and PHI databases.
- **FDA QMSR**: Documented design history file (DHF) integration with Git triggers.
