const express = require("express")

const app = express()

// Handle static files
app.use(express.static("public"))
// Handle json
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get("/", (req,res, next) => {
    res.sendFile(`${__dirname}/public/feedback.html`)
})

app.post("/feedback", (req,res, next) => {
    const name = req.body.username;
    const email =  req.body.email;
    const feedback = req.body.feedback;

    console.log(name, email, feedback)
    res.send("Your Feedback is accepted")
})


app.listen(3000, () => console.log("Server started at http://localhost:3000"))