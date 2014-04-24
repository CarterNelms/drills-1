(function()
{
  'use strict';

  $(document).ready(initialize);

  function initialize()
  {
    $('#operate').click(operate);
  }

  function operate()
  {
    $('#output').children().remove();

    var output = $('#input').val().split(',').map(str2num).map(specificExponent);
    
    output.forEach(function(num)
    {
      var $div = $('<div>');
      $div.text(num);
      if(num%2)
      {
        $div.addClass('odd');
      }
      $('#output').append($div);
    });
  }

  function specificExponent(num)
  {
    var exp = (num%2) ? 3 : 2;
    var ans = 1;
    for(var i = 0; i < exp; ++i)
    {
      ans *= num;
    }
    return ans;
  }

  function str2num(str)
  {
    return str*1;
  }

})();