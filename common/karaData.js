// KaraData.js
//
// Part of the KaraFood.io food app for Karazhan.
// Written by TiggerOni
// For the Jenafur project for the Wow Secrets Discord.
// All rights reserved.


// Note: we're sharing the location data from the leyLine app for convienience and maintainability.
// I probably should move all the data into a single shared file.


//  Adjusted on resize.  The scale of the window inner height relative to the hard size of the maps.
var appScale = 1.0;


// Common Options:

var showingMap = true;		// Not used.

var attachFoodToLayers = true;
var showInactiveLayers = true;
var showInactiveItems = false;

var showingHelp = true;
var showingCredits = false;




// The adds to each coordinate is half the sprite used to generate them.
// We want our point to be at the center of the sprite.
// GIMP exports the top left.  
// We have to factor in half the size of the sprite to get the map coordinates for each food.
var KaraLocations = [
// Yeasty Hunk		9x9
{ x:775+4, y:282+4, layer:GUEST },
{ x:653+4, y:247+4, layer:BALCONY },
{ x:732+4, y:680+4, layer:ENTRANCE },
{ x:736+4, y:463+4, layer:BANQUET },

// Stale Loaf,     9x9
{ x:840+4, y:372+4, layer:GUEST },
{ x:843+4, y:571+4, layer:UPPER_STAIR },
{ x:695+4, y:427+4, layer:BANQUET },
{ x:770+4, y:724+4, layer:KITCHEN },

// Dusty Bun	7x7
{ x:801+3, y:160+3, layer:GUEST },
{ x:521+3, y:232+3, layer:GUEST },
{ x:637+3, y:519+3, layer:BANQUET },
{ x:792+3, y:585+3, layer:ENTRANCE },

// Cross Bun	9x9
{ x:683+4, y:374+4, layer:GUEST },
{ x:780+4, y:560+4, layer:MENAGERIE},
{ x:904+4, y:478+4, layer:BANQUET },
{ x:894+4, y:531+4, layer:SERVANT },

// Baguette		15x13
{ x:529+7, y:159+6, layer:BALCONY },
{ x:892+7, y:116+6, layer:GUEST },
{ x:851+7, y:378+6, layer:BANQUET },
{ x:593+7, y:645+6, layer:MENAGERIE},


// Slathered Rib
{ x:1068+4, y:252+5, layer:SERVANT },	// 9x11
{ x:736+4, y:448+4, layer:BANQUET },	// 9x9
{ x:743+4, y:445+4, layer:BANQUET },	// 9x9
{ x:701+4, y:732+4, layer:KITCHEN },	// 9x9

// Meaty Morsel	11x11
{ x:769+5, y:527+5, layer:GUEST },
{ x:904+5, y:269+5, layer:GUEST },
{ x:833+5, y:568+5, layer:UPPER_STAIR },

// Marbled Steak
{ x:953+4, y:287+5, layer:SERVANT },	// 9x11
{ x:1045+3, y:240+3, layer:GUEST },		// 7x7
{ x:832+3, y:769+3, layer:SERVANT },	// 7x7
{ x:858+3, y:332+3, layer:GUEST },		// 7x7

// Juicy Drumstick	9x9
{ x:1103+4, y:219+4, layer:GUEST },
{ x:1138+4, y:302+4, layer:GUEST },
{ x:698+4, y:474+4, layer:BANQUET },
{ x:772+4, y:726+4, layer:SERVANT },

// Fishy Bits	15x13
{ x:674+7, y:437+6, layer:BANQUET },
{ x:904+7, y:650+6, layer:KITCHEN },
{ x:956+7, y:246+6, layer:GUEST },
{ x:618+7, y:291+6, layer:ENTRANCE },


//Wilderbew Special	9x9
{ x:738+4, y:432+4, layer:BANQUET },
{ x:748+4, y:278+4, layer:GUEST },
{ x:829+4, y:494+4, layer:ENTRANCE },
{ x:954+4, y:389+4, layer:BANQUET },

//Strongarm Stout	10x10
{ x:893+5, y:377+5, layer:GUEST },
{ x:691+5, y:422+5, layer:BANQUET },
{ x:818+5, y:497+5, layer:ENTRANCE },
{ x:786+5, y:754+5, layer:KITCHEN },

//Karaweizen	7x7
{ x:522+3, y:297+3, layer:GUEST },
{ x:449+3, y:238+3, layer:GUEST },
{ x:854+3, y:528+3, layer:BANQUET },
{ x:1050+3, y:416+3, layer:GUEST },

//Hoppy Mead
{ x:642+3, y:246+3, layer:BALCONY },	// 7x7
{ x:595+3, y:336+3, layer:ENTRANCE },	// 7x7
{ x:733+4, y:486+4, layer:BANQUET },	// 9x9
{ x:944+4, y:613+4, layer:SERVANT },	// 9x9

//Ghostly Pale Ale
{ x:503+7, y:347+6, layer:ENTRANCE },	// 15x13	
{ x:671+7, y:495+7, layer:BANQUET },	// 15x14
{ x:702+7, y:503+6, layer:ENTRANCE },	// 15x13	
{ x:925+7, y:635+6, layer:KITCHEN },	// 15x13


// Old Apple
{ x:663+4, y:231+4, layer:BALCONY },	// 9x9
{ x:927+4, y:475+5, layer:GUEST },		// 9x10
{ x:1128+4, y:432+4, layer:GUEST },		// 9x9
{ x:827+4, y:747+4, layer:SERVANT },	// 9x9

//	Orange Orange
{ x:710+6, y:313+6, layer:GUEST },		// 12x12
{ x:775+4, y:618+4, layer:LOWER_STAIR },	// 9x9
{ x:922+4, y:278+4, layer:GUEST },		// 9x9
{ x:687+4, y:777+4, layer:KITCHEN },	// 9x9

// Lost Watermelon	7x7
{ x:628+3, y:313+3, layer:SERVANT },	
{ x:771+3, y:646+3, layer:SERVANT },
{ x:320+3, y:288+3, layer:GUEST },
{ x:1180+3, y:336+3, layer:GUEST },

// Hidden Banana
{ x:617+3, y:235+3, layer:BALCONY },	// 7x7
{ x:686+4, y:451+4, layer:ENTRANCE },	// 9x9
{ x:684+4, y:508+4, layer:BANQUET },	// 9x9
{ x:940+4, y:605+4, layer:KITCHEN },	// 9x9

// Bunch of Berries	15x13
{ x:619+7, y:382+6, layer:BALCONY },
{ x:623+7, y:451+6, layer:BANQUET },
{ x:622+7, y:522+6, layer:MENAGERIE },
{ x:1060+7, y:203+6, layer:GUEST },


// Pedestals
{ x:556+5, y:182+5, layer:GUEST },		// 11x11
{ x:616+5, y:208+5, layer:GUEST },		// 11x11
{ x:536+5, y:382+5, layer:GUEST },		// 11x11
{ x:599+5, y:369+5, layer:GUEST },		// 11x11
{ x:671+4, y:445+4, layer:BANQUET },	// 9x9
{ x:669+4, y:474+4, layer:BANQUET },	// 9x9
{ x:768+4, y:521+4, layer:GUEST },		// 9x9
{ x:1071+5, y:314+5, layer:GUEST },		// 11x11
{ x:1043+5, y:345+5, layer:GUEST },		// 11x11

// Kibbles	7x7
{ x:540+3, y:226+3, layer:GUEST },
{ x:587+3, y:237+3, layer:GUEST },

// Crystals		11x11
{ x:496+5, y:271+5, layer:GUEST },		/* Opera */
{ x:610+5, y:451+5, layer:BANQUET }, 	/* Moros */
{ x:666+5, y:812+5, layer:MENAGERIE },	/* Curator */ 	
{ x:1074+5, y:276+5, layer:SERVANT },	/* Servants */ 
{ x:1099+5, y:171+5, layer:GUEST },		/* Guest */ 	

// Bosses	3x3
{ x:648, y:460, layer:BANQUET }, 		/* Moroes */
{ x:411, y:271, layer:GUEST },			/* Opera */
{ x:672, y:815, layer:MENAGERIE },		/* Curator */ 	
{ x:744, y:763, layer:SERVANT },		/* Huntsman */ 
{ x:1118, y:380, layer:GUEST },			/* Maiden */ 	
	

];


