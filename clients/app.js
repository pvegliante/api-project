var stockTemplate = '<h2><%= name %></h2>' +
'<h3>Total:<%= total %></h3>'+
'<h3>Value:<%= value %></h3>'+
'<h3>Change:<%= change %></h3>';

var stocks = [];

var makeTemplate = function(data) {
  var li = document.createElement('li');
  var stockList = document.querySelector('.stock-list');
  var compiled = _.template(stockTemplate);
  var stockHtml = compiled(data);
  li.innerHTML = stockHtml;
  stockList.insertBefore(li, stockList.firstChild);
}

var updateStockList = function() {
  var stockData = stocks[stocks.length-1];
  // console.log(stockData);
  makeTemplate(stockData);
}

var getValues = function() {
  var name = document.querySelector('input[name=stock-name]').value;
  var value = document.querySelector('input[name=stock-value]').value;
  var total = document.querySelector('input[name=stock-total]').value;
  var stockChange = document.querySelector('input[name=stock-change]').value;
  var change = document.querySelector('select');
  change = change.options[change.selectedIndex].value;
  console.log(change);
  document.querySelector('input[name=stock-name]').value = '';
  document.querySelector('input[name=stock-value]').value = '';
  document.querySelector('input[name=stock-total]').value = '';
  document.querySelector('input[name=stock-change]').value = '';
    // document.querySelector('input[type=number]').value = '';

  return {
    name: name,
    value: value,
    total: total,
    change: change,
    stockChange: stockChange
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
    console.log(stocks);
    makeStockList();
  });
};

(function() {
  getAllStocks();
  var form = document.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var values = getValues();
    console.log(values);
    fetch('/stocks', {
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
      console.log(stocks);
      stocks.push(createdStock);
      // console.log(stocks);
      updateStockList();
    })
    return false;
  });
})();
