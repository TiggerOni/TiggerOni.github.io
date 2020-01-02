// KaraData.js
//
// Part of the KaraFood.io food app for Karazhan.
// Written by TiggerOni
// For the Jenafur project for the Wow Secrets Discord.
// All rights reserved.


var KaraLocations = [
	// {x:100, y:100, desc:"upper left"},
	// {x:125, y:200, desc:"somewhere in the middle"},
	// {x:300, y:100, desc:"along the top"},
	
	// {x:600, y:500, desc:"more in the middle"},	
	// {x:800, y:200, desc:"right side"},
	// {x:400, y:300, desc:"above the middle"},
	
	// {x:900, y:900, desc:"lower right"},
	// {x:100, y:900, desc:"lower left"},
	// {x:450, y:450, desc:"just left of middle"},
	// {x:300, y:300, desc:"towards the upper left"},
	
	
// These coordinates are pulled from the layers of Llianthta's map. 
// Each coordinate needs to be the center exact point, so the pluses are half the layer size.
// Todo: add the place descriptions from the docs for each location point
	
//Yeasty Hunk
	{x:1619+9, y:408+9, desc:""},	//17x17	=> 9x9
	{x:1338+9, y:342+9, desc:""},		
	{x:1513+9, y:1245+9, desc:""},
	{x:1553+9, y:768+9, desc:""},  	
//Stale Loaf
	{x:1735+13, y:596+13, desc:""},
	{x:1763+13, y:995+13, desc:""},	//26x26	=> 13x13
	{x:1618+13, y:1329+13, desc:""},
	{x:1463+13, y:693+13, desc:""},
//Dusty Bun
	{x:1667+9, y:165+9, desc:""},	//18x17	=> 9x9
	{x:1083+9, y:299+9, desc:""},
	{x:1442+9, y:877+9, desc:""},
	{x:1635+9, y:1047+9, desc:""},
//Cross Bun
	{x:1919+11, y:809+12, desc:""},	//22x23	=> 11x12
	{x:1880+11, y:938+12, desc:""},
	{x:1610+11, y:1002+12, desc:""},
	{x:1415+11, y:604+12, desc:""},
//Baguette
	{x:1804+10, y:595+13, desc:""},	//19x26	=> 10x13
	{x:1222+10, y:1162+13, desc:""},
	{x:1074+10, y:125+13, desc:""},
	{x:1840+10, y:70+13, desc:""},
	
//Slathered Rib
	{x:1572+9, y:732+9, desc:""},	//17x17	=> 9x9
	{x:2229+9, y:370+9, desc:""},
	{x:1554+9, y:738+9, desc:""},
	{x:1487+9, y:1350+9, desc:""},
//Meaty Morsel
	{x:1747+13, y:984+13, desc:""},	//26x26	=> 13x13
	{x:1867+13, y:390+13, desc:""},
	{x:1590+13, y:917+13, desc:""},
//Marbled Steak
	{x:1742+9, y:1421+9, desc:""},	//18x17	=> 9x9
	{x:1782+9, y:508+9, desc:""},
	{x:1991+9, y:435+9, desc:""},
	{x:2149+9, y:324+9, desc:""},
//Juicy Drumstick
	{x:2339+11, y:446+12, desc:""},
	{x:2279+11, y:278+12, desc:""},	//22x23	=> 11x12
	{x:1472+11, y:802+12, desc:""},
	{x:1622+11, y:1333+12, desc:""},
//Fishy Bits
	{x:1425+10, y:718+13, desc:""},
	{x:1901+10, y:1185+13, desc:""},	//19x26	=> 10x13
	{x:1996+10, y:348+13, desc:""},
	{x:1268+10, y:426+13, desc:""},
	
//Wilderbew Special
	{x:1552+9, y:404+9, desc:""},	//17x17	=> 9x9
	{x:2023+9, y:623+9, desc:""},
	{x:1707+9, y:861+9, desc:""},
	{x:1559+9, y:718+9, desc:""},
//Strongarm Stout
	{x:1686+13, y:683+13, desc:""},	//26x26	=> 13x13
	{x:1852+13, y:610+13, desc:""},
	{x:1655+13, y:1394+13, desc:""},
	{x:1454+13, y:696+13, desc:""},
//Karaweizen
	{x:2164+9, y:700+9, desc:""},	//18x17	=> 9x9
	{x:935+9, y:319+9, desc:""},
	{x:1076+9, y:448+9, desc:""},
	{x:1795+9, y:916+9, desc:""},
//Hoppy Mead
	{x:1971+11, y:1099+12, desc:""},	//22x23	=> 11x12
	{x:1316+11, y:339+12, desc:""},
	{x:1222+11, y:493+12, desc:""},
	{x:1543+11, y:818+12, desc:""},
//Ghosty Pale Ale
	{x:1420+10, y:845+13, desc:""},	//19x26	=> 10x13
	{x:1434+10, y:873+13, desc:""},
	{x:1941+10, y:1153+13, desc:""},
	{x:1028+10, y:537+13, desc:""},
	
//Old Apple
	{x:2322+9, y:721+9, desc:""},
	{x:1926+9, y:806+9, desc:""},	//17x17	=> 9x9
	{x:1347+9, y:302+9, desc:""},
	{x:1738+9, y:1378+9, desc:""},
//Orange Orange
	{x:1905+13, y:408+13, desc:""},
	{x:1591+13, y:1114+13, desc:""},	//26x26	=> 13x13
	{x:1444+13, y:1445+13, desc:""},
	{x:1471+13, y:481+13, desc:""},
//Lost Watermelon
	{x:2437+9, y:530+9, desc:""},	//18x17	=> 9x9
	{x:1311+9, y:490+9, desc:""},
	{x:667+9, y:426+9, desc:""},
	{x:1620+9, y:1170+9, desc:""},
//Hidden Banana
	{x:1266+11, y:313+12, desc:""},	//22x23	=> 11x12
	{x:1408+11, y:761+12, desc:""},
	{x:1443+11, y:869+12, desc:""},
	{x:1967+11, y:1077+12, desc:""},
//Bunch of Berries
	{x:2192+10, y:257+13, desc:""},	//19x26	=> 10x13
	{x:1278+10, y:925+13, desc:""},
	{x:1318+10, y:752+13, desc:""},
	{x:1279+10, y:595+13, desc:""},
	
//Pedestals
	{x:2209+12, y:476+12, desc:""},	//24x24	=> 12x12
	{x:2155+12, y:535+12, desc:""},
	{x:1586+12, y:900+12, desc:""},
	{x:1409+12, y:802+12, desc:""},
	{x:1412+12, y:739+12, desc:""},
	{x:1246+12, y:591+12, desc:""},
	{x:1114+12, y:613+12, desc:""},
	{x:1157+12, y:212+12, desc:""},
	{x:1283+12, y:264+12, desc:""},
	
//Kibbles
	{x:1221+4, y:306+12, desc:""},	//7x24	=> 4x12
	{x:1127+4, y:284+12, desc:""},

//Crystals
	{x:1367+14, y:1508+12, desc:""},	//28x24	=> 14x12
	{x:1283+14, y:758+12, desc:""},
	{x:2225+14, y:417+12, desc:""},
	{x:2255+14, y:190+12, desc:""},
	{x:1025+14, y:392+12, desc:""},
];



