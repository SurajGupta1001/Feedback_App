const Feedback = require("../model/feedback.model.js")

const getFeedbackForm = (req,res, next) => {
    res.sendFile(`${__dirname}/../public/feedback.html`)
}

const getFeedbacks = async(req,res,next) =>{
    const feedbacks = await Feedback.find();
    return res.json(feedbacks)
}

const getAllFeedback = async(req,res,next) =>{
    const feedbacks = await Feedback.find();
    return res.json(feedbacks)
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



module.exports = {getFeedbackForm, getFeedbacks, getAllFeedback, postFeedback }