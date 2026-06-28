# DataVisualization-Agent

**Description:** No description provided.

## README

# 📊 AI Data Visualization Agent

An intelligent, conversational AI agent that analyzes datasets and generates insightful visualizations through natural language interaction. Upload your data, ask questions in plain English, and get instant analytical insights with automatically generated Python code and visualizations.

## 🎯 Use Case

### Problem Statement
Many organizations struggle with data analysis because:
- **Technical Barrier**: Non-technical users can't write SQL queries or Python code
- **Time Consumption**: Creating visualizations and reports is time-consuming
- **Expertise Gap**: Insight extraction requires data science knowledge
- **Tool Complexity**: Multiple tools (databases, BI software, Python) increase friction

### Solution
The **AI Data Visualization Agent** bridges this gap by providing a natural language interface to data analysis:

```
User Question (English) → AI Agent → Python Code Generation → Code Execution → Visualizations & Insights
```

### Who Should Use This?

✅ **Business Analysts** - Explore datasets without SQL expertise  
✅ **Product Managers** - Quick data-driven insights for decision-making  
✅ **Researchers** - Analyze research data and generate publication-ready visuals  
✅ **Data Teams** - Prototype analyses before formal reporting  
✅ **Students** - Learn data analysis concepts interactively  
✅ **Non-Technical Users** - Access data insights through conversational AI  

### Real-World Scenarios

#### Scenario 1: Sales Analytics
**Situation**: A sales manager has quarterly sales data but wants insights about top-performing products.  
**Traditional Approach**: Request a report from IT → wait days → get static report  
**With AI Agent**: Upload CSV → Ask "What are the top 5 products by revenue this quarter?" → Get instant visualizations and insights

#### Scenario 2: Customer Behavior Analysis
**Situation**: An e-commerce team has customer transaction logs and wants to understand purchase patterns.  
**Traditional Approach**: Write SQL queries → Manual chart creation → Send report  
**With AI Agent**: Upload data → Ask "Show me customer segments by spending patterns" → Get automatic clustering visualizations

#### Scenario 3: Research Data Exploration
**Situation**: A researcher has survey responses and needs exploratory data analysis.  
**Traditional Approach**: Learn Python → Write analysis scripts → Debug → Create plots  
**With AI Agent**: Upload CSV → Ask "What correlations exist between age and satisfaction score?" → Get statistical analysis and plots

## 🚀 Key Features

### 1. **Natural Language Interface**
- Ask questions in plain English
- No coding required
- Multi-turn conversations for follow-up questions

### 2. **Intelligent Code Generation**
- LLM generates Python code based on your queries
- Code is automatically extracted and executed
- Handles data loading, analysis, and visualization

### 3. **Safe Code Execution**
- E2B sandbox environment for secure execution
- No risk of malicious code affecting your system
- Isolated runtime for each analysis

### 4. **Automatic Visualizations**
- Charts, plots, and graphs auto-generated
- Multiple visualization types (bar, scatter, line, histogram, etc.)
- Publication-ready quality

### 5. **Session Management**
- API key configuration for Together AI & E2B
- Model selection for LLM inference
- Dataset persistence during conversations

## 🛠️ How It Works

### Architecture Flow

```
1. USER UPLOADS DATASET
         ↓
2. FILE STORED IN E2B SANDBOX
         ↓
3. USER ASKS QUESTION (Natural Language)
         ↓
4. TOGETHER AI LLM GENERATES PYTHON CODE
         + Instruction: Use dataset at provided path
         + Instruction: Generate visualizations
         ↓
5. E2B EXECUTES CODE IN ISOLATED SANDBOX
         + Safe execution environment
         + Returns results and visualizations
         ↓
6. RESULTS DISPLAYED IN STREAMLIT UI
         + Charts rendered
         + Summary insights shown
         + Code execution logs visible
```

#
