import pandas as pd

DATA_PATH = "/home/saran/Spaces/Work Space/Clg/PT1/Symptom Diagnoser/ML model/Dataset/Symptom-severity.csv"
data = pd.read_csv(DATA_PATH).dropna(axis=1)

symptom_dict = {}
for index, value in enumerate(data["Symptom"]):
    symptom_dict[index] = value

weight_dict = {}
for index, value in enumerate(data["weight"]):
   weight_dict[index] = value

def get_precaution(symptom):
  for key, value in enumerate(data["Symptom"]):
    if value.lower() == symptom.lower():
        return weight_dict[key]
    
print(get_precaution(input("Enter the disease here : ")))