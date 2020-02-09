// shapes.js
//
// Part of the KaraFood.io food app for Karazhan.
// Written by TiggerOni
// For the Jenafur project for the Wow Secrets Discord.
// All rights reserved.

/*
	Note: this file is a little messy.  I originally used it for a ley line "uncross the lines" app.
	And then over time I spun off copies for different ideas/iterations.
	Shapes aren't really used now except to test if a food has been activated and to track line colors.
	Most of the heavy lifting is now done in the items and lines array.
	I may get motivated to come back and clean this up.
*/


/*
	Item
		ItemID
		startLocationID
		currentLocationID
		targetLocationID
		
			
*/

/*
	Shape
	// If enabled, draw the lines, then draw the shapes at normal size.
	// if not enabled, don't draw lines, draw shapes half size.
	// if an item is selected or moving, draw it extra large.
		var items = [];		// Array of Items
		var	enabled;
		var lineColor;
		
		
	//Shift click on an item in a shape brings it to the top.
	//Shapes are drawn reverse order, first shape on top.
*/


/*
	Make the locations
	Make the item types
	Make the colors.
	Make the icons.	
*/


// test data
var locations = [
	{x:100, y:100, desc:"upper left"},
	{x:125, y:200, desc:"somewhere in the middle"},
	{x:300, y:100, desc:"along the top"},
	
	{x:600, y:500, desc:"more in the middle"},	
	{x:800, y:200, desc:"right side"},
	{x:400, y:300, desc:"above the middle"},
	
	{x:900, y:900, desc:"lower right"},
	{x:100, y:900, desc:"lower left"},
	{x:450, y:450, desc:"just left of middle"},
	{x:300, y:300, desc:"towards the upper left"},
];



// Item:
//		ID
//		startLocation
//		currentLocation
//		targetLocationID
//		scale


// test data
var items  = [
	{id:STALE_LOAF, startLocID:0, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:STALE_LOAF, startLocID:2, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:STALE_LOAF, startLocID:3, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:STALE_LOAF, startLocID:1, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
		
	{id:JUICY_DRUMSTICK, startLocID:4, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:JUICY_DRUMSTICK, startLocID:5, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:JUICY_DRUMSTICK, startLocID:7, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:JUICY_DRUMSTICK, startLocID:6, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
];	
	
// Shape:
// 		List of itemIndexes.
//		LineRGB
//		active	
//		lines:[]


// test data
var shapes = [
	{items:[0,1,2,3], lines:[], lineColor:RGB_PALE_BLUE, defaultActive: true, active:false, update:true},
	{items:[4,5,6,7], lines:[], lineColor:RGB_PALE_PINK, defaultActive: true, active:false, update:true},
	{items:[8,9,10,11], lines:[], lineColor:RGB_PALE_GREEN, defaultActive: true, active:false, update:true},
];

// array for UI and draw order.  We want to adjust the z order of the shapes, but not in the legend or elsewhere.
var shapeOrder = [];

// Line:
//		[item1:, item2, crossed];
// After resets, toggling enables, moved items retest all lines.

var lines = [];
var updateLines = true;

// These will hold the selected item IDs.  
// If a new point is selected, 1 will move to 2 and the new point will become 1.
var selectedItem1 = -1;
var selectedItem2 = -1;

var allowInactiveSwaps = true;



function initKaraData () {
	// Uncomment this out if you need to test with base data.
	// return;
	
	
	locations = [];
	locations = KaraLocations;
	items = [];
	items = KaraItems;
	shapes = [];
	shapes = KaraShapes;
	
	// One time fixup for the offset of the map to the food locations.
	for (i=0; i<locations.length; i++) {
		locations[i].x += mapXOffset;
		locations[i].y += mapYOffset;		
	}
	
	console.log("kara data initialized");
}

function rebuildLines() {
	
	if (!updateLines) {
		return;
	}
	
	updateLines = false;
}

// Resets the shapes to their starting locations and triggers a refresh of the line tests.
function resetShapes() {
	var scale;

	selectedItem1 = -1;
	selectedItem2 = -1;
	
	shapeOrder = [];
	
	for (var i=0; i<items.length; i++) {
		items[i].currLocID = items[i].startLocID;
		items[i].x = locations[items[i].currLocID].x;
		items[i].y = locations[items[i].currLocID].y;
		items[i].targetLocID = -1;
	}

	
	for (i=0; i<shapes.length; i++) {
		shapeOrder[i] = i;
		
		shapes[i].active = shapes[i].defaultActive;
	}
	

	for (i=0; i<items.length; i++) {
		if (shapes[items[i].id].active) {
			items[i].scale = scaleNormal;
		} else {
			items[i].scale = scaleDisabled;
		}
	}
	
	for (i=0; i<maps.length; i++) {
		maps[i].visible = maps[i].defaultVisible;
	}

	//updateLines = true;
	//rebuildLines();	
	
	
	lines = [];
}

function toggleShape(shapeID) {
	if (shapeID < 0 || shapeID >= shapeCount ) {
		return;
	}
	
	var shape = shapes[shapeID];
	shape.active = !shape.active;
	
	var scale;
	
	if (shape.active) {
		scale = scaleNormal;
	} else {
		scale = scaleDisabled;
	}
	for (var i=0; i<shape.items.length; i++) {
		items[shape.items[i]].scale = scale;
	}
	
	updateLines = true;
}

function setShapeActive(shapeID, active) {
	if (shapeID < 0 || shapeID >= shapeCount ) {
		return;
	}
	
	var shape = shapes[shapeID];
	shape.active = active;
	
	var scale;
	
	if (shape.active) {
		scale = scaleNormal;
	} else {
		scale = scaleDisabled;
	}
	for (var i=0; i<shape.items.length; i++) {
		items[shape.items[i]].scale = scale;
	}
	
	updateLines = true;
}




// Called after updating the state of a shape to create lines and scale icons.
function updateShapes() {
	rebuildLines();	
}

// Line intersection code
// Courtesy of stackOverflow
function lineSegmentsIntersect (x1, y1, x2, y2, x3, y3, x4, y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return false;}
        } else {
            if (!(x1<=x&&x<=x2)) {return false;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return false;}
        } else {
            if (!(y1<=y&&y<=y2)) {return false;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return false;}
        } else {
            if (!(x3<=x&&x<=x4)) {return false;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return false;}
        } else {
            if (!(y3<=y&&y<=y4)) {return false;}
        }
    }
    return true;
}


