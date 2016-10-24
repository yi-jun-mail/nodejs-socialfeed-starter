var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'x6CWQ3XGz2C3zcf1G5WoDXLF5',
  consumer_secret: 'n9ATGgVPSzfPT1WLsU2WLBUj5X6FK5LOGVkNqav8YmpD4tv6xT',
  access_token_key: '1571440098-zdDHbYpSECUbRhnWHlAExhwqBA47hdnc7HeG6bJ',
  access_token_secret: 'J9VgDfRH0Vl3hzG6Xvfb4E0kmPGLcHPlaWEjtLaqh4FPc'
});

/**
client.post('statuses/update', {status: 'I Love Tech Knights!'},  function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
*/
 
var params = {screen_name: 'nodejs'};
client.get('statuses/home_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

