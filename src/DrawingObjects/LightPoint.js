import {Color, Path, Point, TextItem, PointText} from "../paperExports";
import {AbstractObject} from "./AbstractObject";
import {VerticalSine} from "../behavior/verticalSine";
import {PeriodicalFlash} from "../behavior/periodicalFlash";

const defaultParams = {
  fillColor: 'green'
};

const zFunction = (z) => {
  return ((z**2)/10000).toFixed(3)
};


export class LightPoint extends AbstractObject{

  constructor(options = {}) {
    options.element.z = options.initialPosition.z;
    super(options);

    this.initialPosition = options.initialPosition;
    this.z = options.initialPosition.z || 0;
    this.element.z = this.z;
    this.size = this.element.radius;
  }

  _createElement(options = {}) {
    const params = {...defaultParams, ...options};

    return new Path.Circle(params);
  }
}
