/*const stuff = [];
var posx = 0;
var posy = 0;

for (let i = 1; i < 1111; i++) {
	let f = i.toString();
	if (f.length > 1)
		f = [f.slice(0, 1), " ", f.slice(1)].join('');
	if (posx >= 2048) {
		posx = 0;
		posy += 64;
	}
	stuff.push(".\\3"+f+"{background: url(../tileset/tileset01.png) -"+posx+"px -"+posy+"px; opacity: 1;}");
	posx += 64;
}

console.log(stuff.join("\n"));
*/

var canvas = document.getElementById('canvas');
var line = canvas.innerHTML;

var levellengthinput = document.getElementById('length');

function autostart() {
	start(levellengthinput.value);
}

function start(maxlength) {
	if (maxlength >= 1) {
		canvas.innerHTML = line;
		var a = line;
		for (let i = 1; i < maxlength; i++) {
			a += line;
		}
		canvas.innerHTML = a;
		window.scrollTo(0, document.body.scrollHeight);
		document.getElementById('startmenu').style.display = 'none';
		document.getElementById('level').style.visibility = 'visible';
	}
}

var tileselectinput = document.getElementById('input');
var tileselectval = 0;

function changeval() {
	tileselectval = parseInt(tileselectinput.value);
}

function detectLeftButton(evt) {
    evt = evt || window.event;
    if ('buttons' in evt) {
        return evt.buttons == 1;
    }
    var button = evt.which || evt.button;
    return button == 1;
}

document.onmousemove = function (e) {
    e = e || window.event;
    evt = e;
	draw(e);
}

document.onmousedown = function (e) {
    e = e || window.event;
    evt = e;
	//svun(e);
	draw(e);
}

document.onmouseup = function (e) {
    e = e || window.event;
    evt = e;
	//svun(e);
}


document.addEventListener('touchstart', (e)=>{mobiledraw(e)}, false);
document.addEventListener('touchmove', (e)=>{mobiledraw(e)}, false);
document.addEventListener('touchend', (e)=>{mobiledraw(e)}, false);
document.addEventListener('touchmove', function(event){
  if (event.scale !== 1) event.preventDefault();
})

function mobiledraw(e) {
	if (e.target.tagName == 'C-TILE') {
		e.target.className = tileselectval.toString();
	}
	if (e.target.tagName == 'C-SEL') {
		tileselectval = parseInt(e.target.className);
	}
}

function draw(e) {
	if (detectLeftButton(e) == 1) {
		if (e.target.tagName == 'C-TILE') {
			e.target.className = tileselectval.toString();
		}
		if (e.target.tagName == 'C-SEL') {
			tileselectval = parseInt(e.target.className);
		}
	}
	
}

/*function svun(e) {
	if (e.srcElement.tagName == 'C-TILE') {
		saveUndo();
	}
}*/

function generate() {
	var tilesarray = canvas.children;
	var tiles = [];
	var tilesf = [];
	var tilejoin = '';
	var tilesp;

	var fposx = 0;

	var splitter = ',';

	for (let i = 0; i < tilesarray.length; i++) {
		tiles.push(tilesarray[i].classList[0]);
	}

	for (let i = 0; i < tiles.length; i+=5) {
		tilesf.push(tiles[i]+splitter+tiles[i+1]+splitter+tiles[i+2]+splitter+tiles[i+3]+splitter+tiles[i+4]+splitter+'\n');
	}

	tilejoin = tilesf.join('').toString();
	tilejoin = tilejoin.substring(0, tilejoin.length - 2);
	var header1 = '[header]\nwidth=5\nheight=';
	var header2 = '\ntilewidth=64\ntileheight=64\norientation=orthogonal\n\n[tilesets]\ntileset=../tileset/tileset01.png,64,64,0,0\n\n[layer]\ntype=Level\ndata=';
	var tilefinal = header1+tilesf.length.toString()+header2+"\n"+tilejoin+"\n\n";
	return tilefinal;
}

