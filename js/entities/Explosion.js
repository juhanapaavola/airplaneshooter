game.ExplosionEntity = me.ObjectEntity.extend({

	init: function(x, y, settings,vel) {
        this.parent(x, y, settings);
        this.gravity=0;
        this.collidable = false;
        this.type = game.types.EXPLOSION;
        this.vel = vel;
        this.walkLeft = false;

        this.renderable.addAnimation("explosionanim",[22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],5);
        this.renderable.setCurrentAnimation("explosionanim");
	},

	update:function(){
        var that = this;
		var update = game.isVisible(this);

        if(this.renderable.getCurrentAnimationFrame()===22){
            me.game.remove(this);
            return false;
        }
		if(update){
	        this.updateMovement();
	        this.parent();			
		}
        return update;
	}
});