import {SimpleLine} from "./SimpleLine";
import {LineBetweenElements} from "../behavior/lineBetweenElements";
import {PeriodicalFlash} from "../behavior/periodicalFlash";

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
   * @param {object} options.animation
   */
  constructor(options) {
    super(options);

    this._constructAnimation();
  }

}
