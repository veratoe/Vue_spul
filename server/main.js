var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// Load models. Dit moet handiger kunnen
require("./models");

// static files
app.use(express.static('public'));

// parsing request body for POST, PUT
app.use(bodyParser.json());

// routes
app.use("/api", require("./router"));

app.listen(3000);

