var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');
var mongoose = require('mongoose');
var stockRouter = require('express').Router();
var PORT = 1775;


mongoose.connect('mongodb://pete:kissmyass2006@ds133311.mlab.com:33311/newlion')

var stock = require('../models/stocks');

app.use(morgan('dev'));
app.use(express.static('clients'));
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

app.use('/stocks', stockRouter);

app.use(function(err, req, res, next) {
  if(err) {
    res.status(500).send(error);
  }
})


app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}`);
});
