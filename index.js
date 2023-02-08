const express = require("express")
const mongoose = require("mongoose")
const app = express()

// Handle static files
app.use(express.static("public"))
// Handle json
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//--------------------------------------- Database -------------------------------//

  // Define a schema for the feedback data
  const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String,
  });

  // Create a model for the feedback data
  const Feedback = mongoose.model("Feedback",feedbackSchema)
  //------------------------------------------------------------------------------//


app.get("/", (req,res, next) => {
    res.sendFile(`${__dirname}/public/feedback.html`)
})


app.get("/admin",(req,res,next) => {
    res.sendFile(`${__dirname}/public/admin-login.html`)
})

app.post('/auth', (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username === "suraj" && password === "root"){
        res.redirect('/feedback')
    }

    res.send("Unauthorized")
})


app.get('/feedback', async(req,res,next) =>{
    const feedbacks = await Feedback.find();
    return res.json(feedbacks)
})

app.post("/feedback",async (req,res, next) => {
    const name = req.body.username;
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