(function()
{
  'use strict';

  $(document).ready(initialize);

  function initialize()
  {
    $('#exponent').click(exponent);
  }

  function exponent()
  {
    $('#output').children().remove();

    var input = $('#numbers').val().split('-');
    var values = [];

    for(var j = 0; j < input.length; ++j)
    {
      values[j] = input[j].split(',');
    }
    
    values[0].forEach(function(num, index)
    {
      num *= 1;
      var exp = values[1][index]*1;
      var ans = 1;
      for(var i = 0; i < exp; ++i)
      {
        ans *= num;
      }

      var $divTop = $('<div>');
      var $divBottom = $('<div>');
      var $div = $('<div>');
      var topText = num;
      var $topSup = $('<sup>').text(exp);
      $divTop.text(topText);
      $divTop.append($topSup);
      $divBottom.text(ans);
      $div.append($divTop);
      $div.append($divBottom);
      $('#output').append($div);
    });
  }

})();