var KaraItems = [
	// {id:STALE_LOAF, startLocID:0, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	// {id:STALE_LOAF, startLocID:2, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	// {id:STALE_LOAF, startLocID:3, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	// {id:STALE_LOAF, startLocID:1, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
		
	// {id:JUICY_DRUMSTICK, startLocID:4, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	// {id:JUICY_DRUMSTICK, startLocID:5, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	// {id:JUICY_DRUMSTICK, startLocID:7, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},
	// {id:JUICY_DRUMSTICK, startLocID:6, currLocID:-1, targetLocID:-1, scale:0.5, x:0, y:0},	
	
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
];


var KaraShapes = [
//	{items:[0,1,2,3], lines:[], lineColor:RGB_PALE_BLUE, defaultActive: true, active:false},
//	{items:[4,5,6,7], lines:[], lineColor:RGB_PALE_PINK, defaultActive: true, active:false},

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
	{items:[24,25,26], lines:[], lineColor:RGB_PALE_PINK, defaultActive: false, active:false, desc:6},
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
	{items:[88, 89], lines:[], lineColor:RGB_PALE_GREEN, defaultActive: false, active:false, desc:21},

//Crystals
	{items:[90, 91, 92, 93, 94], lines:[], lineColor:RGB_LAVENDER, defaultActive: false, active:false, desc:22},
];



var helpText = [
	"These foods are visible in Return to Karazhan if you've talked to Amara Lunastar.",
	"All nodes represent foods in RtK in their best known spawn locations.",
	"",
	"This works like the ley line maps in Nazjatar.",
	"If a line is red, it's crossing another line.",
	"",
	"Click on a food name to toggle its shape.",
	"Click on an active node in a shape to select it.",
	"Click on a second node to swap nodes.",
	"Click on a selected node to deselect it.",
	"Shift click on a node in a shape to bring it to the top.",
	"    (Useful if there\'s a shape on top that's making it hard to click)",
	"Allow Inactive Swaps allows you to click on a node that's not part of an active shape.",
	"",
	"\'r\' resets the board.",
	"\'m\' toggles all the meats.",
	"\'d\' toggles all the drinks.",
	"\'b\' toggles all the breads.",
	"\'f\' toggles all the fruits.",
	"",
	"Most browsers support Ctrl + scrollwheel to zoom in and out.",
	"Ctrl + and Ctrl - allows zooming also.",
	"",
	"Any key press closes this help."
];


var creditText = [
	"KaraFood.io",
	"",
	"Programmed by TiggerOni",
	"",
	"Maps by TiggerOni and Llanthta",
	"",
	"Credit due to whoever made the original map.",
	"",
	"",
	"Part of the WoW secrets Jenefur discord group.",
	"",
	"",
	"Any key press closes these credits."
];