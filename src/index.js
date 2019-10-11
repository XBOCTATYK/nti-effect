import paper from 'paper';
import {Raster} from "./paperExports";
import {createDots, createLines} from "./lib/creators";
import {PictureObject} from "./DrawingObjects/PictureObject";
import {RandomAppear} from "./behavior/randomAppear";
import {createPicItems} from "./lib/createPicItems";

function initWaves(fps) {

  const canvas = document.getElementById('waves');
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
  const START_PHASE = 100;

  let dots0 = createDots({
    startPosition: -80,
    offsetPerStep: 150,
    startPhase: START_PHASE,
    yFactor: 600,
    offsetPhase: 20,
    count: 25,
    zFactor: () => {
      return -70
    }
  });


  let dots1 = createDots({
    startPosition: -80,
    offsetPerStep: 160,
    startPhase: START_PHASE,
    yFactor: 550,
    offsetPhase: 18,
    count: 22,
    zFactor: () => {
      return -60
    }
  });

  let dots2 = createDots({
    startPosition: -80,
    offsetPerStep: 180,
    startPhase: START_PHASE,
    offsetPhase: 20,
    yFactor: 500,
    count: 18,
    zFactor: () => {
      return -30
    }
  });

  let dots3 = createDots({
    startPosition: -80,
    offsetPerStep: 220,
    startPhase: START_PHASE,
    yFactor: 500,
    offsetPhase: 23,
    count: 14,
    zFactor: () => {
      return 0
    }
  });

  let dots4 = createDots({
    startPosition: -80,
    offsetPerStep: 270,
    startPhase: START_PHASE,
    offsetPhase: 27,
    count: 10,
    yFactor: 550,
    zFactor: () => {
      return 10
    }
  });

  let dots5 = createDots({
    startPosition: -80,
    offsetPerStep: 360,
    startPhase: START_PHASE,
    offsetPhase: 37,
    count: 8,
    yFactor: 650,
    zFactor: () => {
      return 40
    }
  });

  let dots6 = createDots({
    startPosition: -80,
    offsetPerStep: 420,
    startPhase: START_PHASE,
    offsetPhase: 40,
    count: 6,
    yFactor: 900,
    zFactor: () => {
      return 60
    }
  });


  const off = Math.ceil(Math.random() * 10);
  let lines = createLines({
    dots: [dots0, dots1, dots2, dots3, dots4, dots5, dots6],
    ranges: [
      {x: 160, z: 20},
      {x: 0, z: 0},
      {x: 180, z: 30},
      {x: 0, z: 0},
      {x: 280, z: 30},
      {x: 0, z: 0},
      {x: 350, z: 30},
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
  let speedWave = 0;
  let phase = 0;

  let mouseLock = false;


  document.body.addEventListener('click', () => {
    stage = SPLASH_STAGES.SPLASH;
    maxAmp += 50;
    splashTiming = 100;
    speedWave = 1;
    splashSpeedFactor = 30;
    reduceSpeedFactor = 70;
    splashTiming = 100;
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
    phase = 0;
  };

  const randomSplash = () => {
    makeSplash({
      splash: Math.ceil(Math.random() * 60 - 30),
      splashTiming: Math.ceil(Math.random() * 1000 + 20),
      splashSpeedFactor: Math.ceil(200),
      reduceSpeedFactor: Math.ceil(300)
    });
  };

  randomSplash();


  let skipping = 30;
  let moved = false;
  const MAX_MOVEMENT = 60;
  const MIN_MOVEMENT = 10;
  const MAX_MOUSE_AMPLITUDE = 220;
  const MOUSE_DETECT_SURFACE = '.js-slider-waves';

  const sliderWaves = document.querySelector(MOUSE_DETECT_SURFACE);

  sliderWaves.addEventListener('mousemove', (event) => {


    makeSplash({
      splash: 500-event.clientY,
      splashTiming: 100,
      splashSpeedFactor: 50,
      reduceSpeedFactor: 100
    });

    let amp = 500-event.clientY;
    if (amp > 250) {
      amp = 180;
    }

    let speed = event.clientX/600;

    if (speed < 0.2) {
      speed = 0.2;
    }

    lines.forEach(item => {
      item.change({
        amplitude: amp,
        speed: speed
      })
    });

  });

  setTimeout(() => {
    paper.view.remove();
    initWaves()
  }, 600000)

}

window.addEventListener('load', () => {
  const canvas = document.getElementById('waves');
  initWaves();
});



