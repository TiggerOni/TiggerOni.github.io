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

var bgImg;
var symbolImg;
var iconImg;

var framesPerSecond = 30;





// Options:

var showingMap = true;		// Not used for this app.



// doing it this way to avoid refactoring all the codes.
var showingCredits = false;
var showingHelp = true;
var attachFoodToLayers = true;
var showInactiveItems = false;
var showInactiveLayers = true;


const ATTACH_FOOD_TO_LAYERS = 0;
const SHOW_INACTIVE_LAYERS = 1;
const SHOW_INACTIVE_ITEMS = 2;
const SHOWING_HELP = 3;
const SHOWING_CREDITS = 4;
const SHOWING_ICONS = 5;

var optionList = [
	{ text:"Attach Food to Layers", value: true, default: true },
	{ text:"Show Inactive Layers", value: true, default: true },
	{ text:"Show Inactive Items", value: false, default: false },
	{ text:"Show Help", value: true, default: false },
	{ text:"Show Credits", value: false, default: false },
	{ text:"Show Icons/Shapes", value: true, default: true },
];

function updateOptions() {
	showingCredits = optionList[SHOWING_CREDITS].value;
	showingHelp = optionList[SHOWING_HELP].value;
	showInactiveItems = optionList[SHOW_INACTIVE_ITEMS].value;
	showInactiveLayers = optionList[SHOW_INACTIVE_LAYERS].value;
	attachFoodToLayers = optionList[ATTACH_FOOD_TO_LAYERS].value;
	showIcons = optionList[SHOWING_ICONS].value;
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
		resetShapes();
		resetOptions();
		updateOptions();
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



function testFoodUI(mx, my, shiftKey){
    var food = getFoodUI(mx, my)
	// food can === 0 here, so we must explicitly check for null
	if (food !== null) {
        if (shiftKey) {
            moveShapeToFront(food);
        }
        else {
            toggleShape(food);
        }
        updateShapes();
        return true;
	}
	return false;
}



function getMapUI(mx, my) {
	var x = legendMapX;
	var y = legendMapY;
	
	for (var i=0; i<maps.length; i++) {
		if (mx >= x && mx <= x + legendItemWidth && my >= y  && my <= y + legendItemHeight) {
		    return maps[i]
		}
		y += legendItemHeight * mapUIOffset;
	}
	
	return null;
}



function testMapUI(mx, my) {
    var map = getMapUI(mx, my)
	if (map) {
	    map.visible = !map.visible;
	    return true;
	}
	return false;
}



function testUIClick(mx, my, shiftKey) {

	if (testFoodUI(mx, my, shiftKey)
            || testOptionsUI(mx, my)
			|| testMapUI(mx, my)) {
		return true;
	}

	return false;
}



function cursorOnClickableElement(x, y) {
    return getFoodUI(x, y) != null
        || getOptionsUI(x, y) != null
        || getMapUI(x, y) != null
        || getItem(x, y) != null;
}



function moveMouse(evt) {		
	// We update the mouseXY here because key presses don't track cursor/mouse 
	// location and sometimes we want to know where the mouse is.
	mouseX	=	evt.pageX;
	mouseY	=	evt.pageY;

    // Change cursor when hovering over clickable elements
	if(cursorOnClickableElement(mouseX / appScale, mouseY / appScale)) {
	    changeCursor(true);
	}
	else {
	    changeCursor(false);
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
		testItemClick(mouseX, mouseY, evt.shiftKey);
	}
}


var bgLoaded = false;
var symbolsLoaded = false;
var iconsLoaded = false;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');	
	canvasContext = canvas.getContext('2d');
	
	addEventListener('resize', resizeCanvas, false);
	// Draw canvas border for the first time.
	initKaraData ();
	setOptions(optionList);
	loadMaps(true);
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
}

function loaded () {
	if ( symbolsLoaded && iconsLoaded ) {
		resetShapes();   
		setInterval(function() {
			drawEverything(); 
		}, 1000/framesPerSecond);
	}
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

	if (showIcons && iconImg) {
		canvasContext.drawImage(iconImg, 0, shapeHeight*id, shapeWidth, shapeHeight, 		
			x - shapeOffset, y-shapeOffset, shapeSize, shapeSize);		
	} else {
		canvasContext.drawImage(symbolImg, 0, shapeHeight*id, shapeWidth, shapeHeight, 		
			x - shapeOffset, y-shapeOffset, shapeSize, shapeSize);		
	}
}

	
function drawEverything() {		
	
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
	
	
	if (bgLoaded) {		
		canvasContext.drawImage(bgImg, 0, 0);
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
		drawMap();
		drawItems();
	}		
}
