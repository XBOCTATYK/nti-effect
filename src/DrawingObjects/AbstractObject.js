import {Point, Path} from "../paperExports";

export const initialPositionDefault = {
  x: 0,
  y: 0,
  z: 0
};

export class AbstractObject {
  /**
   *
   * @type {null | Path}
   */
  element = null;
  initialPosition = initialPositionDefault;
  options = {};

  constructor(options = {}) {

    this.initialPosition = {...this.initialPosition, ...options.initialPosition};
    this.element = this._createElement(options.element);

    this.element.position = new Point(this.initialPosition.x, this.initialPosition.y);
    this.behaviors = options.behaviors || [];
    this._constructAnimation();
  }

  get x() {
    return this.element.position.getX();
  }

  get y() {
    return this.element.position.getY();
  }

  addBehavior(behaviorClass, options) {
    const behavior = new behaviorClass(this.element, options);
    this.behaviors.push(behavior);
  }

  /**
   * @abstract
   * @private
   * @param {object} elementOptions
   * @return {Path}
   */
  _createElement(elementOptions) {}

  _constructAnimation() {
    this.element.onFrame = () => {
      for (let behavior of this.behaviors) {
          behavior.animate();
      }
    }
  }

  _throwError(message) {
    throw new Error(message)
  }

}
