var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var Message = require("./models/message");

// static files
app.use(express.static('public'));

// parsing request body for POST, PUT
app.use(bodyParser.json());

// routes
app.use("/api", require("./routes"));

app.listen(3000);

