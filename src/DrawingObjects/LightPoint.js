import {Color, Path, Point, TextItem, PointText} from "../paperExports";
import {AbstractObject} from "./AbstractObject";
import {VerticalSine} from "../behavior/verticalSine";
import {PeriodicalFlash} from "../behavior/periodicalFlash";

const defaultParams = {
  fillColor: 'green'
};

const zFunction = (z) => {
  return ((z**2)/10000).toFixed(3)
};


export class LightPoint extends AbstractObject{

  constructor(options = {}) {
    super(options);

    this.initialPosition = options.initialPosition;
    this.z = options.initialPosition.z || 0;
    this.element.opacity = 1 - (this._getOpacity());
    this.element.fillColor = this._getGradient();
    this.element.radius = this.size;
    options.animation.amplitude = this._getAmplitude();
    this.addBehavior(VerticalSine, options.animation);
    this._constructAnimation();

    /*const text = new PointText({
      position: new Point(this.initialPosition.x, this.initialPosition.y),
      fillColor: 'white',
      justification: 'center',
      fontSize: 10
    });

    text.content = this.z;

    this.element.addChild(text)*/
  }

  _createElement(options = {}) {
    const params = {...defaultParams, ...options};
    params.radius = this.size = this._getSize(params.radius);

    return new Path.Circle(params);
  }

  _getGradient() {

    let {red: r, green: g, blue: b} = this.element.fillColor;
    let additionOpacity = 0.5;

    if (this.initialPosition.z === 0) {
      additionOpacity = 1;
    }

    return {
      gradient: {
        stops: [
          [new Color(r, g, b, 1), 0],
          [new Color(r, g, b, 0.5), 1-zFunction(this.initialPosition.z)-0.1],
          [new Color(r, g, b, 0), 1]
        ],
        radial: true
      },
      origin: this.element.position,
      destination: this.element.bounds.rightCenter
    }
  }

  _getAmplitude() {
    return (this.initialPosition.z+110)
  }

  _getOpacity() {
    return this.initialPosition.z > 0 ? zFunction(this.initialPosition.z)*3 : zFunction(this.initialPosition.z)*3
  }

  _getSize(initSize = 30) {
    //console.log(initSize);
    return this.initialPosition.z > 0 ? Math.ceil((this.initialPosition.z**2)/800)+initSize : Math.ceil((this.initialPosition.z**2)/800)+initSize
  };
}
