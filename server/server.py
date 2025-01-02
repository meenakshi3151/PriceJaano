from flask import Flask,request,jsonify
import util
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
__model=None
@app.route('/hello')
def hello():
    return "Hi"

@app.route('/get_location_names', methods=['GET'])
def get_location_name():
    response=jsonify({
       'locations': util.get_location_name()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price',methods=['POST'])
def predict_price():
    data = request.json
    sqft = float(data['sqft'])
    bath = int(data['bath'])
    bhk = int(data['bhk'])
    location = data['location']
    response = jsonify({
        'estimated_price': util.get_estimated_price(location, sqft, bhk, bath)
    })
    response_data = response.json  # Extract the JSON data
    print(response_data['estimated_price'])  # Print the estimated price

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    load_saved_utils()
    print('Starting flask server on port 5000') 
    app.run()
