var express = require('express');
var app = express();
var moment = require('moment');

var port = process.env.PORT || 8080;

app.get('/:date', function (req, res) {
    var unixTime = null;
    var naturalTimeString = null;
    
    var datePassed = req.params.date;
    
    var unixDate = moment.unix(datePassed);
    var regDate = moment(new Date(datePassed));    
    
    if(unixDate.isValid()) {
        unixTime = datePassed;
        naturalTimeString = moment.unix(datePassed).format("MMMM DD, YYYY");
    } 
    else if(regDate.isValid()) {
        naturalTimeString = regDate.format("MMMM DD, YYYY").valueOf();
        unixTime = moment(new Date(datePassed), "MMMM DD, YYYY").unix();
    }
    
    // { "unix": 1450137600, "natural": "December 15, 2015" }
    
    res.send({ "unix": unixTime, "natural": naturalTimeString });
});

app.get('/', function (req, res) {
    res.send("To use this app pass in a date in unix or natural form such as '/December 15, 2015'");
});    

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});