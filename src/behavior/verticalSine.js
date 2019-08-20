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
  }

  animate() {
    const MAX_PHASE = 361;
    let X = this.element.position.getX();
    let Y = this.element.position.getY();

    if (this.options.phase >= MAX_PHASE) this.options.phase = 1;

    if (Y < APP_CONFIG.height) {
      Y = Y + this.options.speed;
      this.options.phase = this.options.phase + this.options.speed;
      Y = 300 + this.options.amplitude * Math.sin(this.options.phase * Math.PI/180);
      this.element.position = new Point(X, Y);

    } else {
      Y = 10;
    }
  }


}
