// mapMaker.js
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

//	const legendFont = "24px Verdana Bold";
//	const legendFont = "20px Times Roman";
const legendFont = "20px Friz Quadrata";

const legendFoodX = 60;
const legendFoodY = 50;

const legendOptionsX = 60;
const legendOptionsY = 800;
const optionsOffset = 1.0;
	

const legendMapX = 375;
const legendMapY = 650;
const mapUIOffset = 1.0;

const legendItemHeight = 30;
const legendItemWidth = 275;

const tipsX = 375;
const tipsY = 450;

var showFoodLegend = true;
var showOptionsLegend = true;
var showMapLegend = true;


// Options:

var showingMap = true;		// Not used.


var attachFoodToLayers = true;
var showInactiveLayers = true;
var showInactiveItems = false;


var showingHelp = true;
var showingCredits = false;


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
	} else if (evt.keyCode == 83) {		// s 
		swapSelectedItems();		
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

	
	
function testFoodUI(mx, my, shiftKey) {
	
	var y = legendFoodY;
	var x = legendFoodX;
	
		
	for (var i=0; i<shapes.length; i++) {
		if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {
		
			if (shiftKey) {
				moveShapeToFront(i);
			} else {
				toggleShape(i);
			}
			updateShapes();

			return true;
		}
				
		
		y += legendItemHeight;
	}
	
	return false;
}

function testMapUI(mx, my, shiftKey) {
		
	var x = legendMapX;
	var y = legendMapY;
	
	for (var i=0; i<maps.length; i++) {
		if (mx >= x && mx <= x + legendItemWidth && my >= y  && my <= y + legendItemHeight) {
			maps[i].visible = !maps[i].visible;
			return true;
		}
		y += legendItemHeight * mapUIOffset;
	}
	
	return false;
}
	
function testOptionsUI (mx, my, shiftKey) {
	
	var x = legendOptionsX;
	var y = legendOptionsY;
	
	if (mx >= x && mx <= x + legendItemWidth && my >= y  && my <= y + legendItemHeight) {		
		attachFoodToLayers = !attachFoodToLayers;
		return true;
	}		

	y += legendItemHeight * optionsOffset;
	if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {		
		showInactiveLayers = !showInactiveLayers;
		return true;
	}		
	
	y += legendItemHeight * optionsOffset;
	if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {		
		showInactiveItems = !showInactiveItems;
		return true;
	}		
	
	y += legendItemHeight * optionsOffset;
	if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {		
		showingHelp = !showingHelp;
		return true;
	}		
	
	y += legendItemHeight * optionsOffset;
	if (mx >= x && mx <= x  + legendItemWidth && my >= y && my <= y + legendItemHeight) {		
		showingCredits = !showingCredits;
		return true;
	}
	
	return false;
}	


function testUIClick(mx, my, shiftKey) {
	
	if (testFoodUI(mx, my, shiftKey)	
			|| testOptionsUI(mx, my, shiftKey)	
			|| testMapUI(mx, my, shiftKey)) {
		return true;
	}
	
	return false;
}

	
function moveMouse(evt) {		
	// We update the mouseXY here because key presses don't track cursor/mouse 
	// location and sometimes we want to know where the mouse is.
	mouseX	=	evt.pageX;
	mouseY	=	evt.pageY;
}



// Iterate through the shapes and see if we clicked on one.  If we did, start the move.
function clickMouse(evt) {
	mouseX	=	evt.pageX / appScale;
	mouseY	=	evt.pageY / appScale;
	
	if (showingCredits) {
		showingCredits = false;
		return;
	}
	
	if (showingHelp) {
		showingHelp = false;
		return;
	}

	if (!testUIClick(mouseX, mouseY, evt.shiftKey)) {
		testItemClick(mouseX, mouseY, evt.shiftKey);
	}	
}


var bgLoaded = false;

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

	loadMaps();
	
	bgImg = new Image();
	bgImg.src = 'background.png';
	bgImg.onload = function () {
		bgLoaded = true;
		console.log("Background loaded...");
	};
		
	symbolImg = new Image();
	symbolImg.src = 'symbolSheet.png';
	symbolImg.style.backgroundColor = 'transparent'; 
	
	symbolImg.onload = function() {			
		console.log("Symbols loaded...");
		setInterval(function() {
			drawEverything(); 
		}, 1000/framesPerSecond);
	};

}


