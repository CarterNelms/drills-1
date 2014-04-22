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

    var nums = $('#numbers').val().split(',');
    
    nums.forEach(function(num)
    {
      num *= 1;
      var ans = 1;
      for(var i = 0; i < 4; ++i)
      {
        ans *= num;
      }

      var $div = $('<div>');
      $div.text(ans);
      $('#output').append($div);
    });
  }

})();