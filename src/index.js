import paper from 'paper';
import { Path, Color, Point, Size, Rectangle, Group } from "./paperExports";
import {LineBetween} from "./Figures/LineBetween";
import {LightPoint} from "./DrawingObjects/LightPoint";
import {inRange} from "./lib/utils";
import {createDots, createLines} from "./lib/creators";

window.addEventListener('load', function () {
    var canvas = document.getElementById('waves');
    paper.setup(canvas);

    const bg = Path.Rectangle(new Point(0,0), new Size(1920, 600));
    bg.fillColor = 'black';



  const createLine = (from, to, width) => new LineBetween({
    fromPathElement: from,
    toPathElement: to,
    element: {
      strokeColor: 'white',
    }
  });

  let dots1 = createDots({
    startPosition: 100,
    offsetPerStep: 120,
    startPhase: 10,
    offsetPhase: 15,
    count: 15,
    zFactor: () => {return 0}
  });

  let dots2 = createDots({
    startPosition: 100,
    offsetPerStep: 120,
    startPhase: 7,
    offsetPhase: 15,
    yFactor: 100,
    count: 15,
    zFactor: () => {return 40}
  });

  let dots3 = createDots({
    startPosition: 100,
    offsetPerStep: 120,
    startPhase: 13,
    offsetPhase: 15,
    count: 15,
    zFactor: () => {return -20}
  });

  let dots4 = createDots({
    startPosition: 100,
    offsetPerStep: 120,
    startPhase: 10,
    offsetPhase: 15,
    count: 15,
    yFactor: 80,
    zFactor: () => {return -70}
  });

  let dots5 = createDots({
    startPosition: 100,
    offsetPerStep: 120,
    startPhase: 10,
    offsetPhase: 15,
    count: 15,
    yFactor: 300,
    zFactor: () => {return 90}
  });

  let lines = createLines({
    dots: [dots1, dots2, dots3, dots4, dots5],
    ranges: [{
      x: 100,
      z: 20
    },{
      x: 120,
      z: 50
    },{
      x: 120,
      z: 50
    },{
      x: 120,
      z: 50
    },{
      x: 120,
      z: 50
    }]
  })

});

