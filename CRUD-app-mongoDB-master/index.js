const connection = require("./model");
const express = require("express");
const application = express();
const path = require("path");
const expressHandlebars = require("express-handlebars");
const bodyparser = require("body-parser");

const CourseController = require("./controllers/courses");

application.use(bodyparser.urlencoded({
    extended: true
}));

application.set("views", path.join(__dirname, "/views/"));

application.engine("hbs", expressHandlebars({
    extname: "hbs", 
    defaultLayout:"mainLayout",
    layoutsDir: __dirname + "/views/layouts"
}));

application.set("view engine", "hbs");

application.get("/", (req, res)=>{
    res.render("index", {});
});

application.use("/course", CourseController);

application.listen("3000",()=>{
    console.log("Server Started");
});