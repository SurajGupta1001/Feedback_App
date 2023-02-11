const Feedback = require("../model/feedback.model.js")

const getFeedbackForm =  (req,res, next) => {
    res.render("feedback.ejs",{})
}

const getFeedbackAllHtml = async(req,res,next) => {
    const feedbacks = await Feedback.find()
    return res.render("feedbacks.ejs",{
        feedbacks: feedbacks
    })
}


const postFeedback = async (req,res, next) => {
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
    res.send(`<h1 style="display:inline; font-size: 20px; font-weight: bold; color: green;">&#10003; Thank you ${name} , for submitting your feedback!</h1>
    `)
}



module.exports = {getFeedbackForm, postFeedback, getFeedbackAllHtml }