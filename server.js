import express from "express";
import bodyParser from "body-parser";
import evaluate from "./serverScripts/evaluate.js";
import customFetchPost from "./serverScripts/fetch.js";
import getCurrentLocalTime from "./serverScripts/localeTime.js";
import symptomsList from "./serverScripts/helpDetails.js";
import helmet from "helmet";

const pythonBackendAPI = "http://127.0.0.1:5000";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())

var userAsked = false;
var resultData = {};
var symptoms;

// Root
app.get("/", async (req, res) => {
  if (userAsked === false) {
    res.render("index.ejs", { symptomsList: symptomsList });
  } else if (userAsked) {
    userAsked = false
    if (resultData.error) {
      res.render("index.ejs", { symptomsList: symptomsList, error: resultData.errorMsg });
    } else if (!resultData.error) {
      res.render("index.ejs", {
        symptomsList: symptomsList,
        disease: resultData.disease,
        description: resultData.description,
        precautions: resultData.precautions,
        severity: resultData.severity,
        // wikiURL: resultData.wikiURL,
      });
    }
  } else {
    res.render("index.ejs", { symptomsList: symptomsList, error: "The life of the developer of this project, is screwed up big time, because this error is not supposed to occur, but it has occurred. Pray for his good health. " })
  }
});

app.post("/predict", async (req, res) => {
  userAsked = true;
  const dataToSend = evaluate(req.body.symptoms);
  symptoms = dataToSend.split(",");
  // console.log(dataToSend);

  const result = await customFetchPost(`${pythonBackendAPI}/model`, dataToSend);

  if (result.error === true) {
    console.error(result, getCurrentLocalTime());
    // final_prediction = "error";
    symptoms = "error";

    resultData = {
      errorMsg:
        "It seems there's an error. Please visit the help page to see how to search with the symptoms.",
      error: true,
    };
  } else {
    const descriptionResult = await customFetchPost(
      `${pythonBackendAPI}/description`,
      result.final_prediction
    );
    const precautionResult = await customFetchPost(
      `${pythonBackendAPI}/precaution`,
      result.final_prediction
    );
    const severityResult = await customFetchPost(
      `${pythonBackendAPI}/severity`,
      symptoms
    );
    // const wikiURL = await customFetchPost(
    //   `${pythonBackendAPI}/wiki`,
    //   result.final_prediction
    // )
    resultData = {
      disease: result.final_prediction,
      description: descriptionResult,
      precautions: precautionResult,
      severity: severityResult,
      // wikiURL: wikiURL,
      error: false,
    };
  }

  res.redirect("/");
});
// Help

app.get("/help", (req, res) => {
  res.render("help.ejs");
});

// About
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
