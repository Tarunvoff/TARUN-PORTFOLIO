#!/usr/bin/env python3
import os
import sys
import json
import urllib.request
import urllib.error
import base64
import ssl
import argparse

# Config
DEFAULT_USERNAME = "Tarunvoff"
GITHUB_PROJECTS_DIR = "github_projects"
PROJECTS_JSON_PATH = "projects.json"
APP_PROJECTS_JSON_PATH = os.path.join("app", "projects.json")

def load_env_token():
    # Try reading from .env files first
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:
        return token
    
    for path in [".env", "app/.env", ".env.local", "app/.env.local"]:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#"):
                            parts = line.split("=", 1)
                            if len(parts) == 2:
                                key, val = parts[0].strip(), parts[1].strip()
                                # strip quotes if any
                                if val.startswith(('"', "'")) and val.endswith(('"', "'")):
                                    val = val[1:-1]
                                if key in ["GITHUB_TOKEN", "GH_TOKEN"]:
                                    return val
            except Exception:
                pass
    return None

def fetch_api(url, token=None):
    req = urllib.request.Request(url)
    req.add_header("User-Agent", "Tarunvoff-Portfolio-Sync")
    req.add_header("Accept", "application/vnd.github.v3+json")
    if token:
        req.add_header("Authorization", f"token {token}")
        
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        if e.code == 403:
            print(f"\n[Error] Rate limited or unauthorized (403) for URL: {url}")
            limit = e.headers.get("X-RateLimit-Limit")
            remaining = e.headers.get("X-RateLimit-Remaining")
            reset = e.headers.get("X-RateLimit-Reset")
            print(f"Rate Limit: {limit}, Remaining: {remaining}, Reset: {reset}")
            if not token:
                print("Tip: Provide a GitHub Personal Access Token (PAT) via GITHUB_TOKEN env var or --token argument to increase limit.")
        else:
            print(f"\n[Error] HTTP {e.code} for URL: {url}")
        return None
    except Exception as e:
        print(f"\n[Error] Failed to connect for URL {url}: {e}")
        return None

def fetch_raw_readme(username, repo_name):
    # Try raw github content to save api rate limit (works for public repos)
    for branch in ["main", "master"]:
        url = f"https://raw.githubusercontent.com/{username}/{repo_name}/{branch}/README.md"
        req = urllib.request.Request(url)
        req.add_header("User-Agent", "Tarunvoff-Portfolio-Sync")
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        try:
            with urllib.request.urlopen(req, context=ctx) as response:
                return response.read().decode("utf-8")
        except urllib.error.HTTPError as e:
            if e.code == 404:
                continue
            break
        except Exception:
            break
    return None

def fetch_api_readme(owner, repo_name, token):
    url = f"https://api.github.com/repos/{owner}/{repo_name}/readme"
    data = fetch_api(url, token)
    if data and data.get("content") and data.get("encoding") == "base64":
        try:
            return base64.b64decode(data["content"]).decode("utf-8")
        except Exception as e:
            print(f"Error decoding base64 readme for {repo_name}: {e}")
    return None

