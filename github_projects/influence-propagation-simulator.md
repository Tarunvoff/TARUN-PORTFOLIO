# influence-propagation-simulator

**Description:** No description provided.

## README

# 🌐 Influence Propagation Simulator

A beautiful, interactive web application built with Streamlit to visualize and simulate how influence, ideas, and trends spread through networks using classic diffusion models.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Streamlit](https://img.shields.io/badge/Streamlit-1.50.0-red.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Usage Guide](#usage-guide)
- [Diffusion Models](#diffusion-models)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This simulator allows you to:
- Generate random networks or upload your own edge lists
- Select seed nodes using different strategies
- Watch influence propagate step-by-step through the network
- Compare different diffusion models (Independent Cascade, Linear Threshold, Weighted Cascade)
- Download simulation results for further analysis

## ✨ Features

- **Interactive Network Visualization**: Real-time animated graph visualization using PyVis
- **Multiple Diffusion Models**: Independent Cascade, Linear Threshold, and Weighted Cascade
- **Customizable Parameters**: Control network size, edge probability, activation thresholds, and more
- **Seed Selection Strategies**: Random or high-degree node selection
- **Time-Series Analysis**: Track activation spread over time with interactive charts
- **Data Export**: Download simulation results as CSV files
- **Beautiful UI**: Modern, gradient-based design with smooth animations

## 🚀 Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Step 1: Clone or Download the Project

```bash
cd c:\aksh\influence_app
```

### Step 2: Install Dependencies

Install all required packages using pip:

```bash
pip install -r requirements.txt
```

The required packages are:
- `streamlit` - Web application framework
- `networkx` - Network graph creation and analysis
- `pyvis` - Interactive network visualization
- `plotly` - Interactive plotting library
- `matplotlib` - Additional plotting capabilities
- `numpy` - Numerical computing
- `pandas` - Data manipulation and analysis

## 🎮 How to Run

### Method 1: Using Python Module (Recommended)

```bash
python -m streamlit run app.py
```

### Method 2: Using Streamlit Command (if in PATH)

```bash
streamlit run app.py
```

### What Happens Next

1. Streamlit will start a local web server
2. Your default web browser will automatically open
3. The app will be available at `http://localhost:8501`
4. If the browser doesn't open automatically, navigate to the URL shown in the terminal

### Stopping the Application

Press `Ctrl + C` in the terminal to stop the server.

## 📖 Usage Guide

### 1. Configure Network Settings (Sidebar)

**Upload Custom Network (Optional)**
- Click "Upload Edge List (CSV)" to upload your own network
- CSV must contain columns: `source`, `target`
- Example format:
  ```csv
  source,target
  1,2
  2,3
  1,3
  ```

**Or Generate Random Network**
- **Number of Nodes**: Set network size (10-200 nodes)
- **Edge Probability**: Control network density (0.1-1.0)

**Seed Configuration**
- **Seed Count**: Number of initial activated nodes (1-10)
- **Seed Selection Strategy**: 
  - *Random*: Randomly select seed nodes
  - *High Degree*: Select nodes with most connections

### 2. Choose Diffusion Model

Select from three classic models:
- **Independent Cascade**: Each activated node has one chance to activate neighbors
- **Linear Threshold**: Nodes activate when enough neighbors are active
- **Weighted Cascade**: Cascade with edge weights based on node degrees

### 3. Adjust Model Parameters

**For Independent Cascade:**
- **Activation Probability**: Likelihood of influence spread (0.1-1.0)

**For Linear Threshold:**
- **Randomize Thresholds**: Enable random thresholds per node
- **Defau
