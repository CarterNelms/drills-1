(function()
{
  'use strict';

  $(document).ready(initialize);

  function initialize()
  {
    setRandomPositions();
    $('#container').on('click', 'div', select);
    $('body').keydown(move);
    $(window).resize(adjustForResize);
  }

  function adjustForResize()
  {
    var $big = $('#big');
    var $small = $('#small');

    var bOffsets = [];
    var sOffsets = [];

    bOffsets[0] = px2Int($big.css('left'));
    bOffsets[1] = px2Int($big.css('top'));
    sOffsets[0] = px2Int($small.css('left'));
    sOffsets[1] = px2Int($small.css('top'));
    debugger;

    setPos($big, bOffsets);
    setPos($small, sOffsets);
  }

  function select(event)
  {
    event.stopPropagation();

    $('.selected').removeClass('selected');
    $(this).addClass('selected');
  }

  function move(event)
  {
    var key = event.keyCode;
    if(key >= 37 && key <= 40)
    {
      event.preventDefault();
      var $div = $('.selected');
      var offsets = [
        px2Int($div.css('left')),
        px2Int($div.css('top'))
      ];
      var speed = 20;
      switch(event.keyCode)
      {
        case 38:
          offsets[1] -= speed;
          break;
        case 40:
          offsets[1] += speed;
          break;
        case 37:
          offsets[0] -= speed;
          break;
        case 39:
          offsets[0] += speed;
      }

      setPos($div, offsets);
    }
  }

  function setPos($div, offsets)
  {
    offsets = clampOffsets($div, offsets);

    $div.css({
      left: offsets[0],
      top: offsets[1]
    });
  }

  function setRandomPositions()
  {
    var $big = $('#big');
    var $small = $('#small');

    var bOffsets = [];
    var sOffsets = [];

    bOffsets[0] = randomOffset(maxXOffset($big));
    bOffsets[1] = randomOffset(maxYOffset($big));
    sOffsets[0] = randomOffset(maxXOffset($small));
    sOffsets[1] = randomOffset(maxYOffset($small));

    setPos($big, bOffsets);
    setPos($small, sOffsets);
  }

  function randomOffset(max)
  {
    return Math.floor(Math.random() * max);
  }

  function px2Int(str)
  {
    return str.replace('px', '')*1;
  }

  function clampOffsets($div, offsets)
  {
    var xOffset = clamp(offsets[0], 0, maxXOffset($div));
    var yOffset = clamp(offsets[1], 0, maxYOffset($div));

    return [xOffset, yOffset];
  }

  function clamp(num, min, max)
  {
    num = (num < min) ? min : num;
    num = (num > max) ? max : num;
    return num;
  }

  function maxXOffset($div)
  {
    var $parent = $div.parent();

    return $parent.width() - $div.outerWidth();
  }

  function maxYOffset($div)
  {
    var $parent = $div.parent();

    return $parent.height() - $div.outerHeight();
  }

})();