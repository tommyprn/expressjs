require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes/route");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/public", express.static("/public/img"));
app.use("/api/v1", router);

app.listen(port, () => {
  console.log("app now listen");
});
