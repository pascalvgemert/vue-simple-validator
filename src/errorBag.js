export default class ErrorBag {

    /**
     * Validator constructor
     *
     * @param {Object} errors
     */
    constructor(errors) {
        this.errors = errors || {};
    }

    /**
     * Add a new error message.
     *
     * @returns {Object}
     */
    add(key, message) {
        this.errors[key] = message;

        return this;
    }

    /**
     * Return all error messages.
     *
     * @returns {Object}
     */
    all() {
        return this.errors || {};
    }

    /**
     * Does the bag contains any errors.
     *
     * @returns {Boolean}
     */
    any() {
        return this.count() > 0;
    }

    /**
     * Return the amount of errors in the bag.
     *
     * @returns {Number}
     */
    count() {
        return Object.keys(this.all()).length || 0;
    }

    /**
     * Get the error message for the requested key.
     *
     * @returns {String|null}
     */
    get(key) {
        return this.errors[key] || null;
    }

    /**
     * See if the bag contains a message for the requested key.
     *
     * @returns {Boolean}
     */
    has(key) {
        return this.all().indexOf(key) !== -1;
    }
};
