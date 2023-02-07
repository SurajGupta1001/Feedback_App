const express = require("express")

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/feedback_sr',(req,res,next) => {
    res.sendFile(`${__dirname}/public/feedback.html`)
})

app.post('/feedback',(req,res,next) => {
    const uname = req.body.username
    const email = req.body.email
    const feed = req.body.feedback

    console.log(uname,email,feed)
    
    return res.send(`${uname} feedback is accepted`)

})

app.listen(4000,() => console.log('server started'))