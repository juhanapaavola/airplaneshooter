game.CloudEntity = me.ObjectEntity.extend({
  targetOpacity:0,
  settings: null,

  init: function(x, y, settings) {
  	this.parent(x, y, settings);
 
    // set the default horizontal & vertical speed (accel vector)
    this.setVelocity(4, 2);

    var min = 1;
    var max = 10;
    var val = (Math.floor(Math.random() * (max - min + 1)) + min);

    this.vel.y = val/10;
    if(val<6){
      this.vel.x=(val/10)*-1;
    }else{
      this.vel.x = val/10;
    }
    this.targetOpacity = val/10;
    this.renderable.setOpacity(0);
    this.gravity = 0;
    this.type = game.types.CLOUD;
    this.collidable = false;
    this.addOpacity();
	this.settings = settings;
  },

	update:function(){
		var update = game.isVisible(this);
		
		this.updateMovement();
		if (this.vel.x!=0 || this.vel.y!=0) {
			this.parent();
			update = true;
		}
		return update;
 	},

  addOpacity:function(){
    var that = this;
    var current = this.renderable.getOpacity();
    if(current<=this.targetOpacity){
      setTimeout(function(){
        current+=0.1;
        if(that.renderable!==null){
          that.renderable.setOpacity(current);
          that.addOpacity();          
        }
      },100);      
    }
  }
});