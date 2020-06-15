class Rule {
    /**
     * Abstract class constructor
     */
    constructor() {
        if (new.target === Abstract) {
            throw new TypeError('Cannot construct Abstract instances directly.');
        }
    }

    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     */
    validate(value, ruleParams, context) {
        throw new Error("Method 'validate(value, ruleParams, context)' must be implemented.");
    }

    /**
     * @param {String} message
     * @param {String} field
     * @param {Array} ruleParams
     */
    failureMessage(message, field, ruleParams) {
        return message.replace('{field}', field);
    }
}
