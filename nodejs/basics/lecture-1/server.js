const express = require("express");
const fs = require("fs");
require("colors");
const morgan = require("morgan");

//creates ann express app
const app = express();

//global middlewware
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res
    .status(200)
    .set({
      "Content-Type": "application/json",
    })
    .json("hello World");
});

app.get("/serve-html", (req, res) => {
  fs.readFile("content/index.html", (err, data) => {
    if (err) {
      res
        .status(400)
        .set({
          "Content-Type": "application/json",
        })
        .json("hello World");
      return;
    }

    res
      .status(200)
      .set({
        "Content-Type": "plain/html",
      })
      .send(data);
  });
});

app.get("/write-read-file", (req, res) => {
  const content = "New contetne kughkjg";
  //appendFile
  //rename
  //unlink -delete
  fs.writeFile("content/index.txt", content, (err) => {
    if (err) {
      res
        .status(400)
        .set({
          "Content-Type": "application/json",
        })
        .json("hello World");
      return;
    }

    const nr = fs.readFileSync("content/index.txt", "utf-8");
    res
      .status(200)
      .set({
        "Content-Type": "application/json",
      })
      .json(nr);
    return;
  });
});

app.get("*", (req, res) => {
  console.log(res, "res");
  res.status(404).json("Not a valid endpoint");
});

//listen to requrest
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 4000;
app.listen(port, (err) => {
  if (err) {
    console.log(`error: ${err}.red`);
    return;
  }

  if (process.env.NODE_ENV === "production") {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log(`Server is running on port ${port}`.bgYellow);
  }
});
