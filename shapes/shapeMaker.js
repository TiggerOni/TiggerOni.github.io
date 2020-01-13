// leylines.js
//
// Part of the KaraFood.io food app for Karazhan.
// Written by TiggerOni
// For the Jenafur project for the Wow Secrets Discord.
// All rights reserved.

var canvas;
var canvasContext;
var mouseX, mouseY;
var clickedShape = null;	

var framesPerSecond = 30;

const legendX = 75;
const legendY = 50;
const legendItemHeight = 50;

const optionsOffset = 1.25;

var showingMap = true;
var showingHelp = true;
var showingCredits = false;
var hideInactiveItems = false;

var bgImg;
var symbolImg;


function addEventListeners() {
	canvas.addEventListener('mousedown', clickMouse );		
	canvas.addEventListener('mousemove', moveMouse);
	document.addEventListener('keydown', keyPressed );
}

function keyPressed(evt) {
	if (evt.clientX < 0 || evt.clientX >= canvas.width || evt.clientY < 0 || evt.clientY >= canvas.height) {
		console.log('keypress out of bounds');
		return;
	}
	var active;
	
	if (showingCredits) {
		showingCredits = false;
		evt.stopPropagation();
		return;
	}
	
	if (showingHelp) {
		showingHelp = false;
		evt.stopPropagation();
		return;
	}
	
	if (evt.keyCode == 82) {	// r
		resetShapes();
	} else if (evt.keyCode == 32 || evt.keyCode == 76) {	// space or l
		makeLine();
	} else if (evt.keyCode == 77) { 	// m
		
		active = !shapes[SLATHERED_RIB].active;
		
		setShapeActive( SLATHERED_RIB, active );
		setShapeActive( MEATY_MORSEL, active );
		setShapeActive( MARBLED_STEAK, active );
		setShapeActive( JUICY_DRUMSTICK, active );
		setShapeActive( FISHY_BITS, active );
		
		updateShapes();
	} else if (evt.keyCode == 70) { 	// f
		active = !shapes[OLD_APPLE].active;
		
		setShapeActive( OLD_APPLE, active );
		setShapeActive( ORANGE_ORANGE, active );
		setShapeActive( LOST_WATERMELON, active );
		setShapeActive( HIDDEN_BANANA, active );
		setShapeActive( BUNCH_BERRIES, active );
		
		updateShapes();
	} else if (evt.keyCode == 68) { 	// d for drinks
		active = !shapes[WILDERBEW_SPECIAL].active;
		
		setShapeActive( WILDERBEW_SPECIAL, active );
		setShapeActive( STRONGARM_STOUT, active );
		setShapeActive( KARAWEIZEN, active );
		setShapeActive( HOPPY_MEAD, active );
		setShapeActive( GHOSTLY_ALE, active );
		
		updateShapes();
	} else if (evt.keyCode == 66) { 	// b for breads
		active = !shapes[YEASTY_HUNK].active;
		
		setShapeActive( YEASTY_HUNK, active );
		setShapeActive( STALE_LOAF, active );
		setShapeActive( DUSTY_BUN, active );
		setShapeActive( CROSS_BUN, active );
		setShapeActive( BAGUETTE, active );
		
		updateShapes();
	}

	
	else {
		// console.log ('keypress : ' + evt.keyCode + ' detected');
	}
}

