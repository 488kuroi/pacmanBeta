<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>


<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8">
    <title>

    </title>

    <script src="mywalls.js"></script>
    <script src="mypacman.js"></script>
    <script src="myphantom.js"></script>


    <style media="screen">
      #canvas{ margin-top: 15px; left: -300px; margin-left: 50%; position: absolute;
               /*border: solid 1px #f4f4f4; background-image: url(PacmanLevel-1.png);
               background-size: 100% 100%; background-position: center center;
               background-repeat: no-repeat;*/

            }
    </style>

  </head>
  <body>

    <canvas width="600" height="600" style="border: solid 1px #000;" id="canvas"></canvas>

    <script type="text/javascript" src="init.js"></script>
  </body>
</html>
