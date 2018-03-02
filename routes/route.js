const express = require("express");
const route = express.Router();
const path = require("path");
var API = require('phone-number-validation');
var accessKey = 'acbe9b84657c2c81717162ce5cc0da1f';
const crud = require('../db/crud');
var api = new API({
    access_key: accessKey,
    secure: true
});



route.post("/user-form", (req, res) => {
    console.log("Inside node user form");
    user = req.body;
    api.countries(function (err, result) {
        if (err) {
            return console.log('Countries Callback (Error): ' + JSON.stringify(err));
        }
        console.log('Countries Callback (Success): ' + JSON.stringify(result));
    });
    var query = {
        number: user.phone,
        country_code: 'IN'
    };
    api.validate(query, function (err, result) {
        if (err) {
            return console.log('Validate Callback (Error): ' + JSON.stringify(err));
        } else {
            console.log('Validate Callback (Success): ' + JSON.stringify(result));

            if (result.valid)
                crud.saveForm(user, res);
            else
                res.send("WrongNumber");
        }
    });
});



route.get('/', (request, response) => {
    console.log(__dirname);
    var normalPath = path.normalize(__dirname + "/..");
    console.log(normalPath);
    var fullPath = path.join(normalPath, "/public/pages/index.html");
    response.sendFile(fullPath);
});

module.exports = route;
