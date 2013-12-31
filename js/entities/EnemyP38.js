game.EnemyP38Entity = me.ObjectEntity.extend({
	canFire: true,
	fireRate: 1400,

    init: function(x, y, settings) {
		this.parent(x, y, settings);
 
		// set the default horizontal & vertical speed (accel vector)
		this.setVelocity(4, 2);
		this.vel.y = (game.data.scrollVel/2)*-1;
		if(this.pos.x<(me.game.viewport.width/2)){
			this.vel.x = 0.2;	
		}else{
			this.vel.x = -0.2;
  		}
        
		this.gravity = 0;
		this.type = game.types.ENEMY_P38;
		this.collidable = true;
		this.spritewidth = 87;
		this.walkLeft = false;
		this.score = 750;
	},

   	update:function(){
		var update = game.isVisible(this);

		if(this.canFire && game.debug.enemyShoot){
			var bullet = me.entityPool.newInstanceOf("enemyp38Bullet",this.pos.x+27,this.pos.y+59,{image:'p38bullet',spritewidth:32});
			var that = this;
			me.game.add(bullet,3);
			if(game.debug.playSFX){
				me.audio.play("GunShotGverb");				
			}
			this.canFire = false;
			setTimeout(function(){
				that.canFire = true;
			},this.fireRate);
		}
        
		var res = me.game.collide(this);

		if(update){
			if (this.vel.x!=0 || this.vel.y!=0) {
				this.updateMovement();			
				this.parent();
				update = true;
			}			
		}
		return update;
   	},

   	onCollision:function(res,obj){
   		var that = this;
   		if(obj.type===game.types.PLAYER_BULLET || obj.type===game.types.PLAYER){
			this.alive = false;
			var explosion = me.entityPool.newInstanceOf("explosion",this.pos.x+11,this.pos.y+1,{image:'explosion',spritewidth:64,spriteheight:64},this.vel);
			me.game.add(explosion,this.z+1);
			if(game.debug.playSFX){
				me.audio.play("WaterSurfaceExplosion01");				
			}

			this.renderable.flicker(5,function(){
				me.game.remove(that);
				game.data.score+=that.score;

				var min = 0;
				var max = 100;
				var val = Math.floor(Math.random() * (max - min + 1)) + min;
				if(val < 5){
					var heart = me.entityPool.newInstanceOf("extralife",that.pos.x+27,that.pos.y+17,{image:'life',spritewidth:32,spriteheight:32},that.vel);      
					me.game.add(heart,that.z+1);
				}else if(val<10){
					var heart = me.entityPool.newInstanceOf("extraenergy",that.pos.x+27,that.pos.y+17,{image:'heart',spritewidth:32,spriteheight:32},that.vel);      
					me.game.add(heart,that.z+1);
				}
        });   				   			
   		}
   	}
});