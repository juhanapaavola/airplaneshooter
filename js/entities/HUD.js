

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";
		
		// add our child score object at the top left corner
		this.addChild(new game.HUD.ScoreItem(me.game.viewport.width-10, 10));
		this.addChild(new game.HUD.LifeItem(10,10));
		this.addChild(new game.HUD.EnergyItem(130,10));
	}
});


/** 
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor
        // (size does not matter here)
        this.parent(new me.Vector2d(x, y), 10, 10);
         
        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
         
        // local copy of the global score
        this.score = -1;
 
        // make sure we use screen coordinates
        this.floating = true;
	},

	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		}
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function (context) {
		this.font.draw (context, game.data.score, this.pos.x, this.pos.y);
	}

});

game.HUD.LifeItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor
        // (size does not matter here)
        this.parent(new me.Vector2d(x, y), 10, 10);
         
        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
         
        // local copy of the global score
        this.lives = -1;
 
        // make sure we use screen coordinates
        this.floating = true;
        var plane = new game.HUD.PlaneSprite(x,y,{image:'plane_life',spritewidth:32,spriteheight:32});        
		me.game.add(plane);
	},

	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.lives !== game.data.lives) {	
			this.lives = game.data.lives;
			return true;
		}
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function (context) {
		var lives = game.data.lives;
		if(lives>9){
			lives = 9;
		}
		this.font.draw (context, lives, this.pos.x+40, this.pos.y);
	}

});

game.HUD.EnergyItem = me.Renderable.extend({	
	sprites:[],
	init: function(x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);
        this.playerEnergy = -1;
        this.floating = true;
		var step = 0;
		this.sprites=[];
		for(var i=0;i<game.data.playerEnergyStart;i++){
			var energy = new game.HUD.EnergySprite(x+step,y,{image:'energy_rect',spritewidth:32,spriteheight:32,energy:i});
			step+=34;
			me.game.add(energy);
			this.sprites.push(energy);
		}		
	},

	update : function () {
		if (this.playerEnergy !== game.data.playerEnergy) {				
			this.playerEnergy = game.data.playerEnergy;
			console.log("enenne: "+this.playerEnergy+" - "+game.data.playerEnergy+" - "+game.data.playerEnergyStart+" - "+this.sprites.length);

			for(var i=1;i<game.data.playerEnergyStart;i++){
				this.sprites[i].z=0;
			}
			
			for(var i=1;i<game.data.playerEnergy;i++){
				this.sprites[i].z=Infinity;
			}
			
			return true;
		}
		return false;
	},

	draw : function (context) {
	}
});

game.HUD.EnergySprite = me.ObjectEntity.extend({
	init:function(x,y,settings){
		this.parent(x,y,settings);		
		this.energy = settings.energy;
		this.gravity = 0;
		this.vel.x = 0;
		this.vel.y = 0;
		this.collidable = false;
		this.floating = true;
		this.z = Infinity;
	},
	update:function(){		
		if(this.z===0){
			return false;
		}else{
			this.parent();
			return true;
		}
	}
});

game.HUD.PlaneSprite = me.ObjectEntity.extend({
	init:function(x,y,settings){
		this.parent(x,y,settings);		
		this.gravity = 0;
		this.vel.x = 0;
		this.vel.y = 0;
		this.collidable = false;
		this.floating = true;
		this.z = Infinity;
	},
	update:function(){		
		if(this.z===0){
			return false;
		}else{
			this.parent();
			return true;
		}
	}
});
