const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); 
const apiRoute = require('./src/routes/index')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoute);

app.use(express.static(path.join(__dirname, "public")));

app.listen(8000);
console.log("port is listening on 8000");

module.exports = app;