function testUIClick(mx, my, shiftKey) {
	var y = legendY;
	var x = legendX + shapeWidth * 2;
		
	for (var i=0; i<shapes.length; i++) {
		if (mx >= legendX - shapeWidth && mx <= legendX - shapeWidth + 400
			&& my >= y - (legendItemHeight>>1) && my <= y - (legendItemHeight>>1) + legendItemHeight) {
		
			if (shiftKey) {
				moveShapeToFront(i);
			} else {
				toggleShape(i);
			}
			updateShapes();

			return;
		}
				
		
		y += legendItemHeight;
	}
		
	y += legendItemHeight * optionsOffset;
	
	if (mx >= legendX - shapeWidth && mx <= legendX - shapeWidth + 400
			&& my >= y  && my <= y + legendItemHeight) {		
		showingMap = !showingMap;
		return;
	}		

	y += legendItemHeight * optionsOffset;
	if (mx >= legendX - shapeWidth && mx <= legendX - shapeWidth + 400
			&& my >= y && my <= y + legendItemHeight) {		
		hideInactiveItems = !hideInactiveItems;
		return;
	}		
	
	y += legendItemHeight * optionsOffset;
	if (mx >= legendX - shapeWidth && mx <= legendX - shapeWidth + 400
			&& my >= y && my <= y + legendItemHeight) {		
		allowInactiveSwaps = !allowInactiveSwaps;
		return;
	}		
	
	y += legendItemHeight * optionsOffset;
	if (mx >= legendX - shapeWidth && mx <= legendX - shapeWidth + 400
			&& my >= y && my <= y + legendItemHeight) {		
		showingHelp = !showingHelp;
		return;
	}		
	
	y += legendItemHeight * optionsOffset;
	if (mx >= legendX - shapeWidth && mx <= legendX - shapeWidth + 400
			&& my >= y && my <= y + legendItemHeight) {		
		showingCredits = !showingCredits;
		return;
	}		
}	


	
function moveMouse(evt) {		
	// We update the mouseXY here because key presses don't track cursor/mouse 
	// location and sometimes we want to know where the mouse is.
	mouseX	=	evt.pageX;
	mouseY	=	evt.pageY;
}



// Iterate through the shapes and see if we clicked on one.  If we did, start the move.
function clickMouse(evt) {
	mouseX	=	evt.pageX;
	mouseY	=	evt.pageY;
	
	if (showingCredits) {
		showingCredits = false;
		return;
	}
	
	if (showingHelp) {
		showingHelp = false;
		return;
	}

	if (mouseX > 650) {
		testItemClick(mouseX, mouseY, evt.shiftKey);
	} else {
		testUIClick(mouseX, mouseY, evt.shiftKey);
	}
	
}



window.onload = function() {
	canvas = document.getElementById('gameCanvas');	
	canvasContext = canvas.getContext('2d');
	
	addEventListener('resize', resizeCanvas, false);
	// Draw canvas border for the first time.
	initKaraData ();
	resizeCanvas();
	resetShapes();
   
   
   // need to build the board.  Get the x ranges and y ranges and add 10%, then center the board to the right of the toc.
   // need to make an enable shapes + legend list.  With check boxes.
   // Then track the moves made and publish them.
   
	addEventListeners();		
	
	bgImg = new Image();
	bgImg.src = 'Kara-Map_bare.png';
	
			
	symbolImg = new Image();
	symbolImg.src = 'symbolSheet.png';
	symbolImg.style.backgroundColor = 'transparent'; 
	
	symbolImg.onload = function() {			
		setInterval(function() {
			drawEverything(); 
		}, 1000/framesPerSecond);
	};

}


function resizeCanvas() {
		
	resetCanvas();
}

function resetCanvas() {	
	// Hard coded to match the background image.  Correctly triggers scroll bars.
	canvas.width = 2548;
	canvas.height = 1752;

	normalize();
	drawEverything();
}

function normalize() {
	// todo: resize or move everything to fit in the new client area.
}


// base size is 36x36;
// id is the sprite offset
// x and y are the center.
function drawSprite (id, scale, x, y) {

	var shapeSize = shapeWidth * scale;
	var shapeOffset = shapeSize >> 1;

	canvasContext.drawImage(symbolImg, 0, shapeHeight*id, shapeWidth, shapeHeight, 		
			x - shapeOffset, y-shapeOffset, shapeSize, shapeSize);		
}

	

