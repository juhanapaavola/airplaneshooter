game.GameOverScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
    timeout:10000,

	onResetEvent: function() {	
		if(game.debug.playBGM){
			me.audio.playTrack("GameOver_II_2",0.5);			
		}
		if (this.title == null) {
            this.title = me.loader.getImage("title_screen");
        }

        if(this.font===null){
            this.font = new me.BitmapFont("32x32_font", 32);
        }

        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        setTimeout(function(){
            me.state.change(me.state.MENU);
        },this.timeout);
	},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.audio.stopTrack();
		me.input.unbindKey(me.input.KEY.ENTER);
        game.resetData();
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
            me.state.change(me.state.MENU);
        }
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
        var msg = "GAME OVER";
        var x = (me.game.viewport.width-((msg.length-1)*32))/2;
        this.font.draw(context, msg, x, 240);

        msg = "SCORE "+game.data.score;
        var x = (me.game.viewport.width-((msg.length-1)*32))/2;
        this.font.draw(context, msg, x, 300);
    }
});
