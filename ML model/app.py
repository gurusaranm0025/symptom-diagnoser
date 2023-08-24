from flask import Flask, request, jsonify
from model import predictDisease
from description_script import get_description

app = Flask(__name__)

@app.route("/model", methods=['POST'])
def diagnose():
    data = request.json
    return jsonify(predictDisease(data))

@app.route("/description", methods=['POST'])
def description():
    data = request.json
    return jsonify(get_description(data))

if __name__ == "__main__":
    app.run(debug=True)