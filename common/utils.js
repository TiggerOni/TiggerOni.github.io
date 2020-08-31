/**
 * Changes the cursor between a pointer & default
 * @param {bool} pointer - If the cursor should be changed to a pointer
 */
function changeCursor(pointer) {
    var cursor = pointer ? "pointer" : "default";
    canvas.style.cursor = cursor;
}


function highlight(x, y, w, h, color) {

	if (color == undefined) {
		canvasContext.fillStyle = "gray";	
	}
	else {
		canvasContext.fillStyle = lineColors[color];
	}
	
	canvasContext.fillRect(x, y, w, h);
	
	canvasContext.beginPath();
	canvasContext.strokeStyle = "white";
	canvasContext.lineWidth = 1;
	canvasContext.rect(x, y, w, h);
	canvasContext.stroke();

	canvasContext.fillStyle = "white";		
}

function border(x, y, w, h) {
	
	canvasContext.beginPath();
	canvasContext.strokeStyle = "gray";
	canvasContext.lineWidth = 1;
	canvasContext.rect(x, y, w, h);
	canvasContext.stroke();
}
