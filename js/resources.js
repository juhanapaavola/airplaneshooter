game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	 {name: "title_screen", type:"image", src: "data/img/gui/020903-o-9999b-059.jpg"},


	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
	 */	
	{name: "battleThemeA", type: "audio", src: "data/bgm/", channel : 1},
	{name: "Menu_Theme_0", type: "audio", src: "data/bgm/", channel : 1},
	{name: "GameOver_II_2", type: "audio", src: "data/bgm/", channel : 1},
	{name: "round_end", type: "audio", src: "data/bgm/", channel : 1},


	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
	 */
	{name: "WaterSurfaceExplosion01", type: "audio", src: "data/sfx/qubodup-WaterSurfaceExplosions-cc0/qubodup-WaterSurfaceExplosions-cc0/", channel : 2},
	{name: "GunShotGverb", type: "audio", src: "data/sfx/qubodup-NavalBattleAndWaterSurfaceExplosionsSoundSet-cc0-OGG/qubodup-NavalBattleAndWaterSurfaceExplosionsSoundSet-cc0-OGG/", channel : 2},
	{name: "life_pickup", type: "audio", src: "data/sfx/", channel : 3},
	
	  /**
     * Graphics.
     */
    // our level tileset
	{name: "ground_32x32",  type:"image", src: "data/img/map/ground_32x32.png"},
	{name: "water_32x32",  type:"image", src: "data/img/map/water/water_32x32.png"},

    /*
     * Maps.
     */
	{name: "level01", type: "tmx", src: "data/map/level01.tmx"},
	{name: "level02", type: "tmx", src: "data/map/level02.tmx"},
	{name: "level03", type: "tmx", src: "data/map/level03.tmx"},

    /* player plane */
    {name: "playerplane", type:"image", src: "data/img/sprite/p38/P38_player_anim.png"},

	/* bullets */
    {name: "bullet", type:"image", src: "data/img/sprite/player_bullet.png" },
	{name: "p38bullet", type:"image", src: "data/img/sprite/bullet.png" },
    {name: "bullet_single", type:"image", src: "data/img/sprite/bullet_single.png" },
	
	/* collectibles, etc.. */
	{name: "explosion", type:"image", src: "data/img/sprite/explosions/images/explosion/expl_03_combined.png"},
    {name: "cameraImage", type:"image", src: "data/img/sprite/camera.png" },
    {name: "levelendImage", type:"image", src: "data/img/sprite/levelend.png" },
    {name: "heart", type:"image", src: "data/img/sprite/heart/hearts_01_32x32.png" },
    {name: "life", type:"image", src: "data/img/sprite/1up/1up32px_10.png" },
    {name: "cloud", type:"image", src: "data/img/sprite/clouds/cloud.png" },
    
	/* Enemy aircrafts */
	{name: "enemy_p38", type:"image", src: "data/img/sprite/enemy_p38/P38_combined.png"},
	{name: "aircraft1", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_1.png" },
	{name: "aircraft1e", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_1e.png" },
	{name: "aircraft2d", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_2d.png" },
	{name: "aircraft3d", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_3d.png" },
	{name: "aircraft1b", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_1b.png" },
	{name: "aircraft2", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_2.png" },
	{name: "aircraft2e", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_2e.png" },
	{name: "aircraft3e", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_3e.png" },
	{name: "aircraft1c", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_1c.png" },
	{name: "aircraft2b", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_2b.png" },
	{name: "aircraft3", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_3.png" },
	{name: "aircraft1d", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_1d.png" },
	{name: "aircraft2c", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_2c.png" },
	{name: "aircraft3b", type:"image", src: "data/img/sprite/aircrafts_0/images/aircraft_combined_3b.png" },
	
	/* enemy ships */
	{name: "shiplarge", type:"image", src: "data/img/sprite/ship_large/ship_large.png" },
	{name: "shipmedium", type:"image", src: "data/img/sprite/ship_medium/ship_medium.png" },
	{name: "shipsmall", type:"image", src: "data/img/sprite/ship_small/ship_small.png" },

	/* gui */
	{name: "energy_rect", type:"image", src: "data/img/gui/green_rect.png" },
    {name: "plane_life", type:"image", src: "data/img/gui/P38_gui.png" },
	
	/* font */
    {name: "32x32_font", type:"image", src: "data/img/font/32x32_font.png"}

];