function resizeCanvas() {
		
	resetCanvas();
}

function resetCanvas() {		
	canvas.height = window.innerHeight;
	canvas.width = canvas.height * appRatio;
	
	appScale = canvas.height / appHeight;

	canvasContext.scale (appScale, appScale);
	
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

	

function drawFoodLegend() {
	var spriteScale = 0.75;
	var spriteOffset = shapeWidth * spriteScale / 2;
	
	canvasContext.fillStyle = 'black';
	
	var x = legendFoodX;
	var y = legendFoodY;
	
	canvasContext.font = legendFont;
	
	canvasContext.fillStyle = "white";
	canvasContext.textAlign = "left";
	canvasContext.textBaseline = 'middle';
		
	for (var i=0; i<shapes.length; i++) {
		if (shapes[i].active) {
			
			highlight(legendFoodX, y, legendItemWidth, legendItemHeight);
		}
		
		drawSprite (i, spriteScale, legendFoodX + spriteOffset , y + spriteOffset);
		
		canvasContext.fillText(ItemNames[shapes[i].desc], x + (spriteOffset *3) , y + legendItemHeight/2);
				
		y += legendItemHeight;
	}	
}

function highlight(x, y, w, h) {
	
	canvasContext.fillStyle = "gray";	
	canvasContext.fillRect(x, y, w, h);
	
	canvasContext.beginPath();
	canvasContext.strokeStyle = "white";
	canvasContext.lineWidth = 1;
	canvasContext.rect(x, y, w, h);
	canvasContext.stroke();

	canvasContext.fillStyle = "white";		
}

function drawOptionsLegend() {

	var x = legendOptionsX;
	var y = legendOptionsY;
	var textXOffset = shapeWidth / 2;
	var textYOffset = legendItemHeight/2;

	canvasContext.font = legendFont;
	canvasContext.textBaseline = 'middle';
		
	if (attachFoodToLayers) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Attach Food to Layers", x + textXOffset, y + textYOffset);
			
	y += legendItemHeight * optionsOffset;
	
	if (showInactiveLayers) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Show Inactive Layers", x + textXOffset, y + textYOffset);
			
	y += legendItemHeight* optionsOffset;
	
	
	if (showInactiveItems) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Show Inactive Foods", x + textXOffset, y + textYOffset);		// If you can see it, you can click it.
			
	y += legendItemHeight* optionsOffset;

	if (showingHelp) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Show Help", x + textXOffset, y + textYOffset);
			
			
	y += legendItemHeight* optionsOffset;

	if (showingCredits) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Show Credits", x + textXOffset, y + textYOffset);
	
	y += legendItemHeight* optionsOffset;

}

function drawMapLegend() {
	
	var x = legendMapX;
	var y = legendMapY;
	
	var textXOffset = shapeWidth / 2;
	var textYOffset = legendItemHeight/2;

	canvasContext.font = legendFont;
	canvasContext.textBaseline = 'middle';
	
	for (var i=0; i<maps.length; i++) {

		if (maps[i].visible) {
			highlight(x, y, legendItemWidth, legendItemHeight);
		}
		
		canvasContext.fillText(maps[i].name, x + textXOffset, y + textYOffset);
		
		y += legendItemHeight;
	}
}


function showTextPanel ( text ) {
	
	var panelX = 100;
	var panelY = 100;
	var panelWidth = 1400;
	var panelHeight = 900;
	
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


function drawTips() {
	canvasContext.font = legendFont;
	canvasContext.fillStyle = "white";
	canvasContext.textAlign = "left";
	var x = tipsX;
	var y = tipsY;
	
	for (var i=0; i<tipsText.length; i++, y+=legendItemHeight) {
		canvasContext.fillText(tipsText[i], x, y);
	}
}

function drawLegend() {
	drawFoodLegend();
	drawMapLegend();
	drawOptionsLegend();
	drawTips();
}

function drawEverything() {		
	
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
	
	
	if (bgLoaded) {		
		canvasContext.drawImage(bgImg, 0, 0);
	}
	

	if (!symbolImg) {
		return;
	}

	drawLegend();
	
	if (showingHelp) {
		showTextPanel(helpText);
	}
	else if (showingCredits) {
		showTextPanel(creditText);
	} 
	else {

		updateItems();		
		drawMap();
		// drawShapes();		// For now we're drawing all the shapes over the maps.
		drawItems();
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
