var fs = require('fs');
 
var markov = require('markov-kor');

var m = markov();
var s = fs.createReadStream(__dirname + '/../corpus/park.txt');
m.seed(s);

var say = function(keyword, limit) {
    return m.generateText(keyword, limit);
}

module.exports = {
    'say': say
}