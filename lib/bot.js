var fs = require('fs');
var park = require('./markov-park.js');

var config = require('./bot_config.json');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: config.key,
    consumer_secret: config.secret,
    access_token_key: config.token.key,
    access_token_secret: config.token.secret
});

var params = {screen_name: 'MarkovPark'};

function twit(text) {
    client.post('statuses/update', {status: text},  function(error, tweet, response){
      if(error) throw JSON.stringify(error);
      console.log("트윗".green, tweet); 
    });
}

function fulltwit() {
    var str = '';
    var last = '';
    
    while(1) {
        last = park.say();
        console.log(str.length, str, '+', last.length, last)
        
        if(str.length + last.length > 140) {
            if(str.length > 140 || last.length > 140) {
                str = '';
                last = '';
            } else {
                twit(str);
                break;
            }
        } else str += ' ' + last;
        
    }
}

setTimeout(fulltwit, 1000)
setInterval(fulltwit, config.interval);




