import {SimpleLine} from "./SimpleLine";
import {LineBetweenElements} from "../behavior/lineBetweenElements";

const INITIAL_OFFSET = {
  x: 0,
  y: 0
};

export class Offset {
  x = 0;
  y = 0;

  constructor(x,y) {
    this.x = x;
    this.y = y;
  };
}

export class LineBetween extends SimpleLine {
  /**
   * @param {object} options
   * @param {Path} options.lineFrom
   * @param {Path} options.lineTo
   * @param {Offset} options.fromPathElement
   * @param {Offset} options.toPathElement
   */
  constructor(options) {
    super(options);

    try {
      this.element.fromPathElement = options.fromPathElement.element || this._throwError('LineBetween: lineFromElement is required');
      this.element.toPathElement = options.toPathElement.element || this._throwError('LineBetween: lineToElement is required');
      this.element.fromPathElement.offset = options.fromOffset || INITIAL_OFFSET;
      this.element.toPathElement.offset = options.toOffset || INITIAL_OFFSET;
    } catch (e) {
      this._throwError('LineBetween: lineFromElement is required')
    }

    this.addBehavior(LineBetweenElements);
    this._constructAnimation();
  }

}
