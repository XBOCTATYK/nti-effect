import {PictureObject} from "../DrawingObjects/PictureObject";
import paper from "paper";
import {RandomAppear} from "../behavior/randomAppear";

export const createPicItems = (imageArray, zones) => {
  const MAX_OPACITY = 0.6;

  zones.forEach(zone => {
    const countOfElement = zone.count || 1;

    imageArray.forEach(item => {
      for (let index = 0; index < countOfElement; index++) {
        window.pict = new PictureObject({
          element: {
            source: item,
            position: paper.view.center
          }
        });

        pict.addBehavior(RandomAppear, {
          border: zone,
          maxOpacity: zone.opacity || MAX_OPACITY
        })
      }
    });
  });
};
