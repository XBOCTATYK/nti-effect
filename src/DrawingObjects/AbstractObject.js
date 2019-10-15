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
  options = {
    behaviors: [],
    effects: []
  };
  behaviors = [];
  effects = [];

  /**
   * @param {object} options
   * @param {Path} options.element - параметры отрисовываемого элемента
   * @param {object} options.initialPosition - начальная позиция элемента
   * @param {array<AbstractBehavior>} options.behaviors - массив с классами расчета движения
   */
  constructor(options = {}) {
    this.options = {...this.options, ...options};
    this.initialPosition = {...this.initialPosition, ...options.initialPosition};
    this.element = this._createElement(options.element);
    this.element.position = new Point(this.initialPosition.x, this.initialPosition.y);

    this.options.behaviors.forEach(({behavior, options}) => {
      this.addBehavior(behavior, options)
    });

    this.options.effects.forEach(({effect, options}) => {
      this.addEffect(effect, options)
    });

    this._applyEffects();
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

  /**
   * Добавить класс с эффектом
   * @param effectClass
   * @param options
   */
  addEffect(effectClass, options) {
    const effect = new effectClass(this.element, options);
    this.effects.push(effect);
  }

  remove() {
    this.element.remove();
  }

  change(options) {

    if (options.element) {
      this.element = {...this.element, ...options.element}
    }

    if (options.animation) {
      for (let behavior of this.behaviors) {
        behavior.change(options.animation);
      }
    }
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
    };
  }


  _applyEffects() {
    for (let effect of this.effects) {
      effect.set();
    }
  }

  _throwError(message) {
    throw new Error(message)
  }

}
