var mongoose = require('mongoose');
var _= require('lodash');
var stockRouter = require('express').Router();
var Stock = require('../models/stocks');


stockRouter.get('/', function(req, res) {
  Stock.find((err, stocks) => {
      if(err) {
        res.send(err);
      }

      res.send(stocks);
  });
});

stockRouter.get('/:id', function(req, res) {
  var stock = req.stock;
  res.json(stock || {});
});

stockRouter.post('/stocks', function(req, res) {
  const stockObj = new Stock({
    name: req.body.name,
    value: req.body.value,
    total: req.body.total
  });

  stockObj.save((err) => {
    if (err) {
      res.send(err);
    }

    res.json({message: 'stock created'});
  });
});

stockRouter.put('/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var stock =_.findIndex(stocks, {id: req.params.id});
  if(!stocks[stock]) {
    res.send();
  } else {
    var updatedstock = _.assign(stocks[stock], update);
    res.json(updatedStock);
  }
});


stockRouter.delete('/:id', function(req, res) {
  var stock = _.findIndex(stocks, {id: req.params.id});
  if (!stocks[stock]) {
    res.send();
  } else {
    var deletedStock = stocks[stock];
    stocks.splice(stock, 1);
    res.json(deletedStock);
  }
});

module.exports = stockRouter;
