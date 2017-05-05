var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var crypto = require('crypto');

// Load models
var models = require("./models");

// authentication
app.use((req, res, next) => {
    var user = basicAuth(req);

    if (!user){
        return next();
    }

    models.User
        .findOne({ where: { username: user.name }})
        .then(u => {
            if (!u) {
                throw "not found";
            }
            console.log('found user %s, testan password', user.name);

            var hash = crypto.createHash('sha256').update(u.salt + user.pass).digest('hex');
            console.log(u.password);
            console.log(hash);
            if (u.password === hash) console.log('LE AUTHORIZED!!!');
            
            next();
        })
        .catch(() => {
            console.error("%s NOT FOUND!", user.name);
            return next();
        });

});

// parsing request body for POST, PUT
app.use(bodyParser.json());

// static files
app.use(express.static('public'));

// routes
app.use("/api", require("./router"));

app.listen(3000);

