const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mern_shopping', {useNewUrlParser: true}, (err) => {
    if(!err){
        console.log("Successfully connected to MongoDB");
    }else{
        console.log("Error in DB connection: " + err);
    }
});