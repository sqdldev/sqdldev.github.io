const PaletteOrder = [
	[0, 'Solid', 1],
	[1, 'Four Colors', 4],
	[2, 'Six Colors', 6],
	[3, 'One Upper Gradient and Four Colors', 5],
	[4, 'One Upper Gradient and Five Colors', 6],
	[5, 'Six Colors with Added Dark', 7],
	[6, 'Six Colors with Added Light', 7],
	[7, 'Eight Colors', 8],
	[8, 'Three Colors', 3],
	[9, 'Full Gradient', 1],
	[10, 'Full Sideways Gradient', 1],
	[11, 'Two Gradients', 2],
	[12, 'Two Sideways Gradients', 2],
	[13, 'Sixteen Colors', 16],
];

const PaletteOrderList = [];

PaletteOrder.forEach((e) => {
	PaletteOrderList.push('   ' + e[0] + '. ' + e[1] + ' (' + e[2] + ')')
});