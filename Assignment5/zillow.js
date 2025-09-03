var express = require('express');
var app = express();

var houseData = [
    { price: 240000, city: 'baltimore' }, 
    { price: 300000, city: 'austin' }, 
    { price: 400000, city: 'austin' }, 
    { price: 1000000, city: 'seattle' }, 
    { price: 325000, city: 'baltimore' }, 
    { price: 550000, city: 'seattle' }, 
    { price: 250000, city: 'boston' }
];

var houseMatch = [];


app.get('/v1/zillow/zestimate', function(req, res) {
    var sqft = req.query.sqft;
    var bed = req.query.bed;
    var bath = req.query.bath;

    if (sqft != null && bed != null && bath != null) {

        if (!isNaN(sqft) && !isNaN(bed) && !isNaN(bath) ) {
            res.status(200).json({'zestimate ' : sqft * bed * bath * 10});
        } else {
            res.status(404).send('Invalid endpoint or arguments. Try again.');
        }
    }    
});


app.get('/v1/zillow/houses', function(req, res) {
    var city = req.query.city;
    var cityLowerCase = city.toLocaleLowerCase();

    if (cityLowerCase != null) {
        houseMatch = houseData.filter(houseData => houseData.city === cityLowerCase);
        if (houseMatch.length > 0) {
            res.status(200).json(houseMatch);
        } else {
            res.status(404).json(houseMatch);
        }
    }
});

app.get('/v1/zillow/prices', function(req, res) {
    var usd = req.query.usd;

    var houseMatch = houseData.filter(element => {
        return element.price <= usd;
    });

    if (houseMatch.length > 0) {
        res.status(200).json(houseMatch);
    } else {
        res.status(404).json(houseMatch);
    }

});


console.log("Navigate to http://localhost:3000/");

app.listen(3000);


