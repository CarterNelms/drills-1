(function()
{
  'use strict';

  $(document).ready(initialize);

  function initialize()
  {
    $('#toggle').click(toggle);
  }

  function toggle()
  {
    $('#toggle').toggleClass('toggled');
  }

})();