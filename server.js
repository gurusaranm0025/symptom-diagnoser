import express from "express";
import bodyParser from "body-parser";
import evaluate from "./serverScripts/evaluate.js";
import customFetchPost from "./serverScripts/fetch.js";

const pythonBackendAPI = "http://127.0.0.1:5000"

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var final_prediction;
var symptoms;

// Root
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/predict", async (req, res) => {
  const dataToSend = evaluate(req.body.symptoms);
  symptoms = dataToSend.split(",")

  const result = await customFetchPost(`${pythonBackendAPI}/model`, dataToSend)
  final_prediction = result.final_prediction;

  res.redirect("/result")
});

// Result
app.get("/result",async (req, res) => {

  const descriptionResult = await customFetchPost(`${pythonBackendAPI}/description`, final_prediction)
  const precautionResult = await customFetchPost(`${pythonBackendAPI}/precaution`, final_prediction)
  const severeityResult = await customFetchPost(`${pythonBackendAPI}/severeity`, symptoms)
  res.render("result.ejs", {disease: final_prediction, description: descriptionResult, precautions: precautionResult, severeity: severeityResult});
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
