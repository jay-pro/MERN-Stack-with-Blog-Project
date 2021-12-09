const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const articlesInfo = {
  "learn-reat": {
    comments: [],
  },
  "learn-node": {
    comments: [],
  },
  "my-thoughts-on-learning-react": {
    comments: [],
  },
};

app.use(bodyParser.json());

/* app.get("/hello", (req, res) => res.send("Hello"));
app.post("/hello", (req, res) => res.send(`Hello ${req.body.name}`));
app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`)); */

app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  articlesInfo[articleName].comments.push({ username, text });
  res.status(200).send(articlesInfo[articleName]);
});

app.listen(8000, () => console.log("Listening on port 8000"));
