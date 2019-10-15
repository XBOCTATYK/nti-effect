import {LineBetween} from "../Figures/LineBetween";
import {LineBetweenElements} from "../behavior/lineBetweenElements";
import {PeriodicalFlash} from "../behavior/periodicalFlash";

const defaultOptions = {
    offset: 0,
    width: 1,
    opacity: 0.5,
    blur: 0,
    color: '#26c3cc',
    shadowColor: '#ffffff'
};

/**
 * Создает линию от одного объекта до другого
 * @param {AbstractObject} from
 * @param {AbstractObject} to
 * @param {object} opt
 */
export const createLine = (from, to, opt = defaultOptions) => {
    const options = {...defaultOptions, ...opt};

    new LineBetween({
        element: {
            strokeColor: options.color,
            strokeWidth: options.width,
            opacity: options.opacity,
            shadowBlur: options.blur,
            shadowColor: options.shadowColor
        },
        animation: options.animation,
        behaviors: [{
            behavior: LineBetweenElements,
            options: {
                fromPathElement: from.element,
                toPathElement: to.element,
                fromPathElementOffset: {x: Math.ceil(Math.random()*options.offset*2-options.offset), y: Math.ceil(Math.random()*options.offset*2-options.offset)},
                toPathElementOffset: {x: Math.ceil(Math.random()*options.offset*2-options.offset), y: Math.ceil(Math.random()*options.offset*2-options.offset)},
            }
        }, {
            behavior: PeriodicalFlash,
            options: options.animation
        }]
    });
};
