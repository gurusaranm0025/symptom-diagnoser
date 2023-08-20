import joblib
import numpy as np
from statistics import mode
from data_dict import data_dict

svm_model = joblib.load("/home/saran/Spaces/Work Space/Clg/PT1/Symptom Diagnoser/ML model/Saved_models/final_svm_model.pkl")
nb_model = joblib.load("/home/saran/Spaces/Work Space/Clg/PT1/Symptom Diagnoser/ML model/Saved_models/final_nb_model.pkl")
rf_model = joblib.load("/home/saran/Spaces/Work Space/Clg/PT1/Symptom Diagnoser/ML model/Saved_models/final_rf_model.pkl")


def predictDisease(symptoms):
    symptoms = symptoms.split(",")

    input_data = [0] * len(data_dict["symptom_index"])
    for symptom in symptoms:
        index = data_dict['symptom_index'][symptom]
        input_data[index] = 1
    
    input_data = np.array(input_data).reshape(1,-1)

    rf_prediction = data_dict["prediction_classes"][rf_model.predict(input_data)[0]]
    nb_prediction = data_dict['prediction_classes'][nb_model.predict(input_data)[0]]
    svm_prediction = data_dict['prediction_classes'][svm_model.predict(input_data)[0]]

    final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])

    predictions = {
        "rf_model_prediction": rf_prediction,
        "nb_model_prediction": nb_prediction,
        "svm_model_prediction": svm_prediction,
        "final_pediction": final_prediction
    }

    return predictions

print(predictDisease("Itching,Skin Rash,Nodal Skin Eruptions"))