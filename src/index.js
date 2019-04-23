import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import hbs from "express-hbs";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.engine("hbs", hbs.express4());
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.listen(process.env.PORT);

app.get("/", (req, res) => {
  res.render("index", {
    layout: "layout",
    title: "title",
    url: req.originalUrl
  });
});
