import paper from 'paper';
import {Raster} from "./paperExports";
import {createDots, createLines} from "./lib/creators";
import {PictureObject} from "./DrawingObjects/PictureObject";
import {RandomAppear} from "./behavior/randomAppear";
import {createPicItems} from "./lib/createPicItems";

function initWaves(fps) {
  var canvas = document.getElementById('waves');
  paper.setup(canvas);

  const imgPath = canvas.dataset.bgPath;

  /** Создание фона */
  const back = new Raster({
    source: `${imgPath}main-bg2.jpg`,
    width: 1920,
    height: 600,
    position: paper.view.center
  });

  back.onLoad = function () {
    back.width = 1920;
    back.height = 600;
    canvas.style.opacity = 1;
  };

  if (fps < 10) return;

  /** Мелкие элементы, рандомно появляющиеся на экране */
  const imageArray = [`${imgPath}dots.svg`, `${imgPath}square.svg`, `${imgPath}crossb.svg`, `${imgPath}crossp.svg`];
  const imageZones = [
    {startX: 1400, startY: 0, endX: 1920, endY: 570, count: 3},
    {startX: 0, startY: 0, endX: 520, endY: 570, count: 3},
    {startX: 520, startY: 420, endX: 1400, endY: 600, count: 3},
    {startX: 520, startY: 86, endX: 1400, endY: 196, count: 2}
  ];

  createPicItems(imageArray, imageZones);


  /** Создание точек */
  /* Рандомим стартовую фазу */
  const START_PHASE = Math.ceil(Math.random() * 360);

  let dots0 = createDots({
    startPosition: -80,
    offsetPerStep: 380,
    startPhase: START_PHASE,
    yFactor: 600,
    offsetPhase: 25,
    count: 8,
    zFactor: () => {
      return -80
    }
  });


  let dots1 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: START_PHASE,
    yFactor: 550,
    offsetPhase: 25,
    count: 14,
    zFactor: () => {
      return -60
    }
  });

  let dots2 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: START_PHASE,
    offsetPhase: 25,
    yFactor: 500,
    count: 14,
    zFactor: () => {
      return -30
    }
  });

  let dots3 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: START_PHASE,
    yFactor: 500,
    offsetPhase: 25,
    count: 14,
    zFactor: () => {
      return 0
    }
  });

  let dots4 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: START_PHASE,
    offsetPhase: 25,
    count: 14,
    yFactor: 550,
    zFactor: () => {
      return 10
    }
  });

  let dots5 = createDots({
    startPosition: -80,
    offsetPerStep: 240,
    startPhase: START_PHASE,
    offsetPhase: 25,
    count: 12,
    yFactor: 650,
    zFactor: () => {
      return 40
    }
  });

  let dots6 = createDots({
    startPosition: -80,
    offsetPerStep: 380,
    startPhase: START_PHASE,
    offsetPhase: 25,
    count: 8,
    yFactor: 900,
    zFactor: () => {
      return 60
    }
  });


  const off = Math.ceil(Math.random() * 10);
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


  const SPLASH_STAGES = {
    SPLASH: 1,
    SPLASHING: 2,
    REDUCE: 3,
    IDLE: 4
  };

  let stage = SPLASH_STAGES.IDLE;
  let amount = 90;
  let accel = 1;
  let splashing = false;
  let maxAmp = 200;
  let minAmp = 70;
  let splashTiming = 5000;
  let splashSpeedFactor = 30;
  let reduceSpeedFactor = 100;
  let speedWave = 1;

  let mouseLock = false;


  document.body.addEventListener('click', () => {
    stage = SPLASH_STAGES.SPLASH;
    maxAmp += 50;
    splashTiming = 5000;
    speedWave = 1;
    splashSpeedFactor = 30;
    reduceSpeedFactor = 100;
    splashTiming = 5000;
    mouseLock = true;

    setTimeout(() => {
      mouseLock = false;
    }, splashTiming)
  });

  const makeSplash = (options) => {
    stage = SPLASH_STAGES.SPLASH;
    maxAmp = minAmp + options.splash;
    splashTiming = options.splashTiming;
    splashSpeedFactor = options.splashSpeedFactor;
    reduceSpeedFactor = options.reduceSpeedFactor;
    speedWave = 1;
  };

  const randomSplash = () => {
    makeSplash({
      splash: Math.ceil(Math.random() * 60 - 30),
      splashTiming: Math.ceil(Math.random() * 10000 + 2000),
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

      lines.forEach(item => {
        item.change({
          amplitude: amount += accel / splashSpeedFactor,
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
          amplitude: amount -= accel / reduceSpeedFactor
        })
      });

    }
  };

  let skipping = 30;
  let moved = false;
  const MAX_MOVEMENT = 60;
  const MIN_MOVEMENT = 10;
  const MAX_MOUSE_AMPLITUDE = 200;
  const MOUSE_DETECT_SURFACE = '.js-slider-waves';

  const sliderWaves = document.querySelector(MOUSE_DETECT_SURFACE);

  sliderWaves.addEventListener('mousemove', (event) => {

    if (event.clientX < 300) return;

    if (skipping <= 0 && amount < MAX_MOUSE_AMPLITUDE && !mouseLock) {
      let movement = Math.sqrt(event.movementY ** 2 + event.movementX ** 2) * 1.4;

      if (movement > MAX_MOVEMENT) {
        movement = MAX_MOVEMENT;
      }

      if (movement < MIN_MOVEMENT) return;

      makeSplash({
        splash: movement += 4,
        splashTiming: 1000,
        splashSpeedFactor: 100,
        reduceSpeedFactor: 200
      });

      moved = true;

      setTimeout(() => {
        skipping = 20;
        moved = false;
      }, 200)
    }

    skipping--;
  });

}

window.addEventListener('load', () => {
  initWaves();
});



