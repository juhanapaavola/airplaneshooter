game.EnemyP38BulletEntity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(17, 17);
        this.vel.y=7;
        this.gravity=0;
        this.collidable = true;
        this.type = game.types.ENEMY_BULLET;
	},
	
	update:function(){
        var that = this;
		var update = game.isVisible(this);

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