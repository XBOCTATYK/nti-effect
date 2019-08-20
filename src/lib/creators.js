import {LightPoint} from "../DrawingObjects/LightPoint";
import paper from "paper";
import {Color} from "../paperExports";
import {LineBetween} from "../Figures/LineBetween";
import {inRange} from "./utils";

const DEFAULT_OPTIONS = {
  startPosition: 0,
  offsetPerStep: 1,
  startPhase: 1,
  offsetPhase: 35
};

  export class CreateDots {
    constructor(options) {
        this.count = options.count || 1;
        this.dots = [];
    }

    create(options = DEFAULT_OPTIONS) {
        for(let index = 0; index < this.count; index++) {

        }
    }
}

const createLine = (from, to, width) => new LineBetween({
  fromPathElement: from,
  toPathElement: to,
  element: {
    strokeColor: 'white',
    strokeWidth: width
  }
});


export function createDots(options = DEFAULT_OPTIONS) {
    const count = options.count || 1;
    const zFactor = options.zFactor || 0;
    const offsetPerStep = options.offsetPerStep;
    const offsetPhase = options.offsetPhase;
    const yFactor = options.yFactor || 100;

    let color = options.color || new Color(255, 255, 255, 1);
    let dots = [];
    let position = options.startPosition;
    let phase = options.startPhase;

    for (let index = 0; index < count; index++) {
      const newDot = new LightPoint({
        initialPosition: {
          x: position,
          y: yFactor,
          z: zFactor()
        },
        element: {
          radius: 10,
          center: paper.view.center,
          fillColor: new Color(46, 197, 206, 1)
        },
        animation: {
          speed: 1,
          phase: phase
        }
      });

      const currentOffsetPosition = Math.ceil(offsetPerStep + Math.random()*offsetPerStep - offsetPerStep/2);
      position += currentOffsetPosition;
      const currentOffset = Math.ceil(offsetPhase + Math.random()*offsetPhase - offsetPhase/2);
      phase += currentOffset;
      const phaseLeft = 361 - phase;

      if (phase > 361) phase = currentOffset - phaseLeft;

      if (index > 0) {
        createLine(dots[index - 1], newDot, 1)
      }

      dots.push(newDot);
    }

  return dots;
}



export const createLines = (options) => {
  const dots = options.dots || [];
  const ranges = options.ranges || [];

  const allDots = dots.reduce((arr, arr1) => {
    return arr.concat(arr1);
  });

  console.log(allDots);

    for (let index = 0; index < dots.length; index++) {
        const dotArr = dots[index];
        const range = ranges[index];

        console.log(range);
        console.log(dotArr);

        dotArr.map((dot) => {
          allDots.map((item, key) => {
            if (inRange(item.x, dot.x, range.x) &&
              inRange(item.z, dot.z, range.z)
            ) {
              createLine(item, dot, 1);
            }
          })
        });
    }
};
