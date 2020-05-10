// shapeSearch.js
//
// Part of the KaraFood.io food app for Karazhan.
// Written by TiggerOni
// For the Jenafur project for the Wow Secrets Discord.
// All rights reserved.

// Measured from the 'authoritative' image of joined kibbles

var KibbleLocs = [
	{x:898, y:696},
	{x:896, y:969},
	{x:971, y:810},
	{x:1121, y:916},
	
	{x:849, y:300},
	{x:1044, y:498},
	{x:1156, y:359},
	{x:1176, y:540}	
];

const NO_SEARCH = -1;
const RIGHT_KIBBLE = 0;
const LEFT_KIBBLE = 1;

const searchShapes = [
	[3,1,2,0],
	[4,6,7,5]
];

var searchPoints = [];

var searchP = [0,0];
var searchP2 = [0,0];
var searchP3 = [0,0];
var searchP4 = [0,0];


const diffDefaultIndex = 2;
const diffValues = [0.1, 0.075, 0.05, 0.035, 0.02,];

var diffIndex = diffDefaultIndex;


// Once built table of all distances between location points in Kara.
var distances;
var shapeDistances;
var searchIndex = NO_SEARCH;


var results = [];


// Create the distance data for all the points, for quicker searching.
// Also create the distance data for the shapes we'll be searching for.
// And calculate the left/right side for the 3rd point of the searched shape so we can detect if we're looking at a mirror of it.

function initSearchData () {
	
	// Build the distance table for all the known item points in RtK
	var count = KaraLocations.length;	
	distances = new Array(count);
	
	for (var i=0; i<count; i++) {
		distances[i] = new Array(count);
	}
	
	for (i=0; i<count; i++) {
		distances[i][i] = 0;
		for (var j=i+1; j<count; j++) {
			distances[i][j] = distances[j][i] = getDistance(i, j, KaraLocations);
		}
	}
		
	// Build the distance table for the points in the search shapes.
	shapeDistances = new Array(KibbleLocs.length);
	count = KibbleLocs.length;	
	
	for (i=0; i<count; i++) {
		shapeDistances[i] = new Array(count);
	}
	
	for (i=0; i<count; i++) {
		shapeDistances[i][i] = 0;
		for (var j=i+1; j<count; j++) {
			shapeDistances[i][j] = shapeDistances[j][i] = getDistance(i, j, KibbleLocs);
		}
	}
		
	// Build the Left/Right mirror P for the kibble shapes
	// Someday make this generalized and shape size driven.
	for (i=0; i<searchShapes.length; i++) {
		searchP[i] = getP(KibbleLocs[searchShapes[i][0]], KibbleLocs[searchShapes[i][1]], KibbleLocs[searchShapes[i][2]]);
		searchP2[i] = getP(KibbleLocs[searchShapes[i][0]], KibbleLocs[searchShapes[i][1]], KibbleLocs[searchShapes[i][3]]);
		searchP3[i] = getP(KibbleLocs[searchShapes[i][1]], KibbleLocs[searchShapes[i][2]], KibbleLocs[searchShapes[i][3]]);
		searchP4[i] = getP(KibbleLocs[searchShapes[i][0]], KibbleLocs[searchShapes[i][3]], KibbleLocs[searchShapes[i][2]]);
	}
	
	console.log ("point distances calculated");
}



// Slow, but gets the job done and I only need to do it once for each pair of coordinates.
function getDistance(a, b, points) {	
	return Math. hypot(points[a].x-points[b].x, points[a].y-points[b].y)
}


function getP (p1, p2, p3) {
	return isThePointLeftOfRay(p3.x, p3.y, p1.x, p1.y, p2.x, p2.y);
}

// Credit to Darel Rex Finley for the code.
// 		https://alienryderflex.com/point_left_of_ray/
// For a line from 2 points, what side is the 3 point on?
// Used to make sure we're not creating a mirror when we look for a shape.
// returns true if on the "left" side, looking from the start of the ray down.


function isThePointLeftOfRay(x, y, raySx, raySy, rayEx, rayEy) {
	return (y-raySy)*(rayEx-raySx) > (x-raySx)*(rayEy-raySy);	
}

function searchForLeftKibbleShape() {
	searchIndex = LEFT_KIBBLE;
	
	getSearchPoints();
	searchItems();
	displaySearchResults();
}

function searchForRightKibbleShape() {
	searchIndex = RIGHT_KIBBLE;

	getSearchPoints();
	searchItems();
	displaySearchResults();
}

function redoSearch() {
	getSearchPoints();
	searchItems();
	displaySearchResults();
}


// for all active shapes, gather their locations.
function getSearchPoints() {
	searchPoints = [];

	
	for (var i=0; i<shapes.length; i++){
		let shape = shapes[i];
							
		for (var j=0; j<shape.items.length; j++)
		{
			// Add the location index for each point in the shape to the array
			
			// Convert this to the shape ID.  Or a shapeID, locID pair.  That'd be better.
			if (isShowing(shape.items[j])) {
				searchPoints.push( {locID: items[shape.items[j]].currLocID, itemID: shape.items[j]});
			}
		}
	}
	
/*
	console.log ("SearchPoints count = " + searchPoints.length);
	for (i=0; i<searchPoints.length; i++) {
		console.log ("added loc = " + searchPoints[i] + ", x: ", locations[searchPoints[i]].x + " y: " + locations[searchPoints[i]].y);
	}	
*/
}


//	Don't allow distance ratio to exceed this value;
//	Todo: make this adjustable to the user.



function lowerSearchDiff() {
	if (diffIndex > 0) {
		diffIndex--;
		redoSearch();
		
		console.log("DiffValue now at " + diffValues[diffIndex]);
	} else {
		console.log("DiffValue already at min of " + diffValues[0]);
	}
}

