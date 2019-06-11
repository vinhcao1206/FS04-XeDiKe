// 3rd package
const express = require("express")
const mongoose = require("mongoose")
//connect db
mongoose.connect("mongodb://localhost:27017/fs04-xedike", {useNewUrlParser: true})
    .then(()=>console.log("Connected to DB"))
    .catch((err)=>console.log(err))
//my package
const app = express();


const port = process.env.PORT||5000;
app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`)
})