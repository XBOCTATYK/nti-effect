export class AbstractEffect {
    options = {};

    /**
     *
     * @param {Path} element
     * @param {object} options
     */
    constructor(element, options = {}) {
        this.element = element;
        this.options = {...this.options, ...options};
    }

    /**
     * Задает определенный эффект для объекта
     * @abstract
     */
    set() {}
}
