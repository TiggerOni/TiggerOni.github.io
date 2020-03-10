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

var showFoodLegend = true;
var showOptionsLegend = true;
var showMapLegend = false;


var showingMap = true;
var showingHelp = true;
var showingCredits = false;
var showInactiveItems = false;

const SHOWING_MAP = 0;
const ALLOW_INACTIVE_SWAPS = 1;
const SHOW_INACTIVE_ITEMS = 2;
const SHOWING_HELP = 3;
const SHOWING_CREDITS = 4;

var optionList = [
	{ text:"Show Map", value: true, default: true },
	{ text:"Allow Inactive Swaps", value: false, default: false},
	{ text:"Show Inactive Items", value: false, default: false },
	{ text:"Show Help", value: true, default: false },
	{ text:"Show Credits", value: false, default: false },
];

function updateOptions() {
	showingCredits = optionList[SHOWING_CREDITS].value;
	showingHelp = optionList[SHOWING_HELP].value;
	showingMap = optionList[SHOWING_MAP].value;
	showInactiveItems = optionList[SHOW_INACTIVE_ITEMS].value;
	allowInactiveSwaps = optionList[ALLOW_INACTIVE_SWAPS].value;
}


var bgImg;
var symbolImg;

var boardWidth, boardHeight;
					

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
	
	if (optionList[SHOWING_CREDITS].value) {
		optionList[SHOWING_CREDITS].value = false;
		updateOptions();
		evt.stopPropagation();
		return;
	}
	
	if (optionList[SHOWING_HELP].value) {
		optionList[SHOWING_HELP].value = false;
		updateOptions();
		evt.stopPropagation();
		return;
	}
	
	if (evt.keyCode == 82) {	// r
		resetShapes();
		resetOptions();
		updateOptions();
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
		
		

function testUIClick(mx, my, shiftKey) {
	
	if (testFoodUI(mx, my, shiftKey)) {
		return true;
	} else if (testOptionsUI(mx, my, shiftKey)) {
		updateOptions();
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
		optionList[SHOWING_CREDITS].value = false;
		return;
	}
	
	if (showingHelp) {
		showingHelp = false;
		optionList[SHOWING_HELP].value = false;
		return;
	}

	if (testUIClick(mouseX, mouseY, evt.shiftKey)) {
		updateOptions();
	} else {
		testItemClick(mouseX, mouseY, evt.shiftKey);	
	}
	
}



window.onload = function() {
	canvas = document.getElementById('gameCanvas');	
	canvasContext = canvas.getContext('2d');
	
	addEventListener('resize', resizeCanvas, false);
	
	// Set the shape logic to auto draw lines and detect crossed lines.
	leyLineMode = true;
	
	// Overriding the default shape toggle
	KaraShapes[CRYSTALS].defaultActive = false;
	KaraShapes[KIBBLES].defaultActive = false;
	
	// Draw canvas border for the first time.
	initKaraData ();	
	setOptions(optionList);
	loadMaps(false);
	resizeCanvas();
	resetShapes();
   
   
   // need to build the board.  Get the x ranges and y ranges and add 10%, then center the board to the right of the toc.
   // need to make an enable shapes + legend list.  With check boxes.
   // Then track the moves made and publish them.
   
	addEventListeners();		
	
	bgImg = new Image();
	bgImg.src = '../common/background.png';
	bgImg.onload = function () {
		bgLoaded = true;
		console.log("Background loaded...");
	};
	
			
	symbolImg = new Image();
	symbolImg.src = '../common/symbolSheet.png';
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
//	canvas.width = 2548;
//	canvas.height = 1752;

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

	

function drawLegend() {
	drawFoodLegend();
	drawOptionsLegend();
}


function drawEverything() {		
	
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
	
	
	if (bgImg) {		
		canvasContext.drawImage(bgImg, 0, 0);			
	}

	if (showingMap) {
		drawMap();
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
		
			drawItems();
		}		
	}

}
