from flask import Flask, request, jsonify
from model import predictDisease
from description_script import get_description
from precaution_script import get_precaution

app = Flask(__name__)

@app.route("/model", methods=['POST'])
def diagnose():
    data = request.json
    return jsonify(predictDisease(data))

@app.route("/description", methods=['POST'])
def description():
    data = request.json
    print(data)
    return jsonify(get_description(data))

@app.route("/precaution", methods=['POST'])
def precaution():
    data = request.json
    print(data)
    return jsonify(get_precaution(data))

if __name__ == "__main__":
    app.run()