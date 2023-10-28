import "dotenv/config";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import hbs from "express-hbs";

const app = express();
const setCache = function (req, res, next) {
  // here you can define period in second, this one is 5 minutes
  const period = 60 * 5;
  // const period = 0;
  // you only want to cache for GET requests
  if (req.method == "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    // for the other requests set strict no caching parameters
    res.set("Cache-control", `no-store`);
  }

  // remember to call next() to pass on the request
  next();
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(setCache);
app.engine("hbs", hbs.express4());
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
// public folder
app.use(express.static(__dirname + "/../public"));

app.get("/", (req, res) => {
  res.render("index", {
    // layout: "layout",
    title: "Cache Demo",
    url: req.originalUrl,
  });
});
const port = process.env.PORT || 4500;
app.listen(port);
console.log("Server started on PORT " + port);
