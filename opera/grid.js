// grid.js

/*
	
	{ x:840+4, y:372+4, layer:GUEST },

*/

var gridX = 0, gridY = 0;
var gridRowSize = 25;
var gridColSize = 25;
var gridCols = 25;
var gridRows = 25;

var halfRowSize = gridRowSize/2;
var halfColSize = gridColSize/2;

// Columns * rows = grid dimensions
// x & y = where to draw manage
// gridSize = size of each cell in pixels

function initGrid (cols, rows, x, y, colSize, rowSize) {
	gridCols = cols;
	gridRows = rows;
	gridX = x;
	gridY = y;
	gridColSize = colSize;
	gridRowSize = rowSize;
	halfRowSize = rowSize/2;
	halfColSize = colSize/2;
}

function getNearestGridPoint(mx, my) {
	mx -= gridX;
	my -= gridY;
	
	if (mx < -halfColSize || mx > (gridCols * gridColSize) + halfColSize 
		|| my < -halfRowSize || my > (gridRows * gridRowSize) + halfRowSize) {
			
		return [-1, -1];
	}
	
	var col = Math.round(mx / gridColSize);	
	var row = Math.round(my / gridRowSize);
	
	return [gridX + (col*gridColSize), gridY + (row*gridRowSize)];
}

function drawGrid () {
	canvasContext.fillStyle = lineColors[RGB_ERROR];
	canvasContext.strokeStyle = lineColors[RGB_ERROR];

	for (var row=0; row <= gridRows; row++) {
		for (var col=0; col <= gridCols; col++) {
			var x = gridX + (col * gridColSize) - 2;
			var y = gridY + (row * gridRowSize) - 2;
			canvasContext.fillRect(x, y, 4, 4);
		}
	}	
	
}