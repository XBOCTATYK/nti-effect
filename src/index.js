import paper from 'paper';
import {Path, Color, Point, Size, Rectangle, Group, Raster} from "./paperExports";
import {LineBetween} from "./Figures/LineBetween";
import {LightPoint} from "./DrawingObjects/LightPoint";
import {inRange} from "./lib/utils";
import {createDots, createLines} from "./lib/creators";
import {setFrameCounter} from "./lib/setFrameCounter";
import {PictureObject} from "./DrawingObjects/PictureObject";
import {RandomAppear} from "./behavior/randomAppear";

//setFrameCounter();

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

  const imageArray2 = ['img/dots.svg', 'img/square.svg', 'img/crossb.svg', 'img/crossp.svg'];


  imageArray2.forEach(item => {
    for (let index = 0; index < 5; index++) {
      const pict = new PictureObject({
        element: {
          source: item,
          position: paper.view.center,
          size: new Size(Math.ceil(Math.random()*20) + 10, Math.ceil(Math.random()*20) + 10),
          shadowColor: '#26c3cc',
          shadowBlur: Math.ceil(Math.random()*10),
          opacity: 0.5 - Math.random()*0.5
        }
      });

      pict.element.size = new Size(Math.ceil(Math.random()*20) + 10, Math.ceil(Math.random()*20) + 10);

      pict.addBehavior(RandomAppear, {
        border: {
          startX: 30,
          startY: 30,
          endX: 1890,
          endY: 570
        }
      })
    }
  });

  /* Рандомим стартовую фазу */
   const START_PHASE = Math.ceil(Math.random()*360);

  let dots0 = createDots({
    startPosition: -80,
    offsetPerStep: 380,
    startPhase: START_PHASE,
    yFactor: 500,
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

    const imageArray = ['img/dots.svg', 'img/square.svg', 'img/crossb.svg', 'img/crossp.svg'];


    imageArray.forEach(item => {
      for (let index = 0; index < 5; index++) {
        const pict = new PictureObject({
          element: {
            source: item,
            position: paper.view.center,
            opacity: 1 - Math.random()
          }
        });

        pict.element.size = new Size(Math.ceil(Math.random()*40) + 10, Math.ceil(Math.random()*40) + 10);

        pict.addBehavior(RandomAppear, {
          border: {
            startX: 30,
            startY: 30,
            endX: 1890,
            endY: 570
          }
        })
      }
    });

  const SPLASH_STAGES = {
    SPLASH: 1,
    SPLASHING: 2,
    REDUCE: 3,
    IDLE: 4
  };

    let stage = SPLASH_STAGES.IDLE;
    let amount = 70;
    let accel = 1;
    let splashing = false;
    let maxAmp = 160;
    let minAmp = 90;
    let splashTiming = 5000;
    let splashSpeedFactor = 30;
    let reduceSpeedFactor = 100;
    let speedWave = 2;




    document.body.addEventListener('click', (event) => {
      stage = SPLASH_STAGES.SPLASH;
      maxAmp += 20;
      splashTiming = 5000;
      speedWave = 3;
      splashSpeedFactor = 30;
      reduceSpeedFactor = 100;
      splashTiming = 5000;
    });

    const makeSplash = (options) => {
      stage = SPLASH_STAGES.SPLASH;
      maxAmp = minAmp + options.splash;
      splashTiming = options.splashTiming;
      splashSpeedFactor = options.splashSpeedFactor;
      reduceSpeedFactor = options.reduceSpeedFactor;
      speedWave = 2;
    };

    const randomSplash = () => {
      makeSplash({
        splash: Math.ceil(Math.random()*60 - 30),
        splashTiming: Math.ceil(Math.random()*10000+2000),
        splashSpeedFactor: Math.ceil(200),
        reduceSpeedFactor: Math.ceil(300)
      });
    };

    randomSplash();

    const SPLASH_TIMING = 8000;
    setInterval(() => {
      if (!splashing && stage !== SPLASH_STAGES.REDUCE) {
        randomSplash();
      }
    }, SPLASH_TIMING);

    paper.view.onFrame = function () {
      if (stage === SPLASH_STAGES.SPLASH) {

        if (amount > maxAmp) {
          stage = SPLASH_STAGES.SPLASHING;
        }

        lines.forEach((item, index) => {
          item.change({
            amplitude: amount += accel/splashSpeedFactor,
            speed: speedWave
          })
        })
      }

      if (stage === SPLASH_STAGES.SPLASHING) {
          if (!splashing) {
            setTimeout(() => {
                stage = SPLASH_STAGES.REDUCE;
            }, splashTiming);
            splashing = true;
          }
      }

      if (stage === SPLASH_STAGES.REDUCE) {
        splashing = false;

        if (amount < minAmp) {
          stage = SPLASH_STAGES.IDLE;
        }

        lines.forEach(item => {
          item.change({
            amplitude: amount -= accel/reduceSpeedFactor,
            speed: 2
          })
        });

        if (maxAmp > 160) {
          maxAmp -= 1;
        }
      }
    };

    let skipping = 20;
    let moved = false;

    canvas.addEventListener('mousemove', (event) => {

      if (skipping <= 0 && !moved) {
        let movement = Math.sqrt(event.movementY**2 + event.movementX**2);

        if (movement > 60) {
          movement = 60;
        }

        if (movement < 30) return;

        makeSplash({
          splash: movement,
          splashTiming: 300,
          splashSpeedFactor: 30,
          reduceSpeedFactor: 50
        });
        moved = true;

        setTimeout(() => {
          skipping = 20;
          moved = false;
        }, 300)
      }

      skipping--;
    })



});

