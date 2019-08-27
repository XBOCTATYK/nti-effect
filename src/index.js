import paper from 'paper';
import {Path, Color, Point, Size, Rectangle, Group, Raster} from "./paperExports";
import {LineBetween} from "./Figures/LineBetween";
import {LightPoint} from "./DrawingObjects/LightPoint";
import {inRange} from "./lib/utils";
import {createDots, createLines} from "./lib/creators";
import {setFrameCounter} from "./lib/setFrameCounter";

setFrameCounter();

window.addEventListener('load', function () {
    var canvas = document.getElementById('waves');
    paper.setup(canvas);


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

  /* Рандомим стартовую фазу */
   const START_PHASE = Math.ceil(Math.random()*360);

  let dots0 = createDots({
    startPosition: -80,
    offsetPerStep: 380,
    startPhase: START_PHASE + 180,
    yFactor: 600,
    offsetPhase: 25,
    count: 8,
    zFactor: () => {return -80}
  });


  let dots1 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: START_PHASE,
    yFactor: 450,
    offsetPhase: 25,
    count: 14,
    zFactor: () => {return -60}
  });

  let dots2 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: START_PHASE,
    offsetPhase: 25,
    yFactor: 400,
    count: 14,
    zFactor: () => {return -30}
  });

  let dots3 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: START_PHASE,
    yFactor: 400,
    offsetPhase: 25,
    count: 14,
    zFactor: () => {return 0}
  });

  let dots4 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: START_PHASE,
    offsetPhase: 25,
    count: 14,
    yFactor: 450,
    zFactor: () => {return 10}
  });

  let dots5 = createDots({
    startPosition: -80,
    offsetPerStep: 240,
    startPhase: START_PHASE,
    offsetPhase: 25,
    count: 12,
    yFactor: 550,
    zFactor: () => {return 40}
  });

  let dots6 = createDots({
    startPosition: -80,
    offsetPerStep: 380,
    startPhase: START_PHASE,
    offsetPhase: 25,
    count: 8,
    yFactor: 800,
    zFactor: () => {return 60}
  });



    const off = Math.ceil(Math.random()*10);
    let lines = createLines({
      dots: [dots0, dots1, dots2, dots3, dots4, dots5, dots6],
      ranges: [
        {x: 300, z: 20},
        {x: 0, z: 0},
        {x: 200, z: 30},
        {x: 0, z: 0},
        {x: 200, z: 30},
        {x: 0, z: 0},
        {x: 350, z: 20},
        {x: 0, z: 0},
      ],
      offsetLine: off
    });

});

