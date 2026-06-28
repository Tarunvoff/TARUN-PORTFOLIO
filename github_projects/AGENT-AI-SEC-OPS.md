# AGENT-AI-SEC-OPS

**Description:** No description provided.

## README

# SecureLLM SDK

> **Secure any LLM with 1 import and 2 lines of code.**

[![PyPI](https://img.shields.io/pypi/v/securellm?color=brightgreen)](https://pypi.org/project/securellm/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.10%20|%203.11%20|%203.12-blue)](https://pypi.org/project/securellm/)

```python
from aisecops_sdk import SecureLLM

llm = SecureLLM(provider="openai", model="gpt-4o")
response = llm.chat("Explain quantum computing")
```

SecureLLM wraps your LLM calls with a production-grade AI security pipeline:

```
User Prompt
    ?  Threat Detection (ML Fusion Engine)
    ?  Security Policy Decision
    ?  LLM Call (only if approved)
    ?  Output Sanitisation
    ?  Safe Response
```

Powered by the **[AI SecOps Platform](https://github.com/Tarunvoff/ai-secops-platform)**.

---

## Installation

```bash
pip install securellm
```

With provider extras:

```bash
pip install securellm[openai]       # OpenAI support
pip install securellm[anthropic]    # Anthropic Claude support
pip install securellm[langchain]    # LangChain integration
pip install securellm[all]          # Everything
```

> **Prerequisite**: The AI SecOps backend must be running.
> ```bash
> docker compose up   # from ai-secops-platform repo
> ```

---

## Quick Start

### OpenAI

```python
import os
from aisecops_sdk import SecureLLM

os.environ["OPENAI_API_KEY"] = "sk-..."

llm = SecureLLM(provider="openai", model="gpt-4o")
response = llm.chat("Summarise the history of AI safety research")
print(response)
```

### Anthropic Claude

```python
import os
from aisecops_sdk import SecureLLM

os.environ["ANTHROPIC_API_KEY"] = "sk-ant-..."

llm = SecureLLM(provider="anthropic", model="claude-3-5-sonnet-20241022")
response = llm.chat("What are the risks of unconstrained AI?")
print(response)
```

### Any OpenAI-compatible endpoint (Ollama, local models)

```python
from aisecops_sdk import SecureLLM

llm = SecureLLM(
    provider="openai",
    model="llama3",
    base_url="http://localhost:11434/v1",
    api_key="ollama",
)
response = llm.chat("Hello")
```

---

## LangChain Integration

```python
from aisecops_sdk.langchain import SecureLLMChain
from langchain.prompts import PromptTemplate

chain = SecureLLMChain(
    provider="openai",
    model="gpt-4o",
    prompt=PromptTemplate.from_template("Answer this: {question}"),
)

result = chain.run(question="What is prompt injection?")
```

---

## CLI

The SDK ships with a command-line tool for quick testing and configuration.

```bash
# Check backend connection
securellm status

# Analyse a prompt without sending it to an LLM
securellm analyze "Ignore all previous instructions"

# Interactive secure chat
securellm chat --provider openai --model gpt-4o

# View recent security events
securellm events --limit 20
```

---

## Configuration

### Environment variables

| Variable | Description | Default |
|---|---|---|
| `AISECOPS_API_URL` | AI SecOps backend URL | `http://localhost:8000` |
| `AISECOPS_API_KEY` | API key for authenticated deployments | — |
| `AISECOPS_TENANT_ID` | Tenant identifier for multi-tenant setups | `default` |
| `OPENAI_API_KEY` | OpenAI API key | — |
| `ANTHROPIC_API_KEY` | Anthropic API key | — |

### Programmatic config

```python
from aisecops_sdk import SecureLLM, AiSecOpsConfig

config = AiSecOpsConfig(
    api_url="https://your-aisecops-instance.com",
    api_key="your-api-key",
    tenant_id="your-tenant",
    block_on_high=True,
    block_on_critical=True,
)

llm = SecureLLM(provider="openai", model="gpt-4o", config=config)
```

---

## Threat Levels

Every prompt is assigned one of four threat levels by the fusion engine:

| Level | Score | Action |
|---|---|---|
| `SAFE` | 0.0 – 0.4 | Prompt forwarded to LLM |
| `SUSPICIOUS` | 0.4 – 0.6 | Forwarded with audit flag |
| `HIGH` | 0.6 – 0.8 | Blocked by default |
| `CRITICAL` | 0.8 – 1.0 | Always blocked |

---

## Security Events

```python
from aisecops_sdk import AiSecOpsClient

client = AiSecOpsClient()
events = client.get_events(limit=10)

for event in events:
    print(event.threat_level, event.prompt[:60], event.fusion_score)
```

---

## Platform

The SDK connects to the **AI SecOps Platform** — the open-source backend that runs the ML threat detection pipeline.

**[ai-secops-platform ?](https://github.com/Tarunvoff/ai-secops-platform)**

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[Apache 2.0](LICENSE)

