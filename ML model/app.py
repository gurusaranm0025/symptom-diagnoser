from flask import Flask, request, jsonify
from model import predictDisease

app = Flask(__name__)

@app.route("/model", methods=['POST'])
def diagnose():
    data = request.json
    return jsonify(predictDisease(data))