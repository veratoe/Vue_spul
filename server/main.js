var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// parsing request body for POST, PUT
app.use(bodyParser.json());


// static files
app.use(express.static('public'));


// routes
app.use("/api", require("./router"));

// Load models
require("./models");

app.listen(3000);

