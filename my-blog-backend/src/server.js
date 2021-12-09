const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();

/* const articlesInfo = {
  "learn-reat": {
    comments: [],
  },
  "learn-node": {
    comments: [],
  },
  "my-thoughts-on-learning-react": {
    comments: [],
  },
}; */

app.use(bodyParser.json());

const withDB = async (operations, res) => {
  try {
    const client = MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("myblog");
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
};

app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);
    client.close();
  }, res);
});

/* app.get("/hello", (req, res) => res.send("Hello"));
app.post("/hello", (req, res) => res.send(`Hello ${req.body.name}`));
app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`)); */

app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db
      .collection("articles")
      .updateOne(
        { name: articleName },
        { $set: { comments: articleInfo.comments.concat({ username, text }) } }
      );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res);

  /* articlesInfo[articleName].comments.push({ username, text });
  res.status(200).send(articlesInfo[articleName]); */
});

app.listen(8000, () => console.log("Listening on port 8000"));
