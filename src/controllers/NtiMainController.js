export class NtiMainController {
  elements = [];

  constructor(elementFabric) {
    this.elementCreator = elementFabric;
  }


  createDot(x, y) {
    const newElement = this.elementCreator.createDot(x, y);
    this.elements.push(newElement);
  }

  seedDots() {

  }

  setLines() {

  }
}
