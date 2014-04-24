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
      console.log(data);
      $('#quote').text('$'+data.LastPrice.toFixed(2));
    });
  }

})();