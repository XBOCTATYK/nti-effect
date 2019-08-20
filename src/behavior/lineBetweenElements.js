import {Point, Path} from "../paperExports";
import {AbstractBehavior} from "./AbstractBehavior";
import {Offset} from "../Figures/LineBetween";

const INITIAL_OFFSET = {
  x: 0,
  y: 0
};

export class LineBetweenElements extends AbstractBehavior{
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
    // console.log(this.element);
    this.element.lineTo(new Point(toElement.position.getX() + offsetTo.x, toElement.position.getY() + offsetTo.y));
    this.element.lineTo(new Point(fromElement.position.getX() + offsetFrom.x, fromElement.position.getY() + offsetFrom.y));
    this.element.removeSegments(this.element.segments[0].index, this.element.segments[this.element.segments.length - 2].index)
  }
}
