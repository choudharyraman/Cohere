# Software Requirements Specification (SRS)
**Mapped against ISO 13485:2016 and FDA QMSR (21 CFR Part 820)**

## 1. Introduction
This SRS defines the functional and safety requirements for the Aurora Health Tech 2.0 application. It establishes the design controls for biometric tracking and triage features.

## 2. Risk-Traceability Matrix
| Requirement ID | Description | ISO 13485 Clause | Safety Profile / Hazard | Mitigation |
|---|---|---|---|---|
| REQ-001 | Ingest HRV from face scan (rPPG) | 7.3.3 (Design Inputs) | Inaccurate HRV reading leading to over-exertion | Confidence score threshold. Manual fallback. |
| REQ-002 | Vocal depression/anxiety monitoring | 7.3.4 (Design Outputs) | Misclassification of mental state | Human-in-the-loop review. Clinical triage handoff. |
| REQ-003 | Emergency Voice First-Aid | 7.3.9 (Control of Changes) | Incorrect medical advice | Step-by-step verified templates. Simultaneous 911 dialing. |

## 3. FDA Quality Management System Regulation (QMSR) Compliance
All algorithmic updates must follow the Algorithmic Change Protocol defined in `pccp.md`. Automated bias audits (`run-bias-audit.js`) execute weekly to ensure demographic equity.
