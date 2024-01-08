var express = require('express');
var router = express.Router();

let url    = 'http://api.openweathermap.org/data/2.5/weather?q='
let appId  = 'appid=YOUR API KEY';
let units  = '&units=metric'; 
var request = require('request');

// get the home page
router.get('/', function(req , res , next){
    res.render('index', {'body': '' , forecast:''});
});

router.post('/weather' , function(req , res , next){
    let city = req.body.city;
    url = url + city + "&" + appId;

    request(url , function(error, response , body){
        console.log('error:', error);  // print the error if there is any
        console.log('statusCode:', response && response.statusCode);
        body = JSON.parse(body);
       console.log(body);
       if(error && response.statusCode != 200){
        throw error;
       }

       let country = (body.sys.country) ? body.sys.country : "";
       let forecast = "For City" + city + ' , country ' + country;

       res.render('index', {body: body , forecast : forecast});
    });
});

module.exports = router;