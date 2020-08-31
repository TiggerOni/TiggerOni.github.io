//	const legendFont = "24px Verdana Bold";
//	const legendFont = "20px Times Roman";
var legendFont = "20px Friz Quadrata";

var legendFoodX = 60;
var legendFoodY = 50;

var legendOptionsX = 60;
var legendOptionsY = 800;
var optionsOffset = 1.0;
	

var legendMapX = 375;
var legendMapY = 650;
var mapUIOffset = 1.0;

var legendItemHeight = 30;
var legendItemWidth = 275;

var tipsX = 375;
var tipsY = 450;

var showFoodLegend = true;
var showOptionsLegend = true;
var showMapLegend = true;
var showTips = true;


var actionsX = 375;
var actionsY = 400;



function drawFoodLegend() {
	if (!showFoodLegend) {
		return;
	}
	
	var spriteScale = 0.75;
	var spriteOffset = shapeWidth * spriteScale / 2;
		
	var x = legendFoodX;
	var y = legendFoodY;
	
	canvasContext.font = legendFont;
	
	canvasContext.fillStyle = "white";
	canvasContext.textAlign = "left";
	canvasContext.textBaseline = 'middle';
		
	for (var i=0; i<shapes.length; i++) {
		if (shapes[i].active) {			
			highlight(legendFoodX, y, legendItemWidth, legendItemHeight);
		} else {
			border(x, y, legendItemWidth, legendItemHeight);
		}
		
		drawSprite (i, spriteScale, legendFoodX + spriteOffset , y + spriteOffset);
		
		canvasContext.fillText(ItemNames[shapes[i].desc], x + (spriteOffset *3) , y + legendItemHeight/2);
				
		y += legendItemHeight;
	}	
}


var options = [ 
	{id:1, text:"test option 1", default:true},
	{id:2, text:"test option 2", default:false},
];

function setOptions(list) {
	options = list;
	updateOptions();
}

function resetOptions() {
	for (var i=0; i<options.length; i++) {
		options[i].value = options[i].default;
	}
}


function drawOptionsLegend() {
	
	if (!showOptionsLegend) {
		return;
	}

	var x = legendOptionsX;
	var y = legendOptionsY;
	var textXOffset = shapeWidth / 2;
	var textYOffset = legendItemHeight/2;

	canvasContext.font = legendFont;
	canvasContext.textBaseline = 'middle';
		
	for (var i=0; i<options.length; i++) {
		if (options[i].value) {
			highlight(x, y, legendItemWidth, legendItemHeight);
		} else {
			border(x, y, legendItemWidth, legendItemHeight);
		}
		canvasContext.fillText(options[i].text, x + textXOffset, y + textYOffset);
		
		y += legendItemHeight * optionsOffset;
	}
}

function getOptionsUI(mx, my) {
	var x = legendOptionsX;
	var y = legendOptionsY;

	for (var i=0; i<options.length; i++) {
		if (mx >= x && mx <= x + legendItemWidth && my >= y  && my <= y + legendItemHeight) {
			return options[i];
		}
		y += legendItemHeight * optionsOffset;
	}

	return null;
}	

function testOptionsUI(mx, my) {
    var options = getOptionsUI(mx, my);

    if (options) {
        options.value = !options.value;
        return true
    }

    return false
}


function drawMapLegend() {
	
	if (!showMapLegend) {
		return;
	}
	
	var x = legendMapX;
	var y = legendMapY;
	
	var textXOffset = shapeWidth / 2;
	var textYOffset = legendItemHeight/2;

	canvasContext.font = legendFont;
	canvasContext.textBaseline = 'middle';
	
	for (var i=0; i<maps.length; i++) {

		if (maps[i].visible) {
			highlight(x, y, legendItemWidth, legendItemHeight);
		} else {
			border(x, y, legendItemWidth, legendItemHeight);
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

function setTipsOffset(x, y) {
	tipsX = x;
	tipsY = y;
}


function drawTips() {
	if (showTips) {
		canvasContext.font = legendFont;
		canvasContext.fillStyle = "white";
		canvasContext.textAlign = "left";
		var x = tipsX;
		var y = tipsY;
		
		for (var i=0; i<tipsText.length; i++, y+=legendItemHeight) {
			canvasContext.fillText(tipsText[i], x, y);
		}
	}
}


function drawLegend() {
	drawFoodLegend();
	drawMapLegend();
	drawOptionsLegend();
	drawTips();
}
