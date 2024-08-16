from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
import plotly
import plotly.express as px
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

# Egg fake
healthcare_data = pd.DataFrame({
    'year': np.arange(2010, 2021),
    'outcome': np.random.rand(11) * 100
})

insurance_data = pd.DataFrame({
    'year': np.arange(2010, 2021),
    'usage': np.random.rand(11) * 100
})

medication_data = pd.DataFrame({
    'year': np.arange(2010, 2021),
    'usage': np.random.rand(11) * 100
})

aging_population_data = pd.DataFrame({
    'year': np.arange(2010, 2021),
    'population': np.random.rand(11) * 1000
})


def predict_future(data, target_column, years):
    """Função para prever dados futuros"""
    X = data['year'].values.reshape(-1, 1)
    y = data[target_column].values

    model = LinearRegression()
    model.fit(X, y)

    future_years = np.arange(2021, 2021 + years).reshape(-1, 1)
    predictions = model.predict(future_years)

    future_data = pd.DataFrame({
        'year': future_years.flatten(),
        'prediction': predictions
    })

    return future_data


@app.route('/')
def home():
    return render_template('ml-examples.html')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    model_type = data.get('model')
    years = int(data.get('years'))

    if model_type == 'healthcare':
        future_data = predict_future(healthcare_data, 'outcome', years)
        fig = px.line(future_data, x='year', y='prediction', title='Predicted Healthcare Outcomes')
    elif model_type == 'insurance':
        future_data = predict_future(insurance_data, 'usage', years)
        fig = px.line(future_data, x='year', y='prediction', title='Predicted Insurance Usage')
    elif model_type == 'medication':
        future_data = predict_future(medication_data, 'usage', years)
        fig = px.line(future_data, x='year', y='prediction', title='Predicted Medication Usage')
    elif model_type == 'aging_population':
        future_data = predict_future(aging_population_data, 'population', years)
        fig = px.line(future_data, x='year', y='prediction', title='Predicted Aging Population')
    else:
        return jsonify({'error': 'Invalid model type'})

    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return jsonify(graphJSON)


if __name__ == '__main__':
    app.run(debug=True)
