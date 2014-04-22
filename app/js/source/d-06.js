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

    var range = $('#numbers').val().split(',');
    var nums = makeArray(range[0], range[1]);
    debugger;

    var last3 = nums.filter(isInLast3, nums);

    last3.forEach(function(num)
    {
      var $div = $('<div>');
      $div.text(num);
      $('#output').append($div);
    });
  }

  function isInLast3(num, index)
  {
    return (this.length-1 - index) < 3;
  }

  function makeArray(start, end)
  {
    start *= 1;
    end *= 1;
    var array = [];
    for(var i = start; i <= end; ++i)
    {
      array.push(i);
    }
    return array;
  }

})();