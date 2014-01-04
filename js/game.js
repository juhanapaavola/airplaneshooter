/* game namespace */
var game = {
	debug:{
		enemyShoot: true,
		playBGM:true,
		playSFX:true
	},
	
    data : {
        score : 0,
        lives: 3,
        scrollVelStart: -4,
        scrollVel: -4,
        playerEnergyStart: 5,
		playerEnergy: 0,
        level: 1,
        maxlevel: 3
    },
    
    types:{
		ENEMY_P38:'ENEMY_P38',
		PLAYER:'PLAYER',
		ENEMY_BULLET:'ENEMY_BULLET',
		PLAYER_BULLET:'PLAYER_BULLET',
		EXPLOSION:'EXPLOSION',
		EXTRA_LIFE:'EXTRA_LIFE',
		EXTRA_ENERGY:'EXTRA_ENERGY',
		AIRCRAFT_1:'AIRCRAFT_1',
		AIRCRAFT_1B:'AIRCRAFT_1B',
		AIRCRAFT_1C:'AIRCRAFT_1C',
		AIRCRAFT_1D:'AIRCRAFT_1D',
		AIRCRAFT_1E:'AIRCRAFT_1E',
		CLOUD:'CLOUD',
		LEVEL_END:'LEVEL_END',
		SHIP_LARGE:'SHIP_LARGE',
		SHIP_MEDIUM:'SHIP_MEDIUM',
		SHIP_SMALL:'SHIP_SMALL'
    },

    resetData:function(){
    	console.log("resetData");
    	this.data.score = 0;
    	this.data.lives = 3;
    	this.data.scrollVel = game.data.scrollVelStart;
    	this.data.playerEnergy = game.data.playerEnergyStart;
        this.data.level = 1;
    },

    // Run on page load.
    "onload" : function () {
 
        // Initialize the video.
        if (!me.video.init("screen", 800, 600, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
         
        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }
 
        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
      
        // Load the resources.
        me.loader.preload(game.resources);
 
        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
 
 
 
    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.READY, new game.LevelStartScreen());
        me.state.set(me.state.GAMEOVER, new game.GameOverScreen());
        me.state.transition("fade", "#000000", 250);

 		me.entityPool.add("mainCamera", game.CameraEntity); 
 		me.entityPool.add("mainPlayer", game.PlayerEntity);
		me.entityPool.add("enemy_p38", game.EnemyP38Entity);
		me.entityPool.add("aircraft1", game.Aircraft1Entity);
		me.entityPool.add("aircraft1b", game.Aircraft1Entity);
		me.entityPool.add("aircraft1c", game.Aircraft1Entity);
		me.entityPool.add("aircraft1d", game.Aircraft1Entity);
		me.entityPool.add("aircraft1e", game.Aircraft1Entity);
        me.entityPool.add("levelend", game.LevelEndEntity);
        me.entityPool.add("shiplarge", game.ShipLargeEntity);
        me.entityPool.add("shipmedium", game.ShipMediumEntity);
        me.entityPool.add("shipsmall", game.ShipSmallEntity);
		me.entityPool.add("explosion", game.ExplosionEntity);
		me.entityPool.add("playerBullet", game.PlayerBulletEntity);
		me.entityPool.add("enemyBullet", game.BulletSingleEntity);
		me.entityPool.add("enemyp38Bullet", game.EnemyP38BulletEntity);
		me.entityPool.add("extralife", game.ExtraLifeEntity);
		me.entityPool.add("extraenergy", game.ExtraEnergyEntity);
		me.entityPool.add("cloud", game.CloudEntity);
		
 		// enable the keyboard
   		me.input.bindKey(me.input.KEY.LEFT,  "left");
   		me.input.bindKey(me.input.KEY.RIGHT, "right");
   		me.input.bindKey(me.input.KEY.X,'shoot');

        // Start the game.
		me.state.change(me.state.MENU);
        me.debug.renderHitBox = true;
    },

	onDestroyEvent: function() {
    	me.audio.stopTrack();
	},

    generateZIndex:function(min,max){
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    },

    isVisible:function(entity){
        var wtl = me.game.viewport.worldToLocal(entity.pos.x,entity.pos.y);
        if(wtl.y>me.game.viewport.height-5){
  		  me.game.remove(entity);
		  return false;
        }
        if(entity.pos.x+entity.width<=0 || entity.pos.x+entity.width>=(me.game.viewport.width-1)){
  		  me.game.remove(entity);
		  return false;
        }
        return true;
    }
};

me.sys.fps = 30;
