(function()
{
  'use strict';

  $(document).ready(initialize);

  function initialize()
  {
    $('#colorize').click(colorize);
  }

  function colorize()
  {
    var color = [
      randomColorVal(), // Red
      randomColorVal(), // Green
      randomColorVal(), // Blue
      randomAlphaVal(), // Alpha
    ];

    $('#colorize').css({
      'background-color': 'rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]+')'
    });
  }

  function randomColorVal()
  {
    return Math.floor(Math.random() * 256);
  }

  function randomAlphaVal()
  {
    return Math.random();
  }

})();