var favNumber = Math.floor(Math.random() * 10)+1;
var fav = document.createElement('link');
fav.rel = 'icon';
fav.href = '../../assets/favicon/Ball'+favNumber+'.png';
document.getElementsByTagName('head')[0].appendChild(fav);
