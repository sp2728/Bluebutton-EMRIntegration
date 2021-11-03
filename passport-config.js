const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2');
const BearerStrategy = require('passport-http-bearer');
var Strategy = require('passport-http-bearer').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new Strategy(
    function(token, cb) {
      return 'ZcwjGZdCB1IUVVmCGPSaLB3V4ghHEo';
    }));

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://sandbox.bluebutton.cms.gov/v2/o/authorize/',
    tokenURL: 'https://sandbox.bluebutton.cms.gov/v2/o/token/',
    clientID: 'GfPUcCYCXflGkWfsuCKxpULvdXhCZGbb0X05XJGH',
    clientSecret: 'ie6MF8CvVIcqDdsx9YIfiiTlGxCC97ee63JRjW8lGahGicS1hIGsasDV4VtekFO5j5zTwrMlQwjdABqIDnQmykhfxlmWTjdEeuUFQngMya7aO6A8Bj1fohp7yyqxBonA',
    callbackURL: "http://localhost:8082/login",
  },
  (accessToken, refreshToken, profile, cb) => {
    return done(null, profile);
  }
));

passport.use(new BearerStrategy(
  function(token, done) {
    console.log(profile);
  }
));