// We go through the list, compare the next line to every other line after, if this line hasn't intersected with anything yet.
// Mark both this line and the intersecting line as crossed and move on.
// Skip lines that have already crossed.
// Also skip lines that share one endpoint.  They by definition don't cross (but would if we didn't test for it).

function testLines() {
	
	for (var i=0; i<lines.length; i++) 
		lines[i].crossed = false;
	
	
	for (var i=0; i<lines.length-1; i++) {
		
		for (var j=i+1; j<lines.length; j++) {
			
			// They can't collide if they share the same endpoint.
			if (lines[i].item1 == lines[j].item1 
				|| lines[i].item1 == lines[j].item2
				|| lines[i].item2 == lines[j].item1
				|| lines[i].item2 == lines[j].item2)
				{
					continue;
				}
				
			
			if (lineSegmentsIntersect( 
						items[lines[i].item1].x, items[lines[i].item1].y,
						items[lines[i].item2].x, items[lines[i].item2].y,
						items[lines[j].item1].x, items[lines[j].item1].y,
						items[lines[j].item2].x, items[lines[j].item2].y)) {
				lines[i].crossed = true;
				lines[j].crossed = true;
			}			
		}
	}
}





// base size is 36x36;
// id is the sprite offset
// x and y are the center.
function drawItem (item) {
	var x = item.x;
	var y = item.y;
	
	
	var shapeSize = shapeWidth * item.scale;
	var shapeOffset = shapeSize >> 1;

	canvasContext.drawImage(symbolImg, 0, shapeHeight*item.id, shapeWidth, shapeHeight, 		
			x - shapeOffset, y-shapeOffset , shapeSize, shapeSize);		
}


