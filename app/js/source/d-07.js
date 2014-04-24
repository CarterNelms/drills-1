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

    var matedSums = nums.filter(isInFirstHalf, nums).map(mateSum, nums.reverse());

    matedSums.forEach(function(num)
    {
      var $div = $('<div>');
      $div.text(num);
      $('#output').append($div);
    });
  }

  function mateSum(num, index)
  {
    var lastIndex = Math.floor(this.length/2);
    var ans = num;
    ans += (index === lastIndex) ?
      0 :
        this[index];
    return ans;
  }

  function isInFirstHalf(num, index)
  {
    var lastIndex = this.length-1;
    return index <= lastIndex/2;
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