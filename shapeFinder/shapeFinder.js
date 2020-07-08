// shapeFinder.js
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

var framesPerSecond = 30;




// Options:

var showingMap = true;		// Not used for this app.



// doing it this way to avoid refactoring all the codes.
var showingCredits = false;
var showingHelp = true;
var attachFoodToLayers = true;

// Not exposed in this app.
var showInactiveItems = false;
var showInactiveLayers = false;


const ATTACH_FOOD_TO_LAYERS = 0;
const SHOWING_HELP = 1;
const SHOWING_CREDITS = 2;

var optionList = [
	{ text:"Attach Food to Layers", value: true, default: true },
	{ text:"Show Help", value: true, default: false },
	{ text:"Show Credits", value: false, default: false },
];

function updateOptions() {
	showingCredits = optionList[SHOWING_CREDITS].value;
	showingHelp = optionList[SHOWING_HELP].value;
	attachFoodToLayers = optionList[ATTACH_FOOD_TO_LAYERS].value;
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
	
	switch (evt.keyCode) {
		case 82:			// r
			resetShapes();
			resetSearch();
			resetOptions();
			updateOptions();
			break;
		case 32:			// space
		case 76:			// L
			// makeLine();
			break;
		case 83:			// S
			// swapSelectedItems();
			break;
		case 77:			// m of meats
			active = !shapes[SLATHERED_RIB].active;
			
			setShapeActive( SLATHERED_RIB, active );
			setShapeActive( MEATY_MORSEL, active );
			setShapeActive( MARBLED_STEAK, active );
			setShapeActive( JUICY_DRUMSTICK, active );
			setShapeActive( FISHY_BITS, active );
			
			updateShapes();		
			break;
		case 70:			// f for fruits
			active = !shapes[OLD_APPLE].active;
			
			setShapeActive( OLD_APPLE, active );
			setShapeActive( ORANGE_ORANGE, active );
			setShapeActive( LOST_WATERMELON, active );
			setShapeActive( HIDDEN_BANANA, active );
			setShapeActive( BUNCH_BERRIES, active );
			
			updateShapes();		
			break;
		case 68:			// d for drinks;
			active = !shapes[WILDERBEW_SPECIAL].active;
			
			setShapeActive( WILDERBEW_SPECIAL, active );
			setShapeActive( STRONGARM_STOUT, active );
			setShapeActive( KARAWEIZEN, active );
			setShapeActive( HOPPY_MEAD, active );
			setShapeActive( GHOSTLY_ALE, active );
			
			updateShapes();
			break;
		case 66:			// b for breads
			active = !shapes[YEASTY_HUNK].active;
			
			setShapeActive( YEASTY_HUNK, active );
			setShapeActive( STALE_LOAF, active );
			setShapeActive( DUSTY_BUN, active );
			setShapeActive( CROSS_BUN, active );
			setShapeActive( BAGUETTE, active );
			
			updateShapes();
			break;

			
		case 48:		// '0'
			resetSearch();
			break;
			
		case 49:		// '1'
			searchForLeftKibbleShape();
			break;
		case 50:		// '2'
			searchForRightKibbleShape();
			break;
			
		case 187:		// '=' or '+'
			// Increase the sensitivity for the search
			lowerSearchDiff();
			break;
		case 189:		// '-' or '_'
			// Decrease the sensitivity for the search
			raiseSearchDiff();
			break;
		
			
		case 38:		// up arrow
		case 39:		// right arrow
			incrementSearch();
			break;
			
		case 37:		// left arrow
		case 40:		// down arrow
			decrementSearch();
			break;
		
			
		default:
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
			|| testOptionsUI(mx, my, shiftKey)	
			|| testMapUI(mx, my, shiftKey)) {
		return true;
	}
	
	return false;
}



