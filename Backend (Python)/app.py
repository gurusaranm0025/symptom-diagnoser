from flask import Flask, request, jsonify
from model import predictDisease
from description_script import get_description
from precaution_script import get_precaution
from symptom_severity_script import get_symptom_severeity

app = Flask(__name__)

@app.route("/model", methods=['POST'])
def diagnose():
    data = request.json
    return jsonify(predictDisease(data))

@app.route("/description", methods=['POST'])
def description():
    data = request.json
    if data != "error":
        return jsonify(get_description(data))
    else:
        return "error"

@app.route("/precaution", methods=['POST'])
def precaution():
    data = request.json
    if data != "error":
        return jsonify(get_precaution(data))

@app.route("/severeity", methods=['POST'])
def severeity():
    data = request.json
    if data != "error":
        return get_symptom_severeity(data)

if __name__ == "__main__":
    app.run()