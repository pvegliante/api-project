var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');
var mongoose = require('mongoose');
var stockRouter = require('./stocks');


mongoose.connect('mongodb://pete:kissmyass2006@ds133311.mlab.com:33311/newlion')


app.use(morgan('dev'));
app.use(express.static('clients'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//this is called mounting. when a request comes in for
// /Stock, we want to use this router.
app.use('/stocks', stockRouter);


app.use(function(err, req, res, next) {
  if(err) {
    res.status(500).send(error);
  }
})

app.listen(3000);
