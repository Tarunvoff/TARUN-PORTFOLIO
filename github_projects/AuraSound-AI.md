# AuraSound-AI

**Description:** No description provided.

## README

# 🔊AURASOUND AI- Noise & Mental Health Analytics Platform

A comprehensive, production-ready data science and Streamlit application that analyzes and visualizes the complex relationship between environmental noise pollution and mental health outcomes. This platform combines advanced machine learning models, sophisticated audio processing, and an intuitive user interface for stakeholders to explore data, gain insights, and make data-driven decisions.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technical Architecture](#technical-architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Core Components](#core-components)
- [Machine Learning Models](#machine-learning-models)
- [Audio Processing](#audio-processing)
- [Data Specifications](#data-specifications)
- [API & Configuration](#api--configuration)
- [Testing](#testing)
- [Results & Outputs](#results--outputs)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This project addresses a critical public health concern: the impact of environmental noise pollution on mental health. By leveraging machine learning, audio signal processing, and statistical analysis, the platform enables researchers, urban planners, health professionals, and policymakers to:

- **Analyze** the relationship between noise levels and mental health metrics
- **Predict** stress and mental health outcomes based on soundscape characteristics
- **Visualize** complex patterns through interactive dashboards
- **Generate** actionable insights for noise mitigation policies
- **Model** various environmental factors affecting mental wellbeing

### Problem Statement

Urban noise pollution is a growing public health concern affecting millions globally. This platform bridges the gap between environmental science and mental health research by providing:
- Evidence-based analysis of noise-health correlations
- Predictive models for stress and mental health risk
- Interactive tools for stakeholder engagement

---

## ✨ Key Features

### 🎨 **Modern User Interface**
- **Landing Page**: Glassmorphic design with gradient backgrounds, smooth animations, and professional typography
- **Responsive Layout**: Works seamlessly across desktop and tablet devices
- **Feature Cards**: Showcase key platform capabilities with icons and descriptions
- **Dark/Light Mode Support**: Adaptive to user preferences

### 📊 **Comprehensive Analytics Dashboard**
- **Data Upload**: Support for CSV files with automatic validation
- **Data Exploration**: Statistical summaries and missing value analysis
- **Advanced Feature Engineering**: 
  - Temporal aggregation (hourly, daily, weekly)
  - Interaction terms between noise and health metrics
  - Polynomial features for non-linear relationships
  - Lag features for time-series analysis
  - Soundscape characteristic extraction

### 🤖 **Multi-Model Machine Learning**
Seven advanced regression models with automatic hyperparameter optimization:
1. **Random Forest** - Ensemble method with bagging
2. **XGBoost** - Gradient boosting with regularization
3. **LightGBM** - Fast gradient boosting framework
4. **CatBoost** - Categorical feature handling
5. **Neural Networks** - Deep learning with custom architectures
6. **Support Vector Regression** - For non-linear patterns
7. **Voting Regressor** - Ensemble combining top performers

Features include:
- Automatic scaling and normalization
- Missing value imputation with multiple strategies
- Hyperparameter tuning via GridSearchCV/RandomizedSearchCV
- Cross-validation with configurable folds
- Feature importance ranking
- Model comparison and selection

### 📈 **Interactive Visualizations**
- **Correlation Heatmaps**: Identify relationships between noise metrics and health outcomes
- **Feature Importance Charts**: Understand which factors drive predictions
- **Performance Comparisons**: Side-by-side model accuracy comparison
- **Sca
