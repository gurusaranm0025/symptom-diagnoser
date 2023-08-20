import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const mlModelAPI = "http://127.0.0.1:5000/model"

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  console.log("success");

  res.render("index.ejs");
});

app.post("/predict", async (req, res) => {
  const dataToSend = req.body.symptoms;

  const response = await fetch(mlModelAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });

  const result = await response.json();
  console.log(result.final_prediction);

  res.render("index.ejs", {disease: result.final_prediction})

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
