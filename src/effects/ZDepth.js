import {AbstractEffect} from "./AbstractEffect";
import {Color} from "../paperExports";

const initialZFunction = (z) => {
    return ((z ** 2) / 10000).toFixed(3)
};

const defaultSizeZFunction = (z, initialSize, sizeFactor) => {
    return z > 0 ? Math.ceil((z ** 2) / sizeFactor) + initialSize : Math.ceil((z ** 2) / sizeFactor) + initialSize;
};

const defaultOpacityZFunction = (z, plusOffsetOpacity, minusOffsetOpacity) => {
    return z > 0 ? plusOffsetOpacity + initialZFunction(z) * 3 : minusOffsetOpacity + initialZFunction(z)
};

const defaultGradientZFunction = (z) => {
    return 1 - initialZFunction(z) - 0.1
};

const defaultAmplitudeZFunction = (z, amplitudeOffset, amplitudeZFactor) => {
    return (z + amplitudeOffset)*amplitudeZFactor
};

export class ZDepth extends AbstractEffect {
    constructor(element, options) {
        const defaultOptions = {
            plusZMinOpacity: 0.3,
            minusZMinOpacity: 0,
            plusZMaxOpacity: 1,
            minusZMaxOpacity: 1,
            minSize: 0,
            maxSize: 10000,
            initSize: 30,
            amplitudeZFactor: 1,
            apmlitudeOffset: 0,
            blurDepth: false,
            z: 0,
            zFunction: initialZFunction,
            sizeZFunction: defaultSizeZFunction,
            opacityZFunction: defaultOpacityZFunction,
            gradientZFunction: defaultGradientZFunction,
            amplitudeZFunction: defaultAmplitudeZFunction
        };

        const ZOptions = {...defaultOptions, ...options};
        super(element, ZOptions);
        this.amplitude = element.amplitude;
    }

    set() {
        this.element.opacity = 1 - (this._getOpacity());
        this.element.fillColor = this._getGradient();
        this.element.radius = this._getSize(this.options.radius);
        this.element.amplitude = this._getAmplitude();
    }

    _getAmplitude(factor) {
        return this.options.amplitudeZFunction(this.element.z, this.options.apmlitudeOffset, this.options.amplitudeZFactor);
    }

    _getOpacity() {
        return this.options.opacityZFunction(this.element.z, 0.3, 0);
    }

    _getSize(initialSize) {
        return this.options.sizeZFunction(this.element.z, initialSize, 800);
    };

    _getGradient() {

        let {red: r, green: g, blue: b} = this.element.fillColor;
        let additionOpacity = 0.5;

        if (this.options.z === 0) {
            additionOpacity = 1;
        }

        return {
            gradient: {
                stops: [
                    [new Color(r, g, b, 1), 0],
                    [new Color(r, g, b, 0.5), this.options.gradientZFunction(this.element.z)],
                    [new Color(r, g, b, 0), 1]
                ],
                radial: true
            },
            origin: this.element.position,
            destination: this.element.bounds.rightCenter
        }
    }
}
