// operaMain.js
//
// Part of the KaraFood.io food app for Karazhan.
// Written by TiggerOni
// For the Jenafur project for the Wow Secrets Discord.
// All rights reserved.

var canvas;
var canvasContext;
var mouseX, mouseY;
var clickedShape = null;	

var bgImg;
var symbolImg;
var iconImg;

var framesPerSecond = 30;


const operaXOffset = 800;
const operaYOffset = 20;



// Options:

var showingMap = true;		// Not used for this app.
var showMapLegend = false;

// doing it this way to avoid refactoring all the codes.
var showingCredits = false;
var showingHelp = true;
var snapToGrid = true;
var recallAllFoods = false;
var placeExistingFoods = true;
var showSketch = true;

var showGrid = false;


// For drag and drop foods on the board
var grabbedItem = null;

const SHOWING_ICONS = 0;
const SHOW_FLOOR_SKETCH = 1;
const SNAP_TO_GRID = 2;
const SHOWING_GRID = 3;
const PLACE_EXISTING_FOODS = 4;
const RECALL_ALL_FOODS = 5;
const SHOWING_HELP = 6;
const SHOWING_CREDITS = 7;

var optionList = [
	{ text:"Show Icons/Shapes", value: true, default: true },
	{ text:"Show Sketch/Image", value: true, default: true },
	{ text:"Snap to Grid", value: true, default: true },
	{ text:"Show Grid", value: false, default: false },
	{ text:"Place Existing", value: false, default: false },
	{ text:"Recall all foods", value: false, default: false },
	{ text:"Show Help", value: true, default: false },
	{ text:"Show Credits", value: false, default: false },
];

function updateOptions() {
	showIcons = optionList[SHOWING_ICONS].value;
	
	showSketch = optionList[SHOW_FLOOR_SKETCH].value;
	
	showingCredits = optionList[SHOWING_CREDITS].value;
	showingHelp = optionList[SHOWING_HELP].value;
	
	snapToGrid = optionList[SNAP_TO_GRID].value;
	showGrid = optionList[SHOWING_GRID].value;
		
	
	if (!placeExistingFoods && optionList[PLACE_EXISTING_FOODS].value) {
		placeFloorFoods();
	}	
	placeExistingFoods = optionList[PLACE_EXISTING_FOODS].value;
	
	if (!recallAllFoods && optionList[RECALL_ALL_FOODS].value) {
		recallingAllFoods();
	}
	recallAllFoods = optionList[RECALL_ALL_FOODS].value;
}


function turnOffPlaceButton() {
	if (placeExistingFoods) {
		optionList[PLACE_EXISTING_FOODS].value = false;
		updateOptions();
	}
}

function turnOffRecallButton() {
	if (recallAllFoods) {
		optionList[RECALL_ALL_FOODS].value = false;
		updateOptions();

	}
}


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
		recallingAllFoods();
		resetOptions();
		updateOptions();
	} else if (evt.keyCode == 32 || evt.keyCode == 76) {	// space or l
		makeLine();
	} else if (evt.keyCode == 83) {		// s 
		swapSelectedItems();		
	} 
	else if (evt.keyCode == 80) { 	// p 
		placeFloorFoods();	
	}	
	else if (evt.keyCode == 71) { 	// g
		showGrid = !showGrid;
		optionList[SHOWING_GRID].value = showGrid;	
	}	
	else {
		// console.log ('keypress : ' + evt.keyCode + ' detected');
	}
}

	
function getFoodUI(mx, my) {
	var x = legendFoodX;
	var y = legendFoodY;


	for (var i=0; i<shapes.length; i++) {
		if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {
			return i;
		}
		y += legendItemHeight;
	}
	

	return null;
}


// todo: 
function testFoodUI(mx, my, shiftKey){
    var food = getFoodUI(mx, my)
	// food can === 0 here, so we must explicitly check for null
	if (food !== null) {
		recallFoods(food);
        return true;
	}
	return false;
}


function testUIClick(mx, my, shiftKey) {

	if (testFoodUI(mx, my, shiftKey)
            || testOptionsUI(mx, my)) {
		return true;
	}

	return false;
}



function cursorOnClickableElement(x, y) {
    return getFoodUI(x, y) != null
        || getOptionsUI(x, y) != null;        
}

function cursorOnGrabbableElement(x,y) {
	return getItem(x,y) != null;
}



const DEFAULT = 0;
const POINTER = 1;
const HAND = 2;
const GRAB = 3;

function changeCursor(type) {
	var cursor;
	
	switch (type) {
		case POINTER:
			cursor = "pointer";
			break;
		case HAND:
			cursor = "grab";
			break;
		case GRAB:
			cursor = "grabbing";
			break;
		default:
			cursor = "default";
			break;
	}	
	
    canvas.style.cursor = cursor;
}

