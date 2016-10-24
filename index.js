//https://apps.twitter.com/app/13009240/keys
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var twitterConfig = require('./config/twitter.js');
var twitterAPI = require('node-twitter-api');
var Twit = require('twit')
var accessToken
var accessTokenSecret

// Configure the Twitter strategy for use by Passport.
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    consumerKey: twitterConfig.apikey,
    consumerSecret: twitterConfig.apisecret,
    callbackURL: 'http://127.0.0.1:8000/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    accessToken = token
    accessTokenSecret = tokenSecret
    console.log("get acess token and secret")
    return cb(null, profile);
  }));

var twitter = new twitterAPI({
    consumerKey: twitterConfig.apikey,
    consumerSecret: twitterConfig.apisecret,
    callback: 'http://127.0.0.1:8000/auth/twitter/callback'
});


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/',
  function(req, res) {
    res.render('index');
  });

//local login ignored
app.post('/login', passport.authenticate('twitter'));

//local signup ignored
app.get('/signup', passport.authenticate('twitter'));

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login'}),
  function(req, res) {
    var posts = [
      {id: "1234", name: "jyi", text: "awesome", image: "img.jpg", username: "jyi", liked: true,
       network: {class: "social", name: "twitter", icon: "icon"}}
    ];
    //getTimeline()
    //update()
    postTwitte()
    res.render('timeline', {posts: posts})
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

app.get('/compose',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
     console.log(req.body + ":" + req.query + ":" + req.params)
     if(req.query.reply)postTwitte(req.query.reply)
     res.render('compose')
  });

app.get(

function getTimeline() {
  var T = new Twit({
  consumer_key:         twitterConfig.apikey,
  consumer_secret:      twitterConfig.apisecret,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  })

  T.get('statuses/home_timeline', { count: 20 }, function(err, data, response) {
     if(err)return console.log(err);
  })
}


function postTwitte(message) {
  var T = new Twit({
  consumer_key:         twitterConfig.apikey,
  consumer_secret:      twitterConfig.apisecret,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  })

  T.post('statuses/update', { status: message }, function(err, data, response) {
     if(err)console.log(err)
  })
}

app.listen(8000);
