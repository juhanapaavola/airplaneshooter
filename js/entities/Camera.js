
game.CameraEntity = me.ObjectEntity.extend({
	addCloud: true,

	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.collidable=false;
		me.game.viewport.follow(this.pos,me.game.viewport.AXIS.VERTICAL);
		this.gravity=0;
		this.vel.y=game.data.scrollVel;
	},

	update:function(){		
		if(this.addCloud){
			var that = this;
			this.addCloud = false;
			
			var min = 1;
		    var max = 20;
    		var val = (Math.floor(Math.random() * (max - min + 1)) + min);
    		var timeout = val*1000;

			setTimeout(function(){				
				var cloud = me.entityPool.newInstanceOf("cloud",that.pos.x,that.pos.y-400,{image:'cloud',spritewidth:237,spriteheight:146});
				me.game.add(cloud,game.generateZIndex(5,10));
				
				if(val<5){
					setTimeout(function(){
						var cloud2 = me.entityPool.newInstanceOf("cloud",that.pos.x,that.pos.y-400,{image:'cloud',spritewidth:237,spriteheight:146});
						me.game.add(cloud2,game.generateZIndex(5,10));
						that.addCloud = true;
					},(timeout/2));
				}else{
					that.addCloud = true;
				}
			},timeout);			
		}
		this.updateMovement();
		return true;
	}
});