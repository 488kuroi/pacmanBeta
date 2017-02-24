var Phantom = function( x, y, name ) {
  this.name = name;
  this.type = 'phantom';
  this.height = 30;
  this.width = 30;
  this.x = x;
  this.y = y;
  this.speed = 2;
  this.firstStep = 1;
  this.secondStep = 2;
  this.currentStep = 1;
  this.stepCounter = 0;
  this.stepLimit = 200;
  this.chosenDirection = function(){ this.x += this.speed; };
  this.lastDirection = true;
  this.timeCounter = 0;
  this.assetFolder = 'assets/phantoms/';
  this.faceDirection = 'right';
  this.color = name;
  this.bodyRange = 27;
  this.DirectionKey = '';

  this.preventCollision = function( x, y ){

    _this = this;

    var right = left = up = down = true;
    // right
    var maze = c.getImageData( _this.x + _this.width,
                               _this.y + 4,
                               2,
                               _this.height - 8
                             );
    var  pix = maze.data;
        for (var i = 0; n = pix.length, i < n; i += 4) {
          if ( pix[i - 3] === 255 && pix[i - 2] === 255 && pix[i - 1] === 255 ) {
            right = false;
        }
    }
    // left
    var maze = c.getImageData( _this.x - 2,
                               _this.y + 4,
                               2,
                               _this.height - 8
                             );
    var  pix = maze.data;
        for (var i = 0; n = pix.length, i < n; i += 4) {
          if ( pix[i - 3] === 255 && pix[i - 2] === 255 && pix[i - 1] === 255 ) {
            left = false;
        }
    }
    // down
    var maze = c.getImageData( _this.x + 4,
                               _this.y + _this.height,
                               _this.width - 8,
                               2
                             );
    var  pix = maze.data;
        for (var i = 0; n = pix.length, i < n; i += 4) {
          if ( pix[i - 3] === 255 && pix[i - 2] === 255 && pix[i - 1] === 255 ) {
            down = false;
        }
    }
    // up
    var maze = c.getImageData( _this.x + 8,
                               _this.y - 2,
                               _this.width - 8,
                               2
                             );
    var  pix = maze.data;
        for (var i = 0; n = pix.length, i < n; i += 4) {
          if ( pix[i - 3] === 255 && pix[i - 2] === 255 && pix[i - 1] === 255 ) {
            up = false;
        }
    }
    return [ right, left, up, down ];
  };

  this.possibleDirection = {};
    this.possibleDirection['up'] = function(){ this.y += -this.speed; this.faceDirection = 'up'; };
    this.possibleDirection['down'] = function(){ this.y += this.speed; this.faceDirection = 'down'; };
    this.possibleDirection['right'] = function(){ this.x += this.speed; this.faceDirection = 'right'; };
    this.possibleDirection['left'] = function(){ this.x += -this.speed; this.faceDirection = 'left'; };

  this.chooseDirections = function(){
        _this = this;

        index = Math.floor(Math.random() * 4 );

        key = '';

        //traducing index
        if ( index === 0 ) key = 'up';
        if ( index === 1 ) key = 'down';
        if ( index === 2 ) key = 'right';
        if ( index === 3 ) key = 'left';

          _this.chosenDirection = _this.possibleDirection[key];

  };
  this.hunt = function(){

    _this = this;
    walkable = _this.preventCollision( _this.x, _this.y );

    // randomize directions
    if ( _this.stepCounter != 0 ){

      if ( _this.stepCounter >= _this.stepLimit ){
        _this.chooseDirections();
        _this.stepCounter = 0;
      }

      // right
      if( walkable[0] === false ){
          _this.chosenDirection = _this.possibleDirection['left'];
          _this.stepCounter = _this.stepLimit - 1;
      }else if( walkable[1] === false ){
          _this.chosenDirection = _this.possibleDirection['right'];
          _this.stepCounter = _this.stepLimit - 1;
      }else if( walkable[2] === false ){
          _this.chosenDirection = _this.possibleDirection['down'];
          _this.stepCounter = _this.stepLimit - 1;
      }else if( walkable[3] === false ){
          _this.chosenDirection = _this.possibleDirection['up'];
          _this.stepCounter = _this.stepLimit - 1;
      }



    }

    _this.chosenDirection();
    _this.stepCounter = _this.stepCounter + 1;

  };
  this.body = new Image();
  this.draw = function(){

    // manage tentacle moving
    if ( this.timeCounter === 15 ){
      if ( this.currentStep === 2 ){
        this.currentStep = this.firstStep;
      }else{
        this.currentStep = this.secondStep;
      }
        this.timeCounter = 0;
    }else{
      this.timeCounter += 1;
    }

    // draw the phantom
    this.body.src = this.assetFolder + this.color + '-' + this.faceDirection + '-' + this.currentStep + '.png';
    this.hunt();




    c.drawImage(_this.body, _this.x, _this.y, _this.width, _this.height);
    instances[ '' + this.name + '' ] = this;
  };
};
