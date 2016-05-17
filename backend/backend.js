var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var fileName =  __dirname + "/questions.json";

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/questions', function (req, res) {
	readQuestions(function (questions) {
		res.json(questions);
	});
});

app.post('/questions', function(req, res) {
	// Parse response
	var body = req.body;
    if(!body.hasOwnProperty("title") || typeof body.title != "string") {
        return res.status(400).json({ error: "Invalid or missing property 'title'." });
    }
	if(!body.hasOwnProperty("text") || typeof body.text != "string") {
		return res.status(400).json({ error: "Invalid or missing property 'text'." });
	}
	var question = {
        title: req.body.title,
		text: req.body.text,
	};

	// Save to file
	readQuestions(function (questions) {
		questions.push(question);
		writeQuestions(questions, function(err) {
			if(err) {
				return res.sendStatus(500);
			}

			return res.sendStatus(201);
		});
	});
});

function readQuestions(callback) {
	// Check, if file exists
	fs.access(fileName, fs.R_OK | fs.W_OK, (err) => {
		if(err) {
			// Default value
			callback([]);
		}
		else {
			// Read questions from file
			fs.readFile(fileName, 'utf8', function(err, data) {
				if(err) {
					callback([]);
				}
				else {
					callback(JSON.parse(data));
				}
			});
		}
	});
};

function writeQuestions(data, callback) {
	fs.writeFile(fileName, JSON.stringify(data), callback);
}

var server = app.listen(8080, function () {
	var host = server.address().address
	var port = server.address().port

	console.log("Hands-On backend listening at http://%s:%s", host, port)
});
