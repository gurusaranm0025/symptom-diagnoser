import pandas as pd
from sklearn.preprocessing import LabelEncoder

DATA_PATH = "/home/saran/Spaces/Work Space/Clg/PT1/Symptom Diagnoser/Backend (Python)/Dataset/Training.csv"
data = pd.read_csv(DATA_PATH).dropna(axis=1)

encoder = LabelEncoder()
data["prognosis"] = encoder.fit_transform(data["prognosis"])

X = data.iloc[:, :-1]

symptoms = X.columns.values

symptom_index = {}
for index, value in enumerate(symptoms):
    symptom = " ".join([i.capitalize() for i in value.split("_")])
    symptom_index[symptom] = index

data_dict = {
    "symptom_index": symptom_index,
    "prediction_classes": encoder.classes_
}

# print("data_dict variable sent successfully.")
# print(data_dict)
