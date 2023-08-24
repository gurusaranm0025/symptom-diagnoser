import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import evaluate from "./evaluate.js";

const pythonBackendAPI = "http://127.0.0.1:5000"

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var final_prediction;

// Root
app.get("/", async (req, res) => {
  // console.log("success");

  res.render("index.ejs");
});

app.post("/predict", async (req, res) => {
  const dataToSend = evaluate(req.body.symptoms);

  const response = await fetch(`${pythonBackendAPI}/model`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });

  const result = await response.json();
  final_prediction = result.final_prediction;
  // console.log(result.final_prediction);

  res.redirect("/result")
});

// Result
app.get("/result",async (req, res) => {
  const dataToSend = final_prediction

  const response = await fetch(`${pythonBackendAPI}/description`, {
    method:"POST",
    headers:{
      "Content-type": "application/json",
    },
    body: JSON.stringify(dataToSend)
  });

  const result = await response.json();

  res.render("result.ejs", {disease: final_prediction, description: result});
})

//Result: descr
// app.post("/descr", async (req, res) => {
//   const dataToSend = final_prediction

//   const response = await fetch(`${pythonBackendAPI}/description`, {
//     method:"POST",
//     headers:{
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(dataToSend)
//   });

//   const result = await response.json();
//   // console.log(result);
//   res.send(result);
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
