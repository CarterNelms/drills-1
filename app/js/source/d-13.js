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
    $('#output td div').children().remove();

    var inputStrings = $('#input').val().split('-');

    var sum = arraySum(inputStrings[0].split('+').map(str2num).filter(isOdd));
    var product = arrayProduct(inputStrings[1].split('*').map(str2num).filter(isOdd));

    $('#sum').text(sum);
    $('#product').text(product);
  }

  function isOdd(num)
  {
    return num % 2;
  }

  function arraySum(array)
  {
    var ans = 0;
    for(var i = 0; i < array.length; ++i)
    {
      ans += array[i];
    }
    return ans;
  }

  function arrayProduct(array)
  {
    var ans = 1;
    for(var i = 0; i < array.length; ++i)
    {
      ans *= array[i];
    }
    return ans;
  }

  function str2num(str)
  {
    return str*1;
  }

})();