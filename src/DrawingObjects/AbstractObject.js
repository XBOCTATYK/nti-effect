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

  /**
   * @param {object} options
   * @param {Path} options.element - параметры отрисовываемого элемента
   * @param {object} options.initialPosition - начальная позиция элемента
   * @param {array<AbstractBehavior>} options.behaviors - массив с классами расчета движения
   */
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

  /**
   * Добавить класс с расчетами движения элемента
   * @param {AbstractBehavior} behaviorClass
   * @param {object} options
   */
  addBehavior(behaviorClass, options) {
    const behavior = new behaviorClass(this.element, options);
    this.behaviors.push(behavior);
  }

  remove() {
    this.element.remove();
  }

  /**
   * Абстрактная функция, устанавливающая элемент для отрисовки
   * @abstract
   * @private
   * @param {object} elementOptions
   * @return {Path}
   */
  _createElement(elementOptions) {}

  /**
   * По очереди активирует классы с расчетами изменяющихся характеристик элемента
   * @private
   */
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