/*
// This was used for older versions of the app.  Keeping this here for reference.
function drawShapes() {
	
	var dx, dy;
	
	canvasContext.lineWidth = 3;
	
	canvasContext.shadowOffsetX = 1;
	canvasContext.shadowOffsetY = 2;
	canvasContext.shadowBlur = 2;
	canvasContext.shadowColor = 'black';
	

	// draw lines first
	for (var i=0; i<shapes.length; i++){
		let shape = shapes[shapeOrder[i]];
				
		if (!shape.active && !showInactiveItems) {
			continue;
		}
		
		for (var j=0; j<lines.length; j++) {
			let line = lines[j];
			
			var index = shape.items.findIndex(id => id == line.item1);
			
			if (index != -1) {
				
				if (!isShowing
				
				canvasContext.fillStyle = lineColors[shape.lineColor];
				canvasContext.strokeStyle = lineColors[shape.lineColor];
				
				canvasContext.beginPath();
				canvasContext.moveTo(items[line.item1].x, items[line.item1].y);
				canvasContext.lineTo(items[line.item2].x, items[line.item2].y);
				canvasContext.stroke();
			}
		}
		
				
		for (j=0; j<shape.items.length; j++) {
			drawItem(items[shape.items[j]]);
		}
				
	}
	
	canvasContext.shadowOffsetX = 0;
	canvasContext.shadowOffsetY = 0;
	canvasContext.shadowBlur = 0;
	canvasContext.shadowColor = 'black';	
}
*/

// This is the new and shiny way to draw nodes and lines.
function drawItems() {
	
	var dx, dy;
	
	canvasContext.lineWidth = 3;
	
	canvasContext.shadowOffsetX = 1;
	canvasContext.shadowOffsetY = 2;
	canvasContext.shadowBlur = 2;
	canvasContext.shadowColor = 'black';
	

	// draw lines first
	// We do it this way to respect the draw order of the shapes, in case we used the shift click to bring a shape to the top.
	for (var i=0; i<shapes.length; i++){
		let shape = shapes[shapeOrder[i]];
				
		// FYI: shape === food type
		if (!shape.active && !showInactiveItems) {
			continue;
		}
		
		for (var j=0; j<lines.length; j++) {			
			let line = lines[j];
			
			for (var k=0, notFound = true; k<shape.items.length && notFound; k++) {
				if (shape.items[k] == line.item1) {
					notFound = false;
				}
			}
			
			// Don't draw the line until we're at the right shape.
			if (notFound) 
				continue;
									
			if (isShowing(line.item1) && isShowing(line.item2)) {				
				canvasContext.fillStyle = lineColors[shape.lineColor];
				canvasContext.strokeStyle = lineColors[shape.lineColor];
				
				canvasContext.beginPath();
				canvasContext.moveTo(items[line.item1].x, items[line.item1].y);
				canvasContext.lineTo(items[line.item2].x, items[line.item2].y);
				canvasContext.stroke();
			}
		}		
				
		for (j=0; j<shape.items.length; j++) {
			if (isShowing(shape.items[j])) {
				drawItem(items[shape.items[j]]);
			}
		}
	}
	
	canvasContext.shadowOffsetX = 0;
	canvasContext.shadowOffsetY = 0;
	canvasContext.shadowBlur = 0;
	canvasContext.shadowColor = 'black';	
}

// checks all the flags for the item + layers + options and determines if we're rendering the shape.
function isShowing(itemID) {
		
	let item = items[itemID];
	if (item == null)
		return false;
	
	var layerVisible = maps[locations[item.currLocID].layer].visible;	
	var shapeActive = shapes[item.id].active;
		
	
	if (attachFoodToLayers) {
		
		// visiblity is now coupled to map layers showing.				
		if (layerVisible || showInactiveLayers) {		
			if (shapeActive || showInactiveItems) {
				return true;
			}
		}
		
	} else {
		// Previous rules apply
		if (shapeActive || showInactiveItems) 
			return true;		
	}
		
	return false;
}



function getItemShape(itemID) {
	for (var i=0; i<shapes.length; i++) {
		for (var j=0; j<shapes[i].items.length; j++) {
			if (itemID == shapes[i].items[j]) {
				return i;
			}
		}
	}
	return 0;
}

// run through the list in REVERSE order (because we draw back to front, we want to test clicks front to back)
// Note: the x,y of an item is its CENTER POINT.

// If we hit an item,
//	If shift key is down, move the shape belonging to the item to the front of the list.
//	If there's no item selected, select this item.
//	If there's an item selected, swap the positions of the items and clear the selected item.

var moving = false;

