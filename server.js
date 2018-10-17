const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

const QuestionModel = require('./models/questionModel');

mongoose.connect("mongodb://localhost/quyetde", (err) => {
	if(err) console.log(err)
	else console.log("DB connect success!");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/answer.html')
});

app.get('/ask', (req, res) => {
    res.sendFile(__dirname + '/public/ask.html')
});

app.get('/answer', (req, res) => {
    res.sendFile(__dirname + '/public/answer.html')
});

app.post('/createquestion', (req, res) => {
    // const newQuestion = new QuestionModel({
	// 	questionContent: req.body.questionContent
	// });

	// newQuestion.save();

	// res.redirect('/answer');

	QuestionModel.create(
		{ questionContent: req.body.questionContent },
		(err, questionCreated) => {
			if(err) console.log(err)
			else res.redirect('/question/' + questionCreated._id);
		});
 });

app.get('/randomquestion', (req, res) => {
	QuestionModel.find({}, (err, questionList) => {
		// console.log(questionList)
		if(err) console.log(err)
		else {
			let randomIndex = Math.floor(Math.random()*questionList.length);
			QuestionModel.findOne({})
			.skip(randomIndex == 0 ? randomIndex : randomIndex - 1)
			.exec( (err, questionFound) => {
				// console.log(questionFound)
				if(err) console.log(err)
				else res.send(questionFound)
			});
		}	
	});
});

app.post('/answer', (req, res) => {
	const { questionid, answer } = req.body;
	// const questionid = req.body.questionid;
	// const answer = req.body.answer;

	QuestionModel.findOneAndUpdate(
		{ "_id": questionid },
		{ $inc: { [answer]: 1 } },
		{ new: true },
		(err, questionUpdated) => {
			console.log(questionUpdated)
			if(err) console.log(err)
			else {
				res.send({ success: 1 , question: questionUpdated });
			}
	});
});

app.get('/question/:questionId', (req, res) => {
	res.sendFile(__dirname + "/public/detail.html");
});

app.get('/questiondetail/:questionId', (req, res) => {
	let questionId = req.params.questionId;

	QuestionModel.findById(questionId)
	QuestionModel.findOne({ "_id": questionId }, (err, questionFound) => {
		if(err) console.log(err)
		else if(!questionFound) console.log("Not Found")
		else {
			res.send({ success: 1, question: questionFound });
		}
	});
});

app.use(express.static('public'));

app.listen(1808, (err) => {
    if(err) console.log(err)
    else console.log('Server is listening at port 1808');
});

