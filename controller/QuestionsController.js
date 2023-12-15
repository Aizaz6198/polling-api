const Question = require('../models/questions')
const Option = require('../models/options')

module.exports.create = async function(req, res) {
    try {
        console.log("Request received to create a new question.");
        const { title, options } = req.body;
        const ques = await Question.create({ title, options });
        console.log("Question created:", ques.title);
        res.status(201).send(ques); // 201 Created
    } catch (err) {
        console.error("Error creating question:", err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.showDetails = async function(req, res) {
    try {
        console.log("Request received for question details. Question ID:", req.params.id);
        const ques = await Question.findById(req.params.id).populate('options');
        
        if (ques) {
            res.send(ques);
        } else {
            console.log("Question not found. ID:", req.params.id);
            res.status(404).send("Question not found");
        }
    } catch (err) {
        console.error("Error fetching question details:", err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.deleteQues = async function(req, res) {
    try {
        console.log("Request received to delete a question. Question ID:", req.params.id);
        const ques = await Question.findById(req.params.id);
        
        if (ques) {
            await Question.deleteOne({ _id: req.params.id });
            await Option.deleteMany({ question: req.params.id });
            console.log("Question deleted:", ques.title);
            res.status(204).send(); // 204 No Content
        } else {
            console.log("Question not found for deletion. ID:", req.params.id);
            res.status(404).send('Question does not exist');
        }
    } catch (err) {
        console.error("Error deleting question:", err);
        res.status(500).send("Internal Server Error");
    }
};
