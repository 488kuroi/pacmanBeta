var Pacman = function() {

  pakky = this;

  this.alive = 'alive';
  this.color = '#ffa230';
  this.x = 100;
  this.y = 280;
  this.mouthOpenValue = 40;
  this.upperLips = 40;
  this.lowerLips = 40;
  this.bodyRadius = 15;
  this.open = 1;
  this.closed = -1;
  this.right = 1;
  this.left = -1;
  this.up = -1;
  this.down = 1;
  this.speed = 3;
  this.normalSpeed = 3;
  this.oldDirection = 'RIGHT';
  this.frontDirection = {};
    this.frontDirection.right = function(){ c.arc( pakky.x,
                                                   pakky.y,
                                                   pakky.bodyRadius,
                                                   (Math.PI / 180) * pakky.mouthOpenValue,
                                                   (Math.PI / 180) * (360 - pakky.mouthOpenValue) );
                                            pakky.x += ( pakky.speed * pakky.right );
                      };
    this.frontDirection.left = function(){ c.arc( pakky.x,
                                                  pakky.y,
                                                  pakky.bodyRadius,
                                                  (Math.PI / 180) * (179 - pakky.mouthOpenValue),
                                                  (Math.PI / 180) * (180 + pakky.mouthOpenValue), true);
                                           pakky.x += ( pakky.speed * pakky.left );
                     };
    this.frontDirection.up = function(){ c.arc( pakky.x,
                                                pakky.y,
                                                pakky.bodyRadius,
                                                (Math.PI / 180) * ( -90 + pakky.mouthOpenValue ),
                                                (Math.PI / 180) * ( 270 - pakky.mouthOpenValue ) );
                                         pakky.y += ( pakky.speed * pakky.up );
                    };
    this.frontDirection.down = function(){ c.arc( pakky.x,
                                                  pakky.y,
                                                  pakky.bodyRadius,
                                                  (Math.PI / 180) * ( -270 + pakky.mouthOpenValue ),
                                                  (Math.PI / 180) * ( 90 - pakky.mouthOpenValue ) );
                                           pakky.y += ( pakky.speed * pakky.down );
                     };

  this.direction = !false; //it's funny because it's true
  this.mouthPosition = !false;

  // check if pacman collide with walls
  this.preventCollision = function( x, y ){

    var right = left = up = down = true;
    // right
    var maze = c.getImageData( x + this.bodyRadius,
                               ( y - this.bodyRadius ) + 2,
                               3,
                               ( this.bodyRadius * 2 ) - 4
                             );
    var  pix = maze.data;
        for (var i = 0; n = pix.length, i < n; i += 4) {
          if ( pix[i - 3] > 0 ) {
            right = false;
        }
    }
    // left
    var maze = c.getImageData( ( x - this.bodyRadius ) - 3,
                               ( y - this.bodyRadius ) + 2,
                               3,
                               ( this.bodyRadius * 2 ) - 4
                             );
    var  pix = maze.data;
        for (var i = 0; n = pix.length, i < n; i += 4) {
          if ( pix[i - 3] > 0 ) {
            left = false;
        }
    }
    // down
    var maze = c.getImageData( ( x - this.bodyRadius ) + 2,
                               y + this.bodyRadius,
                               ( this.bodyRadius * 2 ) - 4,
                               3
                             );
    var  pix = maze.data;
        for (var i = 0; n = pix.length, i < n; i += 4) {
          if ( pix[i - 3] > 0 ) {
            down = false;
        }
    }
    // up
    var maze = c.getImageData( ( x - this.bodyRadius ) + 2,
                               ( y - this.bodyRadius ) - 3,
                               ( this.bodyRadius * 2 ) - 4,
                               3
                             );
    var  pix = maze.data;
        for (var i = 0; n = pix.length, i < n; i += 4) {
          if ( pix[i - 3] > 0 ) {
            up = false;
        }
    }
    return [ right, left, up, down ];
  };

  this.goTo = function(){

    walkable = this.preventCollision( this.x, this.y );

    if ( inputDirection === 'RIGHT' && walkable[ 0 ] === true ){
      //face to right
        this.speed = this.normalSpeed;
        this.oldDirection = 'RIGHT';

    }else if ( inputDirection === 'LEFT' && walkable[ 1 ] === true ){
        this.speed = this.normalSpeed;
        this.oldDirection = 'LEFT';
    }else if ( inputDirection === 'UP' && walkable[ 2 ] === true ){
      //face to up
        this.speed = this.normalSpeed;
        this.oldDirection = 'UP';

    }else if ( inputDirection === 'DOWN' && walkable[ 3 ] === true ){
      //face to down
        this.speed = this.normalSpeed;
        this.oldDirection = 'DOWN';

    }else{
      //default position
      this.speed = 0;
      // c.arc(this.x, this.y, this.bodyRadius, (Math.PI / 180) * this.mouthOpenValue, (Math.PI / 180) * (360 - this.mouthOpenValue));
    }

    pakky.frontDirection[ '' + pakky.oldDirection.toLowerCase() + '' ]();

  };
  this.draw = function (){
    // managing border break
    // if pakky breaks from the border for all of its radius,
    // it comes back in the game zone form the other side of the screen
    if ( this.y <= -1 * this.bodyRadius && inputDirection === 'UP' ){
      this.y = canvas.height + this.bodyRadius;
    }else if ( this.y >= canvas.height + this.bodyRadius && inputDirection === 'DOWN' ){
      this.y = -1 * this.bodyRadius;
    }else if ( this.x <= -1 * this.bodyRadius && inputDirection === 'LEFT' ) {
      this.x = canvas.width + this.bodyRadius;
    }else if ( this.x >= canvas.width + this.bodyRadius && inputDirection === 'RIGHT' ){
      this.x = -1 * this.bodyRadius;
    }

    //drawing pakky
    c.beginPath();


    // move to request direction
    this.goTo();


    if( this.alive === 'alive' ){

      // open and closes mouth
      if (this.mouthOpenValue <= 0){
        this.mouthPosition = this.open;
      }else if (this.mouthOpenValue >= 40){
        this.mouthPosition = this.closed;
      }
      this.mouthOpenValue += (5 * this.mouthPosition);

        // check for collisions
      for( key in instances ){

        if ( instances[ key ].type === 'phantom' ){

          phantom = [];
          phantom.x = instances[ key ].x;
          phantom.y = instances[ key ].y;
          phantom.bodyRange = instances[ key ].bodyRange;

        // check if pakky collide with a phantom
        if ( Math.abs( pakky.x - phantom.x ) <= phantom.bodyRange &&
             Math.abs( pakky.y - phantom.y ) <= phantom.bodyRange ){
              this.alive = 'dying';
              this.die();
          }
        }
      }

    }else if ( this.alive === 'dying' ){
      this.die();
    }

    //last part of mouth drawing
    c.lineTo(this.x, this.y);
    c.fillStyle = this.color;
    c.fill();
  };
  this.die = function(){

    inputDirection = 'STOP';

    if( this.mouthOpenValue <= 170 ){
      this.mouthOpenValue += 2;
      c.beginPath();
      c.arc(this.x, this.y, this.bodyRadius, (Math.PI / 180) * this.mouthOpenValue,
                                                   (Math.PI / 180) * (360 - this.mouthOpenValue));
    }else{
      this.alive = 'died';
      return;
    }



  };

};
