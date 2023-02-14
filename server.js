const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const morgan = require("morgan")
dotenv.config()

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(morgan("tiny"))


// setting ejs
app.set("view engine", "ejs");
app.set("views", "views");
const authRoutes = require("./rotues/authRoutes")
const feedbackRoutes = require("./rotues/feedbackRoute")


  
app.use(authRoutes)
app.use(feedbackRoutes)




app.use((req,res,next) => {
    res.send("<h1>Route Not Exist</h1>")
})


const port = process.env.PORT || 3000;
const startServer = async() => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database Connected...")
    app.listen(port, () => console.log("Server started at http://localhost:3000"))
}

startServer();