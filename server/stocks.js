var mongoose = require('mongoose');
var _ = require('lodash');
var stockRouter = require('express').Router();
var Stock = require('../models/stocks');

stockRouter.get('/', function(req, res) {
  Stock.find((err, stocks) => {
    if(err) {
      res.send(err);
    }
// mongoose sends information back in json format
    res.send(stocks);
  });
});

stockRouter.get('/:id', function(req, res) {
    var stock = req.stock;
    res.json(stock || {});
});

stockRouter.post('/', function(req, res) {
  // recieve the json Stock object
  console.log('anything Im here whatever');
  const stockObj = new Stock({
    name: req.body.name,
    value: req.body.value,
    total: req.body.total,
    change: req.body.change,
    stockChange: req.body.stockChange
  });

  stockObj.save((err) => {
    if (err) {
      res.send(err);
    }

    res.send(stockObj);
  });
});

stockRouter.put('/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var stock = _.findIndex(stocks, {id: req.params.id});
  if (!stocks[stock]) {
    res.send();
  } else {
    var updatedStock = _.assign(stocks[stock], update);
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
