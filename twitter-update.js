var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: twitterConfig.apikey,
    consumerSecret: twitterConfig.apisecret,
    callback: 'http://127.0.0.1:4000/login/twitter/callback'
});

twitter.statuses("update", {
        status: "Hello world!"
    },
    accessToken,
    accessTokenSecret,
    function(error, data, response) {
        if (error) {
            // something went wrong 
        } else {
            // data contains the data sent by twitter 
        }
    }
);
