var express = require('express');
var router = express.Router();
const passport = require('passport')
const axios = require('axios');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('Welcome '+ patient.patient);
});

router.get('/user/Info', async (req, res) =>{
  if(!req.session.accessToken) return res.json({message:'invalid'});

  const config = {
    headers: { Authorization: `Bearer vJOO847McvHXox3YtT90ETLTCKpV1E` }
  };
  const url = 'https://sandbox.bluebutton.cms.gov/v2/connect/userinfo';
  let data = await axios.get(url,config);

  let patient = data.data;
  res.json({patient});
});

router.get('/auth/login', passport.authenticate('oauth2', { scope: ['profile'] }));

router.get('/login', function (req, res, next) {
  if (req.query.code) {
    req.session.accessToken = req.query.code;
    res.redirect('/auth/success');
    return;
  }
  res.redirect('/auth/failed');
});

router.get('/auth/success', async (req, res) => {

  res.send('Successfully authenticated with' + req.session.accessToken);
});

router.get('/auth/failed', (req, res) => {
  res.send('Unable to login');
});

module.exports = router;
