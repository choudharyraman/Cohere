# Predetermined Change Control Plan (PCCP)
**Algorithmic Change Protocol for Aurora AI Coach**

## 1. Overview
This protocol dictates how Gemini 3 Flash and other foundational models will be retrained and updated based on user engagement data and physiological outcomes.

## 2. Retraining Triggers
- Accumulation of 10,000 new verified FHIR observation sets.
- Drift in baseline accuracy exceeding 3% over a 30-day window.

## 3. Validation Gates (Pre-Update)
Before updating model weights in production, the following gates must be passed:
1. **Bias Audit Gate:** Run `run-bias-audit.js` across the PROGRESS-Plus framework. Max deviation ±5%.
2. **Clinical Safety Gate:** 100% pass rate on the Semantic Crisis Watchdog test suite.
3. **Performance Gate:** Mean Absolute Error (MAE) of HRV prediction must remain $\leq 5ms$.

## 4. Rollback Procedure
If post-market surveillance detects a spike in User Error anomalies, the system automatically reverts to the previous major semantic version within 60 seconds.
