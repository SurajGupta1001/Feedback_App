const express = require("express")
const mongoose = require("mongoose")

// Import Cookie Parser
const cookieParser = require("cookie-parser")


const app = express()

// Handle static files
app.use(express.static("public"))
// Handle json
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Setting Middleware to use cookies
app.use(cookieParser())

//--------------------------------------- Database -------------------------------//

// Define a schema for the feedback data
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String,
});

//schema for admin
const adminschema = new mongoose.Schema({
    name: String,
    password: String
});

// Create a model for the feedback data
  const Feedback = mongoose.model("Feedback",feedbackSchema)
  //model for adminschema
  const Admin = mongoose.model("Admin",adminschema)
//------------------------------------------------------------------------------//

//Register admin
app.get("/register", (req,res,next) => {
    res.sendFile(`${__dirname}/public/register-admin.html`)
})

app.post("/register", async(req,res,next) => {
    const name = req.body.name
    const pwd = req.body.password
    const admin = new Admin({
        name: name,
        password: pwd
    })
    const savedadmin = await admin.save()
    return res.send(`${name} is Registerd`)
})

app.get("/", (req,res, next) => {
    res.sendFile(`${__dirname}/public/feedback.html`)
})


app.get("/admin",(req,res,next) => {

    if(req.cookies.isAuthenticated){
        return res.redirect("/all-feedback")
    }
    res.sendFile(`${__dirname}/public/admin-login.html`)
})

app.post('/admin/login', async(req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.find({
 
        name: username,
        password: password
    })

     
    if(admin.length > 0){
        res.cookie("isAuthenticated", true)
       return res.redirect('/all-feedback')
    }
    res.send("Unauthorized User")
})


const authMiddleware = (req,res,next) => {
    const isAuthenticated = req.cookies.isAuthenticated;
    if(isAuthenticated){
        next();
    }else{
        return res.send("Unauthorised User")
    }
}


// Protected Routes
app.get('/feedbacks', authMiddleware, async(req,res,next) =>{
    const feedbacks = await Feedback.find();
    return res.json(feedbacks)
})





app.get("/all-feedback", authMiddleware, (req,res,next) => {
    res.sendFile(`${__dirname}/public/feedbacks.html`)
})




app.post("/logout", (req,res,next) => {
    res.clearCookie("isAuthenticated")
    return res.redirect("/admin")
})



app.post("/feedback",async (req,res, next) => {
    const name = req.body.name;
    const email =  req.body.email;
    const feedback = req.body.feedback;

    const feed = new Feedback({
        name: name,
        email: email,
        feedback: feedback
    })

    const savedFeed = await feed.save();
    console.log(name, email, feedback)
    res.send(`<h1>${name} Feedback is accepted</h1>`)
})


const startServer = async() => {
    await mongoose.connect("mongodb+srv://SurajGupta1001:root@cluster0.ntowqpv.mongodb.net/feedback")
    console.log("Database Connected...")
    app.listen(3000, () => console.log("Server started at http://localhost:3000"))
}

startServer();