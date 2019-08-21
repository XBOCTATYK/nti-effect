import {Point} from "../paperExports";
import {AbstractBehavior} from "./AbstractBehavior";
import {APP_CONFIG} from "../config/app.config";


export class VerticalSine extends AbstractBehavior {
  options = {
    speed: 1,
    phase: 1,
    amplitude: 100
  };

  constructor(element, options = {}) {
    super(element, options);
    this.options = {...this.options, ...options};
    this.options.initialY = this.element.position.getY();
  }

  animate() {
    const MAX_PHASE = 361;
    let X = this.element.position.getX();
    let Y = this.element.position.getY();

    if (this.options.phase >= MAX_PHASE) this.options.phase = 1;

    if (Y < APP_CONFIG.height + 500) {
      Y = Y + this.options.speed;
      this.options.phase = this.options.phase + this.options.speed;
      Y = this.options.initialY + this.options.amplitude * Math.sin(this.options.phase * Math.PI/180);
      this.element.position = new Point(X, Y);

    } else {
      Y = 10;
    }
  }


}
