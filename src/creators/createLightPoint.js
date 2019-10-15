import {LightPoint} from "../DrawingObjects/LightPoint";
import paper from "paper";
import {Color} from "../paperExports";
import {valueOrFunction} from "../lib/valueOrFunction";
import {VerticalSine} from "../behavior/verticalSine";
import {ZDepth} from "../effects/ZDepth";

const DEFAULT_OPTIONS = {
    fillColor: new Color('#30f2fb'),
    radius: 5
};

/**
 * Создание светящейся точки со специфическим поведением
 * @param opt
 * @returns {LightPoint}
 */
export function createLightPoint(opt) {
    const options = {...DEFAULT_OPTIONS, ...opt};

    const z = valueOrFunction(options.z);

    const newLightPoint = new LightPoint({
        initialPosition: {
            x: valueOrFunction(options.x),
            y: valueOrFunction(options.y),
            z: z
        },
        element: {
            radius: options.radius,
            center: paper.view.center,
            fillColor: options.fillColor
        },
        effects: [{
            effect: ZDepth,
            options: {}
        }]
    });

    newLightPoint.addBehavior(VerticalSine, options.animation);

    return newLightPoint;
}
