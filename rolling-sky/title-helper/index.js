function generate() {
	var target = document.getElementById('target');
	var ttext = target.value.split('\n');
	var alltxt = [];

	for (let i = 0; i < ttext.length; i++) {
	const byteArray = [parseInt(ttext[i].length+2)];

	const bytesString = String.fromCharCode(...byteArray);

	var a = bytesString+ttext[i];
	var b = a.replace('\r','{CR}').replace('\n','{LF}');

	alltxt.push(b);
	}

	var a = alltxt.join("\n");
	target.value = a;
}