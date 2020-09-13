/*
	floorItems.js
	
	Part of the KaraFood.io food app for Karazhan.
	Written by TiggerOni
	For the Jenafur project for the Wow Secrets Discord.
	All rights reserved.	
*/


/*
	FloorItem
		FoodType
		ID
		start X,Y
		current X,Y
		target X,Y
		
		isGrabbed
		isMoving
				
		init
		setHome
		setTarget
		
		
	
	Grid logic when snapping will direct old foods to return to home.
*/

// {id: , type: , x: , y: , startX: , startY: , targetX: , targetY: , dx: 0, dy: 0, isMoving:false, }

var blankItem = { id:0, type:-1, x:0, y:0, startX:0, startY:0, targetX:0, targetY:0, dx:0, dy:0, isMoving:false, canGrab:false, isGrabbed:false};

var foodItems = [];
var kibbleItems = [
		{ id:1000, type:KIBBLES, x:operaXOffset + 140, y:operaYOffset + 380, scale:0.75, isMoving:false, canGrab:false, isGrabbed:false},
		{ id:1001, type:KIBBLES, x:operaXOffset + 140, y:operaYOffset + 695, scale:0.75, isMoving:false, canGrab:false, isGrabbed:false}
	];

var placedFloorFood = [];
var placedExtraFood = [];

var grabbedItem = null;

const framesToRecall = 12;
const framesToSnap = 4;

const DUSTY_BUN_FLOOR = DUSTY_BUN * 10;
const KARAWEIZEN_FLOOR = KARAWEIZEN * 10;


var solutionItems = [ 
	JUICY_DRUMSTICK * 10,
	MARBLED_STEAK * 10,
	FISHY_BITS * 10,
	MEATY_MORSEL * 10,
	MARBLED_STEAK * 10 + 1,
	SLATHERED_RIB * 10,
	JUICY_DRUMSTICK * 10 + 1,
	FISHY_BITS * 10 + 1
];

var solutionLocs = [
	{ gx: 5, gy: 21 }, 
	{ gx: 7, gy: 19 }, 
	{ gx: 9, gy: 17 }, 
	{ gx: 11, gy: 15 }, 
	{ gx: 13, gy: 13 }, 
	{ gx: 15, gy: 7 }, 
	{ gx: 17, gy: 5 }, 
	{ gx: 19, gy: 7 }, 	
];


function makeFoodItems() {
	var halfHeight = legendItemHeight/2;
	var iconSpace = 30;
	
	var x;
	var y = legendFoodY + (legendItemHeight/2);
	
	canvasContext.font = legendFont;
	
	
	for (var i=0; i<shapes.length; i++) {
		x = tipsX;
		
		for (var j=0; j<4; j++) {
			if (j == 3 && i == MEATY_MORSEL) {
				continue;				
			}
			
			var item = { id:0, type:-1, x:0, y:0, startX:0, startY:0, targetX:0, targetY:0, dx:0, dy:0, scale:0.75, isMoving:false, canGrab:true, isGrabbed:false};
						
			item.x = item.startX = x;
			item.y = item.startY = y;
			item.id = i*10 + j;
			item.type = i;
			
			foodItems.push(item);
			
			x += iconSpace;
		}
		
		y += legendItemHeight;		
	}
}

function placeFloorFoods() {

	for (index in foodItems) {
		var item = foodItems[index];
		if (item.id == DUSTY_BUN_FLOOR) {
			item.targetX = operaXOffset + 175;
			item.targetY = operaYOffset + 770;
			setupMove(item, framesToRecall);
			shapes[DUSTY_BUN].active = true;
		} else if (item.id == KARAWEIZEN_FLOOR) {
			item.targetX = operaXOffset + 580;
			item.targetY = operaYOffset + 730;
			setupMove(item, framesToRecall);
			shapes[KARAWEIZEN].active = true;
		}
	}		
}

function placeSolution() {
	recallingAllFoods();
	clearGridLines();
	
	turnOnGridLine(4, 4);
	turnOnGridLine(20, 22);
	
	
	for (index in solutionItems) {
		var item = getItemByID(solutionItems[index]);

		if (item) {
			var loc = getLocationForGridPoint( solutionLocs[index] );
			item.targetX = loc.x;
			item.targetY = loc.y;
		
			setupMove(item, framesToRecall);
		}		
	}
}

function getItemByID (id) {
	for (i in foodItems) {
		var item = foodItems[i];
		if (item.id == id) {
			return item;
		}
	}
	
	return null;
}

function recallingAllFoods() {
	for (index in foodItems) {
		recallFood(foodItems[index]);
	}
}

// For the opera, when the user clicks a food in the legend, all the foods are recalled to the menu.
function recallFoods(foodID) {
	for (index in foodItems) {
		var item = foodItems[index];
		if (item.type == foodID) {
			recallFood(item);
		}
	}
}