function raiseSearchDiff() {
	if (diffIndex < diffValues.length-1) {
		diffIndex++;
		redoSearch();
		console.log("DiffValue now at " + diffValues[diffIndex]);
	} else {
		console.log("DiffValue already at max of " + diffValues[diffIndex]);
	}
}

	
// 	Search logic:
//
//	A' B' C' etc = shape data
//
//	For each point A in search space:
//		diffDelta = 0
//		For each point B
//		get length of BA
//		Get ratio of BA to B'A'.  Store.
//		For each C to BA
//			Get ratio for CA to C'A'
//				Out of DIFF_MAX?  skip.
//				add diff delta;
//			Get ratio for CB to C'B'
//				Out of DIFF_MAX?  skip.
//				add diff delta;
//			For each D to ABC
//				Repeat above
//					
//		Store ABCD as shape;

//	Sort shapes by diffDelta = totalDiff

//  Stored shape :  locations = [], totalDiff, rotationDelta


function searchItems() {
	
	var shapeID = searchIndex;
	
	var baseRatio, ratio;	
	var variance, delta;
		
	var searchSize = searchPoints.length;
	
	var shape = searchShapes[shapeID];
	
	var DIFF_MAX = diffValues[diffIndex];
	
	results = [];
	
	
	// I should rework this as a recursive function.
	
	// We consider AB and BA as separate searches, because the shape could go in either direction and it's fast enough to check.	
	// variance will be the max delta in the ratio of the shape.
	for (var A=0; A<searchSize; A++) {
		for (var B=0; B<searchSize; B++) {
		
			if (A == B) 
				continue;
			
			
			baseRatio = distances[searchPoints[A].locID][searchPoints[B].locID] / shapeDistances[shape[0]][shape[1]];
			variance = 0;
						
			for (var C=0; C<searchSize; C++) {
				if (C == A || C == B) 
					continue;
				
				ratio = distances[searchPoints[A].locID][searchPoints[C].locID] / shapeDistances[shape[0]][shape[2]];
				delta = Math.abs(ratio - baseRatio);
				if (delta > DIFF_MAX) 
					continue;
				variance = delta;
								
				ratio = distances[searchPoints[B].locID][searchPoints[C].locID] / shapeDistances[shape[1]][shape[2]];
				delta = Math.abs(ratio - baseRatio);
				if (delta > DIFF_MAX) 
					continue;
				if (delta > variance)
					variance = delta;
				
				if (getP(KaraLocations[searchPoints[A].locID], KaraLocations[searchPoints[B].locID], KaraLocations[searchPoints[C].locID]) != searchP[shapeID]) {
					continue;
				}
				
				
				for (var D=0; D<searchSize; D++) {
					if (D == A || D == B || D == C) 
						continue;
					
					ratio = distances[searchPoints[A].locID][searchPoints[D].locID] / shapeDistances[shape[0]][shape[3]];
					delta = Math.abs(ratio - baseRatio);
					if (delta > DIFF_MAX) 
						continue;
					if (delta > variance)
						variance = delta;

					ratio = distances[searchPoints[B].locID][searchPoints[D].locID] / shapeDistances[shape[1]][shape[3]];
					delta = Math.abs(ratio - baseRatio);
					if (delta > DIFF_MAX) 
						continue;
					if (delta > variance)
						variance = delta;

					ratio = distances[searchPoints[C].locID][searchPoints[D].locID] / shapeDistances[shape[2]][shape[3]];
					delta = Math.abs(ratio - baseRatio);
					if (delta > DIFF_MAX) 
						continue;
					if (delta > variance)
						variance = delta;

					if (getP(KaraLocations[searchPoints[A].locID], KaraLocations[searchPoints[B].locID], KaraLocations[searchPoints[D].locID]) != searchP2[shapeID]) {
						continue;
					}
										
					if (getP(KaraLocations[searchPoints[B].locID], KaraLocations[searchPoints[C].locID], KaraLocations[searchPoints[D].locID]) != searchP3[shapeID]) {
						continue;
					}
					
					if (getP(KaraLocations[searchPoints[A].locID], KaraLocations[searchPoints[D].locID], KaraLocations[searchPoints[C].locID]) != searchP4[shapeID]) {
						continue;
					}
					
					push_shape(A, B, C, D, variance);
				}				
			}
		}
	}
	
	if (results.length) {
		results.sort(compare);
	}
}





function push_shape(a, b, c, d, delta) {
	results.push( {items: [searchPoints[a].itemID,searchPoints[b].itemID,searchPoints[c].itemID,searchPoints[d].itemID], delta: delta});
}

function compare(a, b) {
	if (a.delta > b.delta) {
		return 1;
	}
	return -1;
}



function displaySearchResults() {
	activeLines = [];1
	
	if (results.length > 0) {
		for (var i=0; i<results.length; i++) {
			activeLines.push(results[i].items);
		}
		
		activeLine = 0;
	} else {
		activeLine = -1;
	}
/*	
	for (var i=0; i<results.length; i++) {
		console.log ("shape #" + i + " delta: " + results[i].delta + "   items: " + results[i].items);
	}
	console.log("Found " + results.length + " shapes total");	
*/	
}

function resetSearch() {
	activeLines = [];
	activeLine = -1;
	searchIndex = NO_SEARCH;
	diffIndex = diffDefaultIndex;
}

function incrementSearch() {
			
	if (activeLine != -1) {
		activeLine = activeLine + 1;
		if (activeLine >= activeLines.length) {
			activeLine = 0;
		}
	}
}

function decrementSearch() {
	
	if (activeLine != -1) {
		activeLine = activeLine - 1;
		if (activeLine < 0) {
			activeLine = activeLines.length - 1;
		}				
	}
}
