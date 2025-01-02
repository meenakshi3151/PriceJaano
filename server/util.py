import json
import pickle
import sklearn
import pandas as pd
__locations=None
__model=None
__data_columns=None

def get_estimated_price(location, sqft, bhk, bath):
    load_saved_utils()

    try:
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        loc_index = -1

    x = [0] * len(__data_columns)
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    # Convert to DataFrame with appropriate column names
    x_df = pd.DataFrame([x], columns=__data_columns)

    print("calculating......")
    estimated_price = round(__model.predict(x_df)[0], 2)
    print(estimated_price)
    return estimated_price


def get_location_name():
    load_saved_utils()
    return __locations

def load_saved_utils():
    print("Loading the saved utils")
    global __data_columns
    global __locations
    with open("./utils/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]

    with open("./utils/banglore_home_prices_model.pickle", 'rb') as f:
        global __model
        __model = pickle.load(f)
    print("Loading the saved utils done")

if __name__ == '__main__':
    load_saved_utils()
    print(get_location_name())
       