function recallFood(item) {
	if (item.x != item.startX || item.y != item.startY) {
		item.targetX = item.startX;
		item.targetY = item.startY;
		setupMove(item, framesToRecall);
	}
}


function setupMove(item, frames) {
	if (frames < 2) {
		frames = 2;
	}
	
	if (item.x != item.targetX || item.y != item.targetY) {
		item.dx = (item.targetX - item.x) / frames;
		item.dy = (item.targetY - item.y) / frames;
		
		if (Math.abs(item.dx) < 2 )
			item.dx = 0;
		if (Math.abs(item.dy) < 2 )
			item.dy = 0;
		item.isMoving = true;
	}
}

// perform all movement here
function updateItems() {
	for (index in foodItems) {
		var item = foodItems[index];
		if (item.isMoving) {
			if ( item.dx != 0 && Math.abs(item.x - item.targetX) > Math.abs(item.dx)) {
				item.x += item.dx;
			} else {
				item.dx = 0;
			}
			
			if ( item.dy != 0 && Math.abs(item.y - item.targetY) > Math.abs(item.dy)) {
				item.y += item.dy;
			} else {
				item.dy = 0;
			}
			if (item.dx == 0 && item.dy == 0) {
				item.isMoving = false;
				item.x = item.targetX;  item.y = item.targetY;
				checkFoodUI(item.type);
				
				if (item.id == DUSTY_BUN_FLOOR| item.id == KARAWEIZEN_FLOOR) {
					turnOffPlaceButton();
				}				
				
				if (recallAllFoods || putDownSolution) {
					turnOffRecallButton();
				}
			}
		}
	}	
}

function checkFoodUI(type) {
	
	for (index in foodItems) {
		var item = foodItems[index];
		if (item.type == type) {
			if (item.isMoving || item.isGrabbed) {
				return;				
			}
			if (item.x != item.startX || item.y != item.startY) {
				return;
			}
		}		
	}
	
	shapes[type].active = false;
	
}

// Iterate through items and draw them
function drawFloorItems() {
	
	for (var i=0; i<foodItems.length; i++) {
		drawItem(foodItems[i]);
	}		
}

function drawKibbles() {
	drawItem(kibbleItems[0]);
	drawItem(kibbleItems[1]);
}

// Draw item at its current location
function drawItem(item) {	
	var x = item.x;
	var y = item.y;
	
	var scale = item.scale;
	
	var shapeSize = shapeWidth * scale;
	var shapeOffset = shapeSize >> 1;
	
	
	if (showIcons && iconImg) {
		canvasContext.drawImage(iconImg, 0, shapeHeight*item.type, shapeWidth, shapeHeight,
			x - shapeOffset, y-shapeOffset , shapeSize, shapeSize);		
	} else {
		canvasContext.drawImage(symbolImg, 0, shapeHeight*item.type, shapeWidth, shapeHeight,
			x - shapeOffset, y-shapeOffset , shapeSize, shapeSize);		
	}
			
	canvasContext.globalAlpha = 1.0;	
}



function getItem(mx, my) {
	for (var i=0; i<foodItems.length; i++) {
		var item = foodItems[i];
		
		var shapeOffset = shapeSize >> 1;
		
		var x = item.x - shapeOffset;
		var y = item.y - shapeOffset;
		
		var scale = item.scale;
		
		var shapeSize = shapeWidth * scale;
		
		if (mx >= x && mx < x + shapeSize && my >= y && my < y + shapeSize ) {
			return item;
		}
	}
	
	return null;
}

function tryItemClick(mx, my) {
	var item = getItem(mx, my);
	
	if (item) {
		grabItem(item, mx, my);
		return true;
	}
	return false;
}


function grabItem(item, mx, my) {
	grabbedItem = item;
	item.isGrabbed = true;
	item.x = mx;
	item.y = my;
	canvas.addEventListener('mouseup', dropItem);

}

function updateGrab(mx, my) {
	if (grabbedItem) {
		grabbedItem.x = mx;
		grabbedItem.y = my;
	} else {
		dropItem();
	}
}

function dropItem() {
	if (grabbedItem) {
		var item = grabbedItem;
		grabbedItem = null;		
		
		item.isGrabbed = false;
		
		if (item.x < 0) item.x = 0;
		if (item.y < 0) item.y = 0;
		
		// Do shift to grid or return to start here, depending on where dropped.
		if (item.x < operaXOffset) {
			recallFood(item);
		} else {
			shapes[item.type].active = true;		// Should make an API for this...
			
			if (snapToGrid) {
				var points = getNearestGridPoint(item.x,item.y);						
				item.targetX = points[0];
				item.targetY = points[1];						
				setupMove(item, framesToSnap);
			}
		}		
	}
	canvas.removeEventListener('mouseup', dropItem);
	
}

