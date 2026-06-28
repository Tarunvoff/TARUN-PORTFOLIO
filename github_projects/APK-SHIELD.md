# APK-SHIELD

**Description:** No description provided.

## README

# 🛡️ APKShield AI — Fraudulent APK Analysis & Risk Scoring Platform

APKShield AI is a production-grade static analysis and AI threat intelligence platform targeting banking security groups and cybersecurity research teams. The platform automates mobile malware reverse engineering, maps findings directly to **MITRE ATT&CK Mobile (v14)**, checks **VirusTotal reputation**, scores vulnerability vectors against the **OWASP MASVS** standard, and leverage **Gemini 2.5 Pro** as an AI malware analyst.

---

## 🚀 Key Features

* **VirusTotal Threat Intelligence**: Privacy-safe lookup by SHA256 hash immediately after upload (the APK binary never leaves your local infrastructure).
* **Static Analysis Pipeline**: Decompilation using JADX and APKTool, DEX structure analysis using Androguard, packer detection with APKiD, and behavioral checks via Quark.
* **OWASP MASVS Verification**: Automated rules scoring applications across all 7 verification categories.
* **MITRE ATT&CK Mapping**: Custom static mapping table linking finding types to MITRE Mobile tactics and techniques.
* **AI Malware Analyst**: Gemini 2.5 Pro evaluates all findings in JSON mode to classify the APK into one of 10 defined malware families (e.g. Banking Trojan, Spyware, RAT).
* **AI Copilot Explainer**: Per-finding AI deep dives outlining the threat impact and remediation steps for developers and security analysts.
* **Dark Mode SOC Dashboard**: Stunning Next.js 15 cyber-style interface complete with risk scoring gauges, timelines, interactive findings tables, and charts (Recharts).

---

## 🛠️ Technology Stack

* **Backend**: FastAPI, Celery, Redis, SQLAlchemy (Async PostgreSQL), Androguard, APKTool, JADX, Quark, APKiD.
* **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Recharts, Framer Motion, Axios.
* **Orchestration**: Docker, Docker Compose, PostgreSQL 15, Redis 7.

---

## 🏁 Quick Start (Docker Compose)

The easiest way to run the entire APKShield AI platform is using Docker Compose:

### 1. Configure Environment Variables
Copy the template `.env.example` in the root folder to `.env` and configure your API keys:
```bash
cp .env.example .env
```

Ensure you set:
* `GOOGLE_API_KEY`: A valid Google AI Studio Gemini API Key.
* `VIRUSTOTAL_API_KEY`: (Optional) Your VirusTotal API v3 key.

### 2. Boot Services
Run the following command in the project root:
```bash
docker-compose up --build -d
```

This starts:
1. **PostgreSQL** (`:5432`) — Primary storage database.
2. **Redis** (`:6379`) — Caching & Celery broker.
3. **FastAPI Backend** (`:8000`) — REST API and database migrations.
4. **Celery Worker** — Background task executor for processing APK files.
5. **Next.js Frontend** (`:3000`) — Dark SOC Dashboard web interface.
6. **MobSF sidecar** (`:8008`) — Mobile Security Framework container.

### 3. Access Platform
* Dashboard: [http://localhost:3000](http://localhost:3000)
* API Swagger Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)
* MobSF Console: [http://localhost:8008](http://localhost:8008)

---

## 🧑‍💻 Local Setup (Development)

To run the components locally for development, you can set them up individually:

### Backend
1. Python 3.11 environment required. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
3. Run Celery task worker:
   ```bash
   celery -A app.workers.celery_app.celery_app worker --loglevel=info -Q analysis
   ```

### Frontend
1. Node.js 20+ required. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start Next.js dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Privacy Architecture

APKs uploaded to APKShield AI remain on your servers. Only the **SHA256 hash** is sent to external threat intelligence APIs (such as VirusTotal) to verify known malware hashes, ensuring compliance with enterprise data policies and protecting sensitive proprietary source code.