function moveMouse(evt) {		
	// We update the mouseXY here because key presses don't track cursor/mouse 
	// location and sometimes we want to know where the mouse is.
	mouseX	=	evt.pageX / appScale;
	mouseY	=	evt.pageY / appScale;	
	
	if (grabbedItem) {
		updateGrab(mouseX, mouseY);
	} else {
		// Change cursor when hovering over clickable elements
		if(cursorOnClickableElement(mouseX, mouseY)) {
			changeCursor(POINTER);
		} else if (cursorOnGrabbableElement(mouseX, mouseY)) {
			changeCursor(HAND);			
		} else {
			changeCursor(DEFAULT);
		}
	}
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
		if (tryItemClick(mouseX, mouseY, evt.shiftKey)) {
			changeCursor(GRAB);
		}
	}
}


var bgLoaded = false;
var symbolsLoaded = false;
var iconsLoaded = false;

var sketchLoaded = false;
var screenLoaded = false;


var operaSketchImg;
var operaScreenImg;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');	
	canvasContext = canvas.getContext('2d');
	
	addEventListener('resize', resizeCanvas, false);
	// Draw canvas border for the first time.
	// initKaraData ();
	initOperaData();
	setOptions(optionList);
	//loadMaps(true);
	resizeCanvas();
	
   
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
		symbolsLoaded = true;
		console.log("Symbols loaded...");
		loaded();
	};
	
	iconImg = new Image();
	iconImg.src = '../common/iconSheet.png';
	iconImg.style.backgroundColor = 'transparent'; 

	iconImg.onload = function() {
		iconsLoaded = true;
		console.log("Icons loaded...");
		loaded();
	};

	operaSketchImg = new Image();
	operaSketchImg.src = 'opera-sketch.jpg';
	operaSketchImg.style.backgroundColor = 'transparent'; 

	operaSketchImg.onload = function() {
		sketchLoaded = true;
		console.log("Sketch loaded...");
		loaded();
	};
	
	operaScreenImg = new Image();
	operaScreenImg.src = 'opera-fine.jpg';
	operaScreenImg.style.backgroundColor = 'transparent'; 

	operaScreenImg.onload = function() {
		screenLoaded = true;
		console.log("Screen loaded...");
		loaded();
	};	
}

function loaded () {
	if ( symbolsLoaded && iconsLoaded && screenLoaded && sketchLoaded) {
		setInterval(function() {
			drawEverything(); 
		}, 1000/framesPerSecond);
	}
}


// Rework this for new data formats for opera
function initOperaData () {

	// Move the tips panel down.	
	setTipsOffset (tipsX, 800);
	showTips = false;
	
	legendOptionsY = 700;

	
	items = [];
	items = OperaItems;
	shapes = [];
	shapes = OperaShapes;

	makeFoodItems();
	
	initGrid(25, 24, operaXOffset+19, operaYOffset+17, 40.1, 40.2);
	
	console.log("opera data initialized");
}


function resizeCanvas() {
		
	resetCanvas();
}

function resetCanvas() {		
	appWidth = 1800; 
	appHeight = 1100;
	appRatio = (appWidth/appHeight);

	canvas.height = window.innerHeight;
	canvas.width = canvas.height * appRatio;
//	canvas.width = window.innerWidth;
	
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

	if (showIcons && iconImg) {
		canvasContext.drawImage(iconImg, 0, shapeHeight*id, shapeWidth, shapeHeight, 		
			x - shapeOffset, y-shapeOffset, shapeSize, shapeSize);		
	} else {
		canvasContext.drawImage(symbolImg, 0, shapeHeight*id, shapeWidth, shapeHeight, 		
			x - shapeOffset, y-shapeOffset, shapeSize, shapeSize);		
	}
}


function drawOperaFloor () {

	if (showSketch) {
		canvasContext.drawImage(operaSketchImg, operaXOffset+15, operaYOffset+13);
	} else {
		canvasContext.drawImage(operaScreenImg, operaXOffset+16, operaYOffset+25);
	}		
	
	if (showGrid) {
		drawGrid();		
	}
}

	
function drawEverything() {		
	
	const bgWidth = 1600;	// Could (should) probably pull this from the image.
	
	if (bgLoaded) {		
		var delta = appWidth - bgWidth;
		
		 if (delta > 0) {
			var halfWidth = appWidth >> 1;
			canvasContext.drawImage(bgImg, 0, 0, halfWidth+delta, 1100, 0, 0, halfWidth+delta, 1100);
			canvasContext.drawImage(bgImg, halfWidth, 0, halfWidth, 1100, halfWidth+delta, 0, halfWidth, 1100);
		 }
		 else {
			canvasContext.drawImage(bgImg, 0, 0);
		 }
		
	}
	
	if (!symbolImg || !iconImg) {
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
		drawOperaFloor();
		drawFloorItems();
	}		
}