/*document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'z') {
    loadUndo();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'y') {
    loadRedo();
  }
});

var undo = [];
var undopos = 0;

function saveUndo() {
	undo.push(canvas.innerHTML);
	undopos = undo.length;
	//console.log(undopos);
}

function loadUndo() {
	if (undo[length+1] != 'undefined') {
		undopos -= 1;
		if (undopos >= 0) {
			canvas.innerHTML = undo[length+undopos];
			//console.log(undopos);
		}
		else {
			undopos = 0;
		}
	}
}

function loadRedo() {
	if (undo[length+1] != 'undefined') {
		undopos += 1;
		if (undopos < undo.length) {
			canvas.innerHTML = undo[length+undopos];
			//console.log(undopos);
		}
		else {
			undopos = undo.length;
		}
	}
}*/

window.addEventListener('beforeunload', function (e) {
	e.preventDefault();
	e.returnValue = '';
});

var uploadfile = document.getElementById('upload');
var uploadtxt = '';
var uploadtxtarr = [];
var tbi;
var htmtxt = [];
var leveldetectlength = 0;

function changefile() {
	var fr=new FileReader();
	fr.onload=function() {
		uploadtxt=fr.result;
		uploadtxtarr = uploadtxt.split('\r\n').join('').split('\r').join('').split('\n');
		console.log(uploadtxtarr);
	}
	fr.readAsText(uploadfile.files[0]);
}

function upload() {
	tbi = '';
	leveldetectlength = 0;
	htmtxt = [];
	var levelth = uploadtxtarr[2].split('=')[1];
	var leveldatapos = uploadtxtarr.indexOf('data=');
	for (let i = leveldatapos+1; i < uploadtxtarr.length; i++) {
		var horiz = uploadtxtarr[i].replace('\r','').replace('\n','').split(',');
		horiz = horiz.filter((a) => a);
		if (horiz.length >= 5) {
			const template = '<c-tile class="{#}"></c-tile>';
			htmtxt.push(template.replace('{#}', horiz[0])+template.replace('{#}', horiz[1])+template.replace('{#}', horiz[2])+template.replace('{#}', horiz[3])+template.replace('{#}', horiz[4]));
			leveldetectlength++;
		}
	}
	
	canvas.innerHTML = htmtxt.join('');
	window.scrollTo(0, document.body.scrollHeight);
	document.getElementById('startmenu').style.display = 'none';
	document.getElementById('level').style.visibility = 'visible';
	console.log(leveldetectlength);
}

var startmenuhtm = document.getElementById('startmenu').innerHTML;
//var prevlevel = '';

function back() {
	prevlevel = canvas.innerHTML;
	canvas.innerHTML = '';
	window.scrollTo(0, 0);
	document.getElementById('startmenu').style.display = 'block';
	document.getElementById('level').style.visibility = 'hidden';
	//setprevlevel(prevlevel);
}

/*function loadprevlevel() {
	getprevlevelauto();
	window.scrollTo(0, document.body.scrollHeight);
	document.getElementById('startmenu').remove();
}

function setprevlevel(val) {
    document.cookie = "level="+val;
}

function getprevlevelauto() {
	var lvc = getprevlevel("level");
	if (lvc != null)
		canvas.innerHTML = lvc;
	else {
		alert('You do not have a previous level stored.');
	}
}
function getprevlevel(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}*/

var exportmenu = document.getElementById('exportmenu');
var levelnamein = document.getElementById('levelname');

function openexport() {
	canvas.style.display = 'none';
	exportmenu.style.display = 'block';
	window.scrollTo(0, 0);
}

function closeexport() {
	canvas.style.display = 'flex';
	exportmenu.style.display = 'none';
	window.scrollTo(0, document.body.scrollHeight);
}

function exportlevel() {
	download(levelnamein.value+".txt",generate());
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}