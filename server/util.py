import json
import pickle
import numpy as np

__location = None
__data_columns = None
__model = None

def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)


def get_location_names():
    return __location


def load_saved_artifacts():
    print('Loading artifacts...')
    global __data_columns
    global __location
    global __model
    # Update the path if needed or remove "server/" if not needed
    with open("server/artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __location = __data_columns[3:]  # Assuming locations start at index 3

    with open("server/artifacts/banglore_home_price_model.pickle", 'rb') as f:
        __model = pickle.load(f)
    
    print("Loading saved artifacts done")


if __name__ == "__main__":
    load_saved_artifacts()
    print("Available locations:", get_location_names())
    # Testing some predictions
    print("Price 1:", get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
    print("Price 2:", get_estimated_price('1st Phase JP Nagar', 1000, 2, 2))
    print("Price 3:", get_estimated_price('Kalhalli', 1000, 2, 2))  # Check if this location exists
    print("Price 4:", get_estimated_price('Ejipura', 1000, 2, 2))   # Check if this location exists
