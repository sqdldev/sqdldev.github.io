console.log('== Hey... Whats up? ==')
var rgbCopy
window.onclick = e => {
    rgbCopy = e.target.style.backgroundColor;
	if (rgbCopy != '') {
		console.log(rgbCopy);
		navigator.clipboard.writeText(rgbCopy)
	}
}