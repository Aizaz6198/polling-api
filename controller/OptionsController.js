const Option = require('../models/options');
const Question = require('../models/questions');

module.exports.create = async function(req, res) {
    try {
        console.log(req.body, req.params.id);

        const createdOption = await Option.create({
            option: req.body.content,
            question: req.params.id,
        });

        const updatedOption = await Option.findByIdAndUpdate(createdOption._id, {
            "add_vote": `http://localhost:8000/api/v1/options/${createdOption._id}/add_vote`
        });

        const question = await Question.findById(req.params.id);

        if (question) {
            question.options.push(updatedOption);
            await question.save();
            console.log(question);
            res.send(question);
        } else {
            res.status(404).send('Question does not exist');
        }
    } catch (error) {
        console.error("Error creating option:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.add_vote = async function(req, res) {
    try {
        console.log(req.params.id);

        const updatedOption = await Option.findByIdAndUpdate(req.params.id, { $inc: { vote: 1 } }, { new: true });

        if (updatedOption) {
            console.log(updatedOption);
            res.send(updatedOption);
        } else {
            res.status(404).send('Option does not exist');
        }
    } catch (error) {
        console.error("Error adding vote:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.delete = async function(req, res) {
    try {
        console.log('id', req.params.id);

        const deletedOption = await Option.findByIdAndDelete(req.params.id);

        if (deletedOption) {
            const question = await Question.findByIdAndUpdate(deletedOption.question, { $pull: { options: req.params.id } });
            console.log(question);
            res.send('Option deleted');
        } else {
            res.status(404).send('Option does not exist');
        }
    } catch (error) {
        console.error("Error deleting option:", error);
        res.status(500).send("Internal Server Error");
    }
};
