(function()
{
  'use strict';

  $(document).ready(initialize);

  function initialize()
  {
    $('#get').click(getQuote);
  }

  function getQuote()
  {
    var symbol = $('#symbol').val().trim().toUpperCase();
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol+'&callback=?';
    $.getJSON(url, function(data)
    {
      var name = data.Name;
      var priceStr = '$'+data.LastPrice.toFixed(2);

      var $div = $('<div>');
      var $divParent = $div.clone();
      var $divSymbol = $div.clone();
      var $divName = $div.clone();
      var $divPrice = $div.clone();

      $divSymbol.text(symbol);
      $divName.text(name);
      $divPrice.text(priceStr);

      $divParent.append($divSymbol);
      $divParent.append($divName);
      $divParent.append($divPrice);

      $('#quote').append($divParent);
    });
  }

})();