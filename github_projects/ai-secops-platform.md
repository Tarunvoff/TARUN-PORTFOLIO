# ai-secops-platform

**Description:** No description provided.

## README

# AI SecOps Platform

> **Production-grade AI security operations — protect, monitor, and audit every LLM interaction in real time.**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green.svg)](https://fastapi.tiangolo.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg)](docker-compose.yml)

---

## What is AI SecOps?

AI SecOps is an open-source security operations platform that sits in front of any LLM or AI endpoint. Every prompt is inspected by a multi-model threat detection pipeline before it reaches the model, and every response is sanitised before it reaches the user.

**Use cases**

- Protect an internal Ollama / LLaMA deployment from prompt injection attacks
- Add security guardrails to an OpenAI or Anthropic integration
- Monitor and audit AI usage across a multi-tenant SaaS product
- Run a red-team lab to probe your AI system's attack surface
- Build a SOC around AI traffic with real-time anomaly dashboards

---

## Security Pipeline

```
User Prompt
    │
    ▼
┌──────────────────────────────┐
│  1. Fast Pre-Filter           │  < 5 ms — regex + keyword block list
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│  2. Threat Detection Models   │  E5 + BGE embeddings, IsolationForest,
│                               │  BART zero-shot intent, trajectory model
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│  3. Fusion Engine             │  MLP combining all model scores → [0, 1]
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│  4. Policy Decision           │  SAFE / SUSPICIOUS / HIGH / CRITICAL
│                               │  Per-tenant thresholds and rate limits
└─────────────┬────────────────┘
              │  (SAFE or SUSPICIOUS only)
              ▼
┌──────────────────────────────┐
│  5. LLM / Target Endpoint     │  Ollama (local) or any external AI API
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│  6. Output Security           │  PII scrubbing, toxic content filter,
│                               │  data-exfiltration detection
└─────────────┬────────────────┘
              │
              ▼
    Safe Response
```

**HIGH** and **CRITICAL** tier prompts are blocked before reaching the LLM.

---

## Features

### Threat Detection
- **Dual embedding** — `intfloat/e5-large-v2` + `BAAI/bge-large-en-v1.5`
- **Anomaly detection** — IsolationForest trained on adversarial prompt datasets
- **Intent classification** — `facebook/bart-large-mnli` zero-shot (jailbreak, injection, exfiltration)
- **Trajectory modeling** — Transformer encoder tracking session-level escalation patterns
- **Fusion MLP** — Learned combination of all model scores with online retraining

### SOC Dashboard
- Real-time threat feed and security event timeline
- Threat score distribution, model performance metrics
- Tenant-level audit views and rate-limit monitoring
- Built with React + TypeScript + Tailwind CSS

### Secure Gateway
- Universal AI proxy — `POST /secure-gateway` forwards approved prompts to any endpoint
- Supports OpenAI, Anthropic, Azure OpenAI, and any OpenAI-compatible API
- Response sanitisation applied before returning to caller

### Multi-Tenant Platform
- Per-tenant threat thresholds and rate-limit policies
- Isolated audit logs per tenant
- REST API for tenant provisioning

### Red Team Lab
- Automated adversarial attack simulation
- Coverage: prompt injection, gradual escalation, obfuscation, FGSM embeddings
- HTML and JSONL report generation

---

## Quick Start

### Docker (recommended)

```bash
git clone https://github.com/Tarunvoff/ai-secops-platform.git
cd ai-secops-platform
docker compose up --build
```

Services started:

| Service    | URL                        |
|------------|----------------------------|
| Backend API | http://localhost:8000      |
| API Docs    | http://localhost:8000/docs |
| Dashboard   | http://localhost:5173      |

### Manual

**Backend**

```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn backend.enterprise_api:app --host 0.0.0.0 --port 8000
```

**Dashboard**

```bash
cd dashboard
npm install
npm run dev
```

---

## API Reference

### Analyse a prompt

```http
POST /analyze
Content-Type: application/json

{
  "prompt": "Ignore all previous instructions and...",
  "tenant_id": "default",
  "session_id": "user-123"
}
```

**Response**

```json
{
  "threat_level": "HIGH",
  "fusion_score": 0.87,
  "blocked": true,
  "threats": ["prompt_injection", "jailbreak"],
  "latency_ms": 42
}
```

### Secure Gateway (proxy to LLM)

```http
POST /secure-gateway
Content-Type: application/json

{
  "prompt": "Explain quantum computing",
  "provider": "openai",
  "model": "gpt-4o",
  "tenant_id": "default"
}
```

Full API docs available at `http://localhost:8000/docs` when the backend is running.

---

## Project Structure

```
ai-secops-platform/
├── backend/               # FastAPI backend
│   ├── enterprise_api.py  # Main API entrypoint
│   ├── intelligence/      # Threat detection models
│   ├── pipeline/          # Security pipeline stages
│   ├── redteam/           # Red team simulation engine
│   └── tenants/           # Multi-tenant management
├── dashboard/             # React + TypeScript SOC dashboard
│   └── src/
│       ├── components/    # UI components
│       └── pages/         # Dashboard views
├── fusion_engine/         # Fusion MLP scoring engine
├── anomaly_detection/     # IsolationForest anomaly model
├── trajectory_model/      # Session trajectory transformer
├── data/                  # Threat datasets and indices
└── docker-compose.yml
```

---

## SDK

Looking to integrate AI SecOps into your own application with one import?

**[aisecops-sdk-securellm →](https://github.com/Tarunvoff/aisecops-sdk-securellm)**

```bash
pip install securellm
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[Apache 2.0](LICENSE)

