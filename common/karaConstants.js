// KaraConstants.js
//
// Part of the KaraFood.io food app for Karazhan.
// Written by TiggerOni
// For the Jenafur project for the Wow Secrets Discord.
// All rights reserved.

var shapeWidth = 36;
var shapeHeight = 36;

var shapeCount = 24;

const spriteSize = 36;

var scaleDisabled = 0.33;	
var scaleNormal = 0.50;
var scaleSelected = 0.75;


const appWidth = 1600;
const appHeight = 1100;
const appRatio = (appWidth/appHeight);


// ItemIDs
// Note: same order as symbolSheet.png
const YEASTY_HUNK = 0;
const STALE_LOAF = 1;
const DUSTY_BUN = 2;
const CROSS_BUN = 3;
const BAGUETTE = 4;

const SLATHERED_RIB = 5;
const MEATY_MORSEL = 6;
const MARBLED_STEAK = 7;
const JUICY_DRUMSTICK = 8;
const FISHY_BITS = 9;

const WILDERBEW_SPECIAL = 10;
const STRONGARM_STOUT = 11;
const KARAWEIZEN = 12;
const HOPPY_MEAD = 13;
const GHOSTLY_ALE = 14;

const OLD_APPLE = 15;
const ORANGE_ORANGE = 16;
const LOST_WATERMELON = 17;
const HIDDEN_BANANA = 18;
const BUNCH_BERRIES = 19;

const PEDESTALS = 20;
const KIBBLES = 21;
const CRYSTALS = 22;

const BOSSES = 23;

// Order of item names is the same as the ItemID list.
var ItemNames = [
	"Yeasty Hunk",
	"Stale Loaf",
	"Dusty Bun",
	"Cross Bun",
	"Baguette",
	
	"Slathered Rib",
	"Meaty Morsel",
	"Marbled Steak",
	"Juicy Drumstick",
	"Fishy Bits",
	
	"Wilderbew Special",
	"Strongarm Stout",
	"Karaweizen",
	"Hoppy Mead",
	"Ghostly Pale Ale",
	
	"Old Apple",
	"Orange Orange",
	"Lost Watermelon",
	"Hidden Banana",
	"Bunch of Berries",
	
	"Pedestals",
	"Kibbles",
	"Crystals",
	"Bosses",
];

var lineColors = [
	'rgb(255, 0, 0)',			// RED/ERROR
	'rgb(108, 112, 255)',		// light blue
	'rgb(249, 125, 255)',		// light pink
	'rgb(124, 250, 247)',		// light cyan
	'rgb(130, 253, 123)',		// light green
	'rgb(255, 167, 108)',		// pale orange
	'rgb(128, 0, 255)',			// lavender	
	'rgb(255, 255, 255)',		// white
	'rgba(0,0,0,0)',			// transparent
	'rgb(160, 0, 0)',			// dark red
];

const RGB_ERROR = 0;
const RGB_RED = 0;
const RGB_PALE_BLUE = 1;
const RGB_PALE_PINK = 2;
const RGB_PALE_CYAN = 3;
const RGB_PALE_GREEN = 4;
const RGB_PALE_ORANGE = 5;
const RGB_LAVENDER = 6;
const RGB_WHITE = 7;
const RGB_TRANSPARENT = 8;
const RGB_DARK_RED = 9;
