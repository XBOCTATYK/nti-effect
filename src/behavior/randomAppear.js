import {AbstractBehavior} from "./AbstractBehavior";
import {Point} from "../paperExports";

const STAGES = {
  IDLE: 1,
  APPEAR: 2,
  DISAPPEAR: 3
};

export class RandomAppear extends AbstractBehavior {
  stage = STAGES.IDLE;
  timerOn = false;
  timerDisappearOn = false;

  constructor(element, opt = {}) {
    const options = {
      flashSpeed: 1,
      flashStrength: 0.2,
      reduceSpeed: 1,
      border: {
        startX: 0,
        startY: 0,
        endX: 300,
        endY: 300
      },
      ...opt
    };

    super(element, options);
    this.options = {...this.options, ...options};
    this.element.opacity = 0;
    this._setPosition();
  }

  animate() {
      if (!this.timerOn) {
        setTimeout(() => {
          this._setPosition();
          this._setAppear();
          }, Math.ceil(Math.random()*5000));
          this.timerOn = true;
      }

      this._flash();
  }

  _setPosition() {
    const position = {
      x: Math.ceil(Math.random()* this.options.border.endX - this.options.border.startX),
      y: Math.ceil(Math.random()* this.options.border.endY - this.options.border.startY),
    };

    this.element.position = new Point(position.x, position.y);
  }

  _flash() {
    if (this.stage === STAGES.APPEAR) {
      let maxOpacity = 1;

      this.element.opacity += this.options.flashSpeed/20;

      if (this.element.opacity >= maxOpacity) {
        if (!this.timerDisappearOn) {
          setTimeout(() => {
            this._setDisappear();
          }, Math.ceil(Math.random()*2000));
          this.timerDisappearOn = true;
        }

      }
    }


    if (this.stage === STAGES.DISAPPEAR) {
      let minOpacity = 0;

      this.element.opacity -= this.options.reduceSpeed/20;

      if (this.element.opacity <= minOpacity) {
        this._setIdle();
        this._setPosition();
        this.timerOn = false;
        this.timerDisappearOn = false;
      }
    }
  }

  _setAppear = () => {
      this.stage = STAGES.APPEAR;
  };

  _setDisappear = () => {
    this.stage = STAGES.DISAPPEAR;
  };

  _setIdle = () => {
    this.stage = STAGES.IDLE;
  }


}
