var canvas, c, inputDirection, oldDirection, instances;

instances = {};

// pacman collision test
pakkyCollTest = function( direction ){
  switch( direction ){
    case 'right':
           c.fillStyle="#FF0000";
           c.fillRect( pacman.x + pacman.bodyRadius,
                       ( pacman.y - pacman.bodyRadius ) + 2,
                       3,
                       ( pacman.bodyRadius * 2 ) - 4
                     );
    break;
    case 'left':
           c.fillStyle="#FF0000";
           c.fillRect( ( pacman.x - pacman.bodyRadius ) - 3,
                       ( pacman.y - pacman.bodyRadius ) + 2,
                       3,
                       ( pacman.bodyRadius * 2 ) - 4
                     );
    break;
    case 'up':
          c.fillStyle="#FF0000";
          c.fillRect( ( pacman.x - pacman.bodyRadius ) + 2,
                        (  pacman.y - pacman.bodyRadius ) - 3,
                        ( pacman.bodyRadius * 2 ) - 4,
                        3
                    );
    break;
    case 'down':
          c.fillStyle="#FF0000";
          c.fillRect( ( pacman.x - pacman.bodyRadius ) + 2,
                      pacman.y + pacman.bodyRadius,
                      ( pacman.bodyRadius * 2 ) - 4,
                      3
                    );
    break;
    default:
    break;
  }
}

// phantom collision test
phantyCollTest = function( direction, phantom ){
  switch( direction ){
    case 'right':
           c.fillStyle="#FF2200";
           c.fillRect( phantom.x + phantom.width,
                       phantom.y + 4,
                       3,
                       phantom.height - 8
                     );
    break;
    case 'left':
           c.fillStyle="#FF2200";
           c.fillRect( phantom.x - 2,
                       phantom.y + 4,
                       3,
                       phantom.height - 8
                     );
    break;
    case 'down':
          c.fillStyle="#FF2200";
          c.fillRect( phantom.x + 4,
                      phantom.y + phantom.height,
                      phantom.width - 8,
                      3
                    );
    break;
    case 'up':
          c.fillStyle="#FF2200";
          c.fillRect( phantom.x + 4,
                      phantom.y - 2,
                      phantom.width - 8,
                      3
                    );
    break;
    default:
    break;
  }
}


//moving polyfill
window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 2000 / 60);
          };
})();

var init = function(){
  walls = new Wall;
  pacman = new Pacman;
  phantom1 = new Phantom( 446, 382, 'red' );
  phantom2 = new Phantom( 500, 150, 'blue' );
  phantom3 = new Phantom( 500, 150, 'yellow' );/*( 100, 150,*/
  canvas = document.getElementById('canvas');
  c = canvas.getContext('2d');
  window.requestAnimationFrame( drawLoop );

};


window.addEventListener('load', function () {

  init();
  }
  );

// hotkeys mapping
function traduceDirection( pressure ){

  oldDirection = inputDirection;

  switch( pressure.key ){
    case 'ArrowRight':
     inputDirection = 'RIGHT';
    break;
    case 'ArrowUp':
     inputDirection = 'UP';
    break;
    case 'ArrowLeft':
     inputDirection = 'LEFT';
    break;
    case 'ArrowDown':
     inputDirection = 'DOWN';
    break;
    default:
      // inputDirection = 'STOP';
    break;
  }
}

//return requested diretcion
window.onkeydown = function(evt) {
    pressure = evt || window.event;
    traduceDirection( pressure );
};

function checkCollisions(){


            walls.draw();
            phantom1.draw();
            phantom2.draw();
            phantom3.draw();

             pacman.draw();
            //  pakkyCollTest( 'up' );
            //  phantyCollTest( 'up', phantom1 );


};

// start draw pacman
function drawLoop() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  checkCollisions();
  window.requestAnimationFrame( drawLoop );
}
