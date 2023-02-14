const express = require("express")

const router = express.Router();
const feedbackController = require("./controllers/feedback")
const authMiddleware = require("./middleware/authmiddleware")


app.get("/",feedbackController.getFeedbackForm)
app.get("/all-feedback", authMiddleware,feedbackController.getFeedbackAllHtml)
app.post("/feedback", feedbackController.postFeedback)




module.exports = router;