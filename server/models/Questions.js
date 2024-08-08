
const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
    questionHeader: { type: String, required: true },
    questionDescription: { type: String, required: false },
    questionsFile: { type: String, required: true }
});

module.exports = mongoose.model('questions', QuestionsSchema);