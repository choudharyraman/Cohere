# Predetermined Change Control Plan (PCCP)

## 1. Scope
This protocol governs the algorithmic change management for the Gemini 1.5 Pro / 3.0 models utilized in the Aurora Health Coach.

## 2. Algorithmic Change Protocol
- **Trigger**: Retraining is triggered automatically every 30 days based on anonymized user engagement data and outcome metrics.
- **Boundaries**: Retraining is restricted to adapting communication style (TTM Stage transitions). It MAY NOT alter clinical triage logic or hard-coded safety triggers.

## 3. Validation Gates
Before a new model weight set is deployed to production:
1. **Bias Sweep**: Must pass the `run-bias-audit.js` script with <5% deviation across PROGRESS-Plus demographics.
2. **Safety Check**: Must successfully route 100% of simulated emergency keywords to the triage webhook.
3. **Accuracy Check**: Must accurately categorize 95% of test inputs into the correct TTM Stage.
