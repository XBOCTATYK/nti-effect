import {Color, Path, Point, TextItem, PointText} from "../paperExports";
import {AbstractObject} from "./AbstractObject";
import {VerticalSine} from "../behavior/verticalSine";

const defaultParams = {
  fillColor: 'green'
};

const zFunction = (z) => {
  return 1-(z**2)/20000
};


export class LightPoint extends AbstractObject{
  constructor(options = {}) {
    super(options);

    this.initialPosition = options.initialPosition;
    this.z = options.initialPosition.z || 0;
    this.element.opacity = this._getOpacity();
    this.element.fillColor = this._getGradient();
    options.animation.amplitude = this._getAmplitude();
    this.addBehavior(VerticalSine, options.animation);

    const text = new PointText({
      position: new Point(this.initialPosition.x, this.initialPosition.y),
      fillColor: 'white',
      justification: 'center',
      fontSize: 10
    });

    text.content = this.z;

    this.element.addChild(text)
  }

  _createElement(options = {}) {
    const params = {...defaultParams, ...options};
    params.radius = this._getSize(params.radius);

    return new Path.Circle(params);
  }

  _getGradient() {

    let {red: r, green: g, blue: b} = this.element.fillColor;

    return {
      gradient: {
        stops: [
          [new Color(r, g, b, 1), 0],
          [new Color(r, g, b, 0.7), zFunction(this.initialPosition.z)],
          [new Color(r, g, b, 0), 1]
        ],
        radial: true
      },
      origin: this.element.position,
      destination: this.element.bounds.rightCenter
    }
  }

  _getAmplitude() {
    return (this.initialPosition.z+120)
  }

  _getOpacity() {
    return this.initialPosition.z > 0 ? zFunction(this.initialPosition.z) : zFunction(this.initialPosition.z)
  }

  _getSize(initSize = 30) {
    return this.initialPosition.z > 0 ? (this.initialPosition.z**2)/300+initSize : (-1*this.initialPosition.z)/50+initSize/2
  };
}
