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
     source:'img/main-bg2.jpg',
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
    offsetPerStep: 240,
    startPhase: 10,
    yFactor: 400,
    offsetPhase: 30,
    count: 12,
    zFactor: () => {return -70}
  });

  let dots2 = createDots({
    startPosition: -80,
    offsetPerStep: 240,
    startPhase: 10,
    offsetPhase: 30,
    yFactor: 400,
    count: 12,
    zFactor: () => {return -30}
  });

  let dots3 = createDots({
    startPosition: -80,
    offsetPerStep: 240,
    startPhase: 10,
    yFactor: 400,
    offsetPhase: 30,
    count: 14,
    zFactor: () => {return 0}
  });

  let dots4 = createDots({
    startPosition: -80,
    offsetPerStep: 240,
    startPhase: 10,
    offsetPhase: 30,
    count: 12,
    yFactor: 450,
    zFactor: () => {return 20}
  });

  let dots5 = createDots({
    startPosition: -80,
    offsetPerStep: 240,
    startPhase: 10,
    offsetPhase: 30,
    count: 12,
    yFactor: 600,
    zFactor: () => {return 40}
  });

  let dots6 = createDots({
    startPosition: -80,
    offsetPerStep: 240,
    startPhase: 10,
    offsetPhase: 30,
    count: 12,
    yFactor: 700,
    zFactor: () => {return 60}
  });

  let dots7 = createDots({
    startPosition: -80,
    offsetPerStep: 240,
    startPhase: 10,
    offsetPhase: 30,
    count: 12,
    yFactor: 900,
    zFactor: () => {return 80}
  });


    const off = Math.ceil(Math.random()*10);
    let lines = createLines({
      dots: [dots1, dots2, dots3, dots4, dots5, dots6, dots7],
      ranges: [
        {x: 200, z: 40},
        {x: 220, z: 30},
        {x: 220, z: 30},
        {x: 180, z: 20},
        {x: 200, z: 20},
        {x: 180, z: 20},
        {x: 180, z: 20},
      ],
      offsetLine: off
    })



});

