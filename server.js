var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.PORT || 8000;
var Task = require("./resources/todoistModel");

mongoose.connect("mongodb://localhost/todoist");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./resources/todoistRoutes");

routes(app);

app.listen(port, () => {
  console.log(`localhost is running in http://localhost:${port}`);
});


