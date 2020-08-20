// karaMap.js
//
// Layer and offset data for the map layers used in Karazhan.
// If you need to move a layer, do it here.

const mapXOffset = 300;
const mapYOffset = -50;

const MAP_COUNT = 9;

var maps = [];

var singleMap = [
	{
	 	name: "Map", 
		file: "../common/layers/mergedimage.png",	x: 0, y: 0,
		img: null, defaultVisible: true, visible: true
	}
];
		
	

var layeredMaps = [
	{ 	name: "Menagerie", 
		file: "../common/layers/008-002.png",	x: 353, y: 417,
		img: null, defaultVisible: false, visible: false},
		
	{ 	name:	"Upper Broken Stairs",
		file: "../common/layers/008-003.png",	x: 736, y: 540,
		img: null, defaultVisible: false, visible: false},
		
	{ 	name:	"Lower Broken Stairs",
		file: "../common/layers/008-004.png",	x: 731, y: 475,
		img: null, defaultVisible: false, visible: false},
		
	{	name:	"Entrance/Upper Opera",
		file: "../common/layers/008-005.png",	x: 324, y: 123,
		img: null, defaultVisible: false, visible: false},
		
	{ 	name:	"Middle Opera Balcony",
		file: "../common/layers/008-006.png",	x: 423, y: 134,
		img: null, defaultVisible: false, visible: false},
		
	{ 	name:	"Guest Chambers/Opera Floor",
		file: "../common/layers/008-007.png",	x: 261, y: 40,
		img: null, defaultVisible: true, visible: true},
		
	{ 	name:	"Banquet Hall",
		file: "../common/layers/008-008.png",	x: 580, y: 300,
		img: null, defaultVisible: true, visible: true},
		
	{ 	name:	"Upper Stables/Kitchen",
		file: "../common/layers/008-009.png",	x: 592, y: 535,
		img: null, defaultVisible: false, visible: false},
		
	{ 	name:	"Stables/Servant's Quarters",	
		file: "../common/layers/008-010.png",	x: 588, y: 133,
		img: null, defaultVisible: false, visible: false},
]

var layersDoneLoading = 0;
var mapLoaded = false;
var opacity = 0.25;


function loadMaps(isLayered) {	
	canvasContext.shadowOffsetX = 1;
	canvasContext.shadowOffsetY = 2;
	canvasContext.shadowBlur = 2;
	canvasContext.shadowColor = 'black';
	
	if (isLayered) {
		maps = layeredMaps;
	} else {
		maps = singleMap;
	}
	
	for (var i=0; i<maps.length; i++) {
		maps[i].img = new Image();
		maps[i].img.src = maps[i].file;
		maps[i].img.style.backgroundColor = 'transparent'; 
		
		maps[i].img.onload = function () {			
			layersDoneLoading += 1;
			//console.log("Loaded " + this.src);
			
			if (layersDoneLoading == maps.length) {
				mapLoaded = true;
			}
		}	

		maps[i].img.onerror = function () {
			console.log("failed to load " + this.src);
		}
	}	
		
	canvasContext.shadowOffsetX = 0;
	canvasContext.shadowOffsetY = 0;
	canvasContext.shadowBlur = 0;
	canvasContext.shadowColor = 'black';		
}


function drawMapLayer(i) {
	
	var map = maps[i];
		
	if ( map.visible ) {
		canvasContext.drawImage(map.img, map.x+mapXOffset, map.y+mapYOffset);
	} else if (showInactiveLayers) {
		canvasContext.save();
		canvasContext.globalAlpha = opacity;
		canvasContext.drawImage(map.img, map.x+mapXOffset, map.y+mapYOffset);
		canvasContext.globalAlpha = 1.0;		
	}
}

function drawMap() {
	
	if (mapLoaded) {
		for (var i=maps.length-1; i>=0; i--) {
			drawMapLayer(i);		
		}
	}
	
	
}

function setOpacity(amount) {
	if (amount < 0) {
		opacity = 0.0;		
	} else if (amount > 1.0) {
		opacity = 1.0;
	} else {
		opacity = amount;
	}
}




