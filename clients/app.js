var stockTemplate = '<h2><%= name %></h2>' +
'<h2><%= value %></h2>' +
'<h2><%= total %></h2>' +
'<h2><%=date %></h2>';

var stocks = [];

var makeTemplate = function(data) {
  var li = document.qureyElement('li');
  var stockList = document.querySelector('.stock-list');
  var compiled = _.template(stockTemplate);
  var stockHTML = compiled(data);
  li.innerHTML = stockHtml;
  stockList.insertBefore(li, stockList.firstChild);
}

var updateStockList = function() {
  var stockData = stocks[stock.length-1];
  makeTemplate(stockData);
}

var get Values = function() {
  var name = document.querySelector('input[name=stock-name]').value;
  var value = document.querySelector('input[name=stock-value]').value;
  var total = document.querySelector('input[name=stock-total]').value;
  var date = document.querySelector('input[name=stock-date]').value;

  document.querySelector('input[name=stock-name]').value = '';
  document.querySelector('input[name=stock-value]').value = '';
  document.querySelector('input[type=number]').value = '';

  return {
    name: name,
    value: value,
    total: total,
    date: date
  };
};

var makeStockList = function() {
  stocks.forEach(function(stock) {
    makeTemplate(stock);
  });
};

var getAllStocks = function() {
  fetch('/stocks')
  .then(function (resp) {
    return resp.json();
  })
  .then(function(data) {
    stocks = stocks.concat(data);
  });
};

(function() {
  getAllStocks();
  var form = document.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var vaules = getValues();
    console.log(values);
    fetch('./models/stocks', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(values)
    })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(createdStock) {
      stock.push(createdStock);
      console.log(stocks);
      updateStockList();
    })
    return false;
  });
})();
