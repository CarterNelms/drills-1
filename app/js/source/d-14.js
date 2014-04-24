(function()
{
  'use strict';

  $(document).ready(initialize);

  function initialize()
  {
    $('#container').on('click', '.rectangle', selectByClick);
    $('#create').click(createNew);
    $('body').keydown(move);
    //$(window).resize(adjustForResize);
  }

  function createNew()
  {
    var $rect = $('<div>').addClass('rectangle');

    $('#container').append($rect);

    $rect.css({
      width: randomInt(15, 150)+'px',
      height: randomInt(15, 150)+'px',
      'background-color': randomRGBstr()
    });
    setRandomPosition($rect);

    if(!($('.selected').length))
    {
      select($rect);
    }
  }

  function selectByClick()
  {
    select($(this));
  }

  function select($rect)
  {
    $('.selected').removeClass('selected');
    $rect.addClass('selected');    
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

      checkForCollision();
    }
  }

  function checkForCollision()
  {
    var $rect = $('.rectangle.selected');
    var otherRects = $('.rectangle:not(.selected)').toArray();

    var collidedRects = [];

    var rectParams = getSizeAndPosParams($rect);

    otherRects.forEach(function(currentRect)
    {
      var $currentRect = $(currentRect);

      var currentRectParams = getSizeAndPosParams($currentRect);

      if(isCollision(rectParams, currentRectParams))
      {
        collidedRects.push($currentRect);
      }

    });

    if(collidedRects.length)
    {
      combineRectangles(collidedRects);
    }

    function isCollision(params1, params2)
    {
      var params1D1x = [params1[0], params1[2]];
      var params1D1y = [params1[1], params1[3]];
      var params1D2x = [params2[0], params2[2]];
      var params1D2y = [params2[1], params2[3]];

      return isPossibleCollision(params1D1x, params1D2x) && isPossibleCollision(params1D1y, params1D2y);
    }

    function isPossibleCollision(params1D1, params1D2)
    {
      var pos1 = params1D1[0];
      var pos2 = params1D2[0];
      var size1 = params1D1[1];
      var size2 = params1D2[1];

      var minSafeDistance = (size1 + size2)/2;
      var currentDistance = Math.abs(pos1 - pos2);

      return (currentDistance < minSafeDistance);
    }
  }

  function getSizeAndPosParams($div)
  {
    var sizeXY = [
      $div.outerWidth(),
      $div.outerHeight()
    ];

    var posXY = [
      px2Int($div.css('left')),
      px2Int($div.css('top'))
    ].map(function(val, index)
      {
        return val + sizeXY[index]/2;
      });

    return [posXY[0], posXY[1], sizeXY[0], sizeXY[1]];
  }

  function combineRectangles(collidedRects)
  {
    var $rect = $('.selected');
    var allRects = [$rect].concat(collidedRects);

    var totalPosXY = [0,0];
    var totalSizeXY = [0,0];

    var RGBs = [];

    allRects.forEach(function($currentRect)
    {
      var params = getSizeAndPosParams($currentRect);
      totalPosXY[0] += params[0];
      totalPosXY[1] += params[1];
      totalSizeXY[0] += params[2];
      totalSizeXY[1] += params[3];
      RGBs.push(rgbToArray($currentRect.css('background-color')));
    });

    var offsetXY = totalPosXY.map(function(sum, index)
    {
      var avgPosCenter = sum/allRects.length;
      return avgPosCenter - totalSizeXY[index]/2;
    });

    collidedRects.forEach(function($currentRect)
    {
      $currentRect.remove();
    });

    var avgColor = avgRGBstr(RGBs);

    $rect.css({
      // left: offsetXY[0]+'px',
      // top: offsetXY[1]+'px',
      width: totalSizeXY[0]+'px',
      height: totalSizeXY[1]+'px',
      'background-color': avgColor
    });

    setPos($rect, offsetXY);
  }

  function rgbToArray(RGBstr)
  {
    return RGBstr.replace('rgb(', '').replace(')', '').split(',').map(function(val)
      {
        return val*1;
      });
  }

  function rgbToString(RGB)
  {
    return 'rgb('+RGB[0]+','+RGB[1]+','+RGB[2]+')';
  }

  function avgRGB(RGBs)
  {
    var sumOfAllRGBs = [0,0,0];
    RGBs.forEach(function(currentRGB)
    {
      currentRGB.forEach(function(val, index)
      {
        sumOfAllRGBs[index] += val;
      });
    });

    return sumOfAllRGBs.map(function(val)
    {
      return Math.round(val/RGBs.length);
    });
  }

  function avgRGBstr(RGBs)
  {
    return rgbToString(avgRGB(RGBs));
  }

  function setPos($div, offsets)
  {
    offsets = clampOffsets($div, offsets);

    $div.css({
      left: offsets[0],
      top: offsets[1]
    });
  }

  function setRandomPosition($div)
  {
    var offsets = [];

    offsets[0] = randomInt(0, maxXOffset($div));
    offsets[1] = randomInt(0, maxYOffset($div));

    setPos($div, offsets);
  }

  function randomInt(min, max)
  {
    return min + Math.floor(Math.random() * (max+1));
  }

  function randomRGB()
  {
    var RGB = [];
    for(var i = 0; i < 3; ++i)
    {
      RGB.push(randomInt(0, 255));
    }
    return RGB;
  }

  function randomRGBstr()
  {
    return rgbToString(randomRGB());
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