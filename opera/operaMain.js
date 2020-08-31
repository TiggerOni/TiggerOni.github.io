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



// Options:

var showingMap = true;		// Not used for this app.
var showMapLegend = false;

// doing it this way to avoid refactoring all the codes.
var showingCredits = false;
var showingHelp = true;
var snapToGrid = true;
var recallAllFoods = false;
var placeExistingFoods = true;

const ART_FLOOR = 0;
const ART_SKETCH = 1;
const ART_GRAPH = 2;
const ART_NONE = 3;

var showArt = ART_FLOOR;

var showSketch = true;
var showGraphPaper = false;

var showGrid = false;
var showGridDots = false;

var showKibbles = true;


// For drag and drop foods on the board
var grabbedItem = null;

const SHOWING_ICONS = 0;
const SNAP_TO_GRID = 1;
const SHOWING_GRID = 2;
const SHOWING_GRID_DOTS = 3;
const SHOWING_KIBBLES = 4;
const PLACE_EXISTING_FOODS = 5;
const RECALL_ALL_FOODS = 6;
const SHOWING_HELP = 7;
const SHOWING_CREDITS = 8;

var optionList = [
	{ text:"Show Icons/Shapes", value: true, default: true },
	{ text:"Snap to Grid", value: true, default: true },
	{ text:"Show Grid", value: true, default: true },
	{ text:"Show Grid Dots", value: false, default: false },
	{ text:"Show Kibbles", value: true, default: true },
	{ text:"Place Existing", value: false, default: false },
	{ text:"Recall all foods", value: false, default: false },
	{ text:"Show Help", value: true, default: false },
	{ text:"Show Credits", value: false, default: false },
];

function updateOptions() {
	showIcons = optionList[SHOWING_ICONS].value;
		
	showingCredits = optionList[SHOWING_CREDITS].value;
	showingHelp = optionList[SHOWING_HELP].value;
	
	snapToGrid = optionList[SNAP_TO_GRID].value;
	showGrid = optionList[SHOWING_GRID].value;
	showGridDots = optionList[SHOWING_GRID_DOTS].value;
		
	showKibbles = optionList[SHOWING_KIBBLES].value;
	
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
            || testOptionsUI(mx, my) 
			|| testActions(mx, my)) {
		return true;
	}

	return false;
}



function cursorOnClickableElement(x, y) {
    return getFoodUI(x, y) != null
        || getOptionsUI(x, y) != null
		|| getActions(x, y) != null
		|| checkGridToggle(x, y, true);        
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
	} else if (checkGridToggle(mouseX, mouseY, false)) {
		// no need to do anything here...
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
var operaGridPaperImg;

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
	operaSketchImg.src = 'art/opera-sketch.jpg';
	operaSketchImg.style.backgroundColor = 'transparent'; 

	operaSketchImg.onload = function() {
		sketchLoaded = true;
		console.log("Sketch loaded...");
		loaded();
	};
	
	operaScreenImg = new Image();
	operaScreenImg.src = 'art/opera-fine.jpg';
	operaScreenImg.style.backgroundColor = 'transparent'; 

	operaScreenImg.onload = function() {
		screenLoaded = true;
		console.log("Screen loaded...");
		loaded();
	};	
	
	operaGridPaperImg = new Image();
	operaGridPaperImg.src = 'art/gridPaperSm.jpg';
	operaGridPaperImg.style.backgroundColor = 'white'; 

	operaGridPaperImg.onload = function() {
		screenLoaded = true;
		console.log("Grid Paper loaded...");
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
	
	initGrid(25, 25, operaXOffset+19, operaYOffset+17, 40.1, 40.2);
	
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
	
	appScale = canvas.height / appHeight;

	canvasContext.scale (appScale, appScale);
	
	normalize();
	drawEverything();
}

function normalize() {
	// todo: resize or move everything to fit in the new client area.
}



var searchX = 375;
var searchY = 800;

// 	grid, map, sketch toggle + 
function drawActions() {

	var x = searchX;
	var y = searchY;
	var textXOffset = shapeWidth / 2;
	var textYOffset = legendItemHeight/2;
	var buttonSize = legendItemHeight;

	canvasContext.font = legendFont;
	canvasContext.textBaseline = 'middle';
	canvasContext.textAlign = 'left';


	if (showArt == 0) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	} else {
		border(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Show Opera Floor", x + textXOffset, y + textYOffset);
	y += legendItemHeight;

	if (showArt == 1) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	} else {
		border(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Show Opera Sketch", x + textXOffset, y + textYOffset);
	y += legendItemHeight;
	
	if (showArt == 2) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	} else {
		border(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Show Graph Paper", x + textXOffset, y + textYOffset);
	y += legendItemHeight;
	
	if (showArt == 3) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	} else {
		border(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Show Blank Area", x + textXOffset, y + textYOffset);
	y += legendItemHeight;
	
	
	canvasContext.textAlign = 'left';
}


function getActions(mx, my) {
    var x = searchX;
	var y = searchY;

	if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {
		return "Floor";
	}
	y += legendItemHeight;
	if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {
		return "Sketch";
	}
	y += legendItemHeight;
	if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {
		return "GraphPaper";
	}
	y += legendItemHeight;
	if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {
		return "Blank";
	}

	//y += legendItemHeight * 2;

	return null;
}


function testActions(mx, my) {
    var action = getActions(mx, my)
	if (action) {
        switch(action){
            case "Floor":
                showArt = ART_FLOOR;
                return true;
            case "Sketch":
                showArt = ART_SKETCH;
                return true;
            case "GraphPaper":
                showArt = ART_GRAPH;
                return true;
			case "Blank":
				showArt = ART_NONE;
				break;
        }
	}
	return false;
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

	if (showArt == ART_GRAPH) {
		canvasContext.drawImage(operaGridPaperImg, operaXOffset+16, operaYOffset+13);
	} else if (showArt == ART_SKETCH) {
		canvasContext.drawImage(operaSketchImg, operaXOffset+13, operaYOffset+13);
	} else if (showArt == ART_FLOOR) {
		canvasContext.drawImage(operaScreenImg, operaXOffset+18, operaYOffset+20);
	}		
		
	drawGrid(showGrid, showGridDots);		
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
	drawActions();
	
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
		
		if (showKibbles)
			drawKibbles();
	}		
}
