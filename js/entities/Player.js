game.PlayerEntity = me.ObjectEntity.extend({
 
    border: {
        maxPosX:0,
        minPosX:0,
    },
    energy: game.data.playerEnergy,
	timeStamp:0,

    init: function(x, y, settings) {
        this.parent(x, y, settings);
 
        this.setVelocity(8, 7);
 
        this.falling = false;
        this.jumping = false;
        this.vel.y=game.data.scrollVel;
        this.gravity = 0;
        this.border.maxPosX = me.game.viewport.width-settings.spritewidth;
        this.border.minPosX = 0;
        this.pos.x = (me.game.viewport.width-(settings.spritewidth/2))/2;
        this.pos.y = settings.y;
        this.updateColRect(8, 68, 5, 30);
        this.type = game.types.PLAYER;

        this.renderable.addAnimation("full",[4]);
        this.renderable.addAnimation("damage3",[3]);
        this.renderable.addAnimation("damage2",[2]);
        this.renderable.addAnimation("damage1",[1]);
        this.renderable.addAnimation("damage0",[0]);
        this.renderable.setCurrentAnimation("full");
        this.z = 5;
		this.timeStamp = me.timer.getTime();
    },
 
    update: function() {
        if (me.input.isKeyPressed('left')) {
            var tmp = this.vel.x - this.accel.x * me.timer.tick;
            if((this.pos.x-tmp)>this.border.minPosX){
                this.vel.x -= this.accel.x * me.timer.tick;
            }
        } else if (me.input.isKeyPressed('right')) {
            var tmp = this.vel.x + this.accel.x * me.timer.tick;
            if((this.pos.x+tmp)<this.border.maxPosX){
                this.vel.x += this.accel.x * me.timer.tick;
            }
        } else {
            this.vel.x = 0;
        }
        
        
        if(me.input.isKeyPressed('shoot')){
			var delta = me.timer.getTime()-this.timeStamp;
			if(delta>=300){
				this.timeStamp = me.timer.getTime();
	            var bullet = me.entityPool.newInstanceOf("playerBullet",this.pos.x+27,this.pos.y-20,{image:'bullet',spritewidth:32});
	            var that = this;
	            me.game.add(bullet,this.z+1);
				if(game.debug.playSFX){
		            me.audio.play("GunShotGverb");				
				}				
			}
        }

        var res = me.game.collide(this);
        this.updateMovement();

        if (this.vel.x!=0 || this.vel.y!=0) {
            this.parent();
            return true;
        }
        return false;
    },

    onCollision:function(res,obj){
        //console.log("PlayerEntity:onCollision: "+obj.type);
        var that = this;
        if(obj.type!==game.types.EXTRA_LIFE && obj.type!==game.types.EXTRA_ENERGY && obj.alive){
            if(game.data.playerEnergy<1){
                var explosion = me.entityPool.newInstanceOf("explosion",that.pos.x+11,that.pos.y+1,{image:'explosion',spritewidth:64,spriteheight:64},that.vel);
                me.game.add(explosion,that.z+1);
				if(game.debug.playSFX){
	                me.audio.play("WaterSurfaceExplosion01");					
				}

                that.renderable.flicker(5,function(){
                    me.game.remove(that);
                    game.data.lives--;
                    if(game.data.lives<1){
                        me.state.change(me.state.GAMEOVER);
                    }else{                    
                        me.state.change(me.state.READY);
                    }
                });                            
            }else{
                game.data.playerEnergy--;
                var animName = "damage"+this.energy;
                this.renderable.setCurrentAnimation(animName); 
            }
        }
    }

});