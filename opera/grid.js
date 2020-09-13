// grid.js

/*
	
	{ x:840+4, y:372+4, layer:GUEST },

*/

var gridX = 0, gridY = 0;
var gridRowSize = 25;
var gridColSize = 25;
var gridCols = 25;
var gridRows = 25;

var gridWidth, gridHeight;

var halfRowSize = gridRowSize/2;
var halfColSize = gridColSize/2;

var horizontalLines = [];
var verticalLines = [];
var showingGridLines = true;


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
	
	gridWidth = (gridCols - 1) * gridColSize;
	gridHeight = (gridRows - 1) * gridRowSize;
	
	var arraySize = cols+1;	
	while (arraySize--) horizontalLines.push(0);
	
	arraySize = rows+1;
	while (arraySize--) verticalLines.push(0);
	
	
	// test data.  Remove before pushing
	
	horizontalLines[8] = 1;
	horizontalLines[18] = 1;
	verticalLines[4] = 1;
	//verticalLines[14] = 1;
	
}


var gridGadgetSize = 10;
var halfGadgetSize = gridGadgetSize/2;


function clearGridLines() {
	for (var i=0; i<gridCols; i++) {
		verticalLines[i] = 0;
	}
	
		
	for (var i=0; i<gridRows; i++) {
		horizontalLines[i] = 0;
	}	
}

function turnOnGridLine(x, y) {
	if (x >= 0 && x < gridCols) {		
		verticalLines[x] = 1;
	}
	if (y >= 0 && y < gridRows) {		
		horizontalLines[y] = 1;
	}
}

// used for toggling lines on the grid on and off.
function checkGridToggle(mx, my, testOnly) {	
	var x, y;
		
	y = gridY - gridGadgetSize - gridGadgetSize;

	if (my >= y && my < y + gridGadgetSize) {
		for (var i=0; i<gridCols; i++) {
			x = gridX + (i * gridColSize) - halfGadgetSize;
			
			if (mx >= x && mx <= x + gridGadgetSize) {
				if (!testOnly)
					verticalLines[i] = !verticalLines[i];
				return true;
			}		
		}
	}
		
	x = gridX - gridGadgetSize - gridGadgetSize;
		
	if (mx >= x && mx < x + gridGadgetSize) {
		for (var i=0; i<gridRows; i++) {
			y = gridY + (i * gridRowSize) -  halfGadgetSize;
			
			if (my >= y && my < y + gridGadgetSize) {
				if (!testOnly)
					horizontalLines[i] = !horizontalLines[i];
				return true;
			}
		}
	}
}

// used for drag and drop locations
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

function getLocationForGridPoint( gLoc ) {
	return { x: (gLoc.gx * gridColSize) + gridX, y: (gLoc.gy * gridRowSize) + gridY};
}

function drawGridLines() {
		
	canvasContext.lineWidth = 3;
	
	canvasContext.shadowOffsetX = 1;
	canvasContext.shadowOffsetY = 2;
	canvasContext.shadowBlur = 2;
	canvasContext.shadowColor = 'black';
	
		
	canvasContext.fillStyle = lineColors[RGB_PALE_BLUE];
	canvasContext.strokeStyle = lineColors[RGB_PALE_BLUE];
		
	for (var i=0; i<gridCols; i++) {
		if (verticalLines[i] != 0) {
				canvasContext.beginPath();
				
				var x = gridX + (i * gridColSize);
				var y = gridY;
				
				canvasContext.moveTo(x, y);
				
				y += gridHeight;
				
				canvasContext.lineTo(x, y);
				canvasContext.stroke();
			
		}
	}
	
	
	canvasContext.fillStyle = lineColors[RGB_PALE_PINK];
	canvasContext.strokeStyle = lineColors[RGB_PALE_PINK];
		
	for (var i=0; i<gridRows; i++) {
		if (horizontalLines[i] != 0) {
			
				canvasContext.beginPath();
				var x = gridX;
				var y = gridY + (i * gridRowSize);
				
				canvasContext.moveTo(x, y);
				
				x += gridWidth;
				
				canvasContext.lineTo(x, y);
				canvasContext.stroke();
			
		}
	}

	canvasContext.shadowOffsetX = 0;
	canvasContext.shadowOffsetY = 0;
	canvasContext.shadowBlur = 0;
	canvasContext.shadowColor = 'black';
	
}

function drawGridGadgets() {	

	for (var i=0; i<gridCols; i++) {
		var x = gridX + (i * gridColSize) - halfGadgetSize;
		var y = gridY - gridGadgetSize - gridGadgetSize;
		
		if (verticalLines[i] != 0) {
			highlight (x, y, gridGadgetSize, gridGadgetSize, RGB_PALE_BLUE);
		} else {
			border (x, y, gridGadgetSize, gridGadgetSize);
		}		
	}
		
		
	for (var i=0; i<gridRows; i++) {
		var x = gridX - gridGadgetSize - gridGadgetSize;
		var y = gridY + (i * gridRowSize) -  halfGadgetSize;
		
		if (horizontalLines[i] != 0) {			
			highlight (x, y, gridGadgetSize, gridGadgetSize, RGB_PALE_PINK);
		} else {
			border (x, y, gridGadgetSize, gridGadgetSize);
		}		
	}
}



function drawGrid (drawLines, drawPoints) {

	canvasContext.fillStyle = lineColors[RGB_ERROR];
	canvasContext.strokeStyle = lineColors[RGB_ERROR];

	if (drawPoints == true) {
		for (var row=0; row < gridRows; row++) {
			for (var col=0; col < gridCols; col++) {
				var x = gridX + (col * gridColSize) - 2;
				var y = gridY + (row * gridRowSize) - 2;
				canvasContext.fillRect(x, y, 4, 4);
			}
		}	
	}

	if (drawLines == true) {
		drawGridGadgets();	
		drawGridLines();
	}
	
}