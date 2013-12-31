game.PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() { 
        var levelname = "level0"+game.data.level;
        me.levelDirector.loadLevel(levelname);
        game.data.scrollVel = game.data.scrollVelStart-(game.data.level/10);

        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
		if(game.debug.playBGM){
	        me.audio.playTrack("battleThemeA",0.5);			
		}
    },
     
    onDestroyEvent: function() {
        me.game.world.removeChild(this.HUD);
        me.audio.stopTrack();
    },
	
});