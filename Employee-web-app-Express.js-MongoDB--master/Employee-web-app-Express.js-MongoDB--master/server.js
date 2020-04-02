const express = require("express");
const db = require("./Models/db");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const employeeController = require("./Controllers/employeeController");

var app = express();

app.set("views", path.join(__dirname, "/Views/"));
app.engine("hbs", exphbs({extname: "hbs", defaultLayout: "mainlayout", layoutsDir: __dirname + "/Views/layouts/"}));
app.set("view engine", "hbs");

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.listen(3000, ()=>{
    console.log("Express server started at port : 3000");
});

app.use("/employee", employeeController);