def main():
    # Force stdout/stderr to use UTF-8 on Windows to avoid UnicodeEncodeErrors with emojis
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except AttributeError:
        pass  # reconfigure not supported in older python versions

    parser = argparse.ArgumentParser(description="Sync GitHub repositories to local markdown files and projects.json")
    parser.add_argument("--username", default=DEFAULT_USERNAME, help="GitHub username")
    parser.add_argument("--token", help="GitHub Personal Access Token")
    parser.add_argument("--force", action="store_true", help="Force overwrite all markdown files")
    args = parser.parse_args()

    token = args.token or load_env_token()
    username = args.username

    print(f"=== Syncing GitHub Repositories for {username} ===")
    if token:
        print("Using authenticated GitHub connection.")
    else:
        print("Using unauthenticated GitHub connection (subject to API rate limits).")

    # Ensure output directory exists
    os.makedirs(GITHUB_PROJECTS_DIR, exist_ok=True)

    # 1. Fetch all repositories
    repos = []
    if token:
        # Fetch all authenticated user's repos (including private/org)
        print("Fetching repositories list (authenticated)...")
        page = 1
        while True:
            url = f"https://api.github.com/user/repos?per_page=100&page={page}&type=all"
            page_repos = fetch_api(url, token)
            if not page_repos:
                break
            # Filter only those where owner is the specified user or we are owner
            for r in page_repos:
                if r["owner"]["login"].lower() == username.lower():
                    repos.append(r)
            if len(page_repos) < 100:
                break
            page += 1
    else:
        # Fetch public repos for username
        print("Fetching public repositories list...")
        page = 1
        while True:
            url = f"https://api.github.com/users/{username}/repos?per_page=100&page={page}"
            page_repos = fetch_api(url)
            if not page_repos:
                break
            repos.extend(page_repos)
            if len(page_repos) < 100:
                break
            page += 1

    if not repos:
        print("No repositories found or failed to fetch. Exiting.")
        sys.exit(1)

    print(f"Found {len(repos)} repositories under {username}'s account.")

    # 2. Load existing projects.json to merge data
    existing_projects = {}
    for path in [PROJECTS_JSON_PATH, APP_PROJECTS_JSON_PATH]:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    for item in data:
                        if "name" in item:
                            existing_projects[item["name"]] = item
            except Exception as e:
                print(f"Warning: Failed to load existing projects from {path}: {e}")

    # 3. Process each repository
    updated_projects = []
    new_downloads_count = 0
    updated_count = 0

    for idx, repo in enumerate(repos, 1):
        name = repo["name"]
        description = repo.get("description") or "No description provided."
        language = repo.get("language")
        stars = repo.get("stargazers_count", 0)
        forks = repo.get("forks_count", 0)
        topics = repo.get("topics", [])
        url = repo["html_url"]
        homepage = repo.get("homepage")
        created_at = repo["created_at"]
        updated_at = repo["updated_at"]

        md_path = os.path.join(GITHUB_PROJECTS_DIR, f"{name}.md")
        
        # Check if we should download the README
        readme_content = None
        has_local_md = os.path.exists(md_path)
        
        # If we already have it in existing_projects, we can reuse it to save API calls,
        # unless args.force is specified or it's a new repository.
        if not args.force and name in existing_projects:
            readme_content = existing_projects[name].get("readme")

        if readme_content is None:
            print(f"[{idx}/{len(repos)}] Fetching README for {name}...", end="", flush=True)
            # Try to fetch
            if token:
                readme_content = fetch_api_readme(repo["owner"]["login"], name, token)
            else:
                readme_content = fetch_raw_readme(username, name)
                
            if readme_content is None:
                # Fallback to API if raw content failed and no token
                if not token:
                    readme_content = fetch_api_readme(username, name, None)
                    
            if readme_content is None:
                readme_content = "No README found."
                print(" (No README found)", flush=True)
            else:
                print(" Done", flush=True)
                new_downloads_count += 1
        else:
            # We already have it, but we can verify if the markdown file exists
            if not has_local_md:
                new_downloads_count += 1
            else:
                updated_count += 1

        # Save markdown file
        md_content = f"# {name}\n\n**Description:** {description}\n\n## README\n\n{readme_content}\n"
        try:
            with open(md_path, "w", encoding="utf-8") as f:
                f.write(md_content)
        except Exception as e:
            print(f"Error writing markdown for {name}: {e}")

        # Construct project data object
        project_obj = {
            "name": name,
            "description": description,
            "language": language,
            "stars": stars,
            "forks": forks,
            "topics": topics,
            "url": url,
            "homepage": homepage,
            "created_at": created_at,
            "updated_at": updated_at,
            "readme": readme_content
        }
        updated_projects.append(project_obj)

    # 4. Merge remaining projects that were in projects.json but not in GitHub fetched list
    # (e.g. if the user deleted them on GitHub or they are in organizations we don't have access to)
    fetched_names = {r["name"] for r in repos}
    merged_count = 0
    for name, item in existing_projects.items():
        if name not in fetched_names:
            updated_projects.append(item)
            merged_count += 1

    # Sort projects alphabetically by name
    updated_projects.sort(key=lambda x: x["name"].lower())

    # 5. Save projects.json files
    for path in [PROJECTS_JSON_PATH, APP_PROJECTS_JSON_PATH]:
        try:
            # Ensure folder exists
            os.makedirs(os.path.dirname(path) if os.path.dirname(path) else ".", exist_ok=True)
            with open(path, "w", encoding="utf-8") as f:
                json.dump(updated_projects, f, indent=2, ensure_ascii=False)
            print(f"Successfully wrote data to {path}")
        except Exception as e:
            print(f"Error writing database to {path}: {e}")

    # Print summary
    print("\n=== Sync Summary ===")
    print(f"Total projects processed: {len(repos)}")
    print(f"New / overwritten README downloads: {new_downloads_count}")
    print(f"Reused local READMEs: {updated_count}")
    print(f"Merged from existing database: {merged_count}")
    print(f"Total database entries in projects.json: {len(updated_projects)}")
    
    # 6. Compare with portfolioData.ts to find projects not yet in portfolioData.ts
    try:
        from_ts_names = set()
        ts_path = os.path.join("app", "src", "data", "portfolioData.ts")
        if os.path.exists(ts_path):
            with open(ts_path, "r", encoding="utf-8") as f:
                ts_content = f.read()
                # Find project names in portfolioData.ts
                # Quick scan of "github: 'https://github.com/..." urls
                import re
                urls = re.findall(r"github:\s*['\"]https://github\.com/[^/]+/([^/'\"]+)['\"]", ts_content)
                from_ts_names = {u.strip() for u in urls}
                
        # Find new projects
        new_projects = [p for p in updated_projects if p["name"] not in from_ts_names and p["name"] != "TARUN-PORTFOLIO" and p["name"] != "Tarunvoff"]
        if new_projects:
            print("\n🚀 The following projects are in projects.json but NOT in portfolioData.ts yet:")
            for p in new_projects:
                print(f" - {p['name']} ({p['language'] or 'No language'}): {p['description']}")
            print("\nYou can add them to the PROJECTS array in app/src/data/portfolioData.ts to show them on the site!")
    except Exception as e:
        print(f"Could not compare with portfolioData.ts: {e}")

if __name__ == "__main__":
    main()
