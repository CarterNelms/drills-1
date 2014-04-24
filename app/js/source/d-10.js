(function()
{
  'use strict';

  var clock;

  $(document).ready(initialize);

  function initialize()
  {
    $('#clock').on('click', '#start', start);
    $('#clock').on('click', '#stop', stop);
  }

  function start()
  {
    clock = setInterval(tickClock, 1000);
  }

  function stop()
  {
    clearInterval(clock);
  }

  function tickClock()
  {
    $('#seconds').text(seconds()+1);
  }

  function seconds()
  {
    return $('#seconds').text()*1;
  }

})();