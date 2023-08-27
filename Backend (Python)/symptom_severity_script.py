import pandas as pd

DATA_PATH = "/home/saran/Spaces/Work Space/Clg/PT1/Symptom Diagnoser/Backend (Python)/Dataset/Symptom-severity.csv"
data = pd.read_csv(DATA_PATH).dropna(axis=1)

symptom_dict = {}
for index, value in enumerate(data["Symptom"]):
    symptom_dict[index] = value

weight_dict = {}
for index, value in enumerate(data["weight"]):
    weight_dict[index] = value


def get_symptom_severity(symptoms):
    severity = {}
    for key, value in enumerate(data["Symptom"]):
        modified_value = value.split("_")
        modified_value = " ".join(modified_value)
        for symptom in symptoms:
            if modified_value.lower() == symptom.lower():
                severity[symptom] = weight_dict[key]

    return severity

# print(get_precaution(input("Enter the symptoms here : ")))
# print(get_symptom_severity([ 'Itching', 'Skin Rash', 'Nodal Skin Eruptions' ]))
