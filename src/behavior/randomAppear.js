import {AbstractBehavior} from "./AbstractBehavior";
import {Point} from "../paperExports";

const STAGES = {
  IDLE: 1,
  APPEAR: 2,
  DISAPPEAR: 3,
  APPEARING: 4,
};

/**
 * Рандомное появление элемента на экране с последующим исчезанием и перемещением
 */
export class RandomAppear extends AbstractBehavior {
  stage = STAGES.IDLE;
  timerOn = false;
  timerDisappearOn = false;

  _flashSpeed = 0;
  _reduceSpeed = 0;

  constructor(element, opt = {}) {
    const options = {
      flashSpeed: 1,
      flashStrength: 0.2,
      reduceSpeed: 1,
      maxOpacity: 1,
      lifeTimeCoeff: 12,
      hideTimeCoeff: 10,
      flashSpeedFactor: 20,
      reduceSpeedFactor: 20,
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

    this._flashSpeed = this.options.flashSpeed/this.options.flashSpeedFactor;
    this._reduceSpeed = this.options.reduceSpeed/this.options.reduceSpeedFactor;
  }

  animate() {
      if (!this.timerOn) {
        setTimeout(() => {
          this._setAppear();
          }, Math.ceil(Math.random()*this.options.lifeTimeCoeff*1000));
          this.timerOn = true;
      }

      this._flash();
  }

  _setPosition() {
    const position = {
      x: Math.ceil(Math.random()* (this.options.border.endX - this.options.border.startX)) + this.options.border.startX,
      y: Math.ceil(Math.random()* (this.options.border.endY - this.options.border.startY)) + this.options.border.startY,
    };

    this.element.position = new Point(position.x, position.y);
  }

  _flash() {

    if (this.stage === STAGES.APPEAR) {
      const maxOpacity = this.options.maxOpacity;

      this.element.opacity += this._flashSpeed;

      if (this.element.opacity >= maxOpacity) {
        this._setAppearing();
      }
    }

    if (this.stage === STAGES.APPEARING) {
      if (!this.timerDisappearOn) {
        this.element.opacity = this.options.maxOpacity;
        setTimeout(() => {
          this._setDisappear();
        }, Math.ceil(Math.random()*this.options.lifeTimeCoeff*1000));

        this.timerDisappearOn = true;
      }
    }

    if (this.stage === STAGES.DISAPPEAR) {
      const reduceSpeed = this._reduceSpeed;
      const minOpacity = 0;

      this.element.opacity -= reduceSpeed;

      if (this.element.opacity <= minOpacity + reduceSpeed) {
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

  _setAppearing = () => {
    this.stage = STAGES.APPEARING;
  };


  _setIdle = () => {
    this.stage = STAGES.IDLE;
  }


}
