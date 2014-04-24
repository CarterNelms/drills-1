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
    $('#quote div').remove();
    var shares = $('#shares').val().trim()*1;
    var symbol = $('#symbol').val().trim().toUpperCase();
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol+'&callback=?';
    $.getJSON(url, function(data)
    {
      //var name = data.Name;
      var priceStr = '$'+data.LastPrice.toFixed(2);
      var position = '$'+(shares*data.LastPrice).toFixed(2);

      var $div = $('<div>');
      var $divParent = $div.clone();
      var $divShares = $div.clone();
      var $divPrice = $div.clone();
      var $divPosition = $div.clone();

      $divShares.text('Shares: ' + shares);
      $divPrice.text('Price: ' + priceStr);
      $divPosition.text('Position: ' + position);

      $divParent.append($divShares);
      $divParent.append($divPrice);
      $divParent.append($divPosition);

      $('#quote').append($divParent);
    });
  }

})();