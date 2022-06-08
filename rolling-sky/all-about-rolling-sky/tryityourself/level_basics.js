/* Script coded by sqdldev, a part of sqdldev's Rolling Sky Online Interactables */

var tiles = document.getElementById('container').children;
var input = document.getElementById('input');

setInterval(function () {
   var inText = input.value;
   var tilearray = inText.split(/\r\n|\n\r|\n|\r/).join(',').split(',');

   for (i = 0; i < tiles.length; i++) {
      if (tilearray[i] != "")
         tiles[i].className = tilearray[i];
      else
         tiles[i].className = "0";
   }
});