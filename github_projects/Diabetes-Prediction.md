# Diabetes-Prediction

**Description:** No description provided.

## README

# Diabetes Classification and Prediction

A machine learning project for predicting diabetes risk using a Random Forest classifier. This application provides both a Jupyter Notebook for model development and a Flask web application for real-time predictions.

## Project Overview

This project implements a diabetes prediction system that classifies whether a patient is likely to have diabetes based on medical parameters. The model is trained on the Kaggle diabetes dataset and deployed as a web application.

## Features

- **Machine Learning Model**: Random Forest Classifier for diabetes prediction
- **Web Application**: Flask-based user interface for making predictions
- **Input Parameters**: 
  - Number of Pregnancies
  - Glucose level
  - Blood Pressure
  - Skin Thickness
  - Insulin level
  - Body Mass Index (BMI)
  - Diabetes Pedigree Function
  - Age

## Project Structure

```
Diabetes-Prediction/
├── README.md                                      # Project documentation
├── Diabetes Classification.ipynb                  # Jupyter Notebook with model development
├── kaggle_diabetes.csv                            # Dataset for training
│
└── Diabetes-prediction/
    ├── app.py                                     # Flask application
    ├── Diabetes Predictor - Deployment.py         # Deployment script
    ├── requirements.txt                           # Project dependencies
    ├── Procfile                                   # Heroku deployment configuration
    ├── diabetes-prediction-rfc-model.pkl          # Trained Random Forest model
    │
    ├── static/
    │   └── styles.css                             # CSS styling
    │
    └── templates/
        ├── index.html                             # Main prediction form page
        └── result.html                            # Prediction result page
```

## Requirements

- Python 3.7+
- Flask 2.2.5
- scikit-learn
- pandas
- numpy
- matplotlib
- scipy
- gunicorn (for production deployment)

## Installation

### 1. Clone or Download the Project

```bash
cd Diabetes-Prediction
```

### 2. Create a Virtual Environment (Recommended)

```bash
python -m venv venv
```

Activate the virtual environment:
- **Windows:** `venv\Scripts\activate`
- **Mac/Linux:** `source venv/bin/activate`

### 3. Install Dependencies

```bash
pip install -r Diabetes-prediction/requirements.txt
```

## Usage

### Running the Web Application

1. Navigate to the project directory:
```bash
cd Diabetes-prediction
```

2. Run the Flask application:
```bash
python app.py
```

3. Open your browser and go to:
```
http://localhost:5000
```

4. Enter the required medical parameters and click "Predict" to get the prediction result

### Using the Jupyter Notebook

To explore the model development process:

1. Install Jupyter (if not already installed):
```bash
pip install jupyter
```

2. Launch Jupyter:
```bash
jupyter notebook
```

3. Open `Diabetes Classification.ipynb` to view the model training and exploration

## Model Information

- **Algorithm**: Random Forest Classifier
- **Training Data**: Kaggle Diabetes Dataset
- **Model File**: `diabetes-prediction-rfc-model.pkl`
- **Input Features**: 8 medical parameters
- **Output**: Binary classification (Diabetic / Non-Diabetic)

## Deployment

The project includes a `Procfile` for easy deployment on Heroku or similar platforms.

To deploy on Heroku:
1. Ensure you have the Heroku CLI installed
2. Run `heroku create` and `git push heroku main`
3. The application will be accessible at your Heroku app URL

## Technologies Used

- **Python**: Core language
- **Flask**: Web framework
- **scikit-learn**: Machine learning library
- **pandas**: Data manipulation
- **numpy**: Numerical computing
- **matplotlib**: Data visualization
- **gunicorn**: WSGI HTTP Server

## License

This project is open source and available for educational purposes.

## Author

TARUN

## Notes

- The trained model is pre-loaded from the pickle file
- Ensure all input values are within reasonable med
