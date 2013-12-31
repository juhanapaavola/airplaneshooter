game.ShipSmallEntity = me.ObjectEntity.extend({
	canFire: true,
	energy: 2,
	fireRate: 1500,

   	init: function(x, y, settings) {
		this.parent(x, y, settings);
 
        this.setVelocity(4, 2);
        //this.vel.y = game.data.scrollVel;        
        this.vel.y = 0;
        this.gravity = 0;
        this.type = game.types.SHIP_SMALL;
        this.collidable = true;
		this.renderable.addAnimation("default",[0,1,2,3,4]);
		this.renderable.addAnimation("hit",[5,6,7,8,9]);
		this.renderable.setCurrentAnimation("default");
		this.score = 550;
   },

	update:function(){				
		var update = game.isVisible(this);
		
		if(this.canFire && game.debug.enemyShoot){
			var min = 0;
			var max = 5;
			var val = Math.floor(Math.random() * (max - min + 1)) + min;
			if(val<3){
				val = val*-1;
			}

			var bullet = new game.BulletSingleEntity(this.pos.x+27,this.pos.y+59,{image:'bullet_single',spritewidth:18,vel:this.vel.y+4,velx:val});
			var that = this;
			me.game.add(bullet,this.z+1);
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
			this.updateMovement();
			this.parent();
		}
		return update;
	},

	onCollision:function(res,obj){
		var that = this;
		if(obj.type===game.types.PLAYER_BULLET){
			this.energy--;
			if(this.energy<1){
				this.alive = false;				
				this.renderable.setCurrentAnimation("hit",(function(){
					var starty=20;
					var explosion = null;
					for(var i=0;i<2;i++){
						explosion = me.entityPool.newInstanceOf("explosion",that.pos.x,that.pos.y+starty,{image:'explosion',spritewidth:64,spriteheight:64},that.vel);
						me.game.add(explosion,that.z+1);						
						starty+=64;
					}
					
					if(game.debug.playSFX){
						me.audio.play('WaterSurfaceExplosion01');
					}
					game.data.score+=that.score;

					that.renderable.flicker(15,function(){
						me.game.remove(that);						
					});				
				}).bind(that));				
			}
		}
	}
});