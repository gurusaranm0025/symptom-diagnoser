import express from "express";
import bodyParser from "body-parser";
import evaluate from "./serverScripts/evaluate.js";
import customFetchPost from "./serverScripts/fetch.js";
import getCurrentLocalTime from "./serverScripts/localeTime.js";
import symptomsList from "./serverScripts/helpDetails.js";

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
  // console.log(dataToSend);

  const result = await customFetchPost(`${pythonBackendAPI}/model`, dataToSend)
  if (result.error === true) {
    console.error(result,getCurrentLocalTime())
    final_prediction = "error";
    symptoms = "error";
  } else {
    final_prediction = result.final_prediction;
  }

  res.redirect("/result")
});

// Result
app.get("/result",async (req, res) => {
  if (final_prediction === "error") {
    res.render("result.ejs", {error: "It seems there's an error. Please visit the help page to see how to search with the symptoms."});      
  } else {
    const descriptionResult = await customFetchPost(`${pythonBackendAPI}/description`, final_prediction)
    const precautionResult = await customFetchPost(`${pythonBackendAPI}/precaution`, final_prediction)
    const severeityResult = await customFetchPost(`${pythonBackendAPI}/severity`, symptoms)
    res.render("result.ejs", {disease: final_prediction, description: descriptionResult, precautions: precautionResult, severeity: severeityResult});  
  }
})

// Help

app.get("/help", (req,res) => {
  // dividing the long array of symptoms into two half arrays to display them neatly 
  // and to reduce the code on templates
  const middleIndex = Math.floor(symptomsList.length / 2);
  const firstHalf = symptomsList.slice(0, middleIndex);
  const secondHalf = symptomsList.slice(middleIndex);
  
  res.render("help.ejs", {firstHalf: firstHalf, secondHalf: secondHalf});
})

// About
app.get("/about", (req, res) => {
  res.render("about.ejs");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
