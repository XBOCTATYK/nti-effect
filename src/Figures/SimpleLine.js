import {Path, Point, Color} from "../paperExports";
import {AbstractObject} from "../DrawingObjects/AbstractObject";

const defaultParams = {
  strokeColor: new Color(0, 0, 0),
  strokeWidth: 1,
  from: new Point(0, 0),
  to: new Point(0, 0)
};

export class SimpleLine extends AbstractObject {

  _createElement(options = {}) {
    const params = {...defaultParams, ...options};

    return new Path.Line(params);
  }

}