// Note: since we stored all the images in sequence, id for shape is the same for graphic and array index.
var KaraItems = [
	
//Yeasty Hunk
	{id:YEASTY_HUNK, startLocID:0, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:YEASTY_HUNK, startLocID:1, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:YEASTY_HUNK, startLocID:2, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:YEASTY_HUNK, startLocID:3, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Stale Loaf
	{id:STALE_LOAF, startLocID:4, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:STALE_LOAF, startLocID:5, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:STALE_LOAF, startLocID:6, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:STALE_LOAF, startLocID:7, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Dusty Bun
	{id:DUSTY_BUN, startLocID:8, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:DUSTY_BUN, startLocID:9, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:DUSTY_BUN, startLocID:10, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:DUSTY_BUN, startLocID:11, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Cross Bun
	{id:CROSS_BUN, startLocID:12, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:CROSS_BUN, startLocID:13, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:CROSS_BUN, startLocID:14, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:CROSS_BUN, startLocID:15, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Baguette
	{id:BAGUETTE, startLocID:16, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:BAGUETTE, startLocID:17, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:BAGUETTE, startLocID:18, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:BAGUETTE, startLocID:19, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	
//Slathered Rib
	{id:SLATHERED_RIB, startLocID:20, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:SLATHERED_RIB, startLocID:21, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:SLATHERED_RIB, startLocID:22, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:SLATHERED_RIB, startLocID:23, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Meaty Morsel
	{id:MEATY_MORSEL, startLocID:24, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:MEATY_MORSEL, startLocID:25, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:MEATY_MORSEL, startLocID:26, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Marbled Steak
	{id:MARBLED_STEAK, startLocID:27, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:MARBLED_STEAK, startLocID:28, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:MARBLED_STEAK, startLocID:29, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:MARBLED_STEAK, startLocID:30, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Juicy Drumstick
	{id:JUICY_DRUMSTICK, startLocID:31, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:JUICY_DRUMSTICK, startLocID:32, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:JUICY_DRUMSTICK, startLocID:33, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:JUICY_DRUMSTICK, startLocID:34, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Fishy Bits
	{id:FISHY_BITS, startLocID:35, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:FISHY_BITS, startLocID:36, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:FISHY_BITS, startLocID:37, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:FISHY_BITS, startLocID:38, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	
//Wilderbew Special
	{id:WILDERBEW_SPECIAL, startLocID:39, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:WILDERBEW_SPECIAL, startLocID:40, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:WILDERBEW_SPECIAL, startLocID:41, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:WILDERBEW_SPECIAL, startLocID:42, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Strongarm Stout
	{id:STRONGARM_STOUT, startLocID:43, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:STRONGARM_STOUT, startLocID:44, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:STRONGARM_STOUT, startLocID:45, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:STRONGARM_STOUT, startLocID:46, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Karaweizen
	{id:KARAWEIZEN, startLocID:47, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:KARAWEIZEN, startLocID:48, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:KARAWEIZEN, startLocID:49, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:KARAWEIZEN, startLocID:50, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Hoppy Mead
	{id:HOPPY_MEAD, startLocID:51, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:HOPPY_MEAD, startLocID:52, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:HOPPY_MEAD, startLocID:53, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:HOPPY_MEAD, startLocID:54, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Ghosty Pale Ale
	{id:GHOSTLY_ALE, startLocID:55, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:GHOSTLY_ALE, startLocID:56, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:GHOSTLY_ALE, startLocID:57, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:GHOSTLY_ALE, startLocID:58, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	
//Old Apple
	{id:OLD_APPLE, startLocID:59, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:OLD_APPLE, startLocID:60, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:OLD_APPLE, startLocID:61, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:OLD_APPLE, startLocID:62, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Orange Orange
	{id:ORANGE_ORANGE, startLocID:63, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:ORANGE_ORANGE, startLocID:64, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:ORANGE_ORANGE, startLocID:65, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:ORANGE_ORANGE, startLocID:66, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Lost Watermelon
	{id:LOST_WATERMELON, startLocID:67, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:LOST_WATERMELON, startLocID:68, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:LOST_WATERMELON, startLocID:69, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:LOST_WATERMELON, startLocID:70, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Hidden Banana
	{id:HIDDEN_BANANA, startLocID:71, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:HIDDEN_BANANA, startLocID:72, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:HIDDEN_BANANA, startLocID:73, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:HIDDEN_BANANA, startLocID:74, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
//Bunch of Berries
	{id:BUNCH_BERRIES, startLocID:75, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:BUNCH_BERRIES, startLocID:76, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:BUNCH_BERRIES, startLocID:77, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:BUNCH_BERRIES, startLocID:78, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	
//Pedestals	
	{id:PEDESTALS, startLocID:79, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:PEDESTALS, startLocID:80, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:PEDESTALS, startLocID:81, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:PEDESTALS, startLocID:82, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:PEDESTALS, startLocID:83, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:PEDESTALS, startLocID:84, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:PEDESTALS, startLocID:85, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:PEDESTALS, startLocID:86, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:PEDESTALS, startLocID:87, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	
//Kibbles
	{id:KIBBLES, startLocID:88, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:KIBBLES, startLocID:89, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},

//Crystals
	{id:CRYSTALS, startLocID:90, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:CRYSTALS, startLocID:91, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:CRYSTALS, startLocID:92, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:CRYSTALS, startLocID:93, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:CRYSTALS, startLocID:94, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},

	
// Bosses
	{id:BOSSES, startLocID:95, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:BOSSES, startLocID:96, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:BOSSES, startLocID:97, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:BOSSES, startLocID:98, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	{id:BOSSES, startLocID:99, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},

];

	


var KaraShapes = [

//Yeasty Hunk
	{items:[0,1,2,3], lines:[], lineColor:RGB_PALE_BLUE, defaultActive: false, active:false, desc:0},
//Stale Loaf
	{items:[4,5,6,7], lines:[], lineColor:RGB_PALE_BLUE, defaultActive: false, active:false, desc:1},
//Dusty Bun
	{items:[8,9,10,11], lines:[], lineColor:RGB_PALE_BLUE, defaultActive: false, active:false, desc:2},
//Cross Bun
	{items:[12,13,14,15], lines:[], lineColor:RGB_PALE_BLUE, defaultActive: false, active:false, desc:3},
//Baguette
	{items:[16,17,18,19], lines:[], lineColor:RGB_PALE_BLUE, defaultActive: false, active:false, desc:4},
	
//Slathered Rib
	{items:[20,21,22,23], lines:[], lineColor:RGB_PALE_PINK, defaultActive: false, active:false, desc:5},
//Meaty Morsel
	{items:[24,25,26], lines:[], lineColor:RGB_PALE_PINK, defaultActive: true, active:false, desc:6},
//Marbled Steak
	{items:[27,28,29,30], lines:[], lineColor:RGB_PALE_PINK, defaultActive: false, active:false, desc:7},
//Juicy Drumstick
	{items:[31,32,33,34], lines:[], lineColor:RGB_PALE_PINK, defaultActive: false, active:false, desc:8},
//Fishy Bits
	{items:[35,36,37,38], lines:[], lineColor:RGB_PALE_PINK, defaultActive: false, active:false, desc:9},
	
//Wilderbew Special
	{items:[39,40,41,42], lines:[], lineColor:RGB_PALE_CYAN, defaultActive: false, active:false, desc:10},	
//Strongarm Stout
	{items:[43,44,45,46], lines:[], lineColor:RGB_PALE_CYAN, defaultActive: false, active:false, desc:11},
//Karaweizen
	{items:[47,48,49,50], lines:[], lineColor:RGB_PALE_CYAN, defaultActive: false, active:false, desc:12},
//Hoppy Mead
	{items:[51,52,53,54], lines:[], lineColor:RGB_PALE_CYAN, defaultActive: false, active:false, desc:13},
//Ghosty Pale Ale
	{items:[55,56,57,58], lines:[], lineColor:RGB_PALE_CYAN, defaultActive: false, active:false, desc:14},
	
//Old Apple
	{items:[59,60,61,62], lines:[], lineColor:RGB_PALE_GREEN, defaultActive: false, active:false, desc:15},
//Orange Orange
	{items:[63,64,65,66], lines:[], lineColor:RGB_PALE_GREEN, defaultActive: false, active:false, desc:16},
//Lost Watermelon
	{items:[67,68,69,70], lines:[], lineColor:RGB_PALE_GREEN, defaultActive: false, active:false, desc:17},
//Hidden Banana
	{items:[71,72,73,74], lines:[], lineColor:RGB_PALE_GREEN, defaultActive: false, active:false, desc:18},
//Bunch of Berries
	{items:[75,76,77,78], lines:[], lineColor:RGB_PALE_GREEN, defaultActive: false, active:false, desc:19},
	
//Pedestals	
	{items:[79,80,81,82,83,84,85,86,87], lines:[], lineColor:RGB_PALE_ORANGE, defaultActive: false, active:false, desc:20},
	
//Kibbles
	{items:[88, 89], lines:[], lineColor:RGB_PALE_GREEN, defaultActive: true, active:false, desc:21},

//Crystals
	{items:[90, 91, 92, 93, 94], lines:[], lineColor:RGB_LAVENDER, defaultActive: true, active:false, desc:22},

//Bosses
	{items:[95, 96, 97, 98, 99], lines:[], lineColor:RGB_DARK_RED, defaultActive: true, active:true, desc:23},


];


