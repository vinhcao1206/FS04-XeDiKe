// 3rd package
const express = require("express")
const mongoose = require("mongoose")
//connect db
mongoose.connect("mongodb://localhost:27017/fs04-xedike", {useNewUrlParser: true})
    .then(()=>console.log("Connected to DB"))
    .catch((err)=>console.log(err))
//my package
const app = express();

//middle ware
    //parser middle ware
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    //static
    app.use("/uploads", express.static('uploads'))

// router
app.use("/api/users", require("./routes/api/users"))


const port = process.env.PORT||5100;
app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`)
})