function testItemClick(x, y, shiftKey) {
	
	// Don't allow clicking if we're in the middle of swapping points.
	if (moving)
		return;
	
	// Normalize clicks for board offsets/scaling/etc...
	var halfItemSize;
	var shapeID;
	
	
	for (var i=shapeOrder.length-1; i>=0; i--) {
		let shape = shapes[shapeOrder[i]];
		
		for (var j=0; j<shape.items.length; j++) {
			
			let itemID = shape.items[j];
			let item = items[itemID];
					
			halfItemSize = (item.scale * spriteSize) >> 1;
			if ( x <= item.x - halfItemSize || x >= item.x + halfItemSize
				|| y <= item.y - halfItemSize || y >= item.y + halfItemSize)
			{
				continue;
			}			
						
			if (shiftKey) {
				shapeOrder.push(shapeOrder.splice(i, 1)[0]);				
				return;
			}
			
			if (!isShowing(itemID)) {
				continue;
			}
									
			if (selectedItem1 == itemID) {
				items[selectedItem1].scale = scaleNormal;
				selectedItem1 = -1;
				if (selectedItem2 >= 0) {
					selectedItem1 = selectedItem2;
					selectedItem2 = -1;
				}
				item.scale = scaleNormal;
			}
			else if (selectedItem2 == itemID) {
				items[selectedItem2].scale = scaleNormal;
				selectedItem2= -1;
				item.scale = scaleNormal;
			} else if (selectedItem1 == -1) {
				selectedItem1 = itemID;
				item.scale = scaleSelected;
			} else {
				if (selectedItem2 >= 0) {
					items[selectedItem2].scale = scaleNormal;
				}
				selectedItem2 = selectedItem1;
				selectedItem1 = itemID;
				item.scale = scaleSelected;
			} 				
			break;
		}
	}
}

function makeLine() {
	if (selectedItem1 >= 0 && selectedItem2 >= 0) {
		
		// check to make sure we don't already have the line.
		// If we do, remove it.
		for (var i=0; i<lines.length; i++) {
			if (lines[i].item1 == selectedItem1 && lines[i].item2 == selectedItem2) {
				lines.splice(i, 1);
				return;
			}
			if (lines[i].item2 == selectedItem1 && lines[i].item1 == selectedItem2) {
				lines.splice(i, 1);
				return;
			}
		}
		
		lines.push( {item1:selectedItem1, item2:selectedItem2} );
		
	}
}


function moveShapeToFront(shapeID) {
	var orderID = shapeOrder.findIndex(element => element == shapeID);
	shapeOrder.push(shapeOrder.splice(orderID, 1)[0]);				
}


function swapSelectedItems() {
	if (selectedItem1 >= 0 && selectedItem2 >= 0) {
		swapItems(items[selectedItem1], items[selectedItem2]);
		//selectedItem1 = -1;
		//selectedItem2 = -1;
	}
}

var dx, dy, dScale;
var item1, item2;
const framesToMove = 8;

function swapItems(itemA, itemB) {
			
	item1 = itemA;
	item2 = itemB;
	
	item2.scale = scaleSelected;
	item1.targetLocID = item2.currLocID;
	item2.targetLocID = item1.currLocID;
	selectedItem = null;
	
	dx = (locations[item1.targetLocID].x - locations[item1.currLocID].x) / framesToMove;
	dy = (locations[item1.targetLocID].y - locations[item1.currLocID].y) / framesToMove;
	//dScale = (scaleSelected - scaleNormal)/ framesToMove;	
	dScale = 0;
	moving = true;
}


// See if any items want to be somewhere else.  Move them there if needed.
// When all done moving, test lines and reset scales.
// Take 0.25 second to move and scale down.

function updateItems() {

	if (!moving) {
		return;
	}

	if (item1) {
		item1.x += dx;
		item1.y += dy;
		item1.scale -= dScale;
		
		if (Math.abs(item1.x - locations[item1.targetLocID].x) < Math.abs(dx) ) {
			item1.x = locations[item1.targetLocID].x;
			item1.y = locations[item1.targetLocID].y;
			item1.currLocID = item1.targetLocID;
			item1.targetLocID = null;
			//item1.scale = scaleNormal;
			item1 = null;
		} 
	}
	
	if (item2) {
		item2.x -= dx;
		item2.y -= dy;
		item2.scale -= dScale;
		
		if (Math.abs(item2.x - locations[item2.targetLocID].x) < Math.abs(dx)) {
			item2.x = locations[item2.targetLocID].x;
			item2.y = locations[item2.targetLocID].y;
			item2.currLocID = item2.targetLocID;
			item2.targetLocID = null;
			//item2.scale = scaleNormal;
			item2 = null;
		} 
	}
	
	
	if (item1 == null && item2 == null) {
		moving = false;
		testLines();
	}
	
}




console.log("shapes loaded");