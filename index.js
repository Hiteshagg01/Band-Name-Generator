import express from "express";
import names from "./data/names.js";

const app = express();

const portNum = 3000;
const date = new Date();

function randomName() {
  const randomAdj = Math.floor(Math.random() * names.adj.length);
  const randomNoun = Math.floor(Math.random() * names.noun.length);

  return `${names.adj[randomAdj]} ${names.noun[randomNoun]}`;
}

app.use((req, res, next) => {
  console.log(` > Client "${req.method}" request on "${req.originalUrl}"`);
  next();
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { currentYear: date.getFullYear() });
});

app.post("/submit", (req, res) => {
  res.render("index.ejs", {
    bandName: randomName(),
    currentYear: date.getFullYear(),
  });
});

app.listen(portNum, (error) => {
  if (error) throw error;
  else
    console.log(
      `\n # Server online and listening on address: http://localhost:${portNum}`
    );
});
