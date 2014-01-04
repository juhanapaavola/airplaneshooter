game.LevelStartScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		if(game.debug.playBGM){
			me.audio.playTrack("round_end",0.5);			
		}
		if (this.title == null) {
            this.title = me.loader.getImage("title_screen");
        }

        if(this.font===null){
            this.font = new me.BitmapFont("32x32_font", 32);
        }
 
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		game.data.playerEnergy = game.data.playerEnergyStart;
		if(game.data.level>game.data.maxlevel){
           game.data.level = 1; 
        }
        setTimeout(function(){
            me.state.change(me.state.PLAY);
        },1500);
	},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.audio.stopTrack();
		me.input.unbindKey(me.input.KEY.ENTER);
	},

	init: function() {
        this.parent(true);

        this.title = null;
        this.font = null;
    },
 
    // update function
    update: function() {
    	// enter pressed ?
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        }
        return true;
    },
 
    // draw function
    draw: function(context) {
        me.video.clearSurface (context, "black");
        //context.drawImage(this.title, 0, 0);
        var msg = "LEVEL "+game.data.level;
        var x = (me.game.viewport.width-((msg.length)*32))/2;
        var y = 230;
        this.font.draw(context, msg, x, y);
        msg = "GET READY";
        x = (me.game.viewport.width-((msg.length)*32))/2;
        y+=40;
        this.font.draw(context, msg, x, y);
    }
});
