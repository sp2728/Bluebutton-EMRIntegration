var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/coverage', async (req, res, next) => {
  // if(!req.session.accessToken) return res.json({message:'invalid'});

  const config = {
    headers: { Authorization: `Bearer vJOO847McvHXox3YtT90ETLTCKpV1E` }
  };

  const url = 'https://sandbox.bluebutton.cms.gov/v2/fhir/Coverage';
  let data = await axios.get(url,config);

  let patient = data.data;

  const responseObj = {
    total: patient.total,
    id: patient.id,
    data: patient.entry.map(val=>{
        return {
          type: val.resource.type.coding? val.resource.type.coding[0].code : '',
          status: val.resource.status,
          payor: val.resource.payor.identifier? val.resource.payor[0].identifier.value:'',
          period: val.resource.period? val.resource.period.start: ''}
    }) 
  }
  res.json(responseObj);
});

router.get('/eob', async (req, res, next) => {
  // if(!req.session.accessToken) return res.json({message:'invalid'});

  const config = {
    headers: { Authorization: `Bearer vJOO847McvHXox3YtT90ETLTCKpV1E` }
  };

  const url = 'https://sandbox.bluebutton.cms.gov/v2/fhir/ExplanationOfBenefit';
  let data = await axios.get(url,config);

  let patient = data.data;

  const responseObj = {
    total: patient.total,
    id: patient.id,
    data: patient.entry.map(val=>{
        return {
          status: val.resource.status,
          billablePeriod: val.resource.billablePeriod? val.resource.billablePeriod: '',
          careTeam: val.careTeam
        }
    }) 
  }
  res.json(responseObj);
});

module.exports = router;