function cursorOnClickableElement(x, y) {
    return getFoodUI(x, y) != null
        || getOptionsUI(x, y) != null
        || getMapUI(x, y) != null
        || getActions(x, y) != null;
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

	if (testActions(mouseX, mouseY)) {
		return;
	}

	if (testUIClick(mouseX, mouseY, evt.shiftKey)) {
		updateOptions();
	} else {
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
	
	// override the standard defaults here
	attachFoodToLayers = optionList[ATTACH_FOOD_TO_LAYERS].value = optionList[ATTACH_FOOD_TO_LAYERS].default = false;
	scaleSelected = 0.50;
	legendMapY = 700;

	for (i=0; i<KaraShapes.length; i++) {
		if (i>=PEDESTALS) {
			KaraShapes[i].defaultActive = false;
			KaraShapes[i].active = false;
		} else {
			KaraShapes[i].defaultActive = true;
			KaraShapes[i].active = true;
		}
	}
	
	for (i=0; i<layeredMaps.length; i++) {
		layeredMaps[i].defaultVisible = true;
		layeredMaps[i].visible = true;
	}
	
	initSearchData();
	setOptions(optionList);
	showTips = false;
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
		resetShapes();   
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


// Actions are app specific, so they're not in the menus code (yet)
var searchIndex = NO_SEARCH;
var searchX = 375;
var searchY = 375;




function drawActions() {

	var x = searchX;
	var y = searchY;
	var textXOffset = shapeWidth / 2;
	var textYOffset = legendItemHeight/2;
	var buttonSize = legendItemHeight;

	canvasContext.font = legendFont;
	canvasContext.textBaseline = 'middle';
	canvasContext.textAlign = 'left';


	if (searchIndex == NO_SEARCH) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	} else {
		border(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("No search active", x + textXOffset, y + textYOffset);
	y += legendItemHeight;

	if (searchIndex == LEFT_KIBBLE) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	} else {
		border(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Left Kibble search", x + textXOffset, y + textYOffset);
	y += legendItemHeight;
	
	if (searchIndex == RIGHT_KIBBLE) {
		highlight(x, y, legendItemWidth, legendItemHeight);
	} else {
		border(x, y, legendItemWidth, legendItemHeight);
	}
	canvasContext.fillText("Right Kibble search", x + textXOffset, y + textYOffset);
	y += legendItemHeight;
	
	
	
//const diffDefaultIndex = 2;
//const diffValues = [0.01, 0.025, 0.05, 0.1, 0.25];
//var diffIndex = diffDefaultIndex;
	
	// Allow the search diff to be set
	canvasContext.textAlign = 'center';
	
	y += legendItemHeight;
	canvasContext.fillText("Search sentitivity", x + legendItemWidth/2, y + textYOffset);
	
	y += legendItemHeight;
	
	// Draw search result Arrows
	if (diffIndex > 0) {
		highlight(x, y, buttonSize, buttonSize);
	} else {
		border(x, y, buttonSize, buttonSize);
	}
	canvasContext.fillText("\u2190", x + buttonSize/2, y + buttonSize/2);


	canvasContext.fillText((diffIndex + 1) + " / " + diffValues.length, x + legendItemWidth/2, y + textYOffset);

	
	if (diffIndex+1 < diffValues.length) {
		highlight(x + legendItemWidth - buttonSize, y, buttonSize, buttonSize);
	} else {
		border(x + legendItemWidth - buttonSize, y, buttonSize, buttonSize);
	}
	canvasContext.fillText("\u2192", x + legendItemWidth - (buttonSize/2), y + textYOffset);

	canvasContext.textAlign = 'left';
	y += legendItemHeight;
	
	
	if (searchIndex == NO_SEARCH) {
		return;
	}



	canvasContext.textAlign = 'center';
	y += legendItemHeight;


	canvasContext.fillText("Search Results", x + legendItemWidth/2, y + textYOffset);
	
	y += legendItemHeight;
	
	// Draw search result Arrows
	if (activeLines.length > 0) {
		highlight(x, y, buttonSize, buttonSize);
	} else {
		border(x, y, buttonSize, buttonSize);
	}
	canvasContext.fillText("\u2190", x + buttonSize/2, y + buttonSize/2);


	canvasContext.fillText((activeLine + 1) + " / " + activeLines.length, x + legendItemWidth/2, y + textYOffset);

	
	if (activeLines.length > 0) {
		highlight(x + legendItemWidth - buttonSize, y, buttonSize, buttonSize);
	} else {
		border(x + legendItemWidth - buttonSize, y, buttonSize, buttonSize);
	}
	canvasContext.fillText("\u2192", x + legendItemWidth - (buttonSize/2), y + textYOffset);
	
	y += legendItemHeight;
	if (activeLine >= 0 ) 
		canvasContext.fillText("diff = " + Number.parseFloat(results[activeLine].delta).toFixed(4) , x + legendItemWidth/2, y + textYOffset);

	
	canvasContext.textAlign = 'left';
}

function getActions(mx, my) {
    var x = searchX;
	var y = searchY;

	if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {
		return "reset";
	}
	y += legendItemHeight;
	if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {
		return "leftKibble";
	}
	y += legendItemHeight;
	if (mx >= x && mx <= x + legendItemWidth && my >= y && my <= y + legendItemHeight) {
		return "rightKibble";
	}
	y += legendItemHeight;

	y += legendItemHeight * 2;

	var buttonSize = legendItemHeight;

	if (mx >= x && mx <= x + buttonSize && my >= y && my <= y + buttonSize) {
		return "lowerSearch";
	}

	if (mx >= x + legendItemWidth - buttonSize && mx <= x + legendItemWidth && my >= y && my <= y + buttonSize) {
	    return "raiseSearch";
	}


	if (searchIndex != NO_SEARCH) {
		y += legendItemHeight * 3;

		if (mx >= x && mx <= x + buttonSize && my >= y && my <= y + buttonSize) {
			return "decrementSearch";
		}

		if (mx >= x + legendItemWidth - buttonSize && mx <= x + legendItemWidth && my >= y && my <= y + buttonSize) {
			return "incrementSearch"
		}
	}

	return null;
}

function testActions(mx, my) {
    var action = getActions(mx, my)
	if (action) {
        switch(action){
            case "reset":
                resetSearch();
                return true;;
            case "leftKibble":
                searchForLeftKibbleShape();
                return true;;
            case "rightKibble":
                searchForRightKibbleShape();
                return true;;
            case "lowerSearch":
                lowerSearchDiff();
                return true;;
            case "raiseSearch":
                raiseSearchDiff();
                return true;;
            case "decrementSearch":
                decrementSearch();
                return true;;
            case "incrementSearch":
                incrementSearch();
                return true;;
        }
	}
	return false;
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
	
	drawActions();
	
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
