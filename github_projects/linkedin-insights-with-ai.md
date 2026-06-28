# linkedin-insights-with-ai

**Description:** No description provided.

## README

# LinkedIn Insights Service

A hybrid data extraction microservice that combines official LinkedIn APIs, web scraping, and generative AI to provide company insights.

## Features

- **Hybrid Data Retrieval**: Prioritizes standard scraping for public data but integrates an official OAuth 2.0 flow for authorized API access.
- **AI Analytics**: Uses Google Gemini to generate neutral, fact-based company summaries from raw data.
- **Deep Scraping**: Extracts detailed metadata including follower counts, company size, recent posts, and employee snapshots.
- **Smart Caching**: MongoDB storage with automatic invalidation and "refresh" capabilities.
- **Robust Error Handling**: Swallows upstream failures gracefully—your API calls succeed even if LinkedIn blocks a specific scrape request.

## Tech Stack

- **FastAPI**: High-performance async API framework.
- **MongoDB + Beanie**: Flexible document storage designed for semi-structured scraping data.
- **Google Gemini**: Large Language Model for generating summaries.
- **httpx**: Async HTTP client for both scraping and OAuth flows.
- **Docker**: Containerized for easy deployment.

## Quick Start

### 1. Configuration

Create a `.env` file in the root directory:

```bash
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=linkedin_insights
DEBUG=True
SECRET_KEY=your-random-secret-key

# Scraper Settings
LINKEDIN_BASE_URL=https://www.linkedin.com/company

# AI Summaries (Optional)
GEMINI_API_KEY=your_gemini_key

# LinkedIn OAuth (Optional)
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:8000/api/v1/auth/linkedin/callback
```

### 2. Run with Docker (Recommended)

```bash
# Build the image
docker build -t linkedin-insights .

# Run container (don't forget to pass your env file)
docker run -p 8000:8000 --env-file .env linkedin-insights
```

### 3. Run Locally

Ensure you have Python 3.11+ and MongoDB running.

```bash
# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload
```

## API Usage

### Authentication
- `GET /api/v1/auth/linkedin/login`: Initiates the OAuth 2.0 flow.
- `GET /api/v1/auth/linkedin/callback`: Handles the redirect and exchanges code for an access token.

### Company Data
- `GET /api/v1/pages`: List stored companies with filtering (industry, followers).
- `GET /api/v1/pages/{page_id}`: Retrieve company details. Scrapes live if not found.
- `GET /api/v1/pages/{page_id}/summary`: Returns a 3-5 sentence AI-generated summary.

### Deep Scraping
- `POST /api/v1/posts/{post_id}/refresh`: Triggers a fresh scrape for a specific post.

## Architecture Notes

**Database-First Strategy**
The service always checks MongoDB first. Accessing external sites is slow and risky (rate limits, blocks), so we only go out to the network when necessary or explicitly requested via `?refresh=true`.

**Error Handling**
If LinkedIn blocks a request or returns a 502/429, the service **does not crash**. It returns a valid JSON response with `scrape_status: "blocked"` or `"failed"`. This ensures your downstream applications never receive unexpected 500 errors.

## Limitations

- **Public Scraping**: Data is limited to what is publicly visible without login.
- **Stability**: HTML structures change. The parser is robust but may need updates.
- **Rate Limits**: While the official API has rate limits, the scraper does not. Use responsibly.