function drawLegend() {
	canvasContext.fillStyle = 'black';
	
	var y = legendY;
	var x = legendX + shapeWidth * 2;
	
	canvasContext.font = "30px Verdana Bold";
	canvasContext.fillStyle = "white";
	canvasContext.textAlign = "left";
	
	for (var i=0; i<shapes.length; i++) {
		if (shapes[i].active) {
			canvasContext.fillStyle = "gray";	
			canvasContext.fillRect(legendX - shapeWidth, y - (legendItemHeight>>1), 400, legendItemHeight);
			canvasContext.fillStyle = "white";	
		}
		
		drawSprite (i, 1.25, legendX, y);
		
		canvasContext.fillText(ItemNames[shapes[i].desc], x, y+(legendItemHeight*0.25));
		
		
		y += legendItemHeight;
	}	

	y += legendItemHeight * optionsOffset;


	var optionsY = y;
	x -= shapeWidth;		
	
	if (showingMap) {
		canvasContext.fillStyle = "gray";	
		canvasContext.fillRect(legendX - shapeWidth, y - (legendItemHeight>>1), 400, legendItemHeight);
		canvasContext.fillStyle = "white";	
	}
	canvasContext.fillText("Show Map", x, y+(legendItemHeight*0.25));
			
	y += legendItemHeight* optionsOffset;
	
	if (hideInactiveItems) {
		canvasContext.fillStyle = "gray";	
		canvasContext.fillRect(legendX - shapeWidth, y - (legendItemHeight>>1), 400, legendItemHeight);
		canvasContext.fillStyle = "white";	
	}
	canvasContext.fillText("Hide Inactive Items", x, y+(legendItemHeight*0.25));
			
	y += legendItemHeight* optionsOffset;
	
	
	if (allowInactiveSwaps) {
		canvasContext.fillStyle = "gray";	
		canvasContext.fillRect(legendX - shapeWidth, y - (legendItemHeight>>1), 400, legendItemHeight);
		canvasContext.fillStyle = "white";	
	}
	canvasContext.fillText("Allow Inactive Swaps", x, y+(legendItemHeight*0.25));
			
	y += legendItemHeight* optionsOffset;

	if (showingHelp) {
		canvasContext.fillStyle = "gray";	
		canvasContext.fillRect(legendX - shapeWidth, y - (legendItemHeight>>1), 400, legendItemHeight);
		canvasContext.fillStyle = "white";	
	}
	canvasContext.fillText("Show Help", x, y+(legendItemHeight*0.25));
			
			
	y += legendItemHeight* optionsOffset;

	if (showingCredits) {
		canvasContext.fillStyle = "gray";	
		canvasContext.fillRect(legendX - shapeWidth, y - (legendItemHeight>>1), 400, legendItemHeight);
		canvasContext.fillStyle = "white";	
	}
	canvasContext.fillText("Show Credits", x, y+(legendItemHeight*0.25));
	
	y += legendItemHeight* optionsOffset;

}


function showTextPanel ( text ) {
	
	var panelX = 600;
	var panelY = 100;
	var panelWidth = 1500;
	var panelHeight = 1000;
	
	canvasContext.fillStyle = "gray";	
	canvasContext.fillRect(panelX, panelY, panelWidth, panelHeight);

	canvasContext.font = "24px Verdana Bold";
	canvasContext.fillStyle = "white";
	canvasContext.textAlign = "left";
	
	var x = panelX + 40;
	var y = panelY + 80;
	
	for (var i=0; i<text.length; i++, y+=36) {
		canvasContext.fillText(text[i], x, y);
	}
	
	canvasContext.beginPath();
	canvasContext.lineWidth = "4";
	canvasContext.strokeStyle = "white";
	canvasContext.rect(panelX, panelY, panelWidth, panelHeight);
	canvasContext.stroke();
	
	canvasContext.lineWidth = "2";
	canvasContext.strokeStyle = "black";
	canvasContext.rect(panelX+1, panelY+1, panelWidth-2, panelHeight-2);
	canvasContext.stroke();	
}

function drawEverything() {		
	
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	
	
	if (bgImg && showingMap) {		
		canvasContext.drawImage(bgImg, 0, 0);			
	}

	if (symbolImg) {
		drawLegend();

		if (showingHelp) {
			showTextPanel(helpText);
		}
		else if (showingCredits) {
			showTextPanel(creditText);
		} 
		else {
	
			updateItems();
		
			drawShapes();
		}

		
// test code to verify the sprite sheet
	/*
		canvasContext.drawImage(symbolImg, 0, 0);
		var startX = 160;
		var startY = 120;
		var scale = 0.5;
		for (var i = 0; i <shapeCount; i++) {						
			drawSprite (i, scale + (i%5)*0.25, startX + ((i%5) * shapeWidth), startY + (( Math.floor(i/5)) * 1.5 * 50));				
		}
	*/
		
	}

}
