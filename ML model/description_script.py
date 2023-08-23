import pandas as pd

DATA_PATH = "/home/saran/Spaces/Work Space/Clg/PT1/Symptom Diagnoser/ML model/Dataset/symptom_Description.csv"
data = pd.read_csv(DATA_PATH).dropna(axis=1)

disease_dict = {}
for index, value in enumerate(data["Disease"]):
    disease_dict[index] = value

descr_dict = {}
for index, value in enumerate(data["Description"]):
   descr_dict[index] = value

def get_description(disease):
  for key, value in enumerate(data["Disease"]):
    if value.lower() == disease.lower():
        return descr_dict[key]
    
# print(get_description(input("Enter the disease here : ")))