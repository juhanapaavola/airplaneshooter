
game.LevelEndEntity = me.ObjectEntity.extend({
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.collidable=true;
		this.gravity=0;
		this.type = game.types.LEVEL_END;
		this.score = 2500;
	},

	update:function(){		
		var res = me.game.collide(this);
		if(this.collidable){
	        if(res){
				if(res.obj.type===game.types.PLAYER){
					game.data.level++;					
					game.data.score+=this.score;
    	        	this.collectable = false;
        		    this.collidable = false;
        		    me.state.change(me.state.READY);
					return false;
			    }
		    }
		}

		this.updateMovement();
		return true;
	}
});

