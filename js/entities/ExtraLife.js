game.ExtraLifeEntity = me.ObjectEntity.extend({
   init: function(x, y, settings,vel) {
		this.parent(x, y, settings);
        this.setVelocity(4, 2);
        this.vel = vel;
        this.gravity = 0;
        this.type = game.types.EXTRA_LIFE;
        this.collidable = true;
        this.collectable = true;        
        this.score = 250;
   },

   	update:function(){
      var that = this;
	  var update = game.isVisible(this);
	  if(update){
		  if(this.collidable){
			  var res = me.game.collide(this);
			  if(res){
				  if(res.obj.type===game.types.PLAYER){
					  game.data.lives++;
					  game.data.score+=this.score;
					  me.audio.play("life_pickup");
					  this.collectable = false;
					  this.collidable = false;
					  this.renderable.flicker(5,function(){
						  me.game.remove(that);
						  me.game.sort();
					  });					
					  return false;
				  }
			  }
		  }
		  this.updateMovement();
	      if (this.vel.x!=0 || this.vel.y!=0) {
	          this.parent();
	          return true;
	      }	  	
	  }
	  return update;
	}
});