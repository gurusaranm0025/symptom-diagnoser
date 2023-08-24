import pandas as pd

DATA_PATH = "/home/saran/Spaces/Work Space/Clg/PT1/Symptom Diagnoser/Backend (Python)/Dataset/Symptom-severity.csv"
data = pd.read_csv(DATA_PATH).dropna(axis=1)

symptom_dict = {}
for index, value in enumerate(data["Symptom"]):
    symptom_dict[index] = value

weight_dict = {}
for index, value in enumerate(data["weight"]):
   weight_dict[index] = value

def get_symptom_severeity(symptoms):
  severeity = {}
  for key, value in enumerate(data["Symptom"]):
    moded_value = value.split("_")
    moded_value = " ".join(moded_value)
    for symptom in symptoms:
      if moded_value.lower() == symptom.lower():
          severeity[symptom] = weight_dict[key]
  
  return severeity
    
# print(get_precaution(input("Enter the symptoms here : ")))
# print(get_symptom_severeity([ 'Itching', 'Skin Rash', 'Nodal Skin Eruptions' ]))