import pandas as pd

DATA_PATH = "/home/saran/Spaces/Work Space/Clg/PT1/Symptom Diagnoser/Backend (Python)/Dataset/symptom_precaution.csv"
data = pd.read_csv(DATA_PATH).dropna(axis=1)

disease_dict = {}
for index, value in enumerate(data["Disease"]):
    disease_dict[index] = value

prec_dict = {}
for index, value in enumerate(data["Precaution"]):
   prec_dict[index] = value

def get_precaution(disease):
  for key, value in enumerate(data["Disease"]):
    if value.lower() == disease.lower():
        return prec_dict[key].split(",")
    
# print(get_precaution(input("Enter the disease here : ")))