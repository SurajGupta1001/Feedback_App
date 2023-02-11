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


const adminController = require("./controllers/admin.js")
const feedbackController = require("./controllers/feedback")
const authMiddleware = require("./middleware/authmiddleware")

  


app.post("/logout", adminController.postLogout )
app.post("/register", adminController.postRegisterAdmin)
app.get("/admin", adminController.getLoginAdmin)
app.post('/admin/login', adminController.postLoginAdmin)


app.get("/",feedbackController.getFeedbackForm)
app.get("/all-feedback", authMiddleware,feedbackController.getFeedbackAllHtml)
app.post("/feedback", feedbackController.postFeedback)


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