# RAG-BASED-DOCUMENT-QUERY

**Description:** No description provided.

## README

# 🚀 Enhanced Document Query API with LangChain

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116+-green.svg)](https://fastapi.tiangolo.com/)
[![LangChain](https://img.shields.io/badge/LangChain-0.1+-orange.svg)](https://langchain.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A sophisticated AI-powered document analysis system that leverages **LangChain RAG (Retrieval-Augmented Generation)**, **Google Gemini AI**, **Pinecone vector database**, and **PostgreSQL** for intelligent document processing, semantic search, and real-time querying with advanced caching and analytics.

## 🏗️ Technology Stack

- **🔗 RAG Framework**: LangChain for advanced document Q&A
- **🤖 AI & ML**: Google Gemini AI 2.5 Pro, Gemini Embeddings, Sentence Transformers
- **🗄️ Databases**: Pinecone (Vector), PostgreSQL (Relational)
- **🌐 Web Framework**: FastAPI, Uvicorn
- **📄 Document Processing**: PyMuPDF, python-docx, OCR support
- **⚡ Caching**: Redis (optional)
- **🔧 Infrastructure**: Cloud-deployable, Production-ready

## ✨ Features

### 🔗 LangChain RAG Pipeline
- **Advanced Retrieval-Augmented Generation**: State-of-the-art document Q&A using LangChain
- **Intelligent Text Chunking**: Recursive character splitting with optimal overlap
- **Semantic Search**: Gemini embeddings with Pinecone vector store
- **Context-Aware Responses**: Structured answers with evidence and conditions

### 📄 Document Processing
- **Multi-format Support**: PDF, DOCX, EML, TXT, and image files (with OCR)
- **Smart Text Extraction**: Enhanced PDF processing with OCR fallback
- **Metadata Preservation**: Document tracking and version management

### 🤖 AI Integration
- **Google Gemini 2.5 Pro**: Latest LLM for answer generation
- **Gemini Embeddings**: 768-dimensional semantic embeddings
- **Retry Logic**: Robust error handling and fallback mechanisms
- **Custom Prompts**: Insurance and financial document specialized prompts

### 🚀 Advanced Features
- **Intelligent Caching**: Redis-based caching for improved performance
- **Document Analytics**: Comprehensive analysis including readability and complexity
- **Batch Processing**: Process multiple documents concurrently
- **Real-time Updates**: WebSocket support for live processing
- **Document Comparison**: Compare multiple documents across specified aspects

## 🏗️ Architecture

The system is modularized into the following components:

```
├── config.py              # Configuration management
├── models.py               # Pydantic data models
├── cache_manager.py        # Redis caching system
├── document_processor.py   # Document text extraction
├── query_optimizer.py      # Query optimization and intent classification
├── document_analytics.py   # Document analysis and insights
├── gemini_parser.py        # Gemini API integration
├── embedding_search.py     # Enhanced embedding search engine
├── batch_processor.py      # Batch and streaming processing
├── api_handler.py          # Main API orchestration
├── main.py                 # FastAPI application
└── requirements.txt        # Dependencies
```

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd BAJAJ_FINSERV

# Run the automated setup and start script
python run_project.py
```

### Option 2: Manual Setup
```bash
# 1. Clone the repository
git clone <repository-url>
cd BAJAJ_FINSERV

# 2. Create virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables (copy and edit .env file)
# Required: GEMINI_API_KEY, PINECONE_API_KEY, PINECONE_INDEX_NAME
# Optional: DATABASE_URL, REDIS_URL

# 5. Test the integration
python test_langchain_integration.py

# 6. Run the application
python main.py
