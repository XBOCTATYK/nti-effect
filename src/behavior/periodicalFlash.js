import {AbstractBehavior} from "./AbstractBehavior";

const STAGES = {
  IDLE: 1,
  FLASH: 2,
  REDUCE: 3
};

/**
 * Имитирует эффект вспышки
 */
export class PeriodicalFlash extends AbstractBehavior {
  stage = STAGES.IDLE;
  timerOn = false;

  _flashSpeed = 0;
  _flashWidthSpeed = 0;
  _reduceSpeed = 0;
  _reduceWidthSpeed = 0;

  /**
   *
   * @param {Path} element
   * @param {object} opt
   * @param {number} opt.flashSpeed - скорость фазы вспышки
   * @param {number} opt.flashStrength - насколько сильная будет вспышка
   * @param {number} opt.reduceSpeed - скорость затухания
   * @param {number} opt.lifeTimeCoeff - время жизни в верхнем пределельном состоянии
   * @param {number} opt.hideTimeCoeff - время жизни в нижнем предельном состоянии
   * @param {number} opt.flashSpeedFactor - коэффициент изменения вспышки от скорости
   * @param {number} opt.flashWidthSpeedFactor - коэффициент изменения ширины при вспышке от скорости
   * @param {number} opt.reduceSpeedFactor - коэффициент изменения затухания от скорости
   * @param {number} opt.reduceWidthSpeedFactor - коэффициент изменения ширины при затухании от скорости
   */
  constructor(element, opt = {}) {
    const options = {
      flashSpeed: 1,
      flashStrength: 0.2,
      reduceSpeed: 1,
      lifeTimeCoeff: 12,
      hideTimeCoeff: 20,
      flashSpeedFactor: 20,
      flashWidthSpeedFactor: 4,
      reduceSpeedFactor: 50,
      reduceWidthSpeedFactor: 10,
      ...opt
    };

    super(element, options);
    this.options = {...this.options, ...options};
    this.startOpacity = this.element.opacity;
    this.startWidth = this.element.strokeWidth;

    this._flashSpeed = this.options.flashSpeed/this.options.flashSpeedFactor;
    this._flashWidthSpeed = this.options.flashSpeed/this.options.flashWidthSpeedFactor;
    this._reduceSpeed = this.options.reduceSpeed/this.options.reduceSpeedFactor;
    this._reduceWidthSpeed = this.options.flashSpeed/this.options.reduceWidthSpeedFactor;
  }

  animate() {
      if (!this.timerOn) {
        setTimeout(() => {
          this._setFlash();
          }, Math.ceil(Math.random()*this.options.hideTimeCoeff*1000));
          this.timerOn = true;
      }

      this._flash();
  }

  _flash() {
    if (this.stage === STAGES.FLASH) {
      let maxOpacity = this.startOpacity + this.options.flashStrength;
      if (maxOpacity > 1) maxOpacity = 1;

      this.element.opacity += this._flashSpeed;
      if (this.options.changeWidth) {
        this.element.strokeWidth += this._flashWidthSpeed;
      }

      if (this.element.opacity >= maxOpacity) {
        this._setReduce();
      }
    }

    if (this.stage === STAGES.REDUCE) {
      let minOpacity = this.startOpacity;
      if (minOpacity <= 0) minOpacity = 0.05;

      this.element.opacity -= this._reduceSpeed;
      if (this.options.changeWidth && this.startWidth < this.element.strokeWidth) {
        this.element.strokeWidth -= this._reduceWidthSpeed;
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
