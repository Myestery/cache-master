import "dotenv/config";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import hbs from "express-hbs";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.engine("hbs", hbs.express4());
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index", {
    layout: "layout",
    title: "title",
    url: req.originalUrl,
  });
});
const port = process.env.PORT || 4500;
app.listen(port);
console.log("Server started on PORT " + port);