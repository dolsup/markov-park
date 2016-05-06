var fs = require('fs');
var markov = require('markov-kor');

var m = markov();
var s = fs.createReadStream(__dirname + '/../corpus/park.txt');
m.seed(s, function() {
	console.log(m.generateText(process.argv[2], process.argv[3]));
});