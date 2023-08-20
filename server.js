import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
  console.log("success")
  const dataToSend = "Itching,Skin Rash,Nodal Skin Eruptions"

  const response = await fetch("http://127.0.0.1:5000/model", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  });

  const result = await response.json();
  console.log(result)

  res.render("index.ejs")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});