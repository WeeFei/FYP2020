const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const courseModel = mongoose.model("Course");

router.get("/add", (req, res)=>{
    res.render("add-Course");
});

router.post("/add", (req, res)=>{

    var course = new courseModel();
    course.courseName = req.body.courseName;
    course.courseId = Math.ceil(Math.random() * 1000000000) + "";
    course.courseDuration = req.body.courseDuration;
    course.save((err, docs)=>{
        if(!err){
            res.redirect("/course/list");
        }else{
            res.send("Error Occured");
        }
    });
});

router.get("/list", (req, res)=>{
    courseModel.find((err, docs)=>{
        if(!err){
            console.log(docs);
            res.render("list", {data:docs});
        }
    });
});

module.exports = router;