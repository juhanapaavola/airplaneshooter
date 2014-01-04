game.PlayerBulletEntity = me.ObjectEntity.extend({

	init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(17, 17);
        this.vel.y=-10;
        this.gravity=0;
        this.collidable = true;
        this.type = game.types.PLAYER_BULLET;
	},

    isVisible:function(){
        var wtl = me.game.viewport.worldToLocal(this.pos.x,this.pos.y);
        if(wtl.y<3){
			me.game.remove(this);
            return false;
        }
   		if(this.pos.y>10){
			me.game.remove(this);
            return false;
		}
        if(this.pos.x+this.width<=0 || this.pos.x>=(me.game.viewport.width-1)){
  		  	me.game.remove(entity);
		  	return false;
        }

        return true;
    },

	update:function(){
        var that = this;
		var update = this.isVisible();

		if(update){
	        var res = me.game.collide(this);
	        if(res){
	            console.log("PlayerBulletEntity res type: "+res.obj.type+" collide: "+this.type);
	            if(res.obj.type===game.types.ENEMY_P38 ||
					res.obj.type===game.types.AIRCRAFT_1 ||
					res.obj.type===game.types.AIRCRAFT_1B ||
					res.obj.type===game.types.AIRCRAFT_1C ||
					res.obj.type===game.types.AIRCRAFT_1D ||
					res.obj.type===game.types.AIRCRAFT_1E ||
	                res.obj.type===game.types.SHIP_LARGE ||
	                res.obj.type===game.types.SHIP_MEDIUM ||
	                res.obj.type===game.types.SHIP_SMALL
				){
	                me.game.remove(that);
	                return false;	                	
	            }
	        }
	        this.updateMovement();
	        if (this.vel.x!==0 || this.vel.y!==0) {
	            this.parent();
	            update = true;
	        }			
		}
        return update;
	}
});