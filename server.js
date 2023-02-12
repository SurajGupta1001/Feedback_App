const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())


const adminController = require("./controllers/admin.js")
const feedbackController = require("./controllers/feedback")
const authMiddleware = require("./middleware/authmiddleware")


app.post("/logout", adminController.postLogout )
app.get("/register",(req, res, next) => {
    res.sendFile(`${__dirname}/public/register-admin.html`)
})
app.post("/register", adminController.postRegisterAdmin)
app.get("/admin", (req,res,next) => {

    if(req.cookies.isAuthenticated){
        return res.redirect("/all-feedback")
    }
    res.sendFile(`${__dirname}/public/admin-login.html`)
})
app.post('/admin/login', adminController.postLoginAdmin)

app.get("/", (req,res, next) => {
    res.sendFile(`${__dirname}/public/feedback.html`)
})
app.get('/feedbacks', authMiddleware, feedbackController.getFeedbacks)
app.get("/all-feedback", authMiddleware, (req,res,next) => {
    res.sendFile(`${__dirname}/public/feedbacks.html`)
})
app.post("/feedback", feedbackController.postFeedback)

const port = process.env.PORT || 3000;
const startServer = async() => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database Connected...")
    app.listen(port, () => console.log("Server started at http://localhost:3000"))
}

startServer();