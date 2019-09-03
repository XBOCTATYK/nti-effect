import {AbstractObject} from "./AbstractObject";
import {Point, Raster} from "../paperExports";

const defaultParams = {
    source: 'img/square.svg',
    position: new Point(0, 0)
};

export class PictureObject extends AbstractObject {
  constructor(options = {}) {
    super(options);
  }

  _createElement(options = {}) {
    const params = {...defaultParams, ...options};

    const image = new Raster(params);
    image.opacity = params.opacity;

    return image;
  }
}
