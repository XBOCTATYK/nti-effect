import {LightPoint} from "../DrawingObjects/LightPoint";
import paper from "paper";
import {Color} from "../paperExports";
import {LineBetween} from "../Figures/LineBetween";
import {inRange} from "./utils";

const DEFAULT_OPTIONS = {
  startPosition: 0,
  offsetPerStep: 1,
  startPhase: 1,
  offsetPhase: 35,
  amplitudeFactor: Math.ceil(Math.random()*30) + 30
};

const defaultOptions = {
  offset: 0,
  width: 1,
  opacity: 0.5,
  blur: 0,
  color: '#26c3cc',
  shadowColor: '#ffffff'
};

/**
 * Создает линию от одного объекта до другого
 * @param {AbstractObject} from
 * @param {AbstractObject} to
 * @param {object} opt
 */
const createLine = (from, to, opt = defaultOptions) => {
  const options = {...defaultOptions, ...opt};

  new LineBetween({
    fromPathElement: from,
    toPathElement: to,
    fromOffset: {x: Math.ceil(Math.random()*options.offset*2-options.offset), y: Math.ceil(Math.random()*options.offset*2-options.offset)},
    toOffset: {x: Math.ceil(Math.random()*options.offset*2-options.offset), y: Math.ceil(Math.random()*options.offset*2-options.offset)},
    element: {
      strokeColor: options.color,
      strokeWidth: options.width,
      opacity: options.opacity,
      shadowBlur: options.blur,
      shadowColor: options.shadowColor
    },
    animation: options.animation
  });
};

/**
 * Вычиление параметров линии в зависимости от глубины (z)
 * @param {number} z
 * @returns {{color: string, width: number, opacity: number, animation: {flashStrength: number, changeWidth: boolean}}}
 */
const calculateOptionsWithZ = (z) => {
  let lineOptions = {};
  const absZ = Math.abs(z);
  const nullZ = (z === 0);
  const initWidth = 2;
  const initOpacity = 0.7;

  if (nullZ) return {
    color: '#4df8ff',
    opacity: initOpacity,
    width: initWidth,
    animation: {
      flashStrength: 0.5,
      changeWidth: true
    }
  };

  lineOptions.width = z > 0 ? initWidth+absZ/20 : absZ/5;
  lineOptions.opacity = z > 0 ? initOpacity : Math.abs(0.05-(absZ/2000));

  if (z < -40 || z > 40) {
    lineOptions.blur = absZ / 20;
  }

  lineOptions.animation = {
    flashStrength: 0.1,
  };

  return lineOptions;
};

/* Амплитуда немного рандомится */


/**
 * Размещение точек по указанным параметрам
 * @param {object} options
 * @returns {Array<LightPoint>}
 */

const FILL_MAIN = new Color('#30f2fb');

export function createDots(options = DEFAULT_OPTIONS) {
    const count = options.count || 1;
    const zFactor = options.zFactor || 0;
    const offsetPerStep = options.offsetPerStep;
    const offsetPhase = options.offsetPhase;
    const yFactor = options.yFactor || 100;
    const dispersion = options.offsetLine;
    const AMPLITUDE_FACTOR = options.amplitudeFactor || Math.ceil(Math.random()*30) + 30;

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
          radius: 5,
          center: paper.view.center,
          fillColor: FILL_MAIN
        },
        animation: {
          speed: 1,
          phase: phase,
          amplitude: AMPLITUDE_FACTOR
        }
      });

      const currentOffsetPosition = Math.ceil(offsetPerStep + Math.random()*offsetPerStep/3 - offsetPerStep/3);
      position += currentOffsetPosition;
      const currentOffset = offsetPhase;
      phase += currentOffset;
      const phaseLeft = 361 - phase;

      if (phase > 361) phase = currentOffset - phaseLeft;

      if (index > 0) {
        createLine(dots[index - 1], newDot, calculateOptionsWithZ(newDot.z))
      }

      dots.push(newDot);
    }

  return dots;
}

/**
 * Создание линий между точками
 * @param {object} options
 * @returns {Array<LightPoint>}
 */
export const createLines = (options) => {
  const dots = options.dots || [];
  const ranges = options.ranges || [];

  const allDots = dots.reduce((arr, arr1) => {
    return arr.concat(arr1);
  });

    for (let index = 0; index < dots.length; index++) {
        const dotArr = dots[index];
        const range = ranges[index];

        dotArr.map((dot) => {
          allDots.map((item, key) => {

            if (inRange(item.x, dot.x, range.x) && inRange(item.z, dot.z, range.z)) {
              createLine(item, dot, calculateOptionsWithZ(item.z));
            }
          })
        });
    }

  return allDots;
};

