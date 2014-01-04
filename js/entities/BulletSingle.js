game.BulletSingleEntity = me.ObjectEntity.extend({
    width:0,
	settings:null,
	init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(17, 17);
        this.vel.y=settings.vel;
        if(typeof(settings.velx)!=='undefined'){
            this.vel.x = settings.velx;
        }
        this.gravity=0;
        this.collidable = true;
        this.type = game.types.ENEMY_BULLET;
        this.width = settings.spritewidth;
		this.settings = settings;
	},

	update:function(){
        var that = this;
		var update = game.isVisible(this);
		
		if(this.pos.y<10){
			update = false;
			me.game.remove(this);
		}
		if(update){
	        var res = me.game.collide(this);
	        if(res){
	            if(res.obj.type===game.types.PLAYER){
	                me.game.remove(that);
	                return false;
	            }
	        }
	        this.updateMovement();

	        if (this.vel.x!==0 || this.vel.y!==0) {
	            this.parent();
	            return true;
	        }			
		}

        return update;

	}
});