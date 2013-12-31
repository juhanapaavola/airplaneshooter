game.TitleScreen = me.ScreenObject.extend({

	onResetEvent: function() {	
		if(game.debug.playBGM){
			me.audio.playTrack("Menu_Theme_0");			
		}
		if (this.title == null) {
            this.title = me.loader.getImage("title_screen");
        }

        if(this.font===null){
            this.font = new me.BitmapFont("32x32_font", 32);
        }
 
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	},
		
	onDestroyEvent: function() {
		me.audio.stopTrack();
		me.input.unbindKey(me.input.KEY.ENTER);
    },

	init: function() {
        this.parent(true);
        this.title = null;
        this.font = null;
    },
 
    update: function() {
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.READY);
        }
        return true;
    },
 
    draw: function(context) {
    	context.drawImage(this.title, 0, 0);
		var msg = "AIRPLANE SHOOTER";
		var x = (me.game.viewport.width-((msg.length)*32))/2; 
		var y = 40;
		this.font.draw(context, msg, x, y);

        msg = "PRESS ENTER TO PLAY";
        x = (me.game.viewport.width-((msg.length)*32))/2; 
        y = 240;
        this.font.draw(context, msg, x, y);

        msg = "ARROW LEFT AND RIGHT";
        x = (me.game.viewport.width-((msg.length)*32))/2; 
        y += 40;
        this.font.draw(context, msg, x, y);

        msg = "TO STEER THE PLANE";
        x = (me.game.viewport.width-((msg.length)*32))/2; 
        y += 40;
        this.font.draw(context, msg, x, y);

        msg = "X TO SHOOT";
        x = (me.game.viewport.width-((msg.length)*32))/2; 
        y += 40;
        this.font.draw(context, msg, x, y);
		
		
        msg = "2013 - JUHANA PAAVOLA";
        x = (me.game.viewport.width-((msg.length)*32))/2; 
		y = me.game.viewport.height-40;
        this.font.draw(context, msg, x, y);
    }
});
