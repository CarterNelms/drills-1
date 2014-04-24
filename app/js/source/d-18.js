(function()
{
  'use strict';

  var tableTimer;
  var chosenSymbols = [];

  $(document).ready(initialize);

  function initialize()
  {
    $('#get').click(resetCompanies);
  }

  function resetCompanies()
  {
    clearInterval(tableTimer);

    var $tableBody = $('#quote tbody');
    $tableBody.children('tr').remove();

    chosenSymbols = $('#symbols').val().split(',').map(function(symbol)
    {
      return symbol.toUpperCase().replace(' ','');
    });

    updateTable();
    tableTimer = setInterval(updateTable, 1000);
  }

  function updateTable()
  {
    chosenSymbols.forEach(function(symbol)
    {
      var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol+'&callback=?';
      $.getJSON(url, printPrice);
    });

    function printPrice(data)
    {
      var symbol = data.Symbol;
      var price = data.LastPrice;

      var $row = $('#quote tbody tr:has(td:contains('+symbol+'))');
      if($row.length === 0)
      {
        $row = $('<tr>');
        for(var i = 0; i < 2;++i)
        {
          $row.append($('<td>'));
        }
        $('#quote tbody').append($row);
      }

      $row.children('td:first-child').text(symbol);
      $row.children('td:last-child').text('$'+price.toFixed(2));
    }
  }

})();