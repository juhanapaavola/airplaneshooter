game.Aircraft1dEntity = me.ObjectEntity.extend({
	canFire: true,
	fireRate: 1300,

	init: function(x, y, settings) {
		this.parent(x, y, settings);
        this.setVelocity(4, 2);
        this.vel.y = (game.data.scrollVel/2)*-1;
        if(this.pos.x<(me.game.viewport.width/2)){
			this.vel.x = 0.3;
        }else{
			this.vel.x = -0.2;
        }
        
        this.gravity = 0;
        this.type = game.types.AIRCRAFT_1D;
        this.collidable = true;
        this.spritewidth = 57;
        this.walkLeft = false;
		this.renderable.addAnimation("default",[0]);
		this.renderable.addAnimation("hit",[2,1]);
		this.renderable.setCurrentAnimation("default");
		this.score = 550;
	},

	update:function(){
		var update = game.isVisible(this);
		
		if(this.canFire && game.debug.enemyShoot){
			var bullet = me.entityPool.newInstanceOf("enemyBullet",this.pos.x+27,this.pos.y+59,{image:'bullet_single',spritewidth:18,vel:this.vel.y+1});
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

		if(update){
			var res = me.game.collide(this);
			this.updateMovement();
			if (this.vel.x!==0 || this.vel.y!==0) {
				this.parent();
				return true;
			}			
		}
		return update;
	},

	onCollision:function(res,obj){
		var that = this;
		if(obj.type===game.types.PLAYER_BULLET || obj.type===game.types.PLAYER){
			this.alive = false;
			this.renderable.setCurrentAnimation("hit",(function(){				
				var explosion = me.entityPool.newInstanceOf("explosion",that.pos.x-3,that.pos.y+1,{image:'explosion',spritewidth:64,spriteheight:64},that.vel);
				me.game.add(explosion,that.z+1);
				if(game.debug.playSFX){
					me.audio.play("WaterSurfaceExplosion01");					
				}
				game.data.score+=that.score;

				that.renderable.flicker(5,function(){
					me.game.remove(that);
					var min = 0;
					var max = 100;
					var val = Math.floor(Math.random() * (max - min + 1)) + min;
					if(val < 1){
    				    var heart = me.entityPool.newInstanceOf("extralife",that.pos.x+27,that.pos.y+17,{image:'life',spritewidth:32,spriteheight:32},that.vel);      
          				me.game.add(heart,that.z+1);
					}else if(val<5){
						var heart = me.entityPool.newInstanceOf("extraenergy",that.pos.x+12,that.pos.y+17,{image:'heart',spritewidth:32,spriteheight:32},that.vel);      
						me.game.add(heart,that.z+1);
					}
				});				
			}).bind(this));
		}
	}
});