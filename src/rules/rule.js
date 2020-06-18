export default class Rule {
    /**
     * Abstract class constructor
     */
    constructor() {
        if (new.target === Rule) {
            throw new TypeError('Cannot construct Rule instances directly.');
        }
    }

    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     *
     * @return {Boolean}
     */
    validate(value, ruleParams, context) {
        throw new Error("Method 'validate(value, ruleParams, context)' must be implemented.");
    }

    /**
     * @param {String} message
     * @param {String} field
     * @param {Array} ruleParams
     *
     * @returns {String}
     */
    failureMessage(message, field, ruleParams) {
        return message.replace('{field}', field);
    }
}
