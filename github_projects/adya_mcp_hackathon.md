# adya_mcp_hackathon

**Description:** A comprehensive Model Context Protocol (MCP) platform providing standardized integrations between AI assistants and various services and APIs. This repository contains both JavaScript and Python implementations of MCP servers and clients for seamless service integration.

## README

# VANIJ MCP Platform

## 🚀 [MCP Integration Demo Video. (watch here)](https://drive.google.com/file/d/14JvBERtsT1ed1Db5GCDLllqdW5BL684S/view?usp=sharing)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)

A comprehensive Model Context Protocol (MCP) platform providing standardized integrations between AI assistants and various services and APIs. This repository contains both JavaScript and Python implementations of MCP servers and clients for seamless service integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [JavaScript Setup](#javascript-setup)
- [Python Setup](#python-setup)
- [Sample MCP Servers](#sample-mcp-servers)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [API Collections](#api-collections)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

The Vanij MCP Platform enables AI assistants to interact with external services through a standardized protocol. It provides a unified interface for connecting to various APIs and services, making it easier to build sophisticated AI-powered applications.

## ✨ Features

- **Multi-language Support**: JavaScript and Python implementations
- **Extensible Architecture**: Easy to add new MCP servers
- **Standardized Protocol**: Consistent interface across all integrations
- **Production Ready**: Built with scalability and reliability in mind
- **Comprehensive Documentation**: Detailed guides and API references
- **Testing Tools**: Postman collections for easy testing

## 📁 Project Structure

```
.
├── mcp_servers/
│   ├── js/                           # JavaScript implementation
│   │   ├── clients/                  # MCP clients
│   │   │   ├── src/
│   │   │   │   ├── client_and_server_config.ts  # Listed MCP Clients & Servers Configurations.
│   │   │   │   └── ...
│   │   │   ├── package.json   
│   │   │   └── ...
│   │   ├── servers/                  # MCP servers
│   │   │   ├── WORDPRESS/           # WordPress integration
│   │   │   ├── ZOOMMCP/             # Zoom integration
│   │   │   ├── SALESFORCE_MCP/      # Salesforce integration
│   │   │   ├── SLACK_MCP/           # Slack integration
│   │   │   └── etc...
│   │   └── package.json
│   └── python/                       # Python implementation
│       ├── clients/                  # MCP clients
│       │   ├── src/
│       │   │   ├── client_and_server_config.py       # Listed MCP Clients & Servers Configurations.
│       │   │   └── ...
│       │   ├── requirements.txt
│       │   └── ...
│       └── servers/                  # MCP servers
│           ├── MCP-GSUITE/          # GSuite integration
│           ├── FACEBOOK_MCP/        # Facebook integration
│           ├── FACEBOOK_ADS_MCP/    # Facebook Ads integration
│           ├── POWER_BI_MCP/        # Power BI integration
│           └── etc ...
├── mcp_servers_documentation/        # Detailed documentation of about MCP servers
├── postman_api_collections/         # API testing collections
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**208+ (for JavaScript implementation)
- **Python** 3.8+ (for Python implementation)
- **npm** or **yarn** (for JavaScript dependencies)
- **pip** (for Python dependencies)

### Choose Your Implementation

1. **JavaScript**: Follow the [JavaScript Setup](#javascript-setup) guide
2. **Python**: Follow the [Python Setup](#python-setup) guide
3. **Both**: Set up both implementations for maximum flexibility

## 🟨 JavaScript Setup

### 1. Navigate to JavaScript Directory

```bash
cd mcp_servers/js
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build All Components

```bash
npm run build:all
```

### 4. Start Developm
