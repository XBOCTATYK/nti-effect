import paper from 'paper';
import {Path, Color, Point, Size, Rectangle, Group, Raster} from "./paperExports";
import {LineBetween} from "./Figures/LineBetween";
import {LightPoint} from "./DrawingObjects/LightPoint";
import {inRange} from "./lib/utils";
import {createDots, createLines} from "./lib/creators";

window.addEventListener('load', function () {
    var canvas = document.getElementById('waves');
    paper.setup(canvas);

    /*const bg = Path.Rectangle(new Point(0,0), new Size(1920, 600));
    bg.fillColor = 'black';*/

   const back = new Raster({
     source: canvas.dataset.bgPath,
     width: 1920,
     height: 600,
     position: paper.view.center
   });

   back.onLoad = function() {
     //back.scale(2);
     back.width = 1920;
       back.height = 600
   };


  let dots1 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: 10,
    yFactor: 400,
    offsetPhase: 25,
    count: 14,
    zFactor: () => {return -60}
  });

  let dots2 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: 10,
    offsetPhase: 25,
    yFactor: 400,
    count: 14,
    zFactor: () => {return -30}
  });

  let dots3 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: 10,
    yFactor: 400,
    offsetPhase: 25,
    count: 14,
    zFactor: () => {return 0}
  });

  let dots4 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: 10,
    offsetPhase: 25,
    count: 14,
    yFactor: 450,
    zFactor: () => {return 20}
  });

  let dots5 = createDots({
    startPosition: -80,
    offsetPerStep: 240,
    startPhase: 10,
    offsetPhase: 25,
    count: 12,
    yFactor: 550,
    zFactor: () => {return 40}
  });

  let dots6 = createDots({
    startPosition: -80,
    offsetPerStep: 380,
    startPhase: 15,
    offsetPhase: 25,
    count: 8,
    yFactor: 800,
    zFactor: () => {return 60}
  });



    const off = Math.ceil(Math.random()*10);
    let lines = createLines({
      dots: [dots1, dots2, dots3, dots4, dots5, dots6],
      ranges: [
        {x: 0, z: 0},
        {x: 200, z: 30},
        {x: 0, z: 0},
        {x: 200, z: 20},
        {x: 0, z: 0},
        {x: 380, z: 20},
      ],
      offsetLine: off
    })



});

