import {Point, Path} from "../paperExports";
import {AbstractBehavior} from "./AbstractBehavior";
import {Offset} from "../Figures/LineBetween";

const INITIAL_OFFSET = {
  x: 0,
  y: 0
};

export class LineBetweenElements extends AbstractBehavior{
  constructor(options) {
    super(options);
    this.borderOffset = this.calculateOffset(this.element.toPathElement, this.element.fromPathElement);
  }

  animate() {
    this.setPosition(this.element.fromPathElement, this.element.toPathElement, this.element.fromPathElement.offset, this.element.toPathElement.offset);
  }

  /**
   *
   * @param {Path} fromElement
   * @param {Path} toElement
   * @param {Offset} offsetFrom
   * @param {Offset} offsetTo
   */
  setPosition(fromElement, toElement, offsetFrom = INITIAL_OFFSET, offsetTo = INITIAL_OFFSET) {
   // const borderOffset = this.borderOffset;

    this.element.lineTo(new Point(toElement.position.getX() + offsetTo.x, toElement.position.getY() + offsetTo.y));
    this.element.lineTo(new Point(fromElement.position.getX() + offsetFrom.x, fromElement.position.getY() + offsetFrom.y));
    this.element.removeSegments(this.element.segments[0].index, this.element.segments[this.element.segments.length - 2].index)
  }

  calculateOffset(fromElement, toElement) {
    const offset = {
      fromElement: {x: 0, y: 0},
      toElement: {x: 0, y: 0}
    };

      if (toElement.position.getX() < fromElement.position.getX()) {
        offset.toElement.x = -1*this.element.radius;
        offset.fromElement.x = this.element.radius;
      } else {
        offset.toElement.x = this.element.radius;
        offset.fromElement.x = -1*this.element.radius;
      }

      if (toElement.position.getY() < fromElement.position.getY()) {
        offset.toElement.y = -1*this.element.radius;
        offset.fromElement.y = this.element.radius;
      } else {
        offset.toElement.y = this.element.radius;
        offset.fromElement.y = -1*this.element.radius;
      }

     // console.log(offset);
      return offset;
  }
}
