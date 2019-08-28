import {AbstractBehavior} from "./AbstractBehavior";

const STAGES = {
  IDLE: 1,
  FLASH: 2,
  REDUCE: 3
};

export class PeriodicalFlash extends AbstractBehavior {
  stage = STAGES.IDLE;
  timerOn = false;

  constructor(element, opt = {}) {
    const options = {
      flashSpeed: 1,
      flashStrength: 0.2,
      reduceSpeed: 1,
      ...opt
    };

    super(element, options);
    this.options = {...this.options, ...options};
    this.startOpacity = this.element.opacity;
  }

  animate() {
      if (!this.timerOn) {
        setTimeout(() => {
          this._setFlash();
          }, Math.ceil(Math.random()*20000));
          this.timerOn = true;
      }

      this._flash();
  }

  _flash() {
    if (this.stage === STAGES.FLASH) {
      let maxOpacity = this.startOpacity + this.options.flashStrength;
      if (maxOpacity > 1) maxOpacity = 1;

      this.element.opacity += this.options.flashSpeed/20;
      if (this.options.changeWidth) {
        this.element.strokeWidth += this.options.flashSpeed/4;
      }

      if (this.element.opacity >= maxOpacity) {
        this._setReduce();
      }
    }

    if (this.stage === STAGES.REDUCE) {
      let minOpacity = this.startOpacity;
      if (minOpacity <= 0) minOpacity = 0.05;

      this.element.opacity -= this.options.reduceSpeed/50;
      if (this.options.changeWidth) {
        this.element.strokeWidth -= this.options.flashSpeed/10;
      }

      if (this.element.opacity <= minOpacity) {
        this._setIdle();
        this.timerOn = false;
      }
    }
  }

  _setFlash = () => {
      this.stage = STAGES.FLASH;
  };

  _setReduce = () => {
    this.stage = STAGES.REDUCE;
  };

  _setIdle = () => {
    this.stage = STAGES.IDLE;
  }


}
