var Twit = require('twit')

var T = new Twit({
  consumer_key:         'x6CWQ3XGz2C3zcf1G5WoDXLF5',
  consumer_secret:      'n9ATGgVPSzfPT1WLsU2WLBUj5X6FK5LOGVkNqav8YmpD4tv6xT',
  access_token:         '1571440098-zdDHbYpSECUbRhnWHlAExhwqBA47hdnc7HeG6bJ',
  access_token_secret:  'J9VgDfRH0Vl3hzG6Xvfb4E0kmPGLcHPlaWEjtLaqh4FPc',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//
//  tweet 'hello world!'
//
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})

