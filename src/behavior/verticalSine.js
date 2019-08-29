import {Point} from "../paperExports";
import {AbstractBehavior} from "./AbstractBehavior";
import {APP_CONFIG} from "../config/app.config";

/**
 * Вертикальное движение по синусоиде
 */
export class VerticalSine extends AbstractBehavior {
  options = {
    speed: 1,
    phase: 1,
    amplitude: 100,
    outsidePosition: 500
  };

  constructor(element, options = {}) {
    super(element, options);
    this.options = {...this.options, ...options};
    this.options.initialY = this.element.position.getY();
    this.x = this.element.position.getX();
    this.y = this.element.position.getY();

    this.maxPosition = APP_CONFIG.height + this.options.outsidePosition;
  }

  change(options) {
    this.options = {...this.options, ...options}
  }

  animate() {
    const MAX_PHASE = 361;

    if (this.options.phase >= MAX_PHASE) this.options.phase = 1;

    if (this.y < this.maxPosition) {
      this.y = this.y + this.options.speed;
      this.options.phase = this.options.phase + this.options.speed;
      this.y = this.options.initialY + this.options.amplitude * Math.sin(this.options.phase * Math.PI/180);
      this.element.position = new Point(this.x, this.y);

    } else {
      this.y = 10;
    }
  }


}
