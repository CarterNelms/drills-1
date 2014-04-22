(function()
{
  'use strict';

  $(document).ready(initialize);

  function initialize()
  {
    $('#square').click(square);
  }

  function square()
  {
    $('#output').children().remove();

    var range = $('#numbers').val().split(',');
    var nums = makeArray(range[0], range[1]);
    debugger;

    var squares = nums.map(squareNum).filter(isEven);

    squares.forEach(function(num)
    {
      var $div = $('<div>');
      $div.text(num);
      $('#output').append($div);
    });
  }

  function squareNum(num)
  {
    return num * num;
  }

  function isOdd(num)
  {
    return num % 2;
  }

  function isEven(num)
  {
    return !isOdd(num);
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