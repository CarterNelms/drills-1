(function()
{
  'use strict';

  $(document).ready(initialize);

  function initialize()
  {
    $('#equal').click(add);
  }

  function add()
  {
    var n1 = $('#n1').val()*1;
    var n2 = $('#n2').val()*1;
    $('#answer').text(n1+n2);
  }

})();