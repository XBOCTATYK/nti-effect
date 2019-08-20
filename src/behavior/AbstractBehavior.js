export class AbstractBehavior {
  options = {};

  /**
   *
   * @param {Path} element
   * @param {object} options
   */
  constructor(element, options = {}) {
    this.element = element;
    this.options = {...this.options, ...options};
  }

  /**
   * @abstract
   */
  animate() {

  }
}
