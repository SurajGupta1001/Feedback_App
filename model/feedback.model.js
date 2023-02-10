const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String,
});

// Create a model for the feedback data
const Feedback = mongoose.model("Feedback",feedbackSchema)

module.exports = Feedback