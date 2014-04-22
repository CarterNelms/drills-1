(function()
{
  'use strict';

  $(document).ready(initialize);

  function initialize()
  {
    $('#uclc').click(uclc);
  }

  function uclc()
  {
    $('#output').children().remove();

    var words = $('#text').val().split(' ');
    
    words.forEach(function(word)
    {
      var $div = $('<div>');
      $div.text(word);
      if(isOddLength(word))
      {
        $div.addClass('odd');
      }
      $('#output').append($div);
    });

    function isOddLength(word)
    {
      return word.length % 2;
    }
  }

})();